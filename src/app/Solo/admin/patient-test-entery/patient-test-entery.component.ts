import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { ChangeDetectorRef } from '@angular/core';
import { PaginationService } from 'src/app/CustomComponents/pagination/pagination.service';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/Shared/EmployeeService';
import { ModalService } from 'src/app/CustomComponents/Modal/List_Admin';
import { PatientService } from 'src/app/Shared/PatientService ';
import { TestService } from 'src/app/Shared/TestService';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';
import { ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Encrypt } from 'src/app/CustomComponents/Encrypt';
import swal from 'sweetalert';
@Component({
  selector: 'app-patient-test-entery',
  templateUrl: './patient-test-entery.component.html',
  styleUrls: ['./patient-test-entery.component.scss']
})
export class PatientTestEnteryComponent implements OnInit {

  DataList: any=[];
  service: any;
  constructor(private router: Router, private _PatientService: PatientService,private _TestService :TestService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _SoloAdminMasterComponent:SoloAdminMasterComponent,private alertService: AlertService,
    public paginationService : PaginationService,private _EmployeeService :EmployeeService,
    private changeDetection: ChangeDetectorRef, private modalService: ModalService, private _Encrypt:Encrypt ) {localStorage.setItem('PageTitle',"Patient Test Entery"); }
  Status = 'All';
  Keyword;
  @ViewChild('pdfViewer') pdfViewer
  TestData:any=[];
  ViewByID="inherit";
  ViewByName="none";
  SearchFilter;
  search = null;
  myvalue;
  testname;
  


   ngOnInit() {
    this.SearchFilter = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      SendSMS:new FormControl(true),
       id: new FormControl(Value),
       
    });
     this.SearchChanges();
     //console.log("abc1");
     if(this.storage.get('ID')!=null)
     {
       //console.log(this.storage.get('ID'));
      //console.log("abc");
      this.getTestDetailByPatientID(this.storage.get('ID'));
     }
    
     //this.getTestDetailByPatientID(this.storage.get('ID'));
          
    
  }

