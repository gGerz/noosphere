<template>
  <div class="menu">
    <nav class="navbar navbar-expand-lg navbar-light">
      <a class="navbar-brand" href="#">
        <img src="../../assets/img/logo.png" width="230" class="d-inline-block align-top" alt="">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link nav-link-header" to="/">Доска консультаций</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-header" to="/ticketboard">Доска заявок</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-header" to="/about">О сервисе</router-link>
          </li>
          <li class="nav-item" v-if="this.$store.state.authorisedStatus">
            <router-link class="nav-link nav-link-header" to="/cabinet">
              личный кабинет
            </router-link>
          </li>
        </ul>
        <router-link v-if="!this.$store.state.authorisedStatus" class="btn btn-outline-primary m-2 my-sm-0" data-toggle="modal" data-target=".sign_in_modal" to="">Войти</router-link>
        <auth />
        <router-link v-if="!this.$store.state.authorisedStatus" class="btn btn-outline-primary my-2 my-sm-0" data-toggle="modal" data-target=".sign_up_modal" to="">Регистрация</router-link>
        <reg />
        <reg-next />
        <button v-if="this.$store.state.authorisedStatus" class="btn btn-danger" @click="logout">Выйти</button>
      </div>
    </nav>
  </div>
</template>
<script>
  import Auth from '../Modals/Auth.vue'
  import Reg from '../Modals/Reg.vue'
  import RegNext from '../Modals/RegNext.vue'
  import axios from 'axios'

  export default {
    components: {
      Auth,
      Reg,
      RegNext
    },
    data(){
      return{
        test1: ''
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout', {}).then(() => {
          this.$router.push('/')
        })
      }
    },
  }
</script>
<style lang="scss">
  .menu{
    padding-top: 25px;
  }
  .nav-link-header {
    padding-right: .9rem!important;
    padding-left: .9rem!important;
  }
</style>
