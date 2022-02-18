import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Shared/EmployeeService';
import { SoloCommonMasterComponent } from '../solo-Common-master/solo-Common-master.component';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/app/CustomComponents/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 
  ToDate: Date;

  constructor(private _SoloCommonMasterComponent:SoloCommonMasterComponent, private alertService: AlertService,private _EmployeeService:EmployeeService, private changeDetection: ChangeDetectorRef,private router: Router,public DatePipe:DatePipe) { }

  FormData;
  ngOnInit(): void {
    this.FormData = new FormGroup({
      UserName: new FormControl(''),
      Password: new FormControl('') 
    });
    
  }

  btnClick() {
    this._SoloCommonMasterComponent.setLoading(true);
    this._EmployeeService.Login( this.FormData.value).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem("LoginByID",res.ID);
        localStorage.setItem("LoginByLabID",res.LabID);
        localStorage.setItem("UserName",res.UserName);
        localStorage.setItem("Type",res.Type);
        localStorage.setItem("userdetails",res);
        if(res?.Value=='user not found'){
          this._SoloCommonMasterComponent.setLoading(false);
          this.changeDetection.detectChanges();
          this.alertService.error('Please Enter Correct Credentials');
          return;
        }
        this.SaveLocalStorage(res);
        this.alertService.success('Login Successfull');
        this._SoloCommonMasterComponent.setLoading(false);
        this.Redirect(res?.Type);
        this.changeDetection.detectChanges();
      },
      err => {
        console.log(err);
        this._SoloCommonMasterComponent.setLoading(false);
      }
    );
};

    Redirect(UserType:string ){
      switch(UserType) { 
        case 'A': { 
           //statements; 
           this.router.navigateByUrl('/Admin');
           break; 
        } 
        case 'S': { 
          //statements; 
          this.router.navigateByUrl('/Admin');
          break; 
       } 
        case 'B': { 
           //statements; 
           break; 
        } 
        default: { 
           //statements; 
           break; 
        } 
     } 
    }

    SaveLocalStorage(usermodel :any){
      this.ToDate=new Date(); 
      localStorage.setItem("FromDate",this.DatePipe.transform(this.ToDate, 'MM-dd-yyyy'))
      localStorage.setItem("ToDate",this.DatePipe.transform(this.ToDate, 'MM-dd-yyyy'))
      localStorage.setItem("Type",usermodel?.Type);
      localStorage.setItem("ID",usermodel?.ID);
      localStorage.setItem("LabID",usermodel?.LabID);
      localStorage.setItem("LabName",usermodel?.LabName);
      localStorage.setItem("LabCode",usermodel?.LabCode);
      localStorage.setItem("UserName",usermodel?.UserName);
    }
}
