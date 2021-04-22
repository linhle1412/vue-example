<template>
  <div class="header">
    <nav class="navbar navbar-expand-lg navbar-light nav-header">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav w-100 justify-content-center">
          <li class="nav-item active">
            <a class="nav-link" href="#"
              >Thông tin quỹ
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
                Tài năng
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
                Đóng góp
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nav-header ul li a {
    text-transform: uppercase;
}
.nav-header .navbar-nav .nav-link{
    padding-right: 2rem;
    padding-left: 2rem;
}
</style>
