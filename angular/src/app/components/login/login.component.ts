import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/commons/user-login';
import { UserLoginSuccess } from 'src/app/commons/user-login-success';
import { FormRegister } from 'src/app/validators/form-register';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  saveLogin: number = 0;
  userLogin!: UserLogin;
  checkLogin: boolean = true;
  local: Storage = localStorage;
  session: Storage = sessionStorage;
  acc!: UserLoginSuccess;
  constructor(private formBuilder: FormBuilder, private loginSer: LoginService,private router:Router) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group
      ({
        memberLogin: this.formBuilder.group
          ({
            emailLogin: new FormControl('duyminh95duyminh95@gmail.com', [Validators.required, Validators.minLength(5),
            FormRegister.notOnlyWhiteSpace, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
            passwordLogin: new FormControl('123456789', [Validators.required, Validators.minLength(7), FormRegister.notOnlyWhiteSpace])
          })
      })
  }
  get emailLogin() {
    return this.formLogin.get('memberLogin.emailLogin')?.value;
  }
  get passwordLogin() {
    return this.formLogin.get('memberLogin.passwordLogin')?.value;
  }
  doLogin() {
    if (this.formLogin.invalid) {
      this.formLogin.markAsTouched();
      this.checkLogin=false;
    }
    else {
      this.userLogin = new UserLogin();
      this.userLogin.username = this.formLogin.get('memberLogin.emailLogin')?.value;
      this.userLogin.password = this.formLogin.get('memberLogin.passwordLogin')?.value;
      this.loginSer.doLogin(this.userLogin).subscribe
        (
          {
            next: res => {
              this.acc = new UserLoginSuccess();
              this.acc.email = res.email;
              this.acc.token = res.token;
              if (this.saveLogin % 2 == 1) {
                this.local.setItem('emailLogin', this.acc.email);
                this.local.setItem('tokenLogin', `Bearer ${this.acc.token}`);
                console.log(`${this.local.getItem('emailLogin')}`)
              }
              else {
                this.session.setItem('emailLogin', this.acc.email);
                this.session.setItem('tokenLogin', `Bearer ${this.acc.token}`);
                console.log(`session ${this.session.getItem('tokenLogin')}`)
                console.log(`${this.session.getItem('emailLogin')}`)
              }
              this.checkLogin=true;
              this.router.navigateByUrl('/').then(() => {
                window.location.reload();
              });
            },
            error: err => {
              this.checkLogin = false;
            }
          }
        )

    }
  }
  changeStatusRemember() {
    this.saveLogin++;
  }
}
