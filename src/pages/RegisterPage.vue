<template>
  <q-layout>
    <q-page
      class="bg-light-green window-height window-width row justify-center items-center"
    >
      <div class="column">
        <div class="row">
          <div class="q-pa-md">
            <h5 class="text-h5 text-white q-my-md">Company & Co</h5>
          </div>
        </div>
        <div class="row">
          <div class="q-pa-md">
            <q-stepper
              :contracted="$q.screen.lt.md"
              v-model="step"
              ref="stepper"
              alternative-labels
              color="primary"
              animated
              style="max-width: 832px"
            >
              <q-step
                :name="1"
                title="Set Base Credentials"
                icon="face"
                :done="step > 1"
              >
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
              </q-step>

              <q-step :name="2" title="Create an ad" icon="add_comment">
                Try out different ad text to see what brings in the most
                customers, and learn how to enhance your ads using features like
                ad extensions. If you run into any problems with your ads, find
                out how to tell if they're running and how to resolve approval
                issues.
              </q-step>

              <template v-slot:navigation>
                <q-stepper-navigation>
                  <q-btn
                    @click="$refs.stepper.next()"
                    color="primary"
                    :label="step === 3 ? 'Finish' : 'Continue'"
                  />
                  <q-btn
                    v-if="step > 1"
                    flat
                    color="primary"
                    @click="$refs.stepper.previous()"
                    label="Back"
                    class="q-ml-sm"
                  />
                </q-stepper-navigation>
              </template>
            </q-stepper>
          </div>
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
var step = ref(1);

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
