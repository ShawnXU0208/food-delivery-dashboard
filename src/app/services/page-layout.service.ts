import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageLayoutService {

  private modeSubject = new Subject<any>();
  private layoutMode: number;

  constructor() {}

  changeLayout(mode: number){
    this.modeSubject.next({layoutMode: mode});
    this.layoutMode = mode;
  }

  getCurrentUrl(): Observable<any>{
    return this.modeSubject.asObservable();
  }

  getLayout(){
    return this.layoutMode;
  }
}

