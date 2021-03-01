<template>
  <div :style="{paddingBottom: '5px'}">
    <a-card :bordered="false" :style="{backgroundColor: '#F5F5F6'}">
      <a-row :style="{marginLeft: '-2px'}">
        <span>触发器: {{ 1 }}</span>
        <a-popconfirm
          title="确认删除此触发器"
          cancel-text="取消"
          ok-text="确定"
        >
          <a :style="{paddingLeft: '30px'}">删除</a>
        </a-popconfirm>
      </a-row>

      <a-row :gutter="16" :style="{paddingLeft: '10px'}">
        <a-col :span="6" :style="{paddingBottom: '10px'}">
          <a-select
            placeholder="选择触发器类型"
          >
            <a-select-option value="device">设备触发</a-select-option>
            <a-select-option value="timer">定时触发</a-select-option>
          </a-select>
        </a-col>
        <!-- 新增告警---触发器条件选择栏 -->
        <div v-if="triggerType==='device'">
          <a-col :span="24">
            <a-col :span="6" :style="{paddingBottom: '10px', paddingLeft: '-1px', paddingRight: '12px'}">
              <a-select
                placeholder="选择类型，如：属性/事件"
              >
                <a-select-option value="online">上线</a-select-option>
                <a-select-option value="offline">离线</a-select-option>
                <a-select-option value="properties">属性</a-select-option>
                <a-select-option value="event">事件</a-select-option>
              </a-select>
            </a-col>
          </a-col>
          <a-col :span="24">
            <div v-for="j in testnum" :key="j" class="ant-row">
              <a-col :span="6" :style="{paddingLeft: '-1px', paddingRight: '12px', paddingBottom: '10px'}">
                <a-auto-complete :data-source="dataSource" placeholder="过滤条件KEY" />
              </a-col>
              <a-col :span="6" :style="{paddingLeft: '3px', paddingRight: '9px', paddingBottom: '10px'}">
                <a-select placeholder="操作符">
                  <a-select-option value="eq">等于(=)</a-select-option>
                  <a-select-option value="not">不等于(!=)</a-select-option>
                  <a-select-option value="gt">大于(&gt;)</a-select-option>
                  <a-select-option value="lt">小于(&lt;)</a-select-option>
                  <a-select-option value="gte">大于等于(&gt;=)</a-select-option>
                  <a-select-option value="lte">小于等于(&lt;=)</a-select-option>
                  <a-select-option value="like">模糊(%)</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="7" :style="{paddingLeft: '7px', paddingRight: '3px', paddingBottom: '10px'}">
                <a-input placeholder="过滤条件值"/>
              </a-col>
              <a-col :span="5" :style="{textAlign: 'right', marginTop: '6px', paddingBottom: '10px'}">
                <a :style="{paddingLeft: '10px', paddingTop: '7px'}">删除</a>
              </a-col>
            </div>
          </a-col>
          <a-col :span="24">
            <div>
              <a @click="() => { testnum++ }">添加</a>
            </div>
          </a-col>
        </div>

      </a-row>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: 'AlarmTriggers',
    props: {
      triggerType: {
        type: String,
        default: 'device'
      },
      dataSource: {
        type: Array,
        default: () => ['Burns Bay Road', 'Downing Street', 'Wall Street']
      }

    },
    data () {
      return {
        testnum: 1
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
