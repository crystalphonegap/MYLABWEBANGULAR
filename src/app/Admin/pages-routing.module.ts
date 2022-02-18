import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../Shared/SharedModule';
import { ChangeDateSelectionComponent } from './change-date-selection/change-date-selection.component';
import { CollectionCenterListComponent } from './collection-center-list/collection-center-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DndMobileNumberComponent } from './dnd-mobile-number/dnd-mobile-number.component';
import { DoctorListReportComponent } from './doctor-list-report/doctor-list-report.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { EmployeeListReportComponent } from './employee-list-report/employee-list-report.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { NarrationListComponent } from './narration-list/narration-list.component';
import { PathologyTestListComponent } from './pathology-test-list/pathology-test-list.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PermanentAddressPatientListComponent } from './permanent-address-patient-list/permanent-address-patient-list.component';
import { PermanentPatientIdComponent } from './permanent-patient-id/permanent-patient-id.component';
import { RateListReportComponent } from './rate-list-report/rate-list-report.component';
import { RateListComponent } from './rate-list/rate-list.component';
import { ReasonMasterComponent } from './reason-master/reason-master.component';
import { RedirectTestComponent } from './redirect-test/redirect-test.component';
import { TestMasterListComponent } from './test-master-list/test-master-list.component';
import { TestTypeListComponent } from './test-type-list/test-type-list.component';
import { TPAListComponent } from './tpalist/tpalist.component';
import { LayoutComponent } from './_layout/layout.component';
import { LabelGroupListComponent } from './label-group-list/label-group-list.component';
import { LoginComponent } from '../auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'EmployeeList', component: EmployeeListComponent},
      { path: 'TestMasterList', component: TestMasterListComponent},
      { path: 'DoctorList', component: DoctorListComponent},
      { path: 'CollectionList', component: CollectionCenterListComponent},
      { path: 'RateList', component: RateListComponent}, 
      { path: 'PathologyTestList', component: PathologyTestListComponent},
      { path: 'PatientList', component: PatientListComponent},
      { path: 'PermanentAddressPatientList', component: PermanentAddressPatientListComponent},
      { path: 'TestTypeList', component: TestTypeListComponent}, 
      { path: 'ReasonMaster', component: ReasonMasterComponent},
      { path: 'NarrationList', component: NarrationListComponent},
      { path: 'PermanentPatientId', component: PermanentPatientIdComponent},
      { path: 'RedirectTest', component: RedirectTestComponent},
      { path: 'DndMobileNumber', component: DndMobileNumberComponent },
      { path: 'ChangeDateSelection', component: ChangeDateSelectionComponent },
      { path: 'TPAList', component: TPAListComponent },
      { path: 'DoctorListReport', component: DoctorListReportComponent },
      { path: 'EmployeeListReport', component: EmployeeListReportComponent },
      { path: 'RateListReport', component: RateListReportComponent },
      { path: 'LabelGroupList', component: LabelGroupListComponent },
      { path: 'Login', component: LoginComponent },
      
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),SharedModule,],
  exports: [RouterModule,SharedModule,],
})
export class PagesRoutingModule { }
