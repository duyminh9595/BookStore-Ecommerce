import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/commons/category';
import { DataCatQuantityBook } from 'src/app/commons/data-cat-quantity-book';
import { QuantitybookWithCategory } from 'src/app/commons/quantitybook-with-category';
import { ListCategoryService } from './service/list-category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  cats: DataCatQuantityBook[] = [];
  constructor(private listCat: ListCategoryService) { }

  ngOnInit(): void {
    this.listCat.getListCat().subscribe
    (
      data=>
      {
        this.cats=data;
      }
    )
  }

}
