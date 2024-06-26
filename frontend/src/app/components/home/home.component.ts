import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isChartVisible: any;

  toggleChart() {
    this.isChartVisible = !this.isChartVisible;
  }

}
