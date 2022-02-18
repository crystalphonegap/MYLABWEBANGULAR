import { Component,Inject, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';
import { DatePipe } from '@angular/common';
import { PatientService } from 'src/app/Shared/PatientService ';
import { ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-authenticate-patient-test',
  templateUrl: './authenticate-patient-test.component.html',
  styleUrls: ['./authenticate-patient-test.component.scss']
})
export class AuthenticatePatientTestComponent implements OnInit {

  constructor(private changeDetection: ChangeDetectorRef, @Inject(SESSION_STORAGE) private storage: WebStorageService, private _PatientService: PatientService
    , private router: Router, private alertService: AlertService, public DatePipe: DatePipe,
    private _SoloAdminMasterComponent: SoloAdminMasterComponent) { }
  dochdrid;
  TestData: any = [];
  formularCalculation: any = [];
  ReRun: string = "none";
  ReSample: string = "none";
  rbtnReSample:boolean=false;
  rbtnReRun:boolean=false;
  rbtnValidate:boolean=false;
  rbtnAuntheticate:boolean=false;
  CollectionCenter = new FormControl('');
  filteredReason: Observable<any>;
  filteredNaration: Observable<any>;
  optionsReason:any=[];
  optionsNaration:any=[];
  fileToUpload;
  selFiles:any;
  selectedFiles = [];
  Userid;
  ngOnInit(): void {
    this.getTESTData();
    this.getNarration('autoReSample');
    this.getNarration('autoNarration');
  }


  getNarration(EditFor) {
    this._SoloAdminMasterComponent.setLoading(true);
    this._PatientService.GetNarration(EditFor).subscribe((res: any) => {
      this.onGetNarration("",EditFor)
      if(EditFor=="autoReSample"){
        this.optionsReason = res;
      }else if(EditFor=="autoNarration"){
        this.optionsNaration = res;
      }
    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
        return null;
      });
  }


