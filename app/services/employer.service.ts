import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Employer} from "../models/employer";
import 'rxjs/add/operator/toPromise'; // TODO replace rxjs with ng2 routing?

@Injectable()
export class EmployerService {
  constructor(private http: Http) { }

  getEmployers() {
    return this.http.get('app/resources/data/employers-all.json')
      .toPromise()
      .then(res => <Employer[]>res.json().data)
      .then(data => { return data; });
  }
}
