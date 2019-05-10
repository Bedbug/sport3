import { Match } from "./match";
import { PlayCard } from "./playcard";

export class LiveMatch{
    _id:string;
	userScore:number;
	prize_eligible?: boolean;
	matchData: Match;
	playedCards:PlayCard[];
}