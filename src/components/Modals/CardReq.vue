<template>
  <div class="modal fade card_req_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-body py-5 cons-body">
          <div class="pb-2 d-flex justify-content-between">
            <div>
              <p class="mb-0 font_xl wrap-break">{{selectedCard.pc_title}}</p>
              <p class="mr-auto mb-0 text-grey font_l" v-if="selectedCard.pcCom !== undefined">{{selectedCard.pcCom.competence}}</p>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close justify-content-end d-flex">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="d-flex align-items-center py-3">
            <div>
              <img class="img_master2" src="../../assets/img/ava.jpg" >
            </div>
            <div>
              <div class="font_m card-item-name text-truncate" v-if="selectedCard.pcUser !== undefined">{{selectedCard.pcUser.p_name}}</div>
            </div>
          </div>
          <div class="d-flex py-2 flex-wrap">
            <div class="cons__date-line">
              <span title="Дата" >
                <i class="fas fa-calendar-week mr-1 text-grey"></i>
                <span class="">
                    {{selectedCard.pc_date}}
                </span>
              </span>
            </div >
            <div class="cons__date-line">
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
          <div class="py-2 wrap-break">
            {{selectedCard.pc_description}}
          </div>
          <div class="d-flex pt-3">
            <div class="my-auto ">
              <span class="price">
                {{selectedCard.pc_price | rounded}}
              </span>
              <span class="main_color font_xl">руб</span>
            </div>
            <span v-if="$store.state.userId == selectedCard.pc_user_id" class="ml-auto btn btn-outline-secondary btn-md px-4 btn-buy font_l">Мое</span>
            <span v-else class="ml-auto btn btn-outline-primary btn-md px-4 btn-buy font_l" @click="createCons()">Купить</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
    export default {
      data() {
        return {
          putId: '',
          sellId: '',
          purId: '',
          consId: '',
          idOtherUser: '',
          reqs: '',
        }
      },
      props: ['selectedIndex', 'selectedCard'],
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
        },
        createCons(i) {
          this.idOtherUser = this .selectedCard.pc_user_id
          const formData = new FormData()
          formData.append('sc_title', this.selectedCard.pc_title)
          formData.append('sc_user_id', this.selectedCard.pc_user_id)
          formData.append('sc_date', this.selectedCard.pc_date)
          formData.append('sc_begin_time', this.selectedCard.pc_begin_time)
          formData.append('sc_end_time', this.selectedCard.pc_end_time)
          formData.append('sc_price', this.selectedCard.pc_price)
          formData.append('sc_description', this.selectedCard.pc_description)
          formData.append('sc_com_id', this.selectedCard.pc_com_id)
          formData.append('sc_type', 2)
          axios({
            method: 'post',
            url: `http://192.168.1.150/noosfera/public_html/api/v1/sellings`,
            data: formData
          })
            .then(response => {
              if (response.status === 201) {
                console.log(response)
                this.sellId = response.data.sc_id
                this.purId = this.selectedCard.pc_id

                //отправка пут запроса
                let payload = {
                  'pc_type': 2
                };

                axios({
                  method: 'PUT',
                  url: `http://192.168.1.150/noosfera/public_html/api/v1/purchases/` + this.purId,
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  data: payload
                })
                  .then(response => {
                    this.createConId()
                    this.closeModal()
                  })
                  .catch(response => {
                  })
              }
            })
            .catch(error => {
              console.log(error)
              alert('Ошибка сервера, консультация не создана')
            })
        },
        createConId() {
          const formData1 = new FormData()
          formData1.set('con_sc_id', this.sellId)
          formData1.set('con_pc_id', this.purId)
          axios({
            method: 'post',
            url: `http://192.168.1.150/noosfera/public_html/api/v1/consultations`,
            data: formData1
          })
            .then(response => {
              this.consId = response.data.con_id
              if (response.status === 201) {
                this.sendNotification()
                localStorage.setItem('currentConsultation', this.consId)
                this.$router.push('/videoroom')
                var myWin= open('https://appear.in/noospherevideochat');
              }
            })
            .catch(response => {
            })
        },
        sendNotification() {
          const formData = new FormData()
          formData.set('n_con_id', this.consId) //id созданной консультации
          formData.set('n_selling_user_id', this.idOtherUser) //id другой
          formData.set('n_purchase_user_id', this.$store.state.userId) //id мой
          formData.set('n_type', 'selling') // тип
          axios({
            method: 'post',
            url: `http://192.168.1.150/noosfera/public_html/api/v1/notifications`,
            data: formData
          })
            .then(response => {
              console.log(response)
            })
            .catch(response => {
            })
        },
      },
      mounted() {
        $('.card_cons_modal').on("show.bs.modal", this.setProps)
      }
    }
</script>
<style lang="scss" scoped>
  .fas, .far   {
    min-width: 15px;
  }
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

  .cons__date-line {
    min-width: 200px!important;
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
  .card-item-name {
    width: 330px;
  }
  .wrap-break {
    word-wrap: break-word;
  }
</style>
