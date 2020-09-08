import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private authService:AuthService,private router:Router,private ngxSpinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }

  register(registe){
    console.log(registe)

    if(registe.form.status=="INVALID")
    {
      return;
    }
    var email=registe.form.value.email
    var pass=registe.form.value.pass
    var rpass=registe.form.value.rpass
    var rippleid=registe.form.value.rippleId

    if(pass!=rpass)
    {
      console.log("Password doesn't match")
      return
    }
    this.ngxSpinner.show();
    this.authService.registerUser(email,pass,rippleid).subscribe(res=>{
      console.log(res)
      this.ngxSpinner.hide()
      this.router.navigate(['login'])

    },err=>{
      this.ngxSpinner.hide()
      console.log(err)
    })
  }

}
