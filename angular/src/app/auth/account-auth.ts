import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../components/login/service/login.service";

@Injectable({
    providedIn: 'root' // ADDED providedIn root here.
})
export class AccountAuth implements CanActivate {
    constructor(private loginSer: LoginService, private router: Router) { }
    canActivate() {

        if (!this.loginSer.checkLogin()) {
            this.router.navigateByUrl('/login&signup');
        }
        else {
            return true;
        }
        return false;
    }
}
