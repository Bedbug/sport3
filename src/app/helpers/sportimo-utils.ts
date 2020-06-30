import { _ } from "@biesbjerg/ngx-translate-extract/dist/utils/utils";
// import moment from "jalali-moment";
import moment from 'moment-jalaali';
// import 'moment/min/locales';
// import * as moment from 'jalali-moment';

export class SportimoUtils {
  
  events_mapping = {
    "Goal": { text: "Goal", icon: "icn-goal", show: true },
    "Own_Goal": { text: "Own Goal", icon: "icn-goal", show: true },
    "Shot_on_Goal": { text: "Shot on Target", icon: "icn-shot", show: true },
    "Offside": { text: "Offside", icon: "icn-offside", show: true },
    "Corner": { text: "Corner", icon: "icn-corner", show: true },
    "Yellow": { text: "Yellow", icon: "icn-yellow", show: true },
    "Penalty": { text: "Penalty", icon: "icn-penalty", show: true },
    "Red": { text: "Red", icon: "icn-red", show: true },
    "Foul": { text: "Foul", icon: "icn-foul", show: true },
    "Substitution": { text: "Substitution", icon: "icn-substitution", show: true },
    "First_Half_Starts": { text: "First Half Starts", icon: "icn-stopwatch" },
    "First_Half_Ends": { text: "First Half Ends", icon: "icn-stopwatch" },
    "Second_Half_Starts": { text: "Second Half Starts", icon: "icn-stopwatch" },
    "Second_Half_Ends": { text: "Second Half Ends", icon: "icn-stopwatch" },
    "Overtime_First_Half_Starts": { text: "Overtime First Half", icon: "icn-stopwatch" },
    "Overtime_First_Half_Ends": { text: "Overtime First Half Ends", icon: "icn-stopwatch" },
    "Overtime_Second_Half_Starts": { text: "Overtime Second Half", icon: "icn-stopwatch" },
    "Overtime_Second_Half_Ends": { text: "Overtime Second Half Ends", icon: "icn-stopwatch" },
  }

  sprite_mappings = {
    'shoton': "icn-shot",
    'offside': "icn-offside",
    'corner': "icn-corner",
    'foul': "icn-foul",
    'red': "icn-red",
    'yellow': "icn-yellow",
    'goal': 'icn-goal',
    'penalty': 'icn-penalty',
    'substitution': 'icn-substitution',
    'most-yellow': 'icn-yellows',
    'result': 'icn-result',
    'nr-offsides': 'icn-offsides',
    'nr-corners': 'icn-corners',
    'firstgoal': 'icn-defence',
    'most-shots-target': 'icn-shots',
  }

  matchStatues = {
    0: "Pregame",
    1: "LIVE",
    2: "HalfTime",
    3: "LIVE",
    4: "MatchEnded",
    5:  "LIVE",
    6:  "HalfTime",
    7:  "LIVE",
    8:  "MatchEnded",
  }

  translateMappings() {
    _("Goal");
    _("Own_Goal");
    _("Shot_on_Goal");
    _("Offside");
    _("Corner");
    _("Yellow");
    _("Penalty");
    _("Red");
    _("Foul");
    _("Substitution");
    _("First_Half_Starts");
    _("First_Half_Ends");
    _("Second_Half_Starts");
    _("Second_Half_Ends");
    _("Overtime_First_Half_Starts");
    _("Overtime_First_Half_Ends");
    _("Overtime_Second_Half_Starts");
    _("Overtime_Second_Half_Ends");
    _("MatchEnded");
    _("HalfTime");
    _("Pregame");
  }

  getFromEventType(type: string) {

  }

  getStatusText(status: any) {
   return this.matchStatues[status];
  }

  getIconBySprite(sprite: string) {
    return this.sprite_mappings[sprite];
  }

  getTextByType(type: string) {
    return this.events_mapping[type].text;
  }
  getIconByType(type: string) {
    return this.events_mapping[type].icon;
  }
  shouldShow(type: string, data: any) {
    if (this.events_mapping[type]) {
      if (this.events_mapping[type].show)
        return data;
      else
        return null;
    } else {
      return null;
    }
  }

  parseDate(date: string, jalali: boolean, format: string = 'D/MM/YY', jalaliFormat:string = 'jD jMM jYY') {
    // console.log(date);
    if (!date)
      return "";

    moment.locale('en');    
    let returnDate = moment(date);
   
    if (jalali) {
      return this.parseNumbers(returnDate.format(jalaliFormat),true);
      // return this.parseNumbers(returnDate.locale('fa').format(format), true);
      // console.log("fa: "+returnDate);
    } else {      
      return returnDate.locale('en').format(format);      
    }
    return returnDate;

  }

  parseNumbers(text: string, persian: boolean) {    
    if (text === undefined)
      return 0;
    if (persian) {
      var id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return text.toString().replace(/[0-9]/g, function (w) {
        return id[+w]
      });
    }
    else
     {
        return text;
      }
  }

}