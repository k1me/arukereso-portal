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
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProductsComponent } from './home/products/products.component';
import { MatCardModule } from '@angular/material/card';
import { ProductComponent } from './home/products/product/product.component';
import { ProductUploadComponent } from './navbar/account/product-upload/product-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CartComponent,
    HomeComponent,
    AccountComponent,
    DashboardComponent,
    ProfileComponent,
    PasswordComponent,
    LogoutComponent,
    LoginComponent,
    RegisterComponent,
    DeletionComponent,
    ProductsComponent,
    ProductComponent,
    ProductUploadComponent,
    
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
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
