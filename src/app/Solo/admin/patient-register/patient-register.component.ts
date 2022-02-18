import { ChangeDetectorRef, Inject, QueryList, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from 'src/app/CustomComponents/Modal/Solo_Admin';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DoctorService } from 'src/app/Shared/DoctorService';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';
import { CollectionCenterService } from 'src/app/Shared/CollectionCenterService';
import { EmployeeService } from 'src/app/Shared/EmployeeService';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { PatientService } from 'src/app/Shared/PatientService ';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { DatePipe } from '@angular/common';
import { parseDate } from '@progress/kendo-angular-intl';
import * as moment from 'moment';
import { ViewEncapsulation } from '@angular/core';
import {PaymentModeService} from 'src/app/Shared/PaymentModeService';
import { environment } from 'src/environments/environment';




/**
* @title Basic table
*/

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
  
})
export class PatientRegisterComponent {
  public format = 'dd/MM/yyyy HH:mm';
  constructor(private modalService: ModalService, private router: Router, private alertService: AlertService
    , public DatePipe: DatePipe, @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _DoctorService: DoctorService, private _PatientService: PatientService,
    private changeDetection: ChangeDetectorRef, private _CollectionCenterService: CollectionCenterService,
    private _EmployeeService: EmployeeService
    , private _SoloAdminMasterComponent: SoloAdminMasterComponent,private _paymentmodes:PaymentModeService) {

    localStorage.setItem('PageTitle', "Patient Entry Register");
  }
  AlertMessage :any;
  toDay = new Date();
  NLabNo:any;
  isSerchable:Boolean=false
  PATIENT_Date = new Date();
  Sample_Date = new Date();
  Patient: FormGroup = new FormGroup({
    PATIENT_Telno: new FormControl(''),
    PATIENT_Name: new FormControl('', [Validators.required]),
    PATIENT_Date: new FormControl(new Date()),
    Remarks: new FormControl(''),
    Urgent: new FormControl(false),
    PATIENT_Address1: new FormControl(''),
    PATIENT_Address2: new FormControl(''),
    blnCommission: new FormControl(true),
    SendSMS:new FormControl(true),
    PatientDocType: new FormControl(''),
    CreditCardAmount: new FormControl(''),
    NEFT_RTGSAmount: new FormControl(''),
    HOSPTYPE: new FormControl(''),
    OtherRemarks: new FormControl(''),
    ChequeAmount: new FormControl(''),
    PATIENT_Country: new FormControl(''),
    WardNo: new FormControl(''),
    PATIENT_VisitTime: new FormControl(''),
    PATIENT_Email: new FormControl('',	[ Validators.email]),
    UPI_WalletAmount: new FormControl(''),
    PATIENT_Gender: new FormControl(''),
    Sample_Date: new FormControl(new Date()),
    PatientCollectioncenterID: new FormControl(''),
    PATIENT_DOB: new FormControl(''),
    Patient_DocType: new FormControl('Soft Copy'),
    LabNo: new FormControl('0'),
    DropPaymentMode:new FormControl(''),
    DropTPAList:new FormControl(''),
    HospitalizeRemark:new FormControl(''),
    TPAName:new FormControl(''),
    Email1:new FormControl('',[Validators.required, Validators.email]),
    Email2:new FormControl('',[Validators.required, Validators.email]),
    Mobile1:new FormControl(''),
    Mobile2:new FormControl(''),
    City:new FormControl(''),
    Area:new FormControl(''),
    txtPaymentMode:new FormControl(''),
    State:new FormControl(''),
    Pincode:new FormControl(''),
    TelephoneNo:new FormControl(''),
    ProposalNumber:new FormControl('')

  });
  Patient_Id: number = 0;
  PatientCollectioncenterID = new FormControl(null);
  Doc1 = new FormControl(null);
  Doc2 = new FormControl(null);
  TotalAmountPaid = 0;
  BalanceAmount = 0;
  locale: string = 'en-US';
  Doc1Id;
  Doc2Id;
  FileUpload ;
  FileName; 
  ListOfPatientToSelect;
  SelectedGender: string = '';
  SelectedMode:string='';
  faEye = faEye;
  options;
  filteredOptions: Observable<any>;
  options2;
  paymetModeList:Observable<any>;
  TPAList:Observable<any>;
  filteredOptions2: Observable<any>;
  CollectionCenterList: Observable<any>;
  CollectionCenteroptions;
  AllTestList: Observable<any>;
  AllTestoptions;
  MobileNoList: Observable<any>;
  MobileNooptions;
  AllTestSearch = new FormControl('');
  CollectionCenter = new FormControl('', [Validators.required]);
  CollectionCenterCount: number;
  TestX_Ray: any = [];
  TestPythology: any = [];
  TestProfiles: any = [];
  TestHisto: any = [];
  TestSono: any = [];
  TestCardio: any = [];
  TestColourDopler: any = [];
  TestPolyClinic: any = [];
  TestDental: any = [];
  TestProcedure: any = [];
  PATIENT_Telno = new FormControl('');
  SearchListX_Ray = new FormControl('');
  SearchListPythology = new FormControl('');
  SearchListProfiles = new FormControl('');
  SearchListHisto = new FormControl('');
  SearchListSono = new FormControl('');
  SearchListCardio = new FormControl('');
  SearchListDopler = new FormControl('');
  SearchListPolyClinic = new FormControl('');
  SearchListDetal = new FormControl('');
  SearchListProcedure = new FormControl('');
  InsertedTestList: any = [];
  CollectionCenterRowModified: boolean = false;
  EmergencyChargesPercentage = 0.00;
  EmergencyChargesAmount = 0.00;
  ConcessionPercentage = 0.00;
  ConcessionAmount = 0.00;
  TotalAmount = 0.00;
  BillAmount = 0.00;
  AmountPaidInCash = 0.00;
  PatientYear = new FormControl(null);
  PatientMonth = new FormControl(0.00);
  PatientDay = new FormControl(0.00);
  ClassPatientYear: string = 'col-md-11';
  EnablePatientYYMMDD: string = 'none';
  PATIENT_Name_Enable = true;
  PATIENT_Name_Select_Enable = false;
  PATIENT_Name_Select_Enable2=false;
  D_ID:string="";
  fileToUpload;
  ngOnInit() {
    
    // this._SoloAdminMasterComponent.SetTitle("Patient Entry Register");
    this.getPaymetMode();
   this.getTPALIST();
    this.getDoctor();
    this.getCollectionCenter();
    
    this.Patient_Id = this.storage.get('ID');
    if (this.Patient_Id != null && this.Patient_Id != 0) {
      this.getPatientData();
    } else {
      this.Patient_Id = 0;
      this.GetLabNo();
      this.SelectedAllTest(0);
    }

  }


  moveToSelectedTab(tabName: string) {
    for (let i =0; i< document.querySelectorAll('.mat-tab-label-content').length; i++) {
    if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) 
       {
          (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
       }
     }
  }
  GetLabNo() {
    this._SoloAdminMasterComponent.setLoading(true);
    this._PatientService.GetLabNo().subscribe((res: any) => {
     
      this.Patient.controls['LabNo'].setValue(res.LabNumber);
      this.NLabNo=res.LabNumber;
      this._SoloAdminMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();

    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
      })

  }

  SelectedTestFromAllTestSearch(value) {

    this._EmployeeService.GetTestMasterByCollectionCenterID(this.PatientCollectioncenterID.value, 'All',value).subscribe((res: any) => {
      if (res.length > 0) {
        if (res.length > 1) {
          for (let i: number = 0; i < res.length; i++) {
            if (res[i].TESTMST_Name ==  value) {
              this.onCheckBoxChange(res[0], true);
              return;
            }

          }
        } else {
          
          this.onCheckBoxChange(res[0], true);

        }
      }
      this._SoloAdminMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();

    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
      })

    // this.AllTestSearch= new FormControl('');
  }

   SelectedAllTest(value) {
this.getTestListAllNew('X');
this.getTestListAllNew('P');
this.getTestListAllNew('R');
this.getTestListAllNew('H');
this.getTestListAllNew('S');
this.getTestListAllNew('C');
this.getTestListAllNew('T');
this.getTestListAllNew('U');
this.getTestListAllNew('D');
this.getTestListAllNew('V');
 
  }

