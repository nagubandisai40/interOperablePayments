import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import { ServicesComponent } from './components/services/services.component';
import { AddAssetComponent } from './components/add-asset/add-asset.component';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { PayFromComponent } from './components/pay-from/pay-from.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'login',component:LoginComponent,canActivate:[LoggedOutGuard]},
  {path:'home',component:HomeComponent,canActivate:[LoggedOutGuard]},
  {path:'register',component:RegisterComponent,canActivate:[LoggedOutGuard]},
  {path:'dashboard',component:ServicesComponent,canActivate:[IsLoggedInGuard]},
  {path:'dashboard/add',component:AddAssetComponent,canActivate:[IsLoggedInGuard]},
  {path:'pay',component:PayFromComponent,canActivate:[IsLoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
