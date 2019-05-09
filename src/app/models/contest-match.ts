import { Match } from "./match";

export class ContestMatch {
    client: string;
    created: Date;
    isHidden: boolean;
    match: Match;
    tournament: string;
    updated: Date;
    visibleInCountries: string[];
    _id: string;
}