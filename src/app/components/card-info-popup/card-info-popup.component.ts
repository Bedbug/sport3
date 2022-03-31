import { Component, OnInit, Inject } from '@angular/core';
import { FilePreviewOverlayRef } from 'src/app/sections/main/prize-view-overlay/prize-preview-overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from 'src/app/sections/main/prize-view-overlay/prize-preview-overlay.tokens';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { SportimoService } from 'src/app/services/sportimo.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfigService } from 'src/app/services/config.service';
declare var zE;

@Component({
  selector: 'app-card-info-popup',
  templateUrl: './card-info-popup.component.html',
  styleUrls: ['./card-info-popup.component.scss']
})
export class CardInfoPopupComponent implements OnInit {

  sportUtils: SportimoUtils = new SportimoUtils();
  cardData: any;
  contactBox = false;
  zendeskIsEnabled = true;

  constructor( 
    private sportimoService: SportimoService, 
    public translate: TranslateService,
    public dialogRef: FilePreviewOverlayRef,
    public authentication: AuthenticationService,    
    @Inject(FILE_PREVIEW_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    console.log(this.sportimoService.getConfigurationFor("zendeskIsEnabled"));
    this.zendeskIsEnabled = this.sportimoService.getConfigurationFor("zendeskIsEnabled");
    this.cardData = this.data;
  }

  close() {
   
    this.dialogRef.close();
  }

  getFormatedOption(text: string) {
    const home_team = this.sportimoService.getCurrentLiveMatchData().value.matchData.home_team.name[this.translate.currentLang] || this.sportimoService.getCurrentLiveMatchData().value.matchData.home_team.name['en'];
    const away_team = this.sportimoService.getCurrentLiveMatchData().value.matchData.away_team.name[this.translate.currentLang] || this.sportimoService.getCurrentLiveMatchData().value.matchData.away_team.name['en'];
    if (text)
      return text.replace("[[home_team_name]]", home_team).replace('[[away_team_name]]', away_team);
    else return "__missing text";
  }

  openContactBox(){
    this.contactBox = true;
  }

  openZendesk(){
    zE('webWidget', 'show');
    const currentUser = this.authentication.currentUserValue;

    zE('webWidget', 'prefill', {
      name: {
        value: currentUser._id,
        readOnly: true // optional
      },      
      phone: {
        value: currentUser.msisdn,
        readOnly: true // optional
      }    
    });

    zE('webWidget', 'open');
  
    
    // var el = document.querySelector('[role="presentation"]');
    //   el.classList.add("zEShow");      
    //   zE('messenger', 'open');
    // this.dialogRef.close();
  }

  ngOnDestroy(){
    // var el = document.querySelector('[role="presentation"]');
    // el.classList.remove("zEShow");
    zE('webWidget', 'hide');
  }


}
