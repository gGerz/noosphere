<template>
  <div>
    <h2 class="my-4 font_xxl" >Арбитраж</h2>
    <div class="card mb-3" v-for="(item, i) in arbitrageList">
      <div class="card-body d-flex row">
        <div class="col-12 col-lg-9">
          <div class="pb-2">
            <p class="mb-0 font_xl">{{item.aCon.conSc.sc_title}}</p>
            <p class="mr-auto mb-0 text-grey font_l" >{{item.aCon.conSc.scCom.competence}}</p>
          </div>
          <div class="py-3">
            <div class="font_m item-body">
              <div>
                <span class="text-grey">Учитель</span>
              </div>
              <div>
                {{item.aCon.conSc.scUser.p_name}}
              </div>
            </div>
            <div class="font_m item-body">
              <div>
                <span class="text-grey">Ученик</span>
              </div>
              <div>
                {{item.aCon.conPc.pcUser.p_name}}
              </div>
            </div>
          </div>
          <div class="d-flex py-2">
            <div>
            <span title="Дата">
              <i class="fas fa-calendar-week mr-1 text-grey"></i>
              <span class="">
                  {{item.aCon.con_date}}
              </span>
            </span>
            </div>
            <div class="ml-4">
            <span title="Время">
              <i class="far fa-clock mr-1 text-grey"></i>
              <span class="">
                  {{item.aCon.con_begin_time}}
              </span>
            </span>
            </div>
          </div>
          <div class="pt-2">
            <div class="text-grey">Описание ученика:</div>
            <div class="card about_user mb-4 mb-lg-0">
              <div class="card-body">
                <span>{{item.a_reason}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-3">
          <div class="flex-column flex-sm-row d-flex align-items-center align-items-sm-end  flex-lg-column justify-content-between h-100">
            <button type="button" class="btn btn-danger">Запись консультации</button>
            <div class=" d-flex flex-column mt-auto">
              <div class="text-center">Вердикт:</div>
              <button type="button" class="btn btn-outline-primary w-100 mb-1" @click="verdict(i, item.a_id)">Прав ученик</button>
              <button type="button" class="btn btn-outline-success w-100" @click="verdict(i, item.a_id)">Прав консультант</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data(){
      return {
        arbitrageList: []
      }
    },
    methods: {
      getArbitrageList(){
        axios({
          method: 'get',
          url: this.$store.state.urlApi + `archives`
        })
            .then((response) => {
              this.arbitrageList = response.data
            })
            .catch((error) => {
              console.error(error)
            })
      },
      verdict(i, id){
        //отправка пут запроса
        let payload = {
          'a_status': 2
        };
        axios({
          method: 'PUT',
          url: this.$store.state.urlApi + `archives/`+ id,
          headers: {
            'Content-Type': 'application/json'
          },
          data: payload
        })
            .then(response => {
              this.arbitrageList.splice(i, 1)
            })
            .catch(response => {
            })
      }
    },
    mounted(){
      this.getArbitrageList()
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

  .item-body {
    display: flex;
    div:first-child {
      width: 150px;
    }
    div:nth-child(2) {
      width: 280px;
    }
  }

  .about_user {
    max-width: 650px;
    font-size: 16px;
    border-radius: 15px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 575px) {
    .item-body {
      display: block;
    }
  }

</style>
