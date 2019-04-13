<template>
  <div class="modal fade update_user_con_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel1">Изменить консультацию</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body signin py-5 px-2 px-sm-5">
          <div class="row">
            <div class="col-lg-6 col-12">
              <div class="form-group">
                <label class="m-0">Название консультации:</label>
                <input type="text" v-model="title" class="form-control inputText" required="required" aria-describedby="emailHelp" placeholder="">
                <div v-show="titleEr" class="text-danger font_s">Введите название</div>
                <div v-show="titleLenEr" class="text-danger font_s">Название не должно превышать 50 символов</div>
              </div>
              <div class="form-group">
                <label>Компетенция:</label>
                <vue-select v-model="selected" label="competence" :options="$store.state.userComp.cpCom" placeholder="Компетенции" style="display: block">
                  <template id="style-2" slot="option" slot-scope="option" class="modal-body__select mt-5" >
                    <div class="py-1">{{ option.competence }}</div>
                  </template>
                  <span slot="no-options">Ничего не найдено</span>
                </vue-select>
                <div v-show="selectedEr" class="text-danger font_s">Выберете компетенцию</div>
              </div>
              <div class="form-group ">
                <label class="m-0">Дата:</label>
                <input v-model="date" type="date" class="form-control inputText" required="required" placeholder="">
                <div v-show="dateEr" class="text-danger font_s">Введите дату</div>
              </div>
              <div class="py-3 ">
                <label>Время:</label>
                <div class="">
                  <div class="d-flex align-items-center">
                    <input v-model="begin" class="form-control mr-2" type="time" placeholder="От">
                    <span class="mr-2">—</span>
                    <input v-model="end" class="form-control mr-2" type="time" placeholder="До">
                  </div>
                  <div v-show="timeEr" class="text-danger font_s">Введите время</div>
                </div>
              </div>
              <div class="form-group">
                <label class="m-0">Цена:</label>
                <input v-model="price" type="number" class="form-control inputText" required="required" placeholder="">
                <div v-show="priceEr" class="text-danger font_s">Введите цену</div>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="form-group">
                <label class="m-0">Описание консультации:</label>
                <textarea v-model="about" class="form-control textarea-resize-n" rows="5"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
            <span class="btn btn-primary btn-shadow" v-on:click="createCon()">
                Создать
            </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VueSelect from 'vue-select'
  import axios from 'axios'

  export default {
    components: {
      VueSelect
    },
    props: ['selectedCon'],
    data() {
      return {
        currentTag: '',
        tags: [],
        tagIds: [],
        willCreateId: '',
        title: '',
        date: '',
        begin: '',
        end: '',
        price: '',
        about: '',
        userInfo: '',
        selectedIndex: '',
        selectedCard: '',
        options: '',
        selected: '',
        cons: [],
        photos: [],
        compCons: '',
        titleEr: '',
        selectedEr: '',
        dateEr: '',
        timeEr: '',
        endEr: '',
        aboutEr: '',
        priceEr: '',
        titleLenEr: '',
        test: '',
        consId: '',
        tagLenEr: '',
      }
    },
    methods: {
      setProps(){
        this.title = this.selectedCon.sc_title
        for (let i = 0; i< this.$store.state.userComp.cpCom.length; i++){
          if (this.selectedCon.scCom.competence === this.$store.state.userComp.cpCom[i].competence){
            this.selected = this.$store.state.userComp.cpCom[i]

          }
        }
        this.date = this.selectedCon.sc_date
        this.begin = this.selectedCon.sc_begin_time
        this.end = this.selectedCon.sc_end_time
        this.price = this.selectedCon.sc_price
        this.about = this.selectedCon.sc_description
      },
      delTag (i) {
        this.tags.splice(i, 1);
      },
      closeModal() {
        $('.update_user_con_modal').modal('hide');
      },
      createCon () {
        this.title = $.trim(this.title) //удаление пробелов по сторонам
        this.titleEr = false
        this.selectedEr = false
        this.dateEr = false
        this.timeEr = false
        this.endEr = false
        this.priceEr = false
        this.aboutLenEr = false
        this.titleLenEr = false

        if (this.title === '') this.titleEr = true
        else if (this.title.length > 50) this.titleLenEr = true
        if (this.selected === '') this.selectedEr = true
        if (this.date === '') this.dateEr = true
        if (this.begin === '' || this.end === '') this.timeEr = true
        if (this.price === '') this.priceEr = true
        if (this.about.length > 250) this.aboutLenEr = true

        if (
            this.titleEr === false &&
            this.selectedEr === false &&
            this.dateEr === false &&
            this.timeEr === false &&
            this.endEr === false &&
            this.priceEr === false &&
            this.titleLenEr === false &&
            this.aboutLenEr === false
        ) {

          let payload = {
            'sc_title': this.title,
            'sc_com_id': this.selected.com_id,
            'sc_user_id': this.$store.state.userId,
            'sc_date': this.date,
            'sc_begin_time': this.begin,
            'sc_end_time': this.end,
            'sc_price': this.price,
            'sc_description': this.about,
          };

          axios({
            method: 'PUT',
            url: `http://192.168.1.150/noosfera/public_html/api/v1/sellings/` + this.selectedCon.sc_id,
            headers: {
              'Content-Type': 'application/json'
            },
            data: payload
          })
              .then(response => {
                this.createTags()
                this.closeModal()
              })
              .catch(response => {
              })
        }
      }
    },
    mounted() {
      if (this.$store.state.authorisedStatus === true) {
        axios({
          method: 'get',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/profiles/` + this.$store.state.userInfo + '?expand=cpCom',
          headers: {'Authorization': `Bearer ${localStorage.token}`}
        })
            .then((response) => {
              this.$store.state.userComp = response.data
              this.userInfo = response.data
            })
            .catch((error) => {
              console.error(error)
            })
      }
      $('.update_user_con_modal').on("shown.bs.modal", this.setProps)
    }
  }
</script>
<style lang="scss" scoped>
  $main_grey: #A6A6A6;
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
  .tag {
    /*cursor: pointer;*/
    background-color: #ECECEC;
    color: $main_grey;
    position: relative;
    margin-left: 11px;
    margin-right: 11px;
    height: 24px!important;
    display: inline-flex;
    align-items: center;
    padding-left: .2rem!important;
    padding-right: .5rem!important;
    margin-bottom: 7px;
    transition: .1s;

    &:before{
      transition: .1s;
      content: '';
      position: absolute;
      margin-left: -27px;
      border: 12px solid transparent;
      border-right: 12px solid #ECECEC;
    }
  }
  .textarea-resize-n {
    resize: none;
  }
</style>
