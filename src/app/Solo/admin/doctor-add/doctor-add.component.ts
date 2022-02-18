import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl,FormControlName, FormGroup,FormGroupDirective,NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';
import { DoctorService } from 'src/app/Shared/DoctorService';
import { DatePipe } from '@angular/common';
import { CollectionCenterService } from 'src/app/Shared/CollectionCenterService';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';

import swal from 'sweetalert';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.scss']
})
export class DoctorAddComponent implements OnInit {
  userRegistrationForm: any;
  
  constructor(private service: DoctorService,public Datepipe:DatePipe,
    private changeDetection: ChangeDetectorRef,private _CollectionCenterService:CollectionCenterService,
     @Inject(SESSION_STORAGE) private storage: WebStorageService
  , private router: Router,private alertService: AlertService,
  private _SoloAdminMasterComponent:SoloAdminMasterComponent) {

    this.Doctorid = this.storage.get('ID');
    
    if (this.Doctorid != null && this.Doctorid != ''){
      localStorage.setItem('PageTitle', "Doctor Edit");
        }else{
      localStorage.setItem('PageTitle', "Add Doctor");
    }
     }
  
  DOCTOR_Email = new FormControl('', [Validators.required, Validators.email]);
  DoctorAdd;
  UserId:any;
  CollectionCenter= new FormControl('');
  collectionCenterCode:string=null;
  CollectionCenterList: Observable<any>;
  CollectionCenteroptions;
  Doctorid = null;
  ngOnInit() {
    this.DoctorAdd = new FormGroup({
      DOCTOR_id: new FormControl(0),
      DOCTOR_Name: new FormControl('', [Validators.required]),
      DOCTOR_Qualification: new FormControl(''),
      DOCTOR_RCommission: new FormControl('0'),
      DOCTOR_SPCommission: new FormControl('0'),
      DOCTOR_MCommission: new FormControl('0'),
      DOCTOR_OCommission: new FormControl('0'),
      DOCTOR_HCommission: new FormControl('0'),
      DOCTOR_EXCommission: new FormControl('0'),
      DOCTOR_EX1Commission: new FormControl('0'),
      DOCTOR_City: new FormControl(''),
      DOCTOR_Address1: new FormControl(''),
      DOCTOR_State: new FormControl(''),
      DOCTOR_Area: new FormControl(''),
      DOCTOR_Pincode: new FormControl(''),
      DOCTOR_Telno: new FormControl(''),
      DOCTOR_MobileNo: new FormControl(''),
      DOCTOR_Email: new FormControl('',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      OFFICE_Address1: new FormControl(''),
      OFFICE_Address2: new FormControl(''),
      OFFICE_City: new FormControl(''),
      SendSMS:new FormControl(true),
      OFFICE_State: new FormControl(''),
      TDS: new FormControl(''),
      OFFICE_Country: new FormControl(''),
      OFFICE_Pincode: new FormControl(''),
      OFFICE_Telno: new FormControl(''),
      DOCTOR_Bill: new FormControl(''),
      OFFICE_url: new FormControl(''),
      DOCTOR_Commission: new FormControl('0'),
      DOCTOR_XCommission: new FormControl('0'),
      DOCTOR_SCommission: new FormControl('0'),
      DOCTOR_PFCommission: new FormControl('0'),
      Collection_Center: new FormControl('0'),
      DOCTOR_Permanent: new FormControl(false),
      DOCTOR_Country:new FormControl(''),
      DOCTOR_Address2:new FormControl(''),
      OFFICE_Area:new FormControl(''),
      Userid:new FormControl(localStorage.getItem("LoginByID"))
      
    });
   this.getCollectionCenter();

  }

  getDoctorData(){
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.GetDoctorDetailsByID(this.Doctorid).subscribe(
      (res: any) => {
        this.collectionCenterCode= res.Collection_Center;
        if(parseInt(this.collectionCenterCode) >0 && this.CollectionCenteroptions!=null)
        this.CollectionCenter= new FormControl( this.CollectionCenteroptions.find(x => x.CENTER_id == this.collectionCenterCode).CENTER_Name );  
         this.DoctorAdd = new FormGroup({
      DOCTOR_id: new FormControl(res.DOCTOR_id),
      DOCTOR_Name: new FormControl(res.DOCTOR_Name, [Validators.required]),
      DOCTOR_Qualification: new FormControl(res.DOCTOR_Qualification),
      DOCTOR_RCommission: new FormControl(res.DOCTOR_RCommission),
      DOCTOR_SPCommission: new FormControl(res.DOCTOR_SPCommission),
      DOCTOR_MCommission: new FormControl(res.DOCTOR_MCommission),
      DOCTOR_OCommission: new FormControl(res.DOCTOR_OCommission),
      DOCTOR_HCommission: new FormControl(res.DOCTOR_HCommission),
      DOCTOR_EXCommission: new FormControl(res.DOCTOR_EXCommission),
      DOCTOR_EX1Commission: new FormControl(res.DOCTOR_EX1Commission),
      DOCTOR_City: new FormControl(res.DOCTOR_City),
      DOCTOR_Address1: new FormControl(res.DOCTOR_Address1),
      DOCTOR_State: new FormControl(res.DOCTOR_State),
      DOCTOR_Bill: new FormControl(res.DOCTOR_Bill),
      DOCTOR_Area: new FormControl(res.DOCTOR_Area),
      DOCTOR_Pincode: new FormControl(res.DOCTOR_Pincode),
      DOCTOR_Telno: new FormControl(res.DOCTOR_Telno),
      DOCTOR_MobileNo: new FormControl(res.DOCTOR_MobileNo),
      DOCTOR_Email: new FormControl(res.DOCTOR_Email),
      OFFICE_Address1: new FormControl(res.OFFICE_Address1),
      OFFICE_Address2: new FormControl(res.OFFICE_Address2),
      OFFICE_City: new FormControl(res.OFFICE_City),
      OFFICE_State: new FormControl(res.OFFICE_State),
      TDS: new FormControl(res.TDS),
      Collection_Center: new FormControl(res.Collection_Center),
      OFFICE_Country: new FormControl(res.OFFICE_Country),
      OFFICE_Pincode: new FormControl(res.OFFICE_Pincode),
      OFFICE_Telno: new FormControl(res.OFFICE_Telno),
      OFFICE_url: new FormControl(res.OFFICE_url),
      DOCTOR_Commission: new FormControl(res.DOCTOR_Commission),
      DOCTOR_XCommission: new FormControl(res.DOCTOR_XCommission),
      DOCTOR_SCommission: new FormControl(res.DOCTOR_SCommission),
      DOCTOR_PFCommission: new FormControl(res.DOCTOR_PFCommission),
      DOCTOR_Permanent: new FormControl(res.DOCTOR_Permanent, [Validators.required]),
       SendSMS:new FormControl(res.SendSMS),
       DOCTOR_Country:new FormControl(res.DOCTOR_Country),
      DOCTOR_Address2:new FormControl(res.DOCTOR_Address2),
      OFFICE_Area:new FormControl(res.OFFICE_Area),
      Userid:new FormControl(localStorage.getItem("LoginByID"))

      
    });
    this._SoloAdminMasterComponent.setLoading(false);
      },
      err => {
          console.log(err);
          this._SoloAdminMasterComponent.setLoading(false);
      }
    );
  }

  getCollectionCenter() {
    this._SoloAdminMasterComponent.setLoading(true);
    let model ={
      PageNo:-1,
      PageSize:10,
      Keyword:null,
    }
    this._CollectionCenterService.GetAllCollectionCenterDetails(model).subscribe((res: any) => {
      this._SoloAdminMasterComponent.setLoading(false);
      this.CollectionCenteroptions = res;
      if (this.Doctorid != null && this.Doctorid != ''){
        this.getDoctorData();
      }
      this.onGetCollectionCenterList('');
      
      this.changeDetection.detectChanges();
    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
      })
  }

  onCollectionCenterChanged(){
    this.onGetCollectionCenterList(this.CollectionCenter.value);
  }


  onGetCollectionCenterList(EnteredValue:string) {
    this.changeDetection.detectChanges();
    this.CollectionCenterList = this.CollectionCenter.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCollectionCenterList(EnteredValue))
      );

