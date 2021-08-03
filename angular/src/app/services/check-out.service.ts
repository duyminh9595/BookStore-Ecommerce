import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ThanhPho } from '../commons/thanh-pho';
import { map } from 'rxjs/operators';
import { DataCheckout } from '../commons/data-checkout';
@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  constructor(private httpClient: HttpClient) { }
  getThanhPho(): Observable<any> {
    const url = 'https://provinces.open-api.vn/api/';
    return this.httpClient.get<any>(url).pipe();
  }
  getDistinct():Observable<any>
  {
    const url='https://provinces.open-api.vn/api/d/';
    return this.httpClient.get<any>(url).pipe();
  }
  getWards():Observable<any>
  {
    const url='https://provinces.open-api.vn/api/w/';
    return this.httpClient.get<any>(url).pipe();
  }
  getInforAccount(): Observable<any> {
    const url = 'http://localhost:8080/userdetail/app/index';
    if (localStorage.getItem('tokenLogin') != null) {
      const yourHeader: HttpHeaders = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('tokenLogin')}`
      });
      let data: DataCheckout = new DataCheckout();
      data.email = localStorage.getItem('emailLogin')!;
      return this.httpClient.post<any>(url, data, { headers: yourHeader });
    }
    else {
      const yourHeader: HttpHeaders = new HttpHeaders({
        Authorization: `Bearer ${sessionStorage.getItem('tokenLogin')}`
      });
      let data: DataCheckout = new DataCheckout();
      data.email = sessionStorage.getItem('emailLogin')!;
      return this.httpClient.post<any>(url, data, { headers: yourHeader });
    }
  }
  doCheckOut(data: DataCheckout) {
    const url = `http://localhost:8080/addtocart/checkout`;
    if (localStorage.getItem('tokenLogin') != null) {
      const yourHeader: HttpHeaders = new HttpHeaders(
        {
          Authorization: `Bearer ${localStorage.getItem('tokenLogin')}`
        }
      )

      return this.httpClient.post<any>(url, data, { headers: yourHeader });
    }
    else
    {
      {
        const yourHeader: HttpHeaders = new HttpHeaders(
          {
            Authorization: `Bearer ${sessionStorage.getItem('tokenLogin')}`
          }
        )
  
        return this.httpClient.post<any>(url, data, { headers: yourHeader });
      }
    }
  }
}
interface GetThanhPhoResponse {
  LtsItem: ThanhPho[];
}
