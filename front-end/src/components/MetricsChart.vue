<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: {
    metricsData: Object,
    metricKey: String,
    title: String
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      let chartType = 'line'; // Tipo de gráfico padrão
      let backgroundColor, borderColor;

      // Verificar o título e definir o tipo de gráfico e estilos correspondentes
      switch (this.title) {
        case 'Monthly Recurring Revenue':
          backgroundColor = 'rgba(255, 99, 132, 0.6)';
          borderColor = 'rgba(255, 99, 132, 1)';
          break;
        case 'Churn Rate':
          backgroundColor = 'rgba(54, 162, 235, 0.6)';
          borderColor = 'rgba(54, 162, 235, 1)';
          break;
        default:
          backgroundColor = 'rgba(75, 192, 192, 0.6)';
          borderColor = 'rgba(75, 192, 192, 1)';
      }

      const chart = new Chart(ctx, {
        type: chartType,
        data: {
          labels: this.metricsData.labels,
          datasets: [{
            label: this.title,
            data: this.metricsData[this.metricKey],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 2
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true
                },
                mode: 'xy'
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%; 
}
</style>
