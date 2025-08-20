<template>
  <q-page class="q-pa-md" padding>
    <div class="text-h6 q-mb-md">
      <q-icon name="bar_chart" class="q-mr-sm" />
      Leituras do Hidrômetro Nº {{ hydrometerId }}
    </div>

    <!-- Resumo -->
    <div class="row q-col-gutter-md q-mb-lg">
      <q-card class="col-12 col-sm-4">
        <q-card-section>
          <div class="text-subtitle2">Última Leitura</div>
          <div class="text-h6">{{ lastReading.value }} m³</div>
          <div class="text-caption text-grey">em {{ lastReading.date }}</div>
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-sm-4">
        <q-card-section>
          <div class="text-subtitle2">Consumo Total</div>
          <div class="text-h6">{{ totalConsumption }} m³</div>
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-sm-4">
        <q-card-section>
          <div class="text-subtitle2">Média</div>
          <div class="text-h6">{{ averageConsumption }} m³/mês</div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Gráfico de linha -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">Evolução das Leituras</div>
        <line-chart :data="chartData" />
      </q-card-section>
    </q-card>

    <!-- Gráfico de barras -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">Comparação Mensal</div>
        <bar-chart :data="chartData" />
      </q-card-section>
    </q-card>

    <!-- Tabela de leituras -->
    <q-card>
      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">Todas as Leituras</div>
        <q-table
          :rows="readings"
          :columns="columns"
          row-key="id"
          flat
          bordered
          dense
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import LineChart from 'components/LineChart.vue'
import BarChart from 'components/BarChart.vue'

const route = useRoute()
const hydrometerId = route.params.id

// Simulação de dados de leitura
const readings = ref([
  { id: 1, date: '2024-12-01', value: 100 },
  { id: 2, date: '2025-01-01', value: 130 },
  { id: 3, date: '2025-02-01', value: 160 },
  { id: 4, date: '2025-03-01', value: 200 },
  { id: 5, date: '2025-04-01', value: 250 },
  { id: 6, date: '2025-05-01', value: 310 },
])

// Colunas da tabela
const columns = [
  { name: 'date', label: 'Data', field: 'date', sortable: true },
  { name: 'value', label: 'Valor (m³)', field: 'value', sortable: true },
]

// Última leitura
const lastReading = computed(() => {
  const last = readings.value[readings.value.length - 1]
  return { value: last?.value || 0, date: last?.date || '-' }
})

// Total e média
const totalConsumption = computed(() => {
  if (readings.value.length < 2) return 0
  const first = readings.value[0].value
  const last = readings.value[readings.value.length - 1].value
  return last - first
})

const averageConsumption = computed(() => {
  const months = readings.value.length - 1
  return months > 0 ? (totalConsumption.value / months).toFixed(1) : 0
})

// Dados para gráfico
const chartData = computed(() => {
  return {
    labels: readings.value.map(r => r.date),
    datasets: [
      {
        label: 'Consumo acumulado (m³)',
        data: readings.value.map(r => r.value),
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        fill: false
      }
    ]
  }
})
</script>
