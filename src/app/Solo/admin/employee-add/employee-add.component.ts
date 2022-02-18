import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {EmployeeService} from 'src/app/Shared/EmployeeService';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';
import { DatePipe } from '@angular/common';
import * as moment from 'moment'; 
//import { DatePipe } from '@angular/common';

 
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  constructor(private service: EmployeeService, @Inject(SESSION_STORAGE) private storage: WebStorageService
  , private router: Router,private alertService: AlertService,public DatePipe:DatePipe,
  private _SoloAdminMasterComponent:SoloAdminMasterComponent) {

    localStorage.setItem('PageTitle', "Add Employee"); }
  EmployeeAdd;
  Employeeid = null;
  DBirth = null;
  DJoin = null;
  loadedFromDate;
  LoadedToDate;
  locale: string = 'en-US';
  ngOnInit() {
    this.DBirth = new Date();
    //this.DBirth = this.DatePipe.transform(this.DBirth, 'dd-MM-yyyy',this.locale); 
    this.DJoin = new Date();
    //this.DJoin = this.DatePipe.transform(this.DJoin, 'dd-MM-yyyy',this.locale); 
    this.loadedFromDate=true;
    this.LoadedToDate=true;
    this.EmployeeAdd = new FormGroup({
      EMPLOYEE_Name: new FormControl('', [Validators.required]),
      EMPLOYEE_Address1 : new FormControl(''),
      EMPLOYEE_Address2:new FormControl(''),
      EMPLOYEE_City: new FormControl(''),
      EMPLOYEE_State: new FormControl(''),
      EMPLOYEE_Region:new FormControl(''),
      EMPLOYEE_Country:new FormControl(''),
      EMPLOYEE_Pincode:new FormControl(''),
      EMPLOYEE_Telno:new FormControl(''),
      EMPLOYEE_MobileNo: new FormControl(''),
      EMPLOYEE_Email:new FormControl('',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      EMPLOYEE_DateofBirth: new FormControl( this.DBirth, [Validators.required, Validators.maxLength(256)]),
      EMPLOYEE_DateofJoining: new FormControl( this.DJoin , [Validators.required, Validators.maxLength(256)]),
      EMPLOYEE_Qualification: new FormControl(''),
      EMPLOYEE_Salary:new FormControl(''),
      EMPLOYEE_Gender : new FormControl(''),
      EMPLOYEE_Status : new FormControl(''),
      EMPLOYEE_id:new FormControl(0),
      EMPLOYEE_Companyid:new FormControl(0),
      EMPLOYEE_Salary_Mode : new FormControl(0),
      CollectionBoy_Flag:new FormControl(0),
      LabID:new FormControl(0),
      Password:new FormControl(''),
     // UserId:new FormControl(localStorage.getItem("LoginByID"))
     
    });
    this.Employeeid = this.storage.get('ID');
    if (this.Employeeid != null && this.Employeeid != ''){
      this.getEmployeeData();
    }
  }
  getEmployeeData(){
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.GetEmployeeDetailsByID(this.Employeeid).subscribe(
      (res: any) => {
        let temp =res.EMPLOYEE_DateofJoining;
         this.EmployeeAdd = new FormGroup({
      Employee_id: new FormControl(this.Employeeid),
      EMPLOYEE_Name: new FormControl(res.EMPLOYEE_Name, [Validators.required]),
      EMPLOYEE_Address1:new FormControl(res.EMPLOYEE_Address1),
      EMPLOYEE_Address2: new FormControl(res.EMPLOYEE_Address2),
      EMPLOYEE_City: new FormControl(res.EMPLOYEE_City),
      EMPLOYEE_State: new FormControl(res.EMPLOYEE_State),
      EMPLOYEE_Region:new FormControl(res.EMPLOYEE_Region),
      EMPLOYEE_Country:new FormControl(res.EMPLOYEE_Country),
  
      EMPLOYEE_Pincode:new FormControl(res.EMPLOYEE_Pincode),
      EMPLOYEE_Telno:new FormControl(res.EMPLOYEE_Telno),
      EMPLOYEE_MobileNo : new FormControl(res.EMPLOYEE_MobileNo),
      EMPLOYEE_Email:new FormControl(res.EMPLOYEE_Email),
      EMPLOYEE_DateofBirth: new FormControl( moment(res.EMPLOYEE_DateofBirth).toDate() ),
      EMPLOYEE_DateofJoining: new FormControl( moment(res.EMPLOYEE_DateofJoining).toDate()  ),
      EMPLOYEE_Qualification: new FormControl(res.EMPLOYEE_Qualification),
      EMPLOYEE_Salary:new FormControl(res.EMPLOYEE_Salary),
      EMPLOYEE_Gender:new FormControl(res.EMPLOYEE_Gender),
      EMPLOYEE_Status:new FormControl(res.EMPLOYEE_Status),
      EMPLOYEE_Companyid:new FormControl(res.EMPLOYEE_Companyid),
      EMPLOYEE_Salary_Mode:new FormControl(res.EMPLOYEE_Salary_Mode),
      CollectionBoy_Flag:new FormControl(res.CollectionBoy_Flag),
      LabID:new FormControl(res.LabID),
      Password:new FormControl(res.Password),
      //UserId:new FormControl(localStorage.getItem("LoginByID"))

    });
    this._SoloAdminMasterComponent.setLoading(false);
      },
      err => {
          console.log(err);
          this._SoloAdminMasterComponent.setLoading(false);
      }
    );
  }
  onSubmit() {
    this.DBirth =this.EmployeeAdd.controls['EMPLOYEE_DateofBirth'].value;
    this.DJoin=this.EmployeeAdd.controls['EMPLOYEE_DateofJoining'].value;
    if(this.loadedFromDate==false){
      this.DBirth= this.EmployeeAdd.controls['EMPLOYEE_DateofBirth'].value;
      
    }
    if(this.LoadedToDate==false){
      this.DJoin=  this.EmployeeAdd.controls['EMPLOYEE_DateofJoining'].value;
    }
    let Data ={
      Employee_id: this.Employeeid,
      EMPLOYEE_Name: this.EmployeeAdd.controls['EMPLOYEE_Name'].value,
      EMPLOYEE_Address1: this.EmployeeAdd.controls['EMPLOYEE_Address1'].value,
      EMPLOYEE_Address2: this.EmployeeAdd.controls['EMPLOYEE_Address2'].value,
      EMPLOYEE_City: this.EmployeeAdd.controls['EMPLOYEE_City'].value,
      EMPLOYEE_State: this.EmployeeAdd.controls['EMPLOYEE_State'].value,
      EMPLOYEE_Region: this.EmployeeAdd.controls['EMPLOYEE_Region'].value,
      EMPLOYEE_Country : this.EmployeeAdd.controls['EMPLOYEE_Country'].value,
      EMPLOYEE_Pincode: this.EmployeeAdd.controls['EMPLOYEE_Pincode'].value,
      EMPLOYEE_Telno: this.EmployeeAdd.controls['EMPLOYEE_Telno'].value,
      EMPLOYEE_MobileNo : this.EmployeeAdd.controls['EMPLOYEE_MobileNo'].value,
      EMPLOYEE_Email: this.EmployeeAdd.controls['EMPLOYEE_Email'].value,
      EMPLOYEE_DateofBirth: this.DBirth ,
      EMPLOYEE_DateofJoining: this.DJoin,
      EMPLOYEE_Qualification: this.EmployeeAdd.controls['EMPLOYEE_Qualification'].value,
      EMPLOYEE_Salary: this.EmployeeAdd.controls['EMPLOYEE_Salary'].value,
      EMPLOYEE_Gender: this.EmployeeAdd.controls['EMPLOYEE_Gender'].value,
      EMPLOYEE_Status: this.EmployeeAdd.controls['EMPLOYEE_Status'].value,
      EMPLOYEE_Companyid: this.EmployeeAdd.controls['EMPLOYEE_Companyid'].value,
      EMPLOYEE_Salary_Mode: this.EmployeeAdd.controls['EMPLOYEE_Salary_Mode'].value,
      CollectionBoy_Flag: this.EmployeeAdd.controls['CollectionBoy_Flag'].value,
      LabID: this.EmployeeAdd.controls['LabID'].value,
      Password: this.EmployeeAdd.controls['Password'].value,
      UserId:localStorage.getItem("LoginByID")
    }
    



    let a=this.EmployeeAdd.value
    console.log(a)
     if(a.EMPLOYEE_Email==""  )
     {
       alert("please enter email id");
       return;
     }
    if(this.EmployeeAdd.get('EMPLOYEE_Email').hasError('email'))
     {
       alert("please enter valid email address");
       return;
   

     } 
    if(Data.EMPLOYEE_Name=="")
    {
      alert("Please Enter Employee Name");
      return
    }
    
    if (this.Employeeid != null && this.Employeeid != ''){
      this.update(Data);
    }else{
      this.insert(Data);
    }
  }
  
  insert(Data){
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.InsertEmployee(Data).subscribe(
      (res: any) => {
          if(res != 0)
          {
            this._SoloAdminMasterComponent.setLoading(false);
            this.storage.remove('ID');
            localStorage.setItem("AlertType","success");
            localStorage.setItem("AlertMessage","Employee Created Succesfully"); 
            this.alertService.error("Employee Created Successfully..!");
            this.router.navigateByUrl('Admin/EmployeeList');
          }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Employee not added.');
        else
          console.log(err);
      }
    );
  }
  update(Data){
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.UpdateEmployee(Data).subscribe(
      (res: any) => {
        this._SoloAdminMasterComponent.setLoading(false);
          if(res != 0)
          {
            this._SoloAdminMasterComponent.setLoading(false);
            this.storage.remove('ID');
            localStorage.setItem("AlertType","success");
            localStorage.setItem("AlertMessage","Employee Updated Succesfully"); 
            this.alertService.error("Employee Created Successfully..!");
            this.router.navigateByUrl('Admin/EmployeeList');
          }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Employee not update.');
        else
          console.log(err);
      }
    );
  }

  Back(){
    this.storage.remove('ID');
    this.router.navigateByUrl('Admin/EmployeeList');
  }
 
  onDateChange(order,event){
    let tempData=event.value._d
    order.OrderRecivedDate=  this.DatePipe.transform(tempData, 'MM-dd-yyyy');
  }
  changeDateLoad(value){
    if(value=='From'){
  this.loadedFromDate=false

    }
    else  if(value=='To'){
   this.LoadedToDate=false
          }
  }
 
}


