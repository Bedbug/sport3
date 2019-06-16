import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  submitted: boolean;
  isSubmitting: boolean;
  returnUrl: string;
  error = '';

  constructor(private formBuilder: FormBuilder,
    // private route: ActivatedRoute,
    // private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm.invalid);
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {          
          this.isSubmitting = false;          
          $('#app-login-modal').addClass('hidden');
        },
        error => {
          this.error = error;
          this.isSubmitting = false;
        });
  }

  get f() { return this.loginForm.controls; }

  cancel(){
    let el = $('#app-login-modal');
    el.addClass('hidden');
  }

}
