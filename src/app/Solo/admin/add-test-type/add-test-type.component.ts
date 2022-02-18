import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { TestService } from 'src/app/Shared/TestService';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';


@Component({
  selector: 'app-add-test-type',
  templateUrl: './add-test-type.component.html',
  styleUrls: ['./add-test-type.component.scss']
})
export class AddTestTypeComponent implements OnInit {


  constructor(private service: TestService, public Datepipe: DatePipe,
    private changeDetection: ChangeDetectorRef,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
    , private router: Router, private alertService: AlertService,
    private _SoloAdminMasterComponent: SoloAdminMasterComponent) {
    localStorage.setItem('PageTitle', "Test Type");
  }
 DataID;
 DataAdd;
  ngOnInit(): void {
    this.DataAdd = new FormGroup({
      TestTypeId: new FormControl(0),
      TestTypeName: new FormControl(''),
      TestTypeDescription: new FormControl(''),
      TestTypeRemark: new FormControl(''),
      TestTypeRemark1: new FormControl(''),
      UserId:new FormControl(localStorage.getItem("LoginByID")),
    });
    this.DataID = this.storage.get('ID');
    if (this.DataID != null && this.DataID != '') {
      this.getDataData();
    }
  }

  getDataData() {
    this._SoloAdminMasterComponent.setLoading(true);
    let model ={
      PageNo:-2,
      PageSize: this.DataID,
      Keyword:null,
    }
    this.service.GetAllTestTypeDetails(model).subscribe(
      (res: any) => {
        if (res != null) {
    this.DataAdd = new FormGroup({
      TestTypeId: new FormControl(res[0].TestTypeId),
      TestTypeName: new FormControl(res[0].TestTypeName),
      TestTypeDescription: new FormControl(res[0].TestTypeDescription),
      TestTypeRemark: new FormControl(res[0].TestTypeRemark),
      TestTypeRemark1: new FormControl(res[0].TestTypeRemark1),
      UserId:new FormControl(localStorage.getItem("LoginByID")),
    }); 
        }
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
      },
      err => {
        console.log(err);
        this._SoloAdminMasterComponent.setLoading(false);
      }
    );
  }

  onSubmit() {
    let data=this.DataAdd.value;
    if(data.TestTypeName=="")
    {
      alert("Please Enter Test Type Name");
      return;
    }
    if (this.DataID != null && this.DataID != '') {
      this.update();
    } else {
      this.insert();
    }
  }


  insert() {
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.InsertTestType(this.DataAdd.value).subscribe(
      (res: any) => {
        if (res != 0) {
          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Test Type Created Succesfully"); 
          this.alertService.error("Test Type Created Successfully..!");
          this.router.navigateByUrl('Admin/TestTypeList');
        }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Test Type not added.');
        else
          console.log(err);
      }
    );
  }

  update() {
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.UpdateTestType(this.DataAdd.value).subscribe(
      (res: any) => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (res != 0) {
          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Test Type Updated Succesfully"); 
          this.alertService.error("Test Type Updated Successfully..!");
          this.router.navigateByUrl('Admin/TestTypeList');
        }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Test Type not update.');
        else
          console.log(err);
      }
    );
  }

  Back() {
    this.storage.remove('ID');
    this.router.navigateByUrl('Admin/TestTypeList');
  }
}

