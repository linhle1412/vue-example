<template>
  <div class="page-index bg-home">
    <div class="bg-leaf-banner-bottom">
      <div class="container">
        <div class="row">
          <div class="col-12 py-5 mb-3">
            <div class="logo logo-small text-center">
              <img src="~/assets/images/slogan.png" alt="" />
            </div>
          </div>
          <div class="col-lg-9 mx-auto">
            <div class="info-item" v-for="(item, index) in informations" :key="index">
              <div class="info-item-title"><span>{{item.title_i18n[$i18n.locale]}}</span></div>
              <div class="info-item-content row" >
                <div class="col-md-8" v-html="item.content_i18n[$i18n.locale]"></div>
                <div class="col-md-4">
                  <div class="image" v-bind:style="{'background-image': 'url('+ item.image.medium + ')'}"></div>
                </div>
              </div>
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
      await store.dispatch('fetchInformations')
    } catch (e) {
    }
  },
  data() {
    return {
      informations: this.$store.state.informations,
    };
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.info-item {
  border: 1px solid #222;
  border-top-color: transparent;
  border-radius: 20px;
  padding: 30px;
  position: relative;
  margin-bottom: 60px;
  .info-item-title {
    position: absolute;
    top: 0;
    left: 0;
    text-transform: uppercase;
    font-size: 28px;
    font-weight: bold;
    width: 100%;
    display: flex;
    span {
      margin: 0 20px;
      margin-top: -20px;
    }
    &::after, &::before {
      content: '';
      border: 1px solid transparent;
      border-top-color: #222;
    }
    &::after {
      border-top-right-radius: 17px;
      flex: 1 1;
    }
    &::before {
      border-top-left-radius: 17px;
      flex: 0 0 30px;
    }
  }
  .info-item-content {
    color: #444;
    &>div:first-child {
      @media screen and (max-width: 768px) {
        margin-bottom: 20px;
      }
    }
    .image {
      border-radius: 15px;
      padding-bottom: 70%;   
      background-position: center;
      background-size: cover;   
    }
  }
}
</style>
