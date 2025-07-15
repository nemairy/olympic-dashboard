import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Olympic } from '../../Models/Olympic';
import { OlympicService } from '../../Services/olympic.service';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieData } from '../../Models/PieData';
import { CommonModule } from '@angular/common';
import { ToPieChart } from '../../Services/to-pie-chart';



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
export class HomeComponent implements OnInit {
  olympics$!: Observable<Olympic[]>;
  pieData: PieData[] = [];
  numberOfJOs: number = 0;


  constructor(private olympicService: OlympicService,
    private router: Router,
    private toPieDataService: ToPieChart) { }

  ngOnInit() {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe(olympics => {
      this.pieData = this.toPieDataService.ToPieChartData(olympics);
    }
    )


  }

  /** PieChart options */
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  width!: number;
  height!: number;


  @HostListener('window:resize')
  // Adjust the chart size on window resize
  onResize() {
    this.width = Math.max(window.innerWidth / 2, 300);
    this.height = Math.max(window.innerHeight / 2, 500);
  }

  onCountrySelect(event: PieData): void {
    // Navigate to the detail page with the selected country name
    this.router.navigateByUrl(`detail/${(event.name)}`);
  }

}
