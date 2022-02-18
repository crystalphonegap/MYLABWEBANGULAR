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
import { TestService } from 'src/app/Shared/TestService'; 
import { PatientService } from 'src/app/Shared/PatientService ';

@Component({
  selector: 'app-pathology-test-list',
  templateUrl: './pathology-test-list.component.html',
  styleUrls: ['./pathology-test-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PathologyTestListComponent implements OnInit {

  DataList: any = [];
  constructor(private router: Router, 
    @Inject(SESSION_STORAGE) private storage: WebStorageService,private _PatientService:PatientService,
    private _LayoutComponent: LayoutComponent, private alertService: AlertService,
    public paginationService: PaginationService, private _TestService: TestService,
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
  SearchFilter;
  search = null;
  totalData: any;
  totalDataCount: any;
  currentPage = 1;
  Confimation = '';
  PageInfo;
  Isable=false;
  title = localStorage.getItem('PageInfotitle');
  ngOnInit() {
    this.SearchFilter = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.currentPage = 1;
    if (localStorage.getItem('PageInfoType') == null || localStorage.getItem('PageInfotitle') == null) {
      this.router.navigateByUrl('/Admin/dashboard');
    }
    this.PageInfo = localStorage.getItem('PageInfoType');
    this.title = localStorage.getItem('PageInfotitle');
    this.changeDetection.detectChanges();
    this.modalService.add('custom-modal-add');
    this.SearchChanges();
    this.changeDetection.detectChanges();
     if(localStorage.getItem("Type")=='S')
    {
      this.Isable=true;
    } 

  }

  ChangeFilter() {
    this.pageNumber = [];
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.currentPage=1;
    this.search = this.SearchFilter.controls['search'].value;
    this.SearchChanges();
  }
  SearchChanges() {
    this.getAllData(1);
  }

  

  getAllData(pageNo) {
    this.pageNo = pageNo;
    this.Indexing = pageNo - 1;
    this.Indexing = this.Indexing * 10;
    this._LayoutComponent.setLoading(true);
    let model = {
      PageNo: this.pageNo,
      PageSize: 10,
      Keyword: this.search,
      Type: localStorage.getItem('PageInfoType'),
    }
    this._TestService.GetPathalogyTestSearch(model).subscribe((res: any) => {
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
      Keyword: this.search,
      Type: localStorage.getItem('PageInfoType'),
    }
    this._TestService.GetPathalogyTestSearchCount(model).subscribe((data: any) => {
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

  Edit(Value) {
    localStorage.setItem('PageTitle', this.title .replace("List","Edit"));
    this.storage.set('ID', Value); 
    if( this.PageInfo =='P'){
      this.router.navigateByUrl('/Admins/PathologyTestAdd');
    }else if( this.PageInfo =='R'){
      this.router.navigateByUrl('/Admins/ProfileMaster');
    }else {
      this.router.navigateByUrl('/Admins/RadiologyTestAdd');
    }
    
  }

  Delete(Value){
    this.alertService.clear();
    this._LayoutComponent.setLoading(true);
    this.closeModal(Value);
     this._PatientService.GlobalDelete(this.title .replace("List",""),Value).subscribe((res: any) => {
      if(res==-7){
        this.alertService.info("You can not delete this "+ this.title .replace("List","")+" , This "+ this.title .replace("List","")+" is in use ");
      }else{
        this.alertService.success( this.title .replace("List","")+" Deleted Successfully");
         this.getAllData(1);
      }  
      this._LayoutComponent.setLoading(false);
      this.changeDetection.detectChanges();
    },
    err => { 
      this._LayoutComponent.setLoading(false);
      this.changeDetection.detectChanges();
        console.log(err);
    }); 
  }
 

  Add() {
    localStorage.setItem('PageTitle',"Add "+ this.title .replace("List",""));
    this.storage.remove('ID');
    if( this.PageInfo =='P'){
      this.router.navigateByUrl('/Admins/PathologyTestAdd');
    }else if( this.PageInfo =='R'){
      this.router.navigateByUrl('/Admins/ProfileMaster');
    }else {
      this.router.navigateByUrl('/Admins/RadiologyTestAdd');
    }
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

}
