<template>
  <div>
    <h2 class="my-4" >Доска консультаций</h2>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4" v-for="(con, i) in cons">
        <div class="card mb-3">
          <div class="card-body cons-body post-wrapper">
            <div style="font-size: 23px;" >
              <p class="text-dark mb-0 cons-title">{{con.title}}</p>
              <p class="mr-auto mb-1 text-grey cons-spec" >{{con.compition}}</p>
            </div>
            <div class="">
              <div class="d-flex align-items-center">
                <div>
                  <img class="img_master2" src="../assets/img/ava.jpg" >
                </div>
                <div>
                  <span class="text-dark">{{con.author}}</span>
                  <div class="h6">
                    <span title="Рейтинг" class="">
                      <i class="fas fa-star mr-1 text-grey"></i>
                      {{con.raiting}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex ">
              <div class="">
                <span title="Дата">
                  <i class="fas fa-calendar-week mr-1 text-grey"></i>
                  <span class="text-dark">
                    {{con.date}}
                  </span>
                </span>
              </div>
              <div class="ml-auto">
                <span title="Время">
                  <i class="far fa-clock mr-1 text-grey"></i>
                  <span class="text-dark">
                    {{con.time}}
                  </span>
                </span>
              </div>
            </div>
            <div class="">
              <div class="tag px-2 " v-for="tag in con.tags">{{tag.title}}</div>
            </div>
            <div class="d-flex">
              <div class="my-auto price">
                <span class="" style="font-size: 23px;">
                  {{con.price}}
                </span>
                <span>руб</span>
              </div>
              <button class="btn btn-outline-primary btn-md ml-auto px-4">Купить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
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
          }
        ],
      }
    }
  }
</script>
<style lang="scss">

  $main_color: #0D84FB;
  $main_grey: #8D8F93;

  body {
    color: #555;
  }

  .text-grey {
    color: $main_grey;

    &-light {
      color: lighten($main_grey,35%);
    }
  }

  .tag {
    background: lighten($main_grey,35%);
    position: relative;
    margin-left: 11px;
    margin-right: 11px;
    height: 24px!important;
    display: inline-flex;
    font-size: 14px;
    align-items: center;
    padding-left: .2rem!important;
    padding-right: .5rem!important;
    margin-bottom: 4px;

    &:hover {
      background: lighten($main_grey,20%);

      &:before{
        border-right: 12px solid lighten($main_grey,20%);
      }
    }

    &:before{
      content: '';
      position: absolute;
      margin-left: -27px;
      border: 12px solid transparent;
      border-right: 12px solid lighten($main_grey,35%);
    }
  }

  .cons-spec {
    font-size: 18px;
  }

  .price {
    color: $main_color;
    font-weight: 600;
  }

  .img_master2 {
    height: 40px;
    width: 40px!important;
    object-fit: cover;
    border-radius: 100%;
    margin-right: 17px;
  }

  .cons-title {
    font-size: 20px;
  }

  .cons-body {
    padding: 20px;
    min-height: 373px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

</style>

