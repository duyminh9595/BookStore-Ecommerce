import { Component, OnInit } from '@angular/core';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  emailLogin!:string;
  public checkStatusLogin:boolean=false;
  constructor(private loginSer:LoginService,private addToCartSer:AddToCartService) { }
  totalPrice!:number;
  totalQuantity!:number;
  ngOnInit(): void {
    if(localStorage.getItem('tokenLogin')!=null || sessionStorage.getItem('tokenLogin')!=null)
    {
      this.checkStatusLogin=true;
    }
    else
    {
      this.checkStatusLogin=false;
    }
    this.addToCartSer.totalPrice.subscribe
    (
      data=>
      {
        this.totalPrice=data
      }
    );
    this.addToCartSer.totalQuantity.subscribe
    (
      data=>
      {
        this.totalQuantity=data
      }
    );
  }
  logOut()
  {
    localStorage.removeItem('tokenLogin');
    sessionStorage.removeItem('tokenLogin');
    sessionStorage.removeItem('emailLogin');
    localStorage.removeItem('emailLogin');
    this.checkStatusLogin=false;
    window.location.reload();
  }

}
