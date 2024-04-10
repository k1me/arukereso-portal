import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbar } from '@angular/material/toolbar'
import { MatFormField } from '@angular/material/form-field'
import { MatToolbarRow } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { CartComponent } from './navbar/cart/cart.component';
import { HomeComponent } from './home/home.component';
import { CompareComponent } from './navbar/compare/compare.component';
import { AccountComponent } from './navbar/account/account.component';
import { DashboardComponent } from './navbar/account/dashboard/dashboard.component';
import { ProfileComponent } from './navbar/account/profile/profile.component';
import { PasswordComponent } from './navbar/account/password/password.component';
import { LogoutComponent } from './navbar/account/logout/logout.component';
import { LoginComponent } from './navbar/account/login/login.component';
import { RegisterComponent } from './navbar/account/register/register.component';
import { DeletionComponent } from './navbar/account/deletion/deletion.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CartComponent,
    HomeComponent,
    CompareComponent,
    AccountComponent,
    DashboardComponent,
    ProfileComponent,
    PasswordComponent,
    LogoutComponent,
    LoginComponent,
    RegisterComponent,
    DeletionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbar,
    MatFormField,
    MatToolbarRow,
    MatIcon,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
