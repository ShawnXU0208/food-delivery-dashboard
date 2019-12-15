import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { TimePipe } from './time.pipe';
import { RequestsHandler } from './requests-handler'

@NgModule({
  declarations: [
    AppComponent,
    DashboardListComponent,
    DashboardBodyComponent,
    TimePipe
  ],
  imports: [
    BrowserModule,
    routingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsHandler,
      multi: true
    },
    TimePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
