<template>
  <v-app id="mvp">
    <v-app-bar
      app
      class="transparent pa-0 ma-0"
      flat
    >
      <v-row class="bb--separator">
        <v-col class="pl-0">
          <v-app-bar-nav-icon @click="drawer = !drawer">
            <img
              src="./assets/nav/navIcon.svg"
              alt="B logo"
            />
          </v-app-bar-nav-icon>
        </v-col>
        <v-col class="d-flex justify-end align-center">
          <v-btn
            tile
            color="#F6CA65"
            height="43"
            width="43"
            min-width="43"
            elevation="0"
            class="rounded mr-3"
          >
            <span class="white--text text-uppercase font-weight-bold txt--bold--xl">JD</span>
          </v-btn>
          <span class="txt--bold">John Doe</span>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      :mini-variant.sync="mini"
      width="200"
      mini-variant-width="95"
      absolute
    >
      <v-list
        dense
        class="pt-0"
      >
        <div
          class="d-flex align-center justify-center bb--separator"
          style="height:69px;"
        >
          <img
            src="./assets/logo/logo.svg"
            alt="B logo"
          />
        </div>
        <v-list-item
          class="mt-5 mb-0"
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <!-- <v-icon>{{ item.icon }}</v-icon> -->
           <img :src="require(`@/assets/nav/${item.icon}.svg`)"/>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="text-transform: capitalize;">{{ item.icon }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Main-->
    <v-main>
      <!-- The router view -->
      <router-view></router-view>
    </v-main>
    <!-- Footer -->
    <v-footer absolute color="#fff">
      <v-col
        class="text-left txt--bold ml-16"
        cols="12"
      >
      Terms & Conditions | Privacy policy - {{ new Date().getFullYear() }} — <strong>MVP</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'Go to graphs', icon: 'graphs' },
      { title: 'Go to the Dashboard', icon: 'squares' },
      { title: 'Go to the screen', icon: 'screen' },
      { title: 'Go to reports', icon: 'reports' },
      { title: 'logout', icon: 'logout' }
    ],
    right: null,
    mini: true
  })
}
</script>
<!-- Main css entry point -->
<style lang="scss" src="./scss/app.scss"></style>
