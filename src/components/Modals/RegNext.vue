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
                            <input type="text" class="form-control inputText" required="required" aria-describedby="" placeholder="Имя"  >
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control inputText" required="required" placeholder="Телефон" >
                        </div>
                        <div class="form-group pb-4">
                            <select id="inputState" class="form-control inputText">
                                <option selected class="text-grey">Выберите пол...</option>
                                <option>Мужской</option>
                                <option>Женский</option>
                            </select>
                        </div>
                        <div class="pt-3">
                            <button type="submit" class="btn btn-primary btn-shadow" @click="login">Зарегистрировать</button>
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
            }
        },
        methods: {
            login() {
                console.log('privet')
            }
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
