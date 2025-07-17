import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { Olympic } from '../../Models/Olympic';
import { OlympicService } from '../../Services/olympic.service';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieData } from '../../Models/PieData';
import { CommonModule } from '@angular/common';




// The HomeComponent displays a pie chart of Olympic countries and their medal counts.
// It retrieves the Olympic data from the service, processes it into pie chart data,  
// and allows navigation to detailed views of each country when a pie slice is clicked.
@Component({
  selector: 'app-home',
  imports: [NgxChartsModule, CommonModule],
  standalone: true,
  templateUrl: 'home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  olympics$!: Observable<Olympic[]>;
  pieData$!: Observable<PieData[]>;
  private destroy$ = new Subject<void>();
  numberOfJOs$!: Observable<number>;


  constructor(private olympicService: OlympicService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.olympics$ = this.olympicService.getOlympics();

    this.pieData$ = this.getPieChartData(this.olympics$);

    // Calculate the number of unique years from the participations as an observable
    this.numberOfJOs$ = this.olympics$.pipe(
      map(olympics => {
        const allYears = olympics.flatMap(country => country.participations.map(pa => pa.year));
        return new Set(allYears).size;
      })
    );

  }
      

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** PieChart options */
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  width!: number;
  height!: number;


  onCountrySelect(event: PieData): void {
    // Navigate to the detail page with the selected country name
    this.router.navigateByUrl(`detail/${(event.name)}`);
  }


  private getPieChartData(olympics$: Observable<Olympic[]>): Observable<PieData[]> {
    return olympics$.pipe(
      map(countries =>
        countries.map(country => ({
          id: country.id,
          name: country.country,
          value: this.olympicService.totalMedalCalc(country.participations, 'medalsCount')
        }))
      )
    );
  }




}
