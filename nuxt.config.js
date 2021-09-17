export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Quỹ Phát triển tài năng Việt",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      {
        hid: "og:title",
        property: "og:title",
        content: "Quỹ Phát triển tài năng Việt"
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://quyphattrientainangviet.akadigital.vn"
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Quỹ Phát triển tài năng Việt"
      },
      {
        hid: "description",
        name: "description",
        content: "Quỹ Phát triển tài năng Việt"
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "article"
      },
      {
        hid: "og:image",
        property: "og:image",
        content: '/icon.jpg'
      },
      {
        hid: 'image',
        name: 'image',
        content: '/icon.jpg'
      },
      {
        hid: 'fb:app_id',
        property: 'fb:app_id',
        content: '810401282889398'
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com"
      },
      {
        rel: "prefetch",
        as: "font",
        type: "font/woff",
        href: "/fonts/MicrobrewSoftOneD.woff"
      },
      {
        rel: "prefetch",
        as: "font",
        type: "font/woff2",
        href: "/fonts/MicrobrewSoftOneD.woff2"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "/fonts/font.css"
      }
    ],
    script: [
      { src: 'https://use.fontawesome.com/d9800c8843.js' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/app.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~plugins/filters.js",
    "~plugins/plugin.js",
    "~plugins/util.js",
    "~plugins/api.js",
    "~/plugins/i18n.js",
    { src: '~/plugins/fb-sdk.js', ssr: false },
    { src: '~/plugins/vue-pdf.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    'nuxt-webfontloader',
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    'cookie-universal-nuxt',
  ],
  toast: {
    position: 'bottom-right',
    duration: 3000
  },
  axios: {
    baseURL: 'https://tnv.eyeteam.vn', // Used as fallback if no runtime config is provided
  },
  i18n: {
    baseUrl: 'https://quyphattrientainangviet.vn',
    langDir: 'langs/',
    locales: [
      {
        code: 'en',
        file: 'en.json',
        iso: 'en-US',
      },
      {
        code: 'vi',
        file: 'vi.json',
        iso: 'vi-VI',
      },
    ],
    // defaultLocale: 'vi',
    vuex: {
      moduleName: 'i18n',
      syncRouteParams: true
    },
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
    },
    parsePages: false,
    pages: {
      'talent-sponsorship': {
        vi: '/danh-sach-tai-nang-da-nhan-tai-tro',
        en: '/list-talents-that-are-sponsored', 
      },
      contribute: {
        vi: '/dong-gop',
        en: '/contribution', 
      },
      // 'talent-id': {
      //   vi: '/tai-nang/:id',
      //   en: '/talent/:id', 
      // },
      'talent/index': {
        vi: '/tai-nang-duoc-tai-tro',
        en: '/talents-that-are-sponsored', 
      },
      'talent/_id': {
        vi: '/tai-nang/:id',
        en: '/talent/:id',
      },
      rank: {
        vi: '/bang-vinh-danh',
        en: '/the-honors-list', 
      },
      'fund-info': {
        vi: '/thong-tin-quy',
        en: '/fund-information', 
      },
      suggestion: {
        vi: '/de-xuat-tai-nang',
        en: '/talent-suggestion', 
      },
      contact: {
        vi: '/lien-he',
        en: '/contact', 
      },
      partners: {
        vi: '/doi-tac-chien-luoc',
        en: '/strategic-partnership', 
      },
    }
  },
  webfontloader: {
    google: {
      families: [
        'Yeseva+One:400:vietnamese&display=swap',
        'Roboto+Condensed:400,700:vietnamese&display=swap',
        'Oswald:500:vietnamese&display=swap'
      ]
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.pdf$/,
        use: 'url-loader'
      })
    },
    extractCSS: true
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.forEach(r => {
        switch (r.name) {
          case "success":
            r.path = "/thank-you";
            break;
          case "fail":
            r.path = "/that-bai";
            break;
          default:
            break;
        }
      });
    }
  }
};