  getTestListAllNew(Type: string) {
    this.changeDetection.detectChanges();
    let Search: string = null;
    if (Type == 'X') {
      Search = this.SearchListX_Ray.value;
    } else if (Type == 'P') {
      Search = this.SearchListPythology.value;
    } else if (Type == 'R') {
      Search = this.SearchListProfiles.value;
    } else if (Type == 'H') {
      Search = this.SearchListHisto.value;
    } else if (Type == 'S') {
      Search = this.SearchListSono.value;
    }
    else if (Type == 'C') {
      Search = this.SearchListCardio.value;
    }
    else if (Type == 'T') {
      Search = this.SearchListDopler.value;
    }
    else if (Type == 'U') {
      Search = this.SearchListPolyClinic.value;
    }
    else if (Type == 'D') {
      Search = this.SearchListDetal.value;
    }
    else if (Type == 'V') {
      Search = this.SearchListProcedure.value;
    }

    
      // this._SoloAdminMasterComponent.setLoading(true);

      this.getAllTest();
      this._EmployeeService.GetTestMasterByCollectionCenterID(0, Type, Search).subscribe((res: any) => {
        if (Type == 'X') {
          this.TestX_Ray = res;
          if (this.TestX_Ray.length == 0 && this.SearchListX_Ray.value != null && this.SearchListX_Ray.value != '') {
            this.SearchListX_Ray = new FormControl(this.SearchListX_Ray.value);//.slice(0, -1)
            this.getTestList(Type);
          }

        } else if (Type == 'P') {
          this.TestPythology = res;
          if (this.TestPythology.length == 0 && this.SearchListPythology.value != null && this.SearchListPythology.value != '') {
            this.SearchListPythology = new FormControl(this.SearchListPythology.value);//.slice(0, -1)
            this.getTestList(Type);
          }
        } else if (Type == 'R') {
          this.TestProfiles = res;
          if (this.TestProfiles.length == 0 && this.SearchListProfiles.value != null && this.SearchListProfiles.value != '') {
            this.SearchListProfiles = new FormControl(this.SearchListProfiles.value);//.slice(0, -1)
            this.getTestList(Type);
          }
        } else if (Type == 'H') {
          this.TestHisto = res;
          if (this.TestHisto.length == 0 && this.SearchListHisto.value != null && this.SearchListHisto.value != '') {
            this.SearchListHisto = new FormControl(this.SearchListHisto.value);//.slice(0, -1)
            this.getTestList(Type);
          }
        } else if (Type == 'S') {
          this.TestSono = res;
          if (this.TestSono.length == 0 && this.SearchListSono.value != null && this.SearchListSono.value != '') {
            this.SearchListSono = new FormControl(this.SearchListSono.value);//.slice(0, -1)
            this.getTestList(Type);
          }
          
        }
        else if (Type == 'C') {
          this.TestCardio = res;
        
          if (this.TestCardio.length == 0 && this.SearchListCardio.value != null && this.SearchListCardio.value != '') {
            this.SearchListCardio = new FormControl(this.SearchListCardio.value);//.slice(0, -1)
            this.getTestList(Type);
          }
          
        }
        else if (Type == 'T') {
          this.TestColourDopler = res;
          if (this.TestColourDopler.length == 0 && this.SearchListDopler.value != null && this.SearchListDopler.value != '') {
            this.SearchListDopler = new FormControl(this.SearchListDopler.value);//.slice(0, -1)
            this.getTestList(Type);
          }
          
        }
        else if (Type == 'U') {
          this.TestPolyClinic = res;
          if (this.TestPolyClinic.length == 0 && this.SearchListPolyClinic.value != null && this.SearchListPolyClinic.value != '') {
            this.SearchListPolyClinic = new FormControl(this.SearchListPolyClinic.value);//.slice(0, -1)
            this.getTestList(Type);
          }
        }
        else if (Type == 'D') {
          this.TestDental = res;
          if (this.TestDental.length == 0 && this.SearchListDetal.value != null && this.SearchListDetal.value != '') {
            this.SearchListDetal = new FormControl(this.SearchListDetal.value);//.slice(0, -1)
            this.getTestList(Type);
          }
        }
        else if (Type == 'V') {
          this.TestProcedure = res;
          if (this.TestProcedure.length == 0 && this.SearchListProcedure.value != null && this.SearchListProcedure.value != '') {
            this.SearchListProcedure = new FormControl(this.SearchListProcedure.value);//.slice(0, -1)
            this.getTestList(Type);
          }
        }
        if (this.InsertedTestList.length != 0) {
          this.setInsertedData(Type);

        }
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();

      },
        err => {
          this._SoloAdminMasterComponent.setLoading(false);
          this.changeDetection.detectChanges();
          console.log(err);
        })
   
  }

  SearchTestValueChanegd(values) {
    if (this.CollectionCenter.value != null && this.CollectionCenter.value != '') {
      this.CollectionCenterChanegdSearch();
    }else
    {
      this.searchvaluewithNoCenter(values);
    }
   

    // this.AllTestSearch= new FormControl('');
  }
  searchvaluewithNoCenter(values)
  {
this.getTestListAllNew('X');
this.getTestListAllNew('P');
this.getTestListAllNew('R');
this.getTestListAllNew('H');
this.getTestListAllNew('S');
this.getTestListAllNew('C');
this.getTestListAllNew('T');
this.getTestListAllNew('U');
this.getTestListAllNew('D');
this.getTestListAllNew('V');

  }

  SelectedPatient(ID) {
    this.PATIENT_Name_Enable = true;
    this.PATIENT_Name_Select_Enable = false;
    this.PATIENT_Name_Select_Enable2=false;
    
    this.GetLabNo();
    this._PatientService.GetPatientDetail(ID).subscribe(
      (res: any) => {
        this.SelectedGender = res[0].PATIENT_Gender;
        // this.SelectedMode=res[0].Paymode;
        // this.PATIENT_Telno = new FormControl(res[0].PATIENT_Telno);
        this.Patient = new FormGroup({
          PATIENT_Name: new FormControl(res[0].PATIENT_Name, [Validators.required]),
          Remarks: new FormControl(''),
          Urgent: new FormControl(false),
          PATIENT_Address1: new FormControl(res[0].PATIENT_Address1),
          PATIENT_Address2: new FormControl(res[0].PATIENT_Address2),
          blnCommission: new FormControl(res[0].blnCommission),
          SendSMS:new FormControl(res[0].SendSMS),
          PatientDocType: new FormControl(''),
          CreditCardAmount: new FormControl(''),
          NEFT_RTGSAmount: new FormControl(''),
          HOSPTYPE: new FormControl(''),
          OtherRemarks: new FormControl(''),
          ChequeAmount: new FormControl(''),
          PATIENT_Country: new FormControl(res[0].PATIENT_Country),
          WardNo: new FormControl(''),
          PATIENT_VisitTime: new FormControl(''),
          PATIENT_Email: new FormControl(res[0].PATIENT_Email,	[ Validators.email]),
          UPI_WalletAmount: new FormControl(''),
          PATIENT_Gender: new FormControl(res[0].PATIENT_Gender),
          Sample_Date: new FormControl(new Date()),
          PatientCollectioncenterID: new FormControl(''),
          PATIENT_DOB: new FormControl(this.DatePipe.transform(res[0].PATIENT_DOB, 'yyyy-MM-dd', this.locale)),
          Patient_DocType: new FormControl('Soft Copy'),
          LabNo: new FormControl(this.NLabNo),
          TPAName:new FormControl(''),
          HospitalizeRemark:new FormControl(res[0].HospitalizeRemark),
          Email1:new FormControl(res[0].Email1),
          Email2:new FormControl(res[0].Email2),
          Mobile1:new FormControl(res[0].Mobile1),
          Mobile2:new FormControl(res[0].Mobile2),
          City:new FormControl(res[0].City),
          Area:new FormControl(res[0].Area),
          State:new FormControl(res[0].State),
          Pincode:new FormControl(res[0].Pincode),
          TelephoneNo:new FormControl(res[0].TelephoneNo),
          DropPaymentMode:new FormControl(res[0].Paymode),
          DropTPAList:new FormControl(res[0].TPAId),
          ProposalNumber:new FormControl(res[0].ProposalNumber),
          txtPaymentMode:new FormControl('')
          
        });
        this.PatientYear = new FormControl(0);
        let i: number = 0;
        let yy = '';
        let month = '';
        let dd = '';
        let j;
        let k;
        console.log(res[0].PATIENT_DOB);
        let t=res[0].PATIENT_DOB
        if(res[0].PATIENT_DOB!="" && t!=null)
        {
          
          this.onDOBChanged(moment(this.Patient.controls['PATIENT_DOB'].value).toDate());

        }
       else{
        
        let date = res[0].PATIENT_Age.length;
        for (i; i < res[0].PATIENT_Age.length; i++) {
          j = i;
          if (res[0].PATIENT_Age[i] == ';') {
            break
          } else {
            yy += res[0].PATIENT_Age[i];
          }
        }
        j = j + 1;
        for (j; j < res[0].PATIENT_Age.length; j++) {
          k = j;
          if (res[0].PATIENT_Age[j] == ';') {
            break
          } else {
            month += res[0].PATIENT_Age[j];
          }
        }
        k = k + 1;
        for (k; k < res[0].PATIENT_Age.length; k++) {
          if (res[0].PATIENT_Age[k] == ';') {
            break
          } else {
            dd += res[0].PATIENT_Age[k]
          }
        }
        this.PatientYear = new FormControl(yy);
        this.PatientMonth = new FormControl(month);
        this.PatientDay = new FormControl(dd);
       }
       this.getPaymetMode();
        this.changeDetection.detectChanges();
        this._SoloAdminMasterComponent.setLoading(false);
        return;
      },
      err => {
        console.log(err);
        this._SoloAdminMasterComponent.setLoading(false);
      }
    );
  }


 
  getPatientData() {
    this._SoloAdminMasterComponent.setLoading(true);
    this._PatientService.GetPatientDetail(this.Patient_Id).subscribe(
      (res: any) => {
        this.setTestDetail(res);
        console.log(res);
        this.TotalAmount = res[0].TotalAmount != null ? res[0].TotalAmount : 0;
        this.SelectedGender = res[0].PATIENT_Gender;
        this.AmountPaidInCash = res[0].PATIENT_AmountPaid != null ? res[0].PATIENT_AmountPaid : 0;
        this.EmergencyChargesAmount = res[0].EmergencyCharges != null ? res[0].EmergencyCharges : 0;
        this.ConcessionAmount = res[0].Discount != null ? res[0].Discount : 0;
        this.ConcessionPercentage = res[0].DiscountPercent != null ? res[0].DiscountPercent : 0;
        this.EmergencyChargesPercentage = res[0].EmergencyChargesPecent != null ? res[0].EmergencyChargesPecent : 0;
        this.PatientCollectioncenterID = new FormControl(res[0].CollectionCenterId);
        
        this.getTestListByCollectionCenter();
        this.CollectionCenter = new FormControl(res[0].CENTER_Name, [Validators.required]);
        this.Doc1 = new FormControl(res[0].PATIENT_DoctorName);
        this.Doc2 = new FormControl(res[0].DoctorName2);
        this.Doc1Id= res[0].DOCHDR_lDoctorId;
        this.Doc2Id =res[0].Doctorid2;
        let temp = this.DatePipe.transform(res[0].PATIENT_Date, 'full', this.locale);
        this.PATIENT_Date = moment(res[0].PATIENT_Date).toDate();
        this.Sample_Date = moment(res[0].Sample_Date).toDate();
        this.PATIENT_Telno = new FormControl(res[0].PATIENT_Telno);
        this.FileName=res[0].FileName;
        this.FileUpload=res[0].FileUpload;
        this.Patient = new FormGroup({
          PATIENT_Name: new FormControl(res[0].PATIENT_Name, [Validators.required]),
          Remarks: new FormControl(res[0].Remarks),
          Urgent: new FormControl(res[0].Urgent),
          PATIENT_Address1: new FormControl(res[0].PATIENT_Address1),
          PATIENT_Address2: new FormControl(res[0].PATIENT_Address2),
          blnCommission: new FormControl(res[0].blnCommission),
          SendSMS:new FormControl(res.SendSMS),
          PatientDocType: new FormControl(res[0].PatientDocType),
          CreditCardAmount: new FormControl(res[0].CreditCardAmount != null ? res[0].CreditCardAmount : ''),
          NEFT_RTGSAmount: new FormControl(res[0].NEFT_RTGSAmount != null ? res[0].NEFT_RTGSAmount : ''),
          HOSPTYPE: new FormControl(res[0].HOSPTYPE),
          OtherRemarks: new FormControl(res[0].OtherRemarks),
          ChequeAmount: new FormControl(res[0].ChequeAmount != null ? res[0].ChequeAmount : ''),
          PATIENT_Country: new FormControl(res[0].PATIENT_Country),
          WardNo: new FormControl(res[0].WardNo),
          PATIENT_VisitTime: new FormControl(res[0].PATIENT_VisitTime),
          PATIENT_Email: new FormControl(res[0].PATIENT_Email,	[ Validators.email]),
          UPI_WalletAmount: new FormControl(res[0].UPI_WalletAmount != null ? res[0].UPI_WalletAmount : ''),
          PATIENT_Gender: new FormControl(res[0].PATIENT_Gender),
          Sample_Date: new FormControl(),
          PatientCollectioncenterID: new FormControl(res[0].CollectionCenterId),
          
          PATIENT_DOB: new FormControl(this.DatePipe.transform(res[0].PATIENT_DOB, 'yyyy-MM-dd', this.locale)),
          Patient_DocType: new FormControl(res[0].Patient_DocType),
          LabNo: new FormControl(res[0].labno != null ? res[0].labno : 0),
          DropPaymentMode:new FormControl(),
          DropTPAList:new FormControl(),
          HospitalizeRemark:new FormControl(res[0].HospitalizeRemark),
          Email1:new FormControl(res[0].Email1),
          Email2:new FormControl(res[0].Email2),
          Mobile1:new FormControl(res[0].Mobile1),
          Mobile2:new FormControl(res[0].Mobile2),
          City:new FormControl(res[0].City),
          Area:new FormControl(res[0].Area),
          State:new FormControl(res[0].State),
          Pincode:new FormControl(res[0].Pincode),
          TelephoneNo:new FormControl(res[0].TelephoneNo),
          ProposalNumber:new FormControl(res[0].ProposalNumber),
          txtPaymentMode:new FormControl('')
        });
       
        
        this.Patient.controls["DropPaymentMode"].setValue(parseInt(res[0].Paymode));
        
        
        this.Patient.controls["DropTPAList"].setValue(parseInt(res[0].TPAId));
        this.PatientYear = new FormControl(0);
        let i: number = 0;
        let yy = '';
        let month = '';
        let dd = '';
        let j;
        let k;

        let date = res[0].PATIENT_Age.length;
        for (i; i < res[0].PATIENT_Age.length; i++) {
          j = i;
          if (res[0].PATIENT_Age[i] == ';') {
            break
          } else {
            yy += res[0].PATIENT_Age[i];
          }
        }
        j = j + 1;
        for (j; j < res[0].PATIENT_Age.length; j++) {
          k = j;
          if (res[0].PATIENT_Age[j] == ';') {
            break
          } else {
            month += res[0].PATIENT_Age[j];
          }
        }
        k = k + 1;
        for (k; k < res[0].PATIENT_Age.length; k++) {
          if (res[0].PATIENT_Age[k] == ';') {
            break
          } else {
            dd += res[0].PATIENT_Age[k]
          }
        }
        this.PatientYear = new FormControl(yy);
        this.PatientMonth = new FormControl(month);
        this.PatientDay = new FormControl(dd);

        this.BillAmount = 0;
        if (this.TotalAmount.toString() != '' && this.TotalAmount.toString() != null) {
          this.BillAmount += parseFloat(this.TotalAmount.toString())
        }

        if (this.EmergencyChargesAmount.toString() != '' && this.EmergencyChargesAmount.toString() != null) {
          this.BillAmount += parseFloat(this.EmergencyChargesAmount.toString())
        }

        if (this.ConcessionAmount.toString() != '' && this.ConcessionAmount.toString() != null) {
          this.BillAmount -= parseFloat(this.ConcessionAmount.toString())
        }
        

        if (this.AmountPaidInCash.toString() != '' && this.AmountPaidInCash.toString() != null) {
          this.TotalAmountPaid -= parseFloat(this.AmountPaidInCash.toString())
        }
        this.BalanceAmount=this.BillAmount-this.AmountPaidInCash;
        this.getTotalAmountPaid();
        
        if (res[0].CENTER_Name != '' && res[0].CENTER_Name != null) {
          this._filterCollectionCenterList(res[0].CENTER_Name);
        }
        this._SoloAdminMasterComponent.setLoading(false);
        return;
      },
      err => {
        console.log(err);
        this._SoloAdminMasterComponent.setLoading(false);
      }
    );
  }
getPaymetMode(){
  
this._paymentmodes.GetAllPaymentMode(1).subscribe((res: any) => {
      
      this.paymetModeList=res;
      this.Patient.controls["DropPaymentMode"].setValue(res[0].Id);
      
    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
        return null;
      });
}


getTPALIST(){
  
  this._paymentmodes.GetAllTPALIST().subscribe((res: any) => {
        this.TPAList=res;
      
      },
        err => {
          this._SoloAdminMasterComponent.setLoading(false);
          this.changeDetection.detectChanges();
          console.log(err);
          return null;
        });
  }


