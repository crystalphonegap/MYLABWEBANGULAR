import { LayoutComponent } from '../_layout/layout.component';
import { PaginationService } from 'src/app/CustomComponents/pagination/pagination.service';
import { ModalService } from 'src/app/CustomComponents/Modal/List_Admin';
import { PatientService } from 'src/app/Shared/PatientService ';
import {DatePipe} from '@angular/common';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { CollectionCenterService } from 'src/app/Shared/CollectionCenterService';
// import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';
import { RateListService } from 'src/app/Shared/RateListService';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-rate-list-report',
  templateUrl: './rate-list-report.component.html',
  styleUrls: ['./rate-list-report.component.scss']
})
export class RateListReportComponent implements OnInit {
  FromDate: Date;
  ToDate: Date;
  constructor(private service: CollectionCenterService,private changeDetection: ChangeDetectorRef, private router: Router
    , @Inject(SESSION_STORAGE) private storage: WebStorageService, private _RateListService: RateListService,
   
     private alertService: AlertService,private DatePipe:DatePipe) { }
   

    CollectionCenterAdd;
  CollectionCenterId;
  RateList:any=[];
  checkedIDs = [];
  checkboxesDataList = [
    {
      id: '1',
      value:"'P'",
      label: 'PATHOLOGY',
      isChecked: false
    },
    {
      id: '2',
      label: 'HISTOPATHOLOGY',
      value:"'H'",
      isChecked: false
    },
    {
      id: '3',
      label: 'X-RAY',
      value:"'X'",
      isChecked: false
    },
    {
      id: '4',
      label: 'SONOGRAPHY',
      value:"'S'",
      isChecked: false
    },
    {
      id: '4',
      label: 'PROFILE',
      value:"'R'",
      isChecked: false
    },
   
  ]
  SearchFilter;
  ngOnInit() {
     this.CollectionCenterAdd = new FormGroup({
      CENTER_RATELIST_ID: new FormControl(''),
    });
    this.getRateList(); 
  

  }

  fetchCheckedIDs() {
    //this.checkedIDs = []
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
       // this.checkedIDs.push(value.id);
      }
    });
  }
  ExportReport(){
   
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.value);
        console.log(value.value);
        console.log(this.checkedIDs);
      }
    });

     console.log(this.CollectionCenterAdd);
     console.log();
     let a=this.CollectionCenterAdd.value
     if(a.CENTER_RATELIST_ID=="")
     {
      this.alertService.success("Please select collectioncenter");
     }
     else{
      let  url:string =environment.ReportUrl+"/RateListReport.aspx?ID="+a.CENTER_RATELIST_ID+"&Type="+this.checkedIDs;
      console.log(url);
      window.open(url, '_blank');
     }
    
    

    
  }

  
  getRateList(){
    //this._SoloAdminMasterComponent.setLoading(true);
    let model ={
      PageNo:-1,
      PageSize:10,
      Keyword:null,
    }
    this._RateListService.GetAllRateListDetails(model).subscribe(
      (res: any) => {
        this.RateList=res;
       
        this.changeDetection.detectChanges();
      },
      err => {
        
        console.log(err);
      }
    );
  }
  changeSelection(){

  }

}
