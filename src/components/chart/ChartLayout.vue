<script setup>
//Import necessary functions from Vue and the currency store
import { ref, computed, watch, onMounted } from 'vue'
import { useCurrencyStore } from '@/stores/currencyStore'
import LineChart from './lineChart.js'

// Initialize the currency store instance
const currencyStore = useCurrencyStore()

// Reactive reference for storing chart data once processed
const datacollection = ref(null)
// Flag to indicate when data is loaded and ready for the chart
const loaded = ref(false)

// Compute the chart data directly from the currency store
const chartData = computed(() => currencyStore.currencyChartData)

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      bodyFont: { size: 14, weight: 'bold' },
      titleFont: { size: 14 },
    },
  },
  scales: {
    y: {
      ticks: { color: '#777' },
      grid: {
        display: true,
        drawBorder: true,
        color: 'rgba(0, 0, 0, 0.1)',
        borderColor: '#ce0864',
      },
    },
    x: {
      ticks: { color: '#777' },
      grid: {
        display: true,
        drawBorder: true,
        color: 'rgba(0, 0, 0, 0.1)',
        borderColor: '#ce0864',
      },
    },
  },
})

// Overwrite chart options with a second configuration (could be merged with above if needed)
options.value = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      bodyFont: { size: 14, weight: 'bold' },
      titleFont: { size: 14 },
    },
  },
  scales: {
    x: {
      ticks: { color: '#777' },
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
        borderColor: '#ce0864',
        drawBorder: true,
      },
    },
    y: {
      ticks: { color: '#777' },
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
        borderColor: '#ce0864',
        drawBorder: true,
      },
    },
  },
}

// Function to process raw chart data into the format required by the LineChart component
const fillData = () => {
  // If there is no chart data, exit the function
  if (!chartData.value || chartData.value.length === 0) return

  // Prepare the data collection using dates for labels and values for data points
  datacollection.value = {
    labels: chartData.value.map((item) => item.date),
    datasets: [
      {
        label: 'Value: ',
        fill: true,
        backgroundColor: 'rgba(164, 5, 175, 0.4)',
        borderColor: '#ce0864',
        pointBackgroundColor: '#ce0864',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.4,
        pointHoverBackgroundColor: '#a405af',
        pointBorderColor: '#ce0864',
        data: chartData.value.map((item) => item.value),
      },
    ],
  }
}

watch(chartData, (newData) => {
  if (newData && newData.length > 0) {
    loaded.value = true
    fillData()
  }
})

onMounted(() => {
  if (chartData.value && chartData.value.length > 0) {
    loaded.value = true
    fillData()
  }
})
</script>

<template>
  <div class="app-card-row">
    <div class="chart">
      <LineChart v-if="loaded" :data="datacollection" :options="options" :height="200" />
    </div>
  </div>
</template>
<style scoped>
.app-card-row {
  display: flex;
  justify-content: center;
}
.chart {
  width: 50vh;
}
</style>
