import { Match } from "./match";

export class ContestMatch {
    client: string;
    created: Date;
    isHidden: boolean;
    match: Match;
    tournament: string;
    updated: Date;
    joined: boolean = false;
    joinPrize: number = 0;
    visibleInCountries: string[];
    _id: string;
}