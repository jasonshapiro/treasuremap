import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCpjV1Ufhe7Lfe5yOAKWKbJExy-SqT57AE',
      libraries: 'places,drawing'
    }
  })

