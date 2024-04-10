import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './navbar/cart/cart.component';
import { AccountComponent } from './navbar/account/account.component';
import { CompareComponent } from './navbar/compare/compare.component';
import { DashboardComponent } from './navbar/account/dashboard/dashboard.component';
import { ProfileComponent } from './navbar/account/profile/profile.component';
import { LoginComponent } from './navbar/account/login/login.component';
import { RegisterComponent } from './navbar/account/register/register.component';
import { LogoutComponent } from './navbar/account/logout/logout.component';
import { PasswordComponent } from './navbar/account/password/password.component';
import { DeletionComponent } from './navbar/account/deletion/deletion.component';

const accountRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'deletion', component: DeletionComponent},
  { path: 'logout', component: LogoutComponent },
];

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'account', component: AccountComponent, children: accountRoutes },
  { path: 'compare', component: CompareComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
