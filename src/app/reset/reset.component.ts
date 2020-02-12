import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { TranslateService } from '@ngx-translate/core';

export const passwordMismatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password1 = control.get('password');
  const password2 = control.get('password2');

  return password1.value === password2.value ? null : { 'passwordMismatch': true };
};

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  step1Form: FormGroup;
  step3Form: FormGroup;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder, 
    private authenticationService: AuthenticationService, 
    private route: ActivatedRoute,
    private router: Router,
    public translate: TranslateService) { 
   
  }
  
  token: string = "empty";

  ngOnInit() {
    
    // this.step1Form = this.formBuilder.group({
    //   msisdn: ['', Validators.required]
    // });    
    this.route.paramMap.subscribe(params => {
      this.token = params.get("token");      
    })

    this.step3Form = this.formBuilder.group({
      // new FormControl({value: 'Nancy', disabled: true}
      token: [{value: this.token, disabled: true}],
      username: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    },
      { validators: passwordMismatchValidator }
    );
  }


   onSubmit() {
    this.isSubmitting = true;

    this.router.navigate(['/']);
    // this.authenticationService.registerUser(this.step3Form.controls.username.value, this.step3Form.controls.password.value)
    //   .subscribe(
    //     response => {
    //       console.log(response);
    //       this.isSubmitting = false;
    //       $('#app-register-modal #step4').addClass('modal-appear');
    //       $('#app-register-modal #step4').removeClass('hidden');
    //       $('#app-register-modal #step3').removeClass('modal-appear');
    //       $('#app-register-modal #step3').addClass('hidden');
    //       this.authenticationService.login(this.step3Form.controls.username.value, this.step3Form.controls.password.value).subscribe();
    //     },
    //     error => {
    //       this.isSubmitting = false;
    //     });
   
  }

}
