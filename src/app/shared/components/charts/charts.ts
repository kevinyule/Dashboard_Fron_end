import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './charts.html',
  styleUrls: ['./charts.css'],
})
export default class Charts implements AfterViewInit {
  @ViewChild('expandedChart') expandedChartRef!: ElementRef<HTMLCanvasElement>;
  expandedChartInstance!: Chart;

  lineChartInstance!: Chart;
  lineChartType: ChartType = 'line';

  doughnutChartInstance!: Chart;
  doughnutChartType: ChartType = 'doughnut';

  ngAfterViewInit(): void {
    this.renderLineChart();
    this.renderDoughnutChart(
      ['Alimentación', 'Transporte', 'Entretenimiento', 'Salud', 'Otros', 'Ahorro'],
      [500, 300, 200, 400, 150, 100]
    );
  }

  // Renderizar gráfico de línea
  renderLineChart() {
    this.lineChartInstance = new Chart('lineChart', {
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
            pointRadius: 5,
            pointHoverRadius: 5,
          },
          {
            label: 'Egresos',
            data: [300, 400, 500, 450, 600, 700],
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Ingresos vs Egresos por mes' },
        },
      },
    });
  }

  // Renderizar gráfico de dona
  renderDoughnutChart(categories: any[], values: any[]) {
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

    const backgroundColors = generateColors(categories.length);

    this.doughnutChartInstance = new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: categories,
        datasets: [
          {
            label: 'Gastos por categoría',
            data: values,
            backgroundColor: backgroundColors,
            borderColor: '#fff',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
      },
    });
  }

  // Abrir modal con gráfico expandido
  expandChart(chartType: 'line' | 'doughnut') {
  const modal = document.getElementById('chartModal');
  if (!modal) return;

  // Limpiar canvas anterior
  modal.querySelector('canvas')?.remove();
  const canvas = document.createElement('canvas');
  canvas.classList.add('h-full', 'w-full');
  modal.querySelector('div')?.appendChild(canvas);
  this.expandedChartRef = new ElementRef(canvas);

  let chartToExpand: Chart | undefined;
  let type: ChartType = 'line';

  if (chartType === 'line') {
    chartToExpand = this.lineChartInstance;
    type = this.lineChartType;
  } else if (chartType === 'doughnut') {
    chartToExpand = this.doughnutChartInstance;
    type = this.doughnutChartType;
  }

  if (!chartToExpand) return;

  // Clonar datos y options de manera segura
  const dataClone = JSON.parse(JSON.stringify(chartToExpand.data));
  const optionsClone = JSON.parse(JSON.stringify(chartToExpand.options));

  this.expandedChartInstance = new Chart(this.expandedChartRef.nativeElement, {
    type: type,
    data: dataClone,
    options: { ...optionsClone, responsive: true, maintainAspectRatio: false },
  });

  modal.classList.remove('hidden');
}


  // Cerrar modal
  closeModal() {
    if (this.expandedChartInstance) this.expandedChartInstance.destroy();
    document.getElementById('chartModal')?.classList.add('hidden');
  }
}
