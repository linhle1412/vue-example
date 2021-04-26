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
              <NuxtLink to="#" class="nav-link">
                Thông tin quỹ
              </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="#" class="nav-link">
                Tài năng
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/contribute" class="nav-link">
               Đóng góp
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.header{
    height: 72px;
    nav {
        position: fixed;
        top: 0;
        z-index: 2;
        width: 100%;
        background: #fff;
        padding: 1rem;
    }
}
.nav-header ul li a {
    text-transform: uppercase;
}
.nav-header .navbar-nav .nav-link{
    padding-right: 2rem;
    padding-left: 2rem;
}
</style>
