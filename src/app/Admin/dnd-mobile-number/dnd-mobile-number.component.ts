import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '../_layout/layout.component';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { ChangeDetectorRef } from '@angular/core';
import { PaginationService } from 'src/app/CustomComponents/pagination/pagination.service';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from 'src/app/CustomComponents/Modal/List_Admin';
// // import { ModalService } from 'src/app/CustomComponents/Modal/Solo_Common';
//  import { ModalService } from 'src/app/CustomComponents/Modal/Solo_Admin';
import { TestService } from 'src/app/Shared/TestService';
import { PatientService } from 'src/app/Shared/PatientService ';



@Component({
  selector: 'app-dnd-mobile-number',
  templateUrl: './dnd-mobile-number.component.html',
  styleUrls: ['./dnd-mobile-number.component.scss']
})
export class DndMobileNumberComponent implements OnInit {

  DataList: any = [];
  constructor(private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService, private _PatientService: PatientService,
    private _LayoutComponent: LayoutComponent, private alertService: AlertService,
    public paginationService: PaginationService,  
    private changeDetection: ChangeDetectorRef, private modalService: ModalService) { }
  pageNo: any = 1;
  Indexing: number = 1;
  pageNumber: boolean[] = [];
  Status = 'All';
  Keyword;
  pageField = [];
  DataPerPage: number = 10;
  pageFieldLength: number;
  exactPageList: any;
  paginationData: number;  
  totalData: any;
  totalDataCount: any;
  currentPage = 1; 
  Confimation = '';
  PageInfo; 
  search:string='';
  myGroup;
  txtMobileNumber:string='';
  IsEnable=false;
  ngOnInit() { 
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.currentPage = 1; 
    this._LayoutComponent.setLoading(true);
    this.changeDetection.detectChanges(); 
    this.getAllData(1);
    this.changeDetection.detectChanges();


  if(localStorage.getItem("Type")=='S')
  {
    this.IsEnable=true;
  } 
    

  }

  ChangeFilter() { 
    this.pageNumber = [];
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.currentPage=1;
    this.getAllData(1);
  } 

  getAllData(pageNo) {
    this.pageNo = pageNo;
    this.Indexing = pageNo - 1;
    this.Indexing = this.Indexing * 10;
    let model = {
      PageNo: this.pageNo,
      PageSize: 10,
      Keyword:  this.search ==''?'NoSearch':this.search 
    }
    this._PatientService.GetBlackListMobilesSearch(model).subscribe((res: any) => {
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
    let model = {
      Keyword:  this.search ==''?'NoSearch':this.search 
    }
    this._PatientService.GetBlackListMobilesSearchCount(model).subscribe((data: any) => {
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
    this.getAllData(this.currentPage);
    this.changeDetection.detectChanges();
  }

  //Pagination Start  

  showPrevData() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllData(this.currentPage);
      this.changeDetection.detectChanges();
    }

  }

  showNextData() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllData(this.currentPage);
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
    this.pageFieldLength = this.pageField.length;
    this.changeDetection.detectChanges();
  }
 
  Delete(Value) {
    this.alertService.clear();
    this.closeModal(Value);
    this._PatientService.DeleteBlackListMobiles(Value).subscribe((res: any) => {
      this._LayoutComponent.setLoading(false);
      this.alertService.success("Delete Number");
      this.changeDetection.detectChanges();
      this.search='';
      this.getAllData(1);
      this.changeDetection.detectChanges();
    },
      err => {
        this._LayoutComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
      });
  }
  Add() {
    this.modalService.open('custom-modal-2');
  }
  openModal(ID) {
    this.modalService.open('custom-modal-' + ID);
  }
  CheckModal(Value, Id) {

    this.Confimation = Value;
    if (this.Confimation == "NO") {
      this.closeModal(Id);
    }

  }
  closeModal(Id) {
    this.modalService.close('custom-modal-' + Id);
  }
  closeMobile()
  {
    this.modalService.close("custom-modal-2")
  }
  saveMobile()
  {
    if(this.txtMobileNumber=="")
    {
     alert("Please Enter Mobile Number");
      return;
    }
    this.alertService.clear();
    let model = {
      sysUserName: localStorage.getItem("UserName"),
      Mobile: this.txtMobileNumber,
      UserId:localStorage.getItem("LoginByID"),
    }
    console.log(model);
    this._PatientService.InsertBlackListMobiles(model).subscribe((res: any) => {
      this._LayoutComponent.setLoading(false); 
        this.alertService.success("Mobile Number Added Successfully");
        this.changeDetection.detectChanges();
        this.txtMobileNumber='';
        this.modalService.close("custom-modal-2")
      this.ngOnInit();
      this.changeDetection.detectChanges();
    },
      err => {
        this._LayoutComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
      });
  }

}
