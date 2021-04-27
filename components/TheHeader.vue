<template>
  <div class="header">
    <b-navbar toggleable="lg" type="light">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
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
            title: 'Trang chủ',
            name: 'index',
            path: '/'
        },
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
.header .nav-link {
  padding-right: 2rem;
  padding-left: 2rem;
}
</style>
