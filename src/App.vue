<template>
  <v-app class="app">
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Vuetify Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-header-link`"
        text
        rounded
        :to="link.url"
      >{{ link.label }}</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="`${link.label}-footer-link`"
          color="white"
          text
          rounded
          class="my-2"
          :to="link.url"
        >{{ link.label }}</v-btn>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>Vuetify</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    links: [
      {
        label: "Home",
        url: "/"
      },
      {
        label: "Login",
        url: "/login"
      },
      {
        label: "Signup",
        url: "/signup"
      },
      {
        label: "Dashboard",
        url: "/dashboard"
      }
    ]
  })
};
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
}
</style>
