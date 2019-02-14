<template>
  <div class="loader">
    <img src="../../assets/img/load.png" width="230" class="d-inline-block align-top rot" alt="">
  </div>
</template>
<script>

</script>
<style lang="scss">
  .loader{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20%;
  }
  img.rot {
    animation: 1s linear 0s normal none infinite running rot;
    -webkit-animation: 1s linear 0s normal none infinite running rot;
    width: 100px;
  }
  @keyframes rot {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes rot {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
