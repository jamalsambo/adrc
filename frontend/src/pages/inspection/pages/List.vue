<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-sm">
      <q-toolbar class="bg-grey-2">
        <q-toolbar-title>
          <q-icon name="visibility" class="q-mr-sm" />
          Lista de Inspeções
        </q-toolbar-title>

        <q-space />
        <q-btn
          icon="add"
          label="Nova"
          color="primary"
          @click="createInspection"
          v-if="!$q.screen.lt.sm && auth.hasCreateInspection"
        />
        <q-btn
          icon="add"
          round
          color="primary"
          @click="createInspection"
          v-else
        />
      </q-toolbar>

      <!-- Filtros -->
      <div class="row q-gutter-sm q-mt-sm">
        <q-input
          filled
          v-model="filters.search"
          label="Pesquisar por Cliente ou Hidrômetro"
          dense
          class="col-12 col-md-4"
        >
          <template #append><q-icon name="search" /></template>
        </q-input>
        <q-select
          filled
          v-model="filters.status"
          label="Estado"
          :options="['Pendente', 'Concluída']"
          dense
          clearable
          class="col-12 col-md-2"
        />
      </div>

      <!-- Tabela -->
      <q-table
        :rows="filteredInspections"
        :columns="columns"
        row-key="id"
        flat
        bordered
        class="q-mt-md"
      >
        <template #body-cell-actions="props">
          <q-td align="center">
            <q-btn
              flat
              dense
              round
              icon="call_split"
              color="primary"
              @click="distributeWatermeter(props.row)"
              title="Ditribuição de hidrometro"
              v-if="auth.hasDistribuiteWatermeter"
            />
            <q-btn
              flat
              dense
              round
              icon="water_damage"
              color="primary"
              @click="distributeListe(props.row)"
              title="Lista de Hidrometro"
                 v-if="auth.hasViewDistribuiteWatermeter"
            />
            <q-btn
              flat
              dense
              round
              icon="delete"
              color="negative"
              @click="deleteInspection(props.row.id)"
              title="Eliminar inspeção"
              v-if="auth.hasDeleteInspection"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/pages/auth/store";
import { useInspectionStore } from "../stores";
import columns from "../components/InspectionColumns";


/* Inicialização dos objetos do Vue Router */
const auth = useAuthStore()
const router = useRouter();

/* Inicialização das stores */
const inspectionStore = useInspectionStore();

/* Inicialização das variaveis */
const inspections = ref([]);
const filters = ref({ search: "", status: "", date: "" });

/* Funcao e filtro da tabela inspencoes */
const filteredInspections = computed(() => {
  return inspections.value.filter((insp) => {
    const matchesSearch =
      filters.value.search === "" ||
      insp.client.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      insp.hydrometer
        .toLowerCase()
        .includes(filters.value.search.toLowerCase());

    const matchesStatus =
      !filters.value.status || insp.status === filters.value.status;
    const matchesDate = !filters.value.date || insp.date === filters.value.date;

    return matchesSearch && matchesStatus && matchesDate;
  });
});

function createInspection() {
  router.push("/inspections/new");
}

function distributeWatermeter(insp) {
  router.push(`/inspections/${insp.id}/distribute-watermeter`);
}

function distributeListe(insp) {
  router.push(`/inspections/${insp.id}/distribute-watermeter-list`);
}

function deleteInspection(id) {
  inspections.value = inspections.value.filter((i) => i.id !== id);
}

async function fetchData() {
  try {
    await inspectionStore.find();
    inspections.value = inspectionStore.inspections;
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await fetchData();
});
</script>
