import Vue from 'vue'
import VueDateTimePicker from './components/index.js'
import DateTimePickerDemo from './DateTimePickerDemo.vue'

Vue.config.productionTip = false

Vue.use(VueDateTimePicker)

new Vue({
  render: h => h(DateTimePickerDemo),
}).$mount('#app')
