<template>
  <div>
    <h2 class="my-4 font_xxl" >Доска заявок</h2>

    <div class="row mb-4 align-items-center">
      <div class="col-3">
        <vue-select v-model="selected"  :options="options" placeholder="Компетенции" label="text" style="display: block">
          <template id="style-2" slot="option" slot-scope="option" class="modal-body__select mt-5" >
            <div class="py-1">{{ option.text }}</div>
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
      <div class="col-1 px-0 search-btn btn text-grey">Поиск</div>
      <div class="ml-auto align-items-center d-flex"
           @onclick="createCons()"
           data-toggle="modal" data-target=".req_cons_modal"
      ><i class="far fa-plus-square mr-2"></i><span class="dashed2">Создать заявку</span></div>
      <req-cons />
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 card-pad" @click="selectIndex(i)" data-toggle="modal" data-target=".card_req_modal" v-for="(con, i) in cons">
        <div class="card">
          <div class="card-body req-body">
            <div>
              <p class="mb-0 font_xl">{{con.title}}</p>
              <p class="mr-auto mb-0 text-grey font_l" >{{con.compition}}</p>
            </div>
            <div class="d-flex">
              <div>
                <span title="Дата">
                  <i class="fas fa-calendar-week mr-1 text-grey"></i>
                  <span class="">
                    {{con.date}}
                  </span>
                </span>
              </div>
              <div class="ml-4">
                <span title="Время">
                  <i class="far fa-clock mr-1 text-grey"></i>
                  <span class="">
                    {{con.time}}
                  </span>
                </span>
              </div>
            </div>
            <div>
              <div class="tag px-2 font_s" v-for="tag in con.tags">{{tag.title}}</div>
            </div>
            <div class="d-flex">
              <div class="my-auto ">
                <span class="price">
                  {{con.price}}
                </span>
                <span class="main_color font_xl">руб</span>
              </div>
              <button class="btn btn-outline-primary btn-md ml-auto px-4 btn-buy">Ответить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <card-req :selectedIndex="selectedIndex"
              :selectedCard="selectedCard" />
  </div>
</template>
<script>

  //import CardCons from '../components/Modals/CardCons.vue'
  import CardReq from "../components/Modals/CardReq";
  import ReqCons from "../components/Modals/ReqCons";

  export default {
    components: {
      CardReq,
      ReqCons
    },
    data() {
      return {
        selectedIndex: '',
        selectedCard: '',
        cons: [
          {
            title: 'Научите рисовать',
            compition: 'Искусство',
            author: 'Пикассо',
            raiting: '150',
            date: '31/01/2019',
            time: '13:00 - 14:00',
            price: '1 450',
            tags: [
              {title: 'Рисование'},
              {title: 'Масло'},
              {title: 'Изобразительное искусство'},
            ],
            about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam consectetur culpa dignissimos, eius ex excepturi exercitationem, explicabo molestiae necessitatibus nihil nisi nostrum ratione voluptatem voluptatum? At facilis fugit harum!"
          },
          {
            title: 'Научите верстать',
            compition: 'Front-end',
            author: 'Фронтовик Ендович',
            raiting: '1337',
            date: '31/01/2019',
            time: '13:00 - 14:00',
            price: '150',
            tags: [
              {title: 'программирование'},
              {title: 'дизайн'},
              {title: 'фреймворк'},
            ],
            about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam consectetur culpa dignissimos, eius ex excepturi exercitationem, explicabo molestiae necessitatibus nihil nisi nostrum ratione voluptatem voluptatum? At facilis fugit harum!"
          },
          {
            title: 'Название',
            compition: 'Компетенция3',
            author: 'Имя',
            raiting: '99',
            date: '31/01/2019',
            time: '13:00 - 14:00',
            price: '150',
            tags: [
              {title: 'Тег'},
              {title: 'Тег'},
              {title: 'Тег'},
            ],
            about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam consectetur culpa dignissimos, eius ex excepturi exercitationem, explicabo molestiae necessitatibus nihil nisi nostrum ratione voluptatem voluptatum? At facilis fugit harum!"
          },
          {
            title: 'Название',
            compition: 'Компетенция1',
            author: 'Имя',
            raiting: '150',
            date: '31/01/2019',
            time: '13:00 - 14:00',
            price: '150',
            tags: [
              {title: 'Тег'},
              {title: 'Тег'},
              {title: 'Тег'},
            ],
            about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam consectetur culpa dignissimos, eius ex excepturi exercitationem, explicabo molestiae necessitatibus nihil nisi nostrum ratione voluptatem voluptatum? At facilis fugit harum!"
          },
          {
            title: 'Название',
            compition: 'Компетенция2',
            author: 'Имя',
            raiting: '150',
            date: '29/01/2019',
            time: '13:00 - 14:00',
            price: '150',
            tags: [
              {title: 'Тег'},
              {title: 'Тег'},
              {title: 'Тег'},
            ],
            about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam consectetur culpa dignissimos, eius ex excepturi exercitationem, explicabo molestiae necessitatibus nihil nisi nostrum ratione voluptatem voluptatum? At facilis fugit harum!"
          },
          {
            title: 'Название',
            compition: 'Компетенция',
            author: 'Имя',
            raiting: '150',
            date: '30/01/2019',
            time: '13:00 - 14:00',
            price: '150',
            tags: [
              {title: 'Тег'},
              {title: 'Тег'},
              {title: 'Тег'},
            ],
            about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam consectetur culpa dignissimos, eius ex excepturi exercitationem, explicabo molestiae necessitatibus nihil nisi nostrum ratione voluptatem voluptatum? At facilis fugit harum!"
          }
        ],
      }
    },
    methods: {
      selectIndex(i){
        this.selectedCard = this.cons[i]
      }
    }


  }
</script>
<style lang="scss">
  $main_color: #0D84FB; //синиий
  $main_grey: #A6A6A6; //серый
  $danger: #FF3F3F; //красный
  $success: #43C768; //зеленый
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
  .price {
    color: $main_color;
    font-weight: 600;
  }
  body {
    color: $secondary_grey;
  }
  .card-pad {
    padding-right: 12px!important;
    padding-left: 12px!important;
    padding-bottom: 24px!important;
  }
  .cons-title {
    font-size: 20px;
  }
  .req-body {
    padding: 30px 35px;
    min-height: 310px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .tag {
    background: lighten($main_grey,25%);
    position: relative;
    margin-left: 11px;
    margin-right: 11px;
    height: 24px!important;
    display: inline-flex;
    align-items: center;
    padding-left: .2rem!important;
    padding-right: .5rem!important;
    margin-bottom: 4px;
    transition: .1s;
    &:hover {
      background: lighten($main_grey,20%);
      transition: .1s;
      &:before{
        border-right: 12px solid lighten($main_grey,20%);
      }
    }
    &:before{
      transition: .1s;
      content: '';
      position: absolute;
      margin-left: -27px;
      border: 12px solid transparent;
      border-right: 12px solid lighten($main_grey,25%);
    }
  }
  .price {
    color: $main_color;
    font-weight: 600;
    font-size: $font_card-price;
  }
  .btn-buy {
    max-height: 42px;
  }
  .btn-cons-card {
    color: white;
    background-image: linear-gradient(to right, #0c83fb, #38b5ea);
    border: none;
  }
  .btn-cons-card:hover {
    color: white;
    background-image: linear-gradient(to right, #0a61c8, #2d96c1);
    border: none;
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
</style>

