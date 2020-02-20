import { Injectable } from '@angular/core';
import {Branch} from '../models/branch.model';
import {Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  branches: Branch[] = [];

  add(branch: Branch) {
    this.branches.push(branch);
  }

  clear() {
    this.branches = [];
  }

  constructor() { }

  get(): Observable <Branch[]> {
    // const url = SERVER_URL + '/offices';
    // return this.http.get<Office[]>(url, httpOptions)
    //   .pipe(
    //     catchError(err => {
    //       console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
    //       return throwError(err);
    //     })
    //   );

    this.add(new Branch(1, 'Kelowna'))
    this.add(new Branch(2, 'Vancouver'))
    this.add(new Branch(3, 'Toronto'))
    return of(this.branches);

  }
}
