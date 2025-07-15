
import { Injectable } from "@angular/core";
import { LineData } from "../Models/LineData";
import { Olympic}   from "../Models/Olympic";

@Injectable({
  providedIn: 'root'
})

export class ToLineChartService {

    toLineChartData(olympic: Olympic): LineData{
       return {
        name: olympic.country,
        series: olympic.participations.map(participation => 
           ({
            name: participation.year.toString(),
            value: participation.medalsCount
          })
        )
      };
  }
    
}