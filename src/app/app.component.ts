import { Component } from '@angular/core';
import { LayoutService } from './shared/layouts/layout/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'employee';
  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.layoutService.updateLayout();
  }

  currentLayout(): string {
    return this.layoutService.getLayout();
  }
}
