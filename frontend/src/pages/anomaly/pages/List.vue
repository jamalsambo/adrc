<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-sm">
      <q-toolbar class="bg-grey-2">
        <q-toolbar-title>
          <q-icon name="speed" class="q-mr-sm" />
          Lista de Anomalias
        </q-toolbar-title>

        <q-space />
        <q-btn
          color="primary"
          icon="add"
          label="Novo"
          @click="addHydrometer"
          class="q-mr-sm"
          v-if="!$q.screen.lt.sm"
        />
        <q-btn
          color="primary"
          icon="add"
          round
          dense
          @click="addHydrometer"
          v-else
        >
          <q-tooltip>Adicionar</q-tooltip>
        </q-btn>
      </q-toolbar>

      <!-- Filtros -->
      <div class="row q-gutter-sm q-mt-sm items-center">
        <q-input
          v-model="filters.search"
          label="Pesquisar por nº de série"
          dense
          filled
          class="col-12 col-md-4"
        >
          <template #append><q-icon name="search" /></template>
        </q-input>
      </div>

      <!-- Tabela desktop -->
      <q-table
        v-if="!$q.screen.lt.md"
        class="q-mt-md"
        flat
        bordered
        :rows="filteredAnomaly"
        :columns="columns"
        row-key="id"
        wrap-cells
      >
        <template #body-cell-actions="props">
          <q-td align="center">
            <q-btn
              dense
              round
              flat
              icon="edit"
              color="primary"
              @click="editHydrometer(props.row)"
              title="Editar"
            />
            <q-btn
              dense
              round
              flat
              icon="delete"
              color="negative"
              @click="deleteHydrometer(props.row.id)"
              title="Deletar"
            />
          </q-td>
        </template>
      </q-table>

      <!-- Cards mobile -->
      <div v-else class="q-mt-md">
        <q-card
          v-for="hyd in filteredAnomaly"
          :key="hyd.id"
          class="q-mb-sm"
        >
          <q-card-section>
            <div class="text-h6">Nº Série: {{ hyd.serial }}</div>
            <div class="text-caption">Instalado em: {{ hyd.installDate }}</div>
            <div class="text-caption">Estado: {{ hyd.status }}</div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn
              flat
              icon="edit"
              color="primary"
              @click="editHydrometer(hyd)"
              title="Editar"
            />
            <q-btn
              flat
              icon="delete"
              color="negative"
              @click="deleteHydrometer(hyd.id)"
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
import { useQuasar } from "quasar";
import { useAnomalyStore } from "../stores";
import columns from "../components/AnomalyColumns";

const $q = useQuasar();
/* Inicialização dos objetos do Vue Router */
const router = useRouter();

/* Inicialização das stores */
const anomalyStore = useAnomalyStore();

/* Inicialização das variaveis */
const anomalies = ref([]);
const filters = ref({
  search: "",
});


/* Funcao e filtro da tabela Hidrometros */
const filteredAnomaly = computed(() => {
  return anomalies.value.filter((h) => {
    const matchesSearch =
      filters.value.search === "" ||
      h.code.toLowerCase().includes(filters.value.search.toLowerCase());

    return matchesSearch;
  });
});

/* Funcao para navegacao a pagina de adicao do anomalia */
function addHydrometer() {
  router.push("/anomalies/new");
}

/* Funcao para navegacaoa a pagina de edicao do anomalia */
function editHydrometer(a) {
  router.push(`/anomalies/${a.id}/edit`);
}

/* Funcao para editar anomalia */
function deleteHydrometer(id) {
  $q.dialog({
    title: "Confirmar",
    message: "Deseja remover esta anomalia?",
    cancel: true,
    persistent: true,
  }).onOk( async () => {
    await anomalyStore.remove(id)
    anomalies.value = anomalies.value.filter((h) => h.id !== id);
    
  });
}

async function fetchData() {
  try {
    await anomalyStore.find();
    anomalies.value = anomalyStore.anomalies;
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await fetchData();
});
</script>
