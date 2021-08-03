import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartDetail } from 'src/app/commons/cart-detail';
import { CartDetailService } from './service/cart-detail.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  cartDetails:CartDetail[]=[];
  email!:string;
  token!:string;
  cartId!:number;
  constructor(private cartDetailSer:CartDetailService,private activeRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(()=>this.getCartDetails());
  }
  
  getCartDetails()
  {
    if(localStorage.getItem('emailLogin')!=null)
    {
      this.email=localStorage.getItem('emailLogin')!;
      this.token=localStorage.getItem('tokenLogin')!;
    }
    else
    {
      this.email=sessionStorage.getItem('emailLogin')!;
      this.token=localStorage.getItem('tokenLogin')!;
    }
    if(this.activeRoute.snapshot.paramMap.has('cartid'))
    {
      this.cartId=+this.activeRoute.snapshot.paramMap.get('cartid')!;
      this.cartDetailSer.getCartDetails(this.email,this.token,this.cartId).subscribe
      (
        {
          next:response=>
          {
            this.cartDetails=response
          },
          error:err=>
          {
            localStorage.removeItem('emailLogin');
          localStorage.removeItem('tokenLogin');
          sessionStorage.removeItem('emailLogin');
          sessionStorage.removeItem('tokenLogin');
          alert(` Phiên Đăng Nhập Đã Hết Hạn, Vui Lòng Đăng Nhập Lại`);
          window.location.reload();
          this.router.navigateByUrl('/login&signup')
          }
        }
      );
    }
    else
    {
      this.router.navigateByUrl('/');
    }
  }
}
