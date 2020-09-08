import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { CorefunctionsService } from 'src/app/services/corefunctions.service';
import { Router } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {

  constructor(private coreService:CorefunctionsService,private router:Router,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }

  addAsset(formInstance){
    var uid=uuid.v4();
    var name=JSON.parse(localStorage.getItem('access-token')).message['userName']
    
    if(formInstance.form.status=="INVALID")
    {
      console.log("Invalid");
      return;
    }
    var amount=formInstance.form.value.amount
    var cat=formInstance.form.value.cat
    var issuerName=formInstance.form.value.issuerName
    this.spinner.show();
    this.coreService.createAsset(name,uid,name.split("@")[0],issuerName,name,parseInt(amount),cat).subscribe(res=>{
      // console.log("Create Asset Response ",res)
      this.spinner.hide();
      this.router.navigate(['/','services'])
    },err=>{
      this.spinner.hide();
      console.log("create Asset error ",err)
    })
    
  }

}
