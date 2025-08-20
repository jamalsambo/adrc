<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-lg q-mx-auto" style="max-width: 700px">
      <q-card-section>
        <div class="text-h6">
          <q-icon name="edit_location" class="q-mr-sm" />
          {{ isEdit ? "Editar Inspeção" : "Nova Inspeção" }}
        </div>
      </q-card-section>

      <q-form @submit.prevent="saveInspection" class="q-gutter-md q-mt-md">
        <q-select
          filled
          label="Cliente"
          v-model="form.inspectionTypeId"
          :options="types"
          option-label="name"
          option-value="id"
          map-options
          emit-value
          :rules="[(v) => !!v || 'Obrigatório']"
          dense
        />
        <div class="row justify-end q-gutter-sm">
          <q-btn flat label="Cancelar" @click="router.push('/inspections')" />
          <q-btn label="Salvar" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useAuthStore } from "src/pages/auth/store";
import { useInspectionStore } from "../stores";
import useNotify from "app/composables/UseNotify";
import { useRouter } from "vue-router";


const router = useRouter()

/* Inicialização das stores */
const auth = useAuthStore();
const inspectionStore = useInspectionStore();
const { notifyError, notifySuccess } = useNotify();

/* Inicialização das variaveis */
const isEdit = ref(false);
const types = ref([]);

const form = reactive({
  inspectionTypeId: "",
  delegationId: auth.user.delegationId,
  createdBy: auth.user.sub,
});

async function saveInspection() {
  try {
    await inspectionStore.create(form);
    notifySuccess("Inspeção registada com sucesso");
  } catch (error) {
    notifyError("Erro ao criar inspeção");
  }
  router.push("/inspections");
}

async function fetchData() {
  try {
    await inspectionStore.findTypes();
    types.value = inspectionStore.types;
  } catch (error) {
    notifyError("Erro ao buscar dados");
  }
}

onMounted(async () => {
  await fetchData();
});
</script>
