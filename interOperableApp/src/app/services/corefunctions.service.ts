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


  createAsset(userName,id,issuerId,issuerName,owner,value,cat)
  {
    return this.http.post(this.url+'createAsset',{userName:userName,id:id,issueId:issuerId,issueName:issuerName,owner:owner,value:value,cat:cat})
  }

  transferAsset(userName,id,owner)
  {
    return this.http.post(this.url+'transferAsset',{userName:userName,id:id,owner:owner})
  }


}
