import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SummaryPipe } from './shared/pipes/summary/summary.pipe';
import { LayoutComponent } from './shared/layouts/layout/layout.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LayoutService } from './shared/layouts/layout/layout.service';
import { HeaderComponent } from './shared/header/header.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { InputFormatDirective } from './shared/directives/input-format.directive';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { LoginComponent } from './components/Auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { DataService } from './shared/services/DataService/data.service';
import { DetailComponent } from './components/detail/detail.component';
import { CurrencyFormatInputDirective } from './shared/directives/currency-format-input.directive';
import { NotificationComponent } from './shared/modals/notification/notification.component';


@NgModule({
  declarations: [
    AppComponent,
    SummaryPipe,
    LayoutComponent,
    NavbarComponent,
    HeaderComponent,
    AuthLayoutComponent,
    InputFormatDirective,
    HighlightDirective,
    LoginComponent,
    NotFoundComponent,
    HomeComponent,
    DetailComponent,
    CurrencyFormatInputDirective,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LayoutService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
