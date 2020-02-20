import {Branch} from './branch.model';
export class Division {
  divisionID: number;
  name: string;
  branchID: number;

  constructor(divisionID, name, branchID) {
    this.divisionID = divisionID;
    this.name = name;
    this.branchID = branchID;
  }
}
