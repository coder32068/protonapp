<template>
  <q-layout>
    <q-page
      class="bg-light-green window-height window-width row justify-center items-center"
    >
      <div class="column">
        <div class="row">
          <h5 class="text-h5 text-white q-my-md">Company & Co</h5>
        </div>
        <div class="row">
          <q-card square bordered class="q-pa-lg shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input
                  square
                  filled
                  clearable
                  v-model="email"
                  type="email"
                  label="Email"
                />
                <q-input
                  square
                  filled
                  clearable
                  v-model="password"
                  type="password"
                  label="Password"
                />
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn
                unelevated
                color="light-green-7"
                size="lg"
                class="full-width"
                label="Login"
                @click="onFormSubmit"
              />
            </q-card-actions>
            <q-card-section class="text-center q-pa-none">
              <p class="text-grey-6">
                Not registered?
                <router-link to="/auth/register">Create an Account</router-link>
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script setup>
import { useSupabase } from "vue-3-supabase";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import DarkLightToggle from "src/components/DarkLightToggle.vue";
var email = ref("");
var password = ref("");

var supabase = useSupabase();
var quasar = useQuasar();
var router = useRouter();

var onFormSubmit = () => {
  console.log("once");
  supabase.auth
    .signIn({
      email: email.value,
      password: password.value,
    })
    .then(({ error }) => {
      if (error) {
        quasar.notify({ type: "negative", message: error.message });
        return;
      }
      const user = supabase.auth.user();
      console.log("login", user);
      router.push("/");
      quasar.notify({ message: "Hello " + user.id });
    });
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
