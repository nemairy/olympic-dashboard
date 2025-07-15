import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Olympic } from '../../Models/Olympic';
import { OlympicService } from '../../Services/olympic.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { ToLineChartService } from '../../Services/ToLineChart.service';
import { TotalMedalCalc } from '../../Services/totalCalculate';
import { LineData } from '../../Models/LineData';
import { Subject, takeUntil } from 'rxjs';

// The CountryDetail component displays detailed information about a specific country in the Olympic dashboard.
// It retrieves the country data based on the route parameter, calculates total medals and athletes,
// and prepares the data for a line chart visualization of Olympic participations.
@Component({
  selector: 'app-country-detail',
  imports: [NgxChartsModule, CommonModule],
  standalone: true,
  templateUrl: './country-detail.html',
  styleUrls: ['./country-detail.scss']
})

export class CountryDetail implements OnInit {

  private destroy$ = new Subject<void>();
  lineChartData!: LineData;
  country!: Olympic;
  totalMedals: number = 0;
  totalAthletes: number = 0;
  numberOfJOs: number = 0;



  gradient: boolean = true;
  legend: boolean = false;
  showRefLines: boolean = true;
  showRefLabels: boolean = true;
  showGridLines: boolean = true;
  animations: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Medals Count';
  timeline: boolean = false;
  width: number = Math.min(Math.max(window.innerWidth * 0.6, 300), 900);
  height: number = Math.max(Math.floor(window.innerHeight * 0.6), 400);


  constructor(
    private activatedRoute: ActivatedRoute,
    private olympicService: OlympicService,
    private toLineChartService: ToLineChartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentCountryName = this.activatedRoute.snapshot.paramMap.get('name');


    this.olympicService.getOlympics().pipe(takeUntil(this.destroy$))
      .subscribe(olympicCountries => {
        this.country = olympicCountries.find(o => o.country === currentCountryName)!;
        if (this.country) {
          this.totalMedals = TotalMedalCalc(this.country.participations, 'medalsCount');
          this.totalAthletes = TotalMedalCalc(this.country.participations, 'athleteCount');
          this.lineChartData = this.toLineChartService.toLineChartData(this.country);
          this.numberOfJOs = this.country.participations.length;
        }
        else {
          this.router.navigateByUrl('not-found');
        }
      });

  }




  // Adjust the chart size on window resize
  @HostListener('window:resize')
  onResize() {
    this.width = Math.min(Math.max(window.innerWidth * 0.6, 300), 900);
    this.height = Math.max(Math.floor(window.innerHeight * 0.6), 400);
  }
  // Navigate back to the home page
  backToHome() {
    this.router.navigate(['/']);
  }

  // Clean up subscriptions to prevent memory leaks.
  // Calling next() and complete() on the Subject triggers unsubscription for all observables using takeUntil,
  // ensuring that no subscriptions remain active after the component is destroyed.
  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.complete();
  }
}