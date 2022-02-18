import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/Shared/DoctorService';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';
import { CollectionCenterService } from 'src/app/Shared/CollectionCenterService';
import { EmployeeService } from 'src/app/Shared/EmployeeService';
import { PatientService } from 'src/app/Shared/PatientService ';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import {PaymentModeService} from 'src/app/Shared/PaymentModeService';

import { PaginationService } from 'src/app/CustomComponents/pagination/pagination.service';
import { LayoutComponent } from 'src/app/Patient/_layout/layout.component';
import { ModalService } from 'src/app/CustomComponents/Modal/Solo_Admin';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import swal from 'sweetalert';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-payment-system-list',
  templateUrl: './payment-system-list.component.html',
  styleUrls: ['./payment-system-list.component.scss']
})
export class PaymentSystemListComponent implements OnInit {


  DataList: any = [];

  constructor(private modalService: ModalService, private router: Router, 
     @Inject(SESSION_STORAGE) private storage: WebStorageService,public DatePipe: DatePipe,
     private _PatientService: PatientService,private changeDetection: ChangeDetectorRef, 
     public paginationService : PaginationService,
     private _SoloAdminMasterComponent: SoloAdminMasterComponent,private _paymentmodes:PaymentModeService,
     ) { }

    Isable=false;
    ShowAll=false;
    PType=false;
    PopupLabel:string='Add Payment';
    txtMobileNumber:string='';
    txtLabnumber:string='';
    txtDate:string='';
    txtMode:string='';
    PatientName:string='';
    CurrentpatientId:string='';
    FromDate;
    ToDate;
    PatientDataList: any=[];
    PaymentHistory: any=[];
    paymetModeList:Observable<any>;
    Isselected=false;
    PaymentGroup:FormGroup;
     ngOnInit() {
      this.PaymentGroup=new FormGroup({
        txtPatientName: new FormControl(''),
        txtLabNo: new FormControl(''),
        txtDate: new FormControl(''),
        DropPaymentMode: new FormControl(''),
        txtBillAmount: new FormControl(''),
        txtAmountPaid: new FormControl(''),
        txtBalance: new FormControl(''),
        txtAmount: new FormControl(''),
        PatientName:new FormControl(''),
        txtRemarks:new FormControl(''),
      })
       this.GetPatientListBlanceAmount();
       this.getPaymetMode();
    }
  GetPatientListBlanceAmount() {
    this.FromDate=localStorage.getItem("FromDate");
    this.ToDate=localStorage.getItem("ToDate")

    let type='S';
    if(this.ShowAll==true)
    {
      type='All';
    }
    this._SoloAdminMasterComponent.setLoading(true);
    let model={
      'FromDate':this.FromDate,
      'ToDate':this.ToDate,
      'UserId':localStorage.getItem('LoginByID'),
      'Keyword':'',
      'Type':type
    }
    this._PatientService.GetPatientListBlanceAmount(model).subscribe((res: any) => {  
      if(res!=null)
      {
        this.PatientDataList=res;
        console.log(this.PatientDataList);
        this.changeDetection.detectChanges();
      }else
      {
        this.PatientDataList[0]=null;
        this.changeDetection.detectChanges();
      }
      this._SoloAdminMasterComponent.setLoading(false);
    },
    err => { 
        console.log(err);
        this._SoloAdminMasterComponent.setLoading(false);
    });  
  } 
  Add(LabelValue) {
    if(LabelValue=='Refund Payment')
    {
      this.PType=true;
    }else{
      this.PType=false;
    }
    this.PopupLabel=LabelValue;
    // this.changeDetection.detectChanges();
    this.CheckSelected();
    
    
  }
  savePayment()
    {
      let Ids:any ="";
      for(let i:number=0; i<this.PatientDataList.length;i++)
      {
        if(this.PatientDataList[i].issent)
        {
          Ids=this.PatientDataList[i].PATIENT_ID;
          this.CurrentpatientId=Ids;
          this.savePayment2(Ids)
          this.Isselected=true;
          return
        }
      }
    }
  savePayment2(PatientId){
    if(this.PaymentGroup.controls['txtDate'].value=='')
    {
      swal({
        icon: 'warning',
        title: 'Please Enter Patient Date',
      });
      return 
    }
    let mode='';
    if(this.PType==true)
    {
      mode='R'
    }else
    {
mode='P';
    }
    this.closePayment();

    this._SoloAdminMasterComponent.setLoading(true);
 let Model={
  'PatientId':PatientId,
  'AmountPaid':this.PaymentGroup.controls['txtAmount'].value,
  'UserId':localStorage.getItem('LoginByID'),
  'PAYMENTMODE':this.PaymentGroup.controls['DropPaymentMode'].value,
  'CASHAMOUNT':this.PaymentGroup.controls['txtBillAmount'].value,
  'PAYDATE':this.PaymentGroup.controls['txtDate'].value,
  'Type':mode,
  'Remark':this.PaymentGroup.controls['txtRemarks'].value
}
this._PatientService.PaidBalanceAmount(Model).subscribe((res:any)=>{
  if(res!=null || res!=''){
    let  url:string =environment.ReportUrl+"/VoucherReport.aspx?ID="+PatientId;
    console.log(url);
    window.open(url, '_blank');
  }else{

  }
  swal({
    icon: 'success',
    title: 'Payment Done Successfully',
    timer:600
  }); 
  this._SoloAdminMasterComponent.setLoading(false);
  this.GetPatientListBlanceAmount();
},
err=>{
  console.log(err);
  this._SoloAdminMasterComponent.setLoading(false);
  swal({
    icon: 'warning',
    title: err,
  });
  return 
});
  }
  
