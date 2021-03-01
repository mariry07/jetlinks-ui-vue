<template>
  <a-spin tip="加载中..." :spinning="spinning">
    <a-card :style="{ marginTop: '16px' }">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="告警设置">
          <a-card :bordered="false">
            <a-button slot="title" icon="plus" type="primary">新增告警</a-button>
            <com-table :attributeColumns="attributeColumns" :showData="showData" :actions="actions" @setAlarmActiveKey="setAlarmActiveKey">
              <define-alarm v-if="AlarmActiveKey==='edit'" :showModal="showModal" @SetModalOk="SetModalOk" @SetModalCancel="SetModalCancel">
              </define-alarm>
            </com-table>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2" tab="告警记录">
          <a-card :bordered="false">
            <a-select default-value="lucy" style="width: 300px;marginBottom:10px;">
              <a-select-option value="jack">
                Jack
              </a-select-option>
              <a-select-option value="lucy">
                Lucy
              </a-select-option>
              <a-select-option value="disabled" disabled>
                Disabled
              </a-select-option>
              <a-select-option value="Yiminghe">
                yiminghe
              </a-select-option>
            </a-select>
            <com-table :attributeColumns="attributeColumns" :showData="showData" :actions="actions">
              <template slot="operation">
                <a-button type="link" style="padding: 0;">编辑</a-button>
                <a-divider type="vertical" />
                <a-button type="link" style="padding: 0;">删除</a-button>
              </template>
            </com-table>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </a-spin>
</template>

<script>
  import ComTable from '@/components/Table'
  import DefineAlarm from '@/pages/device/product/save/alarm/index.vue'
  import moment from 'moment'

  const data = [
    {
      key: '1',
      name: 'John Brown',
      createTime: '2010-10-10',
      state: {
        text: '已停止'
      }
    }
  ]
  const actions = [
    {
      name: '查看',
      type: 'edit'
    },
    {
      name: '告警日志',
      type: 'link'
    },
    {
      name: '启动',
      type: 'function'
    },
    {
      name: '删除',
      type: 'delete'
    }
  ]
  export default {
    name: 'DeviceAlarm',
    components: {
      ComTable,
      DefineAlarm
    },
    data () {
      const columns = [
        {
          title: '告警名称',
          key: 'name',
          dataIndex: 'name'
        },
        {
          title: '创建时间',
          key: 'createTime',
          dataIndex: 'createTime',
          customRender: (text) => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '/'
        },
        {
          title: '运行状态',
          key: 'state',
          dataIndex: 'state',
          customRender: (record) => {
            const statusMap = new Map()
            statusMap.set('运行中', 'success')
            statusMap.set('已停止', 'error')
            return (
              record ? <a-badge status={statusMap.get(record.text)} text={record.text} /> : ''
            )
          }
        },
        {
          title: '操作',
          width: '250px',
          align: 'center',
          key: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ]
      return {
        spinning: true,
        attributeColumns: columns,
        showData: data,
        actions,
        AlarmActiveKey: '',
        showModal: false
      }
    },
    mounted () {
      setTimeout(() => {
        this.spinning = false
      }, 30)
    },
    methods: {
      setAlarmActiveKey (item) {
        this.AlarmActiveKey = item.type
        this.showModal = true
      },
      SetModalOk () {
        this.AlarmActiveKey = ''
        this.showModal = false
      },
      SetModalCancel () {
        this.AlarmActiveKey = ''
        this.showModal = false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
