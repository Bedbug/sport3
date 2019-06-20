import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';

export const passwordMismatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password1 = control.get('password');
  const password2 = control.get('password2');

  return password1.value === password2.value ? null : { 'passwordMismatch': true };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  incorrectPin: boolean;
  isSubmitting: boolean;
  submitted: boolean;

  ngUnsubscribe = new Subject();
  user: User;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.step1Form = this.formBuilder.group({
      msisdn: ['', Validators.required]
    });
    this.step2Form = this.formBuilder.group({
      pin: ['', Validators.required]
    });
    this.step3Form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    },
     { validators: passwordMismatchValidator }
    );

    this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user=>{
      this.user = user;
    })
  }

  cancel(){
    let el = $('#app-register-modal');
    el.addClass('hidden');
  }

  onCredsSubmit(){
    $('#app-register-modal #step4').addClass('modal-appear');
    $('#app-register-modal #step4').removeClass('hidden');
    $('#app-register-modal #step3').removeClass('modal-appear');
    $('#app-register-modal #step3').addClass('hidden');
    this.authenticationService.addDemoOneWeekSubscription();
  }

  onMSISDNSubmit(){
    $('#app-register-modal #step2').addClass('modal-appear');
    $('#app-register-modal #step2').removeClass('hidden');
    $('#app-register-modal #step1').removeClass('modal-appear');
    $('#app-register-modal #step1').addClass('hidden');
  }

  onPinSubmit(){
    $('#app-register-modal #step3').addClass('modal-appear');
    $('#app-register-modal #step3').removeClass('hidden');
    $('#app-register-modal #step2').removeClass('modal-appear');
    $('#app-register-modal #step2').addClass('hidden');
  }
}
