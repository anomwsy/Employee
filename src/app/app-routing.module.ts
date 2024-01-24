import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './AuthGuard';
import { DisAuthGuard } from './DisAuthGuard';
import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { layout: 'default' } },
  { path: 'detail', component: DetailComponent, canActivate: [AuthGuard], data: { layout: 'default' } },
  { path: 'input', component: DetailComponent, canActivate: [AuthGuard], data: { layout: 'default' } },
  { path: 'login', component: LoginComponent, canActivate: [DisAuthGuard], data: { layout: 'auth' } },
  { path: 'NotFound', component: NotFoundComponent, data: { layout: 'auth' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
