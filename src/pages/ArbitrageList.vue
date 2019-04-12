<template>
  <div>
    <h2 class="my-4 font_xxl" >Арбитраж</h2>
    <div class="card mb-3" v-for="item in arbitrageList">
      <div class="card-body d-flex">
        <div class="w-100">
          <div class="pb-2">
            <p class="mb-0 font_xl">{{item.title}}</p>
            <p class="mr-auto mb-0 text-grey font_l" >{{item.comp}}</p>
          </div>
          <div class="py-3">
            <div class="row font_m pb-2">
              <div class="col-2">
                <span class="text-grey">Консультант</span>
              </div>
              <div class="col-4">
                {{item.teacher}}
              </div>
            </div>
            <div class="row font_m">
              <div class="col-2">
                <span class="text-grey">Ученик</span>
              </div>
              <div class="col-4">
                {{item.student}}
              </div>
            </div>
          </div>
          <div class="d-flex py-2">
            <div>
            <span title="Дата">
              <i class="fas fa-calendar-week mr-1 text-grey"></i>
              <span class="">
                  {{item.date}}
              </span>
            </span>
            </div>
            <div class="ml-4">
            <span title="Время">
              <i class="far fa-clock mr-1 text-grey"></i>
              <span class="">
                  {{item.time}}
              </span>
            </span>
            </div>
          </div>
          <div class="pt-2">
            <div class="text-grey">Описание ученика:</div>
            <div>{{item.reason}}</div>
          </div>
        </div>
        <div class="align-items-end d-flex flex-column mt-auto">
          <button type="button" class="btn btn-primary w-100 mb-1">Прав ученик</button>
          <button type="button" class="btn btn-success w-100">Прав консультант</button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        arbitrageList: [
          {teacher: 'Max', student: 'German', title: 'Научу вертать', comp: 'Вертатель', reason: 'Преподаватель все время матерился и показывал всякое', date: '31.03.2019', time: '12:00'},
          {teacher: 'Max', student: 'German', title: 'Научу вертать', comp: 'Вертатель', reason: 'Преподаватель все время матерился и показывал всякое', date: '31.03.2019', time: '12:00'}
        ]
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

  .schedule-item{
    box-shadow: 0px 1px 4px rgba(13, 132, 251, 0.2);
    border: 1px solid grey;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
  }

</style>
