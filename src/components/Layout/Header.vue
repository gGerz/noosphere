<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <a class="navbar-brand" href="#">
        <img src="/src/assets/logo.png" width="250" class="d-inline-block align-top" alt="">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Доска консультаций</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Доска заявок</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">О сервисе</a>
          </li>
        </ul>
        <button class="btn btn-outline-primary m-2 my-sm-0" type="submit">Войти</button>
        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Регистрация</button>
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
