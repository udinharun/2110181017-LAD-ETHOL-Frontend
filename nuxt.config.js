import colors from 'vuetify/es5/util/colors'
const development = process.env.NODE_ENV !== 'production'

export default {
  server: {
    port: 2000,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ETHOL',
    title: 'Enterprise Technology Hybrid Online Learning',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }],
  },

  loading: {
    color: 'white',
    height: '3px',
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    { src: '~/plugins/vue-carousel.js', ssr: false },
    { src: '~/plugins/persistedState.js', ssr: false },
    { src: '~/plugins/vue-video.js', ssr: false },
    { src: '~/plugins/socket.js', ssr: false },
    { src: '~/plugins/TiptapVuetify', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: development
      ? 'http://localhost:2020'
      : 'https://ethol.pens.ac.id/api',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          secondary: '#424242',
          error: '#FF5252',
          success: '#4CAF50',
          warning: '#FFC107',
          primary: '#0B668B',
          accent: '#369fc9',
          info: colors.teal.lighten1,
          indigo: '#5400B8',
          save: '#4CAF50',
          danger: '#EF5350',
          warn: '#F57F17',
          passed: '#78909C',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty',
      }
    },
    transpile: ['vuetify/lib', 'tiptap-vuetify'],
  },
  env: {
    BRAND_SINGKATAN: 'ETHOL',
    BRAND_KEPANJANGAN: 'Enterprise Technology Hybrid Online Learning',
    PEMILIK: 'Politeknik Elektronika Negeri Surabaya',
    SOCKET_URL: 'wss://chat.ethol.pens.ac.id/socket',
  },
}