  setTestDetail(testlist) {

    for (let i: number = 0; i < testlist.length; i++) {
      this.getSetTestListCheckBox(testlist[i].Type, testlist[i].TestId)
      let List = {
        BaseRate: testlist[i].BaseRate,
        CENTER_Name: testlist[i].CENTER_Name,
        CENTER_id: testlist[i].CENTER_id,
        Discount: testlist[i].Discount,
        Discount1: testlist[i].Discount1,
        LumSumAmt: testlist[i].LumSumAmt,
        RateListHID: testlist[i].RateListHID,
        Referal_Fee: testlist[i].Referal_Fee,
        SpecialTest: true,
        TESTMST_Name: testlist[i].TESTMST_Name,
        TestId: testlist[i].TestId,
        TestRate: testlist[i].TestRate,
        Type: testlist[i].Type,
      };
      this.InsertedTestList.push(List);
    }
    this.enableCollectionCenter();
  }

  getSetTestListCheckBox(Type, ID) {

    if (Type == 'X') {
      for (let i: number = 0; i < this.TestX_Ray; i++) {
        if (this.TestX_Ray[i].TestId == ID) {
          this.ModifyTestList(this.TestX_Ray[i]);
          this.TestX_Ray[i].SpecialTest = true;
        }
      }
    } else if (Type == 'P') {
      for (let i: number = 0; i < this.TestPythology; i++) {
        if (this.TestPythology[i].TestId == ID) {
          this.ModifyTestList(this.TestPythology[i]);
          this.TestPythology[i].SpecialTest = true;
        }
      }
    } else if (Type == 'R') {
      for (let i: number = 0; i < this.TestProfiles; i++) {
        if (this.TestProfiles[i].TestId == ID) {
          this.ModifyTestList(this.TestProfiles[i]);
          this.TestProfiles[i].SpecialTest = true;
        }
      }
    } else if (Type == 'H') {
      for (let i: number = 0; i < this.TestHisto; i++) {
        if (this.TestHisto[i].TestId == ID) {
          this.ModifyTestList(this.TestHisto[i]);
          this.TestHisto[i].SpecialTest = true;
        }
      }
    } else if (Type == 'S') {
      for (let i: number = 0; i < this.TestSono; i++) {
        if (this.TestSono[i].TestId == ID) {
          this.ModifyTestList(this.TestSono[i]);
          this.TestSono[i].SpecialTest = true;
        }
      }
    }


  }

public uploadFile = (files) => {
  if (files.length === 0) {
    return;
  }
  this.fileToUpload = <File>files[0];

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
      this.onGetCollectionCenterList(res);
      this.changeDetection.detectChanges();
    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
      })
  }


  getAllTest() {
    // this._SoloAdminMasterComponent.setLoading(true);
    this._EmployeeService.GetTestMasterByCollectionCenterID(this.PatientCollectioncenterID.value, 'All', 'NoSearch').subscribe((res: any) => {
      if (res.length > 0) {
        this.onGetAllTestList(res);
      }
      this._SoloAdminMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();

    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
      })

  }
  getPatientByMobileNo(NO) {
    // this._SoloAdminMasterComponent.setLoading(true);
    
    if(NO.length >=10){
     
    this._PatientService.GetPatientByMobileNo(NO).subscribe((res: any) => {
      this._SoloAdminMasterComponent.setLoading(false);
  
      if (res != null) {
        if (res.length === 1) {
       this.SelectedPatient(res[0].Patient_Id)
    
          this.PATIENT_Name_Select_Enable2 = true;
     
         } 
         else if(res.length > 1)
         {
          this.ListOfPatientToSelect = res;
          this.PATIENT_Name_Enable = false;
          this.PATIENT_Name_Select_Enable = true;
          this.PATIENT_Name_Select_Enable2=true
         } 
         else {
          this.ListOfPatientToSelect = res;
          this.PATIENT_Name_Enable = true;
          this.PATIENT_Name_Select_Enable = false;
          this.PATIENT_Name_Select_Enable2=false;
        }

      }else{
        this.PATIENT_Name_Enable =  true;
        this.PATIENT_Name_Select_Enable = false;
        this.ListOfPatientToSelect = [];

      }
      this.changeDetection.detectChanges();
    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        console.log(err);
        this.changeDetection.detectChanges();
      })
    }else
    {

    }
    this.getPaymetMode();
  }

  MobileNo(Self:boolean) {

    this._PatientService.GetPatientMobileNos(this.PATIENT_Telno.value).subscribe((res: any) => {
      this._SoloAdminMasterComponent.setLoading(false);
      if(Self){
        this.onGetMobileNoList(res);
      }
      if (res.length == 1) {
        this.getPatientByMobileNo(this.PATIENT_Telno.value);
      } else {

        this.ListOfPatientToSelect = [];
        this.PATIENT_Name_Enable = true;
        this.PATIENT_Name_Select_Enable = false;
      }
      this.changeDetection.detectChanges();
    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
      });
    // }
  }

  getTestListByCollectionCenter() {
    if (this.PatientCollectioncenterID.value != null)
    this.getTestListAllNew('X');
this.getTestListAllNew('P');
this.getTestListAllNew('R');
this.getTestListAllNew('H');
this.getTestListAllNew('S');
this.getTestListAllNew('C');
this.getTestListAllNew('T');
this.getTestListAllNew('U');
this.getTestListAllNew('D');
this.getTestListAllNew('V');

  }

  enableCollectionCenter() {
    this.TestX_Ray = [];
    this.TestPythology = [];
    this.TestProfiles = [];
    this.TestSono = [];
    this.TestHisto = [];
    this.TestCardio=[];
    this.TestPolyClinic=[];
    this.TestColourDopler=[];
    this.TestDental=[];
    this.TestProcedure=[];
    this.getTestListByCollectionCenter();


  }

  CollectionCenterChanegd() {
   
    if (this.CollectionCenter.value != null && this.CollectionCenter.value != '') {
      this._SoloAdminMasterComponent.setLoading(true);
    let model ={
      PageNo:-1,
      PageSize:10,
      Keyword: this.CollectionCenter.value,
    }
      this._CollectionCenterService.GetAllCollectionCenterDetails(model).subscribe((res: any) => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.CollectionCenterCount = res.length;
        if (res.length != 0) {
          if (res.length > 1) {
            this.CollectionCenterRowModified = false;
            for (let i: number = 0; i < res.length; i++) {
              if (this.CollectionCenter.value == res[i].CENTER_Name) {
                this.PatientCollectioncenterID = new FormControl(res[i].CENTER_id, [Validators.required]);
                this.Patient.controls['PatientCollectioncenterID'].setValue(res[i].CENTER_id);
                this.CollectionCenterRowModified = true;
                this.enableCollectionCenter();
                return;
              }
            }
            if (this.CollectionCenterRowModified == false) {
              this.PatientCollectioncenterID = new FormControl(null, [Validators.required]);
              this.Patient.controls['PatientCollectioncenterID'].setValue(null);
              // this.CollectionCenter.enable;
              this.TestX_Ray = [];
              this.TestPythology = [];
              this.TestProfiles = [];
              this.TestSono = [];
              this.TestHisto = [];
              this.TestCardio=[];
              this.TestPolyClinic=[];
              this.TestColourDopler=[];
              this.TestDental=[];
              this.TestProcedure=[];
            }
          } else {
            if (this.CollectionCenter.value == res[0].CENTER_Name) {
              this.PatientCollectioncenterID = new FormControl(res[0].CENTER_id, [Validators.required]);
              this.Patient.controls['PatientCollectioncenterID'].setValue(res[0].CENTER_id);
              this.TestX_Ray = [];
              this.TestPythology = [];
              this.TestProfiles = [];
              this.TestSono = [];
              this.TestHisto = [];
              this.TestCardio=[];
              this.TestPolyClinic=[];
              this.TestColourDopler=[];
              this.TestDental=[];
              this.TestProcedure=[];
              this.enableCollectionCenter();
              return;

            } else {
              this.PatientCollectioncenterID = new FormControl(null, [Validators.required]);
              this.Patient.controls['PatientCollectioncenterID'].setValue(null);
              this.TestX_Ray = [];
              this.TestPythology = [];
              this.TestProfiles = [];
              this.TestSono = [];
              this.TestHisto = [];
              this.TestCardio=[];
              this.TestPolyClinic=[];
              this.TestColourDopler=[];
              this.TestDental=[];
              this.TestProcedure=[];
              return;
            }
          }
        } else {

          this.PatientCollectioncenterID = new FormControl(null, [Validators.required]);
          this.Patient.controls['PatientCollectioncenterID'].setValue(null);
        }

        this.changeDetection.detectChanges();
      },
        err => {
          this._SoloAdminMasterComponent.setLoading(false);
          this.changeDetection.detectChanges();
          console.log(err);
        })
    } else {
      this.SelectedAllTest(0)
      // this.CollectionCenter.enable();
    }
  }
  CollectionCenterChanegdSearch() {
   

    debugger;
    let model ={
      PageNo:-1,
      PageSize:10,
      Keyword: this.CollectionCenter.value,
    }
      this._CollectionCenterService.GetAllCollectionCenterDetails(model).subscribe((res: any) => {
      
        this.CollectionCenterCount = res.length;
        if (res.length != 0) {
          if (res.length > 1) {
            this.CollectionCenterRowModified = false;
            for (let i: number = 0; i < res.length; i++) {
              if (this.CollectionCenter.value == res[i].CENTER_Name) {
                this.PatientCollectioncenterID = new FormControl(res[i].CENTER_id, [Validators.required]);
                this.Patient.controls['PatientCollectioncenterID'].setValue(res[i].CENTER_id);
                this.CollectionCenterRowModified = true;
                this.enableCollectionCenter();
                return;
              }
            }
            if (this.CollectionCenterRowModified == false) {
              this.PatientCollectioncenterID = new FormControl(null, [Validators.required]);
              this.Patient.controls['PatientCollectioncenterID'].setValue(null);
              // this.CollectionCenter.enable;
              this.TestX_Ray = [];
              this.TestPythology = [];
              this.TestProfiles = [];
              this.TestSono = [];
              this.TestHisto = [];
            }
          } else {
            if (this.CollectionCenter.value == res[0].CENTER_Name) {
              this.PatientCollectioncenterID = new FormControl(res[0].CENTER_id, [Validators.required]);
              this.Patient.controls['PatientCollectioncenterID'].setValue(res[0].CENTER_id);
              this.TestX_Ray = [];
              this.TestPythology = [];
              this.TestProfiles = [];
              this.TestSono = [];
              this.TestHisto = [];
              this.TestCardio=[];
              this.TestPolyClinic=[];
              this.TestColourDopler=[];
              this.TestDental=[];
              this.TestProcedure=[];
              this.enableCollectionCenter();
              return;

            } else {
              this.PatientCollectioncenterID = new FormControl(null, [Validators.required]);
              this.Patient.controls['PatientCollectioncenterID'].setValue(null);
              this.TestX_Ray = [];
              this.TestPythology = [];
              this.TestProfiles = [];
              this.TestSono = [];
              this.TestHisto = [];
              this.TestCardio=[];
              this.TestPolyClinic=[];
              this.TestColourDopler=[];
              this.TestDental=[];
              this.TestProcedure=[];
              return;
            }
          }
        } else {

          this.PatientCollectioncenterID = new FormControl(null, [Validators.required]);
          this.Patient.controls['PatientCollectioncenterID'].setValue(null);
        }

        this.changeDetection.detectChanges();
      },
        err => {
          this._SoloAdminMasterComponent.setLoading(false);
          this.changeDetection.detectChanges();
          console.log(err);
        })
   
  }
  
  getTestList(Type: string) {
    this.changeDetection.detectChanges();
    let Search: string = null;
    if (Type == 'X') {
      Search = this.SearchListX_Ray.value;
    } else if (Type == 'P') {
      Search = this.SearchListPythology.value;
    } else if (Type == 'R') {
      Search = this.SearchListProfiles.value;
    } else if (Type == 'H') {
      Search = this.SearchListHisto.value;
    } else if (Type == 'S') {
      Search = this.SearchListSono.value;
    }
    else if (Type == 'C') {
      Search = this.SearchListCardio.value;
    }
    else if (Type == 'T') {
      Search = this.SearchListDopler.value;
    }
    else if (Type == 'U') {
      Search = this.SearchListPolyClinic.value;
    }
    else if (Type == 'D') {
      Search = this.SearchListDetal.value;
    }
    else if (Type == 'V') {
      Search = this.SearchListProcedure.value;
    }

    if (this.PatientCollectioncenterID.value != null) {
      // this._SoloAdminMasterComponent.setLoading(true);

      this.getAllTest();
      this._EmployeeService.GetTestMasterByCollectionCenterID(this.PatientCollectioncenterID.value, Type, Search).subscribe((res: any) => {
        if (Type == 'X') {
          this.TestX_Ray = res;
          if (this.TestX_Ray.length == 0 && this.SearchListX_Ray.value != null && this.SearchListX_Ray.value != '') {
            this.SearchListX_Ray = new FormControl(this.SearchListX_Ray.value);//.slice(0, -1)
            this.getTestList(Type);
          }

        } else if (Type == 'P') {
          this.TestPythology = res;
          if (this.TestPythology.length == 0 && this.SearchListPythology.value != null && this.SearchListPythology.value != '') {
            this.SearchListPythology = new FormControl(this.SearchListPythology.value);//.slice(0, -1)
            this.getTestList(Type);
          }
        } else if (Type == 'R') {
          this.TestProfiles = res;
          if (this.TestProfiles.length == 0 && this.SearchListProfiles.value != null && this.SearchListProfiles.value != '') {
            this.SearchListProfiles = new FormControl(this.SearchListProfiles.value);//.slice(0, -1)
            this.getTestList(Type);
          }
        } else if (Type == 'H') {
          this.TestHisto = res;
          if (this.TestHisto.length == 0 && this.SearchListHisto.value != null && this.SearchListHisto.value != '') {
            this.SearchListHisto = new FormControl(this.SearchListHisto.value);//.slice(0, -1)
            this.getTestList(Type);
          }
        } else if (Type == 'S') {
          this.TestSono = res;
          if (this.TestSono.length == 0 && this.SearchListSono.value != null && this.SearchListSono.value != '') {
            this.SearchListSono = new FormControl(this.SearchListSono.value);//.slice(0, -1)
            this.getTestList(Type);
          }
        }
        else if (Type == 'C') {
          this.TestCardio = res;
          if (this.TestCardio.length == 0 && this.SearchListCardio.value != null && this.SearchListCardio.value != '') {
            this.SearchListCardio = new FormControl(this.SearchListCardio.value);//.slice(0, -1)
            this.getTestList(Type);
          }
          
        }
        else if (Type == 'T') {
          this.TestColourDopler = res;
          if (this.TestColourDopler.length == 0 && this.SearchListDopler.value != null && this.SearchListDopler.value != '') {
            this.SearchListDopler = new FormControl(this.SearchListDopler.value);//.slice(0, -1)
            this.getTestList(Type);
          }
          
        }
        else if (Type == 'U') {
          this.TestPolyClinic = res;
          if (this.TestPolyClinic.length == 0 && this.SearchListPolyClinic.value != null && this.SearchListPolyClinic.value != '') {
            this.SearchListPolyClinic = new FormControl(this.SearchListPolyClinic.value);//.slice(0, -1)
            this.getTestList(Type);
          }
        }
        else if (Type == 'D') {
          this.TestDental = res;
          if (this.TestDental.length == 0 && this.SearchListDetal.value != null && this.SearchListDetal.value != '') {
            this.SearchListDetal = new FormControl(this.SearchListDetal.value);//.slice(0, -1)
            this.getTestList(Type);
          }
        }
        else if (Type == 'V') {
          this.TestProcedure = res;
          if (this.TestProcedure.length == 0 && this.SearchListProcedure.value != null && this.SearchListProcedure.value != '') {
            this.SearchListProcedure = new FormControl(this.SearchListProcedure.value);//.slice(0, -1)
            this.getTestList(Type);
          }
        }
        if (this.InsertedTestList.length != 0) {
          this.setInsertedData(Type);

        }
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();

      },
        err => {
          this._SoloAdminMasterComponent.setLoading(false);
          this.changeDetection.detectChanges();
          console.log(err);
        })
    }
  }

  onGetCollectionCenterList(data) {
    this.changeDetection.detectChanges();
    this.CollectionCenteroptions = data;
    this.CollectionCenterList = this.CollectionCenter.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCollectionCenterList(value))
      );
    this._SoloAdminMasterComponent.setLoading(false);
  }

  private _filterCollectionCenterList(value: string) {
    const filterValue = value.toLowerCase();
    this.CollectionCenterChanegd();
    return this.CollectionCenteroptions.filter(CollectionCenteroptions => CollectionCenteroptions.CENTER_Name.toLowerCase().includes(filterValue)).slice(0, 10);
  }


  onGetMobileNoList(data) {
    this.changeDetection.detectChanges();
    this.MobileNooptions = data;
    
    this.MobileNoList = this.PATIENT_Telno.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterMobileNoList(value))
      );
    this._SoloAdminMasterComponent.setLoading(false);
  }

  private _filterMobileNoList(value: string) {
    const filterValue = value.toLowerCase();
    return this.MobileNooptions.filter(MobileNooptions => MobileNooptions.PATIENT_Telno.toLowerCase().includes(filterValue)).slice(0, 10);
  }

  onGetAllTestList(data) {
    this.changeDetection.detectChanges();
    this.AllTestoptions = data;
    this.AllTestList = this.AllTestSearch.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterAllTestList(value))
      );
    this._SoloAdminMasterComponent.setLoading(false);
  }

  private _filterAllTestList(value: string) { 
    const filterValue = value.toLowerCase();
    return this.AllTestoptions.filter(AllTestoptions => AllTestoptions.TESTMST_Name.toLowerCase().includes(filterValue)).slice(0, 10);
  }
  getDoctor() {
    this._SoloAdminMasterComponent.setLoading(true);
    let model ={
      PageNo:-1,
      PageSize:10,
      Keyword:this.Doc1.value,
    }
    this._DoctorService.GetAllDoctorDetails(model).subscribe((res: any) => {
      this.onGetDoctorList(res);
    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
        return null;
      });
  }

  onGetDoctorList(data) {
    this.options = data;
    this.filteredOptions = this.Doc1.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.options2 = data;
    this.filteredOptions2 = this.Doc2.valueChanges
      .pipe(
        startWith(''),
        map(value2 => this._filter2(value2))
      );
    this._SoloAdminMasterComponent.setLoading(false);
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase(); 
    this.getDoctorID('Doc1'); 

    let temparray=this.options.filter(option => option.DOCTOR_Name.toLowerCase().includes(filterValue)).slice(0, 10);
    if(temparray.length==1){
      if( this.PatientCollectioncenterID.value==0 || this.PatientCollectioncenterID.value==null ||  this.CollectionCenter.value=="" ){
        this.PatientCollectioncenterID = new FormControl( temparray[0].Collection_Center);
        this.CollectionCenter = new FormControl(temparray[0].CENTER_Name, [Validators.required]);
        PatientCollectioncenterID: new FormControl(temparray[0].Collection_Center),
        this.Patient.controls['PatientCollectioncenterID'].setValue(temparray[0].Collection_Center);
        this.getTestListByCollectionCenter();
      }
        
    }
    return this.options.filter(option => option.DOCTOR_Name.toLowerCase().includes(filterValue)).slice(0, 10);
  }

  private _filter2(value: string) {
    const filterValue2 = value.toLowerCase();
     this.getDoctorID('Doc2'); 
    return this.options2.filter(option2 => option2.DOCTOR_Name.toLowerCase().includes(filterValue2)).slice(0, 10);
  }

  getDoctorID(NO) {
    let Search;  
    try{
      if (NO == 'Doc1') {
        this.filteredOptions 
        Search = this.Doc1.value 
        this.Doc1Id=  this.options.find(x=>x.DOCTOR_Name == Search) ; 
       
      } else if (NO == 'Doc2') {
        Search = this.Doc2.value 
       this.Doc2Id=  this.options2.find(x=>x.DOCTOR_Name == Search); 
        
      }

    }catch(error ){

    }

  }


  openModal() {
    this.modalService.open('custom-modal-1');
  }

  openTPAmodel(){
    this.modalService.open('TPAModel');
  }
 
  saveModal() {
    this.modalService.close('custom-modal-1');
  }
  closeModal() {
    this.modalService.close('custom-modal-1');
  }

  

  onCheckBoxChange(List, event) {
    this._SoloAdminMasterComponent.setLoading(true);
    List.SpecialTest = event;
    this.CollectionCenterRowModified = false;
    if (List.SpecialTest == true) {
      if (this.InsertedTestList.length == 0) {
        this.InsertedTestList.push(List);
        this.getTotalAmount();
      } else {
        for (let i: number = 0; i < this.InsertedTestList.length; i++) {
          if (this.InsertedTestList[i].TestId == List.TestId) {
            this.CollectionCenterRowModified = true;
            this.ModifyTestList(List);

          }
        }
        if (this.CollectionCenterRowModified == false) {
          this.InsertedTestList.push(List);
          this.getTotalAmount();
        }
      }
    } else {
      for (let i: number = 0; i < this.InsertedTestList.length; i++) {
        if (this.InsertedTestList[i].TestId == List.TestId) {
          if (this.Patient_Id != null && this.Patient_Id != 0) {
            this.InsertedTestList = this.InsertedTestList.filter(item => item !== this.InsertedTestList[i]);
            this.InsertedTestList.push(List);
            this.onModifyDelete(List);
          } else {
            this.ModifyTestList(List);
          }
        }
      } 
      this.InsertedTestList = this.InsertedTestList.filter(item => item !== List); 
      this.getTotalAmount();
    }
    this.getTotalAmountPaid();
    this._SoloAdminMasterComponent.setLoading(false);
  }

  onModifyDelete(List) {

    if (List.Type == 'X') {
      for (let i: number = 0; i < this.TestX_Ray.length; i++) {
        if (this.TestX_Ray[i].TestId == List.TestId) {
          this.TestX_Ray[i].SpecialTest = false;
        }
      }

    } else if (List.Type == 'P') {
      for (let i: number = 0; i < this.TestPythology.length; i++) {
        if (this.TestPythology[i].TestId == List.TestId) {
          this.TestPythology[i].SpecialTest = false;
        }
      }

    } else if (List.Type == 'R') {
      for (let i: number = 0; i < this.TestProfiles.length; i++) {
        if (this.TestProfiles[i].TestId == List.TestId) {
          this.TestProfiles[i].SpecialTest = false;
        }
      }

    } else if (List.Type == 'H') {
      for (let i: number = 0; i < this.TestHisto.length; i++) {
        if (this.TestHisto[i].TestId == List.TestId) {
          this.TestHisto[i].SpecialTest = false;
        }
      }
    } else if (List.Type == 'S') {
      for (let i: number = 0; i < this.TestSono.length; i++) {
        if (this.TestSono[i].TestId == List.TestId) {
          this.TestSono[i].SpecialTest = false;
        }
      }
    }
    else if (List.Type == 'C') {
      for (let i: number = 0; i < this.TestCardio.length; i++) {
        if (this.TestCardio[i].TestId == List.TestId) {
          this.TestCardio[i].SpecialTest = false;
        }
      }
    }
    else if (List.Type == 'T') {
      for (let i: number = 0; i < this.TestColourDopler.length; i++) {
        if (this.TestColourDopler[i].TestId == List.TestId) {
          this.TestColourDopler[i].SpecialTest = false;
        }
      }
    }
    else if (List.Type == 'U') {
      for (let i: number = 0; i < this.TestPolyClinic.length; i++) {
        if (this.TestPolyClinic[i].TestId == List.TestId) {
          this.TestPolyClinic[i].SpecialTest = false;
        }
      }
    }
    else if (List.Type == 'D') {
      for (let i: number = 0; i < this.TestDental.length; i++) {
        if (this.TestDental[i].TestId == List.TestId) {
          this.TestDental[i].SpecialTest = false;
        }
      }
    }
    else if (List.Type == 'V') {
      for (let i: number = 0; i < this.TestProcedure.length; i++) {
        if (this.TestProcedure[i].TestId == List.TestId) {
          this.TestProcedure[i].SpecialTest = false;
        }
      }
    }
  }

  ModifyTestList(List) {
    for (let i: number = 0; i < this.InsertedTestList.length; i++) {
      if (this.InsertedTestList[i].TestId == List.TestId) {
        this.InsertedTestList[i].SpecialTest = List.SpecialTest;
        this.InsertedTestList[i].BaseRate = List.BaseRate;
        this.InsertedTestList[i].Discount = List.Discount;
        this.InsertedTestList[i].TestRate = List.TestRate;
        this.TotalAmount += this.InsertedTestList[i].TestRate
      } else {
        if (this.InsertedTestList[i].SpecialTest == true) {
          this.TotalAmount += this.InsertedTestList[i].TestRate
        }
      }
    }

    this.getTotalAmount();
  }

  getTotalAmount() {
    this.TotalAmount = 0;
    for (let i: number = 0; i < this.InsertedTestList.length; i++) {
      if (this.InsertedTestList[i].SpecialTest == true) {
        this.TotalAmount += this.InsertedTestList[i].TestRate

      }
    }
    this.BillAmount = parseFloat(this.TotalAmount.toString()) + parseFloat(this.EmergencyChargesAmount.toString()) - parseFloat(this.ConcessionAmount.toString());
  }

  onAmountTextBoxChange(Name, $event, Type) {

    let Value = 0;
    if (Type == "self") {
      Value = $event;
    } else {
      Value = $event.target.value;
      if (Value == null || Value.toString() == '') {
        Value = 0;
      }
      if (Value == null || Value.toString() == '') {
        if (Name == "EmergencyChargesPercentage") {
          this.EmergencyChargesPercentage = 0;
          this.EmergencyChargesAmount = 0;

        } else if (Name == "EmergencyChargesAmount") {
          this.EmergencyChargesAmount = 0;
          this.EmergencyChargesPercentage = 0;
        } else if (Name == "ConcessionPercentage") {
          this.ConcessionPercentage = 0;
          this.ConcessionAmount = 0;

        } else if (Name == "ConcessionAmount") {
          this.ConcessionAmount = 0;
          this.ConcessionPercentage = 0;
        }
        else if (Name == "AmountPaidInCash") {
          this.BalanceAmount=parseFloat(this.BillAmount.toString())-parseFloat(this.AmountPaidInCash.toString());
        }
        this.TotalAmountPaid = parseFloat(this.TotalAmount.toString()) + parseFloat(this.EmergencyChargesAmount.toString()) - parseFloat(this.ConcessionAmount.toString());
        return;
      }
    }
    let OldAmount = 0;

    if (Name == "AmountPaidInCash") {
      this.BalanceAmount=parseFloat(this.BillAmount.toString())-parseFloat(this.AmountPaidInCash.toString());
      this.AmountPaidInCash = parseFloat(Value.toString());
    }
    if (Name == "EmergencyChargesPercentage") {
      OldAmount = this.EmergencyChargesPercentage;
      this.EmergencyChargesPercentage = parseFloat(Value.toString());
      this.EmergencyChargesAmount = (parseFloat(this.TotalAmount.toString()) / 100) * parseFloat(this.EmergencyChargesPercentage.toString());
      this.EmergencyChargesAmount = parseFloat(this.EmergencyChargesAmount.toFixed(2));

    } else if (Name == "EmergencyChargesAmount") {
      OldAmount = this.EmergencyChargesAmount;
      this.EmergencyChargesAmount = parseFloat(Value.toString());
     // this.EmergencyChargesPercentage = (parseFloat(this.EmergencyChargesAmount.toString()) * 100) / parseFloat(this.TotalAmount.toString());
       
      this.EmergencyChargesPercentage = parseFloat(this.EmergencyChargesPercentage.toFixed(2))
    } else if (Name == "ConcessionPercentage") {
      OldAmount = this.ConcessionPercentage;
      this.ConcessionPercentage = Value;
      this.ConcessionAmount = (parseFloat(this.TotalAmount.toString()) / 100) * parseFloat(this.ConcessionPercentage.toString());
      this.ConcessionAmount = parseFloat(this.ConcessionAmount.toFixed(2));

      this.EmergencyChargesPercentage = parseFloat(this.EmergencyChargesPercentage.toString())
    } else if (Name == "ConcessionAmount") {
      OldAmount = this.ConcessionAmount;
      this.ConcessionAmount = Value;
      // this.ConcessionPercentage = (parseFloat(this.ConcessionAmount.toString()) * 100) / parseFloat(this.TotalAmount.toString());
      // this.ConcessionPercentage = parseFloat(this.ConcessionPercentage.toFixed(2))
    }
this.BillAmount=parseFloat(this.TotalAmount.toString()) + parseFloat(this.EmergencyChargesAmount.toString()) - parseFloat(this.ConcessionAmount.toString());
this.BalanceAmount=parseFloat(this.BillAmount.toString())-parseFloat(this.AmountPaidInCash.toString());
    
    this.getTotalAmountPaid();
    this.changeDetection.detectChanges();
  }

  onDOBChanged(value) {
    
    let currentDate = new Date();
    let timeDiff = Math.abs(Date.now() - value.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    let month;
    let day
    if (age == 0) {
      this.PatientYear = new FormControl(0);
      month = Math.floor((timeDiff / (1000 * 3600 * 24)) / 30.5);
      this.PatientMonth = new FormControl(month);
      day = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(value.getFullYear(), value.getMonth(), value.getDate())) / (1000 * 60 * 60 * 24));
      if (day > 30) {
        day = day - 30.5 * month;
        day = parseInt(day);
      }
      this.PatientDay = new FormControl(day);
    } else {
      this.PatientYear = new FormControl(age);
      this.PatientMonth = new FormControl(0);
      this.PatientDay = new FormControl(0);
    }
  }


  setInsertedData(Type) {
    if (Type == 'X') {
      for (let i: number = 0; i < this.InsertedTestList.length; i++) {
        for (let j: number = 0; j < this.TestX_Ray.length; j++) {
          if (this.InsertedTestList[i].TestId == this.TestX_Ray[j].TestId) {
            this.TestX_Ray[j].SpecialTest = this.InsertedTestList[i].SpecialTest;
            this.InsertedTestList[i].BaseRate = this.TestX_Ray[j].BaseRate;
            this.InsertedTestList[i].Discount = this.TestX_Ray[j].Discount;
            this.InsertedTestList[i].TestRate = this.TestX_Ray[j].TestRate;
            this.InsertedTestList[i].CENTER_Name = this.TestX_Ray[j].CENTER_Name;
            this.InsertedTestList[i].CENTER_id = this.TestX_Ray[j].CENTER_id;
            this.InsertedTestList[i].Discount1 = this.TestX_Ray[j].Discount1;
            this.InsertedTestList[i].LumSumAmt = this.TestX_Ray[j].LumSumAmt;
            this.InsertedTestList[i].RateListHID = this.TestX_Ray[j].RateListHID;
            this.InsertedTestList[i].Referal_Fee = this.TestX_Ray[j].Referal_Fee;
            this.InsertedTestList[i].Type = this.TestX_Ray[j].Type;
          }
        }
      }
    } else if (Type == 'P') {
      for (let i: number = 0; i < this.InsertedTestList.length; i++) {
        for (let j: number = 0; j < this.TestPythology.length; j++) {
          if (this.InsertedTestList[i].TestId == this.TestPythology[j].TestId) {
            this.TestPythology[j].SpecialTest = this.InsertedTestList[i].SpecialTest;
            this.InsertedTestList[i].BaseRate = this.TestPythology[j].BaseRate;
            this.InsertedTestList[i].Discount = this.TestPythology[j].Discount;
            this.InsertedTestList[i].TestRate = this.TestPythology[j].TestRate;
            this.InsertedTestList[i].CENTER_Name = this.TestPythology[j].CENTER_Name;
            this.InsertedTestList[i].CENTER_id = this.TestPythology[j].CENTER_id;
            this.InsertedTestList[i].Discount1 = this.TestPythology[j].Discount1;
            this.InsertedTestList[i].LumSumAmt = this.TestPythology[j].LumSumAmt;
            this.InsertedTestList[i].RateListHID = this.TestPythology[j].RateListHID;
            this.InsertedTestList[i].Referal_Fee = this.TestPythology[j].Referal_Fee;
            this.InsertedTestList[i].Type = this.TestPythology[j].Type;
          }
        }
      }
    } else if (Type == 'R') {
      for (let i: number = 0; i < this.InsertedTestList.length; i++) {
        for (let j: number = 0; j < this.TestProfiles.length; j++) {
          if (this.InsertedTestList[i].TestId == this.TestProfiles[j].TestId) {
            this.TestProfiles[j].SpecialTest = this.InsertedTestList[i].SpecialTest;
            this.InsertedTestList[i].BaseRate = this.TestProfiles[j].BaseRate;
            this.InsertedTestList[i].Discount = this.TestProfiles[j].Discount;
            this.InsertedTestList[i].TestRate = this.TestProfiles[j].TestRate;
            this.InsertedTestList[i].CENTER_Name = this.TestProfiles[j].CENTER_Name;
            this.InsertedTestList[i].CENTER_id = this.TestProfiles[j].CENTER_id;
            this.InsertedTestList[i].Discount1 = this.TestProfiles[j].Discount1;
            this.InsertedTestList[i].LumSumAmt = this.TestProfiles[j].LumSumAmt;
            this.InsertedTestList[i].RateListHID = this.TestProfiles[j].RateListHID;
            this.InsertedTestList[i].Referal_Fee = this.TestProfiles[j].Referal_Fee;
            this.InsertedTestList[i].Type = this.TestProfiles[j].Type;
          }
        }
      }
    } else if (Type == 'H') {
      for (let i: number = 0; i < this.InsertedTestList.length; i++) {
        for (let j: number = 0; j < this.TestHisto.length; j++) {
          if (this.InsertedTestList[i].TestId == this.TestHisto[j].TestId) {
            this.TestHisto[j].SpecialTest = this.InsertedTestList[i].SpecialTest;
            this.InsertedTestList[i].BaseRate = this.TestHisto[j].BaseRate;
            this.InsertedTestList[i].Discount = this.TestHisto[j].Discount;
            this.InsertedTestList[i].TestRate = this.TestHisto[j].TestRate;
            this.InsertedTestList[i].CENTER_Name = this.TestHisto[j].CENTER_Name;
            this.InsertedTestList[i].CENTER_id = this.TestHisto[j].CENTER_id;
            this.InsertedTestList[i].Discount1 = this.TestHisto[j].Discount1;
            this.InsertedTestList[i].LumSumAmt = this.TestHisto[j].LumSumAmt;
            this.InsertedTestList[i].RateListHID = this.TestHisto[j].RateListHID;
            this.InsertedTestList[i].Referal_Fee = this.TestHisto[j].Referal_Fee;
            this.InsertedTestList[i].Type = this.TestHisto[j].Type;
          }
        }
      }
    } else if (Type == 'S') {
      for (let i: number = 0; i < this.InsertedTestList.length; i++) {
        for (let j: number = 0; j < this.TestSono.length; j++) {
          if (this.InsertedTestList[i].TestId == this.TestSono[j].TestId) {
            this.TestSono[j].SpecialTest = this.InsertedTestList[i].SpecialTest;
            this.InsertedTestList[i].BaseRate = this.TestSono[j].BaseRate;
            this.InsertedTestList[i].Discount = this.TestSono[j].Discount;
            this.InsertedTestList[i].TestRate = this.TestSono[j].TestRate;
            this.InsertedTestList[i].CENTER_Name = this.TestSono[j].CENTER_Name;
            this.InsertedTestList[i].CENTER_id = this.TestSono[j].CENTER_id;
            this.InsertedTestList[i].Discount1 = this.TestSono[j].Discount1;
            this.InsertedTestList[i].LumSumAmt = this.TestSono[j].LumSumAmt;
            this.InsertedTestList[i].RateListHID = this.TestSono[j].RateListHID;
            this.InsertedTestList[i].Referal_Fee = this.TestSono[j].Referal_Fee;
            this.InsertedTestList[i].Type = this.TestSono[j].Type;
          }
        }
      }
    }
    else if (Type == 'C') {
      for (let i: number = 0; i < this.InsertedTestList.length; i++) {
        for (let j: number = 0; j < this.TestCardio.length; j++) {
          if (this.InsertedTestList[i].TestId == this.TestCardio[j].TestId) {
            this.TestCardio[j].SpecialTest = this.InsertedTestList[i].SpecialTest;
            this.InsertedTestList[i].BaseRate = this.TestCardio[j].BaseRate;
            this.InsertedTestList[i].Discount = this.TestCardio[j].Discount;
            this.InsertedTestList[i].TestRate = this.TestCardio[j].TestRate;
            this.InsertedTestList[i].CENTER_Name = this.TestCardio[j].CENTER_Name;
            this.InsertedTestList[i].CENTER_id = this.TestCardio[j].CENTER_id;
            this.InsertedTestList[i].Discount1 = this.TestCardio[j].Discount1;
            this.InsertedTestList[i].LumSumAmt = this.TestCardio[j].LumSumAmt;
            this.InsertedTestList[i].RateListHID = this.TestCardio[j].RateListHID;
            this.InsertedTestList[i].Referal_Fee = this.TestCardio[j].Referal_Fee;
            this.InsertedTestList[i].Type = this.TestCardio[j].Type;
          }
        }
      }
    }
    else if (Type == 'T') {
      for (let i: number = 0; i < this.InsertedTestList.length; i++) {
        for (let j: number = 0; j < this.TestColourDopler.length; j++) {
          if (this.InsertedTestList[i].TestId == this.TestColourDopler[j].TestId) {
            this.TestColourDopler[j].SpecialTest = this.InsertedTestList[i].SpecialTest;
            this.InsertedTestList[i].BaseRate = this.TestColourDopler[j].BaseRate;
            this.InsertedTestList[i].Discount = this.TestColourDopler[j].Discount;
            this.InsertedTestList[i].TestRate = this.TestColourDopler[j].TestRate;
            this.InsertedTestList[i].CENTER_Name = this.TestColourDopler[j].CENTER_Name;
            this.InsertedTestList[i].CENTER_id = this.TestColourDopler[j].CENTER_id;
            this.InsertedTestList[i].Discount1 = this.TestColourDopler[j].Discount1;
            this.InsertedTestList[i].LumSumAmt = this.TestColourDopler[j].LumSumAmt;
            this.InsertedTestList[i].RateListHID = this.TestColourDopler[j].RateListHID;
            this.InsertedTestList[i].Referal_Fee = this.TestColourDopler[j].Referal_Fee;
            this.InsertedTestList[i].Type = this.TestColourDopler[j].Type;
          }
        }
      }
    }
    else if (Type == 'U') {
      for (let i: number = 0; i < this.InsertedTestList.length; i++) {
        for (let j: number = 0; j < this.TestPolyClinic.length; j++) {
          if (this.InsertedTestList[i].TestId == this.TestPolyClinic[j].TestId) {
            this.TestPolyClinic[j].SpecialTest = this.InsertedTestList[i].SpecialTest;
            this.InsertedTestList[i].BaseRate = this.TestPolyClinic[j].BaseRate;
            this.InsertedTestList[i].Discount = this.TestPolyClinic[j].Discount;
            this.InsertedTestList[i].TestRate = this.TestPolyClinic[j].TestRate;
            this.InsertedTestList[i].CENTER_Name = this.TestPolyClinic[j].CENTER_Name;
            this.InsertedTestList[i].CENTER_id = this.TestPolyClinic[j].CENTER_id;
            this.InsertedTestList[i].Discount1 = this.TestPolyClinic[j].Discount1;
            this.InsertedTestList[i].LumSumAmt = this.TestPolyClinic[j].LumSumAmt;
            this.InsertedTestList[i].RateListHID = this.TestPolyClinic[j].RateListHID;
            this.InsertedTestList[i].Referal_Fee = this.TestPolyClinic[j].Referal_Fee;
            this.InsertedTestList[i].Type = this.TestPolyClinic[j].Type;
          }
        }
      }
    }
    else if (Type == 'D') {
      for (let i: number = 0; i < this.InsertedTestList.length; i++) {
        for (let j: number = 0; j < this.TestDental.length; j++) {
          if (this.InsertedTestList[i].TestId == this.TestDental[j].TestId) {
            this.TestDental[j].SpecialTest = this.InsertedTestList[i].SpecialTest;
            this.InsertedTestList[i].BaseRate = this.TestDental[j].BaseRate;
            this.InsertedTestList[i].Discount = this.TestDental[j].Discount;
            this.InsertedTestList[i].TestRate = this.TestDental[j].TestRate;
            this.InsertedTestList[i].CENTER_Name = this.TestDental[j].CENTER_Name;
            this.InsertedTestList[i].CENTER_id = this.TestDental[j].CENTER_id;
            this.InsertedTestList[i].Discount1 = this.TestDental[j].Discount1;
            this.InsertedTestList[i].LumSumAmt = this.TestDental[j].LumSumAmt;
            this.InsertedTestList[i].RateListHID = this.TestDental[j].RateListHID;
            this.InsertedTestList[i].Referal_Fee = this.TestDental[j].Referal_Fee;
            this.InsertedTestList[i].Type = this.TestDental[j].Type;
          }
        }
      }
    }
    else if (Type == 'V') {
      for (let i: number = 0; i < this.InsertedTestList.length; i++) {
        for (let j: number = 0; j < this.TestProcedure.length; j++) {
          if (this.InsertedTestList[i].TestId == this.TestProcedure[j].TestId) {
            this.TestProcedure[j].SpecialTest = this.InsertedTestList[i].SpecialTest;
            this.InsertedTestList[i].BaseRate = this.TestProcedure[j].BaseRate;
            this.InsertedTestList[i].Discount = this.TestProcedure[j].Discount;
            this.InsertedTestList[i].TestRate = this.TestProcedure[j].TestRate;
            this.InsertedTestList[i].CENTER_Name = this.TestProcedure[j].CENTER_Name;
            this.InsertedTestList[i].CENTER_id = this.TestProcedure[j].CENTER_id;
            this.InsertedTestList[i].Discount1 = this.TestProcedure[j].Discount1;
            this.InsertedTestList[i].LumSumAmt = this.TestProcedure[j].LumSumAmt;
            this.InsertedTestList[i].RateListHID = this.TestProcedure[j].RateListHID;
            this.InsertedTestList[i].Referal_Fee = this.TestProcedure[j].Referal_Fee;
            this.InsertedTestList[i].Type = this.TestProcedure[j].Type;
          }
        }
      }
    }

    this.changeDetection.detectChanges();
  }

  ChangeTextBoxBaseRate(List, value) {
   
  }

  ChangeTextBoxDiscount(List, value) {
   
  }

  ChangeTextBoxTestRate(List, value) {
    
  }




  getTotalAmountPaid() {
  
  }


  onSubmit(type) {
   
    this.alertService.clear();
    if(this.Doc1Id ==null || this.Doc1Id=='' || this.Doc1Id==0  ){
      this.alertService.warn("Please select doctor first");
      return;
    }
    if (this.Patient.controls['PATIENT_Name'].value == null || this.Patient.controls['PATIENT_Name'].value == '') {
      this.alertService.error('Please enter patient name');
      return;
    }
    if (this.PATIENT_Date == null) {
      this.alertService.error('Please select date');
      return;
    }

    if (this.PatientCollectioncenterID.value == null || this.PatientCollectioncenterID.value == '' || this.PatientCollectioncenterID.value == 0) {
      this.alertService.error('Please select Collection Center');
      return;
    }
    let Test: any = "";
    for (let i: number = 0; i < this.InsertedTestList.length; i++) {


      'testid^TestRate^testtype|testid^TestRate^testtype'
      if (this.InsertedTestList[i].SpecialTest == true) {
        let tempTest = this.InsertedTestList[i].TestId + '^' + this.InsertedTestList[i].TestRate + '^'
          + this.InsertedTestList[i].Type
        if (i != (this.InsertedTestList.length - 1))
          tempTest += '|';
        Test += tempTest;
      }
    }
    let doc1
    let doc2
    this.getTotalAmountPaid();
    if (this.Doc1.value != null && this.Doc1.value != '') {
      doc1 = this.Doc1Id;
    } else {
      this.alertService.warn("Please select doctor first");
      return
      doc1 = 0;
    }

    if (this.Doc2.value != null && this.Doc2.value != '') {
      doc2 = this.Doc2Id;
    } else {
      doc2 = 0;
    }

    let PATIENT_Age

    if (parseInt(this.PatientYear.value) > 0) {
      PATIENT_Age = this.PatientYear.value;
    } else {
      PATIENT_Age = 0
    }

    if (parseInt(this.PatientMonth.value) > 0) {
      PATIENT_Age += ';' + this.PatientMonth.value;
    } else {
      PATIENT_Age += ';' + 0
    }
    if (parseInt(this.PatientDay.value) > 0) {
      PATIENT_Age += ';' + this.PatientDay.value;
    } else {
      PATIENT_Age += ';' + 0
    }

    let PATIENT_AgeFlag

    if (parseInt(this.PatientYear.value) <= 1 || this.PatientYear.value == null || this.PatientYear.value == 0) {
      PATIENT_AgeFlag = 'A';
    } else if (parseInt(this.PatientYear.value) > 1 && parseInt(this.PatientYear.value) <= 6) {
      PATIENT_AgeFlag = 'B';
    } else if (parseInt(this.PatientYear.value) > 6 && parseInt(this.PatientYear.value) <= 13) {
      PATIENT_AgeFlag = 'C';
    } else if (parseInt(this.PatientYear.value) > 13 && this.Patient.controls['PATIENT_Gender'].value == "Male") {
      PATIENT_AgeFlag = 'D';
    } else if (parseInt(this.PatientYear.value) > 13 && this.Patient.controls['PATIENT_Gender'].value == "Female") {
      PATIENT_AgeFlag = 'E';
    } else if (parseInt(this.PatientYear.value) > 13 && this.Patient.controls['PATIENT_Gender'].value == "Transgender") {
      PATIENT_AgeFlag = 'F';
    }

    let urgent
    this.Patient.controls['Urgent'].value ? urgent = 1 : urgent = 0;
   const formData = new FormData();
    let InsertData = {
      LabSeriesSetting: 'Y',
      Patient_Id: this.Patient_Id,
      CollectionCenterId: this.PatientCollectioncenterID.value,
      PATIENT_Name: this.Patient.controls['PATIENT_Name'].value,
      PATIENT_Address1: this.Patient.controls['PATIENT_Address1'].value,
      PATIENT_Address2: this.Patient.controls['PATIENT_Address2'].value,
      PATIENT_SendSms: this.Patient.controls['PatientDocType'].value,
      PATIENT_VisitTime: this.Patient.controls['PATIENT_VisitTime'].value,
      PATIENT_Email: this.Patient.controls['PATIENT_Email'].value,
      PATIENT_Country: this.Patient.controls['PATIENT_Country'].value,
      PATIENT_DOB: this.DatePipe.transform(this.Patient.controls['PATIENT_DOB'].value, 'yyyy-MM-dd ', this.locale),
      Patient_DocType: this.Patient.controls['Patient_DocType'].value,
      PATIENT_PaymentMode: '',
      PATIENT_Telno: this.PATIENT_Telno.value,
      PATIENT_Gender: this.Patient.controls['PATIENT_Gender'].value,
      PATIENT_Age: PATIENT_Age,
      PATIENT_Date: this.PATIENT_Date,
      PATIENT_Doctorid: doc1.DOCTOR_id,
      PATIENT_Companyid: 0,
      PATIENT_AmountPaid: this.AmountPaidInCash.toString(),
      PATIENT_SampleCollected: 0,
      Doctorid2: doc2.DOCTOR_id !=undefined?doc2.DOCTOR_id:0,
      blnCommission: this.Patient.controls['blnCommission'].value,
      SendSMS: this.Patient.controls['SendSMS'].value!=undefined?this.Patient.controls['SendSMS'].value:false,
      labno: this.Patient.controls['LabNo'].value,
      WardNo: this.Patient.controls['WardNo'].value,
      HOSPTYPE: this.Patient.controls['HOSPTYPE'].value,
      TotalAmount: this.TotalAmount.toString(),
      EmergencyCharges: this.EmergencyChargesAmount.toString(),
      Discount: this.ConcessionAmount.toString(),
      EmergencyChargesPecent: this.EmergencyChargesPercentage.toString(),
      Sample_Date: this.Sample_Date,
      Remarks: this.Patient.controls['Remarks'].value,
      DiscountPercent: this.ConcessionPercentage.toString(),
      PATIENT_AgeFlag: PATIENT_AgeFlag,
      CreatedDate: this.PATIENT_Date,
      username:localStorage.getItem("UserName"),
      userid:localStorage.getItem("LoginByID"),
      
      TEST_ALIAS: '',
      Bar_Copiese: 0,
      Urgent: urgent,
      Issent: true,
      PrintUrgent:  this.Patient.controls['Urgent'].value =='0'?false:true,
      Patient_key: '',
      AppointmentId: "0",
      TEST: Test,
      Remark: this.Patient.controls['Remarks'].value,
      CashAmount: this.BillAmount.toString(),
      
      OtherRemarks: this.Patient.controls['OtherRemarks'].value,
      Paymode:this.Patient.controls['DropPaymentMode'].value,
      
      TPAId:this.Patient.controls['DropTPAList'].value,
      HospitalizeRemark:this.Patient.controls['HospitalizeRemark'].value,
      Email1:this.Patient.controls['Email1'].value,
      Email2:this.Patient.controls['Email2'].value,
      Mobile1:this.Patient.controls['Mobile1'].value,
      Mobile2:this.Patient.controls['Mobile2'].value,
      City:this.Patient.controls['City'].value,
      Area:this.Patient.controls['Area'].value,
      Pincode:this.Patient.controls['Pincode'].value,
      State:this.Patient.controls['State'].value,
      TelephoneNo:this.Patient.controls['TelephoneNo'].value,
      ProposalNumber:this.Patient.controls['ProposalNumber'].value,
    }
   



if(InsertData.TPAId=="" || InsertData.TPAId==null)
{
  InsertData.TPAId=0
}

for ( var key in InsertData ) {
  formData.append(key, InsertData[key]);
}

if(this.fileToUpload != null){
  formData.append('FileUpload',  this.fileToUpload ); 
  formData.append('FileName',  this.fileToUpload.name); 
}else{
  formData.append('FileUpload',  this.FileUpload ); 
  formData.append('FileName',  this.FileName); 
}
  
  this._SoloAdminMasterComponent.setLoading(true);
  if (this.Patient_Id == 0) {
    
    
      this._PatientService.CreatePatient(formData).subscribe((res: any) => {
        this._SoloAdminMasterComponent.setLoading(false);
      
       
        if (res.LabNumber != 0) {
          console.log("Hello");
          console.log(res);
          
          if(type=="PrintBill")
          {
            let  url:string =environment.ReportUrl+"/PatientBillReport.aspx?ID="+res.LabNumber+"&Type=Bill";
          
            window.open(url, '_blank');
          }
          else if(type=="PrintBarcode")
          {
            let  url:string =environment.ReportUrl+"/PatientBillReport.aspx?ID="+res.LabNumber+"&Type=Barcode";
           
            window.open(url, '_blank');
          }
          else if(type=="Save & New"){
            this.storage.remove('ID');
            alert("Patient added successfully..!");
            window.location.reload();
           return;
          }
           localStorage.setItem("AlertType","success");
            localStorage.setItem("AlertMessage","Patient Created Succesfully");
           this.storage.remove('ID');
           this.router.navigateByUrl('Admin/PatientList'); 
        }
      },
        err => {
          this._SoloAdminMasterComponent.setLoading(false);
          this.changeDetection.detectChanges();
          console.log(err);
          return null;
        });

    } 
    else {
      debugger;
      this._PatientService.UpdatePatient(formData).subscribe((res: any) => {
        this._SoloAdminMasterComponent.setLoading(false);
        
        if (res.LabNumber != 0) {
          if(type=="PrintBill")
          {
            let  url:string =environment.ReportUrl+"/PatientBillReport.aspx?ID="+res.LabNumber+"&Type=Bill";
       
            window.open(url, '_blank');
          }
          else if(type=="PrintBarcode")
          {
            let  url:string =environment.ReportUrl+"/PatientBillReport.aspx?ID="+res.LabNumber+"&Type=Barcode";
        
            window.open(url, '_blank');
          }
          else if(type=="Save & New"){
         
            this.storage.remove('ID');
            alert("Patient updated successfully..!");
            window.location.reload();
           return;
          }
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Patient Updated Succesfully");
          this.storage.remove('ID');
          this.router.navigateByUrl('Admin/PatientList');
        }
      },
        err => {
          this._SoloAdminMasterComponent.setLoading(false);
          this.changeDetection.detectChanges();
          console.log(err);
          return null;
        });
    }

    let a=this.Patient.value
  
        
        if(this.Patient.get('PATIENT_Email').hasError('email'))
         {
           alert("please enter valid email address");
           return;
   
         }
  
}

  savePaymentMode(){
    let Pmode = {
      PaymentMode:this.Patient.controls['txtPaymentMode'].value.toString(),
    }
    if (Pmode.PaymentMode!="" ) {
      this._paymentmodes.InsertUpdatePaymentMode(Pmode).subscribe((res: any) => {
        this._SoloAdminMasterComponent.setLoading(false);
        if(res==303 && res!=0)
        {
          this.modalService.close('custom-modal-1');
          this.AlertMessage='';
          this.alertService.warn("Payment Mode Already Exist");
        }
       else if(res!=0)
        {
          this.modalService.close('custom-modal-1');
          this.alertService.success("Payment Mode Added Successfully");
          this.getPaymetMode();
        }
        this.Patient.controls['txtPaymentMode'].setValue('');
        
      },
        err => {
          this._SoloAdminMasterComponent.setLoading(false);
          this.changeDetection.detectChanges();
          console.log(err);
          return null;
        });
    } else{
      this.alertService.success("Enter Payment Mode");
    }
  }
  get f() { return this.Patient.controls; }
  onCancle() {
    this.storage.remove('ID');
    this.router.navigateByUrl('Admin/PatientList');

  }

  NewPatient()
  {

    
    this.PATIENT_Name_Enable = true;
    this.PATIENT_Name_Select_Enable = false;
    let age=0;
    this.Patient.controls['PATIENT_DOB'].setValue(null);
     
    this.Patient.controls['PATIENT_Name'].setValue('');
    this.Patient.controls['Remarks'].setValue('');
    this.Patient.controls['Urgent'].setValue('');
    this.Patient.controls['PATIENT_Address1'].setValue('');
    this.Patient.controls['PATIENT_Address2'].setValue('');
   
    this.Patient.controls['CreditCardAmount'].setValue('');
    this.Patient.controls['NEFT_RTGSAmount'].setValue('');
    this.Patient.controls['HOSPTYPE'].setValue('');
    this.Patient.controls['OtherRemarks'].setValue('');
    this.Patient.controls['ChequeAmount'].setValue('');
    this.Patient.controls['PATIENT_Country'].setValue('');
    this.Patient.controls['WardNo'].setValue('');
    this.Patient.controls['PATIENT_VisitTime'].setValue('');
    this.Patient.controls['PATIENT_Email'].setValue('');
    this.Patient.controls['UPI_WalletAmount'].setValue('');
    this.Patient.controls['OtherRemarks'].setValue('');
    this.Patient.controls['ChequeAmount'].setValue('');

    this.Patient.controls['PatientCollectioncenterID'].setValue('');
    
    this.Patient.controls['Remarks'].setValue('');
    this.Patient.controls['Patient_DocType'].setValue('');
    // this.Patient.controls['DropPaymentMode'].setValue('');
    this.getPaymetMode();
    this.Patient.controls['DropTPAList'].setValue('');
  
    this.Patient.controls['HospitalizeRemark'].setValue('');
    this.Patient.controls['TPAName'].setValue('');
    this.Patient.controls['Email1'].setValue('');
    this.Patient.controls['Email2'].setValue('');
    this.Patient.controls['Mobile1'].setValue('');
    this.Patient.controls['Mobile2'].setValue('');
    this.Patient.controls['City'].setValue('');
    this.Patient.controls['Area'].setValue('');
    
    this.Patient.controls['State'].setValue('');
    this.Patient.controls['Pincode'].setValue('');
    this.Patient.controls['TelephoneNo'].setValue('');
    this.Patient.controls['ProposalNumber'].setValue('');
     this.Patient.controls['PATIENT_Gender'].setValue('');
     
     this.PatientYear = new FormControl(0);

     this.Patient.controls['blnCommission'].setValue(true);
    
    // this.Patient.controls['PatientYear'].setValue(parseInt(this.age));
    this.GetLabNo();
  }

  Add(){
    this.storage.remove('ID');
    this.router.navigateByUrl('/Admins/PatientRegistration');
  } 

}


