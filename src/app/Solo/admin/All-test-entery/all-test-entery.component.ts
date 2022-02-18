

import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
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
import { map, startWith } from 'rxjs/operators';
import { HostListener } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-all-test-entery',
  templateUrl: './all-test-entery.component.html',
  styleUrls: ['./all-test-entery.component.scss'],
  
})
export class AllTestEnteryComponent implements OnInit {

  DataList: any = [];
  constructor(private router: Router, private _PatientService: PatientService,private _TestService :TestService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _SoloAdminMasterComponent: SoloAdminMasterComponent, private alertService: AlertService,
    public paginationService: PaginationService, private _EmployeeService: EmployeeService,
    private changeDetection: ChangeDetectorRef, private modalService: ModalService, private renderer: Renderer2 ) { 
      localStorage.setItem('PageTitle',"All Test Entery");}
  Status = 'All';
  Keyword;
  selectedPatient_Id;
  TestData: any = [];
  formularCalculation: any = [];
  ReRun: string = "none";
  ReSample: string = "none";
  rbtnReSample: boolean = false;
  currentNumber: number = 0;
  rbtnReRun: boolean = false;
  rbtnValidate: boolean = false;
  rbtnAuntheticate: boolean = false;
  ViewByID = "inherit";
  EntryOFTest: any = [];
  currentTest: string = "";
  CollectionCenter = new FormControl('');
  ViewByName = "none";
  SearchFilter;
  search = null;
  

