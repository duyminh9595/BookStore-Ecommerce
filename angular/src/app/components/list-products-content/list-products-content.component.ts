import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/commons/product';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { ListProductsService } from '../list-products/service/list-products.service';
import es from '@angular/common/locales/es';
import { AddToCart } from 'src/app/commons/add-to-cart';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-products-content',
  templateUrl: './list-products-content.component.html',
  styleUrls: ['./list-products-content.component.css']
})
export class ListProductsContentComponent implements OnInit {

  page: number = 1;
  totalElements!: number;
  size: number = 9;
  products: Product[] = [];
  previousPubId!: number;
  previousCatId!: number;


  currentName!: string;
  preName!: string;
  constructor(private listProSer: ListProductsService, private addToCartSer: AddToCartService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    registerLocaleData(es);
    this.activeRoute.paramMap.subscribe(() => this.listProducts());
  }
  listProducts() {
    let checkProCatId = this.activeRoute.snapshot.paramMap.has('catId');
    checkProCatId = this.activeRoute.snapshot.paramMap.has('pubId');
    let checkOnLy = this.activeRoute.snapshot.paramMap.has('catIdOnly');
    let checkNameSearch=this.activeRoute.snapshot.paramMap.has('keyword');
    this.products = [];
    if(checkNameSearch)
    {
      this.getProductByName();
    }
    else
    {
      if (checkOnLy) {
        this.getProductByCatId();
      }
      else {
        if (!checkProCatId) {
          this.getProducts();
        }
        else {
          this.getProductByCatAndPub();
  
        }
      }
    }
    checkNameSearch=false;
    checkOnLy = false;
    checkProCatId = false;
    window.scrollTo(0, 0);
  }
  getProductByName()
  {
    this.currentName=this.activeRoute.snapshot.paramMap.get('keyword')!;
    if(this.currentName!=this.preName)
    {
      this.page-1;
    }
    this.preName=this.currentName;
    this.listProSer.getProductListByName(this.page-1,this.size,this.currentName).subscribe
    (
      this.getData()
    );
  }
  getProductByCatId() {
    let catId = +this.activeRoute.snapshot.paramMap.get('catIdOnly')!;
    this.listProSer.getProductListByCatId(this.page - 1, this.size, catId).subscribe
      (
        this.getData()
      );
  }
  getProductByCatAndPub() {
    let catId = +this.activeRoute.snapshot.paramMap.get('catId')!;
    let pubId = +this.activeRoute.snapshot.paramMap.get('pubId')!;
    console.log(catId);
    console.log(pubId);
    this.listProSer.getProductListByCatIdAndPubId(this.page - 1, this.size, catId, pubId).subscribe
      (
        this.getData()
      );
  }
  getProducts() {
    this.listProSer.getProductList(this.page - 1, this.size).subscribe(
      this.getData()
    );
  }
  getData() {
    return (data: any) => {
      this.products = data._embedded.book;

      this.page = data.page.number + 1;
      this.totalElements = data.page.totalElements;
      this.size = data.page.size;
    }
  }
  addToCart(product: Product) {
    const cartItem = new AddToCart(product);
    if (!this.addToCartSer.findCartItemExists(cartItem)) {
      this.addToCartSer.addToCartItem(cartItem);
    }
    this.addToCartSer.addToCartItem(cartItem);
    this.addToCartSer.computeData();

  }
  showProductDetail(data: Product) {
    this.router.navigateByUrl(`/product/${data.id}`);
  }
}
