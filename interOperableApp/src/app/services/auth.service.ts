import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url='http://localhost:3000/'

  constructor(private http:HttpClient,private router:Router) { }


  login(userName,userPassword,userorg="org1")
  {
    return this.http.post(this.url+'login',{
      "userName":userName,
      "orgName":userorg,
      "userPassword":userPassword
    })
  }

  isUserLoggedIn():boolean
  {
    const user=JSON.parse(localStorage.getItem('access-token'));
    return user!=null;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  registerUser(userName,userPass,rippleId,orgName="org1"){
    return this.http.post(this.url+'registerUser',{
      "userName":userName,
      "orgName":orgName,
      "rippleId":rippleId,
      "userPassword":userPass
    })
  }


}
