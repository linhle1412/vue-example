<template>
  <div class="header">
    <b-navbar toggleable="lg" type="light">
      <b-navbar-toggle target="nav-collapse">
          <img src="~/assets/images/nav-toggle-icon.svg" alt="">
      </b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <ul class="navbar-nav w-100 justify-content-center">
          <li class="nav-item" v-for="(item, index) in menus" :key="index">
            <NuxtLink
              :to="item.path"
              class="nav-link"
              :class="item.name == 'index' ? 'nav-home' : ''"
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          title: "Trang chủ",
          name: "index",
          path: "/"
        },
        {
          title: "Thông tin quỹ",
          name: "fund",
          path: "/thong-tin-quy"
        },
        {
          title: "Tài năng",
          name: "talent",
          path: "/tai-nang"
        },
        {
          title: "Đóng góp",
          name: "contribute",
          path: "/dong-gop"
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss">
.header .navbar-nav .nav-link.nuxt-link-active {
  color: #930 !important;
}
.header .navbar-nav .nav-link.nav-home {
    &.nuxt-link-active {
        color: #000 !important
    }
    &.nuxt-link-exact-active, &:hover {
        color: #930 !important
    }
}
</style>
<style lang="scss" scoped>
.header {
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
.header ul li a {
  text-transform: uppercase;
  color: #000 !important;
  &:hover{
    color: #930 !important;
  }
}
.header .nav-link {
  padding-right: 2rem;
  padding-left: 2rem;
}
@media only screen and (max-width: 550px) {
  .header .nav-link {
    padding-right: 0;
    padding-left: 0;
  }
  .header .navbar-light .navbar-toggler{
      border-color: transparent;
      padding-left: 0;
  }
}
</style>
