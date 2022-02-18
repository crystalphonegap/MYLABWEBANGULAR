import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthMasterComponent } from './auth-master/auth-master.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    component: AuthMasterComponent,
    children: [
      { path: '', redirectTo: 'Login', pathMatch: 'full' },
      { path: 'Login', component:  LoginComponent },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
