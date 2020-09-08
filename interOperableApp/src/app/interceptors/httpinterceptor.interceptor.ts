import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpinterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(localStorage.getItem('access-token')!=null)
    {
      var ss=JSON.parse(localStorage.getItem('access-token'))['message'];
      // console.log(localStorage.getItem('access-token'))
      const AuthReq=this.addToken(request,ss['token'])
      return next.handle(AuthReq)
    }
    return next.handle(request);
  }
  addToken(req:HttpRequest<any>,token:string){
    return req.clone({
      setHeaders:{
        "Authorization":'Bearer '+token
      }
    })
  }

}
