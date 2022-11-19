import { Observable, throwError } from "rxjs";

import { catchError, map, pluck, tap } from "rxjs/operators";
import { Injectable, Optional, SkipSelf } from "@angular/core";
import { TransportProvider } from "./shared/";
import { of } from "rxjs";
import { MessagesService } from "../shared/components/messages/messages.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class TransportProvidersService {
  uriBase = environment.dataUrl + "/api/transportproviders";
  providers = new Array<TransportProvider>();
  providersAge = 0;
  constructor(
    private http: HttpClient,
    private appMessages: MessagesService,
    @Optional() @SkipSelf() parentModule?: TransportProvidersService
  ) {
    // enforce app singleton pattern
    if (parentModule) {
      throw new Error(
        `Machete dev error:${TransportProvidersService.name} is already loaded. Additional imports not needed`
      );
    }
    console.log(".ctor");
  }

  isStale(): boolean {
    if (this.providersAge > Date.now() - 300 * 1000) {
      return false;
    }
    return true;
  }

  isNotStale(): boolean {
    return !this.isStale();
  }

  getTransportProviders(): Observable<TransportProvider[]> {
    if (this.isNotStale()) {
      console.log("returning cache", this.providersAge);
      const cache = sessionStorage.getItem("tranportProviders");
      return of(JSON.parse(cache) as TransportProvider[]);
    }

    return this.http.get(this.uriBase, { withCredentials: true }).pipe(
      catchError((error) => {
        // only expecting one type of error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const errorAsText: string = error["statusText"] as string;
        this.appMessages.showErrors({
          Error: `${errorAsText}: Contact Machete support.`,
        });
        console.log(error);
        return throwError(error);
      }),
      pluck("data"),
      map((data) => data as TransportProvider[]),
      tap((data: TransportProvider[]) => {
        sessionStorage.setItem("tranportProviders", JSON.stringify(data));
        this.providersAge = Date.now();
      })
    );
  }

  getById(id: number): Observable<TransportProvider> {
    if (this.isNotStale()) {
      console.log(
        `${TransportProvidersService.name}.${this.getById.name} returning cache:`,
        this.providersAge
      );
      const cache: TransportProvider[] = JSON.parse(
        sessionStorage.getItem("tranportProviders")
      ) as TransportProvider[];

      return of({ ...cache.find((tp: TransportProvider) => tp.id === id) });
    }

    return this.http
      .get(`${this.uriBase}/${id}`, { withCredentials: true })
      .pipe(
        catchError((error) => {
          // only expecting one type of error
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const errorAsText: string = error["statusText"] as string;
          this.appMessages.showErrors({
            Error: `${errorAsText}: Contact Machete support.`,
          });
          console.log(error);
          return throwError(error);
        }),
        pluck("data"),
        map((data) => data as TransportProvider),
        tap((data: TransportProvider) => {
          const cache: TransportProvider[] = JSON.parse(
            sessionStorage.getItem("tranportProviders")
          ) as TransportProvider[];
          const newCache: TransportProvider[] = cache.filter(
            (tp: TransportProvider) => tp.id !== id
          );
          sessionStorage.setItem(
            "tranportProviders",
            JSON.stringify([...newCache, data])
          );
          this.providersAge = Date.now();
        })
      );
  }

  save(
    entity: TransportProvider,
    isDelete?: boolean
  ): Observable<TransportProvider> {
    if (entity.id) {
      return this.update(entity, isDelete);
    } else {
      return this.create(entity);
    }
  }

  private create(
    transportProvider: TransportProvider
  ): Observable<TransportProvider> {
    const url = `${this.uriBase}`;
    return this.http
      .post<TransportProvider>(
        url,
        { ...transportProvider, active: true },
        {
          withCredentials: true,
        }
      )
      .pipe(
        catchError((error) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const errorAsText: string = error["statusText"] as string;
          this.appMessages.showErrors({
            Error: `${errorAsText}: Contact Machete support.`,
          });
          console.log(error);
          return throwError(error);
        }),
        pluck("data"),
        map((data) => data as TransportProvider),
        tap((data: TransportProvider) => {
          this.appMessages.showSuccess({
            label: "Success",
            message: "Record created",
          });
          this.syncChacheWithMutation(data);
        })
      );
  }

  private update(
    tranportProvider: TransportProvider,
    isDelete?: boolean
  ): Observable<TransportProvider> {
    const url = `${this.uriBase}/${tranportProvider.id.toString()}`;
    return this.http
      .put<TransportProvider>(url, tranportProvider, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const errorAsText: string = error["statusText"] as string;
          this.appMessages.showErrors({
            Error: `${errorAsText}: Contact Machete support.`,
          });
          console.log(error);
          return throwError(error);
        }),
        pluck("data"),
        map((data) => data as TransportProvider),
        tap((data: TransportProvider) => {
          this.appMessages.showSuccess({
            label: "Success",
            message: "Record updated",
          });
          this.syncChacheWithMutation(data, isDelete);
        })
      );
  }

  private syncChacheWithMutation(
    mutated: TransportProvider,
    isDelete?: boolean
  ): void {
    const cache: TransportProvider[] = JSON.parse(
      sessionStorage.getItem("tranportProviders")
    ) as TransportProvider[];

    const newCache: TransportProvider[] = cache.filter(
      (tp: TransportProvider) => tp.id !== mutated.id
    );

    if (isDelete) {
      sessionStorage.setItem(
        "tranportProviders",
        JSON.stringify([...newCache])
      );
    } else {
      sessionStorage.setItem(
        "tranportProviders",
        JSON.stringify([...newCache, mutated])
      );
    }

    this.providersAge = Date.now();
  }
}
