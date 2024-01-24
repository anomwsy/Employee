import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {
  constructor() { }
  logoUrl = 'https://angular.io/assets/images/logos/angular/angular.png';
  isOpenedNav : boolean = true;
  setOpenedNav(){
    this.isOpenedNav = !this.isOpenedNav
  }
}
