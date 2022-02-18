import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor( private http: HttpClient) {

  }
  readonly BaseURI = environment.Web_API;
  GetEmployeeSearch(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/Employee/GetEmployeeSearch',m);
  }
  
  GetAllEmployeeDetailsDownload(usercode) {
    return this.http.get(this.BaseURI + '/Employee/GetAllEmployeeDetails', { responseType: 'blob' });
  }
  InsertEmployee(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Employee/InsertEmployee', Data);
  }

  GetEmployeeDetailsByID(ID): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetEmployeeById/'+ID);
  }

  UpdateEmployee(Data): Observable<any> {
    return this.http.put(this.BaseURI + '/Employee/UpdateEmployee', Data);
  }
 
  UploadEmployee(fromdate, todate, expirydate, CreatedBy, Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Employee/UploadEmployee/' + fromdate + ',' + todate + ',' + expirydate + ',' + CreatedBy, Data);
  }
  GetEmployeeSearchCount(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/Employee/GetEmployeeSearchCount',m); 

  }
  DeleteEmployeeDetailsByID(ID) {
    return this.http.delete(this.BaseURI + '/Employee/DeleteEmployeeById/'+ID);
  }
  
  Login(Model) {
    debugger;
    
    return this.http.post(this.BaseURI + '/UserMaster/Login',Model) ;
  } 
  GetTestMasterByCollectionCenterID(CenterID,Type,Keyword) {
    if(Keyword==''||Keyword==null){
      Keyword="NoSearch";
    }
    if(CenterID==null)
    {
      CenterID=0;
    }
    return this.http.get(this.BaseURI + '/Employee/GetTestMasterByCollectionCenterID/'+CenterID+','+Type+','+Keyword);
  }
}
