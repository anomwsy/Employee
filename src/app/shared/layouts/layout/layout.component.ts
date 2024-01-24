import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor() { }
  isOpenedNav : boolean = true;
  setOpenedNav(){
    this.isOpenedNav = !this.isOpenedNav
  }
}
