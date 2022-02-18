import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '../_layout/layout.component';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { ChangeDetectorRef } from '@angular/core';
import { PaginationService } from 'src/app/CustomComponents/pagination/pagination.service';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/Shared/EmployeeService';
import { ModalService } from 'src/app/CustomComponents/Modal/List_Admin';
import { PatientService } from 'src/app/Shared/PatientService ';
import {DatePipe} from '@angular/common';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Component({
  selector: 'app-employee-list-report',
  templateUrl: './employee-list-report.component.html',
  styleUrls: ['./employee-list-report.component.scss']
})
export class EmployeeListReportComponent implements OnInit {
  DataList: any=[];
  FromDate: Date;
  ToDate: Date;
  constructor(private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,private _PatientService:PatientService,
    private _LayoutComponent:LayoutComponent,private alertService: AlertService,
    public paginationService : PaginationService,private _EmployeeService :EmployeeService,
    private changeDetection: ChangeDetectorRef, private modalService: ModalService,private DatePipe:DatePipe) { }

    pageNo: any = 1;
  Indexing:number=1;
  pageNumber: boolean[] = [];
  Status = 'All';
  Keyword;
  pageField = [];
  DataPerPage:number=10;
  pageFieldLength :number;
  exactPageList: any;
  paginationData: number;
  SearchFilter;
  search = null;
  totalData: any;
  totalDataCount: any;
  currentPage = 1;
  Confimation = '';
  ngOnInit() {

    this.SearchFilter = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
     this.pageNumber[0] = true;
     this.paginationService.temppage = 0;
     this.currentPage=1;
     this.SearchChanges();
     this.FromDate=new Date() // moment(localStorage.getItem('FromDate')).add(1,'days').toDate() ;
     this.ToDate= new Date()//moment(localStorage.getItem('ToDate')).add(1,'days').toDate() ; 
  }


  
  ChangeFilter(){
    this.pageNumber = [];
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.currentPage=1;
    this.search=this.SearchFilter.controls['search'].value;
    this.SearchChanges();
  }
  SearchChanges(){
    this.getAllData(1);
  }
  getAllData(pageNo) {
    this.pageNo =pageNo;
    this.Indexing=pageNo-1;
    this.Indexing=this.Indexing*10;
    this._LayoutComponent.setLoading(true);
    let model ={
      PageNo:this.pageNo,
      PageSize:10,
      Keyword:this.search,
      FromDate:localStorage.getItem("FromDate"),
      ToDate:localStorage.getItem("ToDate")
    }
    this._EmployeeService.GetEmployeeSearch(model).subscribe((res: any) => {  
      this._LayoutComponent.setLoading(false);
      this.getAllDataCount();
      this.DataList = res;  
      this.changeDetection.detectChanges();
    },
    err => { 
      this._LayoutComponent.setLoading(false);
      this.changeDetection.detectChanges();
        console.log(err);
    });  
  } 
 
  getAllDataCount() {
    let model ={ 
      Keyword:this.search,
    }
    this._EmployeeService.GetEmployeeSearchCount(model).subscribe((data: any) => {
      this.totalDataCount = data;
      this.totalNoOfPages();
      this.changeDetection.detectChanges();
    })

  }
  showDataByPageNumber(page, i) {
    this.DataList = [];
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllData(this.currentPage );
    this.changeDetection.detectChanges();
  }

  //Pagination Start  

  showPrevData() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllData(this.currentPage );
      this.changeDetection.detectChanges();
    }

  }

  showNextData() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllData(this.currentPage );
      this.changeDetection.detectChanges();
    }
  }
  totalNoOfPages() {

    this.paginationData = Number(this.totalDataCount / this.DataPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if (this.totalDataCount > this.DataPerPage) {
      this.pageField = this.paginationService.pageField;
    }
    else {
      this.pageField = [1];
    }
    this.pageFieldLength=this.pageField.length ;
    this.changeDetection.detectChanges();
  }

  Add(){
    this.storage.remove('ID');
    this.router.navigateByUrl('/Admins/EmployeeAdd');
  }
  onDateChange(order,event){
    let tempData=event.value._d
    order.OrderRecivedDate=  this.DatePipe.transform(tempData, 'MM-dd-yyyy');
  }

  ExportReport(){
   
    let  url:string =environment.ReportUrl+"/EmployeeListReport.aspx?ID=1&FromDate="+this.DatePipe.transform(this.FromDate, 'MM-dd-yyyy')+"&ToDate="+this.DatePipe.transform(this.ToDate, 'MM-dd-yyyy');
    console.log(url);
    window.open(url, '_blank');
  }
}
