import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  search(data:string)
  {
    if(data.trim()!=null)
    {
      this.router.navigateByUrl(`/search/${data}`);
    }
  }

}
