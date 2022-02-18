import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/Shared/PatientService ';

@Component({
  selector: 'app-enter-test',
  templateUrl: './enter-test.component.html',
  styleUrls: ['./enter-test.component.scss']
})
export class EnterTestComponent implements OnInit {
  @ViewChild('pdfViewer') pdfViewer

  constructor( private _PatientService: PatientService) { 

    localStorage.setItem('PageTitle', "Add Test");}

  ngOnInit(): void {
    this.openPdf()
  }

  public openPdf() {

    // this._PatientService.Report().subscribe(
    //   (res: any) => {
    //     this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
    //     this.pdfViewer.refresh(); // Ask pdf viewer to load/reresh pdf
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );

  }
}
