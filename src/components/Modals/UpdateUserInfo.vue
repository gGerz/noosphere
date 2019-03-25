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
          <div class="py-5 px-5">
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
              <!-- <div class="text-danger font_s">Введите информацию о себе</div> -->
            </div>
            <div class="form-group">
              <small class="form-text text-muted">Пол</small>
              <select id="inputState" class="form-control inputText" v-model="gender">
                <option selected class="text-grey">Выберите пол...</option>
                <option>Мужской</option>
                <option>Женский</option>
              </select>
            </div>
            <div class="pt-5">
              <button type="submit" class="btn btn-primary btn-shadow">Сохранить</button>
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
    props: ['userInfo'],
    data(){
      return{
        mail: '',
        password: '',
        name: '',
        date: '',
        about: '',
        gender: 'Выберите пол...',
        genderType: '0'
      }
    },
    methods: {
      setProps(){
        console.log(this.userInfo)
        this.name = this.userInfo.p_name
        this.date = this.userInfo.p_date
        this.about = this.userInfo.p_description
      }
    },
    mounted() {
      $('.update_user_info_modal').on("shown.bs.modal", this.setProps)
      // $('.update_user_info_modal').on('shown.bs.modal', function (e) {
      //   console.log('k', e)
      // })
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
