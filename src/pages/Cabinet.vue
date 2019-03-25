<template>
    <div>
        <div>
            <h2 class="my-4 font_xxl" >Личный кабинет</h2>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link nav-link-cabinet active" id="home-tab" data-toggle="tab" href="#general" role="tab" aria-controls="home" aria-selected="true"><i class="fas fa-user-graduate"></i>Общее</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-cabinet" id="profile-tab" data-toggle="tab" href="#schedule" role="tab" aria-controls="profile" aria-selected="false"><i class="far fa-calendar-alt"></i>Расписание консультаций</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-cabinet" id="messages-tab" data-toggle="tab" href="#tickets" role="tab" aria-controls="messages" aria-selected="false"><i class="far fa-list-alt"></i>Мои заявки</a>
                </li>
                <!--<div class="ml-auto"-->
                     <!--data-toggle="modal"-->
                     <!--data-target=".create_cons_modal"-->
                <!--&gt;-->
                    <!--<i class="far fa-plus-square mr-2"></i>-->
                    <!--<span class="dashed2">Создать карточку консультации</span>-->
                <!--</div>-->
                <li class="nav-item create-cons"
                     data-toggle="modal"
                     data-target=".create_cons_modal"
                >
                    <i class="far fa-plus-square mr-2"></i>
                    <span class="dashed2">Создать карточку консультации</span>
                </li>
                <create-cons />
            </ul>
        </div>
        <!-- ТАБЫ ДЕСКТОП -->
        <div class="tab-content">
            <!-- ВКЛАДКА ОБЩЕЕ -->
            <div class="tab-pane active" id="general">
                <div class="cab_card">
                    <div class="card-body-main mw100">
                        <div class="d-lg-flex d-md-flex d-block align-items-center  flex-nowrap">
                            <div class="d-flex align-items-center w100 ">
                                <img class="ava_cabinet" src="../assets/img/ava.jpg">
                                <div class="text-dark h3 m-0 main-item-name ">{{userInfo.p_name}}</div>
                            </div>
                            <div class="ml-lg-5 ml-md-5 general-buttons">
                                <button style="width: 100%" class="btn btn-outline-primary mb-2" @click="changeUserInfo">Изменить данные</button>
                                <update-user-info :userInfo="userInfo"/>
                                <button style="width: 100%" class="btn btn-outline-danger" @click="logout">Выйти</button>
                            </div>
                        </div>
                        <div class="row user_info">
                            <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block mx-auto">
                                <div>E-mail</div>
                                <div>{{email}}</div>
                            </div>

                            <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block mx-auto">
                                <div>Пароль</div>
                                <div>************</div>
                            </div>
                            <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block mx-auto">
                                <div>Дата рождения</div>
                                <div>{{userInfo.p_date}}({{userInfo.p_date | getAges}} лет)</div>
                            </div>
                            <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block mx-auto mx-sm-0">
                                <div>Пол</div>
                                <div v-if="userInfo.p_gender">Мужской</div>
                                <div v-else>Женский</div>
                            </div>
                            <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block mx-auto">
                            </div>
                        </div>
                        <div class="row">
                            <div class="spec col-10 col-xs-12 col-sm-10 col-md-10 col-lg-4 px-3">
                                <div class="text-grey font_s d-flex ">
                                    Компетенции
                                    <span class="ml-auto"
                                          @onclick="createComp()"
                                          data-toggle="modal"
                                          data-target=".create_comp_modal">
                                    <span class="dashed2">Создать</span>
                                    </span>
                                </div>
                                <create-comp @updateUserInfo="getUserInfo"></create-comp>
                                <div class="d-flex justify-content-between mt-1 mr-4" v-for="competence in userInfo.cpCom">
                                    <div>{{competence.competence}}</div>
                                    <div class="d-flex justify-content-between">
                                        <i @click="deleteComp(competence.com_id)" class="fas fa-times mr-2"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                                <div class="">
                                    <div class="text-grey font_s">О себе</div>
                                    <div class="card about_user">
                                        <div class="card-body">
                                            <span>{{userInfo.p_description}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ВКЛАДКА РАСПИСАНИЕ -->
            <div class="tab-pane" id="schedule">
                <div class="cab_card">
                    <div class="card-body-main">
                        <div class="row mb-4">
                            <div class="col-12 col-xl-3 col-lg-3 col-md-12">
                                <vue-select :value="selectedUserComp" :onChange="setSelectedUserComp" :options="userComps" label="competence" placeholder="Компетенция...">
                                    <template id="style-2" slot="option" slot-scope="option" class="modal-body__select mt-5" >
                                        <div class="py-1">{{ option.competence }}</div>
                                    </template>
                                    <span slot="no-options">Ничего не найдено</span>
                                </vue-select>
                            </div>
                            <div class="col-12 col-xl-3 col-lg-3 col-md-12">
                                <input placeholder="Название..." v-model="searchableConTitle" type="text" class="form-control search-field">
                            </div>
                        </div>
                        <div v-if="filteredCons.length === 0" class="null-filter">
                            <div>
                                Ничего не найдено
                            </div>
                            <div>
                                <span @click="resetFilters">
                                    Сбросить фильтры
                                </span>
                            </div>
                        </div>
                        <div class="schedule-item" v-for="(con, i) in filteredCons">
                            <i class="fas fa-times mr-2" @click="delConItem(i)"></i>
                            <i class="fas fa fa-cog mr-2"></i>
                            |
                            <i class="fas fa-calendar-week mr-1 text-grey"></i>
                            {{con.sc_date}}
                            |
                            <span>
                                {{con.sc_title}}
                            </span>
                            ({{con.scCom.competence}})
                        </div>
                    </div>
                </div>
            </div>
            <!-- ВКЛАДКА ЗАЯВКИ -->
            <div class="tab-pane" id="tickets">
                <div class="cab_card">
                    <div class="card-body-main">
                        <div class="row mb-4">
                            <div class="col-12 col-xl-3 col-lg-3 col-md-12">
                                <vue-select :value="selectedUserReq" :onChange="setSelectedUserReq" :options="globalComps" label="competence" placeholder="Компетенция...">
                                    <template id="style-2" slot="option" slot-scope="option" class="modal-body__select mt-5" >
                                        <div class="py-1">{{ option.competence }}</div>
                                    </template>
                                    <span slot="no-options">Ничего не найдено</span>
                                </vue-select>
                            </div>
                            <div class="col-12 col-xl-3 col-lg-3 col-md-12">
                                <input placeholder="Название..." v-model="searchableReqTitle" type="text" class="form-control search-field">
                            </div>
                        </div>
                        <div v-if="filteredReqs.length === 0" class="null-filter">
                            <div>
                                Ничего не найдено
                            </div>
                            <div>
                                <span @click="resetFilters">
                                    Сбросить фильтры
                                </span>
                            </div>
                        </div>
                        <div class="schedule-item" v-for="(req, i) in filteredReqs">
                            <i class="fas fa-times mr-2" @click="delReqItem(i)"></i>
                            <i class="fas fa fa-cog mr-2"></i>
                            |
                            <i class="fas fa-calendar-week mr-1 text-grey"></i>
                            {{req.pc_date}}
                            |
                            <span>
                                {{req.pc_title}}
                            </span>
                            ({{req.pcCom.competence}})
                        </div>
                    </div>
                </div>
            </div>
            <!-- ВКЛАДКА АРХИВ -->
        </div>

    </div>
</template>
<script>

  //import $ from 'jquery'
  import VueSelect from 'vue-select'
  import axios from 'axios'
  import RegNext from '../components/Modals/RegNext'

  import UpdateUserInfo from '../components/Modals/UpdateUserInfo.vue'
  import CreateCons from '../components/Modals/CreateCons.vue'
  import CreateComp from '../components/Modals/CreateComp.vue'

    export default {
    components: {
        VueSelect,
        UpdateUserInfo,
        CreateCons,
        CreateComp,
        RegNext
    },
    data() {
        return {
            email: '',
            userComps: [],
            selectedUserComp: '',
            searchableConTitle: '',
            selectedUserReq: '',
            searchableReqTitle: '',
            globalComps : [],
            selectedComp: '',
            userInfo: [],
            options: [],
            selected: '',
            competencies: [],
            cons: [],
            reqs: []
        }
    },
    filters: {
        getAges(value){
            return ((new Date().getTime() - new Date(value)) / (24 * 3600 * 365.25 * 1000)) | 0;
        }
    },
    computed: {
        filteredCons() {
            return this.cons.filter(con => {
                if (this.selectedUserComp.competence === undefined && this.searchableConTitle === ''){
                    return con
                } else if (this.selectedUserComp.competence !== undefined && this.searchableConTitle !== ''){
                    return con.scCom.competence.indexOf(this.selectedUserComp.competence) > -1 && con.sc_title.toLowerCase().indexOf((this.searchableConTitle.toLowerCase())) > -1
                } else if (this.selectedUserComp.competence === undefined && this.searchableConTitle !== '') {
                    return con.sc_title.indexOf((this.searchableConTitle.toLowerCase())) > -1
                } else if (this.selectedUserComp.competence !== undefined && this.searchableConTitle === '') {
                    return con.scCom.competence.indexOf(this.selectedUserComp.competence) > -1
                }
            })
        },
        filteredReqs() {
            return this.reqs.filter(req => {
                if (this.selectedUserReq.competence === undefined && this.searchableReqTitle === ''){
                    return req
                } else if (this.selectedUserReq.competence !== undefined && this.searchableReqTitle !== ''){
                    return req.pcCom.competence.indexOf(this.selectedUserReq.competence) > -1 && req.pc_title.toLowerCase().indexOf((this.searchableReqTitle.toLowerCase())) > -1
                } else if (this.selectedUserReq.competence === undefined && this.searchableReqTitle !== '') {
                    return req.pc_title.indexOf.toLowerCase()((this.searchableReqTitle.toLowerCase())) > -1
                } else if (this.selectedUserReq.competence !== undefined && this.searchableReqTitle === '') {
                    return req.pcCom.competence.indexOf(this.selectedUserReq.competence) > -1
                }
            })
        }
    },
    methods: {
        //Получение информации юзера
        getUserInfo(){
            axios({
                method: 'get',
                url: `http://192.168.1.150/noosfera/public_html/api/v1/profiles/` + this.$store.state.userInfo + '?expand=cpCom,pUser',
                headers: {'Authorization': `Bearer ${localStorage.token}`}
            })
                .then((response) => {
                    this.userInfo = response.data //общая информация
                    this.email = this.userInfo.pUser.email //почта
                    this.userComps = this.userInfo.cpCom //компетенции пользователя
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        //Получение консультаций юзера
        getCons(){
            axios({
                method: 'get',
                url: `http://192.168.1.150/noosfera/public_html/api/v1/profiles/` + this.$store.state.userInfo + `?expand=conSUser`
            })
                .then((response) => {
                    this.cons = response.data.conSUser
                    console.log(this.cons)
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        //Выбор компетенции для поиска в расписании
        setSelectedUserComp(value){
            if (value === '' || value === null){
                this.selectedUserComp = ''
            } else {
                this.selectedUserComp = value
            }
        },
        //Выбор компетенции для поиска в заявках
        setSelectedUserReq(value){
            if (value === '' || value === null){
                this.selectedUserReq = ''
            } else {
                this.selectedUserReq = value
            }
        },
        //Получение заявок юзера
        getTickets(){
            axios({
                method: 'get',
                url: `http://192.168.1.150/noosfera/public_html/api/v1/profiles/` + this.$store.state.userInfo + `?expand=conPUser`
            })
                .then((response) => {
                    this.reqs = response.data.conPUser
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        //Получение всех компетенций
        getComps(){
            axios({
                method: 'get',
                url: `http://192.168.1.150/noosfera/public_html/api/v1/coms`,
            })
                .then((response) => {
                    this.globalComps = response.data
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        //Удаление компетенции пользователя
        deleteComp(id) {
            const formData = new FormData()
            formData.set('cp_p_id', this.userInfo.p_user_id)
            formData.set('cp_com_id', id)
            axios({
                method: 'post',
                url: `http://192.168.1.150/noosfera/public_html/api/v1/competence/kill`,
                data: formData
            })
                .then((response) => {
                    this.getUserInfo()
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        //Удаление консультации из расписания
        delConItem(i){
            this.cons.splice(i,1)
        },
        //Удаление консультации из расписания
        delReqItem(i){
            this.reqs.splice(i,1)
        },
        //Добавление компетенции пользователя
        //Вызов модального окна изменения данных
        changeUserInfo() {
            $('.update_user_info_modal').modal('show');
        },
        resetFilters() {
          this.selectedUserComp = ''
          this.selectedUserReq = ''
          this.searchableConTitle = ''
          this.searchableReqTitle = ''
        },
        //выход из системы
        logout () {
            this.$store.dispatch('logout', {}).then(() => {
                this.$router.push('/')
            })
        }
    },
    mounted() {
      // Переключение вкладок
      $('#lk-tabs a').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
      })
    if (this.$store.state.userInfo !== null) {
        this.getUserInfo()
        this.getComps()
        this.getCons()
        this.getTickets()
    } else {
      // ОТКРЫТЬ МОДАЛКУ ПРОДОЛЖЕНИЯ РЕГИСТРАЦИИ
      $('.sign_up_next_modal').modal('show');
    }
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

    .general-buttons{
        display: flex;
        flex-direction: column;
    }

    .null-filter{
        display: flex;
        flex-direction: column;
        align-items: center;

        span{
            cursor: pointer;
            color: #007bff;
        }
    }

    .search-field{
        height: 48px;
    }

    @media (max-width: 992px) {
        .search-field{
            margin-top: 10px;
        }
    }

    @media (max-width: 420px){
        .dashed2{
            font-size: 14px!important;
        }
    }

    .schedule-item{
        box-shadow: 0px 1px 4px rgba(13, 132, 251, 0.2);
        border: 1px solid grey;
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 10px;
    }

    .create-cons{
        margin-left: 23%;
    }

    @media (max-width: 1200px) {
        .create-cons{
            margin-left: 7%;
        }
    }

    @media (max-width: 992px) {
        .create-cons{
            margin-left: 0%;
        }
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

    @media (max-width: 992px) {
        #myTab{
            display: flex;
            flex-direction: column;

            li{
                border: 1px solid #dee2e6;
                border-radius: 5px;
            }
            li .active{
                border-bottom: 1px solid #dee2e6!important;
            }
            .create-cons{
                padding: 10px;
                padding-left: 25px;
            }
        }
        .general-buttons{
            button:first-child{
                margin-top: 10px;
            }
        }
    }
</style>
