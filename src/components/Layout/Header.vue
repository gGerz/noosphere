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
          <li class="nav-item">
            <router-link class="nav-link nav-link-header" to="/cabinet">[Личный кабинет]</router-link>
          </li>
        </ul>

        <router-link class="btn btn-outline-primary m-2 my-sm-0" data-toggle="modal" data-target=".sign_in_modal" to="">Войти</router-link>
        <auth />
        <router-link class="btn btn-outline-primary my-2 my-sm-0" data-toggle="modal" data-target=".sign_up_modal" to="">Регистрация</router-link>
        <reg />
      </div>
    </nav>
  </div>
</template>
<script>
  import Auth from '../Modals/Auth.vue'
  import Reg from '../Modals/Reg.vue'
  export default {
    components: {
      Auth,
      Reg
    },
    data(){
      return{

      }
    }
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
