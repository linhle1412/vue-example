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
              :to="localePath(item.path)"
              class="nav-link"
              :class="item.name == 'index' ? 'nav-home' : ''"
            >
              {{ $t('nav.'+item.title) }}
            </NuxtLink>
          </li>
          <li class="btn-change-lang">
            <div>
              <img :src="require('~/assets/images/'+$i18n.locale+'.png')" alt="">
            </div>
            <div class="sub-menu">
              <a
              href="#"
              v-for="locale in availableLocales"
              :key="locale.code"
              @click.prevent.stop="$i18n.setLocale(locale.code)"><img :src="require('~/assets/images/'+locale.code+'.png')" alt=""></a>
            </div>
            
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
          title: "home",
          name: "index",
          path: "/"
        },
        {
          title: "rank",
          name: "fund",
          path: "rank"
        },
        {
          title: "talent",
          name: "talent",
          path: "talent"
        },
        {
          title: "talent_suggestion",
          name: "talent-suggestion",
          path: "suggestion"
        },
        {
          title: "contribute",
          name: "contribute",
          path: "contribute"
        },
        {
          title: "fund_info",
          name: "fund-info",
          path: "fund-info"
        }
      ]
    };
  },
  created() {},
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
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
    box-shadow: 0 0.4rem 2rem rgb(0 0 0 / 18%);
    border-bottom: 2px solid #ffcb05;
  }
}
.header ul li a {
  text-transform: uppercase;
  color: #000 !important;
  &:hover{
    color: #930 !important;
  }
}
.header .nav-item {
}
.header .nav-link {
  padding-left: 20px;
  padding-right: 20px;
}
.btn-change-lang {
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: relative;
  img {
    height: 25px;
  }
  &:hover .sub-menu{
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    -moz-transform: rotate3d(0, 0, 0, 0deg);
    -o-transform: rotate3d(0, 0, 0, 0deg);
    -ms-transform: rotate3d(0, 0, 0, 0deg);
    transform: translateX(-50%) rotate3d(0, 0, 0, 0deg);
  }
}
.sub-menu {
  position: absolute;
  background: #fff;
  padding: 10px 20px;
  border-radius: 15px;
  box-shadow: 0px 0px 28px 0px rgba(0, 0, 0, 0.1);
  top: 55px;
  z-index: 999;
  display: block !important;
  left: 50%;
  width: auto;
  white-space: nowrap;
  -webkit-transform: rotate3d(1, 0, 0, -90deg);
  -moz-transform: rotate3d(1, 0, 0, -90deg);
  -o-transform: rotate3d(1, 0, 0, -90deg);
  -ms-transform: rotate3d(1, 0, 0, -90deg);
  transform: translateX(-50%) rotate3d(1, 0, 0, -90deg);
  -webkit-transform-origin: 0 0 0;
  -moz-transform-origin: 0 0 0;
  -o-transform-origin: 0 0 0;
  -ms-transform-origin: 0 0 0;
  transform-origin: 0 0 0;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
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
