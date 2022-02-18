import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { RateListService } from 'src/app/Shared/RateListService';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';
import { ChangeDetectorRef } from '@angular/core';
import { ModalService } from 'src/app/CustomComponents/Modal/Solo_Admin';
import { DatePipe } from '@angular/common';
import { TestService } from 'src/app/Shared/TestService';

@Component({
  selector: 'app-rate-list-add',
  templateUrl: './rate-list-add.component.html',
  styleUrls: ['./rate-list-add.component.scss']
})
export class RateListAddComponent implements OnInit {

  constructor(private service: RateListService, private router: Router,private _TestService :TestService,
     @Inject(SESSION_STORAGE) private storage: WebStorageService, private changeDetection: ChangeDetectorRef,
    private _SoloAdminMasterComponent: SoloAdminMasterComponent, private modalService: ModalService, public DatePipe: DatePipe
    , private alertService: AlertService) {

    this.Today = new Date();
    this.Today = this.DatePipe.transform(this.Today, 'yyyy-MM-dd');
      this.RateListId = this.storage.get('ID');
      if (this.RateListId != null && this.RateListId != '') {
        localStorage.setItem('PageTitle', "Rate List Edit");
      }else{
        localStorage.setItem('PageTitle', "Add Rate List");
      }
      
    this.getRateFromTestMaster();
    this.getTestTypeList(); 

       }
  RateListAdd;
  RateListId;
  RateListForSaveAs;
  Progressing=true;
  isCurrentDataSaved: boolean = false;
  oldRateListForSaveAs: any = [];
  TestTypeList: any = [];
  saveAsRateListName: string;
  RateListTestMaster: any = [];
  RateListTestMasterInsert: any = [];
  RateListTestMasterFromRateList: any = [];
  RateListTestMasterInput: any = [];
  SearchRateList: string;
  SearchRateListType: string;
  SearchRateListCatagory: number;
  ValueFoundInList: boolean = false;
  SavedEnabled: boolean = false;
  Today;
  Progress:number=0;
  DetailInsertedLength: number;
  Redirect: boolean = false;
  saveAsView: string = 'none';
  firstTimeLoad:boolean=true;
  SaveType:number=0;
  ngOnInit() {
    this.RateListAdd = new FormGroup({
      RateListId: new FormControl(0, [Validators.required]),
      RateListName: new FormControl(null, [Validators.required]),
      SysUser: new FormControl(localStorage.getItem("UserName")),
      Routine: new FormControl(0),
      Special: new FormControl(0),
      Microbiology: new FormControl(0),
      Outside: new FormControl(0),
      Histo: new FormControl(0),
      other: new FormControl(0),
      other1: new FormControl(0),
      EffectiveDate: new FormControl(this.Today, Validators.required),
      UserId:new FormControl(localStorage.getItem("LoginByID"))
    });
    if (this.RateListId != null && this.RateListId != '') {
      this.getRateListDataById();
      this.saveAsView = 'none';
    }
  }

  getTestTypeList(){
    this._SoloAdminMasterComponent.setLoading(true);
    
    let model ={
      PageNo:-3,
      PageSize:0,
      Keyword:null,
    }
    this._TestService.GetAllTestTypeDetails(model).subscribe(
      (res: any) => { 
        if(res!=null){
            this.TestTypeList=res;
        }
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        console.log(err);
      }
    );
  }

