import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/commons/category';
import { DataCatQuantityBook } from 'src/app/commons/data-cat-quantity-book';

@Injectable({
  providedIn: 'root'
})
export class ListCategoryService {

  constructor(private httpClient:HttpClient) { }
  getListCat():Observable<DataCatQuantityBook[]>
  {
    const url='http://localhost:8080/catwithbookquantity/index';
    return this.httpClient.get<DataCatQuantityBook[]>(url).pipe();
  }
  
}
interface GetCatResponse
{
  any:DataCatQuantityBook[];
}