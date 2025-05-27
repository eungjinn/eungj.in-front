// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/common.less'],
  // devtools: { enabled: true },

  devServer:{
    host: 'localhost', // 사용하고 싶은 호스트 이름으로 변경
    port: 4050, // 필요한 경우 포트 번호도 변경 가능
  },
  app:{
    head:{
      script:[
        { src: 'https://kit.fontawesome.com/593448c29d.js' },
        {type: 'text/javascript', src: "https://developers.kakao.com/sdk/js/kakao.js"},
      ],
    }
  },
  modules:[
    ['dayjs-nuxt',{
      locales:['ko'],
      defaultLocale:'ko'
    }],
  ],
  buildModules: [
    '@nuxtjs/pwa',
  ],
  // pwa: {
  //   icon: {
  //     source:'/favicon.png',
  //     fileName:'favicon.png',
  //
  //   },
  //   manifest: {
  //     name: 'vegas',
  //     lang: 'ko',
  //     useWebmanifestExtension: false
  //   },
  //   workbox: {
  //     /* workbox options */
  //   }
  // },


  /*
  modules: ['@vite-pwa/nuxt'],
  pwa: {
      registerType: 'autoUpdate',
      manifest: {
          name: '베이거스',
          short_name: '베이거스',
          description: '베이거스 야구단',
          theme_color: '#ffffff',
          start_url: '/',  // 기본 시작 URL 설정
          icons: [
              {
                  src: '/favicon.png',
                  sizes: '192x192',
                  type: 'image/png',
              },
              {
                  src: '/favicon.png',
                  sizes: '512x512',
                  type: 'image/png',
              },
          ],
      },
      workbox: {
          navigateFallback: '/',
          runtimeCaching: [
              {
                  urlPattern: /^\/$/,  // 루트 URL을 캐싱하도록 설정
                  handler: 'NetworkFirst',  // 네트워크 우선 전략 사용
              },
          ],
      },
  },

   */
  // 설정
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    loaders: {
      less: {
        // Less 옵션 설정
      }
    }
  },
  routeRules: {
    '/apis/**': {
      proxy: {
        to: process.env.NODE_ENV === 'development'
            ? 'http://localhost/eungjin-back/public/**'
            : 'https://api.eungj.in/**',
      },
    },
  },
})
