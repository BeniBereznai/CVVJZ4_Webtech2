import { Component,  OnInit } from '@angular/core';
import { ChartOptions, ChartType,  ChartData } from 'chart.js';
import { Room } from "../../../../models/room";
import { RoomService } from "../../../../services/room.service";

@Component({
  selector: 'app-room-rates-chart',
  templateUrl: './room-rates-chart.component.html',
  styleUrls: ['./room-rates-chart.component.css']
})
export class RoomRatesChartComponent implements OnInit {
  rooms: Room[] = [];

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Room Rates',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe(data => {
      this.rooms = data;
      this.initializeChartData();
    });
  }

  initializeChartData() {
    this.rooms.forEach(room => {
      this.barChartLabels.push(room.name);
      this.barChartData.labels?.push(room.name);
      (this.barChartData.datasets[0].data as number[]).push(room.rate);
    });
  }
}
