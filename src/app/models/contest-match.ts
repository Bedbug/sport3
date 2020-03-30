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
    vipText?: string;
    isSubscribed?: boolean;
    subscriptionPrice?: number;
    _id: string;
}