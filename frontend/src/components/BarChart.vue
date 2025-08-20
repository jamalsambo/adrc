<template>
  <Bar :data="data" :options="options" />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Sem TypeScript
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const options = {
  responsive: true,
  plugins: {
    legend: { display: false }
  }
}
</script>

