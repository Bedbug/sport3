export class GrandPrize {
    _id: string;
    promoDetailImage: string;
    promoImage: string;
    titleText: object;
    infoText: object;
    detailText: object;
    endToDate: Date;
    created: Date;
    prizes: any[];
    isMajor: boolean;
    chances: number;
    timer: any;
    countDownEndDate: number;
    countdown: any;
}