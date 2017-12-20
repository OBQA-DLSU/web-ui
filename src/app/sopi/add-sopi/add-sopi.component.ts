import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { SopiActionCreator } from './../../store/action-creators/sopi.actioncreator';

@Component({
  selector: 'app-add-sopi',
  templateUrl: './add-sopi.component.html'
})
export class AddSopiComponent implements OnInit {
  private sopiForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private sopiActionCreator: SopiActionCreator
  ) { }

  ngOnInit() {
    this.sopiForm = this.formBuilder.group({
      code: [null, Validators.required],
      description: [null, Validators]
    });
  }
  
  onSubmit() {
    if (this.sopiForm.valid) {
      // this.sopiActionCreator.CreateSopi(programID, this.sopiForm.value);
    }
    console.log(this.sopiForm.value);
  }

}
