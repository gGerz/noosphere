<template>
  <div class="modal fade sign_in_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
    <div class="modal-dialog " role="document">
      <div class="modal-content ">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel1">Вход</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body signin">
          <div class="py-5 px-5">
            <div class="form-group">
              <input type="email" class="form-control inputText" required="required" aria-describedby="emailHelp" placeholder="Email" v-model="mail">
              <div v-show="mailEr" class="text-danger font_s">Введите email</div>
              <div v-show="mailValEr" class="text-danger font_s">Введите корректный email</div>
            </div>
            <div class="form-group pb-4">
              <input type="password" class="form-control inputText" required="required" placeholder="Пароль" v-model="password">
              <div v-show="passEr" class="text-danger font_s">Введите пароль</div>
              <div v-show="passCorEr" class="text-danger font_s">Неверный email или пароль</div>
            </div>
            <button type="submit" class="btn btn-primary btn-shadow" @click="login">Войти</button>
            <div class="text-center">
              <div class="form-bottom pt-4">
                <a href="#" @click="sad = true">Забыли пароль?</a>
                <div v-show="sad" class="font_s">Очень жаль.</div>
              </div>
              <div class="form-bottom pt-4">
                У вас еще нет аккаунта?
                <a href="#" data-toggle="modal" data-target=".sign_up_modal" data-dismiss="modal">Зарегистрироваться</a>
              </div>
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
      return{
        mail: '',
        password: '',
        mailEr: false,
        passEr: false,
        passCorEr: false,
        mailValEr: false,
        sad: false
      }
    },
    methods: {
      validEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      login() {
        this.mailEr = false
        this.passEr = false
        this.mailValEr = false
        this.passCorEr = false
        if (this.mail === '') this.mailEr = true
        else if (!this.validEmail(this.mail)) this.mailValEr = true
        if (this.password === '') this.passEr = true
        if (this.mailEr === false && this.passEr === false && this.mailValEr === false) {
          const formData = new FormData()
          formData.append('email', this.mail)
          formData.append('password', this.password)
          axios({
            method: 'post',
            url: `http://192.168.1.150/noosfera/public_html/api/v1/user/login`,
            data: formData
          })
                  .then(response => {
                    if (response.data.success === true){
                      $('.sign_in_modal').modal('hide'); //закрытие модального окна
                      this.$store.dispatch('login', response.data.data)
                      this.$store.dispatch('saveUserId', response.data.id)
                      console.log('auth', response)
                      if (response.data.p_id.p_id !== null){
                        this.$store.dispatch('saveUserProfileId', response.data.p_id.p_id)
                      }
                      //this.setComps() //установка доступных компетенций
                    }
                    else if (response.data.message === 'Incorrect password' || response.data.message === 'Incorrect email') this.passCorEr = true

                  })
                  .catch(error => {
                  })
        }
      },
      // setComps (){
      //   // Информация юзера
      //   axios({
      //     method: 'get',
      //     url: `http://192.168.1.150/noosfera/public_html/api/v1/profiles/` + this.$store.state.userInfo + '?expand=cpCom',
      //     headers: {'Authorization': `Bearer ${localStorage.token}`}
      //   })
      //       .then((response) => {
      //         this.$store.state.userComp = response.data
      //       })
      //       .catch((error) => {
      //         console.error(error)
      //       })
      // },
    },
      mounted() {
          $('.sign_in_modal').on('hide.bs.modal', function (e) {
              e.target.__vue__.mail = ''
              e.target.__vue__.password = ''
              e.target.__vue__.sad = false
          })
      }
  }
</script>
<style lang="scss" scoped>
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
</style>
