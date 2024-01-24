import { Component,Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  logoUrl = 'https://angular.io/assets/images/logos/angular/angular.png';
  @Output() openNav = new EventEmitter<boolean>();
  constructor(private route: ActivatedRoute, private router: Router) { }
  setIsOpenedNav() {
    this.openNav.emit();
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
