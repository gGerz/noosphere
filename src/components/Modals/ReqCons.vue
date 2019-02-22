<template>
    <div class="modal fade req_cons_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel1">Заявка на консультацию</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body signin px-2 px-sm-5">
                    <div class="row">
                        <div class="col-lg-6 col-12">
                            <div class="form-group">
                                <label class="m-0">Название заявки:</label>
                                <input type="text" class="form-control inputText" required="required" aria-describedby="emailHelp" placeholder="">
                            </div>
                            <div class="form-group">
                                <label for="exampleSelect1">Компетенция:</label>
                                <input type="text" class="form-control inputText" required="required" placeholder="">
                            </div>
                            <div class="form-group ">
                                <label class="m-0">Дата:</label>
                                <input type="date" class="form-control inputText" required="required" placeholder="">
                            </div>
                            <div class="py-3 ">
                                <label>Время:</label>
                                <div class="">
                                    <div class="d-flex align-items-center">
                                        <input class="form-control mr-2" type="text" placeholder="От">
                                        <span class="mr-2">—</span>
                                        <input class="form-control mr-2" type="text" placeholder="До">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="m-0">Цена:</label>
                                <input type="text" class="form-control inputText" required="required" placeholder="">
                            </div>
                        </div>
                        <div class="col-lg-6 col-12">
                            <div class="form-group">
                                <label class="m-0">Теги:</label>
                                <textarea class="form-control" rows="5"></textarea>
                                <small id="" class="form-text text-muted">p.s.Через пробелы</small>
                            </div>
                            <div class="form-group">
                                <label class="m-0">Что я хочу узнать:</label>
                                <textarea class="form-control" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="submit" class="btn btn-primary btn-shadow" @click="CLICK()">Создать</button>
                </div>
            </div>
        </div>
    </div>
</template>
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