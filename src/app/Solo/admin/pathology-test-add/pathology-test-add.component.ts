import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { TestService } from 'src/app/Shared/TestService';
import { PatientService } from 'src/app/Shared/PatientService ';
import { ModalService } from 'src/app/CustomComponents/Modal/Solo_Admin';
import { CKEditorComponent } from 'ng2-ckeditor/ckeditor.component';

@Component({
  selector: 'app-pathology-test-add',
  templateUrl: './pathology-test-add.component.html',
  styleUrls: ['./pathology-test-add.component.scss']
})

export class PathologyTestAddComponent implements OnInit {
  @ViewChild('content', { static: true }) content: TemplateRef<any>;
  TestTypeId: any;

  name = 'ng2-ckeditor';
  ckeConfig: CKEDITOR.config;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: CKEditorComponent;
  

  constructor(public Datepipe: DatePipe, private modalService: ModalService, private _TestService: TestService, private _PatientService: PatientService,
    private changeDetection: ChangeDetectorRef,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
    , private router: Router, private alertService: AlertService,
    private _SoloAdminMasterComponent: SoloAdminMasterComponent) {
      
    if (this.storage.get('ID') != null && this.storage.get('ID') != '') {
      localStorage.setItem('PageTitle', "Pathology Test Edit");
    }else{
      localStorage.setItem('PageTitle', "Add Pathology Test");

    }
  }
  Display: string = 'List';
  SelectedTestCatagory = 1;
  SelectedTestFormat = 'FORMAT01';
  TestTypeList: any = [];
  AllTESTDETList: any = [];
  PreviewsDisplayType:string;
  SearchAllTESTDETList ='';
  SelectedTestList: any = [];
  NumaricColumn: any = [];
  SelectedSign = "+";
  SelectedColoum;
  SelectRowOfTest;
  OfflineSavedData = [];

  f_TestName;
  f_TestType = 1;
  f_ReportHeading;
  f_Rate;
  f_LumsumComm;
  f_Comm;
  f_Alies;
  f_TestCost;
  f_TAT;
  f_TestComment;
  f_Prerequisition;
  f_ActiveInactive = false;
  f_Special = false;
  f_Isimagekitcompulsary = false;
  f_isNABL = false;


  A_id: number;
  A_FieldName
  A_Alies
  A_FieldStyle = '0';
  A_FieldType = '0';
  A_Male
  A_MaleMinimumValue
  A_MaleMaximumValue
  A_1Year
  A_1YearMinimumValue
  A_1YearMaximumValue
  A_6Year
  A_6YearMinimumValue
  A_6YearMaximumValue
  A_13Year
  A_13YearMinimumValue
  A_13YearMaximumValue
  A_Female
  A_FemaleMinimumValue
  A_FemaleMaximumValue
  A_Unit
  A_UnitMinimumValue
  A_UnitMaximumValue
  A_GroupNo
  A_GroupName
  A_FieldDescription
  A_DefaultValue
  A_Compulsary
  A_Validate
  A_sFormula
  FormatList = ['FORMAT01', 'FORMAT02', 'FORMAT03', 'FORMAT04', 'FORMAT05', 'FORMAT06', 'FORMAT07', 'FORMAT01', 'FORMAT01']
  TESTMST_CurrentId = 0;
  ngOnInit() {
    this.SetFormat();
    if (this.storage.get('ID') != null && this.storage.get('ID') != '') {
      this.TESTMST_CurrentId = this.storage.get('ID');
      this.getPathoTestData();
    }
    this.getTestTypeList();
  }
  ngAfterViewInit() {
    this.openRecoveryModal();

  }
  PredefineValuelist: any = [];
  addPredefineValueInlist() {
    this.PredefineValuelist.push({ PREDEFVAL_Value: '' });
    this.changeDetection.detectChanges();
  }
  removePredefineValueFromlist(id) {
    this.PredefineValuelist.splice(id, 1);
    this.changeDetection.detectChanges();
  }


  SetFormat() {
    this.FormatList = []
    for (let count = 1; count < 100; count++) {
      let temp;
      if (count < 10) {
        temp = 'FORMAT0' + count;
      } else {
        temp = 'FORMAT' + count;
      }
      this.FormatList.push(temp);
    }
  }

