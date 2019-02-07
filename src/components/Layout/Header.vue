<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <a class="navbar-brand" href="#">
        <img src="/src/assets/img/logo.png" width="230" class="d-inline-block align-top" alt="">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Доска консультаций</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/ticketboard">Доска заявок</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">О сервисе</router-link>
          </li>
        </ul>
        <router-link class="btn btn-outline-primary m-2 my-sm-0" to="/cabinet">Войти</router-link>

        <router-link class="btn btn-outline-primary my-2 my-sm-0" to="/">Регистрация</router-link>
      </div>
    </nav>
  </div>
</template>
<style lang="scss">
  .nav-link {
    padding-right: .9rem!important;
    padding-left: .9rem!important;
  }
</style>
