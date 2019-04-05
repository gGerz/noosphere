<template>
  <div id="app">
    <div class="container">
      <Header />
      <Content />
      <loader v-if="this.$store.state.loader" />
    </div>
    <div class="notifications">
      <div v-for="(note, i) in notifications">
        <span @click="cancelCall(i)">X</span>
        <div class="px-3">{{note.nPurchaseUser.p_name}} купил вашу консультацию "{{note.nCon.con_title}}"</div>
        <div class="d-flex justify-content-around">
          <button class="btn btn-outline-success" @click="acceptCall(i)">Ответить</button>
          <button class="btn btn-outline-danger" @click="cancelCall(i)">Отменить</button>
        </div>
      </div>
      </div>
  </div>
</template>

<script>

import axios from 'axios'
import Header from './components/Layout/Header.vue'
import Content from './components/Layout/Content.vue'
import Loader from './components/Layout/Loader.vue'

export default {
  name: 'app',
  components: {
    Header,
    Content,
    Loader
  },
  data () {
    return {
      notifications: []
    }
  },
  methods: {
    getNotifications(){
      axios({
        method: 'get',
        url: `http://192.168.1.150/noosfera/public_html/api/v1/notifications?NotificationSearch[n_selling_user_id]=`+this.$store.state.userId,
      })
          .then((response) => {
            console.log(response)
            this.notifications = response.data
          })
          .catch((error) => {
          })
    },
    acceptCall(){
      myWin= open('https://appear.in/noospherevideochat');
    },
    cancelCall(i){

    }
  },
  mounted(){
    this.getNotifications()
    setInterval(this.getNotifications, 5000)
  }
}
</script>

<style lang="scss">

  @import url('https://fonts.googleapis.com/css?family=Roboto');

  $main_color: #0D84FB; //синиий
  $main_grey: #A6A6A6; //серый
  $danger: #FF3F3F; //красный
  $success: #43C768; //зеленый
  $secondary_grey: #373737;
  $font_card-price: 34px;
  $font_xxl: 28px;
  $font_card-header: 22px;
  $font_xl: 20px;
  $font_l: 18px;
  $font_m: 16px;
  $font_s: 14px;
  $background-color: #f8f8f8;

  html{ overflow-y: scroll; overflow-x: auto; }

  body{
    padding-right: 0 !important;
  }
  body{
    background-color: $background-color;
  }
  #app{
    font-family: Roboto;
    min-height: 1080px;
  }
  i{
    cursor: pointer;
  }
  .notifications{
    margin-top: 10px;
    margin-right: 10px;
    position: fixed;
    top: 0;
    right: 0;

    >div{
      width: 250px;
      height: 150px;
      margin-bottom: 10px;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);

      span{
        cursor: pointer;
        position: absolute;
        margin-top: -23%;
        margin-left: 94%;
        margin-right: 5px;
      }
    }
  }
</style>
