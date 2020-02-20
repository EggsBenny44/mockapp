export class User {
  userID: number;
  firstName: string;
  middleName: string;
  lastName: string;
  displayName: string;
  constructor(userID: number, firstName: string, middleName: string, lastName: string) {
    this.userID = userID;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.displayName = firstName + ' ' + (middleName === '' ? '' : middleName + ' ') + lastName;
  }
}
