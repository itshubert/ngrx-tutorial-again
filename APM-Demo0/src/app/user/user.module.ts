import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user.reducer';
import { reducer } from '../products/state/product.reducer';

const userRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes),
    StoreModule.forFeature('users', userReducer),
    StoreModule.forFeature('products', reducer)
  ],
  declarations: [
    LoginComponent
  ]
})
export class UserModule { }
