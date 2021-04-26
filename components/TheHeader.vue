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
          <li class="nav-item" v-for="(item, index) in menus" :key="index">
            <NuxtLink
              :to="item.path"
              class="nav-link"
              v-on:click="setActive(item.name)"
            >
              {{item.title}}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
            title: 'Thông tin quỹ',
            name: 'fund',
            path: '/thong-tin-quy'
        },
        {
            title: 'Tài năng',
            name: 'talent',
            path: '/tai-nang'
        },
        {
            title: 'Đóng góp',
            name: 'contribute',
            path: '/dong-gop'
        }
      ]
    };
  },
  created(){
  },
  methods: {
  }
};
</script>
<style lang="scss">
.nav-header .navbar-nav .nav-link.nuxt-link-active{
    color: #000;
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
.nav-header ul li a {
  text-transform: uppercase;
}
.nav-header .navbar-nav .nav-link {
  padding-right: 2rem;
  padding-left: 2rem;
}
</style>
