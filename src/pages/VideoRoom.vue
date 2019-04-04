<template>
    <div class="container ">
        <p class="h2 py-4 text-center">Кабинет консультации</p>
        <div class="card shadow">
            <div class="card-body">
                <div class="py-4">
                    <div class="d-flex justify-content-center pt-2">
                        <div class="mx-1 btn btn-primary" @click="openLink"><i class="fas fa-arrow-right pr-2"></i>открыть видео-чат</div>
                        <div class="mx-1 btn btn-success" @click="endVideo">Завершить консультацию</div>
                    </div>
                    <feedback-pupil/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import FeedbackPupil from '../components/Modals/FeedbackPupil.vue'
  export default {
    components: {
      FeedbackPupil
    },
    data() {
      return {
        id: '',
        linkToRoom: 'https://appear.in/noospherevideochat',
        copyDone: false,
        roomWindow: '',
      }
    },
    methods: {
      endVideo() { //при завершении звонка
        if (this.roomWindow) this.roomWindow.close()
        $('.feedback_pupil_modal').modal('show')
      },
      openLink() {
        if (this.roomWindow) this.roomWindow.close() // если окно уже открыто то оно закрывается
        this.roomWindow = window.open(this.linkToRoom); //открыть ссылку
      }
    },
  }
</script>
<style lang="scss" scoped>
    .copyDone {
        height: 25px;
        font-size: 14px;
        color: #6c6c6c;
    }
    .link-to-room__body {
        display: flex;
        background: #e4e4e4;
        border-radius: 4px;
        padding: 3px 10px;
        transition: .5s;
    }
    .link-to-room__self {
        color: #555555;
    }
    .link-to-room__body:hover {
        background: #c9c9c9;
    }
    .link-to-room__body:active {
        background: #f5f5f5;
    }
    .video {
        background: aquamarine;
        border: darkblue 1px solid;
        width: 446px;
        height: 286px;
    }
</style>