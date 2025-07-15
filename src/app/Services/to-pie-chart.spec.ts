import { TestBed } from '@angular/core/testing';

import { ToPieChart } from './to-pie-chart';

describe('ToPieChart', () => {
  let service: ToPieChart;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToPieChart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
