import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  @Input() isOpenedNav: boolean | undefined;
  @Output() openNav = new EventEmitter<boolean>();

  setIsOpenedNav() {
    this.openNav.emit();
  }
}
