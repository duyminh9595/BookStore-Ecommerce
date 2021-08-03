import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcceptTokenService {
  private baseUrl=`http://localhost:8080/api/register/confirm?token=`;
  constructor(private httpClient:HttpClient) { }

  confirmTokenEmail(token:string):Observable<any>
  {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    const urlConfirm=`${this.baseUrl}${token}`;
    return this.httpClient.get<any>(urlConfirm,requestOptions);
  }
}
