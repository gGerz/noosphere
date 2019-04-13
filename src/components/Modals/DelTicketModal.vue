<template>
  <div class="modal fade del_ticket_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
    <div class="modal-dialog " role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel1">Подтвердите отмену заявки</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="d-flex justify-content-center py-3">
          <div class="btn btn-outline-primary" @click="delConItem">Удалить</div>
          <div class="btn btn-outline-danger ml-3" @click="closeModal">Закрыть окно</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {

      }
    },
    methods: {
      closeModal() {
        $('.del_ticket_modal').modal('hide');
      },
      delConItem(){
        this.$emit('delTicketItem')
        $('.del_ticket_modal').modal('hide');
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
