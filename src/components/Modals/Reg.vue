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
        <div class="modal-body signin">
          <div class="py-5 px-5">
            <div class="form-group">
              <input type="email" class="form-control inputText" required="required" aria-describedby="emailHelp" placeholder="Email"  v-model="mail">
            </div>
            <div class="form-group">
              <input type="password" class="form-control inputText" required="required" placeholder="Пароль" v-model="password">
            </div>
            <div class="form-group pb-4">
              <input type="password" class="form-control inputText" required="required" placeholder="Подтвердите пароль" v-model="resetPassword">
            </div>

            <div class="form-field pt-2">
              <label class="text-center d-inline-block">
                <input type="checkbox" name="terms">
                Я принимаю условия <a href="#">Пользовательского соглашения</a>.
              </label>
            </div>
            <div class="pt-3">
              <button type="submit" class="btn btn-primary btn-shadow" @click="reg">Зарегистрировать</button>
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
        mail: '',
        password: '',
        resetPassword: '',
        newId: ''
      }
    },
    methods: {
      reg() {
        if (this.password === this.resetPassword){
          const formData = new FormData()
          formData.append('email', this.mail)
          formData.append('password', this.password)
          axios({
            method: 'post',
            url: `http://192.168.1.150/noosfera/public_html/api/v1/users`,
            data: formData
          })
          .then(response => {
            console.log('Ответ регистрации',response)

            if (response.statusText == "Created") {
              this.mail = ''
              this.password = ''
              this.resetPassword = ''
              this.$store.state.newId = response.data.id
              console.log('Регистрация',response.data.id)
              $('.sign_up_modal').modal('hide');
              $('.sign_up_next_modal').modal('show');
            }
          })
          .catch(response => {
          })
        } else {
          alert('Пароли не совпадают')
        }
      }
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
