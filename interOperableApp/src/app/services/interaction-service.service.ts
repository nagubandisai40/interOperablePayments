import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionServiceService {


  _loginStatus=new Subject<boolean>();
  loginStatus$=this._loginStatus.asObservable();

  constructor() { }

  sendToHeader(msg:boolean){
    this._loginStatus.next(msg)
  }




}
