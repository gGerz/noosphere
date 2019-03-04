<template>
    <div class="modal fade sign_up_next_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
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
                            <input type="text" class="form-control inputText" required="required" aria-describedby="" placeholder="Имя" v-model="name">
                        </div>
                        <div class="form-group">
                            <input type="date" class="form-control inputText" required="required" v-model="date">
                        </div>
                        <div class="form-group">
                            <textarea type="text" class="form-control inputText" required="required" placeholder="Описание" v-model="about"></textarea>
                        </div>
                        <div class="form-group pb-4">
                            <select id="inputState" class="form-control inputText" v-model="gender">
                                <option selected class="text-grey">Выберите пол...</option>
                                <option>Мужской</option>
                                <option>Женский</option>
                            </select>
                        </div>

                        <div class="pt-3">
                            <button type="submit" class="btn btn-primary btn-shadow" @click="regNext">Зарегистрировать</button>
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
                resetPassword: '',
                newId: [],
                name: '',
                date: '',
                about: '',
                gender: 'Выберите пол...',
                genderType: '1'
            }
        },
        methods: {
            regNext() {
                this.newId = this.$store.state.newId
                console.log('Стор',this.$store.state.newId)
                console.log('Локал',this.newId)
                const formData = new FormData()




                if ( this.gender != 'Выберите пол...' &&
                    this.name !== '' &&
                    this.date !== '' &&
                    this.about !== ''
                ) {

                    formData.set('p_name', this.name)
                    formData.set('p_date', this.date)
                    formData.set('p_description', this.about)
                    formData.set('p_user_id', parseInt(this.$store.state.newId))
                    if (this.gender == 'Женский') {
                        this.genderType = 0;
                    }

                    formData.set('p_gender', this.genderType)
                    axios({
                        method: 'post',
                        url: `http://192.168.1.150/noosfera/public_html/api/v1/profiles`,
                        data: formData
                    })
                        .then(response => {
                            console.log('response', response)
                            if (response.statusText == 'Created') {
                                $('.sign_up_next_modal').modal('hide');
                            }
                        })
                        .catch(response => {
                            console.log(response)
                        })

                }
                else alert('Заполните все поля')


            }
        },
        mounted() {
            this.newId = this.$store.state.newId
            $('.sign_up_next_modal').on('hide.bs.modal', function (e) {
                e.target.__vue__.name = ''
                e.target.__vue__.gender = 'Выберите пол...'
                e.target.__vue__.date = ''
                e.target.__vue__.about = ''
            })
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
