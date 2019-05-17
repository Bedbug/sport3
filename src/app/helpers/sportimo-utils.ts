export class SportimoUtils{
     events_mapping = {
       "Goal": { text: "Goal", icon: "icn-goal", show:true },
        "Shot_on_Goal": { text: "Shot on Target", icon: "icn-shot", show:true },
        "First_Half_Starts": { text: "First Half Starts" },
        "Offside": { text: "Offside", icon: "icn-offside", show:true },
        "Corner": { text: "Corner", icon: "icn-corner", show:true },
        "First_Half_Ends": { text: "First Half Ends" },
      }

      sprite_mappings = {
        'shoton': "icn-shot",
        'offside': "icn-offside",
        'corner': "icn-corner",
        'foul': "icn-foul",
        'red': "icn-red",
        'yellow': "icn-yellow",
        'goal':'icn-goal',
        'penalty':'icn-penalty'
      }

       getFromEventType(type:string){

      }

      getIconBySprite(sprite:string){
        return this.sprite_mappings[sprite];
      }

      getTextByType(type: string) {
        console.log(type);
        
        return this.events_mapping[type].text;
      }
      getIconByType(type: string) {
        return this.events_mapping[type].icon;
      }
      shouldShow(type: string, data: any) {
        if (this.events_mapping[type].show)
          return data;
        else
          return null;
      }
}