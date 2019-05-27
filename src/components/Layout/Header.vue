<template>
  <div class="menu">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="logo__body">
        <router-link to="/">
          <img src="../../assets/img/logo.png" class="logo-img" alt="">
        </router-link>
      </div>
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
<!--          <li class="nav-item">-->
<!--            <router-link class="nav-link nav-link-header" to="/about">О сервисе</router-link>-->
<!--          </li>-->
          <li class="nav-item">
            <router-link class="nav-link nav-link-header" to="/arbitrage" v-if="this.$store.state.userInfo === '11'">Арбитраж</router-link>
          </li>
          <li class="nav-item" v-if="$store.state.authorisedStatus">
            <div v-if="this.$store.state.userInfo === null" class="d-flex align-items-center" data-toggle="modal" data-target=".sign_up_next_modal">
              <img class="img_master2" src="../../assets/img/ava.jpg">
            </div>
            <router-link v-else class="nav-link nav-link-header" to="/cabinet">
              <div class="d-flex align-items-center ">
                <img v-if="$store.state.myAvaSrc" class="img_master2 mr-0" :src="$store.state.imageApi+$store.state.myAvaSrc">
                <img v-else class="img_master2 mr-0" src="../../assets/img/ava.jpg">
              </div>
            </router-link>
          </li>
        </ul>
        <router-link v-if="!$store.state.authorisedStatus" class="btn btn-outline-primary m-2 my-sm-0" data-toggle="modal" data-target=".sign_in_modal" to="">Войти</router-link>
        <auth />
        <router-link v-if="!$store.state.authorisedStatus" class="btn btn-outline-primary my-2 my-sm-0" data-toggle="modal" data-target=".sign_up_modal" to="">Регистрация</router-link>
        <reg @succesReg='onSuccesReg'/>
        <reg-next />
        <div class="reg_succ">
          <div class="reg_succ__body">
            Вы зарегистрировались!
          </div>
        </div>
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
      }
    },
    methods: {
      onSuccesReg() {
        document.querySelector('.reg_succ').classList.add('reg_succ__active');
        setTimeout(() => {
          document.querySelector('.reg_succ').classList.remove('reg_succ__active');
        }, 6000);
      },
      getUserAvatar(){
        axios({
          method: 'get',
          url: this.$store.state.urlApi + `profiles/` + this.$store.state.userInfo + '?expand=cpCom,pUser,image',
          headers: {'Authorization': `Bearer ${localStorage.token}`}
        })
            .then((response) => {
              if (response.data.image.length !== 0){
                this.$store.state.myAvaSrc = response.data.image[response.data.image.length - 1].i_image
              }
            })
            .catch((error) => {
              console.error(error)
            })
      }
    },
    mounted(){
      this.getUserAvatar()
    }
  }
</script>
<style lang="scss">

  .logo__body {
    display: flex;

  }
  @media (max-width: 576px) {
    .logo__body {
      width: 60%;
    }
    .logo-img {
      margin: 0 auto;
      width: 100%;
      height: 100%;
    }
  }
  .img_master2 {
    width: 53px; //63
    height: 53px!important; //63
    object-fit: cover;
    border-radius: 100%;
    margin-right: 17px;
  }
  .menu{
    padding-top: 25px;
  }
  .nav-link-header {
    padding-right: .8rem!important;
    padding-left: .8rem!important;
  }
  @media (max-width: 1200px) {
    .nav-link-header {
      padding-right: .4rem!important;
      padding-left: .4rem!important;
    }
  }
  .navbar-nav{
    display: flex;
    align-items: center;
  }

  .reg_succ {
    position: fixed;
    bottom: 50px;
    right: 120px;
    background: white;
    border: 1px solid #28a745;
    border-radius: 10px;
    z-index: 1115;
    opacity: 0;
    transition: 2s;
    display: flex;
    align-items: center;
    color: #28a745;
    font-size: 22px;
  }
  .reg_succ__active {
    opacity: 1;

  }
  .reg_succ__body{
    padding: 14px 28px;
  }
</style>
