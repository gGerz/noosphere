<template>
    <div class="modal fade req_cons_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel1">Создать заявку</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body signin py-5 px-2 px-sm-5">
                    <div class="row">
                        <div class="col-lg-6 col-12">
                            <div class="form-group">
                                <label class="m-0">Название заявки:</label>
                                <input type="text" v-model="title" class="form-control inputText" required="required" aria-describedby="emailHelp" placeholder="">
                                <div v-show="titleEr" class="text-danger font_s">Введите название</div>
                                <div v-show="titleLenEr" class="text-danger font_s">Название не должно превышать 50 символов</div>
                            </div>
                            <div class="form-group">
                                <label>Компетенция:</label>
                                <vue-select v-model="selected" label="competence" :options="globalComps.data" placeholder="Компетенции"  style="display: block">
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
                                <input v-model="price" type="text" class="form-control inputText" required="required" placeholder="">
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
                                <label class="m-0">Описание заявки:</label>
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
    data() {
      return {
        currentTag: '',
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
        globalComps: '',
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
          tagLenEr: '',
          purId: '',
          tags: [],
          tagIds: [],
      }
    },
    methods: {
        addTag () {
            this.tagLenEr = false
            if (this.currentTag != '') {
                if (this.currentTag.length < 26) {
                    this.tags.push(this.currentTag)
                    const formData = new FormData()
                    formData.append('tag_name', this.currentTag)
                    axios({
                        method: 'post',
                        url: `http://192.168.1.150/noosfera/public_html/api/v1/tags`,
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
                const formData = new FormData()
                formData.append('tc_tag_id', this.tagIds[i])
                formData.append('tc_pc_id', this.purId)
                axios({
                    method: 'post',
                    url: `http://192.168.1.150/noosfera/public_html/api/v1/tag_cons`,
                    data: formData
                })
                    .then(response => {
                    })
            }
        },
      delTag (i) {
        this.tags.splice(i, 1);
      },
      closeModal() {
        $('.req_cons_modal').modal('hide');
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
                this.aboutLenEr == false
            ) {
                const formData = new FormData()
                formData.append('pc_title', this.title)
                formData.append('pc_user_id', this.$store.state.userId)
                formData.append('pc_date', this.date)
                formData.append('pc_begin_time', this.begin)
                formData.append('pc_end_time', this.end)
                formData.append('pc_price', this.price)
                formData.append('pc_description', this.about)
                this.compCons = this.selected.com_id
                formData.append('pc_com_id', this.compCons)
                formData.append('pc_type', 1)
                axios({
                    method: 'post',
                    url: `http://192.168.1.150/noosfera/public_html/api/v1/purchases`,
                    data: formData
                })
                    .then(response => {
                        if (response.status === 201) {
                            console.log('q',response)
                            this.purId = response.data.pc_id
                            // this.purId = response.data.pc_id
                            //this.createConId()
                            this.createTags()
                            this.closeModal()
                        }
                    })
                    .catch(response => {
                    })
            }
        },
      createConId() {
        const formData1 = new FormData()
        formData1.set('con_pc_id', this.willCreateId)
        axios({
          method: 'post',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/consultations`,
          data: formData1
        })
          .then(response => {
          })
          .catch((error) => {
            console.error(error)
            console.log(error)
          })
      }
    },
    mounted() {
      if (this.$store.state.authorisedStatus === true) {
        axios({
          method: 'get',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/coms`,
        })
          .then((response) => {
            this.globalComps = response
          })
          .catch((error) => {
            console.error(error)
            console.log(error)
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


