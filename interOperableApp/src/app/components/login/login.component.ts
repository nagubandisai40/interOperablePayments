import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { AuthService } from 'src/app/services/auth.service';
import { InteractionServiceService } from 'src/app/services/interaction-service.service';
import { Router } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  Rpassword:string;

  constructor(private authService:AuthService,private spinner:NgxSpinnerService,private router:Router,private interactionService:InteractionServiceService) { }

  ngOnInit(): void {

    $(".log-in").click(function () {
      $(".signIn").addClass("active-dx");
      $(".signUp").addClass("inactive-sx");
      $(".signUp").removeClass("active-sx");
      $(".signIn").removeClass("inactive-dx");
    });

    $(".back").click(function () {
      $(".signUp").addClass("active-sx");
      $(".signIn").addClass("inactive-dx");
      $(".signIn").removeClass("active-dx");
      $(".signUp").removeClass("inactive-sx");
    });

  }


  login(login)
  {
    if(login.form.status=="INVALID")
    {
      console.log("Form is invalid")
      return;
    }
    // console.log(login)
    var email=login.form.value.email
    var pass=login.form.value.password
    this.spinner.show();
    this.authService.login(email,pass).subscribe(res=>{
      localStorage.setItem('access-token',JSON.stringify(res));
      this.interactionService.sendToHeader(true);
      this.spinner.hide();
      this.router.navigate(['/dashboard'])
      // console.log("Login success response ",res)
    },err=>{
      this.spinner.hide();
      console.log("Error occured while login")
      console.log(err)
    })
  }  
}
