export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Quỹ từ thiện",
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
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
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
  plugins: ["~plugins/filters.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    'nuxt-webfontloader'
  ],
  webfontloader: {
    google: {
      families: [
        'Yeseva+One:400:vietnamese',
        'Roboto+Condensed:400,700:vietnamese',
        'Oswald:500:vietnamese'
      ]
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

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
          default:
            break;
        }
      });
    }
  }
};
