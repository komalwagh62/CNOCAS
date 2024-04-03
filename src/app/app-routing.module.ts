import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './UI/header/header.component';
import { UserComponent } from './userD/user-login/user.component';
import { HomeComponent } from './UI/home/home.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { ForgotPasswordComponent } from './userD/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { USerRegisterComponent } from './userD/user-register/user-register.component';
import { UsersProfileComponent } from './userD/users-profile/users-profile.component';
import { DashboardComponent } from './UI/dashboard/dashboard.component';
import { SubscriptionComponent } from './userD/subscription/subscription.component';
import { PaymentGatewayComponent } from './userD/payment-gateway/payment-gateway.component';

import { PermissibleHeight } from './userD/permissible-height/permissible-height.component';


const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' }, 
  { path: 'Home', component: DashboardComponent },
  { path: 'UserLogin', component: UserComponent },
  { path: 'user-registration', component: USerRegisterComponent },
  { path: 'forgot-pass', component: ForgotPasswordComponent },
  { path: 'users-profile', component: UsersProfileComponent },
  { path: 'subscription', component: SubscriptionComponent },
  {path:'payment-gateway',component:PaymentGatewayComponent},
  {path:'permissible-height',component:PermissibleHeight}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
