import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountRegister } from '../commons/account-register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerUrl='http://localhost:8080/api/checkout/dangky';
  constructor(private httpClient:HttpClient) { }
  registsAccount(account:AccountRegister):Observable<any>
  {
    return this.httpClient.post<AccountRegister>(this.registerUrl,account);
  }
}
