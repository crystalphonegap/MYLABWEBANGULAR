import { Injectable } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CollectionCenterService {
  constructor(private fb: FormBuilder, private http: HttpClient) {

  }
  readonly BaseURI = environment.Web_API;
  

  GetCollectionCenterByID(ID): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetCollectionCenterDetailsByID/'+ID);
  }

  DeleteCollectionCenterById(ID): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/DeleteCollectionCenterDetailsByID/'+ID);
  }

  InsertCollectionCenter(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Employee/InsertCollectionCenter', Data);
  }

  UpdateCollectionCenter(Data): Observable<any> {
    return this.http.put(this.BaseURI + '/Employee/UpdateCollectionCenter', Data);
  }

  GetAllCollectionCenterDetails(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/Employee/GetCollectionCenterSearch',m);  
  }
  GetAllCollectionCenterDetailsCount(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/Employee/GetCollectionCenterSearchCount',m);  
  }


}
