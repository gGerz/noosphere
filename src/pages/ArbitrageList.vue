<template>
  <div>
    <h2 class="my-4 font_xxl" >Арбитраж</h2>
    <div class="schedule-item" v-for="item in arbitrageList">
      одобрить консультанту,
      одобрить студенту
      |
      <i class="fas fa-calendar-week mr-1 text-grey"></i>
      {{item.date}}
      |
      <span>
        Консультант:
        {{item.teacher}}
      </span>
      <span>
        Студент:
        {{item.student}}
      </span>
      ({{item.reason}})
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        arbitrageList: [
          {teacher: 'Max', student: 'German', title: 'Научу вертать', reason: 'Преподаватель все время матерился и показывал всякое', date: '31.03.2019'}
        ]
      }
    }
  }
</script>

<style>

  .schedule-item{
    box-shadow: 0px 1px 4px rgba(13, 132, 251, 0.2);
    border: 1px solid grey;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
  }

</style>
