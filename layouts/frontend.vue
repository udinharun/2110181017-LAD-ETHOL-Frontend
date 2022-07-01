<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="white"
      class="app-bar-ethol"
    >
      <v-toolbar-title>
        <img class="ethol-image-logo" src="/ethol-logo.png" alt="" />
      </v-toolbar-title>
      <v-row id="ethol-navbar-right" style="width: 96%">
        <v-col cols="12" md="5"> </v-col>
        <v-col cols="12" md="6"> </v-col>
      </v-row>
      <v-spacer />
      <v-btn
        id="ethol-frontend-navigation-drawer"
        icon
        @click.stop="drawer = !drawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <br />
      <br />
      <br />
      <nuxt />
    </v-main>
    <v-footer :absolute="!fixed" app style="background-color: #141414">
      <v-row style="padding: 0px !important; margin: 0px !important">
        <v-col cols="12" md="6">
          <p style="color: white" class="ethol-footer-text">
            Made with ❤ in Surabaya
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <p style="float: right; color: white" class="ethol-footer-text">
            &copy; {{ new Date().getFullYear() }} ETHOL Dev Team. All Right
            Reserved
          </p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      fixed: false,
      right: false,
      drawer: false,
    }
  },
}
</script>
<style>
.app-bar-ethol {
  height: 100px !important;
}
.ethol-image-logo {
  width: min(50vw, 150px);
  margin: auto;
  display: block;
  margin-top: 34px;
}
.ethol-navbar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  margin-top: 32px;
  float: right;
}
.ethol-navbar li {
  float: left;
}
.ethol-navbar li a {
  display: block;
  color: #0b668b;
  text-align: center;
  padding: 14px 16px;
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
}
.ethol-navbar li a:hover:not(.active) {
  background-color: white;
}
.ethol-navbar li a.active {
  color: #168dbd;
  font-weight: bold;
}
#ethol-frontend-navigation-drawer {
  display: none;
}

@media all and (min-width: 1024px) and (max-width: 1280px) {
}

@media all and (min-width: 768px) and (max-width: 1024px) {
}

@media all and (min-width: 480px) and (max-width: 768px) {
  #ethol-navbar-right {
    display: none !important;
  }
  #ethol-frontend-navigation-drawer {
    display: block;
  }
}

@media all and (max-width: 480px) {
  #ethol-navbar-right {
    display: none !important;
  }
  .ethol-image-logo {
    width: min(50vw, 130px) !important;
    margin-top: 30px !important;
    margin-left: -10px !important;
  }
  #ethol-frontend-navigation-drawer {
    display: block;
    margin-top: 10px;
  }
  .ethol-footer-text {
    text-align: center;
    font-size: 14pt;
  }
}
</style>
