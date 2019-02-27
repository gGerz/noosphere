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
                                    <video id="video1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="justify-content-center d-flex">
                            <div>
                                <p class="h4">Ваш собеседник</p>
                                <div class="video">
                                    <video id="video2" />
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

    import VueWebcam from 'vue-web-cam'
    import WebRTC from 'vue-webrtc'

    export default {
        components: {
            VueWebcam,
            WebRTC,
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
