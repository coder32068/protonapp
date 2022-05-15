<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>
        <q-btn
          aria-label="account menu"
          label="Account Settings"
          icon="face_retouching_natural"
          color="secondary"
        >
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-toggle v-model="mobileData" label="Use Mobile Data" />
                <DarkLightToggle />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px" v-if="!isOffline">
                  <img
                    :src="
                      `https://robohash.org/` +
                      encodeURIComponent(avatar) +
                      `.png?set=set4`
                    "
                  />
                </q-avatar>
                <q-avatar
                  size="72px"
                  color="red"
                  text-color="white"
                  icon="face"
                  v-if="isOffline"
                />
                <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                <q-btn
                  color="primary"
                  :disable="isOffline"
                  :label="supabase.auth.user() ? `Logout` : `Login`"
                  push
                  size="sm"
                  :to="supabase.auth.user() ? `/auth/logout` : `/auth/login`"
                  v-close-popup
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import useIsOffline from "src/useIsOffline";
import DarkLightToggle from "src/components/DarkLightToggle.vue";
import { useQuasar } from "quasar";
import { useSupabase } from "vue-3-supabase";
import SparkMD5 from "spark-md5/spark-md5";

function getState() {
  if (localStorage.getItem("dark") == null) {
    localStorage.setItem("dark", JSON.stringify(false));
    return JSON.parse(localStorage.getItem("dark"));
  } else {
    return JSON.parse(localStorage.getItem("dark"));
  }
}

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    DarkLightToggle,
  },

  setup() {
    window.SparkMD5 = SparkMD5;
    const quasar = useQuasar();
    const supabase = useSupabase();
    quasar.dark.set(getState());
    const leftDrawerOpen = ref(false);
    const isOffline = useIsOffline();
    const mobileData = ref(false);
    return {
      essentialLinks: linksList,
      avatar: SparkMD5.hash(
        supabase.auth.user()?.email
          ? supabase.auth.user()?.email
          : "anonymus@an-11-22-33.11.22"
      ),
      leftDrawerOpen,
      isOffline,
      mobileData,
      supabase,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
