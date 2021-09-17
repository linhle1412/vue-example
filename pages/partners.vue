<template>
  <div class="page-index bg-home bg-fund-info">
    <div class="bg-leaf-banner-bottom bolder-1">
      <div class="container">
        <div class="row">
          <div class="col-12 py-5">
            <div class="logo logo-small text-center">
              <img src="~/assets/images/slogan.png" class="thumb" alt="" />
            </div>
          </div>
          <div class="col-md-6" v-for="(item, index) in partners" :key="index">
            <div class="info-item">
              
              <img :src="item.image.small" :alt="item.title">
              <div class="info-item-title">{{item.title_i18n[$i18n.locale]}}</div>
              <div class="info-item-content" v-html="item.content_i18n[$i18n.locale]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  async fetch({ store, params, redirect, query }) {
    try {
      await store.dispatch('fetchPartners')
    } catch (e) {
    }
  },
  data() {
    return {
      partners: this.$store.state.partners,
    };
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.col-md-6 {
  padding: 15px;
}
.info-item {
  border-radius: 20px;
  padding: 40px 30px;
  position: relative;
  text-align: center;
  background: #fff;
  height: 100%;
  .info-item-title {
    text-transform: uppercase;
    font-size: 22px;
    font-family: "Yeseva One", sans-serif;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  img {
    height: 70px;
    width: auto;
  }
  .info-item-content {
    color: #444;
  }
}
</style>
