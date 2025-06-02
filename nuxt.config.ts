// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  ssr: false,
  css: [
    "~/assets/css/bootstrap.min.css", // Your custom CSS file
    "~/assets/css/style.css", // Your custom CSS file
    "~/assets/css/tags.min.css", // Your custom CSS file
  ],
  router: {
    options: {
      hashMode: true,
    },
  },
  app: {
    head: {
      script: [
        {
          type: "text/javascript",
          src: "/js/bootstrap.min.js",
        },
        {
          type: "text/javascript",
          src: "/js/style.js",
        },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&family=Ubuntu:wght@400;500;700&display=swap",
        },
      ],
    },
  },
  nitro: {
    output: {
      dir: "dist",
      publicDir: "dist",
    },
  },
});
