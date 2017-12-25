import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
  @Input() actionViewDetail: boolean;
  @Input() tableDataArray: Array<object>;
  @Input() tableHeaderName: Array<string>;
  @Input() tableHeaderAlias: Array<string>;
  @Output() clickEdit = new EventEmitter<any>();
  @Output() clickDelete = new EventEmitter<any>();

  private newTableDataArray:Array<object>;
  private page:number; // current page
  private perPage:number = 5; // data per page
  private pageNumber:number; // number of page
  private pagesToShow:number; // number of page between prev and next btn
  private count:number; // number of data of all pages

  constructor (
    private formBuilder: FormBuilder
  ) {}

  ngOnInit () {
    this.getInitialData();
  }

  getInitialData() {
    // set current page initial value
    this.page=0;

    // Slice the Initial Array by per-page value
    let createTableDataArray = _.chunk(this.tableDataArray, this.perPage);

    // get a page of array  
    this.newTableDataArray = createTableDataArray[this.page];

    // count the number of pagination buttons
    this.pagesToShow = _.map(createTableDataArray);
  }

  getNewData() {

    // Slice the Initial Array by per-page value
    let createTableDataArray = _.chunk(this.tableDataArray, this.perPage);

    // get a page of array  
    this.newTableDataArray = createTableDataArray[this.page];

    // count the number of pagination buttons
    this.pagesToShow = _.map(createTableDataArray);
  }

  onLast() {
    this.page = (_.map(this.pagesToShow).length - 1);
    this.getNewData();
  }
  onFirst() {
    this.page = 0;
    this.getNewData();
  }
  onChangePage(value) {
    this.page = value;
    this.getNewData();
  }

  actionsEnabled (): boolean {
    return (this.actionDelete || this.actionEdit) ? true : false;
  }

  dataCount (): number {
    return (this.tableDataArray) ? this.tableDataArray.length : 0;
  }

  onEditClick (data) {
    this.clickEdit.emit(data);
  }

  onDeleteClick (data) {
    this.clickDelete.emit(data);
  }

}
