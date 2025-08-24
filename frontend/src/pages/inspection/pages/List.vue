<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-sm">
      <q-toolbar class="bg-grey-2">
        <q-toolbar class="bg-grey-2">
          <q-toolbar-title class="flex items-center">
            <q-icon name="visibility" size="sm" class="q-mr-sm hidden-xs" />
            <span class="text-body1 text-md-h6"> Lista de Inspeções</span>
          </q-toolbar-title>
        </q-toolbar>
        <q-space />
        <q-btn
          icon="add"
          label="Nova"
          color="primary"
          @click="createInspection"
          v-if="!$q.screen.lt.sm && auth.hasCreateInspection"
        />
        <q-btn icon="add" round color="primary" @click="createInspection" v-else />
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
      <div>
        <!-- Tabela para telas médias ou maiores -->
        <q-table
          v-if="$q.screen.gt.sm"
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
                title="Distribuição de hidrômetro"
                v-if="auth.hasDistribuiteWatermeter"
              />
              <q-btn
                flat
                dense
                round
                icon="water_damage"
                color="primary"
                @click="distributeListe(props.row)"
                title="Lista de Hidrômetro"
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

        <!-- Cards para telas pequenas -->
        <div v-else class="q-mt-md">
          <q-card
            v-for="insp in paginatedInspections"
            :key="insp.id"
            class="q-mb-sm"
            flat
            bordered
          >
            <q-card-section>
              <div class="text-h6">Inspeção #{{ insp.number }}</div>
              <div class="text-subtitle2 text-grey">Mes: {{ insp.month }}</div>
              <div class="text-caption">Tipo: {{ insp.type?.name }}</div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn
                flat
                dense
                round
                icon="call_split"
                color="primary"
                @click="distributeWatermeter(insp)"
                title="Distribuição de hidrômetro"
                v-if="auth.hasDistribuiteWatermeter"
              />
              <q-btn
                flat
                dense
                round
                icon="water_damage"
                color="primary"
                @click="distributeListe(insp)"
                title="Lista de Hidrômetro"
                v-if="auth.hasViewDistribuiteWatermeter"
              />
              <q-btn
                flat
                dense
                round
                icon="delete"
                color="negative"
                @click="deleteInspection(insp.id)"
                title="Eliminar inspeção"
                v-if="auth.hasDeleteInspection"
              />
            </q-card-actions>
          </q-card>
                  <div class="q-mt-md flex flex-center">
          <q-pagination
            v-model="currentPage"
            :max="totalPages"
            color="primary"
            boundary-numbers
            :max-pages="7"
          />
        </div>
        </div>
      </div>
      <q-footer bordered class="bg-grey-2 text-right q-pa-sm">
        <q-btn color="primary" icon="arrow_back" label="Voltar" @click="router.back()" />
      </q-footer>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/pages/auth/store";
import { useInspectionStore } from "../stores";
import columns from "../components/InspectionColumns";
import useNotify from "app/composables/UseNotify";

/* Inicialização dos objetos do Vue Router */
const auth = useAuthStore();
const router = useRouter();

/* Inicialização das stores */
const inspectionStore = useInspectionStore();
const { notifyError, notifySuccess } = useNotify();

/* Inicialização das variaveis */
const inspections = ref([]);
const filters = ref({ search: "", status: "", date: "" });
const currentPage = ref(1); // página atual
const rowsPerPage = ref(5); // quantos registros por página

/* Funcao e filtro da tabela inspencoes */
const filteredInspections = computed(() => {
  return inspections.value.filter((insp) => {
    const matchesSearch =
      filters.value.search === "" ||
      insp.client.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      insp.hydrometer.toLowerCase().includes(filters.value.search.toLowerCase());

    const matchesStatus = !filters.value.status || insp.status === filters.value.status;
    const matchesDate = !filters.value.date || insp.date === filters.value.date;

    return matchesSearch && matchesStatus && matchesDate;
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredInspections.value.length / rowsPerPage.value)
);

// registros a mostrar na página atual
const paginatedInspections = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return filteredInspections.value.slice(start, end);
});

function createInspection() {
  router.push("/inspections/new");
}

function distributeWatermeter(insp) {
  router.push(`/inspections/${insp.id}/distribute-watermeter`);
}

function distributeListe(insp) {
  if (auth.user.userType === "Leitor") {
    router.push(`inspections/${insp.id}/watermeters`);
  } else {
    router.push(`/inspections/${insp.id}/distribute-watermeter-list`);
  }
}

function deleteInspection(id) {
  try {
    inspectionStore.delete(id);
    inspections.value = inspections.value.filter((i) => i.id !== id);
    notifySuccess("Inspeção deletada com sucesso");
  } catch (error) {}
}

async function fetchData() {
  try {
    const payload = {
      employeeId: auth.user.employeeId,
    };
    if (auth.user.userType === "Leitor") {
      await inspectionStore.find(payload);
    } else {
      await inspectionStore.find();
    }
    inspections.value = inspectionStore.inspections;
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await fetchData();
});
</script>
