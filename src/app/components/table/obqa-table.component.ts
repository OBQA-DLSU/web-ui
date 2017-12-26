import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
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
  @Input() actionMore: boolean;
  @Input() actionViewDetail: boolean;
  @Input() tableDataArray: Array<object>;
  @Input() tableHeaderName: Array<string>;
  @Input() tableHeaderAlias: Array<string>;
  @Output() clickEdit = new EventEmitter<any>();
  @Output() clickDelete = new EventEmitter<any>();
  @Output() clickMore = new EventEmitter<any>();

  constructor (
    private formBuilder: FormBuilder
  ) {}

  ngOnInit () {

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

  onMoreClick (data) {
    this.clickMore.emit(data);
  }

}