    this._SoloAdminMasterComponent.setLoading(false);
  }

  public _filterCollectionCenterList(value: string) {
    const filterValue = value.toLowerCase();
  for(let count :number =0 ; count<this.CollectionCenteroptions.length;count++){
    if(this.CollectionCenteroptions[count].CENTER_Name==this.CollectionCenter.value){
      this.collectionCenterCode=this.CollectionCenteroptions[count].CENTER_id;
      break;
    }else{
      this.collectionCenterCode='0';
    }
  }
    // this.getCollectionCenterID();
    return this.CollectionCenteroptions.filter(CollectionCenteroptions => CollectionCenteroptions.CENTER_Name.toLowerCase().includes(filterValue)).slice(0, 10);
  }


  onSubmit() {
    this.DoctorAdd.get('Collection_Center').setValue(this.collectionCenterCode );
    
    let a=this.DoctorAdd.value
    console.log(a)
    if(a.DOCTOR_Name=="")
    {
    //alert("Enter Doctor Name");
    swal({
      icon: 'warning',
      title: 'Enter Doctor Name',
     
    }); 
    return;
    }

   
    
   
     console.log(a)
     if(a.DOCTOR_Email==""  )
     {
       alert("please enter email id");
       return;
     }
    if(this.DoctorAdd.get('DOCTOR_Email').hasError('email'))
     {
       alert("please enter valid email address");
       return;
   

     }
   
    if(a.Collection_Center=="0")
    {
    alert("Select Collection Center");
    return;
    }
      if (this.Doctorid != null && this.Doctorid != ''){
        this.update();
      }else{
        this.insert();
      }
   
  
  }



  
  insert(){
    this._SoloAdminMasterComponent.setLoading(true); 
    this.service.InsertDoctor(this.DoctorAdd.value).subscribe(
      (res: any) => {
          if(res != 0)
          {
            this._SoloAdminMasterComponent.setLoading(false);
            this.storage.remove('ID');
            localStorage.setItem("AlertType","success");
            localStorage.setItem("AlertMessage","Doctor Created Succesfully"); 
            this.router.navigateByUrl('Admin/DoctorList');
          }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error doctor not added.');
        else
          console.log(err);
      }
    );
  }
  update(){
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.UpdateDoctor(this.DoctorAdd.value).subscribe(
      (res: any) => {
        this._SoloAdminMasterComponent.setLoading(false);
          if(res != 0)
          {
            this._SoloAdminMasterComponent.setLoading(false);
            this.storage.remove('ID');
            
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Doctor Updated Succesfully"); 
            this.router.navigateByUrl('Admin/DoctorList');
          }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error doctor not update.');
        else
          console.log(err);
      }
    );
  }

  Back(){
    this.storage.remove('ID');
    this.router.navigateByUrl('Admin/DoctorList');
  }

 
}


