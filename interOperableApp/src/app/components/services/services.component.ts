import { Component, OnInit } from '@angular/core';
import { CorefunctionsService } from 'src/app/services/corefunctions.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { Router } from '@angular/router';
import * as $ from 'jquery'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  assets=[];
  userName:string;
  searchStr:string;
  displayName:string;
  balance={
    "sequence": "",
    "xrpBalance": '',
    "ownerCount": "",
  "previousAffectingTransactionID": '',
  "previousAffectingTransactionLedgerVersion": ""
  }

  constructor(private service:CorefunctionsService,private spinner:NgxSpinnerService,private router:Router) { }

  ngOnInit(): void {
  
    this.userName=JSON.parse(localStorage.getItem('access-token')).message['userName']
    this.displayName=this.userName.split("@")[0]
    this.spinner.show()
    this.service.getAllAssets(this.userName).subscribe(res=>{
      // console.log(res);
      if(res['message']!="")
      {
        this.assets=JSON.parse(res['message'])
      }
      this.spinner.hide();
      // console.log(this.assets)
    },err=>{
      this.spinner.hide();
      console.log(err)
    })
  }

  buyAsset(asset){
    // this.spinner.show();
    // this.service.transferAsset(this.userName,asset.ID,this.userName).subscribe(res=>{
    //   // console.log(res);
    //   this.ngOnInit();
    //   this.spinner.hide();
    // },err=>{
    //   this.spinner.hide();
    //   console.log(err);
    // })
    this.router.navigate(['/','pay'],{state:{'asset':asset}});
  }

  getBalance(){
    var rippleId=JSON.parse(localStorage.getItem('access-token')).message['rippleId']
    // console.log(rippleId);
    this.spinner.show()
    this.service.checkBalance(rippleId).subscribe(res=>{
      console.log(res);
      this.balance=res['message'];
      $("#modal_btn").click()
      this.spinner.hide()
    },err=>{
      console.log("Caught eror in getBalance");
      console.log(err);
      this.spinner.hide()
    })

  }

}
