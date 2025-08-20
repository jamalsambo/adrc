<template>
  <Line :data="data" :options="options" />
</template>

<script setup>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

defineProps(['data'])

const options = {
  responsive: true,
  plugins: {
    legend: { display: false }
  }
}
</script>
