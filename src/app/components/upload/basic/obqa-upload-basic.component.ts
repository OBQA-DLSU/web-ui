import { Component, OnInit, Input, Output, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { DialogService } from '../../../services';
import { MiscActionCreator } from '../../../store/action-creators';
// const URL = 'http://127.0.0.1:5000/api/course/bulk/5';

@Component({
  selector: 'app-obqa-upload-basic',
  templateUrl: './obqa-upload-basic.component.html'
})
export class ObqaUploadBasicComponent implements OnInit {

	@Input() fileAlias: string; // file alias must be the same in backend
	@Input() URL; // backend url address

  private headers = new Headers();
	public uploader: FileUploader = new FileUploader({ url: this.URL, itemAlias: this.fileAlias });

	ngOnInit() {
		this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

		};
	}

	constructor(
		private http: Http,
		private el: ElementRef,
		private dialogService: DialogService,
		private miscActionCreator: MiscActionCreator
	) { }

	upload() {
		this.miscActionCreator.LoadSpinner();
    this.headers.append('Access-Control-Allow-Origin','*');
    const options = new RequestOptions({headers: this.headers});
		let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
		let fileCount: number = inputEl.files.length;
		let formData = new FormData();
		if (fileCount > 0) { // a file was selected
			for (let i = 0; i < fileCount; i++) {
				formData.append(this.fileAlias, inputEl.files.item(i));
			}
			this.http
				.post(this.URL, formData, options)
				.map((res: any) => res.json()).subscribe(
				(result) => {
					this.miscActionCreator.FileUploadFulfilled(result);
					this.dialogService.showSwal('success-message', {
						title:  'Upload Success!',
						text: `Succeeded Entry: ${result.success.length}, Failed Entry: ${result.error.length}.`
					});
					this.ngOnInit();
				},
				(error) => {
					this.dialogService.showSwal('error-message', {
            title: 'Upload Failed.',
            text: `Sorry there was a problem encountered while uploading your file.`
          });
					this.miscActionCreator.UnloadSpinner();
				},
				() => this.miscActionCreator.UnloadSpinner()
				);
		}
	}
}
