<template>
  <q-page class="q-pa-md column items-center">
    <q-card flat bordered class="q-pa-md" style="max-width: 400px; width: 100%">
      <div id="reader" v-if="!dadosQr" style="width: 100%; height: 300px" />

      <div v-else class="column q-gutter-md">
        <div class="text-h6">Cliente: {{ dadosQr.name }}</div>

        <q-form @submit.prevent="submitForm">
          <q-input
            v-model="reading"
            label="Leitura (4 dígitos)"
            type="number"
            :rules="[(v) => (v && v.toString().length === 4) || 'Insira 4 dígitos']"
            dense
            outlined
          />

          <q-select
            v-model="typeReading"
            :options="types"
            label="Tipo de Leitura"
            dense
            option-label="name"
            option-value="id"
            map-options
            outlined
          />

          <q-select
            class="q-mt-md"
            v-if="typeReading?.name === 'Anomalia'"
            v-model="anomaly"
            :options="anomalies"
            label="Selecione Anomalia"
            dense
            option-label="name"
            option-value="id"
            map-options=""
            outlined
          />

          <!-- Botão que abre a câmera diretamente -->
          <q-btn
            flat
            label="Tirar foto do hidrômetro"
            color="primary"
            class="q-mt-md"
            @click="triggerCamera"
          />
          <input
            ref="cameraInput"
            type="file"
            accept="image/*"
            capture="environment"
            @change="onPhotoCaptured"
            style="display: none"
          />

          <img v-if="previewPhoto" :src="previewPhoto" class="camera-preview q-mt-sm" />

          <q-btn
            type="submit"
            label="Lançar leitura"
            color="primary"
            class="full-width q-mt-md"
            :disable="!formValido"
          />
        </q-form>
      </div>
      <q-footer bordered class="bg-grey-2 text-right q-pa-sm">
        <q-btn
          color="primary"
          icon="arrow_back"
          label="Voltar"
          @click="router.back('/')"
        />
      </q-footer>
    </q-card>
  </q-page>
</template>

<script setup>
import axios from "axios";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { Html5Qrcode } from "html5-qrcode";
import { useQuasar } from "quasar";
import { useAuthStore } from "src/pages/auth/store";
import { useReadingStore } from "../stores";
import { useAnomalyStore } from "src/pages/anomaly/stores";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import useNotify from "app/composables/UseNotify";
const API_URL = import.meta.env.VITE_API_URL;

const route = useRoute();
const router = useRouter();

const auth = useAuthStore();
const readingStore = useReadingStore();
const anomalyStore = useAnomalyStore();
const { notifyError, notifySuccess, notifyInfo } = useNotify();

const watermeterId = ref(route.params.id);
const { inspectionId } = route.params;
const cameraInput = ref(null);
const dadosQr = ref(null);
const reading = ref("");
const types = ref([]);
const typeReading = ref(null);
const anomaly = ref(null);
const previewPhoto = ref("");
const fotoFile = ref(null);
const fotoUrl = ref(null);
const anomalies = ref([]);
let leitor = null;

// iniciar leitor de QR
onMounted(async () => {
  leitor = new Html5Qrcode("reader");
  leitor.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      try {
        const obj = JSON.parse(decodedText);
        if (obj.watermeterId === watermeterId.value) {
          dadosQr.value = obj;
        } else {
          notifyError("QR inválido");
          leitor = new Html5Qrcode("reader");
        }
      } catch {
        notifyError("Ocorreu um erro");
      }
      leitor.stop();
    },
    () => {}
  );
  await fetchData();
});
// onBeforeUnmount(() => leitor && leitor.stop());

// validação do formulário
const formValido = computed(() => {
  return (
    dadosQr.value &&
    reading.value.toString().length === 4 &&
    (typeReading.value?.name === "Normal" || anomaly.value) &&
    fotoFile.value
  );
});

// captura de foto → preview e arquivo
async function onPhotoCaptured(e) {
  const file = e.target.files[0];
  if (!file) return;
  fotoFile.value = file;
  const formData = new FormData();
  formData.append("file", file);
  previewPhoto.value = URL.createObjectURL(file);

  try {
    const API_URL = import.meta.env.VITE_API_URL;

    const { data } = await axios.post(`${API_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    fotoUrl.value = data.filename;
    notifyInfo("Foto carregada")
  } catch (error) {
    notifyError("Erro ao carregar a foto");
  }
}

// dispara input de foto
function triggerCamera() {
  cameraInput.value?.click();
}

async function fetchData() {
  try {
    await readingStore.findTypes();
    types.value = readingStore.types;

    await anomalyStore.find();
    anomalies.value = anomalyStore.anomalies;
  } catch (error) {
    notifyError("Erro ao carregar dados");
  }
}

// envio do form
async function submitForm() {
  try {
    if (dadosQr.value.watermeterId === watermeterId.value) {
      const payload = {
        reading: parseInt(reading.value),
        fotoUrl: fotoFile.value.name,
        delegationId: auth.user.delegationId,
        watermeterId: watermeterId.value,
        customerId: dadosQr.value.customerId,
        typeReadingId: typeReading.value.id,
        inspectionId: inspectionId,
        ...(typeReading.value.name === "Anomalia" && anomaly.value?.id
          ? { anomalyId: anomaly.value.id }
          : {}),
        userId: auth.user.sub,
        fotoUrl: fotoUrl.value,
      };

      await readingStore.create(payload);
      notifySuccess("Leitura lançada com sucesso!");
      router.push(`/readings/${readingStore.reading.id}`);
      leitor.stop();
    } else {
      notifyError("Dados invalidos");
      router.push(`inspections/${inspectionId}/watermeters`);
    }
  } catch (error) {}
}

onBeforeRouteUpdate((to) => {
  watermeterId.value = to.params.id;
});
</script>

<style scoped>
.camera-button {
  display: inline-block;
  padding: 0.6em 1em;
  background: #1976d2;
  color: white;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
}
.camera-button:active {
  opacity: 0.8;
}
.camera-preview {
  width: 100%;
  border-radius: 4px;
}
#reader {
  border: 2px solid #ccc;
  border-radius: 8px;
}
</style>
