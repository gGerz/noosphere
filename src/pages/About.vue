<template>
    <div>
        <router-link class="btn btn-outline-primary m-2 my-sm-0" data-toggle="modal" data-target=".create_cons_modal" to="">Создать консультацию</router-link>
        <create-cons />
        <router-link class="btn btn-outline-primary m-2 my-sm-0" data-toggle="modal" data-target=".req_cons_modal" to="">Создать заявку на консультацию</router-link>
        <req-cons />
        <router-link class="btn btn-outline-primary m-2 my-sm-0" data-toggle="modal" data-target=".card_cons_modal" to="">Карточка консультации</router-link>
        <card-cons />
        <router-link class="btn btn-outline-primary m-2 my-sm-0" data-toggle="modal" data-target=".card_req_modal" to="">Карточка Заявки</router-link>
        <card-req />
        <router-link class="btn btn-outline-primary m-2 my-sm-0" data-toggle="modal" data-target=".docking_window_modal" to="">Стыковочное окно</router-link>
        <docking-window />
        <router-link class="btn btn-outline-primary m-2 my-sm-0" data-toggle="modal" data-target=".feedback_pupil_modal" to="">Отзыв ученика</router-link>
        <feedback-pupil />
        <router-link class="btn btn-outline-primary m-2 my-sm-0" data-toggle="modal" data-target=".feedback_master_modal" to="">Отзыв мастера</router-link>
        <feedback-master />
        <router-link class="btn btn-outline-primary m-2 my-sm-0" data-toggle="modal" data-target=".archive_modal" to="">Окно архива</router-link>
        <archive-modal />
        <router-link class="btn btn-outline-primary m-2 my-sm-0" data-toggle="modal" data-target=".arbitration_modal" to="">Окно арбитража</router-link>
        <arbitration-modal />
    </div>
</template>
<script>
    import CreateCons from '../components/Modals/CreateCons.vue'
    import ReqCons from '../components/Modals/ReqCons.vue'
    import CardCons from '../components/Modals/CardCons.vue'
    import CardReq from '../components/Modals/CardReq.vue'
    import DockingWindow from '../components/Modals/DockingWindow.vue'
    import FeedbackPupil from '../components/Modals/FeedbackPupil.vue'
    import FeedbackMaster from '../components/Modals/FeedbackMaster.vue'
    import ArchiveModal from '../components/Modals/ArchiveModal.vue'
    import ArbitrationModal from '../components/Modals/ArbitrationModal.vue'

    export default {
        components: {
            CreateCons,
            ReqCons,
            CardCons,
            CardReq,
            DockingWindow,
            FeedbackPupil,
            FeedbackMaster,
            ArchiveModal,
            ArbitrationModal
        },
        data(){
            return{

            }
        }
    }
</script>
<style lang="scss">
</style>