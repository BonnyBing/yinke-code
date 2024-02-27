import Vue from 'vue'
import App from './App.vue'
import {i18n} from '@/plugins/i18n'

Vue.config.productionTip = false
Vue.use(i18n,{
  greeting:{
    hello:'你好',
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
