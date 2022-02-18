import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LoginComponent } from './login/login.component';
import { SoloCommonMasterComponent } from './solo-Common-master/solo-Common-master.component';


const routes: Routes = [
    {
        path: '',
        component:SoloCommonMasterComponent,
        children: [
    { path: '', redirectTo: 'Login', pathMatch: 'full' },
    { path: 'Login', component: LoginComponent },
   
        ]
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }