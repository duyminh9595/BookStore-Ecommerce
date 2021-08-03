import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountCart } from 'src/app/commons/account-cart';
import { AccountCartService } from './service/account-cart.service';

@Component({
  selector: 'app-account-cart',
  templateUrl: './account-cart.component.html',
  styleUrls: ['./account-cart.component.css']
})
export class AccountCartComponent implements OnInit {
  accountCart:AccountCart[]=[];
  email!:string;
  size:number=6;
  page:number=1;
  totalElements!:number;
  constructor(private accCartSer:AccountCartService,private router:Router) { }

  ngOnInit(): void {
    this.getAccountCart();
  }
  getAccountCart()
  {
    if(localStorage.getItem('emailLogin')!=null)
    {
      this.email=localStorage.getItem('emailLogin')!;
    }
    else
    {
      this.email=sessionStorage.getItem('emailLogin')!;
    }
    this.accCartSer.getAccountCart(this.email,this.page-1,this.size).subscribe
    (
      this.getData()
      
    );
  }
  getData()
  {
    return (data:any)=>
    {
      this.accountCart=data._embedded.orders;
      this.page=data.page.number +1;
      this.size=data.page.size;
      this.totalElements=data.page.totalElements;
    }   
  }
  detailCart(id:number)
  {
    this.router.navigateByUrl(`/cartdetail/${id}`);
  }
}
