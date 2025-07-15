import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Olympic } from '../Models/Olympic';

 


@Injectable({ providedIn: 'root' })
export class OlympicService {
  private olympicDataUrl = 'assets/mock/olympic.json';
  private olympicsSubject = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
   return this.http.get<Olympic[]>(this.olympicDataUrl)
    .pipe(tap(data => (this.olympicsSubject.next(data)),
   
    catchError((Error, caught) => { 
      this.olympicsSubject.next([]);
      caught = throwError(() => Error(`Error loading olympics data: ${Error.message}`));
      return caught;
    }
    )
  ))
  
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympicsSubject.asObservable();
  }

}
