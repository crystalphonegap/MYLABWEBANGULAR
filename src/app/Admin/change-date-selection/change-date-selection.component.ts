import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment'; 
import { CookieService } from 'ngx-cookie-service';
import { SoloAdminMasterComponent } from 'src/app/Solo/admin/solo-admin-master/solo-admin-master.component';
import swal from 'sweetalert';


@Component({
  selector: 'app-change-date-selection',
  templateUrl: './change-date-selection.component.html',
  styleUrls: ['./change-date-selection.component.scss']
})
export class ChangeDateSelectionComponent implements OnInit {
  
    FromDate:Date ;
    ToDate:Date;
   
    loadedFromDate;
    LoadedToDate;

  constructor( @Inject(SESSION_STORAGE) private storage: WebStorageService
  , private router: Router,private alertService: AlertService,public DatePipe:DatePipe,private cookieService: CookieService
   ) { }
    DateChangeForm;
  locale: string = 'en-US';
  
  ngOnInit(): void {
    debugger;
    
    this.loadedFromDate=true;
    this.LoadedToDate=true;
    this.FromDate= moment(localStorage.getItem('FromDate')).add(1,'days').toDate() ;
     this.ToDate= moment(localStorage.getItem('ToDate')).add(1,'days').toDate() ;     
     
  }

  getItem ( item ) { 
    return localStorage.getItem(item)
}
  onSubmit()
  {

    // this._SoloAdminMasterComponent.setLoading(true);
    localStorage.setItem("FromDate",this.DatePipe.transform(this.FromDate, 'MM-dd-yyyy'))
    localStorage.setItem("ToDate",this.DatePipe.transform(this.ToDate, 'MM-dd-yyyy'))

    swal({
      icon: 'success',
      title: 'Date Filter Changed Successfully..!',
      timer:600
    }); 
    
    // this._SoloAdminMasterComponent.setLoading(false);
 
  }
 
  onDateChange(order,event){
    let tempData=event.value._d
    order.OrderRecivedDate=  this.DatePipe.transform(tempData, 'MM-dd-yyyy');
  }
  changeDateLoad(value){
    if(value=='FromDate'){
  this.loadedFromDate=false

    }
    else  if(value=='ToDate'){
   this.LoadedToDate=false
          }
  }

}
