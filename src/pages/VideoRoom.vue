<template>
    <div class="container ">
        <p class="h2 py-4 text-center">Видео кабинет</p>
        <div class="card shadow">
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-lg-6">
                        <div class="justify-content-center d-flex">
                            <div>
                                <p class="h4">Вы</p>
                                <div class="video">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="justify-content-center d-flex">
                            <div>
                                <p class="h4">Ваш собеседник</p>
                                <div class="video">
                                    [Видео]
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center py-3">
                    <div class="btn btn-primary">Завершить звонок</div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

    import $ from 'jquery'

  export default {
    mounted() {
      let style = document.createElement('style')
      style.setAttribute('src', '../mgVideoChat/mgVideoChat-1.13.2.css')
      document.head.appendChild(style)


      let mgVideoChat = document.createElement('script')
      mgVideoChat.setAttribute('src', '../mgVideoChat/mgVideoChat-1.13.2-min.js')
      document.head.appendChild(mgVideoChat)

      let commonScript = document.createElement('script')
      commonScript.setAttribute('src', '../common/js/menu.js')
      document.head.appendChild(commonScript)


      $(document).ready(function(){
        $('#mgVideoChat').mgVideoChat({
          wsURL: 'ws://www.magnoliyan.com:8080?room=1'
        });
      });
    }
  }
</script>
<style lang="scss" scoped>

    .video {
        background: aquamarine;
        border: darkblue 1px solid;
        width: 446px;
        height: 286px;
    }

</style>
