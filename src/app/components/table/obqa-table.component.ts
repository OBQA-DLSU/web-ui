import { Component, OnInit, Input } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

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
  
  ngOnInit () {}

  actionsEnabled (): boolean {
    return (this.actionDelete || this.actionEdit) ? true : false;
  }

  dataCount (): number {
    return (this.tableDataArray) ? this.tableDataArray.length : 0;
  }

}
