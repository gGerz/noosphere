<template>
  <div>
    <h2 class="my-4 font_xxl" >Доска консультаций</h2>
    <div class="row mb-4 align-items-center">
      <div class="col-3">
              {{selected.competence}}
        <vue-select v-model="selected" label="competence" :options="globalComps" placeholder="Компетенции"  style="display: block">
          <template id="style-2" slot="option" slot-scope="option" class="modal-body__select mt-5" >
            <div class="py-1">{{ option.competence }}</div>
          </template>
          <span slot="no-options">Ничего не найдено</span>
        </vue-select>
      </div>
      <div class="col-2 px-0">
          <input type="date" class="form-control search-item" required="required" placeholder="">
      </div>
      <div class="col-3">
          <div class="d-flex align-items-center">
            <div class="pr-2 text-grey">Время </div>
            <input class="form-control mr-2 search-item" type="text" placeholder="От">
            <input class="form-control mr-2 search-item" type="text" placeholder="До">
          </div>
      </div>
      <div class="col-1 px-0 search-btn btn text-grey" >Поиск</div>
      <div class="ml-auto align-items-center d-flex"
           @onclick="createCons()"
           data-toggle="modal" data-target=".create_cons_modal"
           v-if="this.$store.state.authorisedStatus"
      ><i class="far fa-plus-square mr-2"></i><span class="dashed2">Создать карточку консультации</span></div>
      <create-cons />
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 card-pad" @click="selectIndex(i)" data-toggle="modal" data-target=".card_cons_modal" v-for="(con, i) in cons">
        <div class="card">
          <div class="card-body cons-body">
            <div>
              <p class="mb-0 font_xl">{{con.sc_title}}
              </p>
              <p class="mr-auto mb-0 text-grey font_l" v-if="con.scCom != undefined">{{con.scCom.competence}}</p>
            </div>
            <div>
              <div class="d-flex align-items-center">
                <div>
                  <img class="img_master2" src="../assets/img/ava.jpg" >
                  <!-- Пока что будет выдавать ошибку в консоль, тк фотки подгружаются после построения карточек-->
                  <!--<img class="img_master2" :src="photos[i].url" >-->
                </div>
                <div>
                  <div class="font_m" v-if="con.scUser !== undefined">{{con.scUser.p_name}}</div>
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
              <div class="tag px-2 font_s" v-for="tag in con.tagCon">{{tag.tag_name}}</div>
            </div>
            <div class="d-flex">
              <div class="my-auto ">
                <span class="price">
                  {{con.sc_price | rounded}}
                </span>
                <span class="main_color font_xl">руб</span>
              </div>
                <span class="ml-auto btn btn-outline-primary btn-md px-4 btn-buy font_l" @click="changeStateCons(i)">Купить</span>

            </div>
          </div>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination d-flex justify-content-center">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="n in 3"><a class="page-link" href="#" @click="getPage(n)">{{n}}</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
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

  import axios from 'axios'
  import VueSelect from 'vue-select'
  import CardCons from "../components/Modals/CardCons"
  import CreateCons from '../components/Modals/CreateCons.vue'


  export default {
    components: {
      CardCons,
      CreateCons,
      VueSelect
    },
    data() {
      return {
        globalComps: [],
        searchComp: '',
        selectedIndex: '',
        selectedCard: '',
        carrentPage: 1,
        options: [
          { value: 1, text: 'One' },
          { value: 2, text: 'two' },
          { value: 3, text: 'three' },
          { value: 4, text: 'four' },
          { value: 4, text: 'four' },
          { value: 4, text: 'four' },
          { value: 4, text: 'four' },
          { value: 4, text: 'four' },
          { value: 4, text: 'four' },
          { value: 4, text: 'four' },
          { value: 4, text: 'four' },
          { value: 4, text: 'four' },
        ],
        selected: '',
        cons: [],
        photos: [],
          testone: 'Химия'
      }
    },
    mounted () {
      // axios({
      //   method: 'get',
      //   url: `https://jsonplaceholder.typicode.com/photos`
      // })
      //   .then((response) => {
      //     this.photos = response.data
      //     this.$store.state.loader = false
      //     console.log(this.photos)
      //   })
      //   .catch((error) => {
      //     console.error(error)
      //   })
      this.$store.state.loader = true
      axios({
        method: 'get',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/sellings`
      })
        .then((response) => {
          this.cons = response.data
          console.log("Консультация",this.cons)
          this.$store.state.loader = false
        })
        .catch((error) => {
          console.error(error)
        })


        axios({
          method: 'get',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/coms`,
        })
          .then((response) => {
            console.log("Компетенция",response.data)
            this.globalComps = response.data
          })
          .catch((error) => {
            console.error(error)
          })
    },
    methods: {
      changeStateCons(i) {

        const formData = new FormData()
        formData.set('sc_type', 2)
        axios({
          method: 'PUT',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/sellings/`+ this.cons[i].sc_id,
          data: formData
        })
                .then((response) => {
                  console.log(response)
                })
                .catch((error) => {
                  console.error(error)
                })
      },
      getPage(i) {
        console.log('страница', i)
        this.$store.state.loader = true
        axios({
          method: 'get',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/sellings?page=`+ i +`&expand=scCom&sort=sc_date`
        })
                .then((response) => {
                  this.cons = response.data.items
                  console.log("Консультация "+i,this.cons)
                  this.$store.state.loader = false
                })
                .catch((error) => {
                  console.error(error)
                })
      },
      selectIndex(i){
        this.selectedCard = this.cons[i]
        this.$store.state.anotherUserId = this.selectedCard.scUser.p_id
      }
    },
    filters: {
      rounded(value){
        return parseInt(value * 100) / 100
      },
      deleteSeconds(value){
        if (value) return value.slice(0, -3)
      }
    },
    // computed: {
    //   computedList () {
    //       return this.cons.filter(function (con) {
    //           if (this.selected !== undefined){
    //               console.log('1111111111122')
    //               return this.con.scCom.competence === this.selected.competence
    //           } else {
    //               return this.con
    //           }
    //       })
    //   }
    //   }
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

