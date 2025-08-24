<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
               Tela de login
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
              @submit.prevent="handleLogin"
            >
              <q-input
                outlined
                 v-model="form.username"
                label="Username"
                lazy-rules
                dense
              />

              <q-input
                type="password"
                outlined
                 v-model="form.password"
                label="Password"
                lazy-rules
                dense
              />

              <div>
               <q-btn label="Login" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '/src/pages/auth/store'
import useNotify from '../../../../composables/UseNotify'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()
const { notifyError, notifySuccess } = useNotify()

const form = ref({
  username: '',
  password:''
})

const handleLogin = async () => {
  try {
    await auth.Actionlogin(form.value)

    notifySuccess('Login efectuado com sucesso')
    router.push({ name: 'home' })
  } catch (error) {
    notifyError(error.response?.data?.message || "Sem reposta do servidor")
  }
}

</script>

<style>

.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
