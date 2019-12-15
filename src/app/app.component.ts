import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';

import { PageLayoutService } from './services/page-layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked{
  title = 'food-delivery-dashboard';
  subscription: Subscription;
  urlSubscription: Subscription;
  layoutMode: number;

  constructor(
    //private globlaDataService: GlobalDataService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private pageLayoutService: PageLayoutService
  ){
  }

  ngOnInit(){
    this.urlSubscription = this.pageLayoutService.getCurrentUrl().subscribe(data => {
      this.layoutMode = data.layoutMode;
      console.log(this.layoutMode);
    });
  }

  ngAfterViewChecked(){
    //console.log(this.router.url);
    this.ref.detectChanges();
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }
}
