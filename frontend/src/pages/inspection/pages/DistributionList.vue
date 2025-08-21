<template>
  <q-page class="q-pa-md">
    <q-card flat bordered>
      <q-toolbar class="bg-grey-2">
        <q-toolbar-title>
          <q-icon name="list" class="q-mr-sm" />
          Distribuições de Hidrômetros por Funcionário
        </q-toolbar-title>

        <q-space />
        <q-btn icon="add" label="Nova Distribuição" color="primary" @click="router.push('/distribuicoes/nova')" />
      </q-toolbar>

      <q-card-section class="q-gutter-md">
        <div v-for="dist in groupedDistributions" :key="dist.employee.id" class="q-mb-md">
          <q-expansion-item
            :label="dist.employee.fullName"
            :caption="`Funcionário #${dist.employee.number}`"
            icon="person"
            expand-separator
            default-opened
          >
            <q-list bordered separator v-if="dist.hydrometers.length">
              <q-item v-for="h in dist.hydrometers" :key="h.id">
                <q-item-section avatar>
                  <q-icon name="water" />
                </q-item-section>

                <q-item-section>
                  <div class="text-bold">Hidrômetro: {{ h.number }}</div>
                  <div class="text-caption text-grey">
                    Status: {{ h.status }} |
                    Zona: {{ h.zone?.name || 'N/A' }}
                  </div>
                </q-item-section>
              </q-item>
            </q-list>

            <div v-else class="text-grey text-italic q-ml-md q-mt-sm">
              Nenhum hidrômetro atribuído.
            </div>
          </q-expansion-item>

          <q-separator spaced inset />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useInspectionStore } from "../stores";

const router = useRouter();
const route = useRoute();

const inspectionStore = useInspectionStore();

// Simulação com dados reais do backend
const { id } = route.params;
const rawData = ref([]);

// Agrupador
function groupByEmployee(data) {
  const grouped = {};

  for (const item of data) {
    const empId = item.employeeId;

    if (!grouped[empId]) {
      grouped[empId] = {
        employee: item.employee,
        hydrometers: [],
      };
    }

    grouped[empId].hydrometers.push(item.watermeter);
  }

  return Object.values(grouped);
}

// Computado para a listagem agrupada
const groupedDistributions = computed(() => groupByEmployee(rawData.value));

async function fetchData() {
  try {
    await inspectionStore.findWatermeter(id);
    rawData.value = inspectionStore.watermeters
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await fetchData();
});
</script>
