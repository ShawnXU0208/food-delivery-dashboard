import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

let restuarants = JSON.parse(localStorage.getItem("restuarants")) || [];
let menus = JSON.parse(localStorage.getItem("menu")) || [];

@Injectable()
export class RequestsHandler implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const { url, method, headers, body, params } = request;
    //const {email, password} = body;

    return of(null)  
        .pipe(mergeMap(handleRoute))
        .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(delay(500))
        .pipe(dematerialize());

    function handleRoute(){
      switch (true) {

        case url.endsWith("/api/restuarants") && method === "GET":
          if(params.get('id')){
            //console.log(params.get('id'));
            return restuarantById(+params.get('id'));
          }else{
            return restuarantsList();
          }

        case url.endsWith("/api/restuarants/add") && method === "POST":
          return addRestuarant();

        case url.endsWith("/api/menus") && method === "GET":
          if(params.get('rid')){
            return menuOfRestuarant(+params.get('rid'));
          }else if(params.get('mid')){
            //return menuList();
            return menuById(+params.get('mid'));
          }else{
            return menuList();
          }

        case url.endsWith("/api/menus/add") && method === "POST":
          return addMenuItem();


        default:
            // pass through any requests not handled above
            return next.handle(request);
      }
    }


    function restuarantsList(){
      return ok(restuarants);
    }

    function restuarantById(id: number){
      let restuarantFound = restuarants.find(restuarant => restuarant.id == id);
      return ok(restuarantFound);
    }

    function addRestuarant(){
      const newRestuarant = body.newRestuarant;
      restuarants.push(newRestuarant);
      localStorage.setItem("restuarants", JSON.stringify(restuarants));
      return ok(newRestuarant);
    }

    function menuList(){
      return ok(menus);
    }

    function addMenuItem(){
      const newMenuItem = body.newMenuItem;
      menus.push(newMenuItem);
      localStorage.setItem("menu", JSON.stringify(menus));
      console.log(newMenuItem);
      return ok(newMenuItem);
    }

    function menuOfRestuarant(id: number){
      //let memuList = [];
      let menuFound = menus.filter(menu => menu.restuarantId == id);
      return ok(menuFound);
    }

    function menuById(id: number){
      let menuFound = menus.find(menu => menu.id == id);
      return ok(menuFound);
    }


    function ok(body?) {
        return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
        return throwError({ error: { message } });
    }

  }
}

