export class User {
    _id: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    inbox?: string[];
    unread?: number;
    pushToken?: string;
    client?: string;
    achievements?: any;
    stats?: any;
    role?: string;
    name?: String;
    email?: string;
    token: string;
    country?: string;
    birth?: string;
    gender?: string;
    msisdn?: string;
    pincode?: string;
    picture?: string;
    subscription?: string;
    subscriptionEnd?: Date;
    wallet?: number;
    loyaltyCoins?: number;
    favTeams?: any;
    operatorId?: any;
    pushEnabled: boolean = false;
    languagePreference:string;
    pushSettings: any = {
        all: false,
        new_message: true,
        match_reminder: true,
        kick_off: true,
        goals: true,
        won_cards: true,
        final_result: true
    }
}
// "pushSettings": {
//     "all": true,
//     "new_message": true,
//     "match_reminder": true,
//     "kick_off": true,
//     "goals": true,
//     "won_cards": true,
//     "final_result": true
// },