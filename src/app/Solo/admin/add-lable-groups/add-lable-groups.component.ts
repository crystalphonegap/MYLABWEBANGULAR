import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-lable-groups',
  templateUrl: './add-lable-groups.component.html',
  styleUrls: ['./add-lable-groups.component.scss']
})
export class AddLableGroupsComponent implements OnInit {

  constructor() { 

    localStorage.setItem('PageTitle', "Add Lable");}

  ngOnInit(): void {
  }

}