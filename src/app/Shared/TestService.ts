import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor( private http: HttpClient) {

  }
  readonly BaseURI = environment.Web_API;
  GetAllTestTypeDetails(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/Test/GetAllTestTypeDetails',m);
  }
  GetTestTypeSearchCount(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/Test/GetTestTypeSearchCount',m);

  }

  InsertTestType(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Test/InsertTestType', Data);
  }

  UpdateTestType(Data): Observable<any> {
    return this.http.put(this.BaseURI + '/Test/UpdateTestType', Data);
  }


  GetTestTypeByID(ID): Observable<any> {
    return this.http.get(this.BaseURI + '/Test/GetTestTypeByID/'+ID);
  }
 
  GetAllTestDetailsDownload(usercode) {
    return this.http.get(this.BaseURI + '/Test/GetAllTestDetails', { responseType: 'blob' });
  }
 
  UploadTest(fromdate, todate, expirydate, CreatedBy, Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Test/UploadTest/' + fromdate + ',' + todate + ',' + expirydate + ',' + CreatedBy, Data);
  } 

  GetReSampleReasonListSearch(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/Test/GetReSampleReasonListSearch',m);
  }

  GetReSampleReasonSearchCount(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/Test/GetReSampleReasonSearchCount',m);

  }
  
  InsertReSampleReason(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Test/InsertReSampleReason', Data);
  }

  UpdateReSampleReason(Data): Observable<any> {
    return this.http.put(this.BaseURI + '/Test/UpdateReSampleReason', Data);
  }

  GetNarrationSearch(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/Test/GetNarrationSearch',m);
  }

  GetNarrationSearchCount(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/Test/GetNarrationSearchCount',m);

  }
  
  InsertNarration(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Test/InsertNarration', Data);
  }

  UpdateNarration(Data): Observable<any> {
    return this.http.put(this.BaseURI + '/Test/UpdateNarration', Data);
  }



  GetPathalogyTestSearch(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/Test/GetPathalogyTestSearch',m);
  }
  
  GetPathalogyTestSearchCount(m) {
    if(m.Keyword==''||m.Keyword==null){
      m.Keyword="NoSearch";
    }
    return this.http.post(this.BaseURI + '/Test/GetPathalogyTestSearchCount',m);

  }
   
  InsertPathaLogyTest(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Test/InsertPathaLogyTest', Data);
  }

  UpdatePathaLogyTest(Data): Observable<any> {
    return this.http.put(this.BaseURI + '/Test/UpdatePathaLogyTest', Data);
  }
  
  InsertTest(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Test/InsertTest', Data);
  }

  InsertProfileTest(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Test/InsertProfileTest', Data);
  }

  UpdateTest(Data): Observable<any> {
    return this.http.put(this.BaseURI + '/Test/UpdateTest', Data);
  }

  UpdateProfileTest(Data): Observable<any> {
    return this.http.put(this.BaseURI + '/Test/UpdateProfileTest', Data);
  }

  GetPTestResult(ID) { 
    return this.http.get(this.BaseURI + '/Test/GetPTestResult/'+ID);
  }


  InsertRemarkMaster(Data:{Data:any}): Observable<any> {
    debugger;
    return this.http.post(this.BaseURI + '/Test/InsertRemarkMaster/', Data);
  }

  //Added by suman
  GetAllTestDetailsbyPatientID(ID): Observable<any> {
    return this.http.get(this.BaseURI + '/Test/GetAllTestDetailsbyPatientID/' + ID);
  } 

  GetPatientListforDataEntry(Keyword, FromDate, ToDate): Observable<any> {
    return this.http.get(this.BaseURI + '/Test/GetPatientListforDataEntry/' + Keyword+ ',' + FromDate + ',' + ToDate);
  } 
  GetPatientAllTestDetail(ID): Observable<any> {
    return this.http.get(this.BaseURI + '/Test/GetPatientAllTestDetail/'+ID);
  }
  //Added by suman

  // GetPatientAllTestDetailsmsreport(ID): Observable<any> {
  //   return this.http.get(this.BaseURI + '/Test/GetPatientAllTestDetailsmsreport/'+ID);
  // }

  // GetPatientAllTestDetailsmsreport(ID): Observable<any> {
   
  //   ID.LabSeriesSetting=environment.LabSeriesSetting;
  //     console.log(ID);
  //     return this.http.post(this.BaseURI +'/Test/GetPatientAllTestDetailsmsreport/', +ID);
  // }

  GetPatientAllTestDetailsmsreport(SendSMS,myvalue,testname) {
 

    return this.http.get(this.BaseURI + '/Test/GetPatientAllTestDetailsmsreport/'+ SendSMS +','+ myvalue+','+testname);
    
  }




}
