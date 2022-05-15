<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useSupabase } from "vue-3-supabase";

export default defineComponent({
  name: "IndexPage",
  setup() {
    window.supabase = useSupabase();
  },
});
</script>
