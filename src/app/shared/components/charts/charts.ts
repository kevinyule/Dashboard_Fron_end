import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './charts.html',
  styleUrls: ['./charts.css']
})
export default class Charts implements AfterViewInit {

  ngAfterViewInit(): void {
    this.renderLineChart();
    this.renderDoughnutChart(
  ['Alimentación', 'Transporte', 'Entretenimiento', 'Salud', 'Otros', 'Ahorro'],
  [500, 300, 200, 400, 150, 100]
);
  }

 renderLineChart() {

  new Chart("lineChart", {
    type: 'line',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Ingresos',
          data: [500, 700, 800, 600, 900, 1100],
          borderColor: 'green',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          fill: true,
          tension: 0.3,
          pointRadius: 5,         // tamaño normal de los puntos
          pointHoverRadius: 5,    // 👈 mismo tamaño al hacer hover
        },
        {
          label: 'Egresos',
          data: [300, 400, 500, 450, 600, 700],
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          fill: true,
          tension: 0.3,
          pointRadius: 5,
          pointHoverRadius: 5,    // 👈 evita que cambie al pasar el mouse
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Ingresos vs Egresos por mes'
        }
      }
    }
  });
 }



 // Gráfico de dona
  renderDoughnutChart(categories: any[], values: any[]) {
  // Función para generar colores aleatorios
  const generateColors = (count: number) => {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      colors.push(`rgba(${r}, ${g}, ${b}, 0.7)`);
    }
    return colors;
  };

  // Generar colores en base a la cantidad de categorías
  const backgroundColors = generateColors(categories.length);

  new Chart("doughnutChart", {
    type: 'doughnut',
    data: {
      labels: categories,
      datasets: [{
        label: 'Gastos por categoría',
        data: values,
        backgroundColor: backgroundColors,
        borderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}



}
