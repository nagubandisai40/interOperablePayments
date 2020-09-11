import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CorefunctionsService } from 'src/app/services/corefunctions.service';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pay-from',
  templateUrl: './pay-from.component.html',
  styleUrls: ['./pay-from.component.css']
})
export class PayFromComponent implements OnInit {

  constructor(private service:CorefunctionsService,private spinner:NgxSpinnerService) { }

  senderAddr:string;
  rcvrAddr:string;
  amount:string;
  assett:any;
  userName:string;

  ngOnInit(): void {
    var asset=history.state['asset']
    this.assett=asset;
    // console.log(asset)
    if(asset==undefined)
    {
      console.log("Caught Undefined");
      return;
    }
    this.senderAddr=JSON.parse(localStorage.getItem('access-token'))['message']['rippleId']
    this.userName=JSON.parse(localStorage.getItem('access-token')).message['userName']
    
    // console.log("The sender Ripple id is",this.senderAddr);
    this.spinner.show();
    var ownerId=asset['owner'];
    this.amount=asset['value']
    // console.log("The value is ",this.amount)
    this.service.getOwnerId(ownerId).subscribe(res=>{
      // console.log(res)
      this.rcvrAddr=res['rippleId']
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      console.log(err)
    })
    // console.log(asset);
  }
  
  payClick(payform){
    // rcvrAddr: "sssssssssss", senderAddr: "rBFSujZ2Wq9amRSRyhSQS8zFprJcFnJ8uK", secret: "sssssssa"
   if(payform.form.status=="INVALID")
   {
     console.log("Form Invalid");
     return;
   }
   
    var value=payform.form.value.amount
    var rcvrAddr=payform.form.value.rcvrAddr
    var senderAddr=payform.form.value.senderAddr
    var secrete=payform.form.value.secret
    this.service.transferAsset(this.userName,this.assett['ID'],this.userName,senderAddr,rcvrAddr,secrete,value).subscribe(res=>{
      console.log("The result in transfer Asset is ")
      console.log(res);
    },err=>{
      console.log("Error in transfer asset section")
      console.log(err);
    })

    // console.log(payform);
  }

}
