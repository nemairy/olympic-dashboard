import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OlympicService } from './Services/olympic.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,
    NgxChartsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit{

  constructor(private olympicService: OlympicService){}
  
  ngOnInit() {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe()
  }
  protected title = 'Olympic-Dashboard';
}
