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
        <div class="ml-auto"><i class="far fa-plus-square"></i><span class="dashed2">Создать карточку консультации</span></div>
      </ul>
    </div>
    <!-- ТАБЫ ДЕСКТОП -->
    <div class="tab-content">
      <!-- ВКЛАДКА ОБЩЕЕ -->
      <div class="tab-pane active" id="general">
        <div class="cab_card">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <img class="ava_cabinet" src="../assets/img/ava.jpg">
              <div class="text-dark h3">Леонардо да Винчи</div>
              <div class="ml-5 "><a href="" class="dashed text-grey">Изменить данные</a></div>
            </div>
              <div class="d-flex user_info">
                  <div class="">
                      <div>E-mail</div>
                      <div>leo228@mail.ru</div>
                  </div>
                  <div>
                      <div>Телефон</div>
                      <div>+7 999 888 77 66</div>
                  </div>
                  <div>
                      <div>Пароль</div>
                      <div>**********</div>
                  </div>
                  <div>
                      <div>Дата рождения</div>
                      <div>15.04.1452</div>
                  </div>
                  <div>
                      <div>Пол</div>
                      <div>Мужской</div>
                  </div>
              </div>
              <div class="d-flex justify-content-between">
                  <div class="spec">
                      <div class="text-grey font_s">Компетенции</div>
                      <div class="d-flex justify-content-between mt-1" v-for="competence in competencies">
                          <div>{{competence.title}}</div>
                          <div class="d-flex justify-content-between">
                              <div>{{competence.goodMark}}<span class="text-grey">/{{competence.badMark}}</span></div>
                              <div>
                                  <i class="fas fa-times ml-4"></i>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div>
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
      <!-- ВКЛАДКА РАСПИСАНИЕ -->
      <div class="tab-pane" id="schedule">
        <div class="cab_card">132</div>
      </div>
      <!-- ВКЛАДКА ЗАЯВКИ -->
      <div class="tab-pane" id="tickets">
        tickets
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
            title: 'Компетенция 1',
            goodMark: '10',
            badMark: '5',
          },
          {
            title: 'Компетенция 2',
            goodMark: '10',
            badMark: '5',
          },
          {
            title: 'Компетенция 3',
            goodMark: '10',
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
    div {
      margin-right: 50px;
      width: 132px;
      div:first-child{
        font-size: $font_s;
        padding-bottom: 10px;
        color: $main_grey;
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
  }
  .fa-times:before {
    color: #FF3F3F;
    font-size: 15px;
  }
  .fa-plus-square:before {
    color: $main_color;
    font-size: 18px;
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
  .card-body {
    padding: 2.5rem;
  }
  .cab_card { //тело вкладки
    //position: relative;
    //top: -5px;
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

</style>
