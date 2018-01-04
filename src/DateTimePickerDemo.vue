<template>
  <div id="app">
    <div class="button-wrap" @click="showDateTimePicker">
      <div class="tips">点击弹出 日期时间选择器</div>
      <div class="result">当前值：{{dateTimePickerResult}}</div>
    </div>
    <DateTimePicker 
      v-model="dateTimePickerIsShow" 
      @syncResult="syncDateTimePicker"/>

    <div class="button-wrap" @click="showDateTimePicker2">
      <div class="tips">点击弹出 日期时间选择器（自定义）</div>
      <div class="result">当前值：{{dateTimePickerResult2}}</div>
    </div>
    <DateTimePicker 
      v-model="dateTimePickerIsShow2" 
      title="Custom Title"
      confirm="Confirm"
      cancel="Cancel"
      :transToNow="true"
      :selectedText="{
        year: 'Y',
        month: 'M',
        day: 'D',
        hour: '',
        minute: ''
      }"
      :startYear="startTime.year" 
      :startMonth="startTime.month" 
      :startDay="startTime.day"
      :endYear="endTime.year" 
      :endMonth="endTime.month" 
      :endDay="endTime.day"
      @syncResult="syncDateTimePicker2"/>

  </div>
</template>

<script>
import DateTimePicker from 'components/dateTimePicker/DateTimePicker'

export default {
  name: 'app',
  data () {
    return {
      dateTimePickerIsShow: false,
      dateTimePickerResult: '未选择',
      dateTimePickerIsShow2: true,
      startTime: {},
      endTime: {},
      dateTimePickerResult2: '未选择'
    }
  },
  created () {
    const html = document.getElementsByTagName('html')[0]
    // caculate rootFontSzie
    const pageWidth = html.clientWidth
    const pageHeight = html.clientHeight
    if (pageWidth < pageHeight) {
      html.style.fontSize = pageWidth / 10 + 'px'
    } else {
      html.style.fontSize = pageHeight / 10 + 'px'
    }

    this.timeControl()
  },
  methods: {
    showDateTimePicker () {
      this.dateTimePickerIsShow = true
    },
    syncDateTimePicker (result) {
      this.dateTimePickerResult = result.year + '-' + result.month + '-' + result.day + ' ' + result.hour + ':' + result.minute
    },
    showDateTimePicker2 () {
      this.dateTimePickerIsShow2 = true
    },
    syncDateTimePicker2 (result) {
      this.dateTimePickerResult2 = result.year + '-' + result.month + '-' + result.day + ' ' + result.hour + ':' + result.minute
    },
    timeControl () {
      const today = new Date()
      const diff = 480 * 24 * 60 * 60 * 1000
      const endDay = new Date(Number(+today) + diff)

      this.startTime.year = today.getFullYear()
      this.startTime.month = today.getMonth() + 1
      this.startTime.day = today.getDate()

      this.endTime.year = endDay.getFullYear()
      this.endTime.month = endDay.getMonth() + 1
      this.endTime.day = endDay.getDate()
    }
  },
  components: {
    DateTimePicker
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/mixin'
html,body
  margin 0
  padding 0
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
  .button-wrap
    width cal(350)
    height cal(60)
    margin cal(50) auto
    font-size 18px
    color #fff
    background #31d06b
    border-radius cal(30)
    .tips,.result
      height cal(30)
      line-height cal(30)
    .result
      font-size: 16px
    
</style>
