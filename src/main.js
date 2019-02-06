import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routes'
import store from './store'


Vue.use(Vuex);
Vue.use(VueRouter);


new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
