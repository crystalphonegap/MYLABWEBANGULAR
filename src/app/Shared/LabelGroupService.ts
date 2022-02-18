import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class LabelGroupService {
   
    constructor( private http: HttpClient) {

    }
    readonly BaseURI = environment.Web_API;
    InsertUpdateLabelGroupMaster(m) {
    return this.http.post(this.BaseURI +'/LabelGroup/InsertUpdateLabelGroupMaster',m);
  }

  GetTestList() {
    return this.http.get(this.BaseURI + '/LabelGroup/GetTestList');
  }

  GetLabelGroupList(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/LabelGroup/GetLabelGroupList',m);
  }

  GetLabelGroupDetailsById(ID) {
    debugger;
    return this.http.get(this.BaseURI+ '/LabelGroup/GetLabelGroupDetailsById/'+ID);
  }

  getTestListData(ID) {
    return this.http.get(this.BaseURI+ '/LabelGroup/GetLabelGroupDetailsById/'+ID);
  }
}