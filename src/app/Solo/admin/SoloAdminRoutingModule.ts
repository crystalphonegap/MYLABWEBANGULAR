import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SharedModule } from 'src/app/Shared/SharedModule';
import { AddLabelGroupComponent } from './add-label-group/add-label-group.component';
import { AddLableGroupsComponent } from './add-lable-groups/add-lable-groups.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { AddTestTypeComponent } from './add-test-type/add-test-type.component';
import { AllTestEnteryComponent } from './All-test-entery/all-test-entery.component';
import { AuthenticateListComponent } from './authenticate-list/authenticate-list.component';
import { AuthenticatePatientTestComponent } from './authenticate-patient-test/authenticate-patient-test.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { CategoryWiseRateUpdateComponent } from './category-wise-rate-update/category-wise-rate-update.component';
import { CollectionCenterAddComponent } from './collection-center-add/collection-center-add.component'; 
import { DoctorAddComponent } from './doctor-add/doctor-add.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EnterTestComponent } from './enter-test/enter-test.component';
import { NarrationAddComponent } from './narration-add/narration-add.component';
import { PathologyTestAddComponent } from './pathology-test-add/pathology-test-add.component';
import { PatientIdAddComponent } from './patient-id-add/patient-id-add.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { PatientTestEnteryComponent } from './patient-test-entery/patient-test-entery.component';
import { PaymentSystemListComponent } from './payment-system-list/payment-system-list.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileMasterComponent } from './profile-master/profile-master.component';
import { RadiologyTestAddComponent } from './radiology-test-add/radiology-test-add.component';
import { RateListAddComponent } from './rate-list-add/rate-list-add.component';
import { ReasonAddComponent } from './reason-add/reason-add.component';
import { ResultMasterComponent } from './result-master/result-master.component';
import { SingleTestAddComponent } from './single-test-add/single-test-add.component';
import { SoloAdminMasterComponent } from './solo-admin-master/solo-admin-master.component';
import { TestDetailEditComponent } from './test-detail-edit/test-detail-edit.component';
import { TPAListAddComponent } from './tpa-list-add/tpa-list-add.component';


const routes: Routes = [
    {
        path: '',
        component:SoloAdminMasterComponent,
        children: [
    { path: '', redirectTo: 'AllTestEntery', pathMatch: 'full' },
    { path: 'PatientRegistration', component: PatientRegisterComponent, data: { breadcrumb: 'PatientRegistration'} },
    { path: 'DoctorAdd', component: DoctorAddComponent },
    { path: 'EmployeeAdd', component: EmployeeAddComponent },
    { path: 'SingleTestAdd', component: SingleTestAddComponent },
    { path: 'CollectionCenterAdd', component: CollectionCenterAddComponent },
    { path: 'RadiologyTestAdd', component: RadiologyTestAddComponent },
    { path: 'RateListAdd', component: RateListAddComponent },
    { path: 'AddProfile', component: AddProfileComponent },
    { path: 'TestDetailEdit', component: TestDetailEditComponent },
    { path: 'AddTestType', component: AddTestTypeComponent },
    { path: 'AddLableGroups', component: AddLableGroupsComponent },
    { path: 'CategoryWiseRateUpdate', component: CategoryWiseRateUpdateComponent },
    { path: 'PatientTestEntery', component: PatientTestEnteryComponent },
    { path: 'PatientIdAdd', component: PatientIdAddComponent },
    { path: 'AllTestEntery', component: AllTestEnteryComponent },
    { path: 'EnterTest', component: EnterTestComponent },
    { path: 'NarrationAdd', component: NarrationAddComponent },
    { path: 'ReasonAdd', component: ReasonAddComponent },
    { path: 'PathologyTestAdd', component: PathologyTestAddComponent },
    { path: 'ResultMaster', component: ResultMasterComponent }, 
    { path: 'ProfileMaster', component: ProfileMasterComponent },
    { path: 'Payments', component: PaymentsComponent },
    { path: 'BillDetails', component: BillDetailsComponent },
    { path: 'Login', component: LoginComponent }, 
    {path:'TPAListAdd',component:TPAListAddComponent},
    {path:'AddLabelGroup',component:AddLabelGroupComponent},
    {path:'PaymentSystemList',component:PaymentSystemListComponent},
    {path:'AuthenticatePatientTest',component:AuthenticatePatientTestComponent},
    {path:'AuthenticateList',component:AuthenticateListComponent},
    
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes),SharedModule,],
    exports: [RouterModule,SharedModule],
})
export class PagesRoutingModule { }