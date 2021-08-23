<template>
  <div class="text-center">
    <div class="title mb-4"><slot></slot></div>
    <v-facebook-login
      ref="facebook-login"
      @login="onLoginFacebook"
      :app-id="appId"
      style="opacity: 0; position: absolute; z-index: -1"
    >
    </v-facebook-login>
    <div class="btn-facebook" @click="$refs['facebook-login'].$el.click()">
      <img src="~/assets/images/facebook-app-logo.png" alt="">
      Log in in with Facebook
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      appId: '810401282889398'
    }
  },
  methods: {
    ...mapActions(['loginFacebook']),
    async onLoginFacebook(obj) {
      try {
        await this.loginFacebook(obj.authResponse.accessToken)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .title {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 18px;
  }
  .btn-facebook {
    background: rgb(66,91, 133);
    color: #fff;
    height: 45px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    cursor: pointer;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 3px;
    img {
      width: 20px;
      margin-right: 13px;
    }
  }
</style>