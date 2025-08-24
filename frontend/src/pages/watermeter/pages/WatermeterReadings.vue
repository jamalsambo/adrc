<template>
  <q-page class="q-pa-md" padding>
    <div class="text-h6 q-mb-md">
      <q-icon name="bar_chart" class="q-mr-sm" />
      Leituras do Hidrômetro Nº {{ watermeter.number }}
    </div>

    <!-- Resumo -->
    <div class="q-mb-lg">
      <div class="text-h6 q-mt-md q-mb-sm">Últimas Leituras</div>
      <div class="row q-col-gutter-md">
        <div
          v-for="(item, index) in watermeter?.readings"
          :key="index"
          class="col-md-4 col-sm-6 col-xs-12"
        >
          <q-card>
            <q-card-section>
              <div class="text-subtitle1">{{ item.reading }} m³</div>
              <div class="text-caption text-grey">
                {{ formatarData(item.createdAt) }}
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                flat
                color="primary"
                icon="visibility"
                label="Detalhes"
                @click="router.push(`/readings/${item.id}`)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Gráfico de linha -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">Evolução das Leituras</div>
        <line-chart :data="chartData" />
      </q-card-section>
    </q-card>

    <!-- Tabela de leituras -->
    <q-card>
      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">Todas as Leituras</div>
        <q-table :rows="readings" :columns="columns" row-key="id" flat bordered dense />
      </q-card-section>
    </q-card>
    <q-card>
      <q-footer bordered class="bg-grey-2 text-right q-pa-sm">
        <q-btn
          color="primary"
          icon="arrow_back"
          label="Voltar"
          @click="router.push('/')"
        />
      </q-footer>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import LineChart from "components/LineChart.vue";
import BarChart from "components/BarChart.vue";
import { useWatermeterStore } from "../stores";

const route = useRoute();
const router = useRouter();
const hydrometerId = route.params.id;

const watermeterStore = useWatermeterStore();
const watermeter = ref({});

// Simulação de dados de leitura
const readings = ref([]);

// Colunas da tabela
const columns = [
  {
    name: "date",
    label: "Data",
    field: (row) => formatarData(row.createdAt),
    sortable: true,
  },
  { name: "value", label: "Valor (m³)", field: "reading", sortable: true },
];

function formatarData(dataISO) {
  const data = new Date(dataISO);
  return data.toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// Dados para gráfico
const chartData = computed(() => {
  return {
    labels: readings.value.map((r) => formatarData(r.createdAt)),
    datasets: [
      {
        label: "Consumo acumulado (m³)",
        data: readings.value.map((r) => r.reading),
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6",
        fill: false,
      },
    ],
  };
});

const fetchData = async () => {
  try {
    await watermeterStore.findOne(hydrometerId);
    watermeter.value = watermeterStore.watermeter;
    readings.value = watermeter.value?.readings;
  } catch (error) {}
};

onMounted(async () => {
  await fetchData();
});
</script>
