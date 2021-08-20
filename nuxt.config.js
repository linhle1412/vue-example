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
      { hid: "description", name: "description", content: "" }
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
    '@nuxtjs/i18n'
  ],
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
          case "talent-sponsorship":
            r.path = "/tai-nang-nhan-tai-tro";
            break;
          case "contribute":
            r.path = "/dong-gop";
            break;
          case "talent":
            r.path = "/tai-nang";
            break;
          case "talent-id":
            r.path = "/tai-nang/:id";
            break;
          case "rank":
            r.path = "/bang-vinh-danh";
            break;
          case "fund-info":
            r.path = "/thong-tin-quy";
            break;
          case "contact":
            r.path = "/lien-he";
            break;
          case "suggestion":
            r.path = "/de-xuat-tai-nang";
            break;
          case "partners":
            r.path = "/doi-tac-chien-luoc";
            break;
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
