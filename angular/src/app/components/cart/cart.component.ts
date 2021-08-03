import { Component, OnInit,Input } from '@angular/core';
import { AddToCart } from 'src/app/commons/add-to-cart';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ProductDetailService } from '../product-detail/service/product-detail.service';
import { Product } from 'src/app/commons/product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() personList!:string[];
  // [personlist]="tag in  personlist"
  cartItems:AddToCart[]=[];
  totalPrice:number=0;
  totalQuantity:number=0;
  product!:Product;
  checkQuantityAvailable:boolean=true;
  constructor(private cartSer:AddToCartService,private productDetailSer:ProductDetailService,private router:Router) { }

  ngOnInit(): void {
    registerLocaleData(es);
    this.cartSer.checkAvailable();
    this.getCartItems();
    this.cartSer.totalPrice.subscribe(
      data=>
      {
        this.totalPrice=data
      }
    );
    this.cartSer.totalQuantity.subscribe(
      data=>
      {
        this.totalQuantity=data
      }
    );
  }
  doCheckOut()
  {
    this.cartItems=JSON.parse(localStorage.getItem('cartItems')!);
    if(this.cartItems.length==0)
    {
      alert('làm gì có sản phẩm mà thanh toán');
      this.router.navigateByUrl('/');
    }
    else
    {
      this.cartSer.checkAvailable();
      this.cartItems=JSON.parse(localStorage.getItem('cartItems')!);
      for(let item of this.cartItems)
      {
        if(item.quantityInstock<item.quantity)
        {
          this.checkQuantityAvailable=false;
          break;
        }
      }
      if(this.checkQuantityAvailable)
        this.router.navigateByUrl('/checkout');
      else
      {
        alert(` Số lượng sản phẩm không hợp lệ`);
      }
    }

  }
  getCartItems()
  {
    this.cartItems=JSON.parse(localStorage.getItem('cartItems')!);
    for(let item of this.cartItems)
    {
      this.productDetailSer.getProductDetailById(item.id).subscribe(
        {
          next:response=>
          {
            this.product=new Product();
            this.product=response;
            item.quantityInstock=this.product.quantity;
          },
          error:err=>
          {

          }
        }
      )
    }
  }
  addQuantity(data:AddToCart)
  {
    this.cartSer.addToCartItem(data);
    this.cartSer.computeData();
    this.getCartItems();
  }
  minusQuantity(data:AddToCart)
  {
    this.cartSer.minusCartItem(data);
    this.cartSer.computeData();
    this.getCartItems();
  }
  removeCart(data:AddToCart)
  {
    this.cartSer.removeCartItem(data);
    this.cartSer.computeData();
    this.getCartItems();
  }
}
