<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-sm">
      <!-- Toolbar com filtros e botão -->
      <q-toolbar class="bg-grey-2">
        <q-toolbar-title>
          <q-icon name="people_outline" class="q-mr-sm" />
          Clientes
        </q-toolbar-title>

        <q-space />

        <!-- Botão adicionar -->
        <q-btn
          color="primary"
          icon="person_add"
          label="Novo"
          @click="addConsumer"
          class="q-mr-sm"
          v-if="!$q.screen.lt.sm && auth.hasCreateCustomer"
        />
        <q-btn
          color="primary"
          icon="person_add"
          round
          dense
          @click="addConsumer"
          v-else
        >
          <q-tooltip anchor="top middle">Adicionar</q-tooltip>
        </q-btn>
      </q-toolbar>

      <!-- Filtros -->
      <div class="q-gutter-sm row q-col-gutter-md q-mt-sm items-center">
        <q-input
          dense
          filled
          v-model="filters.search"
          label="Pesquisar..."
          class="col-12 col-md-3"
        >
          <template #append><q-icon name="search" /></template>
        </q-input>
      </div>

      <!-- Tabela Desktop -->
      <q-table
        v-if="!$q.screen.lt.md"
        class="q-mt-md"
        flat
        bordered
        :rows="filteredConsumers"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[5, 10, 20]"
        wrap-cells
      >
        <template #body-cell-actions="props">
          <q-td align="center">
            <q-btn
              dense
              round
              flat
              icon="edit"
              color="primary"
              @click="editConsumer(props.row)"
              v-if="auth.hasEditCustomer"
            />
            <q-btn
              dense
              round
              flat
              icon="delete"
              color="negative"
              @click="deleteConsumer(props.row.id)"
              v-if="auth.hasDeleteCustomer"
            />
          </q-td>
        </template>
      </q-table>

      <!-- Cards Mobile -->
      <div v-else class="q-mt-md">
        <q-card
          v-for="customer in filteredConsumers"
          :key="customer.id"
          class="q-mb-sm"
        >
          <q-card-section>
            <div class="text-h6">{{ customer.name }}</div>
            <div class="text-subtitle2 text-grey">
              Tipo: {{ consumer.type }}
            </div>
            <div class="text-caption">
              Status: {{ customer.status }} | Região: {{ customer.region }}
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn
              flat
              icon="edit"
              color="primary"
              @click="editConsumer(customer)"
            />
            <q-btn
              flat
              icon="delete"
              color="negative"
              @click="deleteConsumer(customer.id)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import columns from "../components/CustomerColumns";
import { useCustomerStore } from "../stores";
import { useAuthStore } from "src/pages/auth/store";


const $q = useQuasar();

// Inicialização dos objetos do Vue Router
const auth = useAuthStore()
const router = useRouter();

/* Inicialização das stores */
const customerStore = useCustomerStore();

// Dados de exemplo
const customers = ref([]);

// Filtros múltiplos
const filters = ref({
  search: "",
  type: "",
  status: "",
  region: "",
});

/* Filtro combinado */
const filteredConsumers = computed(() => {
  return customers.value.filter((c) => {
    const matchesSearch =
      filters.value.search === "" ||
      c.fullName.toLowerCase().includes(filters.value.search.toLowerCase());

    return matchesSearch;
  });
});

function addConsumer() {
  router.push("/customers/new");
}

function editConsumer(consumer) {
  router.push(`/customers/${consumer.id}/edit`);
}

function deleteConsumer(id) {
  $q.dialog({
    title: "Confirmar",
    message: "Deseja remover este consumidor?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    customerStore.remove(id)
    customers.value = customers.value.filter((c) => c.id !== id);
  });
}

async function fetchData() {
  try {
    await customerStore.find();
    customers.value = customerStore.customers;
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await fetchData();
});
</script>