  @ViewChildren('input') inputs: QueryList<ElementRef>;
  public keypressed;
  CurrentIndex
 @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keypressed = event.keyCode;
    if(this.keypressed==13){
      let Value = this.CurrentIndex+1;
      for(let i:number=Value;i<this.TestData.length;i++){
        if(this.TestData[i].TESTDET_FieldType ==1 || this.TestData[i].TESTDET_FieldType ==0 ){
          const element = this.renderer.selectRootElement('#input'+i);
// setTimeout(() => element.focus, 0);
setTimeout(() => element.focus(), 0);
break;
          // this.inputs[i].nativeElement.focus();
        }
      }
    }
  }


  ngOnInit() {
    this.SearchFilter = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
    this.SearchChanges();
    
  }
  SetCurrentIndex(i){
    console.log(i);
    this.CurrentIndex=i;
  }

  onViewByName() {
    this.ViewByID = 'none';
    this.ViewByName = 'inherit';

  }
  onViewById() {
    this.ViewByID = 'inherit';
    this.ViewByName = 'none';

  }

  ChangeFilter() { 
    this.search = this.SearchFilter.controls['search'].value;
    this.SearchChanges();
  }
  SearchChanges() {
    this.getAllData(1);
  }
  getAllData(pageNo) { 
    this._SoloAdminMasterComponent.setLoading(true);
    this._TestService.GetPatientListforDataEntry(this.search,localStorage.getItem("FromDate"),localStorage.getItem("ToDate")).subscribe((res: any) => {
      this._SoloAdminMasterComponent.setLoading(false);
      this.DataList = res;
      console.log(this.DataList);
      this.changeDetection.detectChanges();
    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
      });
  }

  GetPatientAllTestDetail(Patient_Id) {
    this.selectedPatient_Id=Patient_Id;
    this._SoloAdminMasterComponent.setLoading(true);
    this._TestService.GetPatientAllTestDetail(Patient_Id).subscribe(
      (res: any) => {
        this.TestData = res;
        console.log(res[0].MarkComplete)
        if(res[0].MarkComplete=="Y"){
          
        }
        
        this.getTestEntry();
        this.changeDetection.detectChanges();
        this.getformularCalculationfor();
        this._SoloAdminMasterComponent.setLoading(false);
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
        if (res[0].MarkComplete == "R") {
          this.ReSample = "";
          this.rbtnReSample = true;
          this.rbtnAuntheticate = false;
          this.rbtnReRun = false;
          this.rbtnReRun = false;
        } else if (res[0].MarkComplete == "Y") {
          this.rbtnReSample = false;
          this.rbtnAuntheticate = true;
          this.rbtnReRun = false;
          this.rbtnReRun = false;
        } else if (res[0].MarkComplete == "V") {
          this.rbtnReSample = false;
          this.rbtnAuntheticate = false;
          this.rbtnValidate = true;
          this.rbtnReRun = false;
        } else if (res[0].MarkComplete == "R") {
          this.ReRun = "";
          this.rbtnReSample = false;
          this.rbtnAuntheticate = false;
          this.rbtnValidate = false;
          this.rbtnReRun = true;
        }
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

  getTestEntry() {
    this.currentNumber = 0;
    this.EntryOFTest = [];
    for (let i: number = 0; i < this.TestData.length; i++) {
      if (this.currentTest != this.TestData[i].TESTMST_Name) {
        this.currentTest = this.TestData[i].TESTMST_Name
        let no = this.currentNumber;
        for (let j: number = 0; j < this.TestData.length; j++) {
          if (this.TestData[j].TESTMST_Name == this.currentTest) {
            no = no + 1;
          }
        }
        this.currentNumber = no;
        if (this.EntryOFTest.length == 0) {
          this.EntryOFTest.push({ TestName: this.TestData[i].TESTMST_Name, Number: no });
        } else {
          var isPresent = this.EntryOFTest.some(function (el) { return el.TestName === "this.TestData[i].TESTMST_Name" });
          if (isPresent == false) {
            this.EntryOFTest.push({ TestName: this.TestData[i].TESTMST_Name, Number: no });
          }
        }

      }
      this.changeDetection.detectChanges();
    }
  }


  radioChange(event) {
    this.TestData[0].MarkComplete = event.value
    if (event.value == "C") {
      this.ReSample = "";
      this.ReRun = "none";
      this.rbtnReSample = true;
      this.rbtnAuntheticate = false;
      this.rbtnReRun = false;
      this.rbtnReRun = false;
    } else if (event.value == "A") {
      this.ReSample = "none";
      this.ReRun = "none";
      this.rbtnReSample = false;
      this.rbtnAuntheticate = true;
      this.rbtnReRun = false;
      this.rbtnReRun = false;
    } else if (event.value == "V") {
      this.ReSample = "none";
      this.ReRun = "none";
      this.rbtnReSample = false;
      this.rbtnAuntheticate = false;
      this.rbtnValidate = true;
      this.rbtnReRun = false;
    } else if (event.value == "R") {
      this.ReSample = "none";
      this.ReRun = "";
      this.rbtnReSample = false;
      this.rbtnAuntheticate = false;
      this.rbtnValidate = false;
      this.rbtnReRun = true;
    }
  }

  ValueChanged(List, Value,Index) {
    this.CurrentIndex=Index;
    let StartIndex =Index- List.TESTDET_FieldNo ;
    let valueList: any = [];
    this.TestData[Index].DOCDET_tFieldValue = Value;
    List.DOCDET_tFieldValue = Value;
    for (let i: number = 0; i < this.formularCalculation.length; i++) {
      if (List.TESTDET_FieldNo == this.formularCalculation[i].value) {
        if (this.formularCalculation[i].formula != "") {
          valueList.push({
            Key: this.formularCalculation[i].key,
            formula: this.formularCalculation[i].formula,
            TESTMST_Name: this.formularCalculation[i].TESTMST_Name
          });
        }
      }
    }
    this.updateValueByFormulaField(valueList,StartIndex);
  }

  onGetDropDownList(Index) {
    this.CollectionCenter.patchValue(this.TestData[Index].DOCDET_tFieldValue);
    this.CollectionCenter.patchValue(this.TestData[Index].DOCDET_tFieldValue, { emitEvent: true, onlySelf: true });
    if (this.TestData[Index].PREDEFVALModel != null && this.TestData[Index].PREDEFVALModel != '') {
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
    let result = List.filter(DropDown => DropDown.PREDEFVAL_Value.toLowerCase().includes(Value.toLowerCase())).slice(0, 10);
    return result;
  }


  ChangeDDlValue(List, Value, Index) {
      this.TestData[Index].DOCDET_tFieldValue = Value;
      List.DOCDET_tFieldValue = Value;
      this.onGetDropDownList(Index );
 
  }

  updateValueByFormulaField(valueList,StartIndex) {
    let tempValue;
    let Working: boolean = false;
    for (let i: number = 0; i < valueList.length; i++) {
      Working = false;
      for (let j: number = 0; j < valueList[i].formula.length; j++) {
        if (valueList[i].formula[j] === "B") {
          let id =  parseInt(valueList[i].formula[j + 1])  +StartIndex;
          let DataToReplace = "B" + valueList[i].formula[j + 1] ;
          let DataToReplaceWith = 0;
          if (this.TestData[id].DOCDET_tFieldValue != "" && this.TestData[id].DOCDET_tFieldValue != null) {
            DataToReplaceWith = this.TestData[id].DOCDET_tFieldValue;
          }
          if (Working == false) {
            tempValue = valueList[i].formula.replace(DataToReplace, DataToReplaceWith);
            Working = true;
          } else {
            tempValue = tempValue.replace(DataToReplace, DataToReplaceWith);
          }
        }
      }
      let Rowid =parseInt( valueList[i].Key)  +StartIndex;
      this.TestData[Rowid].DOCDET_tFieldValue = parseFloat(eval(tempValue)).toFixed(2);
    }
    this.UpdateValueWithLable(valueList,StartIndex);
  }

  onCheckboxClick(List, event) {
    List.Rerun = event.target.checked;
  }

  UpdateValueWithLable(valueList,StartIndex) {
    let tempValue;
    let Rowid
    let Working: boolean = false;
    for (let i: number = 0; i < valueList.length; i++) {
      for (let j: number = 0; j < this.formularCalculation.length; j++) {
        Working = false;
        if ((parseInt(valueList[i].Key )+StartIndex)== (parseInt(this.formularCalculation[j].value)+StartIndex)) {
         
          for (let k: number = 0; k < this.formularCalculation[j].formula.length; k++) {
            if (this.formularCalculation[j].formula[k] === "B") {
              let id =parseInt( this.formularCalculation[j].formula[k + 1] )+StartIndex ;
              let DataToReplace = "B" + this.formularCalculation[j].formula[k + 1];
              let DataToReplaceWith = 0;
              if (this.TestData[id ].DOCDET_tFieldValue != "" && this.TestData[id ].DOCDET_tFieldValue != null) {
                DataToReplaceWith = this.TestData[id  ].DOCDET_tFieldValue;
              }
              if (Working == false) {
                tempValue = this.formularCalculation[j].formula.replace(DataToReplace, DataToReplaceWith);
                Working = true;
              } else {
                tempValue = tempValue.replace(DataToReplace, DataToReplaceWith);
              }
            }
          }
          Rowid = parseInt( this.formularCalculation[j].key )+StartIndex - 1;
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
                let TempNumber=parseInt(this.TestData[i].TESTDET_FieldNo);
                    try {
                        this.formularCalculation.push({
                          key: this.TestData[i].TESTDET_FieldNo ,
                          value: this.TestData[i].TESTDET_sFormula[j + 1] ,
                          formula: this.TestData[i].TESTDET_sFormula,
                          TESTMST_Name: this.TestData[i].TESTMST_Name
                        });
                    } catch (error) {
                      console.log(error)
                    }
           }
        }
      }
      else if (this.TestData[i].TESTDET_FieldType == 1) {
        this.onGetDropDownList(i);
      }
      this.changeDetection.detectChanges();
    }
  }

onSubmit(){
  const formData = new FormData();
  
  this._PatientService.UpdateDocDetTestValue(this.TestData).subscribe((res: any) => {
        this._SoloAdminMasterComponent.setLoading(false); 
        if (res != 0) {
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
  
onCancel(){
  this.storage.remove('ID');
  this.router.navigateByUrl('Admin/PatientList');
}
SaveAndPrint(){
  this._PatientService.UpdateDocDetTestValueAndPrint(this.TestData).subscribe((res: any) => {
    this._SoloAdminMasterComponent.setLoading(false);
    console.log("Res ID" + res);
    console.log(res);
    this._SoloAdminMasterComponent.setLoading(false); 
    if (res != 0) {
       let  url:string =environment.ReportUrl+"/PatientTestReport.aspx?ID="+res;
       console.log(url);
       window.open(url, '_blank');
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

}   
