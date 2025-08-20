<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-sm">
      <q-toolbar class="bg-grey-2">
        <q-toolbar-title>
          <q-icon name="speed" class="q-mr-sm" />
          Lista de Hidrômetros
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

        <q-select
          v-model="filters.status"
          label="Estado"
          dense
          filled
          clearable
          :options="statusOptions"
          class="col-12 col-md-2"
        />
      </div>

      <!-- Tabela desktop -->
      <q-table
        v-if="!$q.screen.lt.md"
        class="q-mt-md"
        flat
        bordered
        :rows="filteredHydrometers"
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
            <q-btn
              dense
              round
              flat
              icon="link"
              color="teal"
              @click="associateClient(props.row)"
              title="Associar a cliente"
            />
            <q-btn
              dense
              round
              flat
              icon="bar_chart"
              color="purple"
              @click="viewReadings(props.row)"
              title="Leituras"
            />
          </q-td>
        </template>
      </q-table>

      <!-- Cards mobile -->
      <div v-else class="q-mt-md">
        <q-card
          v-for="hyd in filteredHydrometers"
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
            <q-btn
              dense
              round
              flat
              icon="link"
              color="teal"
              @click="associateClient(hyd.id)"
            />
            <q-btn
              dense
              round
              flat
              icon="bar_chart"
              color="purple"
              @click="viewReadings(hyd.id)"
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
import { useWatermeterStore } from "../stores";
import columns from "../components/WatermeterColumns";

const $q = useQuasar();
/* Inicialização dos objetos do Vue Router */
const router = useRouter();

/* Inicialização das stores */
const watermeterStore = useWatermeterStore();

/* Inicialização das variaveis */
const watermeters = ref([]);
const filters = ref({
  search: "",
  status: "",
});
const statusOptions = ["Activo", "Inactivo"];

/* Funcao e filtro da tabela Hidrometros */
const filteredHydrometers = computed(() => {
  return watermeters.value.filter((h) => {
    const matchesSearch =
      filters.value.search === "" ||
      h.number.toLowerCase().includes(filters.value.search.toLowerCase());
    const matchesStatus =
      !filters.value.status || h.status === filters.value.status;
    return matchesSearch && matchesStatus;
  });
});

/* Funcao para navegacao a pagina de adicao do hidrometro */
function addHydrometer() {
  router.push("/watermeters/new");
}

/* Funcao para navegacaoa a pagina de edicao do hidrometro */
function editHydrometer(h) {
  router.push(`/watermeters/${h.id}/edit`);
}

/* Funcao para navegacao a pagina de associacao de hidometro ao cliente */
function associateClient(h) {
  router.push(`/watermeters/${h.id}/associete`);
}

/* Funcoa para navegacao a para de leituras do hidrometro */
function viewReadings (h) {
  router.push(`/watermeters/${h.id}/readings`);

}

/* Funcao para editar Hidrometro */
function deleteHydrometer(id) {
  $q.dialog({
    title: "Confirmar",
    message: "Deseja remover este hidrômetro?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    watermeters.value = watermeters.value.filter((h) => h.id !== id);
  });
}

async function fetchData() {
  try {
    await watermeterStore.find();
    watermeters.value = watermeterStore.watermeters;
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await fetchData();
});
</script>