  onGetNarration(data,EditFor) {
    if(EditFor=="autoReSample"){
    this.filteredReason = this.CollectionCenter.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(data))
      );
    }else if(EditFor=="autoNarration"){
      this.filteredNaration = this.CollectionCenter.valueChanges
        .pipe(
          startWith(''),
          map(value2 => this._filter2(data))
        );
    }
   
  
    this._SoloAdminMasterComponent.setLoading(false);
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.optionsReason.filter(option => option.NarrationText.toLowerCase().includes(filterValue)).slice(0, 10);
  }

  private _filter2(value: string) {
    const filterValue2 = value.toLowerCase();
    return this.optionsNaration.filter(option2 => option2.NarrationText.toLowerCase().includes(filterValue2)).slice(0, 10);
  }

  getTESTData() {
    this._SoloAdminMasterComponent.setLoading(true);
    this._PatientService.GetPatientTestDetail(this.storage.get('ID')).subscribe(
      (res: any) => {
        console.log(res);
        this.TestData = res;
        this.getformularCalculationfor();
        this._SoloAdminMasterComponent.setLoading(false);
        this.onGetNarration(res[0].ResampleReason,'autoReSample');
        this.onGetNarration(res[0].DOCHDR_sDescription,'autoNarration');
        let i: number = 0;
        let yy = '';
        let month = '';
        let dd = '';
        let j;
        let k;
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
        this.TestData[0].yy = yy;
        this.TestData[0].dd = dd;
        this.TestData[0].month = month;
        if(res[0].MarkComplete=="C"){
          this.ReSample="";
          this.rbtnReSample=true;
          this.rbtnAuntheticate=false;
          this.rbtnReRun=false;
          this.rbtnReRun=false;
        }else  if(res[0].MarkComplete=="Y"){
          this.rbtnReSample=false;
          this.rbtnAuntheticate=true;
          this.rbtnReRun=false;
          this.rbtnReRun=false;
        }else  if(res[0].MarkComplete=="V"){
          this.rbtnReSample=false;
          this.rbtnAuntheticate=false;
          this.rbtnValidate=true;
          this.rbtnReRun=false;
        }else  if(res[0].MarkComplete=="R"){
          this.ReRun = "";
          this.rbtnReSample=false;
          this.rbtnAuntheticate=false;
          this.rbtnValidate=false;
          this.rbtnReRun=true;
        } 
        this.changeDetection.detectChanges();
      },
      err => {
        console.log(err);
        this._SoloAdminMasterComponent.setLoading(false);
      }
    );
  }

  radioChange(event) {
    this.TestData[0].MarkComplete = event.value
    if( event.value=="Re-Sample"){
      // this.ReSample="";
      // this.ReRun = "none";
      this.rbtnReSample=true;
      // this.rbtnAuntheticate=false;
      // this.rbtnReRun=false;
      // this.rbtnReRun=false;
    }else  if( event.value=="Auntheticate"){
      // this.ReSample="none";
      // this.ReRun = "none";
      // this.rbtnReSample=false;
      this.rbtnAuntheticate=true;
      // this.rbtnReRun=false;
      // this.rbtnReRun=false;
    }else  if( event.value=="Validate"){
      // this.ReSample="none";
      // this.ReRun = "none";
      // this.rbtnReSample=false;
      // this.rbtnAuntheticate=false;
      this.rbtnValidate=true;
      // this.rbtnReRun=false;
    }else  if( event.value=="Re-Run"){
      // this.ReSample="none";
      // this.ReRun = "";
      // this.rbtnReSample=false;
      // this.rbtnAuntheticate=false;
      // this.rbtnValidate=false;
      this.rbtnReRun=true;
    }
  }

  onCheckboxClick(List, event) {
    List.Rerun =  event.target.checked;
  }

  ChangeDDlValue(List, Value,EditFor) {
    if(EditFor=="auto"){
      this.TestData[List.TESTDET_FieldNo - 1].DOCDET_tFieldValue = Value;
      List.DOCDET_tFieldValue = Value;
      this.onGetDropDownList(List.TESTDET_FieldNo - 1);
    }else if(EditFor=="autoReSample"){
      this. onGetNarration(Value,EditFor);
      this.TestData[0].ResampleReason = Value;
    }else if(EditFor=="autoNarration"){
      this. onGetNarration(Value,EditFor);
      this.TestData[0].DOCHDR_sDescription = Value;
    }
  }

  ValueChanged(List, Value,Index) {
    let valueList: any = [];
    this.TestData[List.TESTDET_FieldNo - 1].DOCDET_tFieldValue = Value;
    List.DOCDET_tFieldValue = Value;
    for (let i: number = 0; i < this.formularCalculation.length; i++) {
      if (List.TESTDET_FieldNo == this.formularCalculation[i].value) {
        if (this.formularCalculation[i].formula != "") {
          valueList.push({
            Key: this.formularCalculation[i].key,
            formula: this.formularCalculation[i].formula
          });
        }
      }
    }
    this.updateValueByFormulaField(valueList);
  }

  updateValueByFormulaField(valueList) {
    let tempValue;
    let Working: boolean = false;
    for (let i: number = 0; i < valueList.length; i++) {
      Working = false;
      for (let j: number = 0; j < valueList[i].formula.length; j++) {
        if (valueList[i].formula[j] === "B") {
          let id = valueList[i].formula[j + 1];
          let DataToReplace = "B" + valueList[i].formula[j + 1];
          let DataToReplaceWith = 0;
          if (this.TestData[id - 1].DOCDET_tFieldValue != "" && this.TestData[id - 1].DOCDET_tFieldValue != null) {
            DataToReplaceWith = this.TestData[id - 1].DOCDET_tFieldValue;
          }
          if (Working == false) {
            tempValue = valueList[i].formula.replace(DataToReplace, DataToReplaceWith);
            Working = true;
          } else {
            tempValue = tempValue.replace(DataToReplace, DataToReplaceWith);
          }
        }
      }
      let Rowid = valueList[i].Key - 1;
      this.TestData[Rowid].DOCDET_tFieldValue = parseFloat(eval(tempValue)).toFixed(2);
    }
    this.UpdateValueWithLable(valueList);
  }


  UpdateValueWithLable(valueList) {
    let tempValue;
    let Rowid
    let Working: boolean = false;
    for (let i: number = 0; i < valueList.length; i++) {
      for (let j: number = 0; j < this.formularCalculation.length; j++) {
        Working = false;
        if (valueList[i].Key == this.formularCalculation[j].value) {
          for (let k: number = 0; k < this.formularCalculation[j].formula.length; k++) {
            if (this.formularCalculation[j].formula[k] === "B") {
              let id = this.formularCalculation[j].formula[k + 1];
              let DataToReplace = "B" + this.formularCalculation[j].formula[k + 1];
              let DataToReplaceWith = 0;
              if (this.TestData[id - 1].DOCDET_tFieldValue != "" && this.TestData[id - 1].DOCDET_tFieldValue != null) {
                DataToReplaceWith = this.TestData[id - 1].DOCDET_tFieldValue;
              }
              if (Working == false) {
                tempValue = this.formularCalculation[j].formula.replace(DataToReplace, DataToReplaceWith);
                Working = true;
              } else {
                tempValue = tempValue.replace(DataToReplace, DataToReplaceWith);
              }
              Rowid = this.formularCalculation[j].key - 1;
            }
          }
          this.TestData[Rowid].DOCDET_tFieldValue = parseFloat(eval(tempValue)).toFixed(2);
        }
      }
    }
  }


  getformularCalculationfor() {
    for (let i: number = 0; i < this.TestData.length; i++) {
      if (this.TestData[i].TESTDET_FieldType == 2) {
        for (let j: number = 0; j < this.TestData[i].TESTDET_sFormula.length; j++) {
          if (this.TestData[i].TESTDET_sFormula[j] === "B") {
            this.formularCalculation.push({
              key: this.TestData[i].TESTDET_FieldNo,
              value: this.TestData[i].TESTDET_sFormula[j + 1],
              formula: this.TestData[i].TESTDET_sFormula
            });
          }
        }
      }
      else if (this.TestData[i].TESTDET_FieldType == 1) {
        this.onGetDropDownList(i);
      }
    }


  }
 

  Back(Patient_Id) {
    console.log(Patient_Id);
    swal({
      icon: 'success',
      title: 'Record save successfully...!',
      timer: 10
    }); 
    //swal("Oops!", "Something went wrong!", "error");
    this.storage.set('ID', Patient_Id);
    this.router.navigateByUrl('/Admins/AuthenticateList');
  }


  onGetDropDownList(Index) {
    this.CollectionCenter.patchValue(this.TestData[Index].DOCDET_tFieldValue);
    this.CollectionCenter.patchValue(this.TestData[Index].DOCDET_tFieldValue, { emitEvent: true, onlySelf: true });
    if(this.TestData[Index].PREDEFVALModel!=null || this.TestData[Index].PREDEFVALModel!=''){
      this.TestData[Index].PREDEFVAL = this.CollectionCenter.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDropDownList(this.TestData[Index].PREDEFVALModel, this.TestData[Index].DOCDET_tFieldValue))
      );
    }
    this.changeDetection.detectChanges();
    this._SoloAdminMasterComponent.setLoading(false);
    return;
  }


  private _filterDropDownList(List, Value) {
    let result = List.filter(DropDown => DropDown.PREDEFVAL_Value.toLowerCase().includes(Value.toLowerCase()));
    return result;
  }


  OnSubmit(Patient_Id) {

    let data=this.TestData[0] ;
    let Markcomplete2;
    if(this.rbtnReSample===false || this.rbtnReRun==false || this.rbtnValidate===false || this.rbtnAuntheticate===false)
    {
    
      Markcomplete2='D';
     
    }
    else
    {
      Markcomplete2=this.TestData[0]?.MarkComplete;
     

    }
    const formData = new FormData();

   

    for (let i=0 ; i < this.selectedFiles.length ; i++)
      {
        formData.append('files', this.selFiles[i], 
           this.selFiles[i].name);
      }
     
      formData.append('PatientId',this.storage.get('ID'));
      formData.append('AddedBy',localStorage.getItem("LoginByID"));
      formData.append('MarkComplete',Markcomplete2);
      formData.append('TestId',this.TestData[0]?.TESTMST_CurrentId);
   

    this._PatientService.SaveDocument(formData).subscribe((res: any) => {
      this._SoloAdminMasterComponent.setLoading(false); 
      if (res != 0) {
        this.storage.remove('ID');
        this.storage.set('ID', Patient_Id);
      

        if(res.Patient_Id=Patient_Id)   
        {
        //   swal({
        //  icon: 'success',
        // title: 'Record save successfully...!',
        //  timer: 500,
         
        
        //  });   
        
      
         this.Back(Patient_Id);


        } 
      }
    },
    err => {
      this._SoloAdminMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();
      console.log(err);
      return null;
    });
    
    let dataa={
     "value": this.TestData,
     "Markcomplete2":Markcomplete2,
     "AddedBy":localStorage.getItem('LoginByID')
    }
    
    
    console.log(dataa);
    console.log(this.TestData);
    this._PatientService.UpdateDocDetTestValue(dataa).subscribe((res: any) => {
      this._SoloAdminMasterComponent.setLoading(false); 
      if (res != 0) {
        this.storage.remove('ID');
        this.storage.set('ID', Patient_Id);
        this.Back(Patient_Id);
      }
    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
        return null;
      });

  }

  public uploadFile = (event: Event) => {
    // if (files.length === 0) {
    //   return;
    // }
    debugger;
  //  // this.fileToUpload = <File>files[0];

  //   for (let i = 0; i < this.fileToUpload.length; i++) {
  //     this.selectedFiles.push(item['name']); 
  //   }

  this.selectedFiles = [];
 
    const element = event.currentTarget as HTMLInputElement;
    this.selFiles = element.files;
 
    let fileList: FileList | null = element.files;
    if (fileList) {
      for (let itm in fileList)
      {
        let item: File = fileList[itm];
        if ((itm.match(/\d+/g) != null) && (!this.selectedFiles.includes(item['name'])))
            this.selectedFiles.push(item['name']); 
      }
    }
  
  }

 

  


}
