import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/commons/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(private httpClient:HttpClient) { }
  getProductDetailById(id:number):Observable<Product>
  {
    const url='http://localhost:8080/api/book/search/findBookById?id='+id;

    return this.httpClient.get<Product>(url).pipe();
  }
  getProductDetailCategory(id:number):Observable<any>
  {
    const url=`http://localhost:8080/api/book/${id}/category`;
    return this.httpClient.get<any>(url).pipe();
  }
  getProductDetailPublisher(id:number):Observable<any>
  {
    const url=`http://localhost:8080/api/book/${id}/publisher`;
    return this.httpClient.get<any>(url).pipe();
  }
  getProductSugget(idPublish:number,idCat:number,idProduct:number):Observable<Product[]>
  {
    const url=`http://localhost:8080/api/book/search/findData?publisher=${idPublish}&category=${idCat}&id=${idProduct}&size=3`;
    return this.httpClient.get<GetResponseProduct>(url).pipe(
      map(response=>response._embedded.book)
    );
  }
  getProductSuggetPage2(idPublish:number,idCat:number,idProduct:number):Observable<Product[]>
  {
    const url=`http://localhost:8080/api/book/search/findData?publisher=${idPublish}&category=${idCat}&id=${idProduct}&size=3&page=1`;
    console.log(url);
    return this.httpClient.get<GetResponseProduct>(url).pipe(
      map(response=>response._embedded.book)
    );
  }
}
interface GetResponseProduct
{
  _embedded:
  {
    book:Product[];
  }
}
