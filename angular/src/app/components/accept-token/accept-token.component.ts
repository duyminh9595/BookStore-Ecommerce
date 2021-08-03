import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcceptTokenService } from './services/accept-token.service';

@Component({
  selector: 'app-accept-token',
  templateUrl: './accept-token.component.html',
  styleUrls: ['./accept-token.component.css']
})
export class AcceptTokenComponent implements OnInit {

  constructor(private acceptSer:AcceptTokenService,private activeRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(()=>this.acceptToken());
  }
  acceptToken()
  { 
    const checkToken=this.activeRoute.snapshot.paramMap.has('tokencofirmemail');
    if(checkToken)
    {
      const tokenConfirm=this.activeRoute.snapshot.paramMap.get('tokencofirmemail')!;
      this.acceptSer.confirmTokenEmail(tokenConfirm).subscribe
      (
        {
          next:()=>
          {
            alert('Xac nhan thanh cong oy do');
            this.router.navigateByUrl('/');
          },
          error:()=>
          {
            alert('Loi khong xac dinh');
            this.router.navigateByUrl('/');
          }
        }
      )
    }
    else
    {
      this.router.navigateByUrl('/');
    }
  }
}
