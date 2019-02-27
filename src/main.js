import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routes'
import store from './store'

import WebRTC from 'vue-webrtc'
import WebCam from 'vue-web-cam'


Vue.use(WebRTC);
Vue.use(WebCam);
Vue.use(Vuex);
Vue.use(VueRouter);


new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
