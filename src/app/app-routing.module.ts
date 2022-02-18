import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Common', pathMatch: 'full' },
  {path:'PdfViewer', component:PdfViewerComponent},
  {
    path: 'Patient',
    loadChildren: () =>
      import('./Patient/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'Admin',
    loadChildren: () =>
      import('./Admin/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'Common',
    loadChildren: () =>
      import('./Solo/common/Common.module').then((m) => m.CommonModule),
  },
  {
    path: 'Admins',
    loadChildren: () =>
      import('./Solo/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'Auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  }, 
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('./modules/auth/auth.module').then((m) => m.AuthModule),
  // },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/layout.module').then((m) => m.LayoutModule),
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
