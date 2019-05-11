<template>
  <div class="modal fade card_cons_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-body py-5 cons-body">
          <div class="pb-2 d-flex justify-content-between">
            <div>
              <p class="mb-0 font_xl wrap-break">{{selectedCard.sc_title}}</p>
              <p class="mr-auto mb-0 text-grey font_l" v-if="selectedCard.scCom !== undefined">{{selectedCard.scCom.competence}}</p>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close justify-content-end d-flex">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="d-flex align-items-center py-3">
            <router-link to="/anotherone">
              <span @click="closeModal">
                <img class="img_master2" src="../../assets/img/ava.jpg" >
              </span>
            </router-link>
            <div>
              <div class="font_m card-item-name text-truncate" v-if="selectedCard.scUser !== undefined">{{selectedCard.scUser.p_name}}</div>
              <div class="m-0" title="Рейтинг font_m">
                <div class="d-flex">
                  <div class="mx-2">
                    <i class="far fa-thumbs-up"></i>
                    {{selectedCard.sc_like}}
                  </div>
                  <div class="mx-2">
                    <i class="far fa-thumbs-down"></i>
                    {{selectedCard.sc_like}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex py-2 flex-wrap">
            <div class="cons__date-line">
              <span title="Дата" >
                <i class="fas fa-calendar-week mr-1 text-grey"></i>
                <span class="">
                    {{selectedCard.sc_date}}
                </span>
              </span>
            </div >
            <div class="cons__date-line">
              <span title="Время">
                  <i class="far fa-clock mr-1 text-grey"></i>
                  <span class="" v-if="selectedCard.sc_begin_time !== undefined">
                      {{selectedCard.sc_begin_time | deleteSeconds}}
                      -
                      {{selectedCard.sc_end_time | deleteSeconds}}
                  </span>
              </span>
            </div>
          </div>
          <div class="py-2">
            <div class="tag px-2 font_s" v-for="tag in selectedCard.tagConsultation">{{tag.tag_name}}</div>
          </div>
          <div class="py-2 wrap-break">
            {{selectedCard.sc_description}}
          </div>
          <div class="d-flex justify-content-between pt-3">
            <div class="my-auto ">
                <span class="price">
                  {{selectedCard.sc_price | rounded}}
                </span>
              <span class="main_color font_xl">руб</span>
            </div>

            <div class="ml-auto" v-if="$store.state.authorisedStatus">
              <span v-if="$store.state.userId == selectedCard.sc_user_id" class="btn btn-outline-secondary btn-md px-4 btn-buy font_l">Мое</span>
              <div v-else-if="inDate(selectedCard.sc_date) && inTime(selectedCard.sc_begin_time,selectedCard.sc_end_time) ">
                <span class=" btn btn-outline-primary btn-md px-4 btn-buy font_l" @click="createCons(i)">Купить</span>
              </div>
              <div v-else>
                <span class=" btn btn-outline-secondary btn-md px-4 btn-buy font_l">Не время</span>
              </div>
            </div>
            <!--<router-link class="btn btn-outline-primary m-2 my-sm-0" data-toggle="modal" data-target=".arbitration_modal" to="/videoroom">Video</router-link>-->
            <!--<router-link target="_blank" :to="{ path: 'offer', query: {id: data.item.id }}">-->
            <!--<router-link class="ml-auto " target="_blank">-->
            <!--<span v-if="$store.state.userId == selectedCard.sc_user_id" class="btn btn-outline-secondary btn-md px-4 btn-buy font_l">Мое</span>-->
            <!--<span v-else class="btn btn-outline-primary btn-md px-4 btn-buy font_l" v-on:click="createCons()">Купить</span>-->
            <!--</router-link>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import VideoRoom from '../../pages/VideoRoom'

  export default {
    components: {
      VideoRoom
    },
    props: ['selectedIndex', 'selectedCard'],
    data(){
      return{
        selectedProf: '',
        postTitle: '',
        postDescription: '',
        postUserId: '',
        postDate: '',
        postBeginTime: '',
        postEndTime: '',
        postPrice: '',
        postComId: '',
        putId: '',
        sellId: '',
        purId: '',
        consId: '',
        date: ''
      }
    },
    filters: {
      rounded(value){
        return parseInt(value * 100) / 100
      },
      deleteSeconds(value){
        return value.slice(0, -3)
      }
    },
    methods: {
      inTime(begin ='', end='') {
        const beginH = +(begin[0] + begin[1])
        const endH = +(end[0] + end[1])
        const beginM = +(begin[3] + begin[4])
        const endM = +(end[3] + end[4])
        if (this.$store.state.now.time.h > beginH && this.$store.state.now.time.h < endH) return true
        if (((this.$store.state.now.time.h == beginH) && (this.$store.state.now.time.m >= beginM)) || ((this.$store.state.now.time.h == endH) && (this.$store.state.now.time.m <= endM))) return true
        return false
      },
      inDate(date) {
        if (this.$store.state.now.date === date) {
          return true
        }
        else return false
      },
      closeModal(){
        $('.card_cons_modal').modal('hide')
      },
      createCons() {
        this.idOtherUser = this.selectedCard.sc_user_id
        const formData = new FormData()
        formData.append('pc_title', this.selectedCard.sc_title)
        formData.append('pc_user_id', this.$store.state.userId)
        formData.append('pc_date', this.selectedCard.sc_date)
        formData.append('pc_begin_time', this.selectedCard.sc_begin_time)
        formData.append('pc_end_time', this.selectedCard.sc_end_time)
        formData.append('pc_price', this.selectedCard.sc_price)
        formData.append('pc_description', this.selectedCard.sc_description)
        formData.append('pc_com_id', this.selectedCard.sc_com_id)
        formData.append('pc_type', 2)
        axios({
          method: 'post',
          url: this.$store.state.urlApi + `purchases`,
          data: formData
        })
            .then(response => {
              if (response.status === 201) {
                this.sellId = this.selectedCard.sc_id
                this.purId = response.data.pc_id

                //отправка пут запроса
                let payload = {
                  'sc_type': 2
                };

                axios({
                  method: 'PUT',
                  url: this.$store.state.urlApi + `sellings/` + this.sellId,
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
          url: this.$store.state.urlApi + `consultations`,
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
          url: this.$store.state.urlApi + `notifications`,
          data: formData
        })
          .then(response => {
            console.log(response)
          })
          .catch(response => {
          })
      },
      //создаем пропы, которые будем отправлять для создания покупки
      // setProps(){
      //   this.postTitle = this.selectedCard.sc_title
      //   this.postDescription = this.selectedCard.sc_description
      //   this.postUserId = this.selectedCard.sc_user_id
      //   this.postPrice = this.selectedCard.sc_price
      //   this.postComId = this.selectedCard.sc_com_id
      //   this.postDate = this.selectedCard.sc_date
      //   this.postBeginTime = this.selectedCard.sc_begin_time
      //   this.postEndTime = this.selectedCard.sc_end_time
      //   this.sellId = this.selectedCard.sc_id
      // }
    },
    mounted() {
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
