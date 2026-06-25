import { Component, inject, signal, WritableSignal } from '@angular/core';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { DashboardStats } from '../../../../core/models/dashboard.model';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private dashService = inject(DashboardService);

  stats: WritableSignal<DashboardStats | undefined> = signal(undefined);

  openJobs = 0;
  closedJobs = 0;

  isLoading = signal(false);

  //Pie Chart Configuration
  pieChartType: 'doughnut' = 'doughnut';
  pieChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [],
  };

  pieChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  //Bar Chart Configuration
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#5074bd',
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  barChartType: 'bar' = 'bar';
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
    
  };

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.isLoading.set(true);

    this.dashService.getDashboardStats().subscribe({
      next: (res) => {
        console.log('statResponse', res);
        this.stats.set(res);

        this.openJobs = res.totalJobsByStatus.find((job) => job._id === 'Open')?.count ?? 0;

        this.closedJobs = res.totalJobsByStatus.find((job) => job._id === 'Closed')?.count ?? 0;

        this.pieChartData = {
          labels: res.applicationsByStatus.map((item) => item._id),
          datasets: [
            {
              data: res.applicationsByStatus.map((item) => item.count),
              backgroundColor: [
                '#8b5cf6', 
                '#06b6d4', 
                '#10b981', 
                '#f59e0b', 
              ],
              borderWidth: 1,
            },
          ],
        };

        this.barChartData = {
          labels: res.topSkills.map((item) => item._id),
          datasets: [
            {
              label: 'Demand',
              data: res.topSkills.map((item) => item.count),
              backgroundColor: ['#8b5cf6'],
              hoverBorderWidth: 2,
            },
          ],
        };

        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err.err);
        this.isLoading.set(false);
      },
    });
  }
}
