<template>
  <div id="app">
    <div class="container">
      <Header />
      <Content />
    </div>
  </div>
</template>

<script>
import Header from './components/Layout/Header.vue'
import Content from './components/Layout/Content.vue'

export default {
  name: 'app',
  components: {
    Header,
    Content
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">

  @import url('https://fonts.googleapis.com/css?family=Roboto');

  $main_color: #0D84FB;
  $background-color: #f8f8f8;

  html{
    overflow: scroll; //добавление полосы прокрутки на всех страницах (чтобы меню не прыгало)
  }

  #app{
    background-color: $background-color;
    font-family: Roboto;
  }
</style>
