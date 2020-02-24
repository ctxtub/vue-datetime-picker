# vue-datetime-picker

一款基于 VUE 的时间日期选择器，按文档说明编译为组件后引入项目使用。



## 基本功能

- [x] 时间日期选择 / 日期选择 / 时间选择
- [x] 设置起止时间范围
- [x] 自定义 按钮 / 标题 / 单位 文案
- [x] 自动选中当前时间



## 样例

在线实例  👉  [DEMO](https://ctxtub.com/vue-datetime-picker/)

```vue
<vue-date-time-picker
      v-model="isShowPicker" 
      title="Custom Title"
      confirm="Confirm"
      cancel="Cancel"
      :transToNow="true"
      :selectedText="{
        year: '年',
        month: '月',
        day: '日',
        hour: '时',
        minute: '分'
      }"
      :startYear="startTime.year" 
      :startMonth="startTime.month" 
      :startDay="startTime.day"
      :endYear="endTime.year" 
      :endMonth="endTime.month" 
      :endDay="endTime.day"
      @syncResult="receivePickerValue"
/>
```



## 如何使用

1. 安装依赖

   ```shell
   npm install
   ```

2. 构建组件

   ```shell
   npm run build:lib
   ```

3. 项目中引入组件
   将dist目录下，`dateTimePicker.umd.js`  & `dateTimePicker.css`引入项目。

4. 挂载组件

  `main.js`入口文件中`Vue.install(..)`挂载 或者 `.vue`文件中`components`中引入。



## API

| 参数         | 说明                        | 类型    | 默认值                                                       |
| ------------ | --------------------------- | ------- | ------------------------------------------------------------ |
| v-model      | 绑定值，选择器显示/隐藏状态 | Boolean | false                                                        |
| title        | 选择器标题                  | String  | 请选择                                                       |
| confirm      | 确认按钮文案                | String  | 确定                                                         |
| cancel       | 取消按钮文案                | String  | 取消                                                         |
| transToNow   | 是否默认选中当前时间        | Boolean | true                                                         |
| selectedText | 选择器内选项单位            | Object  | { year: '年', month: '月', day: '日', hour: '时', minute: '分'} |
| startYear    | 开始年份                    | Number  | 1970                                                         |
| startMonth   | 开始月份                    | Number  | 1                                                            |
| startDay     | 开始日期                    | Number  | 1                                                            |
| endYear      | 截止年份                    | Number  | 2030                                                         |
| endMonth     | 截止月份                    | Number  | 12                                                           |
| endDay       | 截止日期                    | Number  | 31                                                           |

| 事件       | 说明               | 回调参数                  |
| ---------- | ------------------ | ------------------------- |
| syncResult | 点击确认按钮时触发 | 选择器选中结果值 `Object` |



## 目录结构

```
|-- src
  |-- DateTimePickerDemo.vue // demo文件
  |-- main.js // demo文件入口
  |-- assets
  |   |-- stylus // demo样式文件
  |       |-- base.styl
  |       |-- index.styl
  |       |-- mixin.styl
  |-- components // 时间日期选择器组件
      |-- DateTimePicker.vue
      |-- index.js
```