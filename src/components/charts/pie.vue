<template>
  <div ref="dom" class="charts chart-pie"></div>
</template>

<script>
  import echarts from 'echarts'
  import tdTheme from './theme.json'
  import {
    on,
    off
  } from '@/libs/tools'
  echarts.registerTheme('tdTheme', tdTheme)
  export default {
    name: 'ChartPie',
    props: {
      value: Array,
      text: String,
      subtext: String
    },
    data() {
      return {
        dom: null
      }
    },
    methods: {
      resize() {
        this.dom.resize()
      }
    },
    mounted() {
      this.$nextTick(() => {
        let option = {
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
          },
          series: [{
            name: '使用率',
            type: 'gauge',
            detail: {
              formatter: '{value}%'
            },
            radius: 75,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [
                  [0.2, '#228b22'],
                  [0.8, '#48b'],
                  [1, '#ff4500']
                ],
                width: 8
              }
            },
            axisTick: { // 坐标轴小标记
              splitNumber: 10, // 每份split细分多少段
              length: 12, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 5
            },
            detail: {
              formatter: '{value}%',
              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: 'auto',
                fontWeight: 'bolder',
                fontSize: 15
              }
            },
            title: {
              show: false,
            },
            data: [{
              value: 50,
              name: 'CPU'
            }]
          }]
        };
        this.dom = echarts.init(this.$refs.dom)
        this.dom.setOption(option)
        setInterval(_ => {
          option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
          this.dom.setOption(option, true)
        }, 2000);
        on(window, 'resize', this.resize)
      })
    },
    beforeDestroy() {
      off(window, 'resize', this.resize)
    }
  }
</script>
