<template>
  <div class="notifications" v-if="$store.state.authorisedStatus">
    <div v-for="(note, i) in notifications">
      <span @click="cancelCall(note.n_id, i)">X</span>
      <div class="px-3" v-if="note.n_type === 'selling'">{{note.nPurchaseUser.p_name}} хочет провести с вами консультацию "{{note.nCon.con_title}}"</div>
      <div class="d-flex justify-content-around">
        <button class="btn btn-outline-success" @click="acceptCall(note.n_id, i)">Ответить</button>
        <button class="btn btn-outline-danger" @click="cancelCall(note.n_id,i)">Отклонить</button>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        notifications: []
      }
    },
    methods: {
      getNotifications(){
        axios({
          method: 'get',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/notifications?NotificationSearch[n_selling_user_id]=`+this.$store.state.userId,
        })
          .then((response) => {
            console.log(response)
            this.notifications = response.data
          })
          .catch((error) => {
          })
      },
      acceptCall(id, index){
        var myWin;
        myWin= open('https://appear.in/noospherevideochat')
        this.readNotification(id, index)
      },
      cancelCall(id, index){
        this.readNotification(id, index)
      },
      readNotification(id, index){
        //отправка пут запроса
        let payload = {
          'n_status': 2
        };
        axios({
          method: 'PUT',
          url: `http://192.168.1.150/noosfera/public_html/api/v1/notifications/` + id,
          headers: {
            'Content-Type': 'application/json'
          },
          data: payload
        })
            .then(response => {
              this.notifications.splice(index, 1)
            })
            .catch(response => {
            })
      }
    },
    mounted(){
      this.getNotifications()
      setInterval(this.getNotifications, 5000)
    }
  }
</script>

<style lang="scss">
  .notifications{
    margin-top: 10px;
    margin-right: 10px;
    position: fixed;
    top: 0;
    right: 0;

    >div{
      width: 250px;
      height: 150px;
      margin-bottom: 10px;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);

      span{
        cursor: pointer;
        position: absolute;
        margin-top: -23%;
        margin-left: 94%;
        margin-right: 5px;
      }
    }
  }
</style>
