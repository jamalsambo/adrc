<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click="toggleLeftDrawer" icon="menu" aria-label="Menu" />
        <q-toolbar-title> E-Digital </q-toolbar-title>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            round
            dense
            flat
            color="white"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
            v-if="$q.screen.gt.sm"
          >
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="white"
            icon="fab fa-github"
            type="a"
            href="https://github.com/pratik227/quasar-admin"
            target="_blank"
          >
          </q-btn>
          <q-btn
            round
            dense
            flat
            style="color: red !important"
            type="a"
            href="https://github.com/sponsors/pratik227"
            target="_blank"
          >
            <i class="fa fa-heart fa-2x fa-beat"></i>
          </q-btn>
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating> 5 </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn
                    label="View All"
                    style="max-width: 120px !important"
                    flat
                    dense
                    class="text-indigo-8"
                  ></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <q-btn icon="person">
                <q-menu>
                  <div class="row no-wrap q-pa-md">
                    <div class="column">
                      <div class="text-h6 q-mb-md">Settings</div>
                      <q-toggle v-model="mobileData" label="Use Mobile Data" />
                      <q-toggle v-model="bluetooth" label="Bluetooth" />
                    </div>

                    <q-separator vertical inset class="q-mx-lg" />

                    <div class="column items-center">
                      <q-avatar size="72px">
                        <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                      </q-avatar>

                      <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                      <q-btn
                        color="primary"
                        label="Logout"
                        push
                        size="sm"
                        @click="handleLogout"
                      />
                    </div>
                  </div>
                </q-menu>
              </q-btn>
              <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png" /> -->
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary text-white"
    >
      <q-list>
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          to="/employees"
          active-class="q-item-no-link-highlighting"
          v-if="authStore.hasViewEmployee || authStore.hasCreateEmployee"
        >
          <q-item-section avatar>
            <q-icon name="groups_2" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Funcionarios</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          to="/customers"
          active-class="q-item-no-link-highlighting"
          v-if="authStore.hasCreateCustomer || authStore.hasViewCustomer"
        >
          <q-item-section avatar>
            <q-icon name="group" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Consumidores</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          to="/watermeters"
          active-class="q-item-no-link-highlighting"
          v-if="authStore.hasCreateWatermeter || authStore.hasViewWatermeter"
        >
          <q-item-section avatar>
            <q-icon name="water_damage" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Hidrómetros</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          to="/inspections"
          active-class="q-item-no-link-highlighting"
          v-if="authStore.hasCreateInspection || authStore.hasViewInspection"
        >
          <q-item-section avatar>
            <q-icon name="fact_check" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Inspeções</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          to="/readings"
          active-class="q-item-no-link-highlighting"
          v-if="authStore.hasViewReadings"
        >
          <q-item-section avatar>
            <q-icon name="barcode_reader" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Leituras</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          icon="map"
          label="Suplementos"
          v-if="
            authStore.hasCreateAnomaly ||
            authStore.hasViewAnomaly ||
            authStore.hasCreateZone ||
            authStore.hasViewZone
          "
        >
          <q-list class="q-pl-lg">
            <q-item to="/anomalies" active-class="q-item-no-link-highlighting"
            v-if="
            authStore.hasCreateAnomaly ||
            authStore.hasViewAnomaly
          "
            >
              <q-item-section avatar>
                <q-icon name="map" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Anomalias</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/zones" active-class="q-item-no-link-highlighting" 
             v-if="
            authStore.hasCreateZone ||
            authStore.hasViewZone"
            >
              <q-item-section avatar>
                <q-icon name="location_on" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Zonas</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import EssentialLink from "components/EssentialLink.vue";
import Messages from "./Messages.vue";
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/pages/auth/store";
import useNotify from "../../composables/UseNotify";

/* setup router */
const router = useRouter();

/* setup router */
const authStore = useAuthStore();
const { notifyError, notifyInfo } = useNotify();

const leftDrawerOpen = ref(false);
const $q = useQuasar();

const handleLogout = () => {
  try {
    authStore.signOut();
    notifyInfo("Logout efetuado com sucesso!");
    router.push("/login");
  } catch (error) {
    notifyError("Erro ao efectuar logout");
  }
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style>
/* FONT AWESOME GENERIC BEAT */
.fa-beat {
  animation: fa-beat 5s ease infinite;
}

@keyframes fa-beat {
  0% {
    transform: scale(1);
  }
  5% {
    transform: scale(1.25);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.25);
  }
  50% {
    transform: scale(1);
  }
  55% {
    transform: scale(1.25);
  }
  70% {
    transform: scale(1);
  }
}
</style>
