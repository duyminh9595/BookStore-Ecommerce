import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountCart } from 'src/app/commons/account-cart';

@Injectable({
  providedIn: 'root'
})
export class AccountCartService {

  constructor(private httpClient:HttpClient) { }
  getAccountCart(mail:string,page:number,size:number)
  {
    const url=`http://localhost:8080/api/order/search/findOrderByUserEmail?email=${mail}&size=${size}&page=${page}`
    return this.httpClient.get<GetAccountCartResponse>(url).pipe();
  }

}
interface GetAccountCartResponse
{
  _embedded:
  {
    orders:AccountCart[]
  },
  page:
  {
    size:number,
    totalElements:number,
    number:number
  };
}
