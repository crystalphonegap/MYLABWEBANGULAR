import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { AlertService } from 'src/app/CustomComponents/alert.service';

import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';
import { RateListService } from 'src/app/Shared/RateListService';
import { ChangeDetectorRef } from '@angular/core';
import { TPAListService } from 'src/app/Shared/TPAListService';
@Component({
  selector: 'app-tpa-list-add',
  templateUrl: './tpa-list-add.component.html',
  styleUrls: ['./tpa-list-add.component.scss']
})
export class TPAListAddComponent implements OnInit {

  constructor(private changeDetection: ChangeDetectorRef, private router: Router
    , @Inject(SESSION_STORAGE) private storage: WebStorageService, private _RateListService: RateListService,
    private _SoloAdminMasterComponent:SoloAdminMasterComponent
    , private alertService: AlertService,private service:TPAListService) { 
      
      this.TPADetailsId = this.storage.get('ID');
      if (this.TPADetailsId != null && this.TPADetailsId != '') {
        localStorage.setItem('PageTitle', "TPA List Edit");
      }else{
        localStorage.setItem('PageTitle', "Add TPA List");
      }
    }
    TPAListAdd;
    TPADetailsId=null;
    RateList:any=[];
  ngOnInit(): void {

    this.TPAListAdd = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Address: new FormControl(''),
      Address2: new FormControl(''),
      City: new FormControl(''),
      Area: new FormControl(''),
      Pincode: new FormControl(''),
      State: new FormControl(''),
      Country: new FormControl(''),
      TelephoneNo: new FormControl(''),
      UserId:new FormControl(localStorage.getItem("LoginByID"))
    
    });
    debugger;
    if(this.TPADetailsId!=0 || this.TPADetailsId!=''){
      this.GetTPADetailsBy_ID();
    }
  }


 

  GetTPADetailsBy_ID() {
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.GetTPADetailsByID(this.TPADetailsId).subscribe(
      (res: any) => {
        let RateListID;
        if(res.CENTER_RATELIST_ID!=null || res.CENTER_RATELIST_ID != ''){
          RateListID=res.CENTER_RATELIST_ID;
        }else{
          RateListID="none";
        }
        console.log(res);
        this.TPAListAdd = new FormGroup({
          Id: new FormControl(res.Id, [Validators.required]),
          Name: new FormControl(res.Name, [Validators.required,Validators.minLength(2)]),
          Address: new FormControl(res.Address),
          Address2: new FormControl(res.Address2),
          City: new FormControl(res.City),
          Area: new FormControl(res.Area),
          Pincode: new FormControl(res.Pincode),
          State: new FormControl(res.State),
          Country: new FormControl(res.Country),
          TelephoneNo: new FormControl(res.TelephoneNo),
          UserId:new FormControl(localStorage.getItem("LoginByID"))
         
        });
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        console.log(err);
      }
    );
  }

  onSubmit() {
    debugger;
    let data=this.TPAListAdd.value;
    console.log(data);
    console.log(data.Name);
    if(data.Name=="")
    {
      alert("Please Enter TPA Name");
      return;
    }
    if (this.TPADetailsId != null && this.TPADetailsId != '') {
      this.update();
    } else {
      this.insert();
    }
  }

  insert() {
    debugger;
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.InsertTPADetails(this.TPAListAdd.value).subscribe(
      (res: any) => {
        if (res != 0) {
       

          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","TPA Details Added Succesfully"); 
          this.alertService.error("TPA Details Added Successfully..!");
          this.router.navigateByUrl('Admin/TPAList');
        }

      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error TPA Details not added.');
        else
          console.log(err);
      }
    );
  }

  update() {
    debugger;
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.UpdateTPADetails(this.TPAListAdd.value).subscribe(
      (res: any) => {
        if (res != 0) {
          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","TPA Details Updated Succesfully"); 
          this.alertService.error("TPA Details Updated Successfully..!");
          this.router.navigateByUrl('Admin/TPAList');
        }

      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error TPA Details not update.');
        else
          console.log(err);
      }
    );
  }

  Back(){
    this.storage.remove('ID');
    this.router.navigateByUrl('Admin/TPAList');
  }
}
