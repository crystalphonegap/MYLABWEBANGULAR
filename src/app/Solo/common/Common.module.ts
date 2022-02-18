import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/Shared/SharedModule'; 

import { PaginationService } from 'src/app/CustomComponents/pagination/pagination.service';

import { MAT_DATE_FORMATS } from '@angular/material/core';

import { ModalComponent } from 'src/app/CustomComponents/Modal/Solo_Common/modal.component';

import { LoginComponent } from './login/login.component'; 
import { PagesRoutingModule } from './SoloCommonRoutingModule';
import { SoloCommonMasterComponent } from './solo-Common-master/solo-Common-master.component';

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
      LoginComponent,SoloCommonMasterComponent
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
export class CommonModule { }
 
