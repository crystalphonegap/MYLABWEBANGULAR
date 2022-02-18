import { NgModule } from '@angular/core';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import {   SingleTestAddComponent } from './single-test-add/single-test-add.component';
import { PagesRoutingModule } from './SoloAdminRoutingModule';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { CollectionCenterAddComponent } from './collection-center-add/collection-center-add.component';

import { SoloAdminMasterComponent } from './solo-admin-master/solo-admin-master.component';
import { SharedModule } from 'src/app/Shared/SharedModule'; 
import { RadiologyTestAddComponent } from './radiology-test-add/radiology-test-add.component';
import { RateListAddComponent } from './rate-list-add/rate-list-add.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { AddTestTypeComponent } from './add-test-type/add-test-type.component';
import { AddLableGroupsComponent } from './add-lable-groups/add-lable-groups.component';
import { CategoryWiseRateUpdateComponent } from './category-wise-rate-update/category-wise-rate-update.component';
import { PatientTestEnteryComponent } from './patient-test-entery/patient-test-entery.component';
import { PaginationService } from 'src/app/CustomComponents/pagination/pagination.service';
import { TestDetailEditComponent } from './test-detail-edit/test-detail-edit.component';
import { PatientIdAddComponent } from './patient-id-add/patient-id-add.component';
import { AllTestEnteryComponent } from './All-test-entery/all-test-entery.component';
import { EnterTestComponent } from './enter-test/enter-test.component';
import { NarrationAddComponent } from './narration-add/narration-add.component';
import { ReasonAddComponent } from './reason-add/reason-add.component'; 
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { PathologyTestAddComponent } from './pathology-test-add/pathology-test-add.component'; 
import { ModalComponent } from 'src/app/CustomComponents/Modal/Solo_Admin/modal.component';
import { ResultMasterComponent } from './result-master/result-master.component';
import { ProfileMasterComponent } from './profile-master/profile-master.component';
import { PaymentsComponent } from './payments/payments.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { LoginComponent } from './login/login.component';
import { TPAListAddComponent } from './tpa-list-add/tpa-list-add.component';
import { AddLabelGroupComponent } from './add-label-group/add-label-group.component'; 
import { PaymentSystemListComponent } from './payment-system-list/payment-system-list.component';

import { PageHeaderComponent } from './Constant/page-header/page-header.component'; 
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { AuthenticatePatientTestComponent } from './authenticate-patient-test/authenticate-patient-test.component';
import { AuthenticateListComponent } from './authenticate-list/authenticate-list.component';
// import { ModalComponent } from 'src/app/CustomComponents/Modal/List_Admin/modal.component';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@NgModule({
  declarations: [PatientRegisterComponent,
    ModalComponent,
     SingleTestAddComponent,
     PageHeaderComponent,
      DoctorAddComponent, 
      EmployeeAddComponent, 
      AllTestEnteryComponent,
      CollectionCenterAddComponent, 
      SoloAdminMasterComponent, RadiologyTestAddComponent, RateListAddComponent, AddProfileComponent, 
      AddTestTypeComponent, AddLableGroupsComponent, CategoryWiseRateUpdateComponent, PatientTestEnteryComponent,
       TestDetailEditComponent, PatientIdAddComponent, EnterTestComponent, NarrationAddComponent, ReasonAddComponent, 
       PathologyTestAddComponent, ResultMasterComponent, ProfileMasterComponent, PaymentsComponent,
       BillDetailsComponent, LoginComponent, TPAListAddComponent, AddLabelGroupComponent,
      PaymentSystemListComponent, AuthenticatePatientTestComponent, AuthenticateListComponent,
    ],
  imports: [
    PagesRoutingModule,
    SharedModule,
    CKEditorModule, 
    FormsModule
  ],
  providers: [
  //    DatePipe, 
  // { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
   PaginationService, 
   { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
]
})
export class AdminModule { }
 
