<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-sm">
      <q-toolbar class="bg-grey-2">
        <q-toolbar class="bg-grey-2">
          <q-toolbar-title class="flex items-center">
            <q-icon name="speed" size="sm" class="q-mr-sm hidden-xs" />
            <span class="text-body1 text-md-h6"> Lista de Zonas</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-space />
        <q-btn
          color="primary"
          icon="add"
          label="Novo"
          @click="addHydrometer"
          class="q-mr-sm"
          v-if="!$q.screen.lt.sm"
        />
        <q-btn color="primary" icon="add" round dense @click="addHydrometer" v-else>
          <q-tooltip>Adicionar</q-tooltip>
        </q-btn>
      </q-toolbar>

      <!-- Filtros -->
      <div class="row q-gutter-sm q-mt-sm items-center">
        <q-input
          v-model="filters.search"
          label="Pesquisar por nome"
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
        :rows="filteredZones"
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
              @click="editZone(props.row)"
              title="Editar"
            />
            <q-btn
              dense
              round
              flat
              icon="delete"
              color="negative"
              @click="deleteZone(props.row.id)"
              title="Deletar"
            />
          </q-td>
        </template>
      </q-table>

      <!-- Cards mobile -->
      <div v-else class="q-mt-md">
        <q-card v-for="z in filteredZones" :key="z.id" class="q-mb-sm">
          <q-card-section>
            <div class="text-h6">{{ z.name }}</div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn flat icon="delete" color="negative" @click="deleteZone(z.id)" />
          </q-card-actions>
        </q-card>
      </div>
    </q-card>
    <q-footer bordered class="bg-grey-2 text-right q-pa-sm">
      <q-btn color="primary" icon="arrow_back" label="Voltar" @click="router.push('/')" />
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useZoneStore } from "../stores";
import columns from "../components/ZoneColumns";

const $q = useQuasar();
/* Inicialização dos objetos do Vue Router */
const router = useRouter();

/* Inicialização das stores */
const zoneStore = useZoneStore();

/* Inicialização das variaveis */
const zones = ref([]);
const filters = ref({
  search: "",
});

/* Funcao e filtro da tabela Hidrometros */
const filteredZones = computed(() => {
  return zones.value.filter((h) => {
    const matchesSearch =
      filters.value.search === "" ||
      h.name.toLowerCase().includes(filters.value.search.toLowerCase());
    return matchesSearch;
  });
});

/* Funcao para editar anomalia */
function deleteZone(id) {
  $q.dialog({
    title: "Confirmar",
    message: "Deseja remover esta anomalia?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await zoneStore.remove(id);
    zones.value = zones.value.filter((h) => h.id !== id);
  });
}

async function fetchData() {
  try {
    await zoneStore.find();
    zones.value = zoneStore.zones;
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await fetchData();
});
</script>
