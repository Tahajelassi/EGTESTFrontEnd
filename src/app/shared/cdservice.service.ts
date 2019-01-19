import {Injectable} from '@angular/core';
import {Cd} from './cd.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CdserviceService {

  formData: Cd;
  cdList: Cd[];
  readonly rootURL = 'http://localhost:8080/api/cds';

  constructor(private http: HttpClient) {
  }

  postCd(formData: Cd) {
    return this.http.post(this.rootURL, formData);

  }

  getAll() {
    this.http.get(this.rootURL)
      .toPromise().then(res => this.cdList = res as Cd[]);
    // return this.http.get<Cd>(this.rootURL).pipe(
    //   (map((data: any) => data.result),
    //       catchError(error => {
    //         return throwError('Its a Trap!');
    //       })
    //   ));
  }


  putCd(formData: Cd) {
    return this.http.put(this.rootURL + '/' + formData.id, formData);

  }

  deleteCd(id: number) {
    return this.http.delete(this.rootURL + '/' + id);
  }

  // I Choosed to always filter and call the server side for future purpose so the app can be scallable
  // or if the data is small we can make client side filtering by using for example var _ = require('lodash');
  findByName(name: string) {
    this.http.get(this.rootURL + '?name=' + name)
      .toPromise().then(res => this.cdList = res as Cd[]);
  }

  findByGender(gender: string) {
    this.http.get(this.rootURL + '?gender=' + gender)
      .toPromise().then(res => this.cdList = res as Cd[]);
  }

  findByReleaseDate(from: string, to: string) {
    this.http.get(this.rootURL + '?startDate=' + from + '&endDate=' + to)
      .toPromise().then(res => this.cdList = res as Cd[]);
  }

  findByReleaseDateAndGender(gender: string, from: string, to: string) {
    this.http.get(this.rootURL + '?gender=' + gender + '&startDate=' + from + '&endDate=' + to)
      .toPromise().then(res => this.cdList = res as Cd[]);
  }

  findByReleaseDateAndName(name: string, from: string, to: string) {
    this.http.get(this.rootURL + '?name=' + name + '&startDate=' + from + '&endDate=' + to)
      .toPromise().then(res => this.cdList = res as Cd[]);
  }
}
