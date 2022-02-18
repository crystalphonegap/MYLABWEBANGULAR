import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private http: HttpClient) {

  }
  readonly BaseURI = environment.Web_API;
  
  InsertDoctor(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Employee/InsertDoctor', Data);
  }

  GetDoctorDetailsByID(ID): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetDoctorDetailsByID/'+ID);
  }

  UpdateDoctor(Data): Observable<any> {
    return this.http.put(this.BaseURI + '/Employee/UpdateDoctor', Data);
  }

  GetAllDoctorDetails(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    console.log(m);
    return this.http.post(this.BaseURI + '/Employee/GetDoctorSearch',m);
  }
  
  GetAllDoctorDetailsCount(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/Employee/GetDoctorSearchCount',m); 
  }

}
