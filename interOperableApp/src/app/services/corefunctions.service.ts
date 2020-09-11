import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CorefunctionsService {

  url="http://localhost:3000/"
  constructor(private http:HttpClient) { }

  getAllAssets(userName)
  {
    return this.http.get(this.url+'allAssets',{headers:{'userName':userName}})
  }


  createAsset(userName,id,issuerId,issuerName,owner,value,cat,assetName)
  {
    return this.http.post(this.url+'createAsset',{userName:userName,id:id,issueId:issuerId,issueName:issuerName,owner:owner,value:value,cat:cat,assetName:assetName})
  }

  transferAsset(userName,id,owner,senderAddr,rcvrAddr,secrete,value)
  {
    return this.http.post(this.url+'transferAsset',{userName:userName,id:id,owner:owner,senderAddr:senderAddr,rcvrAddr:rcvrAddr,scrt:secrete,value:value})
  }

  getOwnerId(ownerId)
  {
    return this.http.get(this.url+'ownerRippleId',{headers:{'owner':ownerId}})
  }

  checkBalance(rippleId){
    return this.http.post(this.url+"test_view",{'rippleId':rippleId})
  }


}
