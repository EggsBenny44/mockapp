import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Executer} from '../../models/executer.enum';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-appform',
  templateUrl: './appform.component.html',
  styleUrls: ['./appform.component.css']
})
export class AppformComponent implements OnInit, OnDestroy {
  sub;
  wid: string;
  executer: Executer;
  title;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }
  applicationForm: FormGroup;
  isLoading = true;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.wid = params.wid;
      this.executer = params.exc;
    });
    this.applicationForm = this.formBuilder.group({
    });
    if (this.wid === '1') {
      this.title = 'CREATE ACCOUNT APPLICATION';
    } else if (this.wid === '2') {
      this.title = 'CHANGE PERMISSIONS APPLICATION';
    } else if (this.wid === '3') {
      this.title = 'DEACTIVATE ACCOUNT APPLICATION';
    } else {
      this.title = 'PAGE NOT FOUND!!';
    }
    this.isLoading = false;
  }
  formInitialized(name: string, form: FormGroup) {
    this.applicationForm.setControl(name, form);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  public apply = (applicationFormValue) => {
    console.log('button click');
  }
}
