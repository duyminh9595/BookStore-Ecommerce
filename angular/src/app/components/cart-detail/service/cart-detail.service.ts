import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartDetail } from 'src/app/commons/cart-detail';

@Injectable({
  providedIn: 'root'
})
export class CartDetailService {

  constructor(private httpClient:HttpClient) { }
  getCartDetails(email:string,token:string,cartId:number):Observable<CartDetail[]>
  {
    const header:HttpHeaders=new HttpHeaders(
      {
        Authorization: `Bearer ${token}`
      }
    );
    const url=`http://localhost:8080/addtocart/detailcart/${cartId}/${email}`;
    return this.httpClient.get<CartDetail[]>(url,{headers: header}).pipe();
  }
}
