import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FilePreviewOverlayRef } from 'src/app/sections/main/prize-view-overlay/prize-preview-overlay-ref';
import { SportimoService } from 'src/app/services/sportimo.service';

declare var defPrompt:any;

@Component({
  selector: 'app-install-popup',
  templateUrl: './install-popup.component.html',
  styleUrls: ['./install-popup.component.scss']
})
export class InstallPopupComponent implements OnInit {

  buttonDisabled = true;
  appName: any;
  constructor(
    public translate:TranslateService,
    public dialogRef: FilePreviewOverlayRef,
    private sportimoService:SportimoService) { }

  ngOnInit(): void {

    this.appName = this.sportimoService.getConfigurationFor('appName');
    // this.sportimoService.configuration.subscribe(data=>{
    //   this.appname = data.appName;
    //   this.useWallet = !data.disableWallet;
    //   console.log("Wallet:"+ this.useWallet);
      
    // })
    this.buttonDisabled = defPrompt == undefined;
  }

  installApp(){    
    
    this.dialogRef.close();
    
    defPrompt.prompt();
    // Wait for the user to respond to the prompt
    defPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        defPrompt = null;
      });
  }

  close() {
    this.dialogRef.close();
  }

}
