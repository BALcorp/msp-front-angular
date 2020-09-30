import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  productDashboard: boolean;

  constructor() { }

  ngOnInit(): void {
    this.productDashboard = true;
  }

  onClick(): void {
    this.productDashboard = !this.productDashboard;
  }
}
