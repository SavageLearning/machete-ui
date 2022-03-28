import { Observable, BehaviorSubject, of } from "rxjs";

import { catchError, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Employer } from "../shared/models/employer";
import { EmployersService as EmployersClient } from "machete-client";

@Injectable({
  providedIn: "root",
})
export class EmployersService {
  private employerSource: BehaviorSubject<Employer>;

  constructor(private client: EmployersClient) {
    client.configuration.withCredentials = true;
    client.configuration.basePath = environment.dataUrl;
    this.employerSource = new BehaviorSubject<Employer>(null);
    this.fetchEmployer().subscribe();
  }

  fetchEmployer(): Observable<Employer> {
    return this.client.apiEmployersProfileGet().pipe(
      map((data) => {
        this.setEmployer(data["data"] as Employer);
        return data["data"] as Employer;
      }),
      catchError((error) => {
        this.setEmployer(null);
        console.error("error from getEmployer: ", error);
        return of(null);
      })
    ); // TODO is this last 'undefined' bit intentional?
  }
  getEmployer(): Observable<Employer> {
    return this.employerSource.asObservable();
  }

  setEmployer(employer: Employer): void {
    this.employerSource.next(employer);
  }

  save(employer: Employer): Observable<Employer> {
    console.log("save:", employer);
    // hack to get out the door; SavageLearning/Machete#425
    employer.referredBy = 25;

    // create or update
    return this.client.apiEmployersProfilePut(employer).pipe(
      map((data) => {
        this.setEmployer(data["data"] as Employer);
        return data["data"] as Employer;
      }),
      catchError((error) => {
        this.setEmployer(null);
        console.error("error from setEmployer: ", error);
        return of(null);
      })
    );
  }
}
