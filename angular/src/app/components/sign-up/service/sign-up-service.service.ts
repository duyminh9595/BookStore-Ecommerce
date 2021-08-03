import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountRegister } from 'src/app/commons/account-register';

@Injectable({
  providedIn: 'root'
})
export class SignUpServiceService {
  private registerUrl='http://localhost:8080/api/register/signin';
  constructor(private httpClient:HttpClient) { }
  registsAccount(account:AccountRegister):Observable<any>
  {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    return this.httpClient.post<AccountRegister>(this.registerUrl,account,requestOptions);
  }
  checkEmail(email:string):Observable<any>
  { 
    const getEmailUser='http://localhost:8080/api/user-member/search/findByEmail?email='+email;
    return this.httpClient.get<any>(getEmailUser);
  }
}
