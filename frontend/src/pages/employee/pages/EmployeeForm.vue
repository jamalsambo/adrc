<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-lg q-mx-auto" style="max-width: 600px">
      <q-card-section>
        <div class="text-h6">
          <q-icon name="person" class="q-mr-sm" />
          {{ isEdit ? "Editar Funcionário" : "Novo Funcionário" }}
        </div>
      </q-card-section>

      <q-separator />

      <q-form @submit.prevent="handleSubmit" class="q-gutter-md q-mt-md">
        <q-input
          v-model="form.number"
          label="ID do funcionario"
          :rules="[(val) => !!val || 'Obrigatório']"
          filled
          dense
        />

        <q-input
          v-model="form.fullName"
          label="Nome completo"
          :rules="[(val) => !!val || 'Obrigatório']"
          filled
          dense
        />

        <q-input
          v-model="form.dateBirth"
          label="Data de Nascimento"
          filled
          mask="####-##-##"
          hint="Formato: AAAA-MM-DD"
          :rules="[(val) => !!val || 'Obrigatório']"
          dense
        />

        <q-select
          v-model="form.gender"
          label="Gênero"
          filled
          :options="genderOptions"
          :rules="[(val) => !!val || 'Obrigatório']"
          dense
          option-value="value"
          option-label="label"
          map-options
        />

        <div class="row justify-end q-gutter-sm q-mt-md">
          <q-btn label="Cancelar" color="grey" flat @click="cancel" />
          <q-btn label="Salvar" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import useNotify from "app/composables/UseNotify";
import { useAuthStore } from "src/pages/auth/store";
import { useEmployeeStore } from "../stores";

/*  Inicialização dos objetos do Vue Router */
const router = useRouter();
const route = useRoute();

/* Inicialização das stores */
const auth = useAuthStore();
const employeeStores = useEmployeeStore();
const { notifySuccess, notifyError } = useNotify();

/* Inicialização dos dados do formulario  */
const form = reactive({
  number: "",
  fullName: "",
  dateBirth: "",
  gender: "",
  delegationId: auth.user.delegationId,
});
const genderOptions = [
  { label: "Masculino", value: "Masculino" },
  { label: "Feminino", value: "Feminino" },
];

/* Inicialização das variaveis  */
const isEdit = ref(false);

/* Função para submeter o formulario de cadastro ou edição do funcionario */
async function handleSubmit() {
  try {
    if (isEdit.value) {
      await employeeStores.update(route.params.id, {
        ...form,
        gender: form.gender.value,
        updatedBy: auth.user.sub,
      });
      notifySuccess("Funcionario editado com sucesso");
    } else {
      await employeeStores.create({
        ...form,
        gender: form.gender.value,
        createdBy: auth.user.sub,
      });
      notifySuccess("Funcionario registado com sucesso");
    }
  } catch (error) {
    notifyError("Ocorreu algum erro na operação");
  }

  router.push("/employees");
}

/* Função para voltar na pagina de listagem de funcionario */
function cancel() {
  router.push("/employees");
}

/* Logica de inicializacao da pagina */
onMounted(async () => {
  if (route.params.id) {
    isEdit.value = true;
    await employeeStores.findOne(route.params.id);
    Object.assign(form, employeeStores.empployee);
  }
});
</script>
