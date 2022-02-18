import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PatientService  {
  constructor(private http: HttpClient) {

  }
  readonly BaseURI = environment.Web_API;
  
  GlobalDelete(Name,ID) { 
    let Model={
      Name:Name,
      ID:ID
    }
    return this.http.post(this.BaseURI + '/Patient/GlobalDelete',Model );
  }
  CreatePatient(Data): Observable<any> {
  
      Data.LabSeriesSetting=environment.LabSeriesSetting;
     
      return this.http.post(this.BaseURI + '/Patient/CreatePatient', Data);
  }

  UpdatePatient(formData): Observable<any> {
  
    return this.http.put(this.BaseURI + '/Patient/UpdatePatient', formData)
  }

  GetAllPatientDetails(pageno,pagesize,Keyword,FromDate,ToDate,UserId) {
    if(Keyword==''||Keyword==null){
      Keyword="NoSearch";
    }
    return this.http.get(this.BaseURI + '/Patient/GetPatientSearch/'+pageno+','+pagesize+','+Keyword+','+FromDate+','+ToDate+','+UserId);
  }

  GetAllPatientDetailsCount(Keyword,FromDate,ToDate,UserId) {
    if(Keyword==''||Keyword==null){
      Keyword="NoSearch";
    }
    return this.http.get(this.BaseURI + '/Patient/GetPatientSearchCount/'+Keyword+','+FromDate+','+ToDate+','+UserId);
  }

  GetPatientDetail(ID): Observable<any> {
    return this.http.get(this.BaseURI + '/Patient/GetPatientDetail/'+ID);
  }


  GetPatientTestDetail(ID): Observable<any> {
    return this.http.get(this.BaseURI + '/Patient/GetPatientTestDetail/'+ID);
  }

  

  DeleteDoctorDetailsByID(ID) {
    return this.http.delete(this.BaseURI + '/Patient/DeleteDoctorDetailsByID/'+ID);
  }

  
  UpdateDocDetTestValue(Data) :Observable<any>{
   

    return this.http.put(this.BaseURI + '/Patient/UpdateDocDetTestValue', Data)
  }


  UpdateDocDetTestValuemarkcomplete(Data) :Observable<any>{
   

    return this.http.put(this.BaseURI + '/Patient/UpdateDocDetTestValue', Data)
  }

  SaveDocument(Data) :Observable<any>{
     console.log(Data);
 
    return this.http.put(this.BaseURI + '/Patient/SaveDocument', Data)
  }
  GetNarration(Keyword): Observable<any> {
    return this.http.get(this.BaseURI + '/Patient/GetNarration/'+Keyword);
  }

  
  GetPatientAllTestDetail(ID): Observable<any> {
    return this.http.get(this.BaseURI + '/Patient/GetPatientAllTestDetail/'+ID);
  }

  
  Report(ID) {
    return this.http.get(this.BaseURI+ '/Patient/TestDetailReport/'+ID, { responseType: 'text' });
  }
 
  
  GetPatientMobileNos(NO) {
    return this.http.get(this.BaseURI+ '/Patient/GetPatientMobileNos/'+NO);
  }
 

  GetPatientByMobileNo(NO) {
    return this.http.get(this.BaseURI+ '/Patient/GetPatientByMobileNo/'+NO);
  }
 
  GetTestDetailByTestMstID(NO) {
    return this.http.get(this.BaseURI+ '/Patient/GetTestDetailByTestMstID/'+NO);
  }
  

  InsertBlackListMobiles(Model) {
    return this.http.post(this.BaseURI+ '/Patient/InsertBlackListMobiles',Model);
  }
 

  DeleteBlackListMobiles(NO) {
    return this.http.get(this.BaseURI+ '/Patient/DeleteBlackListMobiles/'+NO);
  }
 
  GetBlackListMobilesSearchCount(model) {
    return this.http.post(this.BaseURI+ '/Patient/GetBlackListMobilesSearchCount',model);
  }
  GetBlackListMobilesSearch(model) {
    return this.http.post(this.BaseURI+ '/Patient/GetBlackListMobilesSearch',model);
  }
 
  
  GetAllTESTDETForPathTest(Keyword) { 
    if( Keyword==''|| Keyword==null){
      Keyword="NoSearch";
    }
    return this.http.get(this.BaseURI + '/Patient/GetAllTESTDETForPathTest/'+Keyword);
  }

  
  GetLabNo() {
    return this.http.get(this.BaseURI + '/Patient/GetLabNo/'+environment.LabSeriesSetting);
  }

  UpdateDocDetTestValueAndPrint(Data): Observable<any> {
    return this.http.put(this.BaseURI + '/Patient/UpdateDocDetTestValue', Data)
  }
  GetPatientListBlanceAmount(data){
    return this.http.post(this.BaseURI+'/Patient/GetPatientListBlanceAmount', data);
  }
  GetPatientListBlanceAmountByID(ID){
    return this.http.get(this.BaseURI+'/Patient/GetPatientListBlanceAmountByID/'+ID);
  }
  PaidBalanceAmount(data){
    return this.http.post(this.BaseURI+'/Patient/PaidBalanceAmount', data);
  }
  GetPatientPaymentHistory(ID){
    return this.http.get(this.BaseURI+'/Patient/GetPatientPaymentHistory/'+ID);
  }
  GetMakeBillMessage(ID){
  debugger;
    return this.http.get(this.BaseURI+'/Patient/GetMakeBillMessage/'+ID);
  }

}
