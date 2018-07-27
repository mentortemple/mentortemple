require("dotenv").config();
const pkg = require("./package");
const { ProvidePlugin } = require("webpack");

module.exports = {
  mode: "universal",
  env: {
    apiUrl: process.env.API_URL
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.1.0/css/all.css"
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#ce973e" },

  /*
  ** Global CSS
  */
  css: ["@/assets/css/main.scss"],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~plugins/bootstrap.js",
    "~plugins/global-components.js",
    "~plugins/vue-disqus.js",
    {
      src: "~plugins/vue-noty.js",
      ssr: false
    },
    "~plugins/vue-gravatar.js"
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    "@nuxtjs/markdownit"
  ],
  markdownit: {
    injected: true,
    html: true,
    use: ["markdown-it-highlightjs"]
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    },
    vendor: ["jquery", "bootstrap"],
    plugins: [
      new ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    ]
  }
};
