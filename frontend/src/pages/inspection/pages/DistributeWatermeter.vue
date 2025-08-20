<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-lg q-mx-auto" style="max-width: 1000px">
      <q-card-section>
        <div class="text-h6">
          <q-icon name="call_split" class="q-mr-sm" />
          Distribuir Hidrômetros à Inspeção
        </div>
      </q-card-section>

      <q-form @submit.prevent="submitDistribution" class="q-gutter-md q-mt-md">
        <div class="row q-col-gutter-sm">
          <!-- Zonas da Inspeção -->
          <q-card flat bordered class="col-12 col-md-6">
            <q-card-section>
              <div class="text-subtitle1 q-mb-sm">
                <q-icon name="map" class="q-mr-sm" />
                Zonas Associadas
              </div>
              <q-list bordered separator>
                <q-item v-for="zone in zones" :key="zone.id">
                  <q-item-section>{{ zone.name }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>

          <!-- Funcionários Afetados -->
          <q-card flat bordered class="col-12 col-md-6">
            <q-card-section>
              <div class="text-subtitle1 q-mb-sm">
                <q-icon name="people" class="q-mr-sm" />
                Funcionários Afetos
              </div>
              <q-list bordered separator>
                <q-item v-for="employee in employees" :key="employee.id">
                  <q-item-section>{{ employee.fullName }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- Botões -->
        <div class="row justify-end q-gutter-sm q-mt-md">
          <q-btn
            flat
            label="Cancelar"
            color="grey"
            @click="router.push('/distribuicoes')"
          />
          <q-btn label="Distribuir" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEmployeeStore } from "src/pages/employee/stores";
import { useWatermeterStore } from "src/pages/watermeter/stores";

const router = useRouter();
const route = useRoute();

const employeeStore = useEmployeeStore();
const watermeterStore = useWatermeterStore();

const zones = ref([]);
const employees = ref([]);

async function fetchData() {
  try {
    await employeeStore.find();

    // Filtra apenas os funcionários que têm pelo menos uma zona
    const employeesWithZones = employeeStore.employees.filter(
      (person) => person.zones && person.zones.length > 0
    );

    employees.value = employeesWithZones;

    zones.value = Array.from(
      new Map(
        employeesWithZones
          .flatMap((person) => person.zones)
          .map((zone) => [zone.id, zone])
      ).values()
    );
  } catch (error) {
    console.log(error);
  }
}

async function submitDistribution() {
  try {
    await watermeterStore.distribute(route.params.id);
    router.push({
      name: "inspections-distribute-list",
      params: { id: route.params.id },
    });
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await fetchData();
});
</script>
