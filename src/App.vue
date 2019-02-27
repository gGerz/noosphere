<template>
  <div id="app">
    <div class="container">
      <Header />
      <loader v-if="this.$store.state.loader" />
      <Content />
    </div>
  </div>
</template>

<script>
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

    }
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
</style>
