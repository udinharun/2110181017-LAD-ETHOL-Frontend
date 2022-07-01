import Vue from 'vue'
import VueNativeWebSocket from 'vue-native-websocket'
// Chat private
export default ({ store }, inject) => {
  Vue.use(VueNativeWebSocket, process.env.SOCKET_URL, {
    store,
    format: 'json',
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
  })
}
