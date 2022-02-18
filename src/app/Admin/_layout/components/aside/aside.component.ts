import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../_metronic/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  disableAsideSelfDisplay: boolean;
  headerLogo: string;
  brandSkin: string;
  ulCSSClasses: string;
  location: Location;
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses: string;
  asideMenuDropdown;
  brandClasses: string;
  asideMenuScroll = 1;
  asideSelfMinimizeToggle = false;
TestType=''
  constructor(private router: Router,private layout: LayoutService, private loc: Location) { }

  ngOnInit(): void {
    // load view settings
    this.disableAsideSelfDisplay =
      this.layout.getProp('aside.self.display') === false;
    this.brandSkin = this.layout.getProp('brand.self.theme');
    this.headerLogo = this.getLogo();
    this.ulCSSClasses = this.layout.getProp('aside_menu_nav');
    this.asideMenuCSSClasses = this.layout.getStringCSSClasses('aside_menu');
    this.asideMenuHTMLAttributes = this.layout.getHTMLAttributes('aside_menu');
    this.asideMenuDropdown = this.layout.getProp('aside.menu.dropdown') ? '1' : '0';
    this.brandClasses = this.layout.getProp('brand');
    this.asideSelfMinimizeToggle = this.layout.getProp(
      'aside.self.minimize.toggle'
    );
    this.asideMenuScroll = this.layout.getProp('aside.menu.scroll') ? 1 : 0;
    // this.asideMenuCSSClasses = `${this.asideMenuCSSClasses} ${this.asideMenuScroll === 1 ? 'scroll my-4 ps ps--active-y' : ''}`;
    // Routing
    this.location = this.loc;
    if(localStorage.getItem('PageInfoType') !=null &&  localStorage.getItem('PageInfotitle') !=null ){
      this.TestType=localStorage.getItem('PageInfoType');
    }
   
  }

  private getLogo() {
    if (this.brandSkin === 'light') {
      return './assets/media/logos/logo-light.png';
    } else {
      return './assets/media/logos/logo-light.png';
    }
  }

  routetoTestList(title,Type){ 
    localStorage.setItem('PageInfotitle',title);
    localStorage.setItem('PageInfoType',Type);
    this.TestType=Type;
    // 
    this.router.navigateByUrl('/Admin/RedirectTest');

  }
 
}
