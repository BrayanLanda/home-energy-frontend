import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { RouterLink } from '@angular/router';
import { Consumptions } from '../../models/consumptions';
import { ConsumptionService } from '../../services/consumption.service';

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
  consumptionData: Consumptions[] = [];

  // Datos de ejemplo para la tabla
  // Datos de ejemplo para la tabla
tableData = [
  { id: 1, user: 'Alice Johnson', currentMonth: 120, previousMonth: 150, difference: -30, reward: 'Discount Coupon' },
  { id: 2, user: 'Bob Smith', currentMonth: 200, previousMonth: 220, difference: -20, reward: 'Gift Card' },
  { id: 3, user: 'Carlos Ruiz', currentMonth: 180, previousMonth: 180, difference: 0, reward: 'No Reward' },
  { id: 4, user: 'Diana Lee', currentMonth: 100, previousMonth: 130, difference: -30, reward: 'Loyalty Points' },
  { id: 5, user: 'Evelyn Turner', currentMonth: 250, previousMonth: 240, difference: 10, reward: 'No Reward' },
];

  constructor(private consumptionService: ConsumptionService) {
    // Registra todos los elementos de Chart.js
    Chart.register(...registerables);
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.initBarChart();
      this.loadConsumptionData(); 
    }
  }

  loadConsumptionData() {
    const userId = 1; // Cambia esto al ID del usuario que necesites
    this.consumptionService.getConsumptionHistory(userId).subscribe({
      next: (data) => {
        this.consumptionData = data; // Almacena los datos de consumo
        this.initAreaChart(); // Inicializa el gráfico después de obtener los datos
      },
      error: (error) => {
        console.error('Error fetching consumption history', error); // Manejo de errores
      }
    });
  }

  initAreaChart() {
    const ctx = document.getElementById('areaChart') as HTMLCanvasElement;

    // Extrae los datos para el gráfico
    const labels = this.consumptionData.map(consumption => `${consumption.month}`); // Mes como etiqueta
    const data = this.consumptionData.map(consumption => consumption.energyUsed); // Energía utilizada

    this.areaChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Consumo de Energía 2024',
          data: data,
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
            text: 'Consumo de Energía por Mes'
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
