import { Component, OnInit } from '@angular/core';
import { RateListService } from 'src/app/Shared/RateListService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor( private _RateListService: RateListService) { }

  ngOnInit(): void {
    
  } 

}
