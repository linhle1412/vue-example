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
 
.navbar {
  padding: 0 1rem;
  @media screen and (max-width: 991px) {
    padding: 0.5rem 1rem;
  }
}
.header {
  position: sticky;
  top: 0;
  z-index: 2;
  width: 100%;
  background: #fff;
  box-shadow: 0 0.4rem 2rem rgb(0 0 0 / 18%);
  border-bottom: 2px solid #ffcb05;
}
.header ul li a {
  text-transform: uppercase;
  color: #000 !important;
  padding: 20px;
  &:hover{
    color: #930 !important;
  }
}
.navbar-collapse {
  @media screen and (max-width: 768px) {
    position: absolute;
    width: 100%;
    top: 50px;
    left: 0px;
    background: rgb(255, 255, 255);
    padding: 10px 0;
    li {
      a {
        padding: 8px 20px !important;
      }
    }
  }
}
.header .nav-item {
}
.header .nav-link {
  padding-left: 20px;
  padding-right: 20px;
  @media screen and (max-width: 1110px) {
    font-size: 14px;
  }
}
.btn-change-lang {
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: relative;
  cursor: pointer;
  img {
    height: 25px;
  }
  &:hover .sub-menu{
    display: block;
  }
  @media screen and (max-width: 768px) {
    padding: 10px 20px;
    .sub-menu {
      left: 40px;
      top: 55px;
    }
  }
}
.sub-menu {
  position: absolute;
  background: #fff;
  padding: 15px 0;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0px 0px 28px 0px rgba(0, 0, 0, 0.1);
  top: 60px;
  z-index: 999;
  display: none;
  left: 50%;
  transform: translateX(-50%);
  width: 73px;
  white-space: nowrap;
}
@media only screen and (max-width: 768px) {
  .header .navbar-light .navbar-toggler{
      border-color: transparent;
      padding-left: 0;
  }
}
</style>
