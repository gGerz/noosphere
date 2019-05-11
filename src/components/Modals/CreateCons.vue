<template>
  <div class="modal fade create_cons_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel1">Создать консультацию</h5>
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
                <div v-show="selectedEr" class="text-danger font_s">Выбириет компитенцию</div>
              </div>
              <div class="form-group ">
                <label class="m-0">Дата:</label>
                <input v-model="date" type="date" class="form-control inputText" required="required" placeholder="">
                <div v-show="dateEr" class="text-danger font_s">Введите дату</div>
                <div v-show="datePastEr && date.length > 1" class="text-danger font_s">Консультаци не может быть в прошлом!</div>
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
                  <div v-show="timePastEr && begin.length > 1 && end.length > 1" class="text-danger font_s">Консультация не может быть в прошлом!</div>
                  <div v-show="timeChronoEr && begin.length > 1 && end.length > 1" class="text-danger font_s">Вы точно не путаете от и до?</div>
                  <div v-show="timeDurEr && begin.length > 1 && end.length > 1" class="text-danger font_s">Время занятия должно превышать 30 минут</div>
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
                <label class="m-0">Теги:</label>
                <div class="d-flex pb-3">
                  <input type="text" class="form-control inputText" v-model="currentTag"/>
                  <button class="btn btn-primary ml-2" @click="addTag">+</button>
                </div>
                <div class="tag" v-for="(tag, i) in tags">{{tag}}<span class="ml-2" aria-hidden="true" @click="delTag(i)">&times;</span></div>
                <div v-show="tagLenEr" class="text-danger font_s">Длина тега не должна превышать 25 символов</div>

              </div>
              <div class="form-group">
                <label class="m-0">Описание консультации:</label>
                <textarea v-model="about" class="form-control textarea-resize-n" rows="5"></textarea>
                <div v-show="aboutLenEr" class="text-danger font_s">Описание не должно превышать 250 символа</div>
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
        aboutLenEr: '',
        tagLenEr: '',
        timeDurEr: false,
        timeChronoEr: false,
        datePastEr: false,
        timePastEr: false,
      }
    },
    methods: {
      addTag () {
        this.tagLenEr = false
        if (this.currentTag !== '') {
          if (this.currentTag.length < 26) {
            this.tags.push(this.currentTag)
            const formData = new FormData()
            formData.append('tag_name', this.currentTag)
            axios({
              method: 'post',
              url: this.$store.state.urlApi + `tags`,
              data: formData
            })
              .then(response => {
                this.tagIds.push(response.data.tag_id)
              })
              .catch(response => {
              })
            this.currentTag = ''
          } else this.tagLenEr = true

        }
      },
      createTags() {
        for (let i = 0; i < this.tagIds.length; i++) {
          const formData3 = new FormData()
          formData3.append('tc_tag_id', this.tagIds[i])
          formData3.append('tc_sc_id', this.sellId)
          axios({
            method: 'post',
            url: this.$store.state.urlApi + `tag_cons`,
            data: formData3
          })
            .then(response => {
            })
        }
      },
      delTag (i) {
        this.tags.splice(i, 1);
      },
      closeModal() {
        $('.create_cons_modal').modal('hide');
      },
      testTime(begin, end) {
        const beginH = +(begin[0] + begin[1])
        const endH = +(end[0] + end[1])
        const beginM = +(begin[3] + begin[4])
        const endM = +(end[3] + end[4])
        this.timeChronoEr = false
        this.timeDurEr = false
        this.timePastEr = false
        const h =  this.$store.state.now.time.h
        const m =  this.$store.state.now.time.m
        if (beginH < h || ( beginH === h && beginM < m )) this.timePastEr = true
        else if (beginH > endH || (beginH === endH && beginM > endM)) this.timeChronoEr = true
        else if ((beginH + 1 === endH && ((60 - beginM) + endM) < 30) || (beginH === endH && (endM - beginM) < 30 )) {
          this.timeDurEr = true
        }
      },
      testDate(date) {
        this.datePastEr = false
        const arrDate = date.split('-')
        const nowDate = this.$store.state.now.date.split('-')
        console.log(nowDate, ', ', arrDate)
        if (!(nowDate[0] <= arrDate[0] && nowDate[1] <= arrDate[1] && nowDate[2] <= arrDate[2])) this.datePastEr = true
      },
      createCon () {
        this.testDate(this.date)
        this.testTime(this.begin, this.end)
        this.about = $.trim(this.about)
        this.title = $.trim(this.title)
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
          this.aboutLenEr === false &&
          this.timeChronoEr === false &&
          this.timeDurEr === false &&
          this.datePastEr === false &&
          this.timePastEr === false
        ) {
          const formData = new FormData()
          formData.append('sc_title', this.title)
          formData.append('sc_user_id', this.$store.state.userId)
          formData.append('sc_date', this.date)
          formData.append('sc_begin_time', this.begin)
          formData.append('sc_end_time', this.end)
          formData.append('sc_price', this.price)
          formData.append('sc_description', this.about)
          this.compCons = this.selected.com_id
          formData.append('sc_com_id', this.compCons)
          formData.append('sc_type', 1)
          axios({
            method: 'post',
            url: this.$store.state.urlApi + `sellings`,
            data: formData
          })
            .then(response => {
              if (response.status === 201) {
                this.sellId = response.data.sc_id
                this.createTags()
                this.closeModal()
              }
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
          url: this.$store.state.urlApi + `profiles/` + this.$store.state.userInfo + '?expand=cpCom',
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
      $('.create_cons_modal').on('hide.bs.modal', function (e) {
        e.target.__vue__.title = ''
        e.target.__vue__.selected = ''
        e.target.__vue__.date = ''
        e.target.__vue__.begin = ''
        e.target.__vue__.end = ''
        e.target.__vue__.price = ''
        e.target.__vue__.about = ''
        e.target.__vue__.tags = []
      })
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
