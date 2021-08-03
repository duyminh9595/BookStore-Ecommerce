import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/commons/category';
import { DataCatQuantityPub } from 'src/app/commons/data-cat-quantity-pub';
import { Product } from 'src/app/commons/product';
import { PublishCategroyBook } from 'src/app/commons/publish-categroy-book';
import { Publisher } from 'src/app/commons/publisher';
import { QuantitybookWithCategory } from 'src/app/commons/quantitybook-with-category';
import { ListPublisherService } from './service/list-publisher.service';

@Component({
  selector: 'app-list-publiser',
  templateUrl: './list-publiser.component.html',
  styleUrls: ['./list-publiser.component.css']
})
export class ListPubliserComponent implements OnInit {
  publishers: Publisher[] = [];
  categories: Category[] = [];
  dataCatPubBook: QuantitybookWithCategory[] = [];
  tempdataCatPubBook!: QuantitybookWithCategory;
  bookCatPub: PublishCategroyBook[] = [];
  tempData!: PublishCategroyBook;
  quantity: number = 0;
  pretPub!: number;
  preCat!: number;




  dataCatQuantityPub: DataCatQuantityPub[] = [];
  constructor(private publisherSer: ListPublisherService, private router: Router) { }

  ngOnInit(): void {
    this.publisherSer.getDataPub().subscribe(
      data => {
        this.dataCatQuantityPub = data;

      }
    )



    // this.publisherSer.getListPublisher().subscribe
    // (
    //   data =>
    //   {
    //     this.publishers=data;
    //     for(let publish of this.publishers)
    //     {
    //       this.tempData=new PublishCategroyBook(publish);
    //       this.bookCatPub.push(this.tempData);
    //     }
    //     console.log(this.bookCatPub);
    //   }
    // );
  }
  expandDetailPublisher(pubId: number) {
    console.log(pubId);
    let positionOfPub: number = this.bookCatPub.findIndex(item => item.publisher.id == pubId);
    if (this.bookCatPub[positionOfPub].lsCat.length == 0) {
      this.categories = [];
      this.publisherSer.getCategoryBaseOnPublisher(pubId).subscribe
        (
          data => {
            this.categories = data;
            this.dataCatPubBook = [];
            for (let cat of this.categories) {
              this.publisherSer.getQuantityProductBaseOnPublisherAndCat(pubId, cat.id).subscribe
                (
                  data => {
                    this.quantity = data;
                    this.tempdataCatPubBook = new QuantitybookWithCategory(cat, this.quantity);
                    this.dataCatPubBook.push(this.tempdataCatPubBook);
                  }
                )
            }
            this.bookCatPub[positionOfPub].lsCat = this.dataCatPubBook;
          }
        );
    }
  }
}
