import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportimoService } from 'src/app/services/sportimo.service';
import { Contest } from 'src/app/models/contest';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contest-page-prizes',
  templateUrl: './contest-page-prizes.component.html',
  styleUrls: ['./contest-page-prizes.component.scss']
})
export class ContestPagePrizesComponent implements OnInit {

  selectedPrize: any = null;

  prizes: any[] = [
    {
      position: { from: 1 },
      prize: {
        picture: "https://via.placeholder.com/640x450",
        name: { en: "Your favorite Team Jerseys" },
        text: { en: "Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molesti." }
      }
    },
    {
      position: { from: 2 },
      prize: {
        picture: "https://via.placeholder.com/640x450",
        name: { en: "4G Mobile Data" },
        text: { en: "Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molesti." }
      }
    },
    {
      position: { from: 3 },
      prize: {
        picture: "https://via.placeholder.com/640x450",
        name: { en: "100 signed autographs" },
        text: { en: "Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molesti." }
      }
    }
  ]

  constructor(private route: ActivatedRoute, private sportimoService: SportimoService, public translate: TranslateService) { }

  contestDetails: Contest;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sportimoService.getContestQuickDetails(params.get("contestId"))
        .subscribe(result => {
          this.contestDetails = result;
          if (this.contestDetails)
            this.sportimoService.getContestPrizes(this.contestDetails._id).subscribe(prizes => {
              this.prizes = prizes;
            }
            );
        });
    })
  }

  selectPrize(prize: any) {
    this.selectedPrize = prize;
  }

  cancel() {
    this.selectedPrize = null;
  }
}