  keyPressNumbersDecimal(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  keyPressNumbersDecimalPercentage(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (event.target.value > 100) {
      event.preventDefault();
      event.target.value = 0;
      return false;
    }
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    if (event.target.value > 100) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  GetRateList() {
    this.getRateFromTestMaster();
  }

  getRateFromRateList() {
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.GetRateListByID(this.RateListId).subscribe(
      (res: any) => {
        this.RateListTestMasterFromRateList = res;
        for (let i: number = 0; i < this.RateListTestMasterFromRateList.length; i++) {
          for (let j: number = 0; j < this.RateListTestMaster.length; j++) {
            if (this.RateListTestMasterFromRateList[i].TestId == this.RateListTestMaster[j].TestId) {
              this.RateListTestMaster[j].TestRate = this.RateListTestMasterFromRateList[i].TestRate
              this.RateListTestMaster[j].Discount = this.RateListTestMasterFromRateList[i].Discount
              this.RateListTestMaster[j].LumSumAmt = this.RateListTestMasterFromRateList[i].LumSumAmt
              this.RateListTestMaster[j].SpecialTest = this.RateListTestMasterFromRateList[i].SpecialTest
              this.RateListTestMaster[j].BaseRate = this.RateListTestMasterFromRateList[i].BaseRate
              this.RateListTestMaster[j].Discount1 = this.RateListTestMasterFromRateList[i].Discount1
              if(this.firstTimeLoad==true){
                this.oldRateListForSaveAs[j].TestRate = this.RateListTestMasterFromRateList[i].TestRate
                this.oldRateListForSaveAs[j].Discount = this.RateListTestMasterFromRateList[i].Discount
                this.oldRateListForSaveAs[j].LumSumAmt = this.RateListTestMasterFromRateList[i].LumSumAmt
                this.oldRateListForSaveAs[j].SpecialTest = this.RateListTestMasterFromRateList[i].SpecialTest
                this.oldRateListForSaveAs[j].BaseRate = this.RateListTestMasterFromRateList[i].BaseRate
                this.oldRateListForSaveAs[j].Discount1 = this.RateListTestMasterFromRateList[i].Discount1
              }
             
            }
          }
        }
     this.firstTimeLoad=false;
        this.setInputedValues();
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        console.log(err);
      }
    );
  }

  getRateFromTestMaster() {
    // this._SoloAdminMasterComponent.setLoading(true);
    this.service.getRateFromTestMaster(this.SearchRateList,this.SearchRateListType,this.SearchRateListCatagory).subscribe(
      (res: any) => {
        this.RateListTestMaster = res;
        this.changeDetection.detectChanges();
        if(this.firstTimeLoad==true){
          this.oldRateListForSaveAs= res;
        }
        if (this.RateListTestMaster.length == 0) {
          this.SearchRateList = this.SearchRateList.slice(0, -1);
           this.getRateFromTestMaster()
        }
        if (this.RateListId != null && this.RateListId != '') {
          this.getRateFromRateList();
        } else {
          this.setInputedValues();
        }
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        console.log(err);
      }
    );
  }

  setInputedValues() {
    this._SoloAdminMasterComponent.setLoading(true);
    for (let j: number = 0; j < this.RateListTestMasterInput.length; j++) {
      for (let i: number = 0; i < this.RateListTestMaster.length; i++) {
        if (this.RateListTestMasterInput[j].TestId == this.RateListTestMaster[i].TestId) {
          this.RateListTestMaster[i].TestRate = this.RateListTestMasterInput[j].TestRate
          this.RateListTestMaster[i].Discount = this.RateListTestMasterInput[j].Discount
          this.RateListTestMaster[i].LumSumAmt = this.RateListTestMasterInput[j].LumSumAmt
          this.RateListTestMaster[i].SpecialTest = this.RateListTestMasterInput[j].SpecialTest
          this.RateListTestMaster[i].BaseRate = this.RateListTestMasterInput[j].BaseRate
          this.RateListTestMaster[i].Discount1 = this.RateListTestMasterInput[j].Discount1
        }
      }
    }
    this.changeDetection.detectChanges();
    this._SoloAdminMasterComponent.setLoading(false);
  }


  getRateListDataById() {
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.GetRateListHeaderById(this.RateListId).subscribe(
      (res: any) => {
        let Date;
        this.RateListId = res.RateListId;
        this.RateListAdd = new FormGroup({
          RateListId: new FormControl(res.RateListId, [Validators.required]),
          RateListName: new FormControl(res.RateListName, [Validators.required]),
          SysUser: new FormControl(res.SysUser),
          Routine: new FormControl(res.Routine),
          Special: new FormControl(res.Special),
          Microbiology: new FormControl(res.Microbiology),
          Outside: new FormControl(res.Outside),
          Histo: new FormControl(res.Histo),
          other: new FormControl(res.other),
          other1: new FormControl(res.other1),
          EffectiveDate: new FormControl(this.Today, Validators.required),
          UserId:new FormControl(localStorage.getItem("LoginByID"))
        });
        this.RateListForSaveAs= new FormGroup({
          RateListId: new FormControl(res.RateListId, [Validators.required]),
          RateListName: new FormControl(res.RateListName, [Validators.required]),
          SysUser: new FormControl(res.SysUser),
          Routine: new FormControl(res.Routine),
          Special: new FormControl(res.Special),
          Microbiology: new FormControl(res.Microbiology),
          Outside: new FormControl(res.Outside),
          Histo: new FormControl(res.Histo),
          other: new FormControl(res.other),
          other1: new FormControl(res.other1),
          EffectiveDate: new FormControl(this.Today, Validators.required),
        });
        if (res.EffectiveDate !== null && res.EffectiveDate !== '' && res.EffectiveDate  !=='0001-01-01T00:00:00') {
          this.RateListAdd.controls['EffectiveDate'].setValue(res.EffectiveDate);
          this.RateListForSaveAs.controls['EffectiveDate'].setValue(res.EffectiveDate);
        }
        
        this.changeDetection.detectChanges();
        this._SoloAdminMasterComponent.setLoading(false);
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        console.log(err);
      }
    );
  }


  onCheckBoxChange(List, event) {
    List.SpecialTest = event.target.checked;
    this.InsertInInput(List);
  }

  ChangeTextBoxBaseRate(List, value) {
    List.BaseRate = value;
    List.TestRate = List.BaseRate-  ((List.BaseRate/100)*List.Discount)  +((List.BaseRate/100)*List.Referal_Fee)  ;
    this.InsertInInput(List);
  }

  ChangeTextBoxDiscount(List, value) {
    List.Discount = value;
    List.TestRate = List.BaseRate-  ((List.BaseRate/100)*List.Discount)  +((List.BaseRate/100)*List.Referal_Fee) ;
    this.InsertInInput(List);
  }

  ChangeTextBoxTestRate(List, value) {
    List.TestRate = value;
    List.TestRate = List.BaseRate-  ((List.BaseRate/100)*List.Discount)  +((List.BaseRate/100)*List.Referal_Fee)  ;
    this.InsertInInput(List);
  }

  ChangeTextBoxReferal_Fee(List, value) {
    List.Referal_Fee = value;
    List.TestRate = List.BaseRate-  ((List.BaseRate/100)*List.Discount)  +((List.BaseRate/100)*List.Referal_Fee)  ;
    this.InsertInInput(List);
  }

  ChangeTextBoxLumSumAmt(List, value) {
    List.LumSumAmt = value;
    this.InsertInInput(List);
  }

  InsertInInput(List) {
    this._SoloAdminMasterComponent.setLoading(true);
    this.ValueFoundInList = false;
    if (this.RateListTestMasterInput.length > 0) {
      for (let j: number = 0; j < this.RateListTestMasterInput.length; j++) {
        if (this.RateListTestMasterInput[j].TestId == List.TestId) {
          this.RateListTestMasterInput[j].TestRate = List.TestRate
          this.RateListTestMasterInput[j].Discount = List.Discount
          this.RateListTestMasterInput[j].LumSumAmt = List.LumSumAmt
          this.RateListTestMasterInput[j].SpecialTest = List.SpecialTest
          this.RateListTestMasterInput[j].BaseRate = List.BaseRate
          this.RateListTestMasterInput[j].Discount1 = List.Discount1
          this.ValueFoundInList = true;
          this._SoloAdminMasterComponent.setLoading(false);
        }
      }
      if (this.ValueFoundInList == false) {
        this.RateListTestMasterInput.push(List);
        this._SoloAdminMasterComponent.setLoading(false);
      }
    } else {
      this.RateListTestMasterInput.push(List);
      this._SoloAdminMasterComponent.setLoading(false);
    }

    this._SoloAdminMasterComponent.setLoading(false);
  }

  setprocessing(){
    let i=0
   while(i<100){
     setTimeout( () => {  this.Progress = (i * 100) / 100; i+=10;this.changeDetection.detectChanges();}, 10000 );
     
   }
 }
  onSubmit() {
    this.SearchRateList ="";
    // this.GetRateList();
     let model=this.RateListAdd.value;
    console.log(model);
    if(model.RateListName==="" || model.RateListName===null)
    {
      alert("Please Enter RateList Name");
      return;
    }
    let allDataCount:number=0;
    let allDataCountProgress:number=0;
   this._SoloAdminMasterComponent.setLoading(true);
  this.service.getRateFromTestMaster(null,null,null).subscribe(
    (res: any) => {
      this.RateListTestMaster = res;   
      this.SavedEnabled = true;
      for (let j: number = 0; j < this.RateListTestMasterInput.length; j++) {
        allDataCount=this.RateListTestMasterInput.length*this.RateListTestMaster.length
        for (let i: number = 0; i < this.RateListTestMaster.length; i++) {
          allDataCountProgress+=i;
          if (this.RateListTestMasterInput[j].TestId == this.RateListTestMaster[i].TestId) {
            this.RateListTestMaster[i].TestRate = this.RateListTestMasterInput[j].TestRate
            this.RateListTestMaster[i].Discount = this.RateListTestMasterInput[j].Discount
            this.RateListTestMaster[i].LumSumAmt = this.RateListTestMasterInput[j].LumSumAmt
            this.RateListTestMaster[i].SpecialTest = this.RateListTestMasterInput[j].SpecialTest
            this.RateListTestMaster[i].BaseRate = this.RateListTestMasterInput[j].BaseRate
            this.RateListTestMaster[i].Discount1 = this.RateListTestMasterInput[j].Discount1
          }
          this.Progress = (allDataCountProgress * 100) / allDataCount;
          this.changeDetection.detectChanges()
        }
      }
      if (this.RateListId != null && this.RateListId != '') {
        this.SaveType=2;
        this.update();
      } else {
        this.Redirect = true;
        this.SaveType=1;
        this.insert();
      }
      this._SoloAdminMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();
    },
    err => {
      this._SoloAdminMasterComponent.setLoading(false);
      console.log(err);
    }
  );

  }

  insert() {
    this.RateListAdd.controls['EffectiveDate'].setValue(this.DatePipe.transform(this.RateListAdd.controls['EffectiveDate'].value, 'yyyy-MM-dd'));
    this._SoloAdminMasterComponent.setLoading(true);
    this.SaveType=3;
    let model=this.RateListAdd.value;
    
    this.Progressing=false;
    this.changeDetection.detectChanges();
    model.TestMaster=this.RateListTestMaster
    this.service.InsertRateList(model).subscribe(
      (res: any) => {
        this._SoloAdminMasterComponent.setLoading(false);
        // this.RateListAdd.controls['RateListId'].setValue(this.RateListId);
        if (res != 0) {
          this.Progressing=true;
          this. success();
          // this.InsertDetail(res, this.RateListTestMaster);
        }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.Progressing=true;
        if (err.status == 400)
          this.alertService.error('Error Rate List not added.');
        else
          console.log(err);
      }
    );
    return;
  }

  success(){
    
    this.changeDetection.detectChanges();
    this._SoloAdminMasterComponent.setLoading(false);
    this.storage.remove('ID');
    this.router.navigateByUrl('Admin/RateList');
    if (this.SavedEnabled == true) {

      if (this.SaveType==2) {
        
        localStorage.setItem("AlertType","success");
        localStorage.setItem("AlertMessage","Rate List Updated Succesfully"); 
        this.alertService.error("Rate List Updated Successfully..!");
      } else if (this.SaveType==1) {
        
        localStorage.setItem("AlertType","success");
        localStorage.setItem("AlertMessage","Rate List Created Succesfully"); 
        // this.RateListId= this.RateListAdd.get('RateListId').value;
        this.alertService.error("Rate List Created Successfully..!");
      }
    } else {
      localStorage.setItem("AlertType","success");
      localStorage.setItem("AlertMessage","New Rate List Created Succesfully"); 
      this.alertService.error("New Rate List Created Successfully..!");

    }
  }

  InsertDetail(Id, list) {
    this.DetailInsertedLength = 1;
    this.RateListTestMasterInsert = list;
    this._SoloAdminMasterComponent.setLoading(true);
    let Data;
    this.changeDetection.detectChanges();
    if(this.RateListTestMasterInsert.length >0){
      for (let i = 0; i <= this.RateListTestMasterInsert.length; i++) {
        this.RateListTestMasterInsert[i].RateListHID = Id;
        Data = this.RateListTestMasterInsert[i]
        this.DetailInsertedLength++
        this.service.InsertRateDetailList(Data).subscribe(
          (res: any) => {
            this._SoloAdminMasterComponent.setLoading(false);
            if (res != 0) {
              this. success();
            }
            if (this.DetailInsertedLength > this.RateListTestMasterInsert.length) {
              this._SoloAdminMasterComponent.setLoading(false);
            }
          },
          err => {
            this._SoloAdminMasterComponent.setLoading(false);
            this.Progressing=true;
            if (err.status == 400)
              this.alertService.error('Error Rate List not added.');
            else
              console.log(err);
          }
        );
      }
    }
    
  }

  update() {
    this._SoloAdminMasterComponent.setLoading(true);
    this.changeDetection.detectChanges();
    this.RateListAdd.controls['EffectiveDate'].setValue(this.DatePipe.transform(this.RateListAdd.controls['EffectiveDate'].value, 'yyyy-MM-dd'));
    this.isCurrentDataSaved = true;
    this.Progressing=false;
    let model=this.RateListAdd.value;
    model.TestMaster=this.RateListTestMaster
   
    this.service.UpdateRateList(this.RateListAdd.value).subscribe(
      (res: any) => {
        if (res != 0) {
          this.Progressing=true;
          this. success();
          // this.InsertDetail(res, this.RateListTestMaster);
        }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.Progressing=true;
        if (err.status == 400)
          this.alertService.error('Error Rate List not update.');
        else
          console.log(err);
      }
    );
    return;
  }

  Back() {
    this.storage.remove('ID');
    this.router.navigateByUrl('Admin/RateList');
  }

  openModal() {
    this.modalService.open('custom-modal-1');
  }
  onRowChange(value) {
    this.saveAsRateListName = value
  }

  saveModal() {
    this.SavedEnabled = false;
    this.modalService.close('custom-modal-1');
    this.RateListForSaveAs.controls['RateListName'].setValue(this.saveAsRateListName);
    this.RateListForSaveAs.controls['RateListId'].setValue(0);
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.InsertRateList(this.RateListForSaveAs.value).subscribe(
      (res: any) => {
        if (res != 0) {
          this.InsertDetail(res, this.oldRateListForSaveAs);
        }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Rate List not added.');
        else
          console.log(err);
      }
    );
  }

  closeModal() {
    this.modalService.close('custom-modal-1');
  }
}
