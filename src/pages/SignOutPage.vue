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
              <div class="text-h6">Sign Out</div>
              <div class="text-subtitle2">Do you want to sign out?</div>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn-group unelevated class="full-width" size="lg">
                <q-btn
                  unelevated
                  color="light-green-7"
                  label="Yes"
                  class="full-width"
                  size="lg"
                  @click="onSignOut"
                />
                <q-btn
                  unelevated
                  color="light-green-7"
                  label="No"
                  to="/"
                  class="full-width"
                  size="lg"
                />
              </q-btn-group>
            </q-card-actions>
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

var onSignOut = () => {
  supabase.auth.signOut();
  router.push("/");
  quasar.notify({ message: "You Have Signed Out!" });
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
