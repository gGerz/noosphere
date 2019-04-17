<template>
  <div id="app">
    <div class="container">
      <Header />
      <Content />
      <loader v-if="this.$store.state.loader" />
    </div>
    <Notification />
  </div>
</template>

<script>

import axios from 'axios'
import Header from './components/Layout/Header.vue'
import Content from './components/Layout/Content.vue'
import Loader from './components/Layout/Loader.vue'
import Notification from './components/Layout/Notification'

export default {
  name: 'app',
  components: {
    Header,
    Content,
    Loader,
    Notification
  },
  mounted() {
    if (localStorage.currentConsultation !== undefined) this.$router.push('/videoroom')
    this.createNow()
    setInterval(this.createNow, 1000)
  },
  methods: {
    createNow() {
      var date = new Date();
      var dd = date.getDate() + '';
      if (dd < 10) dd = '0' + dd;
      var mm = date.getMonth() + 1 + '';
      if (mm < 10) mm = '0' + mm;
      var yy = date.getFullYear() + '';
      if (yy < 10) yy = '0' + yy;
      var timeh = date.getHours() + ''
      if (timeh < 10) timeh = '0' + timeh;
      var timem = date.getMinutes() + ''
      if (timem < 10) timem = '0' + timem;
      var times = date.getSeconds() + ''
      if (times < 10) times = '0' + times;
      this.$store.state.now = {
        date: yy + '-' + mm +'-' + + dd,
        d: dd,
        m: mm,
        y: yy,
        time: {
          h: timeh,
          m: timem,
          s: times
        }
      }
    },
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
</style>
