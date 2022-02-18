import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-test',
  templateUrl: './redirect-test.component.html',
  styleUrls: ['./redirect-test.component.scss']
})
export class RedirectTestComponent implements OnInit {

  constructor(private router: Router, ) { }

  ngOnInit(): void {
    this.router.navigateByUrl('/Admin/PathologyTestList');
  }

}