<template>
  <div>
    <div>
      <h2 class="my-4" >Личный кабинет</h2>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="home-tab" data-toggle="tab" href="#general" role="tab" aria-controls="home" aria-selected="true">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="profile-tab" data-toggle="tab" href="#schedule" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="messages-tab" data-toggle="tab" href="#tickets" role="tab" aria-controls="messages" aria-selected="false">Messages</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="settings-tab" data-toggle="tab" href="#archive" role="tab" aria-controls="settings" aria-selected="false">Settings</a>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <div class="tab-pane active" id="general">
        general
      </div>
      <div class="tab-pane" id="schedule">
        schedule
      </div>
      <div class="tab-pane" id="tickets">
        tickets
      </div>
      <div class="tab-pane" id="archive">
        archive
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default{
    data(){
      return{

      }
    },
    mounted() {
      // Переключение вкладок на desktop
      $('#lk-tabs a').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
      })
    }
  }
</script>
<style>

</style>
