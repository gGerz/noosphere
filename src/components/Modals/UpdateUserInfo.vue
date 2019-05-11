<template>
  <div class="modal fade update_user_info_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
    <div class="modal-dialog " role="document">
      <div class="modal-content ">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel1">Изменение личных данных</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body change">
          <div class="px-5">
            <div class="form-group pb-0">
              <small class="form-text text-muted">E-mail</small>
              <input type="email" class="form-control inputText" required="required" aria-describedby="" placeholder="Имя" v-model="mail">
            </div>
            <div class="form-group pb-0">
              <small class="form-text text-muted">Имя</small>
              <input type="text" class="form-control inputText" required="required" aria-describedby="" placeholder="Имя" v-model="name">
            </div>
            <div class="form-group ">
              <small class="form-text text-muted">Дата рождения</small>
              <input type="date" class="form-control inputText" required="required" v-model="date" placeholder="Дата рождения">
            </div>
            <div class="form-group">
              <small class="form-text text-muted">О себе</small>
              <textarea class="form-control textarea-resize-n" required="required" placeholder="О себе" rows="4" v-model="about"></textarea>
            </div>
            <div class="form-group">
              <small class="form-text text-muted">Пол</small>
              <vue-select v-model="selectedGender" label="title" :options="gender" placeholder="Выберите пол"  style="display: block">
                <template id="style-2" slot="option" slot-scope="option" class="modal-body__select mt-5" >
                  <div class="py-1">{{ option.title }}</div>
                </template>
                <span slot="no-options">Ничего не найдено</span>
              </vue-select>
            </div>
            <div class="pt-5">
              <button type="submit" class="btn btn-primary btn-shadow" :disabled="date.length <= 0" @click="updateUserInfo">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import VueSelect from 'vue-select'

  export default {
    props: ['userInfo'],
    components: {
      VueSelect
    },
    data(){
      return{
        mail: '',
        password: '',
        name: '',
        date: '',
        about: '',
        selectedGender: '',
        gender: [
          {value: true, title: 'Мужской'},
          {value: false, title: 'Женский'},
        ]
      }
    },
    methods: {
      setProps(){
        this.mail = this.userInfo.pUser.email
        this.name = this.userInfo.p_name
        this.date = this.userInfo.p_date
        this.about = this.userInfo.p_description
        if (this.userInfo.p_gender){
          this.selectedGender = this.gender[0]
        } else {
          this.selectedGender = this.gender[1]
        }
      },
      //Обновление информации юзера
      updateUserInfo(){
        let payload = {

          'p_name': this.name,
          'p_description': this.about,
          'p_date': this.date
        };

        axios({
          method: 'PUT',
          url: this.$store.state.urlApi + `profiles/` + this.$store.state.userInfo,
          headers: {
            'Content-Type': 'application/json'
          },
          data: payload
        })
            .then(response => {
              if (this.mail === this.userInfo.pUser.email) {
                this.$emit('updateUserInfo')
                $('.update_user_info_modal').modal('hide'); //закрытие модального окна
              } else {
                let payload1 = {

                  'email': this.mail,
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
                      this.$emit('updateUserInfo')
                      $('.update_user_info_modal').modal('hide'); //закрытие модального окна
                    })
                    .catch(response => {
                    })
              }
            })
            .catch(response => {
            })
      }
    },
    mounted() {
      $('.update_user_info_modal').on("shown.bs.modal", this.setProps)
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
  .textarea-resize-n {
    resize: none;
  }
</style>
