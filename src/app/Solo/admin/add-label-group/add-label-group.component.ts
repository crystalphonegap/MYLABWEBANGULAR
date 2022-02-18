import { ViewEncapsulation } from '@angular/core';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { ModalService } from 'src/app/CustomComponents/Modal/Solo_Admin';
import { LabelGroupService } from 'src/app/Shared/LabelGroupService';
import { PatientService } from 'src/app/Shared/PatientService ';
import { TestService } from 'src/app/Shared/TestService';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';

@Component({
  selector: 'app-add-label-group',
  templateUrl: './add-label-group.component.html',
  styleUrls: ['./add-label-group.component.scss']
})
export class AddLabelGroupComponent implements OnInit {
  
  constructor(private _PatientService: PatientService, private modalService: ModalService, private _SoloAdminMasterComponent: SoloAdminMasterComponent, private _TestService: TestService,
    private changeDetection: ChangeDetectorRef, @Inject(SESSION_STORAGE) private storage: WebStorageService
    , private router: Router, private alertService: AlertService,private _Labelgroup:LabelGroupService ) {

      localStorage.setItem('PageTitle', "Label Group Added"); }
  
  Alias;
  GroupName;
 
  f_ActiveInactive = false;

  SelectedTestFormat = 'FORMATFOR'+localStorage.getItem("PageInfoType");
  TESTMST_CurrentId = 0;
  AllTestList:any=[];
  SelectedTestList: any = [];
  SelectedTestCatagory = 1;
  TestTypeList = [];
  SelectRowOfTest;
  TEST_sDefault;
  ngOnInit(): void {
    this.getTestTypeList();
    if (this.storage.get('ID') != null && this.storage.get('ID') != '') {
      this.TESTMST_CurrentId = this.storage.get('ID');
      
      //this.getAllTestList();
       this.getTestData();
      
    }else{
      
     this.getAllTestList();
    }
  }


  getAllTestList() { 
    this._SoloAdminMasterComponent.setLoading(true);
    this._Labelgroup.GetTestList().subscribe((res: any) => {
      this._SoloAdminMasterComponent.setLoading(false); 
     
      this.AllTestList = res;
      this.setHtmlContain();
      this.changeDetection.detectChanges();
    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
      });
  }


  getTestListData() { 
    this._SoloAdminMasterComponent.setLoading(true);
    this._Labelgroup.getTestListData(this.TESTMST_CurrentId).subscribe((res: any) => {
      this._SoloAdminMasterComponent.setLoading(false); 
     
      this.AllTestList = res;
      this.setHtmlContain();
      this.changeDetection.detectChanges();
    },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
        console.log(err);
      });
  }
  removeContain(data){
    data.TESTMST_CurrentId
  this.SelectedTestList.slice(data,1);
  }

  setHtmlContain() {
    debugger;
    console.log(this.AllTestList);
    this.SelectedTestList=  this.AllTestList.filter(x => x.Selected==1);
    this.changeDetection.detectChanges();

  }

  getTestData() {
    this._SoloAdminMasterComponent.setLoading(true);
    this._Labelgroup.GetLabelGroupDetailsById(this.TESTMST_CurrentId).subscribe((res: any) => {
        if (res != null) {
          this.TESTMST_CurrentId = res[0].GRPID;
          this.f_ActiveInactive = res[0].Active;
          this.GroupName=res[0].GRPNAME;
          this.Alias=res[0].Prefix;
        }
        
         this.getTestListData();
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
    
          this.SelectedTestFormat = data.SelectedTestFormat;
          
          this.f_ActiveInactive = data.f_ActiveInactive;
          
          this.SelectedTestCatagory = data.SelectedTestCatagory;
         
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
    this.TEST_sDefault = this.SelectedTestList[this.SelectRowOfTest].TEST_sDefault

  }

  AddTestField() {
    this.SelectedTestList.push({ TEST_FieldName: '', TEST_sDefault: '' });
  }


  inputTEST_sDefault() {
    // let htmlToRtf = (<any>window).require("html-to-rtf");
    // this.SelectedTestList[this.SelectRowOfTest].TEST_sDefault = htmlToRtf.convertHtmlToRtf(this.TEST_sDefault);
    this.SelectedTestList[this.SelectRowOfTest].TEST_sDefault =this.TEST_sDefault;
    this.saveworking();
  }

  removeTestField() {
    this.SelectedTestList.splice(this.SelectRowOfTest, 1);
    this.saveworking();
  
  }
 

  saveworking(){
    
    this.alertService.clear();
    // if(this.f_Rate!=null && this.f_Rate!=''){
    //   if (!this.isNumeric(this.f_Rate)) {
    //     this.alertService.warn("Rate value should be numeric");
    //     return;
    //   }
    // }
   
    let PathalogyTestMaster = {
      'TESTMST_CurrentId': this.TESTMST_CurrentId,
      'SelectedTestFormat': this.SelectedTestFormat,
      'f_ActiveInactive': this.f_ActiveInactive,
      'SelectedTestCatagory': this.SelectedTestCatagory,
      
    }
    localStorage.setItem("recoverytestfor",localStorage.getItem("PageInfoType"));

    this.savedataforOfflineuse(PathalogyTestMaster, "AllTestMaster");
    this.savedataforOfflineuse(this.SelectedTestList, "AllSelectedTestList");
  }


  onSubmit() {

    this.alertService.clear();
    // if(this.f_Rate!=null && this.f_Rate!=''){
    //   if (!this.isNumeric(this.f_Rate)) {
    //     this.alertService.warn("Rate value should be numeric");
    //     return;
    //   }
    // }
    
    let LabelGroupMaster = {
      'GRPID': this.storage.get('ID'),
      'GRPNAME': this.GroupName,
      'Companyid':0,
      'Prefix': this.Alias,
      'TestDetailsClass': this.SelectedTestList,
      'Active': this.f_ActiveInactive,
      'Action':'I',
      'UserId':localStorage.getItem("LoginByID"),
    }

    if (this.TESTMST_CurrentId != null && this.TESTMST_CurrentId != 0) {
      this.update(LabelGroupMaster);
    } else {
      this.insert(LabelGroupMaster);
    }
  }


  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
  insert(modal) {
    this._SoloAdminMasterComponent.setLoading(true);
    this._Labelgroup.InsertUpdateLabelGroupMaster(modal).subscribe(
      (res: any) => {
        if (res != 0) {
          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Label Group Added Succesfully"); 
          this.alertService.error("Label Group Added Successfully..!");
          this.router.navigateByUrl('Admin/LabelGroupList');
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
    this._Labelgroup.InsertUpdateLabelGroupMaster(modal).subscribe(
      (res: any) => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (res != 0) {
          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Label Group Updated Succesfully"); 
          this.alertService.error("Label Group Updated Successfully..!");
          this.router.navigateByUrl('Admin/LabelGroupList');
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
    this.router.navigateByUrl('Admin/LabelGroupList');
  }

}
