<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-sm">
      <!-- Toolbar com filtro -->
      <q-toolbar class="bg-grey-2">
        <q-toolbar-title>
          <q-icon name="groups" class="q-mr-sm" />
          Funcionários
        </q-toolbar-title>

        <q-space />

        <!-- Botão Adicionar -->
        <div class="q-gutter-sm row items-center">
          <q-btn
            color="primary"
            icon="person_add"
            label="Novo"
            @click="addEmployee"
            v-if="!$q.screen.lt.sm"
          />
          <!-- Ícone apenas no mobile -->
          <q-btn
            color="primary"
            round
            dense
            icon="person_add"
            @click="addEmployee"
            v-else
          >
            <q-tooltip anchor="top middle" self="bottom middle"
              >Adicionar</q-tooltip
            >
          </q-btn>

          <!-- Campo de Pesquisa -->
          <q-input
            dense
            debounce="300"
            v-model="search"
            placeholder="Pesquisar..."
            clearable
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </q-toolbar>

      <!-- Desktop: tabela -->
      <div v-if="!$q.screen.lt.md" class="q-mt-sm">
        <q-table
          flat
          :rows="filteredEmployees"
          :columns="columns"
          row-key="id"
          :rows-per-page-options="[5, 10, 20]"
          wrap-cells
          :pagination="{ rowsPerPage: 5 }"
        >
          <template #body-cell-actions="props">
            <q-td align="center">
              <q-btn
                dense
                flat=""
                round
                color="primary"
                icon="edit"
                size="sm"
                @click="editEmployee(props.row)"
              />
              <q-btn
                dense
                flat=""
                round
                color="negative"
                icon="delete"
                size="sm"
                class="q-ml-xs"
                @click="deleteEmployee(props.row.id)"
              />
              <q-btn
                dense
                round
                flat=""
                icon="edit_location"
                size="sm"
                @click="assignedZones(props.row)"
              />
              <q-btn
                flat
                dense
                round
                icon="manage_accounts"
                @click="addUser(props.row)"
                color="primary"
                title="Configurar Acesso"
              />
            </q-td>
          </template>
        </q-table>
      </div>

      <!-- Mobile: cards -->
      <div v-else class="q-mt-sm">
        <q-card v-for="emp in filteredEmployees" :key="emp.id" class="q-mb-sm">
          <q-card-section>
            <div class="text-h6">{{ emp.fullName }}</div>
            <div class="text-subtitle2 text-grey">
              Cargo: {{ emp.dateBirth }}
            </div>
            <div class="text-caption text-grey">Email: {{ emp.gender }}</div>
          </q-card-section>

          <q-separator />
          <q-card-actions align="right">
            <q-btn
              flat
              icon="edit"
              color="primary"
              @click="editEmployee(emp)"
            />
            <q-btn
              flat
              icon="delete"
              color="negative"
              @click="deleteEmployee(emp.id)"
            />
            <q-btn
              flat
              icon="edit_location"
              color="primary"
              @click="editEmployee(emp)"
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
import { useAuthStore } from "src/pages/auth/store";
import { useEmployeeStore } from "../stores";
import { useUserStore } from "src/pages/user/stores";
import columns from "../components/ColumnsEmployees";
import useNotify from "app/composables/UseNotify";

// Inicialização dos objetos do Vue Router
const router = useRouter();

/* Inicialização das stores */
const auth = useAuthStore()
const employeeStores = useEmployeeStore();
const userStores = useUserStore()
const { notifySuccess, notifyError } = useNotify();

/* Inicialização das variaveis  */
const search = ref("");
const employees = ref([]);

/* Funcao e filtro da tabela funcionario */
const filteredEmployees = computed(() => {
  if (!search.value) return employees.value;
  return employees.value.filter(
    (emp) =>
      emp.fullName.toLowerCase().includes(search.value.toLowerCase()) ||
      emp.dateBirth.toLowerCase().includes(search.value.toLowerCase()) ||
      emp.gender.toLowerCase().includes(search.value.toLowerCase())
  );
});

/* Funcao para navegacaoa a pagina de edicao do funcionario */
function editEmployee(emp) {
  router.push({ name: "employee-edit", params: { id: emp.id } });
}

/* Funcoa para deletar funcionario */
async function deleteEmployee(id) {
  try {
    await employeeStores.remove(id)
    employees.value = employees.value.filter((emp) => emp.id !== id);
    notifySuccess("Usuario deletado com sucesso")
  } catch (error) {
    console.log(error)
  }
}

/* Funcao para navegacaoa a pagina de adicao do funcionario */
function addEmployee() {
  router.push({ name: "employee-new" });
}

/* Funcao para navegacaoa a pagina de adicao do funcionario */
function assignedZones(e) {
  router.push({ name: "employee-assign-zones", params: { id: e.id } });
}

async function addUser (employee) {
  if (employee.userId) {
     router.push({
      name: "manage-account",
      params: { userId: employee.userId },
    });
  } else {
   await userStores.create({
        displayName: employee.fullName,
        username: 'N/A',
        password: '123456',
        phone: 'N/A',
        delegationId: employee?.delegationId
   })
   await employeeStores.update(employee.id, {userId: userStores.user.id, updatedBy: auth.user.sub})
    router.push({
      name: "manage-account",
      params: { userId: userStores.user.id },
    });
  }
};

/* Logica de inicializacao da pagina (Carrega os funcionarios) */
onMounted(async () => {
  await employeeStores.find();
  employees.value = employeeStores.employees;
});
</script>
