import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { RateListService } from 'src/app/Shared/RateListService';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';

@Component({
  selector: 'app-category-wise-rate-update',
  templateUrl: './category-wise-rate-update.component.html',
  styleUrls: ['./category-wise-rate-update.component.scss']
})
export class CategoryWiseRateUpdateComponent implements OnInit {

  constructor(private _RateListService:RateListService,private changeDetection:ChangeDetectorRef
    ,private _SoloAdminMasterComponent:SoloAdminMasterComponent) {

      localStorage.setItem('PageTitle', "Category Wise Rate"); }
selectedRateList:number;
listOfRateList:any=[];
  ngOnInit(): void {
  }

  getRateList(){
    // this._SoloAdminMasterComponent.setLoading(true); 
    // this._RateListService.GetAllRateListDetails(this.pageNo,10,this.search).subscribe((res: any) => {  
    //   this._SoloAdminMasterComponent.setLoading(false); 
    //   this.listOfRateList = res;  
    //   this.changeDetection.detectChanges();
    // },
    // err => { 
    //   this._SoloAdminMasterComponent.setLoading(false);
    //   this.changeDetection.detectChanges();
    //     console.log(err);
    // })  
  }

}
