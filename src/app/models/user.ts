export class User {
    _id: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    inbox?: string[];
    unread?:number;
    pushToken?:string;
    client?:string;
    achievements?:any;
    stats?:any;
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
    favTeams?: any;
}