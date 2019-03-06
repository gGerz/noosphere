<template>
  <div class="modal fade sign_up_modal"  tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
    <div class="modal-dialog " role="document">
      <div class="modal-content ">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel1">Регистрация</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body signin">
          <div class="py-5 px-5">
            <div class="form-group">
              <input type="email" class="form-control inputText" required="required" aria-describedby="emailHelp" placeholder="Email" v-model="mail">
              <div v-show="emailEr" class="text-danger font_s">Введите email</div>
              <div v-show="emailValEr" class="text-danger font_s">Введите корректный email</div>
              <div v-show="emailServEr" class="text-danger font_s">Такой email уже занят</div>

            </div>
            <div class="form-group">
              <input type="password" class="form-control inputText" required="required" placeholder="Пароль" v-model="password">
              <div v-show="passEr" class="text-danger font_s">Введите пароль</div>
            </div>
            <div class="form-group pb-4">
              <input type="password" class="form-control inputText" required="required" placeholder="Подтвердите пароль" v-model="resetPassword">
              <div v-show="passProfEr" class="text-danger font_s">Пароли не совподают</div>
            </div>

            <div class="form-field pt-2">
              <label class="text-center d-inline-block">
                <input type="checkbox" name="terms" v-model="checkbox">
                Я принимаю условия <a href="#">Пользовательского соглашения</a>.
              </label>
              <div v-show="checkEr" class="text-danger font_s">Вы должны принять пользовательское соглашение</div>
            </div>
            <div class="pt-3">
              <button type="submit" class="btn btn-primary btn-shadow" @click="reg">Зарегистрировать</button>
            </div>
            <div v-for="error in errors" class="">
              {{error}}
            </div>
            <div class="text-center pt-3">
              Уже есть аккаунт?
              <a href="#" data-toggle="modal" data-target=".sign_in_modal" data-dismiss="modal">Войти</a>
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
        emailEr: false,
        passEr: false,
        passProfEr: false,
        checkEr: false,
        emailServEr: false,
        emailValEr: false,
        mail: '',
        password: '',
        resetPassword: '',
        newId: '',
        checkbox: false,
        errors: []
      }
    },
    methods: {
      validEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      reg() {
        this.emailEr = false
        this.passEr = false
        this.passProfEr = false
        this.checkEr = false
        this.emailValEr = false
        this.emailServEr = false
        if (this.mail == '') this.emailEr = true
        else if (!this.validEmail(this.mail)) this.emailValEr = true
        if (this.password == '') this.passEr = true
        else if (this.password !== this.resetPassword) this.passProfEr = true
        if (this.checkbox === false) this.checkEr = true
        if ( this.emailEr === false &&
                this.passEr === false &&
                this.passProfEr === false &&
                this.checkEr === false &&
                this.emailValEr === false
        ) {
          const formData = new FormData()
          formData.append('email', this.mail)
          formData.append('password', this.password)
          axios({
            method: 'post',
            url: `http://192.168.1.150/noosfera/public_html/api/v1/users`,
            data: formData
          })
            .then(response => {
              console.log(response)
              console.log('Id нового пользователя',response.data.id)
              if (response.statusText == "Created") {
                this.mail = ''
                this.password = ''
                this.resetPassword = ''
                this.$store.dispatch('saveUserId', response.data.id)
                // this.$store.state.newId = response.data.id
                // console.log('Регистрация',response.data.id)
                $('.sign_up_modal').modal('hide');
                $('.sign_up_next_modal').modal('show');
              }
            })
            .catch(response => {
              if (response.message == 'Request failed with status code 422') {
                this.emailServEr = true
              }
              console.log(this)
            })
        }
      },
      // reg() {
      //   if (this.password !== '' && this.resetPassword !== '' && this.mail !== '') {
      //     if (this.password === this.resetPassword){
      //       if(this.checkbox) {
      //         const formData = new FormData()
      //         formData.append('email', this.mail)
      //         formData.append('password', this.password)
      //         axios({
      //           method: 'post',
      //           url: `http://192.168.1.150/noosfera/public_html/api/v1/users`,
      //           data: formData
      //         })
      //           .then(response => {
      //             console.log(response)
      //             console.log('Id нового пользователя',response.data.id)
      //             if (response.statusText == "Created") {
      //               this.mail = ''
      //               this.password = ''
      //               this.resetPassword = ''
      //               this.$store.dispatch('saveUserId', response.data.id)
      //               // this.$store.state.newId = response.data.id
      //               // console.log('Регистрация',response.data.id)
      //               $('.sign_up_modal').modal('hide');
      //               $('.sign_up_next_modal').modal('show');
      //             }
      //
      //           })
      //           .catch(response => {
      //             if (response.message == 'Request failed with status code 422') {
      //               this.emailEr = true
      //             }
      //             console.log(this)
      //           })
      //       }
      //       else {
      //         alert('Вы должны принять пользовательское соглашение')
      //       }
      //     } else {
      //       this.passProfEr = true
      //     }
      //   }
      //   else alert('Заполните все поля')
      // }
    },
    mounted() {
      console.log('опа',this)
      $('.sign_up_modal').on('hide.bs.modal', function (e) {
        e.target.__vue__.mail = ''
        e.target.__vue__.password = ''
        e.target.__vue__.resetPassword = ''
        e.target.__vue__.checkbox = false
        e.target.__vue__.emailValidation = false
      })
    }
  }
</script>
<style lang="scss" scoped>
  $font_s: 14px;
  .font_s {font-size: $font_s;}
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
