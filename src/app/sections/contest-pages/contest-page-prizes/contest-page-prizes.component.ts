import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportimoService } from 'src/app/services/sportimo.service';
import { Contest } from 'src/app/models/contest';

@Component({
  selector: 'app-contest-page-prizes',
  templateUrl: './contest-page-prizes.component.html',
  styleUrls: ['./contest-page-prizes.component.scss']
})
export class ContestPagePrizesComponent implements OnInit {

  selectedPrize:any = null;

  prizes:any[]=[
    {
      rank:"1st Prize",
      image:"https://via.placeholder.com/640x450",
      title:"Your favorite Team Jerseys",
      text:"Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molesti."
    },
    {
      rank:"2nd Prize",
      image:"https://via.placeholder.com/640x450",
      title:"4G Mobile Data",
      text:"Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molesti."
    },
    {
      rank:"3d Prize",
      image:"https://via.placeholder.com/640x450",
      title:"100 signed autographs",
      text:"Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molesti."
    } 
  ]
  
  constructor(private route:ActivatedRoute, private sportimoService:SportimoService) { }

  contestDetails: Contest;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {      
      this.sportimoService.getContestQuickDetails(params.get("contestId"))
      .subscribe(result => {
        this.contestDetails = result;
      });
    })
  }

  selectPrize(prize:any){
    this.selectedPrize = prize;
  }

  cancel(){
    this.selectedPrize = null;
  }
}
