import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Priority } from '../../../models/priority.enum';
import { Executer } from '../../../models/executer.enum';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class PriorityComponent implements OnInit {
  priorityForm: FormGroup;
  private p: string;
  constructor(private route: ActivatedRoute) {}
  sub;
  @Input() wid: string;
  @Input() executer: Executer;
  @Input()
  set priority(priority: string) {
    this.p = priority;
  }
  get priority(): string { return this.p; }
  @Output() event = new EventEmitter<FormGroup>();
  selectedValue: string[];


  isSearch: boolean;
  isReadOnly: boolean;


  priorities;
  ngOnInit() {
    this.priority = Priority.NORMAL;
    if (this.executer === Executer.DRAFTER) {
      this.priorities = [
        Priority.URGENT,
        Priority.NORMAL,
        Priority.TRIVIAL];
      this.isReadOnly = false;
    } else {
      this.priorities = [Priority.ALL,
        Priority.URGENT,
        Priority.NORMAL,
        Priority.TRIVIAL];
      this.isReadOnly = true;
    }
    this.priorityForm = new FormGroup({
      priority: new FormControl({value: this.priority, disabled: this.isReadOnly}, Validators.required)
    });
    this.event.emit(this.priorityForm);
  }
}
