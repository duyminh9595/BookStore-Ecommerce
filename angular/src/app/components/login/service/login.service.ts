import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserLogin } from 'src/app/commons/user-login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl='http://localhost:8080/api/register/login';

  sessionStore: Storage = sessionStorage;
  localStore: Storage = localStorage;
  emailLogin: Subject<string> = new BehaviorSubject<any>(1);
  tokenLogin: Subject<string> = new BehaviorSubject<any>(1);
  constructor(private httpClient:HttpClient) { }
  doLogin(data:UserLogin):Observable<any>
  {
    // const requestOptions: Object = {
    //   /* other options here */
    //   responseType: 'text'
    // }
    return this.httpClient.post<any>(this.loginUrl,data);
  }
  checkLogin()
  {
    if (localStorage.getItem('tokenLogin')!=null) {
      const email = this.localStore.getItem('emailLogin')!;
      const token = this.localStore.getItem('tokenLogin')!;
      this.emailLogin.next(email);
      this.tokenLogin.next(token);
      return true;
    }
    else {
      if (sessionStorage.getItem('tokenLogin')!=null) {
        const email = this.sessionStore.getItem('emailLogin')!;
        const token = this.sessionStore.getItem('tokenLogin')!;
        this.emailLogin.next(email);
        this.tokenLogin.next(token);
        return true;
      }
      else {
        return false;
      }
    }
  }
  getAccount() {

    if (JSON.parse(this.localStore.getItem('tokenLogin')!)) {
      const email = JSON.parse(this.localStore.getItem('emailLogin')!);
      const token = JSON.parse(this.localStore.getItem('tokenLogin')!);
      this.emailLogin.next(email);
      this.tokenLogin.next(token);
      return 1;
    }
    else {
      if (JSON.parse(this.sessionStore.getItem('tokenLogin')!)) {
        const email = JSON.parse(this.sessionStore.getItem('emailLogin')!);
        const token = JSON.parse(this.sessionStore.getItem('tokenLogin')!);
        this.emailLogin.next(email);
        this.tokenLogin.next(token);
        return 2;
      }
      else {
        return 0;
      }
    }
  }
}
