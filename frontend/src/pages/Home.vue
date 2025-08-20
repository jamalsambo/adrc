<template>
  <q-page padding>
    <div class="q-gutter-md">
      <!-- TÍTULO -->
      <q-banner
        class="bg-primary text-white text-h6 q-pa-md rounded-borders shadow-2"
      >
        Painel de Inspeções
      </q-banner>

      <!-- ÚLTIMAS INSPEÇÕES -->
      <div class="text-h6 q-mt-md q-mb-sm">Últimas Inspeções</div>
      <div class="row q-col-gutter-md">
        <div
          v-for="(item, index) in latestInspections"
          :key="index"
          class="col-md-3 col-sm-6 col-xs-12"
        >
          <q-card >
            <q-card-section>
              <div class="text-subtitle1">{{ item.title }}</div>
              <div class="text-caption text-grey">{{ item.date }}</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat color="primary" icon="visibility" label="Detalhes" />
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <!-- ÚLTIMAS LEITURAS -->
      <div class="text-h6 q-mt-md q-mb-sm">Últimas Leituras</div>
       <div class="row q-col-gutter-md">
        <div
          v-for="(item, index) in latestReadings"
          :key="index"
          class="col-md-3 col-sm-6 col-xs-12"
        >
        <q-card>
          <q-card-section>
            <div class="text-subtitle1">{{ item.value }} m³</div>
            <div class="text-caption text-grey">{{ item.date }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat color="primary" icon="visibility" label="Detalhes" />
          </q-card-actions>
        </q-card>
        </div>
      </div>

      <!-- ÚLTIMOS HIDRÔMETROS -->
      <div class="text-h6 q-mt-md q-mb-sm">Últimos Hidrômetros</div>
       <div class="row q-col-gutter-md">
        <div
          v-for="(item, index) in latestWatermeters"
          :key="index"
          class="col-md-3 col-sm-6 col-xs-12"
        >
        <q-card

        >
          <q-card-section>
            <div class="text-subtitle1">Nº {{ item.serial }}</div>
            <div class="text-caption text-grey">
              Instalado em: {{ item.installedAt }}
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat color="primary" icon="visibility" label="Detalhes" />
          </q-card-actions>
        </q-card>
        </div>
      </div>

      <!-- ZONAS DE INSPEÇÃO -->
      <q-card flat bordered class="q-pa-md q-mt-lg">
        <div class="text-h6 q-mb-md">Zonas de Inspeção</div>
        <q-chip
          v-for="(zone, index) in employeeZones"
          :key="index"
          color="primary"
          text-color="white"
          class="q-mr-sm q-mb-sm"
        >
          {{ zone }}
        </q-chip>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const latestInspections = ref([
  { title: "Inspeção Rua A", date: "2025-07-17" },
  { title: "Inspeção Rua B", date: "2025-07-16" },
  { title: "Inspeção Rua C", date: "2025-07-15" },
  { title: "Inspeção Rua D", date: "2025-07-14" },
]);

const latestReadings = ref([
  { value: 120, date: "2025-07-17" },
  { value: 90, date: "2025-07-16" },
  { value: 110, date: "2025-07-15" },
  { value: 95, date: "2025-07-14" },
]);

const latestWatermeters = ref([
  { serial: "HDM-987654", installedAt: "2025-07-17" },
  { serial: "HDM-123456", installedAt: "2025-07-16" },
  { serial: "HDM-456789", installedAt: "2025-07-15" },
  { serial: "HDM-321654", installedAt: "2025-07-14" },
]);

const employeeZones = ref([
  "Zona Norte",
  "Zona Centro",
  "Zona Sul",
  "Zona Leste",
]);
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
