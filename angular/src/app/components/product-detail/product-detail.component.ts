import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/commons/product';
import { ProductDetailService } from './service/product-detail.service';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { AddToCart } from 'src/app/commons/add-to-cart';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product:Product=new Product();
  productSuggest:Product[]=[];
  productSuggestPage2:Product[]=[];
  nxb!:string;
  nxbId!:number;
  categoryId!:number;
  category!:string;
  constructor(private activeRoute:ActivatedRoute,private router:Router,private productDetailSer:ProductDetailService,private addToCartSer:AddToCartService) { }

  ngOnInit(): void {
    
    registerLocaleData(es);
    this.activeRoute.paramMap.subscribe(()=>this.getDetailProducts())
  }
  getDetailProducts()
  {
    const checkProductId=this.activeRoute.snapshot.paramMap.has('productId');
    if(checkProductId)
    { 
      const id=+this.activeRoute.snapshot.paramMap.get('productId')!;
      this.productDetailSer.getProductDetailById(id).subscribe
      (
        {
          next:response=>
          {
            this.product=response;
            this.productDetailSer.getProductDetailCategory(id).subscribe(
              data=>
              {
                this.categoryId=data.id;
                this.category=data.name;this.productDetailSer.getProductDetailPublisher(id).subscribe(
                  data=>
                  {
                    this.nxbId=data.id;
                    this.nxb=data.name;
                    this.productDetailSer.getProductSugget(this.nxbId,this.categoryId,id).subscribe(
                      data=>
                      {
                        this.productSuggest=data
                      }
                    );
                    this.productDetailSer.getProductSuggetPage2(this.nxbId,this.categoryId,id).subscribe(
                      data=>
                      {
                        this.productSuggestPage2=data
                      }
                    );
                  }
                )
              }
            )
            
            
          },
          error:err=>
          {
            this.router.navigateByUrl('/list-products');
          }
        }
      );
    }
    else
    {
      this.router.navigateByUrl('/list-products');
    }
  }
  addToCart(item:Product)
  {
    const cartItem=new AddToCart(item);
    if(!this.addToCartSer.findCartItemExists(cartItem))
    {
      this.addToCartSer.addToCartItem(cartItem);
    }
    this.addToCartSer.addToCartItem(cartItem);
    this.addToCartSer.computeData();
    alert(` Thêm thành công`);
  }
  
  addToCartWithQuantity(product:Product,quantity:number)
  {
    if(quantity<=0)
    {
      alert(` Số lượng ${quantity} không hợp lệ`)
    }
    else
    {
      const cartItem=new AddToCart(product);
    if(!this.addToCartSer.findCartItemExists(cartItem))
    {
      this.addToCartSer.addToCartItem(cartItem);
    }
    for(let i=1;i<=quantity;i++)
    {
      this.addToCartSer.addToCartItem(cartItem);
    }
    this.addToCartSer.computeData();
    }
    alert(` Thêm thành công`);
  }
}
