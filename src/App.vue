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
$main_color: #0D84FB;

</style>
