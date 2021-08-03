import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './components/slider/slider.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginAndSignupComponent } from './components/login-and-signup/login-and-signup.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultPageComponent } from './components/default-page/default-page.component'
import { ReactiveFormsModule } from '@angular/forms';
import { AcceptTokenComponent } from './components/accept-token/accept-token.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ListProductsContentComponent } from './components/list-products-content/list-products-content.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AuthGuard } from './auth/auth-guard';
import { ListPubliserComponent } from './components/list-publiser/list-publiser.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { AccountAuth } from './auth/account-auth';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountCartComponent } from './components/account-cart/account-cart.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';


const routes: Routes = [
  { path: 'login&signup', component: LoginAndSignupComponent },
  { path: 'account', component: AccountDetailComponent,canActivate:[AccountAuth] },
  {
    path: '', component: HomepageComponent, children: [

      { path: '', component: DefaultPageComponent },
      {
        path: '', component: ListProductsComponent, children: [
          {
            path: 'list-products', component: ListProductsContentComponent
            
          },
          {path:'product/:productId',component:ProductDetailComponent},
          {path:'pubId/:pubId/catId/:catId',component:ListProductsContentComponent},
          {path:'catId/:catIdOnly',component:ListProductsContentComponent},
          {path:'search/:keyword',component:ListProductsContentComponent},
          {path:'',redirectTo:'/list-products',pathMatch:'full'}
        ]
      }
    ]
  },
  {path:'cart',component:CartComponent},
  { path: '#', redirectTo: '', pathMatch: 'full' },
  {path: 'account-cart', component:AccountCartComponent,canActivate:[AccountAuth]},
  {path: 'cartdetail/:cartid', component:CartDetailComponent,canActivate:[AccountAuth]},
  {path:'checkout',component:CheckOutComponent,canActivate:[AuthGuard]},
  {path: '**', redirectTo: '/list-products', pathMatch: 'full'},
  { path: "api/register/confirm/token/:tokencofirmemail", component: AcceptTokenComponent },

]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    LoginAndSignupComponent,
    HomepageComponent,
    DefaultPageComponent,
    AcceptTokenComponent,
    ListProductsComponent,
    ListProductsContentComponent,
    ProductDetailComponent,
    CartComponent,
    CheckOutComponent,
    ListPubliserComponent,
    ListCategoryComponent,
    SearchProductComponent,
    AccountDetailComponent,
    AccountCartComponent,
    CartDetailComponent
  ],
  imports: [
    RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'}),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]

})
export class AppModule { }
