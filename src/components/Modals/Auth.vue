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
        <div class="modal-body signin-page">
          <div class="wrapper">
            <div class="header">
            </div>
              <div class="form-field">
                <input type="email" placeholder="Email" v-model="mail">
              </div>
              <div class="form-field">
                <input type="password" placeholder="Пароль" v-model="password">
              </div>
              <div class="form-action">
                <button class="btn btn-success" @click="login">Войти</button>
              </div>
              <div class="form-bottom">
                <a href="">Забыли пароль?</a>
              </div>
              <div class="form-bottom">
                У вас еще нет аккаунта?
                <a href="#" data-toggle="modal" data-target=".sign_up_modal" data-dismiss="modal">Зарегистрироваться</a>
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
      }
    },
    methods: {
      login() {
        const formData = new FormData()
        formData.append('email', this.mail)
        formData.append('password', this.password)
        axios({
          method: 'post',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/user/login`,
          data: formData
        })
          .then(response => {
            localStorage.setItem('token', response.data.data)
            console.log(localStorage.getItem('token'))
          })
          .catch(error => {

          })

      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
