import { Component, OnInit } from '@angular/core';
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
  selector: 'app-test-type-list',
  templateUrl: './test-type-list.component.html',
  styleUrls: ['./test-type-list.component.scss']
})
export class TestTypeListComponent implements OnInit {

  DataList: any=[];
  constructor(private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,private _PatientService:PatientService,
    private _LayoutComponent:LayoutComponent,private alertService: AlertService,
    public paginationService : PaginationService,private _TestService :TestService,
    private changeDetection: ChangeDetectorRef, private modalService: ModalService ) { }
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
  Isable=false;
   ngOnInit() {
    this.SearchFilter = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
     this.pageNumber[0] = true;
     this.paginationService.temppage = 0;
     this.currentPage=1;
     this.SearchChanges();
     if(localStorage.getItem("Type")=='S')
     {
       this.Isable=true;
     } 
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
    }
    this._TestService.GetAllTestTypeDetails(model).subscribe((res: any) => {  
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
      PageSize:10,
    }
    this._TestService.GetTestTypeSearchCount(model).subscribe((data: any) => {
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

  Edit(Value){
    this.storage.set('ID', Value);
    this.router.navigateByUrl('/Admins/AddTestType');
  }
   
  Delete(Value){
    this.alertService.clear();
    this._LayoutComponent.setLoading(true);
    this.closeModal(Value);
     this._PatientService.GlobalDelete("Test Type",Value).subscribe((res: any) => { 
      if(res==-7){
        this.alertService.info("You can not delete this Test Type , This Test Type is in use ");
        this.changeDetection.detectChanges();
      }else{
        this.alertService.success("Test Type Deleted Successfully");
        this.changeDetection.detectChanges();
         this.getAllData(1);
      } 
      this.changeDetection.detectChanges();
      this._LayoutComponent.setLoading(false);
    },
    err => { 
      this._LayoutComponent.setLoading(false);
      this.changeDetection.detectChanges();
        console.log(err);
    }); 
  }


  Add(){
    this.storage.remove('ID');
    this.router.navigateByUrl('/Admins/AddTestType');
  }
  openModal(ID) {
    this.modalService.open('custom-modal-'+ID);
  }
  CheckModal(Value,Id)
  {
  
    this.Confimation = Value;
    if(this.Confimation=="NO")
    {
      this.closeModal(Id);
    }
    
  }
  closeModal(Id) {
    this.modalService.close('custom-modal-'+Id);
  }
  
}   
