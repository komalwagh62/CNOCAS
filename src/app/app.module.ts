import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HeaderComponent } from './UI/header/header.component';
import { UserComponent } from './userD/user-login/user.component';
import { HomeComponent } from './UI/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './userD/forgot-password/forgot-password.component';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';

import { USerRegisterComponent } from './userD/user-register/user-register.component';
import { UsersProfileComponent } from './userD/users-profile/users-profile.component';
import { FooterComponent } from './UI/footer/footer.component';
import { DashboardComponent } from './UI/dashboard/dashboard.component';
import { SidebarComponent } from './userD/sidebar/sidebar.component';
import { SubscriptionComponent } from './userD/subscription/subscription.component';
import { PaymentGatewayComponent } from './userD/payment-gateway/payment-gateway.component';

import { PermissibleHeight } from './userD/permissible-height/permissible-height.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    HomeComponent,
    USerRegisterComponent,
    AdminComponent,
    ForgotPasswordComponent,
    UsersProfileComponent,
    FooterComponent,
    DashboardComponent,
    SidebarComponent,
    SubscriptionComponent,
    PaymentGatewayComponent,
    PermissibleHeight,
   
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add this line for template-driven forms
    ReactiveFormsModule, // Add this line for reactive forms
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    
   
    ToastrModule.forRoot(),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
