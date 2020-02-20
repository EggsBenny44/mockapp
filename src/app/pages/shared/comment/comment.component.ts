import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() wid: string;
  @Input() executer: string;
  @Input() type: number;
  @Output() event = new EventEmitter<FormGroup>();

  commentForm: FormGroup;
  subtitle: string;
  isReadOnly: boolean;
  isLoading = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.type === 2) {
      this.subtitle = 'Approval Comment';
      this.isReadOnly = false;
      this.commentForm = this.formBuilder.group({
        comment: ['', Validators.compose([Validators.required, removeSpaces, Validators.maxLength(150)])]
      });
      this.isLoading = false;
    } else {
      this.subtitle = 'Justification for Request';
      if (this.executer === '1') {
        this.isReadOnly = false;
        this.commentForm = this.formBuilder.group({
          comment: new FormControl('', [Validators.required, removeSpaces, Validators.maxLength(150)])
        });
      } else {
        // read the applicationData by fid
        this.isReadOnly = true;
        // this.getFormData();
      }
      this.isLoading = false;

    }
    this.event.emit(this.commentForm);
  }

  // private getFormData(): void {
  //   this.formService.getForm(this.fid).subscribe (form => {
  //     this.setFormData(form);
  //     this.isLoading = false;
  //   });
  // }

  // private setFormData(data: FormData) {
  //   data.comments.forEach (c => {
  //     if (c.type === WorkflowConstant.FORM_COMMENT.COMMENT) {
  //       this.commentForm = this.formBuilder.group({
  //         comment: c.field_description
  //       });
  //     }
  //   });
  // }

}
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}
