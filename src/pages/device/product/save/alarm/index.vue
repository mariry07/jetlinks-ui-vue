<template>
  <div>
    <com-modal :width="'70%'" :title="title" :visible="showModal" @SetModalOk="SetModalOk" @SetModalCancel="SetModalCancel">
      <div :style="{maxHeight: '750px', 'overflow-y': 'auto', 'overflow-x': 'hidden'}">
        <a-form :form="form" :wrapperCol="{span: 20}" :labelCol="{span: 4}">
          <a-row :gutter="16" :style="{marginLeft: '0.1%'}">
            <a-col :span="12">
              <a-form-item label="告警名称" key="name">
                <a-input
                  placeholder="输入告警名称"
                  v-decorator="['name', {
                    rules: [
                    ]
                  }]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-card :style="{marginBottom: '10px'}" :bordered="false" size="small">
            <p :style="{fontSize: 16}">触发条件
              <a-tooltip>
                <template slot="title">
                  触发条件满足条件中任意一个即可触发
                </template>
                <a-icon type="question-circle-o" :style="{paddingLeft: '10px'}"/>
              </a-tooltip>
              <a-switch key="shakeLimit.enabled" checkedChildren="开启防抖" unCheckedChildren="关闭防抖" :style="{marginLeft: '20px'}"/>
              <template v-if="true">
                <a-input :style="{width: '80px', marginLeft: '3px'}" size="small" key="shakeLimit.time"/>秒内发生
                <a-input :style="{width: '80px'}" size="small" key="shakeLimit.threshold"/>次及以上时，处理
                <a-radio-group :default-value="true" button-style="solid" key="shakeLimit.alarmFirst" size="small">
                  <a-radio-button :value="true">
                    第一次
                  </a-radio-button>
                  <a-radio-button :value="false">
                    最后一次
                  </a-radio-button>
                </a-radio-group>
              </template>
            </p>
            <div v-for="i in 1" :key="i">
              <alarm-triggers v-for="j in testnum" :key="j"></alarm-triggers>
              <a-button icon="plus" type="link" @click="() => { testnum++ }">
                新增触发器
              </a-button>
            </div>
          </a-card>
          <a-card :style="{marginBottom: '10px'}" :bordered="false" size="small">
            <p :style="{fontSize: 16}">转换
              <a-tooltip>
                <template slot="title">
                  将内置的结果字段转换为自定义字段，例如：deviceId 转为 id
                </template>
                <a-icon type="question-circle-o" :style="{paddingLeft: '10px'}"/>
              </a-tooltip>
            </p>
            <div :style="{maxHeight: '200px', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#F5F5F6', paddingTop: '10px' }">
              <a-row v-for="i in testzz" :key="i" :gutter="16" :style="{paddingBottom: '10px', marginLeft: '13px', marginRight: '3px'}">
                <a-col :span="6">
                  <a-input placeholder="请输入属性" />
                </a-col>
                <a-col :span="6">
                  <a-input placeholder="请输入别名" />
                </a-col>
                <a-col :span="12" :style="{textAlign: 'right', marginTop: '6px', paddingRight: '15px'}">
                  <a :style="{paddingTop: '7px'}" >删除</a>
                </a-col>
              </a-row>
              <a-col :span="24" :style="{marginLeft: '20px'}">
                <a @click="() => { testzz++ }">添加</a>
              </a-col>
            </div>
          </a-card>
          <a-card :style="{marginBottom: '10px'}" :bordered="false" size="small">
            <p :style="{fontSize: '16px'}">执行动作</p>
            <alarm-actions v-for="j in testnum" :key="j"></alarm-actions>
            <a-button icon="plus" type="link">
              执行动作
            </a-button>
          </a-card>
        </a-form>
      </div>
    </com-modal>
  </div>
</template>

<script>
  import ComModal from '@/components/Modal'
  import AlarmTriggers from './components/triggers'
  import AlarmActions from './components/actions'
  export default {
    name: 'DefineAlarm',
    props: {
      showModal: {
        type: Boolean,
        default: false
      }
    },
    components: {
      ComModal,
      AlarmTriggers,
      AlarmActions
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'DefineAlarmForm' }),
        title: '查看',
        testnum: 1,
        testzz: 1
      }
    },
    mounted () {
      console.log('this.showModal', this.showModal)
    },
    methods: {
      SetModalOk () {
        this.$emit('SetModalOk')
        // this.showModal = true
      },
      SetModalCancel () {
        this.$emit('SetModalCancel')
        // this.showModal = false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
