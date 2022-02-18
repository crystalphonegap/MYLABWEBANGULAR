import { ViewChild, ViewEncapsulation, } from '@angular/core';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CKEditorComponent } from 'ng2-ckeditor/ckeditor.component';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { ModalService } from 'src/app/CustomComponents/Modal/Solo_Admin';
import { PatientService } from 'src/app/Shared/PatientService ';
import { TestService } from 'src/app/Shared/TestService';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { config } from 'process';

@Component({
  selector: 'app-radiology-test-add',
  templateUrl: './radiology-test-add.component.html',
  styleUrls: ['./radiology-test-add.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  
  
 
  
})
export class RadiologyTestAddComponent implements OnInit {
  name = 'ng2-ckeditor';
  ckeConfig: CKEDITOR.config;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: CKEditorComponent;


  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '300px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [

    ]
  };
  constructor(private _PatientService: PatientService, private modalService: ModalService, private _SoloAdminMasterComponent: SoloAdminMasterComponent, private _TestService: TestService,
    private changeDetection: ChangeDetectorRef, @Inject(SESSION_STORAGE) private storage: WebStorageService
    , private router: Router, private alertService: AlertService,) {       }
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
  f_isNABL = false;
  SelectedTestFormat = 'FORMATFOR'+localStorage.getItem("PageInfoType");
  TESTMST_CurrentId = 0;
  SelectedTestList: any = [];
  SelectedTestCatagory = 1;
  TestTypeList = [];
  SelectRowOfTest;
  TEST_sDefault;
  ngOnInit(): void {
    this.getTestTypeList();
    if (this.storage.get('ID') != null && this.storage.get('ID') != '') {
      this.TESTMST_CurrentId = this.storage.get('ID');
      this.getTestData();
      
    }
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true,
      removePlugins: 'exportpdf'
    };
    
  }
  
 
  setHtmlContain() {
    for (let count: number = 0; count < this.SelectedTestList.length; count++) {

console.log(this.SelectedTestList);
      this.SelectedTestList[count].TEST_sDefault = this.SelectedTestList[count].TEST_sDefault.replace(/\\par[d]?/g, "");
      this.SelectedTestList[count].TEST_sDefault = this.SelectedTestList[count].TEST_sDefault.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "")
      this.SelectedTestList[count].TEST_sDefault.replace(/\\'[0-9a-zA-Z]{2}/g, "").trim();


    }
  }

  getTestData() {
    this._SoloAdminMasterComponent.setLoading(true);
    this._PatientService.GetTestDetailByTestMstID(this.TESTMST_CurrentId).subscribe(
      (res: any) => {
        if (res != null) {
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
          this.f_TAT = res[0].TAT;
          this.f_isNABL = res[0].IsNABL;
          this.f_TestType = this.TestTypeList.find(x => x.TestTypeName == res[0].TestTypeName).TestTypeId;
          if (res[0].TESTMST_CatType == 'R' || res[0].TESTMST_CatType == 1) {
            this.SelectedTestCatagory = 1;
          }
          if (res[0].TESTMST_CatType == 'S' || res[0].TESTMST_CatType == 2) {
            this.SelectedTestCatagory = 2;
          }
          if (res[0].TESTMST_CatType == 'M' || res[0].TESTMST_CatType == 3) {
            this.SelectedTestCatagory = 3;
          }
          if (res[0].TESTMST_CatType == '0' || res[0].TESTMST_CatType == 4) {
            this.SelectedTestCatagory = 4;
          }
          if (res[0].TESTMST_CatType == 'H' || res[0].TESTMST_CatType == 5) {
            this.SelectedTestCatagory = 5;
          }
          if (res[0].TESTMST_CatType == 'E' || res[0].TESTMST_CatType == 6) {
            this.SelectedTestCatagory = 6;
          }
          if (res[0].TESTMST_CatType == 'E1' || res[0].TESTMST_CatType == 7) {
            this.SelectedTestCatagory = 7;
          }
        }
        this.setHtmlContain();
        this._SoloAdminMasterComponent.setLoading(false);
      },
      err => {
        console.log(err);
        this._SoloAdminMasterComponent.setLoading(false);
      }
    );
  }

  ngAfterViewInit() {
    this.openRecoveryModal();

  }

  getSavedData(){
    this.getDataSavedINOffline('AllSelectedTestList');
    this.getDataSavedINOffline('AllTestMaster');
  }

  getDataSavedINOffline(name) {
    if (localStorage.getItem(name) === null) {
      return [];
    } 
      try {
        if(name=='AllSelectedTestList'){
          this.SelectedTestList= JSON.parse(localStorage.getItem(name));
        }else if(name=='AllTestMaster') {
          let data =JSON.parse(localStorage.getItem(name));
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
          this.f_TAT = data.f_TAT;
          this.f_isNABL = data.f_isNABL;
        }
        localStorage.removeItem(name);
    localStorage.removeItem("recoverytestfor");

        this.modalService.close("recovery-previourdata-1");
        this.changeDetection.detectChanges();
      } catch (err) {
        console.log(err);
      }
 
  }

  openRecoveryModal() {
    if (localStorage.getItem("recoverytestfor")==localStorage.getItem("PageInfoType") && localStorage.getItem("AllSelectedTestList") !== null && (this.TESTMST_CurrentId == null || this.TESTMST_CurrentId == 0)) {
      this.modalService.open("recovery-previourdata-1");
    }

  }
  closeRecoveryModal() {
    localStorage.removeItem("recoverytestfor");
    localStorage.removeItem('AllTestMaster');
    localStorage.removeItem('AllSelectedTestList');
    this.modalService.close("recovery-previourdata-1");
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

  selectRow(id) {
    this.SelectRowOfTest = id;
    this.TEST_sDefault = this.SelectedTestList[this.SelectRowOfTest].TEST_sDefault;

  }

  AddTestField() {
    this.SelectedTestList.push({ TEST_FieldName: '', TEST_sDefault: '' });
  }


  inputTEST_sDefault() {
    
    this.SelectedTestList[this.SelectRowOfTest].TEST_sDefault =this.TEST_sDefault;
    this.saveworking();
  }

  removeTestField() {
    this.SelectedTestList.splice(this.SelectRowOfTest, 1);
    this.saveworking();
    this.modalService.close("removetestformat");
  }
  modelToRemoveTestFormat() {
    this.modalService.open("removetestformat");
  }

  closeModal() {
    this.modalService.close("removetestformat");

  }

  saveworking(){
    
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
    if(this.f_TAT!=null && this.f_TAT!=''){
      if (!this.isNumeric(this.f_TAT)) {
        this.alertService.warn("TAT value should be numeric");
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
      'f_TAT': this.f_TAT,
      'f_isNABL': this.f_isNABL ,
      'UserId':localStorage.getItem("LoginByID"),
    }
    localStorage.setItem("recoverytestfor",localStorage.getItem("PageInfoType"));

    this.savedataforOfflineuse(PathalogyTestMaster, "AllTestMaster");
    this.savedataforOfflineuse(this.SelectedTestList, "AllSelectedTestList");
  }


  onSubmit() {

    console.log(this.mycontent);
    console.log(this.SelectedTestList);  
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
    if(this.f_TAT!=null && this.f_TAT!=''){
      if (!this.isNumeric(this.f_TAT)) {
        this.alertService.warn("TAT value should be numeric");
        return;
      }
    }
    let PathalogyTestMaster = {

      'TESTMST_CurrentId': this.TESTMST_CurrentId,
      'TESTMST_Name': this.f_TestName,
      'TESTMST_PrintFormat': this.SelectedTestFormat,
      'TESTMST_Rate': this.f_Rate,
      'TESTMST_ReportHeading': this.f_ReportHeading,
      'Type': localStorage.getItem("PageInfoType"),
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
      'TAT': this.f_TAT,
      'IsNABL': this.f_isNABL,
      'TESTMST_Companyid': 0,
      'TestFormatDetails': this.SelectedTestList,
      'mycontent':this.mycontent,
      'UserId':localStorage.getItem('LoginByID')
    }

    if (this.TESTMST_CurrentId != null && this.TESTMST_CurrentId != 0) {
      this.update(PathalogyTestMaster);
    } else {
      this.insert(PathalogyTestMaster);
    }
  }


  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
  insert(modal) {
debugger;
    
    if(typeof modal.TESTMST_Name == 'undefined' || modal.TESTMST_Name == '')
    {
      alert("Please Enter Test Name");
        return;
    }
    this._SoloAdminMasterComponent.setLoading(true);
    this._TestService.InsertTest(modal).subscribe(
      (res: any) => {
        if (res != 0) {
          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Test Created Succesfully"); 
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
    if(modal.TESTMST_Name=="")
    {
      alert("Enter Test Name");
      return;
    }
    this._SoloAdminMasterComponent.setLoading(true);
    this._TestService.UpdateTest(modal).subscribe(
      (res: any) => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (res != 0) {
          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Test Updated Succesfully"); 
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

  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";
  }

  onPaste($event: any): void {
    console.log("onPaste");
    //this.log += new Date() + "<br />";
  }
}