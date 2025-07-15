import { Injectable } from '@angular/core';
import { Olympic } from '../Models/Olympic';
import { PieData } from '../Models/PieData';
import { TotalMedalCalc } from './totalCalculate';


@Injectable({
  providedIn: 'root'
})
export class ToPieChart {

   ToPieChartData(olympicCountry: Olympic[]): PieData[] {
    return olympicCountry.map(country => ({
        name: country.country,
        value: TotalMedalCalc(country.participations, 'medalsCount'),
        id: country.id
      }));
  }
}
