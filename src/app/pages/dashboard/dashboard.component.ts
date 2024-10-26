import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, SidebarComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit{
  areaChart: any;
  barChart: any;

  // Datos de ejemplo para la tabla
  // Datos de ejemplo para la tabla
tableData = [
  { id: 1, user: 'Alice Johnson', currentMonth: 120, previousMonth: 150, difference: -30, reward: 'Discount Coupon' },
  { id: 2, user: 'Bob Smith', currentMonth: 200, previousMonth: 220, difference: -20, reward: 'Gift Card' },
  { id: 3, user: 'Carlos Ruiz', currentMonth: 180, previousMonth: 180, difference: 0, reward: 'No Reward' },
  { id: 4, user: 'Diana Lee', currentMonth: 100, previousMonth: 130, difference: -30, reward: 'Loyalty Points' },
  { id: 5, user: 'Evelyn Turner', currentMonth: 250, previousMonth: 240, difference: 10, reward: 'No Reward' },
];

  constructor() {
    // Registra todos los elementos de Chart.js
    Chart.register(...registerables);
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.initAreaChart();
      this.initBarChart();
    }
  }

  initAreaChart() {
    const ctx = document.getElementById('areaChart') as HTMLCanvasElement;
    this.areaChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Area Chart Example',
          data: [10000, 25000, 15000, 20000, 30000, 35000],
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Area Chart Example'
          }
        }
      }
    });
  }

  initBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Bar Chart Example',
          data: [5000, 10000, 15000, 20000, 25000, 30000],
          backgroundColor: 'rgba(54, 162, 235, 0.8)'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Bar Chart Example'
          }
        }
      }
    });
  }
}
