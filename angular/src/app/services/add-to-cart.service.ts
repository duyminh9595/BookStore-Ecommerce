import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AddToCart } from '../commons/add-to-cart';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {
  totalPrice:Subject<number>=new BehaviorSubject<number>(0);
  totalQuantity:Subject<number>=new BehaviorSubject<number>(0);
  carts:AddToCart[]=[];
  storage: Storage = localStorage;
  constructor(private httpClient:HttpClient) { 
    let data = JSON.parse(this.storage.getItem('cartItems')!);
    if (data != null) {
      this.carts = data;
      this.computeData();
    }
  }
  addToCartItem(data:AddToCart)
  {
    let existingCartItem:AddToCart=undefined!;
    let checkCartItem:boolean=false;
    if(this.carts.length>0)
    {
      existingCartItem=this.carts.find(item => item.id==data.id)!;
      
    checkCartItem=(existingCartItem!=undefined);
    }

    if(checkCartItem)
    {
      existingCartItem.quantity++;
    }
    else
    {
      this.carts.push(data);
    }
    
    this.storage.setItem('cartItems',JSON.stringify(this.carts));
    this.computeData();
  }
  minusCartItem(data:AddToCart)
  {
    let addToCartItem:AddToCart=this.carts.find(item=>item.id==data.id)!;
    addToCartItem.quantity--;
    if(addToCartItem.quantity==0)
    {
      this.removeCartItem(data)
    }
    this.computeData();
  }
  removeCartItem(data:AddToCart)
  {

    const position=this.carts.findIndex(item=> item.id==data.id);
    if(position>-1)
    {
      this.carts.splice(position,1);
      
    this.computeData();
    }
  }
  findCartItemExists(data:AddToCart)
  {
    let existingCartItem:AddToCart=undefined!;
    let checkCartItem:boolean=false;
    if(this.carts.length>0)
    {
      existingCartItem=this.carts.find(item => item.id==data.id)!;
      
    checkCartItem=(existingCartItem!=undefined);
    }
    return checkCartItem;
  }
  computeData()
  {
    let price:number=0;
    let quantity:number=0;
    for(let item of this.carts)
    {
      quantity+=item.quantity;
      price+=item.quantity*item.price;
    }
    
    this.totalPrice.next(price);
    this.totalQuantity.next(quantity);
    this.storage.setItem('cartItems',JSON.stringify(this.carts));
    console.log(this.carts);
  }
  checkAvailable()
  {
    for(let item of this.carts)
    {
      this.getQuantityAvailable(item.id).subscribe
      (
        data=>
        {
          item.quantityInstock=data.quantity          
        }
      );
    }
    localStorage.removeItem('cartItems');
    this.computeData();
  }
  getQuantityAvailable(bookId:number):Observable<any>
  {
    const url=`http://localhost:8080/api/book/${bookId}`;
    return this.httpClient.get<any>(url).pipe();
  }
}