onViewByName(){
this.ViewByID='none';
this.ViewByName='inherit';

}
onViewById(){
  this.ViewByID='inherit';
  this.ViewByName='none';

}



  ChangeFilter(){
    this.search=this.SearchFilter.controls['search'].value;
    this.SearchChanges();
  }
  SearchChanges(){
    this.getAllData();
  }
  getAllData() {
    this._SoloAdminMasterComponent.setLoading(true);
   
    if(this.search=="")
    {
      this.search=null;
    }else
    {
      
    }
    this._TestService.GetPatientListforDataEntry(this.search,localStorage.getItem("FromDate"),localStorage.getItem("ToDate")).subscribe((res: any) => {  
      this._SoloAdminMasterComponent.setLoading(false);
      this.DataList = res;  
      this.changeDetection.detectChanges();
    },
    err => { 
      this._SoloAdminMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();
        console.log(err);
    });  
  } 

  getTestDetailByPatientID(Patient_Id) {
    this._SoloAdminMasterComponent.setLoading(true);
    this._TestService.GetAllTestDetailsbyPatientID(Patient_Id).subscribe(
      (res: any) => {
        this.TestData=res;
        //console.log(res);
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        return;
      },
      err => {
        console.log(err);
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
      }
    );
  }

 

  Edit(Value){
    // let  url:string =environment.ReportUrl+this._Encrypt.set(Value) +'&Report='+this._Encrypt.set("GetPatientTestReport");
    // window.open(url, '_blank');
  this.storage.set('ID', Value);
 
    //console.log('ID',Value);
    this.router.navigateByUrl('/Admins/TestDetailEdit');
  }

  Authenticate(Value){
    // let  url:string =environment.ReportUrl+this._Encrypt.set(Value) +'&Report='+this._Encrypt.set("GetPatientTestReport");
    // window.open(url, '_blank');
  this.storage.set('ID', Value);
 
    //console.log('ID',Value);
    this.router.navigateByUrl('/Admins/AuthenticatePatientTest');
  }
  
  isChangeLimitAccessToggle(id,test)
  {
  //console.log(id,test);

  this.myvalue=id;
  this.testname=test;
  
  }



  Format01()
  {
    let Ids:any ="";
    for(let i:number=0; i<this.TestData.length;i++)
    {
      if(this.TestData[i].issent)
      {
        if(i+1<this.TestData.length)
        {
          Ids+=this.TestData[i].DOCHDR_lDocumentId+",";
          //console.log(Ids);
        }else
        {
          Ids+=this.TestData[i].DOCHDR_lDocumentId;
        }
      }

    }

    
    
   


    //https://localhost:44399/PatientTestReport.aspx?ID=25&Contact=&EmailId=&testId=1069&reportDate=&Patient_Name=&TESTREPORT=Report
    let  url:string =environment.ReportUrl+"/PatientTestReport.aspx?ID="+this.myvalue+"&Contact=&EmailId=&testId="+Ids+"&reportDate=&Patient_Name=&TESTREPORT=Report";
    window.open(url,'_blank');
    
    //console.log(url);


    let Markcomplete2;
    Markcomplete2='P';
     let ids1=Ids;
     console.log(Ids);
    let LoginByID= localStorage.getItem('LoginByID');
    let dataa={
    
      "value1": this.myvalue,
      "test":Ids,
      "Markcomplete2":Markcomplete2,
      "AddedBy":localStorage.getItem('LoginByID'),
     }
   


  
  this._PatientService.UpdateDocDetTestValue(dataa).subscribe((res: any) => {
   this._SoloAdminMasterComponent.setLoading(false);

 
  //  swal({
  //   icon: 'success',
  //   title: 'Record save successfully...!',
  //   timer: 300
  // }); 
   
  this.getTestDetailByPatientID(this.myvalue);
 
    },
    err => {
      this._SoloAdminMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();
      console.log(err);
      return null;
    });
    //window.location.reload();
    
  }


  rptTOG()
  {
    let Ids:any ="";
    for(let i:number=0; i<this.TestData.length;i++)
    {
      if(this.TestData[i].issent)
      {
        if(i+1<this.TestData.length)
        {
          Ids+=+this.TestData[i].DOCHDR_lDocumentId+",";
          //console.log(Ids);
        }else
        {
          Ids+=this.TestData[i].DOCHDR_lDocumentId;
        }
      }

    }




    //https://localhost:44399/PatientTestReport.aspx?ID=25&Contact=&EmailId=&testId=&reportDate=&Patient_Name=&TESTREPORT=rptTOG

    let  url:string =environment.ReportUrl+"/PatientTestReport.aspx?ID="+this.myvalue+"&Contact=&EmailId=&testId="+Ids+"&reportDate=&Patient_Name=&TESTREPORT=rptTOG";
    window.open(url,'_blank');
    
    //console.log(url);


    let Markcomplete2;
    Markcomplete2='P';
     let ids1=Ids;
     console.log(Ids);
    let LoginByID= localStorage.getItem('LoginByID');
    let dataa={
    
      "value1": this.myvalue,
      "test":Ids,
      "Markcomplete2":Markcomplete2,
      "AddedBy":localStorage.getItem('LoginByID'),
     }
   


  
     this._PatientService.UpdateDocDetTestValue(dataa).subscribe((res: any) => {
      this._SoloAdminMasterComponent.setLoading(false);
   
    
     //  swal({
     //   icon: 'success',
     //   title: 'Record save successfully...!',
     //   timer: 300
     // }); 
     this.getTestDetailByPatientID(this.myvalue);

    
      
    
       },
       err => {
         this._SoloAdminMasterComponent.setLoading(false);
         this.changeDetection.detectChanges();
         console.log(err);
         return null;
       });
      // window.location.reload();

  }




 rptPrintAll()
 {
     
      let Ids:any ="";
      for(let i:number=0; i<this.TestData.length;i++)
      {
        if(this.TestData[i].issent)
        {
          if(i+1<this.TestData.length)
          {
           
            Ids+=this.TestData[i].DOCHDR_lDocumentId+",";
            //console.log(Ids);
          }else
          {
           
            Ids+=this.TestData[i].DOCHDR_lDocumentId;
          }
        }

      }

    



    //https://localhost:44399/PatientTestReport.aspx?ID=25&Contact=&EmailId=&testId=&reportDate=&Patient_Name=&TESTREPORT=rptPrintAll

    let  url:string =environment.ReportUrl+"/PatientTestReport.aspx?ID="+this.myvalue+"&Contact=&EmailId=&testId=&reportDate=&Patient_Name=&TESTREPORT=rptPrintAll";
    window.open(url,'_blank');
    
    //console.log(url);


    let Markcomplete2;
    Markcomplete2='P';
    
     var id1=null;
    let LoginByID= localStorage.getItem('LoginByID');
    let dataa={
    
      "value1": this.myvalue,
      "test":id1,
      
      "Markcomplete2":Markcomplete2,
      "AddedBy":localStorage.getItem('LoginByID'),
     }
   
     this._PatientService.UpdateDocDetTestValue(dataa).subscribe((res: any) => {
      this._SoloAdminMasterComponent.setLoading(false);
   
    
     //  swal({
     //   icon: 'success',
     //   title: 'Record save successfully...!',
     //   timer: 300
     // }); 
      
     this.getTestDetailByPatientID(this.myvalue);
       },
       err => {
         this._SoloAdminMasterComponent.setLoading(false);
         this.changeDetection.detectChanges();
         console.log(err);
         return null;
       });
       //window.location.reload();

  }






  // Report()
  // {
  //   let Ids:any ="";
  //   for(let i:number=0; i<this.TestData.length;i++)
  //   {
  //     if(this.TestData[i].issent)
  //     {
  //       if(i+1<this.TestData.length)
  //       {
  //         Ids+=this.TestData[i].DOCHDR_lDocumentId+",";
  //         //console.log(Ids);
  //       }else
  //       {
  //         Ids+=this.TestData[i].DOCHDR_lDocumentId;
  //       }
  //     }

  //   }



  //   //https://localhost:44399/PatientTestReport.aspx?ID=154&TESTREPORT=TESTREPORT1&Contact=&EmailId=&testId=&reportDate=&Patient_Name=

  //   let  url:string =environment.ReportUrl+"/PatientTestReport.aspx?ID="+this.myvalue+"&Contact=&EmailId=&testId="+Ids+"&reportDate=&Patient_Name=&TESTREPORT=rptPrintAll";
  //    window.open(url,'_blank');
    
  //   //console.log(url);
  // }

     
  smsreport()
  {

    

    
   

    this._SoloAdminMasterComponent.setLoading(true);
      this. _TestService.GetPatientAllTestDetailsmsreport(this.SearchFilter.controls['SendSMS'].value,this.myvalue,this.testname).subscribe
      (
        (res: any) => 
        {
      
         SendSMS:new FormControl(res.SendSMS)
         
        }
      );
      this._SoloAdminMasterComponent.setLoading(false);
     
  }



   
  public openPdf(ID) {
    this._PatientService.Report(ID).subscribe(
      (res: any) => {
         localStorage.setItem("Count","1");
         localStorage.setItem("Pdf",res);
         this.router.navigateByUrl('/PdfViewer');
         
      },
      err => {
        console.log(err);
      }
    );
  }
  Close()
  {
    this.router.navigateByUrl('/Admin/PatientList');
  }
  Refresh()
  {
    this.SearchChanges();
  }
  QuickSearch()
  {
    this.SearchChanges();
    this.getTestDetailByPatientID(0)
  }

 
}   

function Value(Value: any) {
  throw new Error('Function not implemented.');
}

