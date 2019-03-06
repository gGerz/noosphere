<template>
  <div class="modal fade card_req_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-body py-5 px-2 px-sm-5">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="pb-2">
            <p class="mb-0 font_xl">{{selectedCard.pc_title}}</p>
            <p class="mr-auto mb-0 text-grey font_l" v-if="selectedCard.pcCom !== undefined">{{selectedCard.pcCom.competence}}</p>
          </div>
          <div class="d-flex align-items-center py-3">
            <div>
              <img class="img_master2" src="../../assets/img/ava.jpg" >
              <!-- Пока что будет выдавать ошибку в консоль, тк фотки подгружаются после построения карточек-->
              <!--<img class="img_master2" :src="photos[i].url" > -->
            </div>
            <div>
              <div class="font_m" v-if="selectedCard.pcUser !== undefined">{{selectedCard.pcUser.p_name}}</div>
            </div>
          </div>
          <div class="d-flex py-2">
            <div>
              <span title="Дата">
                <i class="fas fa-calendar-week mr-1 text-grey"></i>
                <span class="">
                    {{selectedCard.pc_date}}
                </span>
              </span>
            </div>
            <div class="ml-4">
              <span title="Время">
                  <i class="far fa-clock mr-1 text-grey"></i>
                  <span class="" v-if="selectedCard.pc_begin_time !== undefined">
                      {{selectedCard.pc_begin_time | deleteSeconds}}
                      -
                      {{selectedCard.pc_end_time | deleteSeconds}}
                  </span>
              </span>
            </div>
          </div>
          <div class="py-2">
            <div class="tag px-2 font_s" v-for="tag in selectedCard.tagCon">{{tag.tag_name}}</div>
          </div>
          <div class="py-2">
            {{selectedCard.pc_description}}
          </div>
          <div class="d-flex pt-3">
            <div class="my-auto ">
              <span class="price">
                {{selectedCard.pc_price | rounded}}
              </span>
              <span class="main_color font_xl">руб</span>
            </div>
            <router-link class="ml-auto" to="/videoroom">
              <span class="btn btn-outline-primary btn-md px-4 btn-buy font_l" v-on:click="closeModal()">Ответить</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      props: ['selectedIndex', 'selectedCard'],
      data(){
          return{

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
      methods: {
        closeModal() {
          $('.card_req_modal').modal('hide');
        }
      }
    }
</script>
<style lang="scss" scoped>
    .inputText {
    }
    .btn-shadow {
        border: 0;
        font-weight: 600;
        color: #fff;
        display: inline-block;
        box-shadow: rgba(23,43,99,.24) 0 7px 28px;
        padding: 12px 23px;
        text-shadow: 1px 1px rgba(0,0,0,.09);
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
        -webkit-transition: all .2s;
        -moz-transition: all .2s;
        -ms-transition: all .2s;
        -o-transition: all .2s;
        transition: all .2s;
    }
    .modal {
        color: #555;
    }

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
        /*cursor: pointer;*/
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

</style>
