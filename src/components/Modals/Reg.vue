<template>
  <div class="modal fade sign_up_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
    <div class="modal-dialog " role="document">
      <div class="modal-content ">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel1">Регистрация</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body py-0 signin-page">
          <div class="wrapper">
            <div class="header mt-5">
              <!--<a href="index.html" class="logo">-->
              <!--<img src="images/logo-alt-b.png" />-->
              <!--</a>-->
            </div>
              <!--<div class="form-field">-->
              <!--<input type="text" placeholder="Имя" required="required">-->
              <!--</div>-->
              <!--<div class="form-field">-->
              <!--<input type="text" placeholder="Телефон" required="required">-->
              <!--</div>-->

              <div class="form-field">
                <input type="email" placeholder="Email" required="required" v-model="mail">
              </div>
              <div class="form-field">
                <input type="password" placeholder="Пароль" required="required" v-model="password">
              </div>
              <div class="form-field">
                <input type="password" placeholder="Подтвердите пароль" required="required">
              </div>
              <div class="form-field">
                <label class="terms">
                  <input type="checkbox" name="terms">
                  Я принимаю условия <a href="#">Пользовательского соглашения</a>.
                </label>
              </div>
              <div class="form-action">
                <button class="btn btn-success" @click="login">Войти</button>
              </div>
              <div class="form-bottom">
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
        mail: '',
        password: '',
        resetPassword: '',
      }
    },
    methods: {
      login() {
        const formData = new FormData()
        formData.append('email', this.mail)
        formData.append('password', this.password)
        axios({
          method: 'post',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/users`,
          // url: `http://192.168.1.150/noosfera/public_html/api/v1/user/login`, АВТОРИЗАЦИЯ ТОЖЕ
          data: formData
        })
          .then(response => {
          })
          .catch(response => {

          })

      }
    }
  }
</script>
