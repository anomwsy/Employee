import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private currentLayout: string = 'default';

  constructor(public router: Router) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateLayout();
        }
      });
  }

  updateLayout() {
    const route = this.router.routerState.snapshot.root.firstChild;
    if (route && route.data) {
      this.currentLayout = route.data['layout'] || 'default';
    } else {
      this.currentLayout = 'default';
    }
  }

  getLayout(): string {
    return this.currentLayout;
  }
}
