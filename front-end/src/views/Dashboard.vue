<template>
  <div>
    <TopsideBar @file-uploaded="handleFileUploaded" />
    <div class="content">
      <div v-if="metricsLoaded" class="chart-container">
        <div class="chart">
          <MetricsChart :metricsData="metricsData" metricKey="mrr" title="Monthly Recurring Revenue" />
        </div>
        <div class="chart">
          <MetricsChart :metricsData="metricsData" metricKey="churnRate" title="Churn Rate" />
        </div>
      </div>
      <div v-else>
        <div class="personal-info">
          <h2>Siga-me nas Redes Sociais:</h2>
          <ul class="social-icons">
            <ul class="social-icons">
              <li><a href="https://github.com/thiiagosaantos"><i class="fa-brands fa-github"></i> Github</a></li>
              <li><a href="https://www.linkedin.com/in/thiagosanntos/"><i class="fa-brands fa-linkedin"></i> linkedIn</a></li>
              <li><a href="https://www.instagram.com/thiagosanntos1/"><i class="fab fa-instagram"></i> Instagram</a></li>
            </ul>

          </ul>
          <p>Entre em contato: thiagosantosdevelop@gmail.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MetricsChart from '@/components/MetricsChart.vue';
import TopsideBar from '@/components/TopsideBar.vue';

export default {
  components: {
    MetricsChart,
    TopsideBar
  },
  data() {
    return {
      metricsLoaded: false,
      metricsData: null
    };
  },
  methods: {
    handleFileUploaded(data) {
      this.metricsData = data;
      this.metricsLoaded = true;
    }
  }
};
</script>

<style scoped>
.content {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}

.chart-container {
  display: flex;
  width: 100%;
}

.chart {
  flex: 1;
  margin-right: 10px;
}

.chart:last-child {
  margin-right: 0;
}

/* Estilo para o contêiner principal */
.personal-info {
  text-align: center;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  font-family: 'Arial', sans-serif; /* Fonte principal */
  /* background: linear-gradient(90deg, rgba(112, 45, 250, 1) 0%, rgba(82, 25, 164, 1) 50%, rgba(85, 19, 180, 1) 100%); */
  background-color: #6f2cf6;
  width: 300px;
}

/* Estilo para o título */
.personal-info h2 {
  font-size: 24px;
  color: white;
}

/* Estilo para a lista de ícones sociais */
.social-icons {
  list-style-type: none;
  padding: 0;
}

/* Estilo para cada item da lista */
.social-icons li {
  margin-bottom: 10px;
}

/* Estilo para os links dos ícones sociais */
.social-icons a {
  color: white;
  text-decoration: none;
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

/* Estilo para os ícones */
.social-icons i {
  margin-right: 5px;
}

/* Estilo de foco nos links */
.social-icons a:focus,
.social-icons a:hover {
  background-color: #ddd;
}

/* Estilo para o parágrafo de contato */
.personal-info p {
  margin-top: 20px;
  font-size: 14px;
  color: white;
}

.social-icons i {
  margin-right: 10px; /* Espaço entre o ícone e o texto */
}

</style>