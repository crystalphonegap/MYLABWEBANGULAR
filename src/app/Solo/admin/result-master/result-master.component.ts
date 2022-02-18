import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { TestService } from 'src/app/Shared/TestService';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';

@Component({
  selector: 'app-result-master',
  templateUrl: './result-master.component.html',
  styleUrls: ['./result-master.component.scss']
})
export class ResultMasterComponent implements OnInit {

  constructor(private alertService: AlertService,private _TestService: TestService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService, private changeDetection: ChangeDetectorRef,
    private _SoloAdminMasterComponent: SoloAdminMasterComponent) {
    localStorage.setItem('PageTitle', "Result Master");
  }
  AllTestList = [];
  AllTestoptions = [];
  search: string;
  testDetailData: any = [];
  SelectRowOfTest: number;
  ngOnInit(): void {
    this.getAllData();
  }

  selectRow(id) {
    this.SelectRowOfTest = id;
    this.getTestDetailData();
    this.alertService.clear();
  }

  getAllData() {
    this._SoloAdminMasterComponent.setLoading(true);
    let model = {
      PageNo: -3,
      PageSize: 10,
      Keyword: null,
      Type: 'P',
    }
    this._TestService.GetPathalogyTestSearch(model).subscribe((res: any) => {
      this._SoloAdminMasterComponent.setLoading(false);
      this.AllTestoptions = res;
      this.AllTestList = res;
      this.SelectRowOfTest=0;
      this.getTestDetailData();
      this.changeDetection.detectChanges();
    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
      });
  }

  getTestDetailData() {
    this._SoloAdminMasterComponent.setLoading(true);
    this._TestService.GetPTestResult(this.AllTestList[this.SelectRowOfTest].TESTMST_CurrentId).subscribe((res: any) => {
      this._SoloAdminMasterComponent.setLoading(false);
      this.testDetailData = res;
      this.changeDetection.detectChanges();
    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
      });
  }

  _filter() {
    const filterValue = this.search.toLowerCase();
    this.AllTestList = this.AllTestoptions.filter(option => option.TESTMST_Name.toLowerCase().includes(filterValue)).slice(0, 10);
    
    if( this.AllTestList.length==0){
       this.search.slice( this.search.length,1);
       this._filter();
       return
    }else{
    this.SelectRowOfTest=0;
    this.getTestDetailData();
    }
  }


  Back() {
    this.router.navigateByUrl('Admin/dashboard');
  }


  
  onSubmit() {
    this._SoloAdminMasterComponent.setLoading(true);
    this.testDetailData[0].TESTDET_TestMasterID=this.AllTestList[this.SelectRowOfTest].TESTMST_CurrentId;
    this.testDetailData.UserId=localStorage.getItem("LoginByID");
    console.log(this.testDetailData);
    this._TestService.InsertRemarkMaster( this.testDetailData).subscribe(
      (res: any) => {
        if (res != 0) {
          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          this.alertService.success("Result Updated Successfully..!"); 
        }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Result not updated.');
        else
          console.log(err);
      }
    );
 
  }


}
