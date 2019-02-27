import Vue from 'vue'
import Vuex from 'vuex'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const SAVEUSERINFO = 'SAVEUSERINFO'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loader: false,
    userName: '',
    userInfo: localStorage.getItem('userInfo'),
    authorisedStatus: !!localStorage.getItem('token')
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state, req) {
      state.authorisedStatus = true
      state.pending = false
    },
    [LOGOUT] (state) {
      state.authorisedStatus = false
    },
    [SAVEUSERINFO] (state) {
      state.userInfo = localStorage.getItem('userInfo')
    }
  },
  actions: {
    login ({ commit }, token) {
      commit(LOGIN)
      return new Promise(resolve => {
        localStorage.setItem('token', token)
        commit(LOGIN_SUCCESS)
        resolve()
      })
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      commit(LOGOUT)
    },
    saveUserId ({ commit }, id) {
      return new Promise( resolve => {
        localStorage.setItem('userInfo', id)
        commit(SAVEUSERINFO)
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.authorisedStatus
    }
  }
})
