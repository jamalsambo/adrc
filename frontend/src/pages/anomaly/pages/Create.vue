<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-lg q-mx-auto" style="max-width: 600px">
      <q-card-section>
        <div class="text-h6">
          <q-icon name="speed" class="q-mr-sm" />
          {{ isEdit ? "Editar Anomalia" : "Nova Anomalia" }}
        </div>
      </q-card-section>

      <q-form @submit.prevent="handleSubmit" class="q-gutter-md q-mt-md">
        <q-input
          v-model="form.code"
          label="Codigo"
          filled
          :rules="[(v) => !!v || 'Obrigatório']"
          dense
        />
        <q-input
          v-model="form.name"
          label="Anomalia"
          filled
          :rules="[(v) => !!v || 'Obrigatório']"
          dense
        />

        <div class="row justify-end q-gutter-sm">
          <q-btn
            flat
            label="Cancelar"
            color="grey"
            @click="router.push('/anomalies')"
          />
          <q-btn label="Salvar" color="primary" type="submit" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import useNotify from "app/composables/UseNotify";
import { useAnomalyStore } from "../stores";

/*  Inicialização dos objetos do Vue Router */
const router = useRouter();
const route = useRoute();

/* Inicialização das stores */
const anomalyStore = useAnomalyStore();
const { notifySuccess, notifyError } = useNotify();

/* Inicialização das variaveis */
const isEdit = ref(false);
const form = reactive({
  code: "",
  name: "",
});


/* Função para submeter o formulario de cadastro ou edição do hidrometro */
async function handleSubmit() {
  try {
    if (isEdit.value) {
      await anomalyStore.update(route.params.id, {
        ...form,
      });
      notifySuccess("Anomaolia editado com sucesso");
    } else {
      await anomalyStore.create(form);
      notifySuccess("Anomaolia registado com sucesso");
    }
  } catch (error) {
    notifyError("Ocorreu algum erro na operação");
  }
  router.push("/anomalies")
}

/* Logica de inicializacao da pagina */
onMounted(() => {
  if (route.params.id) {
    isEdit.value = true;
    anomalyStore.findOne(route.params.id)
    Object.assign(form, anomalyStore.anomaly);
  }
});
</script>
