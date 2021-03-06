import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';
import * as fromUsers from './state/user.reducer';
import * as userActions from './state/user.actions';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;
  maskUsername$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    // this.store.pipe(select('users'))
    //   .subscribe(users => {
    //     if (users) {
    //       this.maskUserName = users.mask;
    //     }
    //   });
    // replaced with

    // this.store.pipe(select(fromUsers.getMaskUsername))
    //   .subscribe(maskUsername => this.maskUserName = maskUsername);

    this.maskUsername$ = this.store.pipe(select(fromUsers.getMaskUsername));
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new userActions.MaskUsername(value));
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
