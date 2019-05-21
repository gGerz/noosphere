<template>
  <div>
    <div class="reg_succ">
      <div class="reg_succ__body">
        Вы зарегистрировались
      </div>
    </div>
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
                <!--<div v-show="password.length < 7 && password.length !== 0" class="text-danger font_s">Пароль должен содержать от 7 до 30 символов</div>-->
                <div v-show="passEr" class="text-danger font_s">Введите пароль</div>
                <div v-show="passLongEr" class="text-danger font_s">Пароль должен содержать от 7 до 30 символов</div>
                <div v-show="validPassword && password.length > 0" class="text-danger font_s">Пароль может содержать только цифры или латинские буквы</div>

              </div>
              <div class="form-group">
                <input type="password" class="form-control inputText" required="required" placeholder="Подтвердите пароль" v-model="resetPassword">
                <div v-show="passProfEr" class="text-danger font_s">Пароли не совпадают</div>
              </div>

              <div class="form-group pb-0">
                <input type="text" class="form-control inputText" required="required" aria-describedby="" placeholder="Имя" v-model="name">
                <div v-show="nameEr" class="text-danger font_s">Введите имя</div>
                <div v-show="nameLenEr" class="text-danger font_s">Имя должно содержать от 4 до 30 символов</div>
                <div v-show="validUsername && name.length > 0" class="text-danger font_s">Имя может содержать только русские символы</div>
              </div>
              <div class="form-group ">
                <small id="" class="form-text text-muted">Дата рождения</small>
                <input type="date" class="form-control inputText" required="required" v-model="date" placeholder="Дата рождения">
                <div v-show="dateEr" class="text-danger font_s">Введите дату рождения</div>
              </div>
              <div class="form-group">
                <textarea type="text" class="form-control textarea-resize-n" required="required" placeholder="Описание" rows="4" v-model="about"></textarea>
                <div v-show="aboutLenEr" class="text-danger font_s">Описание не должно превышать 256 символов</div>
              </div>
              <div class="form-group">
                <select id="inputState" class="form-control inputText" v-model="gender">
                  <option selected class="text-grey">Выберите пол...</option>
                  <option>Мужской</option>
                  <option>Женский</option>
                </select>
                <div v-show="genderEr" class="text-danger font_s">Выбирите гендер</div>
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
  </div>
</template>
<script>

  import axios from 'axios'
  export default {
    data(){
      return{
        aboutLenEr: false,
        emailEr: false,
        passEr: false,
        passProfEr: false,
        passLongEr: false,
        passCharEr: false,
        checkEr: false,
        emailServEr: false,
        emailValEr: false,
        mail: '',
        password: '',
        resetPassword: '',
        newId: '',
        checkbox: false,
        passwordValid: null,
        errors: [],
        nameEr: false,
        dateEr: false,
        aboutEr: false,
        genderEr: false,
        name: '',
        date: '',
        about: '',
        gender: 'Выберите пол...',
        genderType: '0',
        nameLenEr: false
      }
    },
    methods: {
      validEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      reg() {

        this.name = $.trim(this.name)
        this.about = $.trim(this.about)

        this.emailEr = false
        this.passEr = false
        this.passLongEr = false
        this.passCharEr = false
        this.passProfEr = false
        this.checkEr = false
        this.emailValEr = false
        this.emailServEr = false

        this.nameEr = false
        this.nameLenEr = false
        this.aboutLenEr = false
        this.dateEr = false
        this.genderEr = false

        if (this.name === '') this.nameEr = true
        else if (this.name.length < 4 || this.name.length > 30) this.nameLenEr = true
        else if (this.about.length > 256) this.aboutLenEr = true
        if (this.date === '') this.dateEr = true
        if (this.gender === 'Выберите пол...') this.genderEr = true


        if (this.mail === '') this.emailEr = true
        else if (!this.validEmail(this.mail)) this.emailValEr = true
        if (this.password === '') this.passEr = true
        else if (this.password.length > 30 || this.password.length < 7) this.passLongEr = true
        else if (this.password !== this.resetPassword) this.passProfEr = true

        if ( this.checkbox === false ) this.checkEr = true
        if ( this.emailEr === false &&
          this.passEr === false &&
          this.passLongEr === false &&
          this.passProfEr === false &&
          this.checkEr === false &&
          this.emailValEr === false &&
          this.gender !== 'Выберите пол...' &&
          this.nameEr === false &&
          this.dateEr === false &&
          this.validPassword === false &&
          this.aboutLenEr === false &&
          this.nameLenEr === false &&
          this.validUsername === false
        ) {
          const formData = new FormData()
          formData.append('email', this.mail)
          formData.append('password', this.password)
          axios({
            method: 'post',
            url: this.$store.state.urlApi + `users`,
            data: formData
          })
            .then(response => {
              if (response.statusText === "Created") {
                this.$store.dispatch('saveUserId', response.data.id)
                this.regNext()
                $('.sign_up_modal').modal('hide');
                this.regSuccMes()
              }
            })
            .catch(response => {
              if (response.message === 'Request failed with status code 422') {
                this.emailServEr = true
              }
            })
        }
      },
      regSuccMes() {
        $( ".reg_succ" ).show()
        setTimeout(() => {
          $( ".reg_succ" ).hide()
        }, 7000);
      },
      regNext() {
        const formData = new FormData()
        formData.set('p_name', this.name)
        formData.set('p_date', this.date)
        formData.set('p_description', this.about)
        formData.set('p_user_id', parseInt(this.$store.state.userId))
        if (this.gender === 'Мужской') this.genderType = 1;
        formData.set('p_gender', this.genderType)
        axios({
          method: 'post',
          url: this.$store.state.urlApi + `profiles`,
          data: formData
        })
          .then(response => {
            if (response.statusText == 'Created') {
              this.$store.dispatch('saveUserProfileId', response.data.p_id)
            }
          })
          .catch(response => {
          })

      }
    },
    mounted() {
      $('.sign_up_modal').on('hide.bs.modal', function (e) {
        e.target.__vue__.mail = ''
        e.target.__vue__.password = ''
        e.target.__vue__.resetPassword = ''
        e.target.__vue__.checkbox = false
        e.target.__vue__.emailValidation = false
        e.target.__vue__.name = ''
        e.target.__vue__.gender = 'Выберите пол...'
        e.target.__vue__.date = ''
        e.target.__vue__.about = ''
      })
    },
    computed: {
      validPassword: function () {
        return !(/^[a-zA-Z0-9]+$/i.test(this.password));
      },
      validUsername: function () {
        return !(/^[а-яА-Я ]+$/i.test(this.name));
      }
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
  .reg_succ {
    position: fixed;
    bottom: 50px;
    right: 120px;
    height: 100px;
    width: 300px;
    background: white;
    border: 1px solid rgba(60,60,60,.26);
    border-radius: 10px;
    z-index: 1115;
    display: none;
  }
  .reg_succ__body{
    padding: 10px 20px;
  }
</style>
