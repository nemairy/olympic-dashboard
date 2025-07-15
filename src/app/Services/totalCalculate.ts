
import { Participation } from "../Models/Participation";



export function TotalMedalCalc(participations: Participation[], athlet: string): number {
  if (athlet === 'athleteCount') {
    return participations.reduce((total, participation) => total + participation.athleteCount, 0);
  }
  return participations.reduce((total, participation) => total + participation.medalsCount, 0);
} 