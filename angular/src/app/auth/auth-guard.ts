import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AddToCart } from "../commons/add-to-cart";
import { LoginService } from "../components/login/service/login.service";

@Injectable({
    providedIn: 'root' // ADDED providedIn root here.
  })
export class AuthGuard implements CanActivate {
    cartItems:AddToCart[]=[];
    constructor(private loginSer:LoginService,private router:Router)
    {}
    canActivate()
    {
        if(!this.loginSer.checkLogin())
        {
            this.router.navigateByUrl('/login&signup');
        }
        else
        {
            this.cartItems=JSON.parse(localStorage.getItem('cartItems')!);
            if(this.cartItems!=null)
            {
                return true;
            }
            else
                {
                    alert('lam gi co san pham ma vo day');
                    this.router.navigateByUrl('/list-products');
                }
        }
        return false;
    }
}
