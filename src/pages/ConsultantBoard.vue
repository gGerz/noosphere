<template>
  <div>
    <h2 class="my-4 font_xxl" >Доска консультаций</h2>
    <div class="headline mb-4 align-items-center">
      <div class="search-bar">
        <div class="w-100">
          <vue-select v-model="selected" label="competence" :options="globalComps" placeholder="Компетенции"  style="display: block">
            <template id="style-2" slot="option" slot-scope="option" class="modal-body__select mt-5" >
              <div class="py-1">{{ option.competence }}</div>
            </template>
            <span slot="no-options">Ничего не найдено</span>
          </vue-select>
        </div>
        <div class="d-flex mt-2 mt-md-0">
          <div class="search-btn btn text-grey mr-1" @click="consFindComp">Поиск</div>
          <div class="search-btn btn text-grey ml-1" @click="clearSearch">Сбросить</div>
        </div>
      </div>
      <div class="align-items-center d-flex justify-content-center create-cons"
           @onclick="createCons()"
           data-toggle="modal" data-target=".create_cons_modal"
           v-if="this.$store.state.authorisedStatus"
      ><i class="far fa-plus-square mr-2"></i><span class="dashed2">Создать консультацию</span></div>
      <create-cons />
    </div>
    <div class="row">
      <div class="stub" v-if="cons.length === 0">
        Извините, ничего не найдено
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 card-pad" @click="openConsCard(i)" v-for="(con, i) in cons">
        <div class="card">
          <div class="card-body cons-body">
            <div>
              <p class="mb-0 font_xl">{{con.sc_title}}
              </p>
              <p class="mr-auto mb-0 text-grey font_l" v-if="con.scCom !== undefined">{{con.scCom.competence}}</p>
            </div>
            <div>
              <div class="d-flex align-items-center">
                <div>
                  <img class="img_master2" src="../assets/img/ava.jpg" >
                </div>
                <div>
                  <div class="font_m text-truncate card-item-name" v-if="con.scUser !== undefined">{{con.scUser.p_name}}</div>
                  <div class="m-0" title="Рейтинг font_m">
                    <div class="d-flex">
                      <div class="mx-2">
                        <i class="far fa-thumbs-up"></i>
                        {{con.sc_like}}
                      </div>
                      <div class="mx-2">
                        <i class="far fa-thumbs-down"></i>
                        {{con.sc_like}}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="d-flex">
              <div>
                <span title="Дата">
                  <i class="fas fa-calendar-week mr-1 text-grey"></i>
                  <span class="">
                    {{con.sc_date}}
                  </span>
                </span>
              </div>
              <div class="ml-4">
                <span title="Время">
                  <i class="far fa-clock mr-1 text-grey"></i>
                  <span class="">
                    {{con.sc_begin_time | deleteSeconds}} - {{con.sc_end_time | deleteSeconds}}
                  </span>
                </span>
              </div>
            </div>
            <div>
              <div class="tag px-2 font_s" v-for="tag in con.tagConsultation">{{tag.tag_name}}</div>
            </div>
            <div class="d-flex">
              <div class="my-auto ">
                <span class="price">
                  {{con.sc_price | rounded}}
                </span>
                <span class="main_color font_xl">руб</span>
              </div>
              <span v-if="$store.state.userId == con.sc_user_id" class="ml-auto btn btn-outline-secondary btn-md px-4 btn-buy font_l">Мое</span>
              <span v-else class="ml-auto btn btn-outline-primary btn-md px-4 btn-buy font_l" @click="createCons(i)">Купить</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav aria-label="" v-if="cons.length !== 0">
      <ul class="pagination d-flex justify-content-center">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous" @click="getPage(currentPage - 1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="n in page"><a class="page-link" href="#" @click="getPage(n)">{{n}}</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next" @click="getPage(currentPage + 1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
    <card-cons :selectedIndex="selectedIndex"
               :selectedCard="selectedCard" />
  </div>
</template>
<script>
  //подключение библиотек
  import axios from 'axios'
  import VueSelect from 'vue-select'
  import CardCons from "../components/Modals/CardCons"
  import CreateCons from '../components/Modals/CreateCons.vue'

  export default {
    //подключение компонентов
    components: {
      CardCons,
      CreateCons,
      VueSelect
    },
    //объявление переменных
    data() {
      return {
        globalComps: [],
        page: '',
        idOtherUser: '',
        currentPage: 1,
        searchComp: '',
        selectedIndex: '',
        selectedCard: '',
        options: [],
        sellId: '',
        consId: '',
        purId: '',
        selected: '',
        cons: [],
        photos: []
      }
    },
    // mounted вызывается после компиляции html элементов
    mounted () {
      this.$store.state.loader = true //колесо загрузки включается и происходит axios запрос на список консультаций из бд
      axios({
          method: 'get', //название метода обращения к бд, get - получить, post - отправить
          url: `http://192.168.1.150/noosfera/public_html/api/v1/sellings` //ссылка на api списка консултаций
        })
        .then((response) => { //если пришел ответ
          this.cons = response.data
          this.page = Math.ceil((response.data[0].countSc) / 21) //кол-во страниц
          this.$store.state.loader = false //колесо загрузки выкл
        })
        .catch((error) => {
          console.error(error)
        })

        axios({
          method: 'get',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/coms`, //api компетенций
        })
          .then((response) => {
            this.globalComps = response.data
          })
          .catch((error) => {
            console.error(error)
          })
    },
    //в methods находятся функции компонента
    methods: {
      clearSearch() {
        this.selected = ''
        axios({
          method: 'get',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/sellings`
        })
          .then((response) => {
            this.cons = response.data
            this.page = Math.ceil((response.data[0].countSc) / 21)
            this.$store.state.loader = false
          })
          .catch((error) => {
            console.error(error)
          })
      },
      //поиск по компетенциям
      consFindComp() {
        if (this.selected === null){ //если не выбрана компитенция
          axios({
            method: 'get',
            url: `http://192.168.1.150/noosfera/public_html/api/v1/sellings`
          })
              .then((response) => {
                this.cons = response.data
                this.page = Math.ceil((response.data[0].countSc) / 21)
                this.$store.state.loader = false
              })
              .catch((error) => {
                console.error(error)
              })
        } else
        if (this.selected.com_id !== 0) {
          axios({
            method: 'get',
            //api дающая список консультаций по выбранной компитенции
            url: `http://192.168.1.150/noosfera/public_html/api/v1/sellings?SellingConsultationSearch[sc_com_id]=` + this.selected.com_id
          })
            .then((response) => {
              this.cons = response.data
              this.page = Math.ceil((response.data.length) / 21)
              this.$store.state.loader = false
            })
            .catch((error) => {
              console.error(error)
            })
        }
      },
      createCons(i) {
        event.stopPropagation();
        this.idOtherUser = this.cons[i].sc_user_id
        const formData = new FormData()
        formData.append('pc_title', this.cons[i].sc_title)
        formData.append('pc_user_id', this.$store.state.userId)
        formData.append('pc_date', this.cons[i].sc_date)
        formData.append('pc_begin_time', this.cons[i].sc_begin_time)
        formData.append('pc_end_time', this.cons[i].sc_end_time)
        formData.append('pc_price', this.cons[i].sc_price)
        formData.append('pc_description', this.cons[i].sc_description)
        formData.append('pc_com_id', this.cons[i].sc_com_id)
        formData.append('pc_type', 2)
        axios({
          method: 'post',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/purchases`,
          data: formData
        })
          .then(response => {
            if (response.status === 201) {
              this.sellId = this.cons[i].sc_id
              this.purId = response.data.pc_id

              //отправка пут запроса
              let payload = {
                'sc_type': 2
              };

              axios({
                method: 'PUT',
                url: `http://192.168.1.150/noosfera/public_html/api/v1/sellings/` + this.sellId,
                headers: {
                  'Content-Type': 'application/json'
                },
                data: payload
              })
                .then(response => {
                    this.createConId()
                })
                .catch(response => {
                })
            }
          })
          .catch(error => {
            console.log(error)
            alert('Ошибка сервера, консультация не создана')
          })
      },
      createConId() {
        const formData1 = new FormData()
        formData1.set('con_sc_id', this.sellId)
        formData1.set('con_pc_id', this.purId)
        axios({
          method: 'post',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/consultations`,
          data: formData1
        })
          .then(response => {
            this.consId = response.data.con_id
            if (response.status === 201) {
              this.sendNotification()
              localStorage.setItem('currentConsultation', this.consId)
              this.$router.push('/videoroom')
              var myWin= open('https://appear.in/noospherevideochat');
            }
          })
          .catch(response => {
          })
      },
      sendNotification() {
        const formData = new FormData()
        formData.set('n_con_id', this.consId) //id созданной консультации
        formData.set('n_selling_user_id', this.idOtherUser) //id другой
        formData.set('n_purchase_user_id', this.$store.state.userId) //id мой
        formData.set('n_type', 'selling') // тип
        axios({
          method: 'post',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/notifications`,
          data: formData
        })
            .then(response => {
              console.log(response)
            })
            .catch(response => {
            })
      },
      getPage(i) {
        if (i <= this.page && i > 0) {
          this.$store.state.loader = true
          axios({
            method: 'get',
            url: `http://192.168.1.150/noosfera/public_html/api/v1/sellings?page=`+ i
          })
            .then((response) => {
              this.cons = response.data
              this.$store.state.loader = false
            })
            .catch((error) => {
              console.error(error)
            })
          this.currentPage = i
        }
      },
      selectIndex(i){
        this.selectedCard = this.cons[i]
        this.$store.state.anotherUserId = this.selectedCard.scUser.p_id
      },
      openConsCard(i) {
        this.selectIndex(i)
        $('.card_cons_modal').modal('show')
      }
    },
    filters: {
      rounded(value){
        return parseInt(value * 100) / 100
      },
      deleteSeconds(value){
        if (value) return value.slice(0, -3)
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

  @media (max-width: 576px) {
    .font_xxl {
      font-size: $font_xl;
    }
  }

  .stub{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 500px;
  }

  body {
    color: $secondary_grey;
  }

  .headline {
    display: flex;
    justify-content: space-between;
  }

  .search-bar {
    display: flex;
    width: 450px;
  }




  .card-pad {
    padding-right: 12px!important;
    padding-left: 12px!important;
    padding-bottom: 24px!important;
  }

  .tag {
    cursor: pointer;
    background-color: #ECECEC;
    color: $main_grey;
    position: relative;
    margin-left: 11px;
    margin-right: 11px;
    height: 24px!important;
    display: inline-flex;
    align-items: center;
    padding-left: .2rem!important;
    padding-right: .5rem!important;
    margin-bottom: 7px;
    transition: .1s;

    &:before{
      transition: .1s;
      content: '';
      position: absolute;
      margin-left: -27px;
      border: 12px solid transparent;
      border-right: 12px solid #ECECEC;
    }
  }

  .price {
    color: $main_color;
    font-weight: 600;
    font-size: $font_card-price;
  }

  .img_master2 {
    width: 53px; //63
    height: 53px!important; //63
    object-fit: cover;
    border-radius: 100%;
    margin-right: 17px;
  }

  .cons-body {
    padding: 30px 35px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .btn-buy {
    max-height: 42px;
  }

  .dashed2 { //пунктирное подчеркивание
    color: $main_color;
    font-size: $font_m;
    text-decoration: none;
    border-bottom: 1px dashed $main_color;
    &:hover{
      text-decoration: none;
      color: darken($main_color,20%);
    }
  }
  .fa-plus-square:before {//иконка создания консультации
    position: relative;
    top: 4px;
    color: $main_color;
    font-size: 23px;
  }

  .search-item {
    background: #ffffff00;
    border: 1px solid rgba(60,60,60,.26);
    height: 48px;
  }

  .search-btn {
    padding-left: 1rem!important;
    padding-right: 1rem!important;
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    height: 48px;
    background: #E4E4E4;
    &:hover {
      background: #d6d6d6;
    }
  }
  @media (max-width: 767px) {
    .headline {
      display: block;
    }
    .search-bar {
      width: 100%;
      display: block;
    }
    .create-cons {
      padding-top: 20px;
    }
    .search-btn {
      width: 50%!important;
      margin-left: 0rem;
    }
  }
  .card-item-name {
    width: 230px;
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
</style>

