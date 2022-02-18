import { Component, OnInit,Inject } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalService } from 'src/app/CustomComponents/Modal/Solo_Admin';


export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-single-test-add',
  templateUrl: './single-test-add.component.html',
  styleUrls: ['./single-test-add.component.scss']
})

export class SingleTestAddComponent implements OnInit {
  Categorys = [
    {value: 'haematology', viewValue: 'haematology'},
    {value: 'biochemistry', viewValue: 'biochemistry'}
  ];

  PrintFormats = [
    {value: 'FORMAT01', viewValue: 'FORMAT01'},
    {value: 'FORMAT02', viewValue: 'FORMAT02'}
  ];

  Specials = [
    {value: 'Special', viewValue: 'Special'},
    {value: 'Routine', viewValue: 'Routine'}
  ];
  animal: string;
  name: string;
  constructor(private modalService: ModalService) { }
 
  ngOnInit(): void {
  }

  
openModal() {
  this.modalService.open('custom-modal-1');
}
onRowChange(type,value){
  
}

saveModal() {
  this.modalService.close('custom-modal-1');
}
closeModal() {
  this.modalService.close('custom-modal-1');
}
}