import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  constructor() { }
  greet;
  myDate;
  UserName;
  ngOnInit(): void {
    if(localStorage.getItem("UserName")!==null){
    this.UserName= localStorage.getItem("UserName");
    }
     this.myDate = new Date();
    var hrs = this.myDate.getHours();
    if (hrs < 12)
        this.greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
    this.greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
    this.greet = 'Good Evening';
  }

}
