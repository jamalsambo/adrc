<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-sm">
      <!-- Toolbar com filtros e botão -->
      <q-toolbar class="bg-grey-2">
        <q-toolbar-title>
          <q-icon name="people_outline" class="q-mr-sm" />
          Leituras
        </q-toolbar-title>

        <q-space />
         <!-- Botão adicionar -->
        <q-btn
          color="primary"
          icon="person_add"
          label="Exportar"
          @click="exportTxt"
          class="q-mr-sm"
          v-if="!$q.screen.lt.sm && auth.hasExportReadings" 
        />
        <q-btn
          color="primary"
          icon="person_add"
          round
          dense
          @click="exportTxt"
          v-else
        >
          <q-tooltip anchor="top middle">Exportar</q-tooltip>
        </q-btn>
      </q-toolbar>

      <!-- Filtros -->
      <div class="q-gutter-sm row q-col-gutter-md q-mt-sm items-center">
        <q-input
          dense
          filled
          v-model="filters.search"
          label="Pesquisar..."
          class="col-12 col-md-3"
        >
          <template #append><q-icon name="search" /></template>
        </q-input>
      </div>

      <!-- Tabela Desktop -->
      <q-table
        v-if="!$q.screen.lt.md"
        class="q-mt-md"
        flat
        bordered
        :rows="filteredReadings"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[5, 10, 20]"
        wrap-cells
      >
        <template #body-cell-actions="props">
          <q-td align="center">
            <q-btn
              dense
              round
              flat
              icon="visibility"
              color="primary"
              @click="viewReading(props.row)"
              v-if="auth.hasViewReadings"
            />
          </q-td>
        </template>
      </q-table>

      <!-- Cards Mobile -->
      <div v-else class="q-mt-md">
        <q-card
          v-for="reading in filteredReadings"
          :key="reading.id"
          class="q-mb-sm"
        >
          <q-card-section>
            <div class="text-h6">{{ reading.name }}</div>
            <div class="text-subtitle2 text-grey">
              Tipo: {{ reading.type }}
            </div>
            <div class="text-caption">
              Status: {{ reading.status }} | Região: {{ reading.region }}
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn
              flat
              icon="visibility"
              color="negative"
              @click="viewReading(reading.id)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import columns from "../components/ReadingsColumns";
import { useReadingStore } from "../stores";
import { exportFile } from "quasar";
import { useAuthStore } from "src/pages/auth/store";

// Inicialização dos objetos do Vue Router
const auth = useAuthStore()
const router = useRouter();

/* Inicialização das stores */
const readingStore = useReadingStore();

// Dados de exemplo
const readings = ref([]);

// Filtros múltiplos
const filters = ref({
  search: "",
  type: "",
  status: "",
  region: "",
});

/* Filtro combinado */
const filteredReadings = computed(() => {
  return readings.value.filter((c) => {
    const matchesSearch =
      filters.value.search === "" ||
      c.fullName.toLowerCase().includes(filters.value.search.toLowerCase());

    return matchesSearch;
  });
});

function viewReading(r) {
  router.push(`/readings/${r.id}`)
}

function exportTxt() {
  const lines = filteredReadings.value.map(l =>
    `${l.number}; ${l.customer.fullName}; ${l.reading}`
  )
  const content = lines.join('\n')
  const ok = exportFile(
    'leituras.txt',
    content,
    { mimeType: 'text/plain;charset=utf-8' }
  )
  if (ok !== true) {
    $q.notify({ type: 'negative', message: 'Falha ao gerar o ficheiro' })
  }
}

async function fetchData() {
  try {
    await readingStore.find();
    readings.value = readingStore.readings;
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await fetchData();
});
</script>
