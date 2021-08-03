import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/commons/category';
import { DataCatQuantityPub } from 'src/app/commons/data-cat-quantity-pub';

import { Publisher } from 'src/app/commons/publisher';


@Injectable({
  providedIn: 'root'
})
export class ListPublisherService {
  
  constructor(private httpClient: HttpClient) { }
  getListPublisher(): Observable<Publisher[]> {
    const url = 'http://localhost:8080/api/publisher';
    return this.httpClient.get<GetPublisherResponse>(url).pipe
      (
        map(response => response._embedded.publisher)
      );
  }
  getCategoryBaseOnPublisher(id: number): Observable<Category[]> {
    const url = 'http://localhost:8080/api/category/search/findByBookAvailabe?id=' + id;
    return this.httpClient.get<GetCategoryResponse>(url).pipe
      (
        map(response => response._embedded.category)
      );
  }
  getQuantityProductBaseOnPublisherAndCat(pub: number, cat: number): Observable<number> {
    const url = `http://localhost:8080/api/book/search/findDataBaseOnCatAndPub?publisher=${pub}&category=${cat}`;
    return this.httpClient.get<GetQuantity>(url).pipe
      (
        map(res => res.page.totalElements)
      );
  }
  getDataPub():Observable<DataCatQuantityPub[]>
  {
    const url=`http://localhost:8080/catwithbookquantity/withpub`;
    return this.httpClient.get<DataCatQuantityPub[]>(url).pipe();
  }
}
interface GetPublisherResponse {
  _embedded:
  {
    publisher: Publisher[];
  }
}
interface GetCategoryResponse {
  _embedded:
  {
    category: Category[];
  }
}
interface GetQuantity {
  page:
  {
    totalElements: number;
  }
}
interface GetData{
  any:DataCatQuantityPub[];
}
