import { Injectable } from '@angular/core';
import {Observable, of } from 'rxjs';
import {Branch} from '../models/branch.model';
import {Division} from '../models/division.model';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  divisions: Division[] = [];

  add(division: Division) {
    this.divisions.push(division);
  }

  clear() {
    this.divisions = [];
  }
  constructor() { }

  get(branchID: number): Observable <Division[]> {
    switch (branchID) {
      case 1:
        this.add(new Division(Division, 'HR', branchID))
        this.add(new Division(Division, 'Development', branchID))
        this.add(new Division(Division, 'Sales', branchID))
        break;
      case 2:
        this.add(new Division(Division, 'Planning', branchID))
        this.add(new Division(Division, 'Acounting', branchID))
        this.add(new Division(Division, 'Sales', branchID))
        break;
      case 3:
        this.add(new Division(Division, 'HR', branchID))
        this.add(new Division(Division, 'Acounting', branchID))
        break;
      default:
        break;
    }
    return of(this.divisions);
  }
}
