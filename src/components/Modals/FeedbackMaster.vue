<template>
    <div class="modal fade feedback_master_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
        <div class="modal-dialog " role="document">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel1">Отзыв</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body py-5 px-2 px-sm-5">
                    <div class="feedback_radio">
                        <div class="">
                            <input type="radio" name="radio" id="radio11" checked="">
                            <label for="radio11" class="py-2 px-3">
                                <i class="far fa-thumbs-up"></i>
                                Я провел консультацию хорошо
                            </label>
                        </div>
                        <div class="">
                            <input type="radio" name="radio" id="radio22">
                            <label for="radio22" class="py-2 px-3">
                                <i class="far fa-thumbs-down"></i>
                                Я провел консультацию плохо
                            </label>
                        </div>
                    </div>
                    <div class="pt-3">
                        <button type="submit" class="btn btn-primary btn-shadow" @click="feedback()">Отправить</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
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

    .feedback_radio label {
        width: 100%;
        border-radius: 6px;
        border: 2px solid #D1D3D4;
        font-weight: normal;
    }
    .feedback_radio input[type="radio"]:empty {
        display: none;
    }
    .feedback_radio input[type="radio"]:checked ~ label {
        color: #15a7f1;
    }
</style>