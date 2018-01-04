import dateTimePickerComponent from 'components/dateTimePicker/DateTimePicker.vue'

const VueDateTimePicker = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('VueDateTimePicker', dateTimePickerComponent)
  }
}

export default VueDateTimePicker
