import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateAccountDetail } from 'src/app/commons/update-account-detail';
import { FormRegister } from 'src/app/validators/form-register';
import { AccountDetailServiceService } from './service/account-detail-service.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  token!:string;
  email!:string;
  frmAccountDetail!:FormGroup;
  dateOfBirth!:string;
  updateAccountDetail!:UpdateAccountDetail;
  constructor(private router:Router,private accountSer:AccountDetailServiceService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAccountDetail();
    
  }
  getAccountDetail()
  {
    console.log(localStorage.getItem('emailLogin'))
    if(localStorage.getItem('emailLogin')!=null)
    {
      this.email=localStorage.getItem('emailLogin')!;
      this.token=localStorage.getItem('tokenLogin')!;
    }
    else if(sessionStorage.getItem('emailLogin')!=null)
    {
      this.email=sessionStorage.getItem('emailLogin')!;
      this.token=sessionStorage.getItem('tokenLogin')!;
    }
    else
    {
      this.router.navigateByUrl('/login&signup');
    }
    this.getDetail();
  }
  getDetail()
  {
    if(this.email!=null && this.token!=null)
    {
      this.accountSer.getAccountDetail(this.token,this.email).subscribe
      (
        {
          next:res=>
          {

            this.dateOfBirth=res.ngaysinh!;
            
            this.updateAccountDetail=new UpdateAccountDetail();
            this.updateAccountDetail.id=res.id;
            this.updateAccountDetail.name=res.name;
            this.updateAccountDetail.email=res.email;
            this.updateAccountDetail.gender=res.gender;
            this.updateAccountDetail.ngaysinh=res.ngaysinh;
            this.updateAccountDetail.password=res.password;
            this.updateAccountDetail.sdt=res.sdt;
            console.log(this.dateOfBirth);
            this.frmAccountDetail=this.formBuilder.group
            (
              {
                name:new FormControl(res.name,[Validators.required,FormRegister.notOnlyWhiteSpace,Validators.minLength(7)]),
                email:new FormControl(res.email),
                gender:new FormControl(+res.gender),
                ngaysinh:new FormControl(this.dateOfBirth,[Validators.required]),
                password:new FormControl('',[Validators.required,FormRegister.notOnlyWhiteSpace,Validators.minLength(9)]),
                sdt:new FormControl(res.sdt,[Validators.required])
              }
            )
            
          },
          error:err=>
          {
            console.log(err);
            alert('vui long dang nhap lai');
            this.router.navigateByUrl('/login&signup')
          }
        }
      )
    }
    else
    {
      alert('vui long dang nhap lai');
      this.router.navigateByUrl('/login&signup');
    }
  }
  updateDetail()
  {
    if(this.frmAccountDetail.invalid)
    {
      alert('chua nhap du thong tin')
    }
    else
    {
      this.updateAccountDetail.name=this.frmAccountDetail.get('name')?.value;
      this.updateAccountDetail.gender=this.frmAccountDetail.get('gender')?.value;
      this.updateAccountDetail.ngaysinh=`${this.frmAccountDetail.get('ngaysinh')?.value.year}-${this.frmAccountDetail.get('ngaysinh')?.value.month}-${this.frmAccountDetail.get('ngaysinh')?.value.day}`
      this.updateAccountDetail.sdt=this.frmAccountDetail.get('sdt')?.value;
      this.updateAccountDetail.password=this.frmAccountDetail.get('password')?.value;
      this.accountSer.updateAccountDetail(this.token,this.updateAccountDetail).subscribe
      (
        {
          next:res=>
          {
            alert(`cap nhat thong tin thanh cong roi nhe`);
            window.location.reload();
          },
          error:err=>
          {
            console.log(`${err}`)
          }
        }
      )
    }
    
  }
}
