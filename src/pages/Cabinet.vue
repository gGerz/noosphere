<template>
  <div>
    <div>
      <h2 class="my-4" >Личный кабинет</h2>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="home-tab" data-toggle="tab" href="#general" role="tab" aria-controls="home" aria-selected="true"><i class="fas fa-user-graduate"></i>Общее</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="profile-tab" data-toggle="tab" href="#schedule" role="tab" aria-controls="profile" aria-selected="false"><i class="far fa-calendar-alt"></i>Расписание консультаций</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="messages-tab" data-toggle="tab" href="#tickets" role="tab" aria-controls="messages" aria-selected="false"><i class="far fa-list-alt"></i>Мои заявки</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="settings-tab" data-toggle="tab" href="#archive" role="tab" aria-controls="settings" aria-selected="false"><i class="far fa-calendar-times"></i>Архив занятий</a>
        </li>
        <div class="ml-auto"><i class="far fa-plus-square mr-2"></i><span class="dashed2">Создать карточку консультации</span></div>
      </ul>
    </div>
    <!-- ТАБЫ ДЕСКТОП -->
    <div class="tab-content">
      <!-- ВКЛАДКА ОБЩЕЕ -->
      <div class="tab-pane " id="general">
        <div class="cab_card">
          <div class="card-body-main">
            <div class="d-lg-flex d-md-flex d-block align-items-center">
              <div class="d-flex align-items-center ">
                  <img class="ava_cabinet" src="../assets/img/ava.jpg">
                  <div class="text-dark h3 m-0">Леонардо да Винчи</div>
              </div>
              <div class="ml-lg-5 ml-md-5"><a href="" class="dashed text-grey">Изменить данные</a></div>
            </div>
              <div class="row user_info">
                  <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block">
                      <div>E-mail</div>
                      <div>leo228@mail.ru</div>
                  </div>
                  <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block">
                      <div>Телефон</div>
                      <div>+7 999 888 77 66</div>
                  </div>
                  <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block">
                      <div>Пароль</div>
                      <div>**********</div>
                  </div>
                  <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block">
                      <div>Дата рождения</div>
                      <div>15.04.1452</div>
                  </div>
                  <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block">
                      <div>Пол</div>
                      <div>Мужской</div>
                  </div>
              </div>
              <div class="row">
                  <div class="spec col-xs-8 col-sm-8 col-md-8 col-lg-4">
                      <div class="text-grey font_s">Компетенции</div>
                      <div class="d-flex justify-content-between mt-1 mr-4" v-for="competence in competencies">
                          <div>{{competence.title}}</div>
                          <div class="d-flex justify-content-between">
                              <div>{{competence.goodMark}}<span class="text-grey">/{{competence.badMark}}</span></div>
                              <div>
                                  <i class="fas fa-times ml-4"></i>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                      <div class="">
                          <div class="text-grey font_s">О себе</div>
                          <div class="card about_user">
                              <div class="card-body">
                                  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis nisl vel mauris posuere, et posuere erat ullamcorper. Fusce dignissim maximus elit, eu hendrerit leo scelerisque non. Suspendisse ultrices libero id urna consectetur accumsan. Quisque lobortis sapien non ultrices auctor. Sed dolor magna, blandit ut justo id, vestibulum porta risus. Nam vitae sodales magna. Nullam sagittis feugiat tempus.</span>
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
        <div class="cab_card">132</div>
      </div>
      <!-- ВКЛАДКА ЗАЯВКИ -->
      <div class="tab-pane active" id="tickets">
        <div class="cab_card">
            <div class="card-body-main">
                <div class="row req-table font_s text-grey">
                    <div class="col-2">Дата</div>
                    <div class="col-2">Время</div>
                    <div class="col-2">Компитенция</div>
                </div>
                <div class="card card-req ">
                    <div class="row card-body font_m">
                        <div class="col-2">12/12/12</div>
                        <div class="col-2">04:19:59</div>
                        <div class="col-2">Front</div>
                        <div class="col d-flex justify-content-end">
                            <div>Изменить</div>
                            <div>Отменить</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <!-- ВКЛАДКА АРХИВ -->
      <div class="tab-pane" id="archive">
        archive
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default{
    data(){
      return{
        competencies: [
          {
            title: 'Front',
            goodMark: '25',
            badMark: '15',
          },
          {
            title: 'Back',
            goodMark: '140',
            badMark: '56',
          },
          {
            title: 'Design',
            goodMark: '15',
            badMark: '5',
          },
        ]
      }
    },
    mounted() {
      // Переключение вкладок
      $('#lk-tabs a').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
      })
    }
  }
</script>
<style lang="scss">

  $main_color: #0D84FB;
  $main_grey: #A6A6A6;
  $secondary_grey: #373737;
  $font_card-price: 34px;
  $font_xxl: 28px;
  $font_card-header: 22px;
  $font_xl: 20px;
  $font_l: 18px;
  $font_m: 16px;
  $font_s: 14px;

  body {
    color: $secondary_grey;
  }

  .text-grey { //серый цвет
    color: $main_grey;

    &-light { //светлее
      color: lighten($main_grey,35%);
    }
  }
  .font_s {
    font-size: $font_s;
  }
  .font_l {
      font-size: $font_l;
  }
  .nav-link {
    color: $main_grey!important;
    padding-right: 25px !important;
    padding-left: 25px !important;
    i {
      padding-right: 10px;
    }
  }
  .nav-link.active {
    color: $main_color!important;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  }
  .user_info {
      padding-top: 38px;
      padding-bottom: 50px;
      max-width: 900px;
      div {
          width: 132px;
          div:first-child{
              font-size: $font_s;
              padding-bottom: 4px;
              color: $main_grey;
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
      top: 3px;
    color: $main_color;
    font-size: 23px;
  }
  .dashed { //пунктирное подчеркивание
    font-size: $font_s;
    text-decoration: none;
    border-bottom: 1px dashed $main_grey;

     &:hover{
       text-decoration: none;
       color: darken($main_grey,20%);
     }
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
    height: 40px;
    width: 40px!important;
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
</style>
