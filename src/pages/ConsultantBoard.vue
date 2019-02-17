<template>
  <div>
    <h2 class="my-4 font_xxl" >Доска консультаций</h2>
    <div class="row mb-4">
      <div class="col-3">
        <vue-select v-model="selected"  :options="options" placeholder="Компетенции" label="text" style="display: block">
          <template id="style-2" slot="option" slot-scope="option" class="modal-body__select mt-5" >
            <div class="py-1">{{ option.text }}</div>
          </template>
          <span slot="no-options">Ничего не найдено</span>
        </vue-select>
      </div>
      <div class="col-3">
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 card-pad" v-for="(con, i) in cons">
        <div class="card">
          <div class="card-body cons-body">
            <div>
              <p class="mb-0 font_xl">{{con.title}}</p>
              <p class="mr-auto mb-0 text-grey font_l" >{{con.compition}}</p>
            </div>
            <div>
              <div class="d-flex align-items-center">
                <div>
                  <!--<img class="img_master2" src="../assets/img/ava.jpg" >  статичная картинка  -->
                  <!-- Пока что будет выдавать ошибку в консоль, тк фотки подгружаются после построения карточек-->
                  <img class="img_master2" :src="photos[i].url" >
                </div>
                <div>
                  <span class="font_m">{{con.author}}</span>
                  <div class="h6 m-0">
                    <span title="Рейтинг" class="font_m">
                      <i class="fas fa-star mr-1 text-grey"></i>
                      {{con.raiting}}
                    </span>
                  </div>
                </div>
              </div>
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
              <button class="btn btn-outline-primary btn-md ml-auto px-4 btn-buy font_l">Купить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import axios from 'axios'
  import VueSelect from 'vue-select'
  export default {
    components: {
      VueSelect
    },
    data() {
      return {
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
        cons: [
          {
            title: 'Учу рисовать картины маслом',
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
            ]
          },
          {
            title: 'Учу верстать',
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
            ]
          },
          {
            title: 'Название',
            compition: 'Компетенция3',
            author: 'Имя',
            raiting: '150',
            date: '31/01/2019',
            time: '13:00 - 14:00',
            price: '150',
            tags: [
              {title: 'Тег'},
              {title: 'Тег'},
              {title: 'Тег'},
            ]
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
            ]
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
            ]
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
            ]
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
            ]
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
            ]
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
            ]
          }
        ],
        photos: []
      }
    },
    mounted () {
      this.$store.state.loader = true
      axios({
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/photos`
      })
        .then((response) => {
          this.photos = response.data
          this.$store.state.loader = false
          console.log(this.photos)
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

