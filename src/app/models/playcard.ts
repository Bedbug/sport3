export class PlayCard{
    
	_id:string;
	gamecardTemplateId:string;
	gamecardDefenitionId:string;
	primaryStatistic:string;
	title:any;
	text:any;
	image:any;
	cardType:string;
	status:number;
	segment:number;
	minute:number;
	startPoints:number;
	optionId:string;
	endPoints:number;
	activationLatency:number;
	activationTime:Date;
    terminationTime:Date;
	creationTime:Date;
	pauseTime:Date;
	resumeTime:Date;
	specialCreationTime:Date;
	specialActivationTime:Date;
	wonTime:Date;
	pointsAwarded:number;
	duration:number;
	isDoublePoints:boolean;
    isDoubleTime:boolean;
    /// <summary>
    /// Set to true when a user has clicked to activate special
    /// and is in the process of activation.
    /// </summary>
    isDoublePointsActivating: boolean;
    
    /// <summary>
    /// Set to true when a user has clicked to activate special
    /// and is in the process of activation.
    /// </summary>
    isDoubleTimeActivating:boolean;
    Icon:string;
	options:any;
	specials: any;
	newCard:boolean;
}