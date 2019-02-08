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
      </ul>
    </div>
    <!-- ТАБЫ ДЕСКТОП -->
    <div class="tab-content">
      <!-- ВКЛАДКА ОБЩЕЕ -->
      <div class="tab-pane active" id="general">
        <div class="cab_card">
          <div class="card-body m-4">
            <div class="d-flex align-items-center">
              <img class="ava_cabinet" src="../assets/img/ava.jpg">
              <div class="text-dark h3">Леонардо да Винчи</div>
              <div class="ml-5 "><a href="" class="dashed text-grey">Изменить данные</a></div>
            </div>
            <div class="d-flex my-4 user_info">
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
                <div class="text-grey">Компетенция</div>
                <div class="justify-content-between d-flex">Front-end разработка<span class="ml-4">50<span class="text-grey">/100</span><i class="fas fa-times ml-4"></i></span></div>
                <div class="justify-content-between d-flex">Back-end <span>20<span class="text-grey">/100</span><i class="fas fa-times ml-4"></i></span></div>
                <div class="justify-content-between d-flex">Дизайн <span>100<span class="text-grey">/100</span><i class="fas fa-times ml-4"></i></span></div>
              </div>
              <div>
                <div class="text-grey">О себе</div>
                <div class="card shadow about_user">
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
        schedule
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
  $main_grey: #A6A6A6; //Внимательно смотри цвета в макете (удали после прочтения)
  $secondary_grey: #373737;
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

  .user_info > div{
    margin-right: 50px;

    div:first-child{
      color: $main_grey;
    }
  }

  .about_user {
    max-width: 670px;
    font-size: 16px;
  }

  .spec {
    width: 220px;
  }

  .dashed { //пунктирное подчеркивание
    text-decoration: none;
    border-bottom: 1px dashed $main_grey;

     &:hover{
       text-decoration: none;
       color: darken($main_grey,20%);
     }
  }

  .cab_card { //тело вкладки
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-top: 0;
    border-radius: .25rem;
  }

  .ava_cabinet {
    height: 40px;
    width: 40px!important;
    object-fit: cover;
    border-radius: 100%;
    margin-right: 17px;
  }
</style>
