import Vue from 'vue'
import DateTimePickerDemo from './DateTimePickerDemo.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(DateTimePickerDemo),
}).$mount('#app')
