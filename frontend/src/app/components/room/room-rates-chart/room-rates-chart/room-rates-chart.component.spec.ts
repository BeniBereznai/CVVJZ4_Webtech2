import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomRatesChartComponent } from './room-rates-chart.component';

describe('RoomRatesChartComponent', () => {
  let component: RoomRatesChartComponent;
  let fixture: ComponentFixture<RoomRatesChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomRatesChartComponent]
    });
    fixture = TestBed.createComponent(RoomRatesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
