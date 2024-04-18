import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './navbar/cart/cart.component';
import { AccountComponent } from './navbar/account/account.component';
import { DashboardComponent } from './navbar/account/dashboard/dashboard.component';
import { ProfileComponent } from './navbar/account/profile/profile.component';
import { LoginComponent } from './navbar/account/login/login.component';
import { RegisterComponent } from './navbar/account/register/register.component';
import { LogoutComponent } from './navbar/account/logout/logout.component';
import { PasswordComponent } from './navbar/account/password/password.component';
import { DeletionComponent } from './navbar/account/deletion/deletion.component';
import { ProductsComponent } from './home/products/products.component';
import { ProductComponent } from './home/products/product/product.component';
import { ProductUploadComponent } from './navbar/account/product-upload/product-upload.component';
import { OrdersComponent } from './navbar/account/orders/orders.component';
import { OrderComponent } from './navbar/account/orders/order/order.component';

const orderRoutes: Routes = [
  { path: 'order/:id', component: OrderComponent },
];

const accountRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'orders', component: OrdersComponent, children: orderRoutes },
  { path: 'password', component: PasswordComponent },
  { path: 'deletion', component: DeletionComponent},
  { path: 'logout', component: LogoutComponent },
  { path: 'new-product', component: ProductUploadComponent },
  { path: '' , redirectTo: 'dashboard', pathMatch: 'full' },
];

const homeRoutes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products/category/:category', component: ProductsComponent },
  { path: 'products/:id', component: ProductComponent },
];

const routes: Routes = [
  { path: '', component: HomeComponent, children: homeRoutes},
  { path: 'cart', component: CartComponent },
  { path: 'account', component: AccountComponent, children: accountRoutes },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new-product', component: ProductUploadComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
