import { Team } from "./team";
import { Competition } from "./competition";

export class Match {
    _id: string;
    away_score: number;
    away_team: Team;
    competition: Competition;
    completed: boolean;
    createdAt: Date;
    disabled: boolean;
    guruStats: any;
    guruStatsChecked: boolean;
    headtohead: string[];
    home_score: number;
    home_team: Team;
    isTimeCounting: boolean;
    settings: any;
    moderation: []
    name: string;
    season: string;
    sport: string;
    start: Date;
    state: number;
    stats: any[];
    time: number;
    timeline: any[];
    updatedAt: Date;
    visiblein: string[];
}