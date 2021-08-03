import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountRegister } from 'src/app/commons/account-register';
import { FormRegister } from 'src/app/validators/form-register';
import { SignUpServiceService } from './service/sign-up-service.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerFormGroup!: FormGroup;
  checkEmailInValid:boolean=false;
  account!:AccountRegister;
  imgSuccess:string='assets/loginSuccess.gif'
  popUpModal:boolean=false;
  constructor(private formBuiler: FormBuilder,private signUpSer:SignUpServiceService,private router:Router) { }

  ngOnInit(): void {
    this.popUpModal=false;
    this.registerFormGroup = this.formBuiler.group(
      {
        member: this.formBuiler.group(
          {
            fullName: new FormControl('', [Validators.required, Validators.minLength(5),
            FormRegister.notOnlyWhiteSpace]),
            passWord: new FormControl('123456789', [Validators.required, Validators.minLength(9),
            FormRegister.notOnlyWhiteSpace]),
            email: new FormControl('', [Validators.required, Validators.minLength(5),
            FormRegister.notOnlyWhiteSpace, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
            telephone: new FormControl('123456789', [Validators.required, Validators.pattern("^[0-9]*$")]),
            gender: new FormControl(1, [Validators.required])
          }
        )
      }
    )
  }
  get fullName() {
    return this.registerFormGroup.get('member.fullName');
  }
  get telephone() {
    return this.registerFormGroup.get('member.telephone');
  }
  get passWord() {
    return this.registerFormGroup.get('member.passWord');
  }
  get email() {
    return this.registerFormGroup.get('member.email');
  }
  get gender() {
    return this.registerFormGroup.get('member.gender');
  }
  changeToIndex()
  {

  }
  onSubmit()
  {
    if(this.registerFormGroup.invalid)
    {
      this.registerFormGroup.markAllAsTouched();
    }
    else
    {
      this.account=new AccountRegister();
      this.account.email = this.registerFormGroup.get('member.email')?.value;
      this.signUpSer.checkEmail(this.account.email).subscribe
      (
        {
          next:res=>
          {
            this.checkEmailInValid=true;
          },
          error:err=>
          {
            
            console.log(this.registerFormGroup.get('member.email')?.value);
            this.account.gender = this.registerFormGroup.get('member.gender')?.value;
      
            this.account.name = this.registerFormGroup.get('member.fullName')?.value;
      
            this.account.password = this.registerFormGroup.get('member.passWord')?.value;
      
            this.account.telephone = +this.registerFormGroup.get('member.telephone')?.value;
            this.signUpSer.registsAccount(this.account).subscribe
            (
              {
                next:response=>
                {
                  alert(`Dang ky thanh cong oy 3be ui. Vo ${this.account.email} de xac nhan nhe`);
                  this.router.navigateByUrl('/');
                },
                error:err=>
                {
                  alert(`There was an error: ${err.message}`);
                }
              }
            )
          }
        }
      )
    }
  }

}



