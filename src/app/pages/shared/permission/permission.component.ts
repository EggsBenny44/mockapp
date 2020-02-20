import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  permissionForm: FormGroup;
  permissionsData = [
    {  roleID: '1', name: 'Email', description: '', current: false, status: false},
    {  roleID: '2', name: 'Skype', description: '', current: false, status: false},
    {  roleID: '3', name: 'RDP', description: '', current: false, status: false},
    {  roleID: '4', name: 'Timesheet', description: '', current: false, status: false},
    {  roleID: '5', name: 'Back Log', description: '', current: false, status: false},
    {  roleID: '6', name: 'Jira', description: '', current: false, status: false}
  ];
  isReadOnly: boolean;
  isLoading = true;
  constructor(private formBuilder: FormBuilder) { }
  @Input() wid: string;
  @Input() executer: number;
  @Output() event = new EventEmitter<FormGroup>();

  ngOnInit(): void {
    // this.permissionForm = this.formBuilder.group({
    //   permissions: this.formBuilder.array([])}, Validators.requiredTrue
    // );
    this.permissionForm = this.formBuilder.group({
      permissions: new FormArray([])
    });
    this.addCheckboxes();
    this.event.emit(this.permissionForm);
    this.isLoading = false;
  }
  private addCheckboxes() {
    this.permissionsData.forEach((o, i) => {
      const control = new FormControl(o.status);
      (this.permissionForm.controls.permissions as FormArray).push(control);
    });
  }

  updateChkbxArray(id, isChecked, key) {
    const chkArray = this.permissionForm.controls.permissions as FormArray;
    if (isChecked) {
      chkArray.push(new FormControl(id));
    } else {
      const idx = chkArray.controls.findIndex(x => x.value === id);
      chkArray.removeAt(idx);
    }

    // const selectedOrderIds = this.permissionForm.value.permissions
    //   .map((v, i) => (v ? this.permissions[i].current : null))
    //   .filter(v => v !== null);
    // console.log(selectedOrderIds);
  }

  onClick() {
    this.event.emit(this.permissionForm);
  }
}
