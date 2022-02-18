import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solo-common-master',
  templateUrl: './solo-common-master.component.html',
  styleUrls: ['../../../app.component.scss'],
  
})
export class SoloCommonMasterComponent implements OnInit {

  constructor( private changeDetection: ChangeDetectorRef ) { }
  loading='none';
  Title:string="Default" ;
  ngOnInit(): void {
    (document.querySelector('.SoloLoader') as HTMLElement).style.display = 'none';
     this.Title=localStorage.getItem('PageTitle');
  }

  public SetTitle(newTitle:string){
    this.Title=newTitle;
    this.changeDetection.detectChanges();
  }

  public setLoading(value :boolean){
    if(value==true){
      this.loading='block';
    }else{
      this.loading='none';
    }
    (document.querySelector('.SoloLoader') as HTMLElement).style.display = this.loading;
  }
}
