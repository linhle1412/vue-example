import Vue from 'vue'
import VFacebookLogin from 'vue-facebook-login-component'

const vueFb = {}
vueFb.install = function install(Vue, options) {
  ;(function(d, s, id) {
    const fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    const js = d.createElement(s)
    js.id = id
    js.src = '//connect.facebook.net/vi_VN/sdk.js'
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')

  window.fbAsyncInit = function onSDKInit() {
    // eslint-disable-next-line no-undef
    FB.init(options)
    // eslint-disable-next-line no-undef
    FB.AppEvents.logPageView()
    // eslint-disable-next-line no-undef
    Vue.FB = FB
    window.dispatchEvent(new Event('fb-sdk-ready'))
  }
  Vue.FB = undefined
}

Vue.use(vueFb, {
  appId: process.env.fbAppId,
  autoLogAppEvents: true,
  xfbml: true,
  version: 'v6.0'
})

Vue.component('v-facebook-login', VFacebookLogin)

