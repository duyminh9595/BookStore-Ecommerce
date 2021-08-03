import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddToCart } from 'src/app/commons/add-to-cart';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { LoginService } from '../login/service/login.service';
import es from '@angular/common/locales/es';
import { ThanhPho } from 'src/app/commons/thanh-pho';
import { CheckOutService } from 'src/app/services/check-out.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormRegister } from 'src/app/validators/form-register';
import { Checkout } from 'src/app/commons/checkout';
import { Order } from 'src/app/commons/order';
import { OrderDetail } from 'src/app/commons/order-detail';
import { Router } from '@angular/router';
import { Distinct } from 'src/app/commons/distinct';
import { Wards } from 'src/app/commons/wards';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  totalPrice: number = 0;
  totalQuantity: number = 0;
  thanhpho: ThanhPho[] = [];
  name!: string;
  email!: string;
  dataBody!: Checkout;
  dataOrder!: Order;
  dataOrderDetail!: OrderDetail[];
  tempDataOrderDetail!: OrderDetail;
  formCko!: FormGroup;
  carts!: AddToCart[];
  formAddress!: FormGroup;
  distinct!: Distinct[];
  distinctBaseOnProvinceCode!: Distinct[];
  wards!: Wards[];
  wardsSelected!: Wards[];
  cartItems:AddToCart[]=[];
  checkQuantityAvailalbe:boolean=true;
  constructor(private loginSer: LoginService, private addToCartSer: AddToCartService, private ckOutSer: CheckOutService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.cartItems=JSON.parse(localStorage.getItem('cartItems')!);
    if(this.cartItems.length==0)
    {
      alert('làm gì có sản phẩm mà thanh toán');
      this.router.navigateByUrl('/');
    }
    for(let item of this.cartItems)
    {
      if(item.quantity>item.quantityInstock)
      {
        this.checkQuantityAvailalbe=false;
        break;
      }
    }
    if(!this.checkQuantityAvailalbe)
    {
      alert(` Số lượng sản phẩm không hợp lệ`);
      this.router.navigateByUrl('/cart');
    }
    this.formAddress = this.formBuilder.group
      (
        {
          province: new FormControl('', [Validators.required]),
          distinct: new FormControl('', [Validators.required]),
          ward: new FormControl('', [Validators.required]),
          address: new FormControl('', [Validators.required, FormRegister.notOnlyWhiteSpace])
        }
      )
    registerLocaleData(es);
    this.getThanhPho();
    this.getDistinctDefault();
    this.getWardsDefault();
    this.addToCartSer.totalPrice.subscribe(
      data => {
        this.totalPrice = data
      }
    );
    this.addToCartSer.totalQuantity.subscribe
      (
        data => {
          this.totalQuantity = data
        }
      );
    if (localStorage.getItem('cartItems') == null) {
      alert('hông có sản phẩm gì sao đòi thành toán hử');
      this.router.navigateByUrl('/list-products');
    }
    this.ckOutSer.getInforAccount().subscribe
      (
        {
          next: response => {
            this.name = response.name;
            this.email = response.email;
            this.formCko = this.formBuilder.group(
              {
                name: new FormControl(this.name, [Validators.required]),
                email: new FormControl(this.email)


              }
            )
          },
          error: err => {
            console.log(err)
          }
        }
      )

  }
  get province() {
    return this.formAddress.get('procvince');
  }
  doCheckOut(description: string) {
    if (this.formAddress.invalid || this.formCko.invalid || description.trim() == null) {
      alert('chua nhập đủ thông tin');
    }
    else {
      this.carts = this.addToCartSer.carts;
      this.dataBody = new Checkout();
      this.dataBody.email = this.formCko.get('email')?.value;
      let data: number = this.totalPrice;
      let dataOrder: Order = new Order();
      dataOrder.address = `${this.formAddress.get('province')?.value.name}, ${this.formAddress.get('distinct')?.value.name}, ${this.formAddress.get('ward')?.value.name},  ${this.formAddress.get('address')?.value}`;
      dataOrder.total_price = data * 110 / 100;
      dataOrder.total_quantity = this.totalQuantity;
      dataOrder.description = description;
      this.dataBody.order = dataOrder;
      this.dataOrderDetail = [];
      for (let item of this.carts) {
        this.tempDataOrderDetail = new OrderDetail();
        this.tempDataOrderDetail.book_id = item.id;
        this.tempDataOrderDetail.quantity = item.quantity;
        this.dataOrderDetail.push(this.tempDataOrderDetail);
      }
      this.dataBody.orderDetails = this.dataOrderDetail;
      this.ckOutSer.doCheckOut(this.dataBody).subscribe
        (
          {
            next: res => {

            },
            error: err => {
              if (err.status == 200) {
                alert(`Thang cong oy`);
                localStorage.removeItem('cartItems');
                this.addToCartSer.totalPrice.next(0);
                this.addToCartSer.totalQuantity.next(0);
                this.router.navigateByUrl('/');
              }
              else if (err.status == 500) {
                this.router.navigateByUrl('/cart')
              }
              else if (err.status == 403) {
                localStorage.removeItem('emailLogin');
                localStorage.removeItem('tokenLogin');
                sessionStorage.removeItem('emailLogin');
                sessionStorage.removeItem('tokenLogin');
                alert(` Phiên Đăng Nhập Đã Hết Hạn, Vui Lòng Đăng Nhập Lại`);
                window.location.reload();
                this.router.navigateByUrl('/login&signup')
              }
              else
                console.log(err)
            }
          }
        );
    }
  }
  getThanhPho() {
    this.ckOutSer.getThanhPho().subscribe
      (
        data => {
          this.thanhpho = data;
        }
      );
  }
  getDistinctDefault() {
    this.ckOutSer.getDistinct().subscribe
      (
        data => {
          this.distinct = data;
        }
      )
  }
  getWardsDefault() {
    this.ckOutSer.getWards().subscribe
      (
        data => {
          this.wards = data;
        }
      )
  }
  getDistinct() {
    const provinceCode = this.formAddress.get('province')?.value;
    this.distinctBaseOnProvinceCode = [];
    this, this.wardsSelected = [];
    for (let item of this.distinct) {
      if (item.province_code == provinceCode.code) {
        this.distinctBaseOnProvinceCode.push(item);
      }
    }
  }
  getWards() {
    const distinctCode = this.formAddress.get('distinct')?.value;
    this, this.wardsSelected = [];
    for (let item of this.wards) {
      if (distinctCode.code == item.district_code) {
        this.wardsSelected.push(item);
      }
    }
  }
}
