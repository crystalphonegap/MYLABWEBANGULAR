import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { TestService } from 'src/app/Shared/TestService';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';

@Component({
  selector: 'app-narration-add',
  templateUrl: './narration-add.component.html',
  styleUrls: ['./narration-add.component.scss']
})
export class NarrationAddComponent implements OnInit {

  constructor(private service: TestService, public Datepipe: DatePipe,
    private changeDetection: ChangeDetectorRef,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
    , private router: Router, private alertService: AlertService,
    private _SoloAdminMasterComponent: SoloAdminMasterComponent) {
    localStorage.setItem('PageTitle', "Add Narration");
  }
  NarrationID;
  NarrationAdd;
  ngOnInit(): void {
    this.NarrationAdd = new FormGroup({
      NarrationId: new FormControl(0),
      NarrationText: new FormControl('')
    });
    this.NarrationID = this.storage.get('ID');
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
    this.service.GetNarrationSearch(model).subscribe(
      (res: any) => {
        if (res != null) {
          this.NarrationAdd = new FormGroup({
            NarrationId: new FormControl(res[0].NarrationId),
            NarrationText: new FormControl(res[0].NarrationText)
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
    if (this.NarrationID != null && this.NarrationID != '') {
      this.update();
    } else {
      this.insert();
    }
  }


  insert() {
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.InsertNarration(this.NarrationAdd.value).subscribe(
      (res: any) => {
        if (res != 0) {
          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Narration Created Succesfully"); 
          this.alertService.error("Narration Created Successfully..!");
          this.router.navigateByUrl('Admin/NarrationList');
        }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Narration not added.');
        else
          console.log(err);
      }
    );
  }
  update() {
    this._SoloAdminMasterComponent.setLoading(true);
    this.service.UpdateNarration(this.NarrationAdd.value).subscribe(
      (res: any) => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (res != 0) {
          this._SoloAdminMasterComponent.setLoading(false);
          this.storage.remove('ID');
          localStorage.setItem("AlertType","success");
          localStorage.setItem("AlertMessage","Narration Updated Succesfully"); 
          this.alertService.error("Narration Created Successfully..!");
          this.router.navigateByUrl('Admin/NarrationList');
        }
      },
      err => {
        this._SoloAdminMasterComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Narration not update.');
        else
          console.log(err);
      }
    );
  }

  Back() {
    this.storage.remove('ID');
    this.router.navigateByUrl('Admin/NarrationList');
  }
}