  GetAllTESTDET() {
    this.PreviewsDisplayType=this.Display;
    this.Display='Browse';
    // this._SoloAdminMasterComponent.setLoading(true);
    this._PatientService.GetAllTESTDETForPathTest(this.SearchAllTESTDETList).subscribe(
      (res: any) => {
        if (res != null) {
          this.AllTESTDETList = res;
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
 
getDatafromBrowse(i){
  this.A_FieldName = this.AllTESTDETList[i].TESTDET_FieldName;
  this.A_Alies = this.AllTESTDETList[i].TESTDET_sAlias;
  this.A_FieldStyle = this.AllTESTDETList[i].TESTDET_FieldStyle;
  this.A_FieldType = this.AllTESTDETList[i].TESTDET_FieldType;
  this.A_Male = this.AllTESTDETList[i].TESTDET_NormalValue;
  this.A_MaleMinimumValue = this.AllTESTDETList[i].TESTDET_MinValue;
  this.A_MaleMaximumValue = this.AllTESTDETList[i].TESTDET_MaxValue;
  this.A_1Year = this.AllTESTDETList[i].TESTDET_ANormalValue;
  this.A_1YearMinimumValue = this.AllTESTDETList[i].TESTDET_AMinValue;
  this.A_1YearMaximumValue = this.AllTESTDETList[i].TESTDET_AMaxValue;
  this.A_6Year = this.AllTESTDETList[i].TESTDET_BNormalValue;
  this.A_6YearMinimumValue = this.AllTESTDETList[i].TESTDET_BMinValue;
  this.A_6YearMaximumValue = this.AllTESTDETList[i].TESTDET_BMaxValue;
  this.A_13Year = this.AllTESTDETList[i].TESTDET_CNormalValue;
  this.A_13YearMinimumValue = this.AllTESTDETList[i].TESTDET_CMinValue;
  this.A_13YearMaximumValue = this.AllTESTDETList[i].TESTDET_CMaxValue;
  this.A_Female = this.AllTESTDETList[i].TESTDET_DNormalValue;
  this.A_FemaleMinimumValue = this.AllTESTDETList[i].TESTDET_DMinValue;
  this.A_FemaleMaximumValue = this.AllTESTDETList[i].TESTDET_DMaxValue;
  this.A_Unit = this.AllTESTDETList[i].TESTDET_sUnit;
  this.A_UnitMinimumValue = this.AllTESTDETList[i].TESTDET_MinLimit;
  this.A_UnitMaximumValue = this.AllTESTDETList[i].TESTDET_MaxLimit;
  this.A_GroupNo = this.AllTESTDETList[i].TESTDET_GroupNo;
  this.A_GroupName = this.AllTESTDETList[i].TESTDET_GroupName;
  this.A_FieldDescription = this.AllTESTDETList[i].TESTDET_Description;
  this.A_DefaultValue = this.AllTESTDETList[i].TESTDET_sDefault;
  this.A_Compulsary = this.AllTESTDETList[i].TESTDET_Compulsory;
  this.A_Validate = this.AllTESTDETList[i].TESTDET_Validate;
  this.A_sFormula = this.AllTESTDETList[i].TESTDET_sFormula;
  this.PredefineValuelist = this.AllTESTDETList[i].PREDEFVALModel;
  this.Display=this.PreviewsDisplayType ;
}

CloseBrowse(){
  this.Display=this.PreviewsDisplayType ;
}


  getTestTypeList() {
    this._SoloAdminMasterComponent.setLoading(true);

    let model = {
      PageNo: -3,
      PageSize: 0,
      Keyword: null,
    }
    this._TestService.GetAllTestTypeDetails(model).subscribe(
      (res: any) => {
        if (res != null) {
          this.TestTypeList = res;
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

  getPathoTestData() {
    this._SoloAdminMasterComponent.setLoading(true);
    this._PatientService.GetTestDetailByTestMstID(this.TESTMST_CurrentId).subscribe(
      (res: any) => {
        if (res != null) {

          console.log(res)
          this.SelectedTestList = res;
          this.TESTMST_CurrentId = res[0].TESTMST_CurrentId;
          this.f_TestName = res[0].TESTMST_Name;
          this.SelectedTestFormat = res[0].TESTMST_PrintFormat;
          this.f_Rate = res[0].TESTMST_Rate;
          this.f_ReportHeading = res[0].TESTMST_ReportHeading;
          this.f_TestCost = res[0].TESTMST_Testcost;
          this.f_Alies = res[0].TESTMST_Alias;
          this.f_Comm = res[0].TESTMST_Percentage;
          this.f_LumsumComm = res[0].TESTMST_Lumsum;
          this.f_ActiveInactive = res[0].Active;
          this.f_TestComment = res[0].Comments;
          this.f_Special = res[0].SpecialTest;
          this.f_Prerequisition = res[0].TESTMST_sample;
          this.f_Isimagekitcompulsary = res[0].IsKitImageCompulsary;
          this.f_TAT = res[0].TAT;
          this.f_isNABL = res[0].IsNABL;
          this.TestTypeId=res[0].TESTMST_TestTypeId;
          
          this.f_TestType=res[0].TESTMST_CatType;
        //  this.f_TestType = this.TestTypeList.find(x => x.TestTypeName == res[0].TestTypeName).TestTypeId;
          if (res[0].TESTMST_CatType == 'R' || res[0].TESTMST_TestTypeId == 1) {
            this.SelectedTestCatagory = 1;
          }
          if (res[0].TESTMST_CatType == 'S' || res[0].TESTMST_TestTypeId == 2) {
            this.SelectedTestCatagory = 2;
          }
          if (res[0].TESTMST_CatType == 'M' || res[0].TESTMST_TestTypeId == 3) {
            this.SelectedTestCatagory = 3;
          }
          if (res[0].TESTMST_CatType == '0' || res[0].TESTMST_TestTypeId == 4) {
            this.SelectedTestCatagory = 4;
          }
          if (res[0].TESTMST_CatType == 'H' || res[0].TESTMST_TestTypeId == 5) {
            this.SelectedTestCatagory = 5;
          }
          if (res[0].TESTMST_CatType == 'E' || res[0].TESTMST_TestTypeId == 6) {
            this.SelectedTestCatagory = 6;
          }
          if (res[0].TESTMST_CatType == 'E1' || res[0].TESTMST_TestTypeId == 7) {
            this.SelectedTestCatagory = 7;
          }
          this.setNumericColumn(res.length);
        }
        this._SoloAdminMasterComponent.setLoading(false);
      },
      err => {
        console.log(err);
        this._SoloAdminMasterComponent.setLoading(false);
      }
    );
  }

  changeView(value) {
    this.Display = value;
    if (value == 'Add') {
      this.A_id = null;
      this.A_FieldName = '';
      this.A_Alies = '';
      this.A_FieldStyle = '0';
      this.A_FieldType = '0';
      this.A_Male = '';
      this.A_MaleMinimumValue = '';
      this.A_MaleMaximumValue = '';
      this.A_1Year = '';
      this.A_1YearMinimumValue = '';
      this.A_1YearMaximumValue = '';
      this.A_6Year = '';
      this.A_6YearMinimumValue = '';
      this.A_6YearMaximumValue = '';
      this.A_13Year = '';
      this.A_13YearMinimumValue = '';
      this.A_13YearMaximumValue = '';
      this.A_Female = '';
      this.A_FemaleMinimumValue = '';
      this.A_FemaleMaximumValue = '';
      this.A_Unit = '';
      this.A_UnitMinimumValue = '';
      this.A_UnitMaximumValue = '';
      this.A_GroupNo = '';
      this.A_GroupName = '';
      this.A_FieldDescription = '';
      this.A_DefaultValue = '';
      this.A_Compulsary = false;
      this.A_Validate = false;
      this.A_sFormula = '';
      this.PredefineValuelist = [];
      this.setNumericColumn(this.SelectedTestList.length);
    }

    if (value == 'Edit') {
      this.A_FieldName = this.SelectedTestList[this.A_id].TESTDET_FieldName;
      this.A_Alies = this.SelectedTestList[this.A_id].TESTDET_sAlias;
      this.A_FieldStyle = this.SelectedTestList[this.A_id].TESTDET_FieldStyle;
      this.A_FieldType = this.SelectedTestList[this.A_id].TESTDET_FieldType;
      this.A_Male = this.SelectedTestList[this.A_id].TESTDET_NormalValue;
      this.A_MaleMinimumValue = this.SelectedTestList[this.A_id].TESTDET_MinValue;
      this.A_MaleMaximumValue = this.SelectedTestList[this.A_id].TESTDET_MaxValue;
      this.A_1Year = this.SelectedTestList[this.A_id].TESTDET_ANormalValue;
      this.A_1YearMinimumValue = this.SelectedTestList[this.A_id].TESTDET_AMinValue;
      this.A_1YearMaximumValue = this.SelectedTestList[this.A_id].TESTDET_AMaxValue;
      this.A_6Year = this.SelectedTestList[this.A_id].TESTDET_BNormalValue;
      this.A_6YearMinimumValue = this.SelectedTestList[this.A_id].TESTDET_BMinValue;
      this.A_6YearMaximumValue = this.SelectedTestList[this.A_id].TESTDET_BMaxValue;
      this.A_13Year = this.SelectedTestList[this.A_id].TESTDET_CNormalValue;
      this.A_13YearMinimumValue = this.SelectedTestList[this.A_id].TESTDET_CMinValue;
      this.A_13YearMaximumValue = this.SelectedTestList[this.A_id].TESTDET_CMaxValue;
      this.A_Female = this.SelectedTestList[this.A_id].TESTDET_DNormalValue;
      this.A_FemaleMinimumValue = this.SelectedTestList[this.A_id].TESTDET_DMinValue;
      this.A_FemaleMaximumValue = this.SelectedTestList[this.A_id].TESTDET_DMaxValue;
      this.A_Unit = this.SelectedTestList[this.A_id].TESTDET_sUnit;
      this.A_UnitMinimumValue = this.SelectedTestList[this.A_id].TESTDET_MinLimit;
      this.A_UnitMaximumValue = this.SelectedTestList[this.A_id].TESTDET_MaxLimit;
      this.A_GroupNo = this.SelectedTestList[this.A_id].TESTDET_GroupNo;
      this.A_GroupName = this.SelectedTestList[this.A_id].TESTDET_GroupName;
      this.A_FieldDescription = this.SelectedTestList[this.A_id].TESTDET_Description;
      this.A_DefaultValue = this.SelectedTestList[this.A_id].TESTDET_sDefault;
      this.A_Compulsary = this.SelectedTestList[this.A_id].TESTDET_Compulsory;
      this.A_Validate = this.SelectedTestList[this.A_id].TESTDET_Validate;
      this.A_sFormula = this.SelectedTestList[this.A_id].TESTDET_sFormula;
      if( this.SelectedTestList[this.A_id].PREDEFVALModel!=null){
        this.PredefineValuelist = this.SelectedTestList[this.A_id].PREDEFVALModel;
      }
      else{
        this.PredefineValuelist = []
      }
      this.setNumericColumn(this.A_id);
    }
    this.saveworking();
    this.changeDetection.detectChanges();
  }



  setNumericColumn(finalcount) {
    this.NumaricColumn = []
    for (let count: number = 0; count < finalcount; count++) {
      if (this.SelectedTestList[count].TESTDET_FieldStyle == 1) {
        this.NumaricColumn.push('B' + (count + 1));
      }
    }
    this.changeDetection.detectChanges();
  }

  selectRow(id) {
    this.SelectRowOfTest = id;
  }

  array_move(move) {
    let new_index;
    if (move == 'up') {
      new_index = this.SelectRowOfTest - 1;
    } else {
      new_index = this.SelectRowOfTest + 1;
    }

    if (new_index < this.SelectedTestList.length && new_index > -1) {
      this.SelectedTestList.splice(new_index, 0, this.SelectedTestList.splice(this.SelectRowOfTest, 1)[0]);
    }
    this.SelectRowOfTest = new_index;
  };

  addColumnInFormula() {

    if (this.A_sFormula == null) {
      this.A_sFormula = '';
    }
    this.A_sFormula = this.A_sFormula + this.SelectedColoum;
  }

  addColumnInOperator() {
    if (this.A_sFormula == null) {
      this.A_sFormula = '';
    }
    this.A_sFormula = this.A_sFormula + this.SelectedSign;
  }


  AddFileldToList() {
    let Id = 0;
    this.alertService.clear();
    if (this.A_id != null) {
      Id = this.SelectedTestList.length
    } else {
      Id = this.A_id;
    }


    if(this.A_GroupNo!=null && this.A_GroupNo!=''){
      if (!this.isNumeric(this.A_GroupNo)) {
        this.alertService.warn("Group number should be numeric");
        return;
      }

    }
    if(this.A_MaleMaximumValue!=null && this.A_MaleMaximumValue!=''){
      if (!this.isNumeric(this.A_MaleMaximumValue)) {
        this.alertService.warn("Male maximum value should be numeric");
        return;
      }
      
    }
    if(this.A_MaleMinimumValue!=null && this.A_MaleMinimumValue!=''){
      if (!this.isNumeric(this.A_MaleMinimumValue)) {
        this.alertService.warn("Male minimum value should be numeric");
        return;
      }
      
    }
    if(this.A_1YearMaximumValue!=null && this.A_1YearMaximumValue!=''){
      if (!this.isNumeric(this.A_1YearMaximumValue)) {
        this.alertService.warn("<1 Year maximum value should be numeric");
        return;
      }
      
    }
    if(this.A_1YearMinimumValue!=null && this.A_1YearMinimumValue!=''){
      if (!this.isNumeric(this.A_1YearMinimumValue)) {
        this.alertService.warn("<1 Year minimum value should be numeric");
        return;
      }
      
    }
    
    if(this.A_13YearMaximumValue!=null && this.A_13YearMaximumValue!=''){
      if (!this.isNumeric(this.A_13YearMaximumValue)) {
        this.alertService.warn("6 and <13 maximum value should be numeric");
        return;
      }
      
    }
    if(this.A_13YearMinimumValue!=null && this.A_13YearMinimumValue!=''){
      if (!this.isNumeric(this.A_13YearMinimumValue)) {
        this.alertService.warn("6 and <13 minimum value should be numeric");
        return;
      }
    }
    if(this.A_6YearMaximumValue!=null && this.A_6YearMaximumValue!=''){
      if (!this.isNumeric(this.A_6YearMaximumValue)) {
        this.alertService.warn("1 and <6  maximum value should be numeric");
        return;
      }
      
    }
    if(this.A_6YearMinimumValue!=null && this.A_6YearMinimumValue!=''){
      if (!this.isNumeric(this.A_6YearMinimumValue)) {
        this.alertService.warn("1 and <6  minimum value should be numeric");
        return;
      }
    }
    if(this.A_FemaleMaximumValue!=null && this.A_FemaleMaximumValue!=''){
      if (!this.isNumeric(this.A_FemaleMaximumValue)) {
        this.alertService.warn("Female maximum value should be numeric");
        return;
      }
      
    }
    if(this.A_FemaleMinimumValue!=null && this.A_FemaleMinimumValue!=''){
      if (!this.isNumeric(this.A_FemaleMinimumValue)) {
        this.alertService.warn("Female minimum value should be numeric");
        return;
      }
    }
    if(this.A_UnitMaximumValue!=null && this.A_UnitMaximumValue!=''){
      if (!this.isNumeric(this.A_UnitMaximumValue)) {
        this.alertService.warn("Maximum Limit value should be numeric");
        return;
      }
      
    }
    if(this.A_UnitMinimumValue!=null && this.A_UnitMinimumValue!=''){
      if (!this.isNumeric(this.A_UnitMinimumValue)) {
        this.alertService.warn("Minimum Limit value should be numeric");
        return;
      }
    }
    let model = {

      TESTDET_FieldNo: Id
      , TESTDET_FieldName: this.A_FieldName
      , TESTDET_FieldType: this.A_FieldType
      , TESTDET_NormalValue: this.A_Male
      , TESTDET_Description: this.A_FieldDescription
      , TESTDET_GroupName: this.A_GroupName
      , TESTDET_GroupNo: this.A_GroupNo
      , TESTDET_FieldStyle: this.A_FieldStyle
      , TESTDET_Compulsory: this.A_Compulsary
      , TESTDET_MaxValue: this.A_MaleMaximumValue
      , TESTDET_MinValue: this.A_MaleMinimumValue
      , TESTDET_sDefault: this.A_DefaultValue
      , TESTDET_sAlias: this.A_Alies
      , TESTDET_sUnit: this.A_Unit
      , PREDEFVALModel: this.PredefineValuelist
      , TESTDET_sFormula: this.A_sFormula
      , TESTDET_MaxLimit: this.A_UnitMaximumValue
      , TESTDET_MinLimit: this.A_UnitMinimumValue
      , TESTDET_Validate: this.A_Validate
      , TESTDET_ANormalValue: this.A_1Year
      , TESTDET_BNormalValue: this.A_6Year
      , TESTDET_CNormalValue: this.A_13Year
      , TESTDET_DNormalValue: this.A_Female
      , TESTDET_AMaxValue: this.A_1YearMaximumValue
      , TESTDET_AMinValue: this.A_1YearMinimumValue
      , TESTDET_BMaxValue: this.A_6YearMaximumValue
      , TESTDET_BMinValue: this.A_6YearMinimumValue
      , TESTDET_CMaxValue: this.A_13YearMaximumValue
      , TESTDET_CMinValue: this.A_13YearMinimumValue
      , TESTDET_DMaxValue: this.A_FemaleMaximumValue
      , TESTDET_DMinValue: this.A_FemaleMinimumValue
      // , ValueForNormal: this.n
    }
    if (this.A_id != null) {
      this.SelectedTestList[this.A_id] = model;
    } else {
      this.SelectedTestList.push(model);
    }
    this.changeDetection.detectChanges();
    this.changeView('List');
  }

  Edit(id) {
    this.A_id = id
    this.changeView('Edit');
  }

  onSubmit() {

    this.alertService.clear();
   
    if(this.f_Rate!=null && this.f_Rate!=''){
      if (!this.isNumeric(this.f_Rate)) {
        this.alertService.warn("Rate value should be numeric");
        return;
      }
    }
    if(this.f_Comm!=null && this.f_Comm!=''){
      if (!this.isNumeric(this.f_Comm)) {
        this.alertService.warn("% Comm value should be numeric");
        return;
      }
    }
    if(this.f_LumsumComm!=null && this.f_LumsumComm!=''){
      if (!this.isNumeric(this.f_LumsumComm)) {
        this.alertService.warn("Lumsum Comm value should be numeric");
        return;
      }
    }
    if(this.f_TestCost!=null && this.f_TestCost!=''){
      if (!this.isNumeric(this.f_TestCost)) {
        this.alertService.warn("Test Cost value should be numeric");
        return;
      }
    } 
    let PathalogyTestDetails = []
    for (let count: number = 0; count < this.SelectedTestList.length; count++) {
      let TESTDET_CurrentId = 0;
      if (this.SelectedTestList[count].TESTDET_CurrentId != null && this.SelectedTestList[count].TESTDET_CurrentId != '') {
        TESTDET_CurrentId = this.SelectedTestList[count].TESTDET_CurrentId;
      }
      let TESTDET_TestMasterID = 0;
      if (this.SelectedTestList[count].TESTDET_TestMasterID != null && this.SelectedTestList[count].TESTDET_TestMasterID != '') {
        TESTDET_TestMasterID = this.SelectedTestList[count].TESTDET_TestMasterID;
      }
      PathalogyTestDetails.push({
        'TESTDET_CurrentId': TESTDET_CurrentId,
        'TESTDET_TestMasterID': TESTDET_TestMasterID,
        'TESTDET_FieldNo': (count + 1),
        'TESTDET_FieldName': this.SelectedTestList[count].TESTDET_FieldName,
        'TESTDET_FieldType': this.SelectedTestList[count].TESTDET_FieldType,
        'TESTDET_NormalValue': this.SelectedTestList[count].TESTDET_NormalValue,
        'TESTDET_Description': this.SelectedTestList[count].TESTDET_Description,
        'TESTDET_GroupName': this.SelectedTestList[count].TESTDET_GroupName,
        'TESTDET_GroupNo': this.SelectedTestList[count].TESTDET_GroupNo,
        'TESTDET_FieldStyle': this.SelectedTestList[count].TESTDET_FieldStyle,
        'TESTDET_Compulsory': this.SelectedTestList[count].TESTDET_Compulsory,
        'TESTDET_MaxValue': this.SelectedTestList[count].TESTDET_MaxValue,
        'TESTDET_MinValue': this.SelectedTestList[count].TESTDET_MinValue,
        'TESTDET_sDefault': this.SelectedTestList[count].TESTDET_sDefault,
        'TESTDET_sAlias': this.SelectedTestList[count].TESTDET_sAlias,
        'TESTDET_sUnit': this.SelectedTestList[count].TESTDET_sUnit,
        'TESTDET_sFormula': this.SelectedTestList[count].TESTDET_sFormula,
        'TESTDET_MaxLimit': this.SelectedTestList[count].TESTDET_MaxLimit,
        'TESTDET_MinLimit': this.SelectedTestList[count].TESTDET_MinLimit,
        'TESTDET_Validate': this.SelectedTestList[count].TESTDET_Validate,
        'TESTDET_ANormalValue': this.SelectedTestList[count].TESTDET_ANormalValue,
        'TESTDET_BNormalValue': this.SelectedTestList[count].TESTDET_BNormalValue,
        'TESTDET_CNormalValue': this.SelectedTestList[count].TESTDET_CNormalValue,
        'TESTDET_DNormalValue': this.SelectedTestList[count].TESTDET_DNormalValue,
        'TESTDET_AMaxValue': this.SelectedTestList[count].TESTDET_AMaxValue,
        'TESTDET_AMinValue': this.SelectedTestList[count].TESTDET_AMinValue,
        'TESTDET_BMaxValue': this.SelectedTestList[count].TESTDET_BMaxValue,
        'TESTDET_BMinValue': this.SelectedTestList[count].TESTDET_BMinValue,
        'TESTDET_CMaxValue': this.SelectedTestList[count].TESTDET_CMaxValue,
        'TESTDET_CMinValue': this.SelectedTestList[count].TESTDET_CMinValue,
        'TESTDET_DMaxValue': this.SelectedTestList[count].TESTDET_DMaxValue,
        'TESTDET_DMinValue': this.SelectedTestList[count].TESTDET_DMinValue,
        'TESTDET_TestTypeId': this.f_TestType,
        'TESTDET_CatTypeId': this.SelectedTestCatagory,
        'ValueForNormal': this.SelectedTestList[count].TESTDET_NormalValue,
        'PREDEFVALModel': this.SelectedTestList[count].PREDEFVALModel,
      });
    }
    let PathalogyTestMaster = {

      'TESTMST_CurrentId': this.TESTMST_CurrentId,
      'TESTMST_Name': this.f_TestName,
      'TESTMST_PrintFormat': this.SelectedTestFormat,
      'TESTMST_Rate': this.f_Rate,
      'TESTMST_ReportHeading': this.f_ReportHeading,
      'Type': 'P',
      'TESTMST_Testcost': this.f_TestCost,
      'TESTMST_Alias': this.f_Alies,
      'TESTMST_Percentage': this.f_Comm,
      'TESTMST_Lumsum': this.f_LumsumComm,
      'Active': this.f_ActiveInactive,
      'Comments': this.f_TestComment,
      'TESTMST_TestTypeId': this.f_TestType,
      'TESTMST_CatType': this.SelectedTestCatagory,
      'SpecialTest': this.f_Special,
      'TESTMST_sample': this.f_Prerequisition,
      'IsKitImageCompulsary': this.f_Isimagekitcompulsary,
      'TAT': this.f_TAT,
      'IsNABL': this.f_isNABL,
      'TESTMST_Companyid': 0,
      'PathalogyTestDetails': PathalogyTestDetails,
      'UserId':localStorage.getItem("LoginByID"),
    }
  
    
    if (this.TESTMST_CurrentId != null && this.TESTMST_CurrentId != 0) {
      this.update(PathalogyTestMaster);
    } else {
      this.insert(PathalogyTestMaster);
    }
  }


  insert(modal) {
    debugger;
   
    if(typeof modal.TESTMST_Name == 'undefined' || modal.TESTMST_Name == '')
    {
      alert("Please Enter Test Name");
        return;
    }
    this._SoloAdminMasterComponent.setLoading(true);
    this._TestService.InsertPathaLogyTest(modal).subscribe(
      (res: any) => {
        if (res != 0) {
          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Pathology test Created Succesfully"); 
          this.alertService.error("Test Created Successfully..!");
          this.router.navigateByUrl('Admin/PathologyTestList');
        }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Test not added.');
        else
          console.log(err);
      }
    );
  }

  update(modal) {
    this._SoloAdminMasterComponent.setLoading(true);
    this._TestService.UpdatePathaLogyTest(modal).subscribe(
      (res: any) => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (res != 0) {
          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Pathology test Updated Succesfully"); 
          this.alertService.error("Test Created Successfully..!");
          this.router.navigateByUrl('Admin/PathologyTestList');
        }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Test not update.');
        else
          console.log(err);
      }
    );
  }

  Back() {
    this.storage.remove('ID');
    this.router.navigateByUrl('Admin/PathologyTestList');
  }

  saveworking() {

    this.alertService.clear();
    if(this.f_Rate!=null && this.f_Rate!=''){
      if (!this.isNumeric(this.f_Rate)) {
        this.alertService.warn("Rate value should be numeric");
        return;
      }
    }
    if(this.f_Comm!=null && this.f_Comm!=''){
      if (!this.isNumeric(this.f_Comm)) {
        this.alertService.warn("% Comm value should be numeric");
        return;
      }
    }
    if(this.f_LumsumComm!=null && this.f_LumsumComm!=''){
      if (!this.isNumeric(this.f_LumsumComm)) {
        this.alertService.warn("Lumsum Comm value should be numeric");
        return;
      }
    }
    if(this.f_TestCost!=null && this.f_TestCost!=''){
      if (!this.isNumeric(this.f_TestCost)) {
        this.alertService.warn("Test Cost value should be numeric");
        return;
      }
    } 
    let PathalogyTestMaster = {
      'TESTMST_CurrentId': this.TESTMST_CurrentId,
      'f_TestName': this.f_TestName,
      'SelectedTestFormat': this.SelectedTestFormat,
      'f_Rate': this.f_Rate,
      'f_ReportHeading': this.f_ReportHeading,
      'f_TestCost': this.f_TestCost,
      'f_Alies': this.f_Alies,
      'f_Comm': this.f_Comm,
      'f_LumsumComm': this.f_LumsumComm,
      'f_ActiveInactive': this.f_ActiveInactive,
      'f_TestComment': this.f_TestComment,
      'f_TestType': this.f_TestType,
      'SelectedTestCatagory': this.SelectedTestCatagory,
      'f_Special': this.f_Special,
      'f_Prerequisition': this.f_Prerequisition,
      'f_Isimagekitcompulsary': this.f_Isimagekitcompulsary,
      'f_TAT': this.f_TAT,
      'f_isNABL': this.f_isNABL,
      'UserId':localStorage.getItem('LoginByID')
    }
    this.savedataforOfflineuse(PathalogyTestMaster, "PathalogyTestMaster");
    this.savedataforOfflineuse(this.SelectedTestList, "SelectedTestList");
  }

  getSavedData() {
    this.getDataSavedINOffline('SelectedTestList');
    this.getDataSavedINOffline('PathalogyTestMaster');
  }

   isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

  savedataforOfflineuse(Model, name) {
    let stringCopy
    try {
      stringCopy = JSON.stringify(Model);
    } catch (err) {
      //error handling for bad form submission
      console.debug(err);
      return;
    }
    localStorage[name] = stringCopy;
  }


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getDataSavedINOffline(name) {
    if (localStorage.getItem(name) === null) {
      return [];
    }
    try {
      if (name == 'SelectedTestList') {
        this.SelectedTestList = JSON.parse(localStorage.getItem(name));
      } else if (name == 'PathalogyTestMaster') {
        let data = JSON.parse(localStorage.getItem(name));
        this.TESTMST_CurrentId = data.TESTMST_CurrentId;
        this.f_TestName = data.f_TestName;
        this.SelectedTestFormat = data.SelectedTestFormat;
        this.f_Rate = data.f_Rate;
        this.f_ReportHeading = data.f_ReportHeading;
        this.f_TestCost = data.f_TestCost;
        this.f_Alies = data.f_Alies;
        this.f_Comm = data.f_Comm;
        this.f_LumsumComm = data.f_LumsumComm;
        this.f_ActiveInactive = data.f_ActiveInactive;
        this.f_TestComment = data.f_TestComment;
        this.f_TestType = data.f_TestType;
        this.SelectedTestCatagory = data.SelectedTestCatagory;
        this.f_Special = data.f_Special;
        this.f_Prerequisition = data.f_Prerequisition;
        this.f_Isimagekitcompulsary = data.f_Isimagekitcompulsary;
        this.f_TAT = data.f_TAT;
        this.f_isNABL = data.f_isNABL;
      }
      localStorage.removeItem(name);
      this.modalService.close("recovery-previourdata-1");
      this.changeDetection.detectChanges();
    } catch (err) {
      console.log(err);
    }

  }

  openRecoveryModal() {
    if (localStorage.getItem("SelectedTestList") !== null && (this.TESTMST_CurrentId == null || this.TESTMST_CurrentId == 0)) {
      this.modalService.open("recovery-previourdata-1");
    }

  }

  modelToRemoveTestFormat() {
    this.modalService.open("removetestformat");
  }

  closeModal() {
    this.modalService.close("removetestformat");

  }

  removeTestField() {
    this.SelectedTestList.splice(this.SelectRowOfTest, 1);
    this.saveworking();
    this.modalService.close("removetestformat");
  }

  closeRecoveryModal() {
    localStorage.removeItem('PathalogyTestMaster');
    localStorage.removeItem('SelectedTestList');
    this.modalService.close("recovery-previourdata-1");
  }

}


