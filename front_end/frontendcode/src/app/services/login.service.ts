import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl='';
  constructor(private httpClient:HttpClient) { }
}
