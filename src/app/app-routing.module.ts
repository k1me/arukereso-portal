import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { CompareComponent } from './compare/compare.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cart', component: CartComponent },
    { path: 'account', component: AccountComponent },
    { path: 'compare', component: CompareComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
