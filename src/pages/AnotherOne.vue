<template>
    <div>
        <h1>Имя: {{anotherUserInfo.p_name}}</h1>
        <p>Описание: {{anotherUserInfo.p_description}}</p>
        <p>Пол: {{anotherUserInfo.p_gender}}</p>
        <p>Дата рождения: {{anotherUserInfo.p_date}}</p>
        </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            anotherUserInfo: [],
        }
    },
    mounted () {
        this.anotherUserId = this.$store.state.anotherUserId
        axios({
            method: 'get',
            url: `http://192.168.1.150/noosfera/public_html/api/v1/profiles/` + this.$store.state.anotherUserId + `?expand=cpCom`
        })
            .then((response) => {
                console.log(response)
                this.anotherUserInfo = response.data
                console.log(this.anotherUserInfo)

            })
            .catch((error) => {
                console.error(error)
            })
    }
}
</script>