<template>
    <div class="card">
        <div class="card-body">
            <div class="d-lg-flex d-md-flex d-block align-items-center">
                <div class="d-flex align-items-center ">
                    <img class="ava_cabinet" src="../assets/img/ava.jpg">
                    <div class="text-dark h3 m-0">{{anotherUserInfo.p_name}}</div>
                </div>
            </div>

            <div class="row user_info">
                <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block mx-auto">
                    <div>Описание</div>
                    <div>{{anotherUserInfo.p_description}}</div>
                </div>
                <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block mx-auto">
                    <div>Пол</div>
                    <div>{{anotherUserInfo.p_gender}}</div>
                </div>
                <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block mx-auto">
                    <div>Дата рождения</div>
                    <div>{{anotherUserInfo.p_date}}</div>
                </div>
                <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block mx-auto">

                </div>
                <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg d-flex d-lg-block d-md-block d-sm-block mx-auto mx-sm-0">

                </div>
            </div>
            <div class="spec col-10 col-xs-12 col-sm-10 col-md-10 col-lg-4 px-0 py-4">
                <div class="text-grey font_s">Компетенции</div>
                <div class="d-flex justify-content-between mt-1 mr-4" v-for="competence in anotherUserInfo.cpCom">
                    <div>{{competence.competence}}</div>
                    <div class="d-flex justify-content-between">
                        <div>0<span class="text-grey">/1</span></div>
                    </div>
                </div>
            </div>
        </div>
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