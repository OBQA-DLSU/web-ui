import { Component, OnInit, Input, Output, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { DialogService } from '../../../services';
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
		private http: Http, private el: ElementRef
	) { }

	upload() {
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
				.post(this.URL, formData, options).map((res: any) => res).subscribe(
				(success) => {
					
					this.ngOnInit();
				},
				(error) => alert('Upload Error')
				);
		}
	}

}
