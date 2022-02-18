import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '../_layout/layout.component';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { ChangeDetectorRef } from '@angular/core';
import { PaginationService } from 'src/app/CustomComponents/pagination/pagination.service';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RateListService } from 'src/app/Shared/RateListService';
import { ModalService } from 'src/app/CustomComponents/Modal/List_Admin';
import { PatientService } from 'src/app/Shared/PatientService ';

@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.scss']
})
export class RateListComponent implements OnInit {

  DataList: any=[];
  constructor(private router: Router, private _RateListService: RateListService,
    private _PatientService:PatientService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _LayoutComponent:LayoutComponent,private alertService: AlertService,
    public paginationService : PaginationService,
    private changeDetection: ChangeDetectorRef,private modalService: ModalService) { }
    pageNo: any = 1;
    Indexing:number=1;
    pageNumber: boolean[] = [];
    Status = 'All';
    Keyword;
    DataPerPage:number=10;
    CollectionCenterNameArray;
    pageField = [];
    pageFieldLength :number;
    exactPageList: any;
    paginationData: number;
    SearchFilter;
    search = null;
    totalData: any;
    totalDataCount: any;
    currentPage = 1;
    Confimation='';
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
    this._RateListService.GetAllRateListDetails(model).subscribe((res: any) => {  
      this._LayoutComponent.setLoading(false);
      this.getAllDataCount();
      this.DataList = res;  
      this.changeDetection.detectChanges();
    },
    err => { 
      this._LayoutComponent.setLoading(false);
      this.changeDetection.detectChanges();
        console.log(err);
    })  
  }     

  getAllDataCount() {
    let model ={ 
      Keyword:this.search,
    }
    this._RateListService.GetAllRateListDetailsCount(model).subscribe((data: any) => {
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

  ViewCollectionCenter(RateList){
    this.CollectionCenterNameArray = RateList.CollectionCenterName.split(';');
    this.modalService.open('CollectionCenter-'+RateList.RateListId);
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
    this.router.navigateByUrl('/Admins/RateListAdd');
  }
   
  Delete(Value){
    this.alertService.clear();
    this._LayoutComponent.setLoading(true);
    this.closeModal(Value);
     this._PatientService.GlobalDelete("RateList",Value).subscribe((res: any) => { 
      if(res==-7){
        this.alertService.info("You can not delete this RateList , This RateList is in use ");
        this.changeDetection.detectChanges();
      }else{
        this.alertService.success("RateList Deleted Successfully");
        this.changeDetection.detectChanges();
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
 

  Add(){
    this.storage.remove('ID');
    this.router.navigateByUrl('/Admins/RateListAdd');
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


  
  openSaveAsModal(ID) {
    this.modalService.open('Save-As-'+ID);
  }
  onRowChange(List,value) {
    List.saveAsRateListName = value
  }

  saveModal(List) {
    this.modalService.close('Save-As-'+List.RateListId);
    let Data ={
      RateListId:List.RateListId,
      RateListName:List.saveAsRateListName,
      User:localStorage.getItem("UserName"),
    }
    this._RateListService.InsertSaveAsRateList(Data).subscribe(
      (res: any) => {
        if (res != 0) {
          this.ngOnInit();
          this.alertService.success('New Rate List Created.');
        }
      },
      err => {
        this._LayoutComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Rate List not added.');
        else
          console.log(err);
      }
    );
  }

  closeSaveAsModal(ID) {
    this.modalService.close('Save-As-'+ID);
  }
  closeCollectionCenterModal(RateList) {
    this.modalService.close('CollectionCenter-'+RateList.RateListId);
  }
}