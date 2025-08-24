<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-lg q-mx-auto" style="max-width: 600px">
      <q-card-section>
        <div class="text-h6">
          <q-icon name="link" class="q-mr-sm" />
          {{
            dados?.customerId
              ? `Hidrômetro associado ao ${dados?.name}`
              : " Associar Hidrômetro ao Cliente"
          }}
        </div>
      </q-card-section>

      <q-form @submit.prevent="submitAssociation" class="q-gutter-md q-mt-md">
        <q-input v-model="form.lantitude" label="Latitude" filled />
        <q-input v-model="form.longitude" label="Longitude" filled />
        <q-select
          v-model="form.zoneId"
          label="Selecionar a zona"
          filled
          :options="zones"
          option-label="name"
          option-value="id"
          map-options
          emit-value
          clearable
        />
        <q-input
          v-model="form.block"
          label="Quarteirão"
          filled
          type="number"
          :rules="[
            (val) => !!val || 'Campo obrigatório',
            (val) => /^\d+$/.test(val) || 'Apenas números',
          ]"
        />

        <map-picker
          :lat="form.lantitude"
          :lng="form.longitude"
          @update:lat="form.lantitude = $event"
          @update:lng="form.longitude = $event"
        />

        <q-select
          v-model="formAssociete.customerId"
          label="Selecionar Cliente"
          filled
          :options="clientOptions"
          option-label="fullName"
          option-value="id"
          map-options
          emit-value
          :rules="[(v) => !!v || 'Obrigatório']"
        />

        <q-card class="q-pa-md column items-center" v-if="dados?.customerId">
          <!-- QR Code exibido -->
          <div v-if="qrCodeDataUrl" class="q-mt-md" ref="qrContainer">
            <img
              :src="qrCodeDataUrl"
              alt="QR Code Gerado"
              style="width: 100%; max-width: 300px"
            />
          </div>
          <q-btn
            @click="exportarPDF"
            label="Exportar PDF"
            class="q-mt-md"
            color="primary"
          />
        </q-card>

        <div class="row justify-end q-gutter-sm">
          <q-btn
            :label="dados?.customerId ? 'Dissassociar' : 'Associar'"
            color="primary"
            type="submit"
          />
        </div>
      </q-form>
       <q-footer bordered class="bg-grey-2 text-right q-pa-sm">
        <q-btn color="primary" icon="arrow_back" label="Voltar" @click="router.push('/watermeters')"/>
      </q-footer> 
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import MapPicker from "components/MapPicker.vue";
import { useAuthStore } from "src/pages/auth/store";
import { useComposablesStores } from "app/composables";
import { useCustomerStore } from "src/pages/customer/stores";
import { useWatermeterStore } from "../stores";
import useNotify from "app/composables/UseNotify";
import QRCode from "qrcode";
import html2pdf from "html2pdf.js";

/*  Inicialização dos objetos do Vue Router */
const router = useRouter();
const route = useRoute();

/* Inicialização das stores */
const auth = useAuthStore();
const composablesStore = useComposablesStores();
const customerStore = useCustomerStore();
const watermeterStore = useWatermeterStore();
const { notifySuccess, notifyError } = useNotify();

/* Inicialização das variaveis */
const { id } = route.params;
const watermeter = ref();
const form = ref({
  lantitude: null,
  longitude: null,
  zoneId: "",
  block: 1,
  status: "Activo"
});
const formAssociete = ref({
  customerId: "",
  watermeterId: route.params.id,
  createdBy: auth.user.sub,
});
const dados = ref(null);
const clientOptions = ref([]);
const zones = ref([]);
const qrCodeDataUrl = ref("");
const qrContainer = ref(null);

async function submitAssociation() {
  try {
    if (!dados.value?.customerId) {
      await customerStore.addWatermeter(formAssociete.value);
      await watermeterStore.update(route.params.id, {
        ...form.value,
        block: parseInt(form.value.block),
        updatedBy: auth.user.sub,
      });
      notifySuccess("Hidrometro associado com sucesso");
    } else {
      await customerStore.removeWatermeter(
        dados.value.customerId,
        dados.value.watermeterId
      );
      await watermeterStore.update(route.params.id, {
        ...form.value,
        updatedBy: auth.user.sub,
      });
      notifySuccess("Hidrometro desassociado com sucesso");
    }
    router.back();
  } catch (error) {
    console.log(error);
    notifyError("OCorreu um erro ao associar hidrometro");
  }
}

async function fetchData() {
  try {
    await watermeterStore.findOne(id);
    watermeter.value = watermeterStore.watermeter;

    await composablesStore.findZones();
    zones.value = composablesStore.zones;

    await customerStore.find();
    clientOptions.value = customerStore.customers;

    form.value.lantitude = watermeter.value?.lantitude;
    form.value.longitude = watermeter.value?.longitude;
    form.value.zoneId = watermeter.value?.zoneId;
    form.value.block = watermeter.value.block

    const mostRecent = watermeter.value?.hasCustomers?.reduce((prev, curr) => {
      return new Date(prev?.createdAt) > new Date(curr?.createdAt) ? prev : curr;
    });

    formAssociete.value.customerId = mostRecent.customerId;

    dados.value = {
      name: mostRecent.customer.fullName,
      customerId: mostRecent.customer.id,
      watermeterId: mostRecent.watermeterId,
    };

    qrCodeDataUrl.value = await QRCode.toDataURL(JSON.stringify(dados.value));
  } catch (error) {
    console.log(error);
  }
}

const exportarPDF = () => {
  if (!qrContainer.value) return;
  const opt = {
    margin: 1,
    filename: `${dados.value.name || "qr-code"}.pdf`,
    image: { type: "png", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().set(opt).from(qrContainer.value).save();
};

/* Logica de inicializacao da pagina */
onMounted(async () => {
  await fetchData();
});
</script>
