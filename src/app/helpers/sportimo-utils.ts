export class SportimoUtils {
  events_mapping = {
    "Goal": { text: "Goal", icon: "icn-goal", show: true },
    "Shot_on_Goal": { text: "Shot on Target", icon: "icn-shot", show: true },
    "Offside": { text: "Offside", icon: "icn-offside", show: true },
    "Corner": { text: "Corner", icon: "icn-corner", show: true },
    "Yellow": { text: "Yellow", icon: "icn-yellow", show: true },
    "Red": { text: "Red", icon: "icn-red", show: true },
    "Foul": { text: "Foul", icon: "icn-foul", show: true },
    "Substitution": { text: "Substitution", icon: "icn-substitution", show: true },
    "First_Half_Starts": { text: "First Half Starts", icon: "icn-stopwatch" },
    "First_Half_Ends": { text: "First Half Ends", icon: "icn-stopwatch"},
    "Second_Half_Starts": { text: "Second Half Starts", icon: "icn-stopwatch"},
    "Second_Half_Ends": { text: "Second Half Ends", icon: "icn-stopwatch"},
    "Overtime_First_Half_Starts": { text: "Overtime First Half", icon: "icn-stopwatch"},
    "Overtime_First_Half_Ends": { text: "Overtime First Half Ends", icon: "icn-stopwatch"},
    "Overtime_Second_Half_Starts": { text: "Overtime Second Half", icon: "icn-stopwatch"},
    "Overtime_Second_Half_Ends": { text: "Overtime Second Half Ends", icon: "icn-stopwatch"},
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
    'firstgoal':'icn-defence',
    'most-shots-target':'icn-shots',
  }

  getFromEventType(type: string) {

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
    } else{
      return null;
    }
  }
}