import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { TranslateService } from '@ngx-translate/core';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { SportimoService } from 'src/app/services/sportimo.service';
import { ConfigService } from 'src/app/services/config.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  appname: any;
  isLoggedIn: boolean = false;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  showLoginForm = false;
  currentUser: User;
  Utils: SportimoUtils = new SportimoUtils();
  useWallet: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private sportimoService:SportimoService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public translate:TranslateService,
    private configService:ConfigService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      // this.router.navigate(['/user/contests']);
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  }


  deferredPrompt: any;
  showButton = false;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {    
    // console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }


  addToHomeScreen() {
    
    if(!this.showButton)
      return;

    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }
  
  ngOnInit() {
    $.getScript('assets/js/script.js');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    this.authenticationService.currentUser.subscribe(x=>{
      this.currentUser = x;
    })

    this.sportimoService.configuration.subscribe(data=>{
      this.appname = data.appName;
      this.useWallet = !data.disableWallet;
    })

    this.checkUserStatus();
  }

  checkUserStatus() {
    setTimeout(()=>{
      if(this.authenticationService.currentUserValue && this.authenticationService.currentUserValue.token)
        this.authenticationService.checkUserStatus();
      this.checkUserStatus();
    },30000)
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.isLoggedIn = this.authenticationService.currentUserValue != undefined;
          this.loading = false;
          if (!this.returnUrl)
            this.router.navigate(['/main/contests']);
          else
            this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  parseNumbers(text:string){
    if(!text)
    text = "0";
    return this.Utils.parseNumbers(text,this.translate.currentLang == 'fa');
  }

  logout() {
    this.authenticationService.logout();
    this.isLoggedIn = false;
}

}
