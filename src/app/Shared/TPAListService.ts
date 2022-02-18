import { Injectable } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class TPAListService{
    constructor(private fb: FormBuilder, private http: HttpClient) {

    }
    readonly BaseURI = environment.Web_API;
    
  
    GetTPAListByID(ID): Observable<any> {
      return this.http.get(this.BaseURI + '/TPA/GetCollectionCenterDetailsByID/'+ID);
    }
  
    DeleteTPAListById(ID): Observable<any> {
      return this.http.get(this.BaseURI + '/Employee/DeleteCollectionCenterDetailsByID/'+ID);
    }
  
    InsertTPAData(Data): Observable<any> {
      return this.http.post(this.BaseURI + '/Employee/InsertCollectionCenter', Data);
    }
  
    UpdateTPAData(Data): Observable<any> {
      return this.http.put(this.BaseURI + '/Employee/UpdateCollectionCenter', Data);
    }
  
    GetAllTPADetails(m) {
      if(m.Keyword==''||m.Keyword==null){
        m.Keyword="NoSearch";
      }
      return this.http.post(this.BaseURI + '/TPA/GetAllTPADetails',m);  
    }
    GetAllTPADetailsCount(m) {
      if(m.Keyword==''||m.Keyword==null){
        m.Keyword="NoSearch";
      }
      return this.http.post(this.BaseURI + '/TPA/GetAllTPADetailsCount',m);  
    }
  
    InsertTPADetails(Data): Observable<any> {
        return this.http.post(this.BaseURI + '/TPA/InsertUpdateTPADetails', Data);
      }
    
      UpdateTPADetails(Data): Observable<any> {
        return this.http.post(this.BaseURI + '/TPA/InsertUpdateTPADetails', Data);
      }

      GetTPADetailsByID(ID): Observable<any> {
        return this.http.get(this.BaseURI + '/TPA/GetTPADetailsByID/'+ID);
      }
 DeleteTPAById(ID) {
    return this.http.delete(this.BaseURI + '/TPA/DeleteTPAById/'+ID);
  }

}