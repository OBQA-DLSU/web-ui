import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { ActivatedRoute } from '@angular/router';
import { MiscActionCreator } from '../../../store/action-creators/misc.actioncreator';

@Component({
  selector: 'app-class-page',
  templateUrl: './class-page.component.html',
  styles: []
})
export class ClassPageComponent implements OnInit {

  @select(s => s.misc.myClassId) myClassIdCode;
  
  private routeSubscription: Subscription;
  private myClassId: string;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private miscActionCreator: MiscActionCreator
  ) { }
  ngOnInit() {
  this.routeSubscription = this.activatedRoute.params
  .subscribe(params => {
    this.myClassId = params.id;
    this.miscActionCreator.StoreMyClassId(params.id);
  })
  }

}
