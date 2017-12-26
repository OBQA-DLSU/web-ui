import { Component, OnInit, Input, Output, EventEmitter, Inject, DoCheck } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-obqa-table',
  templateUrl: './obqa-table.component.html'
})

export class ObqaTableComponent implements OnInit {

  @Input() tableTitle:string;
  @Input() actionDelete: boolean;
  @Input() actionEdit: boolean;
  @Input() actionMore: boolean;
  @Input() actionViewDetail: boolean;
  @Input() tableDataArray: Observable<any[]>;
  @Input() tableHeaderName: Array<string>;
  @Input() tableHeaderAlias: Array<string>;
  @Output() clickEdit = new EventEmitter<any>();
  @Output() clickDelete = new EventEmitter<any>();
  @Output() clickMore = new EventEmitter<any>();

  private newTableDataArray:any[];
  private currentPage:number = 0; // page number
  private itemPerPage:number = 5; // item per page
  private pagesToShow:number; // pages button between first and last
  private totalItem:number; // total number of item

  constructor (
    private formBuilder: FormBuilder
  ) {}

  ngOnInit () {
    this.tableDataArray
    .map(data => this.chunker(data, this.itemPerPage, this.currentPage))
    .subscribe(
      data => {
        this.newTableDataArray = data
      }
    );
    
  }

  chunker(data, itemPerPage, currentPage) {
    data = _.chunk(data, itemPerPage);
    this.pagesToShow = data.length;
    data = data[currentPage];
    return data;
  }

  ngDoCheck () {
    this.tableDataArray
    .map(data => this.chunker(data, this.itemPerPage, this.currentPage))
    .subscribe(
      data => {
        this.newTableDataArray = data
      }
    )
  }

  actionsEnabled (): boolean {
    return (this.actionDelete || this.actionEdit) ? true : false;
  }

  onFirst() {
    this.currentPage = 0;
  }

  onPrev() {
    if (this.currentPage !== 0){
      this.currentPage--;
    }
  }

  onNext() {
    if ( this.currentPage >= (this.pagesToShow - 1)) {

    } else {
      this.currentPage++;
    }
  }

  onLast() {
   this.currentPage = this.pagesToShow - 1;
  }

  //
  // dataCount (): number {
  //   return (this.tableDataArray) ? this.tableDataArray.length : 0;
  // }

  onEditClick (data) {
    this.clickEdit.emit(data);
  }

  onDeleteClick (data) {
    this.clickDelete.emit(data);
  }

  onMoreClick (data) {
    this.clickMore.emit(data);
  }

}
