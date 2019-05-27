<template>
  <div class="modal fade change_user_password_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
    <div class="modal-dialog " role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel1">Изменить пароль</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body signin py-5 px-2 px-sm-5">
          <div class="form-group ">
            <small class="form-text text-muted">Новый пароль</small>
            <input type="password" class="form-control inputText" required="required" v-model="password" placeholder="Введите новый пароль">
          </div>
          <div class="form-group ">
            <small class="form-text text-muted">Повторите новый пароль</small>
            <input type="password" class="form-control inputText" required="required" v-model="passwordAgain" placeholder="Повторите новый пароль">
            <small v-if="error" class="text-danger form-text text-muted">пароли не совпадают</small>
          </div>
        </div>
        <div class="form-group d-flex justify-content-center">
          <button class="btn btn-primary" @click="updateUserPassword">Изменить</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data() {
      return{
        error: false,
        password: '',
        passwordAgain: ''
      }
    },
    methods: {
      //Обновление пароля юзера
      updateUserPassword(){
        if (this.password !== this.passwordAgain){
          this.error = true
          return
        }
        let payload1 = {
          'password': this.password,
        };
        axios({
          method: 'PUT',
          url: this.$store.state.urlApi + `users/` + this.$store.state.userId,
          headers: {
            'Content-Type': 'application/json'
          },
          data: payload1
        })
            .then(response => {
              $('.change_user_password_modal').modal('hide'); //закрытие модального окна
              this.error = false
            })
            .catch(response => {
              $('.change_user_password_modal').modal('hide'); //закрытие модального окна
            })
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
</style>
