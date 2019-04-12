<template>
  <div id="app">
    <div class="intro">默认样式：</div>
    <div class="button-wrap" @click="showDateTimePicker">
      <div class="tips">点击弹出 日期时间选择器</div>
      <div class="result">当前值：{{dateTimePickerResult}}</div>
    </div>
    <DateTimePicker
      v-model="dateTimePickerIsShow" 
      @syncResult="syncDateTimePicker"/>
    
    <div class="intro">限制起止时间、自定义提示文字、初始化滚动到当前日期和时间：</div>
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


    <div class="intro">日期选择器、初始化滚动到当前日期：</div>
    <div class="button-wrap" @click="showDateTimePicker3">
      <div class="tips">点击弹出 日期选择器（自定义）</div>
      <div class="result">当前值：{{dateTimePickerResult3}}</div>
    </div>
    <DateTimePicker
      type="date"
      :transToNow="true"
      v-model="dateTimePickerIsShow3" 
      @syncResult="syncDateTimePicker3"/>

    <div class="intro">时间选择器：</div>
    <div class="button-wrap" @click="showDateTimePicker4">
      <div class="tips">点击弹出 时间选择器（自定义）</div>
      <div class="result">当前值：{{dateTimePickerResult4}}</div>
    </div>
    <DateTimePicker
      type="time"
      v-model="dateTimePickerIsShow4" 
      @syncResult="syncDateTimePicker4"/>

  </div>
</template>

<script>
import DateTimePicker from '@/components/DateTimePicker'

export default {
  name: 'app',
  data () {
    return {
      dateTimePickerIsShow: false,
      dateTimePickerResult: '未选择',
      dateTimePickerIsShow2: true,
      startTime: {},
      endTime: {},
      dateTimePickerResult2: '未选择',
      dateTimePickerIsShow3: false,
      dateTimePickerResult3: '未选择',
      dateTimePickerIsShow4: false,
      dateTimePickerResult4: '未选择'
    }
  },
  created () {
    this.calRootFontSize()

    this.timeControl()

    window.onresize = () => {
      window.location.reload()
    }
  },
  methods: {
    calRootFontSize () {
      const html = document.getElementsByTagName('html')[0]
      // caculate rootFontSzie
      const pageWidth = html.clientWidth
      const pageHeight = html.clientHeight
      if (pageWidth < pageHeight) {
        html.style.fontSize = pageWidth / 10 + 'px'
      } else {
        html.style.fontSize = pageHeight / 10 + 'px'
      }
    },
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
      const diff = 90 * 24 * 60 * 60 * 1000
      const endDay = new Date(Number(+today) + diff)

      this.startTime.year = today.getFullYear()
      this.startTime.month = today.getMonth() + 1
      this.startTime.day = today.getDate()

      this.endTime.year = endDay.getFullYear()
      this.endTime.month = endDay.getMonth() + 1
      this.endTime.day = endDay.getDate()
    },
    showDateTimePicker3 () {
      this.dateTimePickerIsShow3 = true
    },
    syncDateTimePicker3 (result) {
      this.dateTimePickerResult3 = result.year + '-' + result.month + '-' + result.day
    },
    showDateTimePicker4 () {
      this.dateTimePickerIsShow4 = true
    },
    syncDateTimePicker4 (result) {
      this.dateTimePickerResult4 = result.hour + ':' + result.minute
    }
  },
  components: {
    DateTimePicker
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'assets/stylus/mixin'
html,body
  margin 0
  padding 0
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  .intro
    width cal(350)
    margin 0 auto
    padding cal(10) 0
    line-height 20px
    font-size 16px
    color #666
  .button-wrap
    width cal(350)
    height cal(60)
    margin 0 auto cal(50) auto
    font-size 18px
    color #fff
    background #31d06b
    border-radius cal(30)
    text-align center
    .tips,.result
      height cal(30)
      line-height cal(30)
    .result
      font-size: 16px
    
</style>
