<template>
    <div>
        <router-link class="btn btn-outline-primary m-2 my-sm-0" data-toggle="modal" data-target=".create_cons_modal" to="">Создать консультацию</router-link>
        <create-cons />
        <router-link class="btn btn-outline-primary m-2 my-sm-0" data-toggle="modal" data-target=".req_cons_modal" to="">Создать заявку на консультацию</router-link>
        <req-cons />

    </div>

</template>
<script>
    import CreateCons from '../components/Modals/CreateCons.vue'
    import ReqCons from '../components/Modals/ReqCons.vue'

    export default {
        components: {
            CreateCons,
            ReqCons
        },
        data(){
            return{

            }
        }
    }
</script>
<style lang="scss">
</style>