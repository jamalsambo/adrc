<template>
  <q-page padding>
    <div class="q-gutter-md">
      <!-- TÍTULO -->
      <q-banner class="bg-primary text-white text-h6 q-pa-md rounded-borders shadow-2">
        Painel de Principal
      </q-banner>

      <!-- ÚLTIMAS INSPEÇÕES -->
      <div v-if="auth.hasViewInspection">
        <div class="text-h6 q-mt-md q-mb-sm">Últimas Inspeções</div>
        <div class="row q-col-gutter-md">
          <div
            v-for="(item, index) in latestInspections"
            :key="index"
            class="col-md-4 col-sm-6 col-xs-12"
          >
            <q-card>
              <q-card-section>
                <div class="text-subtitle1">{{ item.number }}</div>
                <div class="text-caption text-grey">
                  Número de Cliente: {{ item.totalWatermeters }}
                </div>
                <div class="text-caption text-grey">Mes: {{ item.month }}</div>
                <div class="text-caption text-grey">
                  Data de criação: {{ formatarData(item.createdAt) }}
                </div>

                <!-- Seção de totais de inspeção -->
                <div class="q-mt-md q-pa-sm bg-grey-1 rounded-borders">
                  <div class="text-subtitle2 text-primary q-mb-sm">
                    Totais de Inspeção
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col text-center bg-green-1 q-pa-xs rounded-borders">
                      <div class="text-caption text-green-8">Inspecionados</div>
                      <div class="text-h6 text-green-10">{{ item.inspected }}</div>
                    </div>
                    <div class="col text-center bg-orange-1 q-pa-xs rounded-borders">
                      <div class="text-caption text-orange-8">Por Inspecionar</div>
                      <div class="text-h6 text-orange-10">{{ item.notInspected }}</div>
                    </div>
                    <div class="col text-center bg-blue-1 q-pa-xs rounded-borders">
                      <div class="text-caption text-blue-8">Total</div>
                      <div class="text-h6 text-blue-10">{{ item.totalWatermeters }}</div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  color="primary"
                  icon="visibility"
                  label="Detalhes"
                  @click="router.push(`inspections/${item.id}/watermeters`)"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>

      <!-- ÚLTIMAS LEITURAS -->
      <div v-if="auth.hasViewReading">
        <div class="text-h6 q-mt-md q-mb-sm">Últimas Leituras</div>
        <div class="row q-col-gutter-md">
          <div
            v-for="(item, index) in latestReadings"
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

      <!-- ÚLTIMOS HIDRÔMETROS -->
      <div v-if="auth.hasViewWatermeter">
        <div class="text-h6 q-mt-md q-mb-sm">Últimos Hidrômetros</div>
        <div class="row q-col-gutter-md">
          <div
            v-for="(item, index) in latestWatermeters"
            :key="index"
            class="col-md-4 col-sm-6 col-xs-12"
          >
            <q-card>
              <q-card-section>
                <div class="text-subtitle1">Nº {{ item.number }}</div>
                <div class="text-caption text-grey">Estado em: {{ item.status }}</div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  flat
                  color="primary"
                  icon="visibility"
                  label="Detalhes"
                  @click="router.push(`/watermeters/${item.id}/info/`)"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>

      <!-- ZONAS DE INSPEÇÃO -->
      <q-card
        flat
        bordered
        class="q-pa-md q-mt-lg"
        v-if="auth.user.userType === 'Leitor'"
      >
        <div class="text-h6 q-mb-md">Zonas de Inspeção</div>
        <q-chip
          v-for="(zone, index) in employeeZones"
          :key="index"
          color="primary"
          text-color="white"
          class="q-mr-sm q-mb-sm"
        >
          {{ zone.name }}
        </q-chip>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "./auth/store";
import { useInspectionStore } from "./inspection/stores";
import { useReadingStore } from "./reading/stores";
import { useEmployeeStore } from "./employee/stores";
import { useWatermeterStore } from "./watermeter/stores";
import { useRouter } from "vue-router";

const router = useRouter();

const auth = useAuthStore();
const inspectionStore = useInspectionStore();
const readingStore = useReadingStore();
const employeeStore = useEmployeeStore();
const watermeterStore = useWatermeterStore();

const latestInspections = ref([]);

const latestReadings = ref([]);

const latestWatermeters = ref([]);

const employeeZones = ref([]);

const fetchData = async () => {
  try {
    // busca de ultimas inspeçoes
    const payload = {
      employeeId: auth.user.employeeId,
      limit: 3,
    };
    if (auth.user.userType === "Leitor") {
      await inspectionStore.find(payload);
    } else {
      await inspectionStore.find({ limit: 3 });
    }
    latestInspections.value = inspectionStore.inspections;

    // Busca de ultimas leituras
    const payReading = {
      userId: auth.user.sub,
      limit: 3,
    };
    if (auth.user.userType === "Leitor") {
      await readingStore.find(payReading);
    } else {
      await readingStore.find({ limit: 3 });
    }
    latestReadings.value = readingStore.readings;

    await employeeStore.findOne(auth.user.employeeId);
    employeeZones.value = employeeStore.empployee.zones;

    await watermeterStore.find({ limit: 3 });
    latestWatermeters.value = watermeterStore.watermeters;
  } catch (error) {
    console.log(error);
  }
};

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

onMounted(fetchData);
</script>

<style scoped>
.rounded-borders {
  border-radius: 12px;
}

.scrolling-row {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding-bottom: 8px;
}

.card-item {
  min-width: 230px;
  max-width: 250px;
  flex-shrink: 0;
}
</style>
