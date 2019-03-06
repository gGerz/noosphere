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
                            </div>
                            <div class="form-group">
                                <label for="">Компетенция:</label>
                                <vue-select v-model="selected" label="competence" :options="globalComps" placeholder="Компетенции"  style="display: block">
                                    <template id="style-2" slot="option" slot-scope="option" class="modal-body__select mt-5" >
                                        <div class="py-1">{{ option.competence }}</div>
                                    </template>
                                    <span slot="no-options">Ничего не найдено</span>
                                </vue-select>

                            </div>
                            <div class="form-group ">
                                <label class="m-0">Дата:</label>
                                <input v-model="date" type="date" class="form-control inputText" required="required" placeholder="">
                            </div>
                            <div class="py-3 ">
                                <label>Время:</label>
                                <div class="">
                                    <div class="d-flex align-items-center">
                                        <input v-model="begin" class="form-control mr-2" type="text" placeholder="От">
                                        <span class="mr-2">—</span>
                                        <input v-model="end" class="form-control mr-2" type="text" placeholder="До">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="m-0">Цена:</label>
                                <input v-model="price" type="text" class="form-control inputText" required="required" placeholder="">
                            </div>
                        </div>
                        <div class="col-lg-6 col-12">
                            <div class="form-group">
                                <label class="m-0">Теги:</label>
                                <textarea class="form-control" rows="5"></textarea>
                                <small id="" class="form-text text-muted">p.s.Через пробелы</small>
                            </div>
                            <div class="form-group">
                                <label class="m-0">Описание консультации:</label>
                                <textarea v-model="about" class="form-control" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <router-link class="" to="/videoroom">
                        <span class="btn btn-primary btn-shadow" v-on:click="createCon()">
                            Создать
                        </span>
                    </router-link>
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
                willCreateId: '',
                globalComps: [],
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
                options: []
            }
        },
        methods: {
            closeModal() {
                $('.req_cons_modal').modal('hide');
            },
            createCon () {
                const formData = new FormData()
                console.log('тайтл', this)
                formData.append('pc_title', this.title)
                formData.append('pc_user_id', this.$store.state.userId)
                formData.append('pc_date', this.date)
                formData.append('pc_begin_time', this.begin)
                formData.append('pc_end_time', this.end)
                formData.append('pc_price', this.price)
                formData.append('pc_description', this.about)
                this.compCons = this.selected.com_id
                formData.append('pc_com_id', this.compCons)
                axios({
                    method: 'post',
                    url: `http://192.168.1.150/noosfera/public_html/api/v1/purchases`,
                    data: formData
                })
                    .then(response => {
                        this.willCreateId = response.data.pc_id
                        this.createConId()
                    })
                    .catch(response => {
                        console.log(response)
                    })
                this.closeModal()
            },
            createConId() {
                const formData1 = new FormData()
                console.log('thisWillCreateId', this.willCreateId)
                formData1.set('con_pc_id', this.willCreateId)

                //formData1.set('sc_user_id', 5)
                axios({
                    method: 'post',
                    url: `http://192.168.1.150/noosfera/public_html/api/v1/consultations`,
                    data: formData1
                })
                    .then(response => {
                    })
                    .catch(response => {
                    })
            }
        },
        mounted() {
            axios({
                method: 'get',
                url: `http://192.168.1.150/noosfera/public_html/api/v1/coms`,
            })
                .then((response) => {
                    this.globalComps = response.data

                    console.log('nisu',this.globalComps)

                })
                .catch((error) => {
                    console.error(error)
                })
            if (this.$store.state.authorisedStatus === true) {
                // Информация юзера
                axios({
                    method: 'get',
                    url: `http://192.168.1.150/noosfera/public_html/api/v1/profiles/` + this.$store.state.userInfo + '?expand=cpCom',
                    // url: `http://192.168.1.150/noosfera/public_html/api/v1/sellings?expand=scUser,scCom,tagCon`,
                    headers: {'Authorization': `Bearer ${localStorage.token}`}
                })
                    .then((response) => {
                        this.$store.state.userComp = response.data
                        this.userInfo = response.data
                        console.log(this.userInfo)
                    })
                    .catch((error) => {
                        console.error(error)
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