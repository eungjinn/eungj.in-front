export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './pages/**/*.{vue,js}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      padding:{
        'card':'66.66667%',
        'video':'56.25%',
        'full':'100%',
        'half':'50%',
        '130':'130%'
      },
      width:{
        '1280px':'1280px',
        '960px':'960px',
        '800px':'800px',
        '720px':'720px',
        '640px':'640px',
        '540px':'540px',
        '480px':'480px',
        '360px':'360px',
        '240px':'240px',
        '120px':'120px',
        '120':'30rem',
      },
      height:{
        '300px':'300px',
        '450px':'450px',
      },
      maxWidth:{
        '600px':'600px',
        '1/2':'50%',
      },
      maxHeight:{
        '600px':'600px',
        '1/2':'50%',
      },
      fontFamily: {
        sans: ['SUIT'],
      },
      colors:{
        'primary':'#d43f3a',
      },
      lineHeight:{
        '0':'normal'
      }
    },
    fontFamily: {
      sans: ['SUIT'],
    },
  },
  plugins: [],
}