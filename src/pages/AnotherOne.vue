<template>
    <div class="card">
        <div class="card-body">
            <div class="d-lg-flex d-md-flex d-block align-items-center">
                <div class="d-flex align-items-center ">
                    <img class="ava_cabinet" src="../assets/img/ava.jpg">
                    <div class="text-dark h3 m-0">{{anotherUserInfo.p_name}}</div>
                </div>
            </div>

            <div class="row user_info">
                <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block mx-auto">
                    <div>Описание</div>
                    <div>{{anotherUserInfo.p_description}}</div>
                </div>
                <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block mx-auto">
                    <div>Пол</div>
                    <div v-if="anotherUserInfo.p_gender">Мужской</div>
                    <div v-else>Женский</div>
                </div>
                <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block mx-auto">
                    <div>Дата рождения</div>
                    <div>{{anotherUserInfo.p_date}}</div>
                </div>
                <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block mx-auto">

                </div>
                <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block mx-auto mx-sm-0">

                </div>
            </div>
            <div class="spec col-10 col-xs-12 col-sm-10 col-md-10 col-lg-4 px-0 py-4">
                <div class="text-grey font_s">Компетенции</div>
                <div class="d-flex justify-content-between mt-1 mr-4" v-for="competence in anotherUserInfo.cpCom">
                    <div>{{competence.competence}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            anotherUserInfo: [],
        }
    },
    mounted () {
        this.anotherUserId = this.$store.state.anotherUserId
        axios({
            method: 'get',
            url: `http://192.168.1.150/noosfera/public_html/api/v1/profiles/` + this.$store.state.anotherUserId + `?expand=cpCom`
        })
            .then((response) => {
                console.log(response)
                this.anotherUserInfo = response.data
                console.log(this.anotherUserInfo)

            })
            .catch((error) => {
                console.error(error)
            })
    }
}
</script>
<style lang="scss">

    $main_color: #0D84FB; //синиий
    $main_grey: #A6A6A6; //серый
    $danger: #FF3F3F; //красный
    $success: #43C768; //зеленый
    $white: #FFFFFF; // Белый
    $secondary_grey: #373737;
    $font_card-price: 30px; //34
    $font_xxl: 28px;
    $font_card-header: 22px;
    $font_xl: 20px;
    $font_l: 18px;
    $font_m: 16px;
    $font_s: 14px;

    .main_color {color: $main_color;}
    .font_xl {font-size: $font_xl;}
    .font_l {font-size: $font_l;}
    .font_m {font-size: $font_m;}
    .font_s {font-size: $font_s;}
    .text-grey {
        color: $main_grey;
    }
    body {
        color: $secondary_grey;
    }

    .text-danger {
        color: $danger!important;
    }

    a .text-success:hover {
        color: darken($danger, 10%)!important;
    }

    .text-success {
        color: $success!important;
    }

    a .text-success:hover {
        color: darken($success, 10%)!important;
    }

    .font_s {
        font-size: $font_s;
    }

    .font_l {
        font-size: $font_l;
    }

    .nav-link-cabinet {
        color: $main_grey!important;
        padding-right: 25px !important;
        padding-left: 25px !important;

        i {
            padding-right: 10px;
        }
    }

    .nav-link-cabinet.active {
        color: $main_color!important;
        background-color: #fff;
        border-color: #dee2e6 #dee2e6 #fff;
    }

    .user_info {
        padding-top: 38px;
        padding-bottom: 50px;
        div {

            div:first-child{
                font-size: $font_s;
                padding-bottom: 4px;
                color: $main_grey;
                padding-right: 15px ;
            }
            div:nth-child(2){
                padding-bottom: 13px;
            }
        }
    }

    .about_user {
        max-width: 650px;
        font-size: 16px;
        border-radius: 15px;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
    }

    .spec {
        width: 280px;
        font-size: $font_m;
        padding-bottom: 50px;
    }

    .fa-times:before {//иконка крест
        color: #FF3F3F;
        font-size: 15px;
    }

    .fa-plus-square:before {//иконка создания консультации
        position: relative;
        top: 4px;
        color: $main_color;
        font-size: 23px;
    }
    .dashed { //пунктирное подчеркивание
        cursor: pointer;
        font-size: $font_s;
        text-decoration: none;
        border-bottom: 1px dashed $main_grey;

        &:hover{
            text-decoration: none;
            color: darken($main_grey,20%);
        }
    }
    .dashed2 { //пунктирное подчеркивание
        cursor: pointer;
        color: $main_color;
        font-size: $font_m;
        text-decoration: none;
        border-bottom: 1px dashed $main_color;
        &:hover{
            text-decoration: none;
            color: darken($main_color,20%);
        }
    }
    .card-body-main {
        flex: 1 1 auto;
        padding: 1.25rem;
    }
    @media (min-width: 768px) {
        .card-body-main {
            padding: 2.5rem;
        }
    }
    .cab_card { //тело вкладки
        display: -ms-flexbox;
        display: flex;
        min-height: 500px;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0,0,0,.125);
        border-top: 0;
        border-radius: .25rem;
        border-top-left-radius: 0rem!important;
        border-top-right-radius: 0rem!important;
    }

    .ava_cabinet {
        height: 100px;
        width: 100px!important;
        object-fit: cover;
        border-radius: 100%;
        margin-right: 17px;
    }

    .req-table {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        padding-bottom: .55rem;
    }
    .card-req {
        box-shadow: 0px 1px 4px rgba(13, 132, 251, 0.2);
    }

    /*Настройка vue-select*/
    .clear, .dropdown-toggle::after{
        display: none;
    }
    .dropdown-menu li{
        background-color: $white;

        :active, :focus, :hover, :target, :visited{
            color: $main_color!important;
            background-color: $white!important;
        }
    }

    /*Настройка скроллбара для селектов*/

    .dropdown-menu{
        overflow-y: scroll!important;
        max-height: 200px!important;
    }

    .dropdown-menu::-webkit-scrollbar-track {
        -webkit-box-shadow: none;
        background-color: $white;

    }

    .dropdown-menu::-webkit-scrollbar {
        width: 4px;
        background-color: $white;
    }

    .dropdown-menu::-webkit-scrollbar-thumb {
        background-color: $main_color;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
    .w100 {
        width: 100%;
    }
    .mw100 {
        max-width: 100%;
    }
</style>