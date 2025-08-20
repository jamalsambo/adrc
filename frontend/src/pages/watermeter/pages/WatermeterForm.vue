<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-lg q-mx-auto" style="max-width: 600px">
      <q-card-section>
        <div class="text-h6">
          <q-icon name="speed" class="q-mr-sm" />
          {{ isEdit ? "Editar Hidrômetro" : "Novo Hidrômetro" }}
        </div>
      </q-card-section>

      <q-form @submit.prevent="handleSubmit" class="q-gutter-md q-mt-md">
        <q-input
          v-model="form.number"
          label="Número de Série"
          filled
          :rules="[(v) => !!v || 'Obrigatório']"
          dense
        />
        <q-select
          v-model="form.status"
          v-if="isEdit"
          label="Estado"
          filled
          :options="['Activo', 'Inactivo']"
          :rules="[(v) => !!v || 'Obrigatório']"
        />

        <div class="row justify-end q-gutter-sm">
          <q-btn
            flat
            label="Cancelar"
            color="grey"
            @click="router.push('/watermeters')"
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
import { useAuthStore } from "src/pages/auth/store";
import { useWatermeterStore } from "../stores";

/*  Inicialização dos objetos do Vue Router */
const router = useRouter();
const route = useRoute();

/* Inicialização das stores */
const auth = useAuthStore();
const watermeterStore = useWatermeterStore();
const { notifySuccess, notifyError } = useNotify();

/* Inicialização das variaveis */
const isEdit = ref(false);
const form = reactive({
  number: "",
  status: "Inactivo",
  delegationId: auth.user.delegationId,
});


/* Função para submeter o formulario de cadastro ou edição do hidrometro */
async function handleSubmit() {
  try {
    if (isEdit.value) {
      await watermeterStore.update(route.params.id, {
        ...form,
        updatedBy: auth.user.sub,
      });
      notifySuccess("Hidrômetro editado com sucesso");
    } else {
      await watermeterStore.create({
        ...form,
        createdBy: auth.user.sub,
      });
      notifySuccess("Hidrômetro registado com sucesso");
    }
  } catch (error) {
    notifyError("Ocorreu algum erro na operação");
  }
  router.push("/watermeters")
}

/* Logica de inicializacao da pagina */
onMounted(() => {
  if (route.params.id) {
    isEdit.value = true;
    watermeterStore.findOne(route.params.id)
    Object.assign(form, watermeterStore.watermeter);
  }
});
</script>
