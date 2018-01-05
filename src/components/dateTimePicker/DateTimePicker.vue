<template>
  <div class="datepicker" @touchmove.prevent :value="value">
    <transition name="fade" mode="out-in">
      <div class="picker-box-bg" v-show="show" @click="show = false" @touchmove="_stopDef" @mousewheel="_stopDef"></div>
    </transition>
    <transition name="select">
      <div class="picker-box" v-show="show" @mousewheel="_stopDef">
        <div class="picker-box-header">
          <div class="picker-box-header-cancle" @click="show = false">{{cancel}}</div>
          {{title}}
          <div class="picker-box-header-confirm" @click="submit">{{confirm}}</div>
        </div>
        <div class="picker-box-content">
          <div class="picker-box-content-list" v-if="type === 'dateTime' || type === 'date'">
            <ul 
                :class="{'is_dragging': yearState.dragging}" 
                @touchstart="_onTouchStart('year', $event)" 
                @mousedown="_onTouchStart('year', $event)" 
                :style="{'transform' : 'translate3d(0,' + yearState.translateY + 'px, 0)'}">
              <li></li>
              <li></li>
              <li></li>
              <li 
                  ref="list-box"
                  v-for="(item, index) 
                  in yearState.data" 
                  :key="index" 
                  :class="{
                          'current': item === yearState.selectedId,
                          'node1':  Math.abs(index - yearState.index) == 1,
                          'node2':  Math.abs(index - yearState.index) == 2,
                          'node3':  Math.abs(index - yearState.index) >= 3
                      }">
                {{item}}{{item === yearState.selectedId ? selectedText.year: ''}}
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="picker-box-content-list" v-if="type === 'dateTime' || type === 'date'">
            <ul 
                :class="{'is_dragging': monthState.dragging}" 
                @touchstart="_onTouchStart('month', $event)" 
                @mousedown="_onTouchStart('month', $event)" 
                :style="{'transform' : 'translate3d(0,' + monthState.translateY + 'px, 0)'}">
              <li></li>
              <li></li>
              <li></li>
              <li 
                  v-for="(item, index) in monthState.data" 
                  :key="index" 
                  :class="{
                          'current': item === monthState.selectedId,
                          'node1':  Math.abs(index - monthState.index) == 1,
                          'node2':  Math.abs(index - monthState.index) == 2,
                          'node3':  Math.abs(index - monthState.index) >= 3
                  }">
                {{item}}{{item === monthState.selectedId ? selectedText.month: ''}}
                </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="picker-box-content-list" v-if="type === 'dateTime' || type === 'date'">
            <ul 
                ref:area-list 
                :class="{'is_dragging': dayState.dragging}" 
                @touchstart="_onTouchStart('day', $event)" 
                @mousedown="_onTouchStart('day', $event)" 
                :style="{'transform' : 'translate3d(0,' + dayState.translateY + 'px, 0)'}">
              <li></li>
              <li></li>
              <li></li>
              <li 
                  v-for="(item, index) in dayState.data" 
                  :key="index" 
                  :class="{
                      'current': item === dayState.selectedId,
                      'node1':  Math.abs(index - dayState.index) == 1,
                      'node2':  Math.abs(index - dayState.index) == 2,
                      'node3':  Math.abs(index - dayState.index) >= 3
                  }">
              {{item}}{{item === dayState.selectedId ? selectedText.day: ''}}
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="picker-box-content-list" v-if="type === 'dateTime' || type === 'time'">
            <ul 
                :class="{'is_dragging': hourState.dragging}" 
                @touchstart="_onTouchStart('hour', $event)" 
                @mousedown="_onTouchStart('hour', $event)" 
                :style="{'transform' : 'translate3d(0,' + hourState.translateY + 'px, 0)'}">
              <li></li>
              <li></li>
              <li></li>
              <li 
                  ref="list-box"
                  v-for="(item, index) 
                  in hourState.data" 
                  :key="index" 
                  :class="{
                          'current': item === hourState.selectedId,
                          'node1':  Math.abs(index - hourState.index) == 1,
                          'node2':  Math.abs(index - hourState.index) == 2,
                          'node3':  Math.abs(index - hourState.index) >= 3
                      }">
                {{item}}{{item === hourState.selectedId ? selectedText.hour: ''}}
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="picker-box-content-list" v-if="type === 'dateTime' || type === 'time'">
            <ul 
                :class="{'is_dragging': minuteState.dragging}" 
                @touchstart="_onTouchStart('minute', $event)" 
                @mousedown="_onTouchStart('minute', $event)" 
                :style="{'transform' : 'translate3d(0,' + minuteState.translateY + 'px, 0)'}">
              <li></li>
              <li></li>
              <li></li>
              <li 
                  v-for="(item, index) in minuteState.data" 
                  :key="index" 
                  :class="{
                          'current': item === minuteState.selectedId,
                          'node1':  Math.abs(index - minuteState.index) == 1,
                          'node2':  Math.abs(index - minuteState.index) == 2,
                          'node3':  Math.abs(index - minuteState.index) >= 3
                  }">
                {{item}}{{item === minuteState.selectedId ? selectedText.minute: ''}}
                </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <hr class="selected-top-line">
        <hr class="selected-bottom-line">
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'VueDateTimePicker',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'dateTime'
    },
    transToNow: {
      type: Boolean,
      default: false
    },
    selectedText: {
      type: Object,
      default () {
        return {
          year: '年',
          month: '月',
          day: '日',
          hour: '时',
          minute: '分'
        }
      }
    },
    startYear: {
      type: Number,
      default: 1970
    },
    startMonth: {
      type: Number,
      default: 1
    },
    startDay: {
      type: Number,
      default: 1
    },
    endYear: {
      type: Number,
      default: null
    },
    endMonth: {
      type: Number,
      default: null
    },
    endDay: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: '请选择'
    },
    confirm: {
      type: String,
      default: '确定'
    },
    cancel: {
      type: String,
      default: '取消'
    }
  },
  data () {
    return {
      show: this.value,
      result: null,
      firstShow: true,
      dateControlFlag: false,
      target: '',
      yearState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      monthState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      dayState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      hourState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      minuteState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      delta: 0,
      slideEls: null
    }
  },
  mounted () {
    if (this.transToNow) {
      this.initNowData()
    } else {
      this.initMinData()
    }

    if (this.startMonth !== 1 || this.startDay !== 1 || this.endMonth || this.endDay) {
      this.dateControlFlag = true
    }

    this._onTouchMove = this._onTouchMove.bind(this)
    this._onTouchEnd = this._onTouchEnd.bind(this)
  },
  watch: {
    value (newVal) {
      this.show = newVal
    },
    show (newVal) {
      this.$emit('input', this.show)

      if (this.result) {
        this.$emit('syncResult', this.result)
      }

      if (this.firstShow) {
        this.transToSetDay(300)
        this.firstShow = false
      }
    }
  },
  methods: {
    computedYear () {
      const year = this.endYear ? this.endYear : new Date().getFullYear() + 10
      let yearData = []

      for (let i = this.startYear; i <= year; i++) {
        yearData.push(i)
      }

      return yearData
    },
    computedMonth () {
      let monthData = []

      const startControl = this.startControlComputed()
      const endControl = this.endControlComputed()
      const sameResult = this.sameComputed()

      // caculate min month
      if (startControl.yearFlag && !sameResult.sameYear) {
        const minMonth = this.startMonth
        for (let i = minMonth; i <= 12; i++) {
          monthData.push(i)
        }
        return monthData
      }
      // caculate max month
      if (endControl.yearFlag && !sameResult.sameYear) {
        const maxMonth = this.endMonth
        for (let i = 1; i <= maxMonth; i++) {
          monthData.push(i)
        }
        return monthData
      }
      // caculate max and min month
      if (startControl.yearFlag && endControl.yearFlag && sameResult.sameYear) {
        const minMonth = this.startMonth
        const maxMonth = this.endMonth
        for (let i = minMonth; i <= maxMonth; i++) {
          monthData.push(i)
        }
        return monthData
      }

      // others
      for (let i = 1; i <= 12; i++) {
        monthData.push(i)
      }

      return monthData
    },
    computedDay () {
      let dayData = []
      const year = this.yearState.selectedId
      const month = this.monthState.selectedId
      const current = new Date(year, month, 0)
      var currentDay = current.getDate()

      const startControl = this.startControlComputed()
      const endControl = this.endControlComputed()
      const sameResult = this.sameComputed()

      const startFlag = startControl.yearFlag && startControl.monthFlag
      const endFlag = endControl.yearFlag && endControl.monthFlag
      const startEndSame = sameResult.sameYear && sameResult.sameMonth

      // calculate min day
      if (startFlag && !startEndSame) {
        const minDay = this.startDay
        for (let i = minDay; i <= currentDay; i++) {
          dayData.push(i)
        }
        return dayData
      }

      // calculate max day
      if (endFlag && !startEndSame) {
        const maxDay = this.endDay
        for (let i = 1; i <= maxDay; i++) {
          dayData.push(i)
        }
        return dayData
      }

      // calculate min and max day
      if (startFlag && endFlag && startEndSame) {
        const minDay = this.startDay
        const maxDay = this.endDay
        for (let i = minDay; i <= maxDay; i++) {
          dayData.push(i)
        }
        return dayData
      }

      // others
      for (let i = 1; i < currentDay + 1; i++) {
        dayData.push(i)
      }
      return dayData
    },
    computedHour () {
      let hourData = []

      for (let i = 0; i <= 23; i++) {
        hourData.push(i < 10 ? '0' + i : i)
      }

      return hourData
    },
    computedMinute () {
      let minuteData = []

      for (let i = 0; i < 60; i++) {
        minuteData.push(i < 10 ? '0' + i : i)
      }

      return minuteData
    },
    startControlComputed () {
      let startControlResult = {}
      startControlResult.yearFlag = this.yearState.selectedId === this.startYear
      startControlResult.monthFlag = this.monthState.selectedId === this.startMonth
      return startControlResult
    },
    endControlComputed () {
      let endControlResult = {}
      endControlResult.yearFlag = this.yearState.selectedId === this.endYear
      endControlResult.monthFlag = this.monthState.selectedId === this.endMonth
      return endControlResult
    },
    sameComputed () {
      let sameResult = {}
      sameResult.sameYear = this.startYear === this.endYear
      sameResult.sameMonth = this.startMonth === this.endMonth
      return sameResult
    },
    initNowData () {
      const curDate = new Date()
      const yearState = this.yearState
      const monthState = this.monthState
      const dayState = this.dayState
      const hourState = this.hourState
      const minuteState = this.minuteState

      yearState.data = this.computedYear()
      yearState.selectedId = curDate.getFullYear()

      this.monthState.data = this.computedMonth()
      monthState.selectedId = curDate.getMonth() + 1

      this.dayState.data = this.computedDay()
      dayState.selectedId = curDate.getDate()

      hourState.data = this.computedHour()
      hourState.selectedId = curDate.getHours() < 10 ? '0' + curDate.getHours() : curDate.getHours()

      minuteState.data = this.computedMinute()
      minuteState.selectedId = curDate.getMinutes() < 10 ? '0' + curDate.getMinutes() : curDate.getMinutes()

      if (this.value) {
        this.transToSetDay(300)
        this.firstShow = false
      }
    },
    initMinData () {
      const yearState = this.yearState
      const monthState = this.monthState
      const dayState = this.dayState
      const hourState = this.hourState
      const minuteState = this.minuteState

      yearState.data = this.computedYear()
      yearState.selectedId = this.startYear

      this.monthState.data = this.computedMonth()
      monthState.selectedId = this.startMonth

      this.dayState.data = this.computedDay()
      dayState.selectedId = this.startDay

      hourState.data = this.computedHour()
      hourState.selectedId = '00'

      minuteState.data = this.computedMinute()
      minuteState.selectedId = '00'

      if (this.value) {
        this.transToSetDay(300)
        this.firstShow = false
      }
    },
    transToSetDay (delay) {
      const yearState = this.yearState
      const monthState = this.monthState
      const dayState = this.dayState
      const hourState = this.hourState
      const minuteState = this.minuteState

      this.$nextTick(() => {
        setTimeout(() => {
          const height = this.$refs['list-box'][0].getBoundingClientRect().height
          for (let i = 0; i < yearState.data.length; i++) {
            if (yearState.selectedId === yearState.data[i]) {
              yearState.index = i
            }
          }
          yearState.translateY = -height * yearState.index

          for (let i = 0; i < monthState.data.length; i++) {
            if (monthState.selectedId === monthState.data[i]) {
              monthState.index = i
            }
          }
          monthState.translateY = -height * monthState.index

          for (let i = 0; i < dayState.data.length; i++) {
            if (dayState.selectedId === dayState.data[i]) {
              dayState.index = i
            }
          }
          dayState.translateY = -height * dayState.index

          for (let i = 0; i < hourState.data.length; i++) {
            if (hourState.selectedId === hourState.data[i]) {
              hourState.index = i
            }
          }
          hourState.translateY = -height * hourState.index

          for (let i = 0; i < minuteState.data.length; i++) {
            if (minuteState.selectedId === minuteState.data[i]) {
              minuteState.index = i
            }
          }
          minuteState.translateY = -height * minuteState.index
        }, !delay ? 0 : delay)
      })
    },
    submit () {
      switch (this.type) {
        case 'dateTime':
          this.result = {
            'year': this.yearState.data[this.yearState.index],
            'month': this.monthState.data[this.monthState.index],
            'day': this.dayState.data[this.dayState.index],
            'hour': this.hourState.data[this.hourState.index],
            'minute': this.minuteState.data[this.minuteState.index]
          }
          break
        case 'date':
          this.result = {
            'year': this.yearState.data[this.yearState.index],
            'month': this.monthState.data[this.monthState.index],
            'day': this.dayState.data[this.dayState.index]
          }
          break
        case 'time':
          this.result = {
            'hour': this.hourState.data[this.hourState.index],
            'minute': this.minuteState.data[this.minuteState.index]
          }
          break
      }
      this.show = false
    },
    transToMonthFilter () {
      const monthLength = this.monthState.data.length
      if (this.monthState.data[monthLength - 1] < this.monthState.selectedId || this.monthState.data[0] > this.monthState.selectedId) {
        this.monthState.selectedId = this.monthState.data[0]
        this.monthState.translateY = 0
        this.monthState.index = 0
      }
    },
    transToDayFilter () {
      const dayLength = this.dayState.data.length
      if (this.dayState.data[dayLength - 1] < this.dayState.selectedId || this.dayState.data[0] > this.dayState.selectedId) {
        this.dayState.selectedId = this.dayState.data[0]
        this.dayState.translateY = 0
        this.dayState.index = 0
      }
    },
    getSelectedData (index) {
      let target = this.target
      let thisData = this[target + 'State']
      thisData.selectedId = thisData.data[index]

      if (target === 'year') {
        this.monthState.data = this.computedMonth()
        this.dayState.data = this.computedDay()
        this.transToMonthFilter()
        this.transToDayFilter()
      }
      if (target === 'month') {
        this.dayState.data = this.computedDay()
        this.transToDayFilter()
      }

      if (this.dateControlFlag) {
        this.transToSetDay()
      }
    },
    setPage () {
      let target = this.target
      let thisData = this[target + 'State']
      let clientHeight = this.slideEls[0].getBoundingClientRect().height
      let total = thisData.data.length
      let goPage = Math.round((thisData.translateY / clientHeight).toFixed(1))
      if (goPage > 0) {
        goPage = 0
      }
      goPage = total - 1 >= Math.abs(goPage) ? goPage : -(total - 1)
      let index = Math.abs(goPage)
      thisData.index = index
      this.getSelectedData(index)
      thisData.translateY = goPage * clientHeight
    },
    _getTouchPos (e) {
      return e.changedTouches ? e.changedTouches[0]['pageY'] : e['pageY']
    },
    _getElem (e) {
      return Array.from(e.currentTarget.children).slice(3, -3)
    },
    _onTouchStart (target, e) {
      let thisData = this[target + 'State']
      this.target = target
      this.slideEls = this._getElem(e)
      this.delta = 0
      thisData.startPos = this._getTouchPos(e)
      thisData.startTranslateY = thisData.translateY
      thisData.dragging = true
      document.addEventListener('touchmove', this._onTouchMove, false)
      document.addEventListener('touchend', this._onTouchEnd, false)
      document.addEventListener('mousemove', this._onTouchMove, false)
      document.addEventListener('mouseup', this._onTouchEnd, false)
    },
    _onTouchMove (e) {
      let target = this.target
      let thisData = this[target + 'State']
      this.delta = this._getTouchPos(e) - thisData.startPos
      thisData.translateY = thisData.startTranslateY + this.delta
      if (Math.abs(this.delta) > 0) {
        e.preventDefault()
      }
    },
    _onTouchEnd (e) {
      let target = this.target
      let thisData = this[target + 'State']
      thisData.dragging = false
      this.setPage()
      document.removeEventListener('touchmove', this._onTouchMove)
      document.removeEventListener('touchend', this._onTouchEnd)
      document.removeEventListener('mousemove', this._onTouchMove)
      document.removeEventListener('mouseup', this._onTouchEnd)
    },
    _stopDef (e) {
      e.preventDefault()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin'

.datepicker
  .picker-box-bg
    background rgba(0, 0, 0, .35)
    z-index 9998
    position fixed
    top 0
    bottom 0
    left 0
    right 0
  .picker-box
    position fixed
    z-index 9999
    background #fff
    bottom 0
    left 0
    right 0
  .picker-box-header
    background-color #eee
    height cal(40)
    line-height cal(40)
    overflow hidden
    text-align center
    font-size 18px
  .picker-box-header-cancle
    float left
    padding 0 cal(10)
    color #078ffd
    font-size 18px
  .picker-box-header-confirm
    float right
    padding 0 cal(10)
    color #ff5657
    font-size 18px
  .picker-box-content
    display flex
    width 100%
    margin 0 auto
    background #fff
    overflow hidden
    height cal(225)
    overflow hidden
  .picker-box-content-list
    flex 1 1 0%
    text-align center
    ul
      margin 0
      padding 0
      -webkit-transition all .3s ease
      transition all .3s ease
      &.is_dragging
        -webkit-transition none
        transition none
    li
      margin 0
      padding 0
      line-height cal(32)
      height cal(32)
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      font-size 14px
      &.current
        font-size 18px
        font-weight normal
      &.node1
        font-size 16px
        opacity .7
      &.node2
        font-size 14px
        opacity .5
      &.node3
        font-size 14px
        opacity .3
  .selected-top-line
    width 100%
    border none
    border-top 1px solid #eee
    position absolute
    bottom cal(125)
    margin 0
    height 0
  .selected-bottom-line
    width 100%
    border none
    border-top 1px solid #eee
    position absolute
    bottom cal(98)
    margin 0
    height 0
  .fade-enter-active,
  .fade-leave-active
    transition all .2s ease
  .fade-enter,
  .fade-leave-active
    opacity 0
  .select-enter-active,
  .select-leave-active
    transition all .3s ease
  .select-enter,
  .select-leave-active
    transform translate(0, cal(265))
</style>
