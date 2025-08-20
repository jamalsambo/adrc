<template>
  <q-page padding>
    <q-card flat bordered class="q-pa-md shadow-2">
      <q-card-section>
        <div class="text-h6">
          Gereciamento de acesso - {{ userStores.user?.displayName }}
        </div>
        <q-separator spaced />
        <q-form @submit.prevent="handleSubmit" class="q-gutter-md q-pt-sm">
          <div class="row q-col-gutter-sm">
            <!-- Select Tipo -->
            <q-input
              class="col-md-6 col-sm-12 col-xs-12"
              label="Usuario"
              v-model="form.username"
              outlined
              required
              dense
            />
            <q-input
              class="col-md-6 col-sm-12 col-xs-12"
              label="Numero de telefone"
              v-model="form.phone"
              outlined
              required
              dense
            />
            <q-input
              class="col-md-6 col-sm-12 col-xs-12"
              label="Palavra-passe *"
              v-model="form.password"
              outlined
              dense
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <q-input
              class="col-md-grow col-sm-12 col-xs-12"
              label="Confirmação da Senha *"
              v-model="form.passwordConfirm"
              outlined
              dense
              :type="isPwd ? 'password' : 'text'"
              :rules="[validaSenha]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="row justify-end q-gutter-sm">
            <q-btn
              label="Guardar"
              color="positive"
              icon="save"
              type="submit"
              flat
            />
          </div>
        </q-form>
      </q-card-section>

      <q-separator spaced />
      <q-card-section>
        <div class="text-h6">Permissões</div>
        <q-select
          outlined
          v-model="selected"
          multiple
          :options="options"
          option-value="value"
          option-label="label"
          emit-value
          map-options
          use-chips
          stack-label
          label="Permissões"
          dense
        >
          <template v-slot:selected-item="scope">
            <q-chip>
              {{ scope.opt.label }}
            </q-chip>
          </template>

          <template v-slot:option="scope">
            <q-item clickable v-ripple @click="toggleSelection(scope.opt)">
              <q-item-section>
                <q-item-label>
                  <strong v-if="scope.opt.isGroup">{{
                    scope.opt.label
                  }}</strong>
                  <span v-else>{{ scope.opt.label }}</span>
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon v-if="isSelected(scope.opt)" name="check" />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
      <q-card-actions vertical align="right">
        <q-btn
          label="Voltar"
          color="negative"
          icon="back"
          @click="router.back()"
          flat
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "../stores";
import { useRoute, useRouter } from "vue-router";
import useNotify from "app/composables/UseNotify";

/* routers */
const route = useRoute();
const router = useRouter();

/* stores */
const userStores = useUserStore();
const { notifyError, notifySuccess } = useNotify();

/* data */
const { userId } = route.params;
const roles = ref([]);
const selected = ref([]);
const form = ref({
  username: "",
  phone: "",
  password: "",
  passwordConfirm: "",
});
/* computed */

const options = computed(() =>
  roles.value.flatMap((group) => [
    {
      label: group.name,
      isGroup: true, // usado no template
      value: null, // não é selecionável
    },
    ...group.permissions.map((item) => ({
      id: item.id,
      label: `- ${item.name}`,
      value: item.key,
      isGroup: false,
    })),
  ])
);

/* methods */
const validaSenha = (val) => {
  return val === form.value.password || "As senhas não coincidem!";
};

const toggleSelection = async (option) => {
  const index = selected.value.indexOf(option.value);
  if (index === -1) {
    await userStores.addPermissions(userId, {
      userId: userId,
      permissionIds: Array.isArray(option.id) ? option.id : [option.id],
    });
    selected.value.push(option.value);
  } else {
    await userStores.removePermissions(userId, option.id);
    selected.value.splice(index, 1);
  }
};

function isSelected(option) {
  return selected.value.includes(option.value);
}

async function handleSubmit() {
  const cleanedForm = Object.fromEntries(
    Object.entries(form.value).filter(([_, value]) => value !== "")
  );
  try {
    await userStores.update(userId, cleanedForm);
    notifySuccess("Dados actualidados com sucesso");
  } catch (error) {
    notifyError("Erro ao actualizar dados");
  }
}
/* fetch data */
const fetchData = async () => {
  try {
    await userStores.findOne(userId);

    form.value.username = userStores.user.username;
    form.value.phone = userStores.user.phone;

    await userStores.findRoles();
    roles.value = userStores.roles;

    selected.value = userStores?.user.permissions?.map((up) => up.key);
  } catch (error) {
    console.log(error);
  }
};
onMounted(async () => await fetchData());
</script>
