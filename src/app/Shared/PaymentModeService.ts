import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentModeService{
    constructor(private http:HttpClient){

    }
    readonly BaseURI = environment.Web_API;
    GetAllPaymentMode(ID){
       
        return this.http.get(this.BaseURI + '/Patient/GetAllPaymentMode');
    }

     GetAllTPALIST(){
       
        return this.http.get(this.BaseURI + '/Patient/GetAllTAPLIST');
    }

    InsertUpdatePaymentMode(Pmode){
      
        return this.http.post(this.BaseURI + '/Patient/InsertUpdatePaymentMode',Pmode);
    }

}
