import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { TestService } from 'src/app/Shared/TestService';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';


@Component({
  selector: 'app-reason-add',
  templateUrl: './reason-add.component.html',
  styleUrls: ['./reason-add.component.scss']
})
export class ReasonAddComponent implements OnInit {


  constructor(private service: TestService, public Datepipe: DatePipe,
    private changeDetection: ChangeDetectorRef,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
    , private router: Router, private alertService: AlertService,
    private _SoloAdminMasterComponent: SoloAdminMasterComponent) {
      
    this.NarrationID = this.storage.get('ID');
    if (this.NarrationID != null && this.NarrationID != '') {
      localStorage.setItem('PageTitle', " Re-Sample Reason Edit");
    }else{
      localStorage.setItem('PageTitle', "Add Re-Sample Reason ");

    }
  }
  NarrationID;
  NarrationAdd;
  ngOnInit(): void {
    this.NarrationAdd = new FormGroup({
      NarrationId: new FormControl(0),
      NarrationText: new FormControl(''),
     UserId:new FormControl(localStorage.getItem("LoginByID")),
    }); 
    if (this.NarrationID != null && this.NarrationID != '') {
      this.getNarrationData();
    }
  }

  getNarrationData() {
    this._SoloAdminMasterComponent.setLoading(true);
    
    let model ={
      PageNo:-2,
      PageSize: this.NarrationID,
      Keyword:null,
    }
    this.service.GetReSampleReasonListSearch(model).subscribe(
      (res: any) => {
        if (res != null) {
          this.NarrationAdd = new FormGroup({
            NarrationId: new FormControl(res[0].NarrationId),
            NarrationText: new FormControl(res[0].NarrationText),
            UserId:new FormControl(localStorage.getItem("LoginByID")),
          });
        }
        this._SoloAdminMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
      },
      err => {
        console.log(err);
        this._SoloAdminMasterComponent.setLoading(false);
      }
    );
  }

  onSubmit() {

     let data=this.NarrationAdd.value;
    if(typeof data.NarrationText == 'undefined' || data.NarrationText == '')
    {
      alert("Please Enter Reason");
        return;
    }
    if (this.NarrationID != null && this.NarrationID != '') {
      this.update();
    } else {
      this.insert();
    }
  }


  insert() {
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.InsertReSampleReason(this.NarrationAdd.value).subscribe(
      (res: any) => {
        if (res != 0) {
          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Re-Sample Reasont Created Succesfully"); 
          this.alertService.error("Re-Sample Reason Created Successfully..!");
          this.router.navigateByUrl('Admin/ReasonMaster');
        }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Re-Sample Reason not added.');
        else
          console.log(err);
      }
    );
  }
  update() {
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.UpdateReSampleReason(this.NarrationAdd.value).subscribe(
      (res: any) => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (res != 0) {
          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Re-Sample Reason Updated Succesfully"); 
          this.alertService.error("Re-Sample Reason Updated Successfully..!");
          this.router.navigateByUrl('Admin/ReasonMaster');
        }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Re-Sample Reason not update.');
        else
          console.log(err);
      }
    );
  }

  Back() {
    this.storage.remove('ID');
    this.router.navigateByUrl('Admin/ReasonMaster');
  }
}
