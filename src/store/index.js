import Vue from 'vue'
import Vuex from 'vuex'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const SAVEUSERINFO = 'SAVEUSERINFO'
const SAVEUSERID = 'SAVEUSERID'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loader: false,
    anotherUserId: '',
    newId: '',
    userComp: '',
    userName: '',
    now: {
      date: '',
      time: {
        h: '',
        m: '',
      }
    },
    userId: localStorage.getItem('userId'),
    userInfo: localStorage.getItem('userInfo'),
    authorisedStatus: !!localStorage.getItem('token'),
    // для прода
    urlApi: `http://api.noosfera.noosfera.student.smartworld.team:2280/v1/`,
    imageApi: `http://api.noosfera.noosfera.student.smartworld.team:2280/uploads/avatar/`,
    // для разработки
    // urlApi: `http://api.noosfera.local/v1/`,
    // imageApi: `http://api.noosfera.local/uploads/avatar/`,
    myAvaSrc: ''
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
    },
    [SAVEUSERID] (state) {
      state.userId = localStorage.getItem('userId')
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
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userId')
      commit(LOGOUT)
    },
    saveUserProfileId ({ commit }, id) {
      return new Promise( resolve => {
        localStorage.setItem('userInfo', id)
        commit(SAVEUSERINFO)
        resolve()
      })
    },
    saveUserId ({ commit }, id) {
      return new Promise( resolve => {
        localStorage.setItem('userId', id)
        commit(SAVEUSERID)
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
