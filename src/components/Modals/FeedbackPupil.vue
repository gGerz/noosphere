<template>
    <div class="modal fade feedback_pupil_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
        <div class="modal-dialog " role="document">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel1">Отзыв</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body py-5 px-2 px-sm-5">
                    <div class="feedback_radio pb-3">
                        <div class="">
                            <input type="radio" name="radio" id="radio1" value="good" v-model="radioFeedBack">
                            <label for="radio1" class="py-2 px-3">
                                <i class="far fa-thumbs-up"></i>
                                Мне понравилась консультация
                            </label>
                        </div>
                        <div class="">
                            <input type="radio" name="radio" id="radio2" value="bad" v-model="radioFeedBack">
                            <label for="radio2" class="py-2 px-3">
                                <i class="far fa-thumbs-down"></i>
                                Мне не понравилась консультация
                            </label>
                        </div>
                    </div>
                    <div v-if="radioFeedBack === 'bad'" class="form-group pb-3 transition">
                        <label class="m-0">Почему вам не понравилась консультация?</label>
                        <textarea v-model="reason" class="form-control textarea-resize-n" rows="5"></textarea>
                    </div>
                    <div class="">
                        <button class="btn btn-primary btn-shadow" @click="feedback">Отправить</button>
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
          radioFeedBack: '',
          reason: '',
        };
      },
      methods: {
          feedback(){
              if (this.radioFeedBack === 'good'){
                  this.goodMark()
              } else if (this.radioFeedBack === 'bad') {
                  this.badMark()
              }
            },
          goodMark(){


              $('.feedback_pupil_modal').modal('hide')
              this.$router.push('/')
              localStorage.removeItem('currentConsultation')

              // var hash = '';
              // var possible = "abcdefghijklmnopqrstuvwxyz";
              //
              // for( var i=0; i <= 50; i++ ){
              //     hash += possible.charAt(Math.floor(Math.random() * possible.length));
              // }
              // const formData = new FormData()
              // formData.append('a_con_id', localStorage.getItem('currentConsultation'))
              // formData.append('a_date', new Date().getTime())
              // formData.append('a_status', 2)
              // formData.append('a_hash_video', hash)
              // axios({
              //     method: 'post',
              //     url: this.$store.state.urlApi + `archives`,
              //     data: formData
              // })
              //     .then(response => {
              //         $('.feedback_pupil_modal').modal('hide')
              //         this.$router.push('/')
              //         localStorage.removeItem('currentConsultation')
              //
              //     })
              //     .catch(response => {
              //     })
          },
          badMark(){
              var hash = '';
              var possible = "abcdefghijklmnopqrstuvwxyz";
              for( var i=0; i <= 50; i++ ){
                  hash += possible.charAt(Math.floor(Math.random() * possible.length));
              }
              const formData = new FormData()
              formData.append('a_con_id', localStorage.getItem('currentConsultation'))
              formData.append('a_date', new Date().getTime())
              formData.append('a_status', 3)
              formData.append('a_hash_video', hash)
              formData.append('a_reason', this.reason)
              axios({
                  method: 'post',
                  url: this.$store.state.urlApi + `archives`,
                  data: formData
              })
                  .then(response => {
                      $('.feedback_pupil_modal').modal('hide')
                      this.$router.push('/')
                      localStorage.removeItem('currentConsultation')

                  })
                  .catch(response => {
                  })
          }

    }
    }
</script>
<style lang="scss" scoped>
    .transition {
        transition: all 1s;
    }
    .inputText {
        height: 52px;
    }
    .btn-shadow {
        width: 100%;
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

    .feedback_radio label {
        width: 100%;
        border-radius: 6px;
        border: 2px solid #D1D3D4;
        font-weight: normal;
    }
    .feedback_radio input[type="radio"]:empty {
        display: none;
    }
    .feedback_radio input[type="radio"]:checked ~ label {
        color: #15a7f1;
    }
</style>
