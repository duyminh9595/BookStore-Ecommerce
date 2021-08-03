import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetail } from 'src/app/commons/account-detail';
import { UpdateAccountDetail } from 'src/app/commons/update-account-detail';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailServiceService {

  constructor(private httpClient:HttpClient) { }
  getAccountDetail(token:string,email:string):Observable<any>
  {
    const header:HttpHeaders=new HttpHeaders(
      {Authorization:`Bearer ${token}`}
    )
    const url=`http://localhost:8080/userdetail/app/userdetail`;
    let user:AccountDetail=new AccountDetail();
    user.email=email;
    return this.httpClient.post<any>(url,user,{headers: header}).pipe();
  }
  updateAccountDetail(token:string,data:UpdateAccountDetail):Observable<any>
  {
    const url=`http://localhost:8080/userdetail/app/updatedetail`;
    const header:HttpHeaders=new HttpHeaders(
      {Authorization:`Bearer ${token}`}
    )
    return this.httpClient.post<any>(url,data,{headers: header}).pipe();
  }
}
