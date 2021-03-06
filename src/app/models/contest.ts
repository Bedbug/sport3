export class Contest {
    _id?: string;
    client?: string;
    promoImage?: string;
    promoDetailImage?: string;
    matches?: number;
    participations?: number;
    winners?: number;
    titleText?: object;
    smallInfoText?: object;    
    infoText?: object;
    detailText?: object;
    startFromDate?: Date;
    endToDate?: Date;
    state?: string;
    subscriptionPrice?: number;
    discountText?: string;
    leaderboardDefinition?: any;
    isSubscribed?: boolean;
    created?: Date;
    showParticipations?: boolean;
    isUserDetails?: boolean;
    user_chances?: number;
}
