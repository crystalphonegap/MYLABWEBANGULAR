import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RateListService {
  constructor( private http: HttpClient) {

  }
  readonly BaseURI = environment.Web_API;
  

  getRateFromTestMaster(Keyword,Type,catagory): Observable<any> {
    if(Keyword==''|| Keyword==null){
      Keyword='NoSearch';
    }
    if(Type==''|| Type==null){
      Type='NoSearch';
    }
    if(catagory==''|| catagory==null){
      catagory=0;
    }
    return this.http.get(this.BaseURI + '/Employee/GetTestMasterForRateList/'+Keyword+','+Type+','+ catagory);
  }

  GetRateListByID(ID): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetRateListDetailsByID/'+ID);
  }
  GetRateListHeaderById(ID): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetRateListHeaderById/'+ID);
  } 
  InsertRateList(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Employee/InsertRateList', Data);
  }

  InsertSaveAsRateList(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Employee/InsertSaveAsRateList', Data);
  }

  UpdateRateList(Data): Observable<any> {
    return this.http.put(this.BaseURI + '/Employee/UpdateRateList', Data);
  }

  GetAllRateListDetails(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/Employee/GetRateListSearch',m); 
  }
  GetAllRateListDetailsCount(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/Employee/GetRateListSearchCount',m);  
  }

  InsertRateDetailList(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Employee/InsertRateDetailList', Data);
  }

  
}