  closePayment(){
 this.modalService.close('custom-modal');
  }
  getPaymetMode(){
  
    this._paymentmodes.GetAllPaymentMode(1).subscribe((res: any) => {
          
          this.paymetModeList=res;
          this.PaymentGroup.controls["DropPaymentMode"].setValue(res[0].Id);
          
        },
          err => {
            this._SoloAdminMasterComponent.setLoading(false);
            this.changeDetection.detectChanges();
            console.log(err);
            return null;
          });
    }

    CheckSelected()
    {
      let Ids:any ="";
      for(let i:number=0; i<this.PatientDataList.length;i++)
      {
        if(this.PatientDataList[i].issent)
        {
          Ids=this.PatientDataList[i].PATIENT_ID;
          this.CurrentpatientId=Ids;
          this.BindpopupDetails(Ids)
          this.Isselected=true;
          return
        }
      }
    }
    BindpopupDetails(PatientId){
      this._SoloAdminMasterComponent.setLoading(true);
this._PatientService.GetPatientListBlanceAmountByID(PatientId).subscribe((res:any)=>{
  if(res!=null || res!='')
  {
    console.log(res);
    this.PaymentGroup.controls['txtPatientName'].setValue(res.PATIENT_Name);
    this.PaymentGroup.controls['txtBillAmount'].setValue(res.TotalAmount);
    this.PaymentGroup.controls['txtAmountPaid'].setValue(res.AMOUNTPAID);
    this.PaymentGroup.controls['txtBalance'].setValue(res.BALANCEAMOUNT);
    this.PaymentGroup.controls['txtDate'].setValue(res.PATIENT_DATE);
    this.PaymentGroup.controls['txtAmount'].setValue(0);
    this.PaymentGroup.controls['txtLabNo'].setValue(res.LABNO);
    this.changeDetection.detectChanges();
    this.modalService.open('custom-modal');
  }else{

  }
  this._SoloAdminMasterComponent.setLoading(false);
})
}
    EnterAmount(Amount){
   
      if(parseInt (Amount)<=parseInt(this.PaymentGroup.controls['txtBalance'].value))
      {
        this.PaymentGroup.controls['txtAmount'].setValue(Amount);
        this.changeDetection.detectChanges();
      }else{
        this.PaymentGroup.controls['txtAmount'].setValue('');
        this.changeDetection.detectChanges();
      }
    }
   

    SearchPatientListBlanceAmount(KeyValues) {
      this.FromDate=localStorage.getItem("FromDate");
      this.ToDate=localStorage.getItem("ToDate")
      
      let model={
        'FromDate':this.FromDate,
        'ToDate':this.ToDate,
        'UserId':localStorage.getItem('LoginByID'),
        'Keyword':KeyValues
      }
      this._PatientService.GetPatientListBlanceAmount(model).subscribe((res: any) => {  
        if(res!=null)
        {
          this.PatientDataList=res;
          console.log(this.PatientDataList);
          this.changeDetection.detectChanges();
          
        }else
        {
          this.PatientDataList[0]=null;
          this.changeDetection.detectChanges();
        }
     
      },
      err => { 
          console.log(err);
         
      });  
    } 
    Close(){
      this.router.navigateByUrl('/Admin/PatientList');
    }

     keyPressNumbersDecimal(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ( (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
 
  Refresh(){
    this.GetPatientListBlanceAmount();
  }
  ShowHistory(){

    let Ids:any ="";
    for(let i:number=0; i<this.PatientDataList.length;i++)
    {
      if(this.PatientDataList[i].issent)
      {
        Ids=this.PatientDataList[i].PATIENT_ID;
        this.CurrentpatientId=Ids;
        this.BindHistory(Ids)
        this.Isselected=true;
        return
      }
    }

  }
  BindHistory(PatientId){
    this._PatientService.GetPatientPaymentHistory(PatientId).subscribe((res:any)=>{
      if(res!=null || res!=''){
        this.PaymentHistory=res;
        console.log(res);
        this.PaymentGroup.controls['PatientName'].setValue(res[0].PATIENT_Name);
           this.changeDetection.detectChanges();
        this.modalService.open('PaymentHistory-modal');
      }
      else{
        this.PaymentHistory[0]=null;
           this.changeDetection.detectChanges();
      }
      });
  }
  closeHistory(){
    this.modalService.close('PaymentHistory-modal');
  }
  MakeBillClick(){
    let Ids:any ="";
    for(let i:number=0; i<this.PatientDataList.length;i++)
    {
      if(this.PatientDataList[i].issent)
      {
        Ids=this.PatientDataList[i].PATIENT_ID;
        this.MakeBill(Ids)
        this.Isselected=true;
        return
      }
    }
    
  }
  MakeBill(PatinetId){
    
    this._PatientService.GetMakeBillMessage(PatinetId).subscribe((res:any)=>{
 if(res!=null || res!='' ){

  if(res.STATUS==0){
    let  url:string =environment.ReportUrl+"/FinalBillReport.aspx?ID="+PatinetId;
    console.log(url);
    window.open(url, '_blank');
  }else{
    swal({
      icon: 'warning',
      title: res.MESSAGE,
    });
  }
}else{

}
},
err => { 
    console.log(err);
}); 
  }

 
  ExportData() {
    let element = document.getElementById('PaymentHistory');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */  
    XLSX.writeFile(wb, "PaymentHistory.xlsx");
    swal({
      icon: 'success',
      title: 'Data Exported Successfully',
      timer:600,
    });
}


}
