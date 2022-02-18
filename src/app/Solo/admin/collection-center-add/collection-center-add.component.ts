import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { CollectionCenterService } from 'src/app/Shared/CollectionCenterService';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';
import { RateListService } from 'src/app/Shared/RateListService';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-collection-center-add',
  templateUrl: './collection-center-add.component.html',
  styleUrls: ['./collection-center-add.component.scss']
})
export class CollectionCenterAddComponent implements OnInit {

  constructor(private service: CollectionCenterService,private changeDetection: ChangeDetectorRef, private router: Router
    , @Inject(SESSION_STORAGE) private storage: WebStorageService, private _RateListService: RateListService,
    private _SoloAdminMasterComponent:SoloAdminMasterComponent
    , private alertService: AlertService) {
      this.CollectionCenterId = this.storage.get('ID');
      if (this.CollectionCenterId != null && this.CollectionCenterId != '') {
        localStorage.setItem('PageTitle', "Collection Center Edit");
      }else{
        localStorage.setItem('PageTitle', "Add Collection Center");
      }

      }
  CollectionCenterAdd;
  CollectionCenterId;
  RateList:any=[];
  UserId:any;
  ngOnInit() {
    this.CollectionCenterAdd = new FormGroup({
      CENTER_Name: new FormControl('', [Validators.required]),
      CENTER_Address1: new FormControl(''),
      CENTER_Address2: new FormControl(''),
      CENTER_City: new FormControl(''),
      CENTER_Mobileno: new FormControl(''),
      CENTER_Percentage: new FormControl(''),
      CENTER_Email: new FormControl('',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      CENTER_RATELIST_ID: new FormControl("none"),
      CENTER_CREDIT: new FormControl(false),
      CENTER_OutSourceLab: new FormControl(false),
      Area: new FormControl(''),
      Pincode: new FormControl(''),
      State: new FormControl(''),
      Country: new FormControl(''),
      TelephoneNo: new FormControl(''),
      UserId:new FormControl(localStorage.getItem("LoginByID")),
      
     
    });
    this.getRateList(); 
    if (this.CollectionCenterId != null && this.CollectionCenterId != '') {
      this.getCollectionCenterDataById();
    }
  }

  getRateList(){
    this._SoloAdminMasterComponent.setLoading(true);
    let model ={
      PageNo:-1,
      PageSize:10,
      Keyword:null,
    }
    this._RateListService.GetAllRateListDetails(model).subscribe(
      (res: any) => {
        this.RateList=res;
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        console.log(err);
      }
    );
  }

  getCollectionCenterDataById(  ) {
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.GetCollectionCenterByID(this.CollectionCenterId).subscribe(
      (res: any) => {
        let RateListID;
        if(res.CENTER_RATELIST_ID!=null || res.CENTER_RATELIST_ID != ''){
          RateListID=res.CENTER_RATELIST_ID;
        }else{
          RateListID="none";
        }
        this.CollectionCenterAdd = new FormGroup({
          CENTER_id: new FormControl(res.CENTER_id, [Validators.required]),
          CENTER_Name: new FormControl(res.CENTER_Name, [Validators.required]),
          CENTER_Address1: new FormControl(res.CENTER_Address1),
          CENTER_Address2: new FormControl(res.CENTER_Address2),
          CENTER_City: new FormControl(res.CENTER_City),
          CENTER_Mobileno: new FormControl(res.CENTER_Mobileno),
          CENTER_Percentage: new FormControl(res.CENTER_Percentage),
          CENTER_Email: new FormControl(res.CENTER_Email),
          CENTER_RATELIST_ID: new FormControl(RateListID,[Validators.required]),
          CENTER_CREDIT: new FormControl(res.CENTER_CREDIT),
          CENTER_OutSourceLab: new FormControl(res.CENTER_OutSourceLab),
          Area: new FormControl(res.Area),
      Pincode: new FormControl(res.Pincode),
      State: new FormControl(res.State),
      Country: new FormControl(res.Country),
      TelephoneNo: new FormControl(res.TelephoneNo),
      UserId:new FormControl(localStorage.getItem("LoginByID")),
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
    
 let data=this.CollectionCenterAdd.value;
 if(data.CENTER_Name=="")
 {
  alert("Please Enter Collection Center Name");
  return;
 }
 let a=this.CollectionCenterAdd.value
 console.log(a)
 if(a.CENTER_Email==""  )
 {
   alert("please enter email id");
   return;
 }
if(this.CollectionCenterAdd.get('CENTER_Email').hasError('email'))
 {
   alert("please enter valid email address");
   return;


 }

    if (this.CollectionCenterId != null && this.CollectionCenterId != '') {
      this.update();
    } else {
      this.insert();
    }
  }

  insert() {
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.InsertCollectionCenter(this.CollectionCenterAdd.value).subscribe(
      (res: any) => {
        if (res != 0) {
       

          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Collection Center Created Succesfully"); 
          this.alertService.error("Collection Center Created Successfully..!");
          this.router.navigateByUrl('Admin/CollectionList');
        }

      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Collection Center not added.');
        else
          console.log(err);
      }
    );
  }

  update() {
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.InsertCollectionCenter(this.CollectionCenterAdd.value).subscribe(
      (res: any) => {
        if (res != 0) {
          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Collection Center Updated Succesfully"); 
          this.alertService.error("Collection Center Updated Successfully..!");
          this.router.navigateByUrl('Admin/CollectionList');
        }

      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Collection Center not update.');
        else
          console.log(err);
      }
    );
  }

  Back(){
    this.storage.remove('ID');
    this.router.navigateByUrl('Admin/CollectionList');
  }


  

}
