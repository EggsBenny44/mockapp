import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Executer} from '../../../models/executer.enum';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Division} from '../../../models/division.model';
import {User} from '../../../models/user.model';
import {BranchService} from '../../../lib/branch.service';
import {DivisionService} from '../../../lib/division.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @Input() wid: string;
  @Input() executer: Executer;
  @Output() event = new EventEmitter<FormGroup>();

  constructor(private formBuilder: FormBuilder, private branchService: BranchService, private divisionService: DivisionService) { }

  basicInfoForm: FormGroup;
  isLoading = true;
  isReadOnly = this.executer === Executer.APPROVER ? false : true;
  // isBranchSelected = false;
  branches = [
    { branchID: '1', name: 'Kelowna'},
    { branchID: '2', name: 'Vancover'},
    { branchID: '3', name: 'Toronto'}
  ];
  // branchID;
  // defaultItems: Array<Division>;
  // defaultUsers: Array<User>;
  // filteredApplicant: Observable<User[]>;
  // filteredManager: Observable<User[]>;
  minDate: Date = new Date();

  ngOnInit(): void {
    this.setFormGroup();
    this.isLoading = false;
    this.isReadOnly = (this.executer !== Executer.DRAFTER);
    this.event.emit(this.basicInfoForm);

  }


  setFormGroup(): void {
    switch (this.wid) {
      case '1': // Create Account
        this.basicInfoForm = this.formBuilder.group({
          fname:  new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern('^[-a-zA-Z-_]+')]),
          mname:  new FormControl('', [Validators.maxLength(25), Validators.pattern('^[-a-zA-Z-_]+')]),
          lname:  new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern('^[-a-zA-Z-_]+')]),
          branch:  new FormControl('', [Validators.required]),
          divName:  new FormControl('', [Validators.required, Validators.maxLength(50), validDivisionValidator()]),
          managerName:  new FormControl('', [Validators.required])
        });
        break;
      case '2': // Cahnge permission
        this.basicInfoForm = this.formBuilder.group({
          accountName:  new FormControl('', [Validators.required, validUserValidator()]),
          branch:  new FormControl('', [Validators.required]),
          divName:  new FormControl('', [Validators.required, Validators.maxLength(50), validDivisionValidator()]),
          managerName:  new FormControl('', [Validators.required])
        });
        break;

      case '3': // Deactivate account
        this.basicInfoForm = this.formBuilder.group({
          accountName:  new FormControl('', [Validators.required, validUserValidator()]),
          branch:  new FormControl('', [Validators.required]),
          divName:  new FormControl('', [Validators.required, Validators.maxLength(50), validDivisionValidator()]),
          managerName:  new FormControl('', [Validators.required]),
          dod:  new FormControl([{value: new Date(), disabled: true}, Validators.required])
        });
        break;
    }
  }
/*
  setFormData(data: FormData) {
    switch (this.wid) {
    case '1' : // Create Account
        this.basicInfoForm = this.formBuilder.group({
          fname: data.field_fname,
          mname: data.field_mname + ' ',
          lname: data.field_lname,
          office: data.field_office,
          divName: data.field_division,
          managerName: data.field_manager,
        });
        break;
      case '2' : // Cahnge permission
        this.basicInfoForm = this.formBuilder.group({
          accountName: data.field_acc_name,
          office: data.field_office,
          divName: data.field_division,
          managerName: data.field_manager,
        });
        break;
      case '3' : // Deactivate account
        this.basicInfoForm = this.formBuilder.group({
          accountName: data.field_acc_name,
          office: data.field_office,
          divName: data.field_division,
          managerName: data.field_manager,
          dod: new Date(data.field_DOD),
        });
    }
    }
*/
  // private getUserData() {
  //   this.userService.getUsers().subscribe(
  //     (items: Array<User>) => {
  //       this.defaultUsers = items;
  //       if (this.wid !== '1') {
  //         this.filteredApplicant = this.basicInfoForm.get('accountName').valueChanges
  //           .pipe(
  //             startWith(''),
  //             map(value => typeof value === 'string' ? value : value.display_name),
  //             map(name => name ? this._filter(name) : this.defaultUsers.slice())
  //           );
  //       }
  //       this.filteredManager = this.basicInfoForm.get('managerName').valueChanges
  //         .pipe(
  //           startWith(''),
  //           map(value => typeof value === 'string' ? value : value.display_name),
  //           map(name => name ? this._filter(name) : this.defaultUsers.slice())
  //         );
  //       this.isLoading = false;
  //     });
  //
  // }

  // private _filter(name: string): User[] {
  //   const filterValue = name.toLowerCase();
  //
  //   return this.defaultUsers.filter(option => option.displayName.toLowerCase().indexOf(filterValue) === 0);
  // }
  onSelectOffice(branch: any) {
    if (!this.isReadOnly) {
      this.basicInfoForm.get('divName').setValue('');
      // this.isBranchSelected = true;
      // this.branchID = branch.branchID;
      // this.defaultItems = [];
      // this.getDivisions();
    }
  }

  // private getOffices(): void {
  //   this.branchService.get().subscribe (branches => {
  //     this.branches = branches;
  //     this.branchID = this.branches[0].branchID;
  //   });
  // }

  // getDivisions() {
  //   this.divisionService.get(this.branchID).subscribe(
  //     (items: Array<Division>) => {
  //       this.defaultItems = items;
  //       // this.filteredDivisions = this.basicInfoForm.get('divName').valueChanges
  //       //   .pipe(
  //       //     startWith(''),
  //       //     map(value => typeof value === 'string' ? value : value.name),
  //       //     map(name => name ? this._divFilter(name) : this.defaultItems.slice())
  //       //   );
  //     });
  // }
  // onSelectApplicant(event: MatAutocompleteSelectedEvent, applicant: User) {
  //   if (this.wid !== '3') {
  //     // this.permissionComp.getCurrentPermission(applicant.userID);
  //   }
  // }
}
export function validUserValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== '') {
      const usr: User = control.value;
      if (usr.userID === undefined || usr.userID === null) {
        return { userNotFound: true };
      }
    }
    return null;
  };
}

export function validDivisionValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    // if (control.value !== '') {
    //   const div: Division = control.value;
    //   if (div.divisionID === undefined || div.divisionID === null) {
    //     return { divNotFound: true };
    //   }
    // }
    return null;
  };
}
