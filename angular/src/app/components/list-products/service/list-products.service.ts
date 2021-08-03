import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/commons/product';

@Injectable({
  providedIn: 'root'
})
export class ListProductsService {

  constUrl='http://localhost:8080/api/book';
  constructor(private httpClient:HttpClient) { }
  getProductList(number:number,size:number)
  {
    const productUrl=`${this.constUrl}?size=${size}&page=${number}`;
    return this.httpClient.get<GetResponseProduct>(productUrl).pipe();
  }
  getProductListByCatIdAndPubId(number:number,size:number,catId:number,pubId:number)
  { 
    const url = `http://localhost:8080/api/book/search/findDataBaseOnCatAndPub?publisher=${pubId}&category=${catId}&size=${size}&page=${number}`;
    return this.httpClient.get<GetResponseProduct>(url).pipe();
  }
  getProductListByCatId(nummber:number,size:number,catId:number)
  {
    const url=`http://localhost:8080/api/book/search/findByCategoryId?id=${catId}&size=${size}&page=${nummber}`;
    return this.httpClient.get<GetResponseProduct>(url).pipe();
  }
  getProductListByName(number:number,size:number,name:string)
  {
    const url=`http://localhost:8080/api/book/search/findByNameContaining?name=${name}&page=${number}&size=${size}`;
    return this.httpClient.get<GetResponseProduct>(url).pipe();
  }
}
interface GetResponseProduct{
  _embedded:
  {
    book:Product[];
  },
  page:
  {
    number:number,
    totalElements:number,
    size:number
  };
}

