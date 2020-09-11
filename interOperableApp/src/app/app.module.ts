import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { HeaderComponent } from './components/header/header.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {FormsModule} from '@angular/forms';
import {HttpinterceptorInterceptor} from 'src/app/interceptors/httpinterceptor.interceptor';
import { ServicesComponent } from './components/services/services.component';
import { AddAssetComponent } from './components/add-asset/add-asset.component';
import { SearchPipe } from './pipes/search.pipe';
import {NgxSpinnerModule} from 'ngx-spinner';
import { PayFromComponent } from './components/pay-from/pay-from.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    ServicesComponent,
    AddAssetComponent,
    SearchPipe,
    PayFromComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorInterceptor , multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
