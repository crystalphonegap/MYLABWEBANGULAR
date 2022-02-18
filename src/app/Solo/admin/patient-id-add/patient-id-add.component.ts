import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-id-add',
  templateUrl: './patient-id-add.component.html',
  styleUrls: ['./patient-id-add.component.scss']
})
export class PatientIdAddComponent implements OnInit {

  constructor() { 

    localStorage.setItem('PageTitle', "Patient ID");}

  ngOnInit(): void {
  }

}
