<template>
    <div class="modal fade create_comp_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
        <div class="modal-dialog " role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel1">Добавить компетенцию</h5>
                    {{ $store.state.userComp }}
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body signin py-5 px-2 px-sm-5">
                    <vue-select v-model="selected" label="competence" :options="globalComps" placeholder="Компетенции"  style="display: block">
                        <template id="style-2" slot="option" slot-scope="option" class="modal-body__select mt-5" >
                            <div class="py-1">{{ option.competence }}</div>
                        </template>
                        <span slot="no-options">Ничего не найдено</span>
                    </vue-select>
                </div>
                <div v-show="error">Компетенция уже добавлена</div>
                <div class="modal-footer justify-content-center">
                    <span class="btn btn-primary btn-shadow" v-on:click="createComp()">
                        Добавить
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
        error: false,
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
        globalComps: []
      }
    },
    methods: {
      closeModal() {
        $('.create_comp_modal').modal('hide');
      },

      createComp() {
        const formData1 = new FormData()
        console.log('p_id', this.$store.state.userComp.p_user_id)
        console.log('com_id ', this.selected.com_id)

        formData1.set('cp_p_id', this.$store.state.userComp.p_user_id)
        formData1.set('cp_com_id', this.selected.com_id)
        axios({
          method: 'post',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/competences`,
          data: formData1
        })
          .then(response => {
            console.log('response', response)
            window.location.reload()
          })
          .catch(response => {
            console.log(response)
          })
        this.$emit('updateUserInfo')
      }
    },
    mounted() {
      axios({
        method: 'get',
        url: `http://192.168.1.150/noosfera/public_html/api/v1/coms`,
      })
        .then((response) => {
          // console.log("len1",response.data.length)
          // console.log("len2",this.$store.state)
          // this.globalComps = response.data
          // for (var i = 0; i < response.data.length; i++) {
          //   console.log('hi')
          //   for(var j = 0; j < this.$store.state.userComp.cpCom.length; j++) {
          //     if (1) {//response.data.indexOf($store.state.userComp.cpCom
          //       console.log('hi1')
          this.globalComps = response.data
        }
    })
  .catch((error) => {
    console.error(error)
  })
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
