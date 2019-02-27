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
            </div>
            <div class="form-group pb-4">
              <input type="password" class="form-control inputText" required="required" placeholder="Пароль" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary btn-shadow" @click="login">Войти</button>
            <div class="text-center">
              <div class="form-bottom pt-4">
                <a href="">Забыли пароль?</a>
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
            if (response.data.success === true){
              $('.sign_in_modal').modal('hide'); //закрытие модального окна
              this.$store.state.userName = response.data.p_id.p_id
              this.$store.dispatch('login', response.data.data)
              this.$store.dispatch('saveUserId', response.data.p_id.p_id)
              this.setComps() //установка доступных компетенций
            }
          })
          .catch(error => {

          })

      },
      setComps (){
        // Информация юзера
        axios({
          method: 'get',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/profiles/` + this.$store.state.userInfo + '?expand=cpCom',
          headers: {'Authorization': `Bearer ${localStorage.token}`}
        })
            .then((response) => {
              this.$store.state.userComp = response.data
            })
            .catch((error) => {
              console.error(error)
            })
      },
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
