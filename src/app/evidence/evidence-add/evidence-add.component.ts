import { Component, OnInit, ElementRef, Inject, OnDestroy, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { NgIf } from '@angular/common';
import {
  WEB_API_URL,
  EVIDENCE_TYPE
} from '../../config';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-evidence-add',
  templateUrl: './evidence-add.component.html',
  styleUrls: ['./evidence-add.component.scss']
})
export class EvidenceAddComponent implements OnInit {

  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private el: ElementRef
  ) { }
  @Input() evidence: any;
  private URL: string;;
  private fileAlias: string = 'file';
  private headers = new Headers();
  public uploader: FileUploader = new FileUploader({ url: this.URL, itemAlias: this.fileAlias });
  private httpSubscription: Subscription = null;
  ngOnInit() {
    this.URL = `${WEB_API_URL}/api/evidence/program/${this.evidence.programId}`;
  }

  ngOnDestroy() {
    (this.httpSubscription) ? this.httpSubscription.unsubscribe() : null;
  }

  upload() {
    if (this.evidence) {
      this.headers.append('Access-Control-Allow-Origin', '*');
      const options = new RequestOptions({ headers: this.headers });
      let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
      let fileCount: number = inputEl.files.length;
      let formData = new FormData();
      formData.append('type', this.evidence.type);
      formData.append('assessmentId', this.evidence.assessmentId);
      formData.append('myClassId', this.evidence.myClassId);
      formData.append('programSopiId', this.evidence.programSopiId);
      formData.append('programCourseId', this.evidence.programCourseId);
      if (fileCount > 0) { // a file was selected
        for (let i = 0; i < fileCount; i++) {
          formData.append(this.fileAlias, inputEl.files.item(i));
        }
        this.httpSubscription = this.http
        .post(this.URL, formData, options)
        .map((res: any) => res.json())
        .subscribe(
          (result) => {
            console.log(result);
          },
          (error) => {

          }
        );
      }
    }
  }
}
