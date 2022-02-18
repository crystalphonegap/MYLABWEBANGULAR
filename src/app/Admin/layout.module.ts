import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { LayoutComponent } from './_layout/layout.component';
import { ScriptsInitComponent } from './_layout/init/scipts-init/scripts-init.component';
import { HeaderMobileComponent } from './_layout/components/header-mobile/header-mobile.component';
import { AsideComponent } from './_layout/components/aside/aside.component';
import { FooterComponent } from './_layout/components/footer/footer.component';
import { HeaderComponent } from './_layout/components/header/header.component';
import { HeaderMenuComponent } from './_layout/components/header/header-menu/header-menu.component';
import { TopbarComponent } from './_layout/components/topbar/topbar.component';
import { LanguageSelectorComponent } from './_layout/components/topbar/language-selector/language-selector.component';
import { AsideDynamicComponent } from './_layout/components/aside-dynamic/aside-dynamic.component';
import { HeaderMenuDynamicComponent } from './_layout/components/header/header-menu-dynamic/header-menu-dynamic.component';
import { TestMasterListComponent } from './test-master-list/test-master-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { PaginationService } from '../CustomComponents/pagination/pagination.service';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { CollectionCenterListComponent } from './collection-center-list/collection-center-list.component';
import { SharedModule } from '../Shared/SharedModule';
import { RateListComponent } from './rate-list/rate-list.component'; 
import { PathologyTestListComponent } from './pathology-test-list/pathology-test-list.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PermanentAddressPatientListComponent } from './permanent-address-patient-list/permanent-address-patient-list.component';
import { TestTypeListComponent } from './test-type-list/test-type-list.component'; 
import { ReasonMasterComponent } from './reason-master/reason-master.component';
import { ModalComponent } from '../CustomComponents/Modal/List_Admin/modal.component';
import { PermanentPatientIdComponent } from './permanent-patient-id/permanent-patient-id.component';
import { NarrationListComponent } from './narration-list/narration-list.component';
import { RedirectTestComponent } from './redirect-test/redirect-test.component';
import { DndMobileNumberComponent } from './dnd-mobile-number/dnd-mobile-number.component';
import { ChangeDateSelectionComponent } from './change-date-selection/change-date-selection.component';
import { MAT_DATE_FORMATS } from '@angular/material/core'; 
import { CookieService } from 'ngx-cookie-service';
import { SoloAdminMasterComponent } from '../Solo/admin/solo-admin-master/solo-admin-master.component';
import { TPAListComponent } from './tpalist/tpalist.component';
import { DoctorListReportComponent } from './doctor-list-report/doctor-list-report.component';
import { EmployeeListReportComponent } from './employee-list-report/employee-list-report.component';
import { RateListReportComponent } from './rate-list-report/rate-list-report.component';
import { LabelGroupListComponent } from './label-group-list/label-group-list.component';
import { LoginComponent } from '../auth/login/login.component';

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
  declarations: [
    ModalComponent,
    LayoutComponent,
    ScriptsInitComponent,
    HeaderMobileComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent,
    LanguageSelectorComponent,
    AsideDynamicComponent,
    HeaderMenuDynamicComponent,
    TestMasterListComponent,
    EmployeeListComponent,
    DoctorListComponent,
    CollectionCenterListComponent,
    RateListComponent, 
    PathologyTestListComponent,
    PatientListComponent,
    PermanentAddressPatientListComponent,
    TestTypeListComponent,
    ReasonMasterComponent,
    PermanentPatientIdComponent,
    NarrationListComponent,
    RedirectTestComponent,
    DndMobileNumberComponent,
    ChangeDateSelectionComponent,
    TPAListComponent,
    DoctorListReportComponent,
    DoctorListReportComponent,
    EmployeeListReportComponent,
    RateListReportComponent,
    LabelGroupListComponent,
    LoginComponent
    
    //CookieService,
  ],
  imports: [
    PagesRoutingModule,
    SharedModule,
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
export class LayoutModule { }
