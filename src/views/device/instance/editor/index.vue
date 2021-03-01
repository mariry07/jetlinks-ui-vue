<template>
  <a-spin tip="加载中..." :spinning="false">
    <page-header-wrapper
      :title="false"
      :tabList="tableList"
      :tab-active-key="ActiveTabKey"
      :style="{marginTop: '0px', backgroundColor: '#F0F2F5', paddingBottom: '10px'}"
      :tab-change="onTabChange"
    >
      <template v-slot:extra>
        <a-tooltip title="刷新">
          <a-icon type="sync" :style="{fontSize: '20px'}"/>
        </a-tooltip>
      </template>
      <template v-slot:content>
        <div class="deviceInsTitle">
          <div >
            <span :style="{paddingRight: '20px'}">
              设备：123
            </span>
            <a-badge status="success" text="在线"/>
            <a-popconfirm title="确认让此设备断开连接？" >
              <a>断开连接</a>
            </a-popconfirm>
          </div>
          <div :style="{marginTop: '30px'}">
            <a-descriptions :column="4">
              <a-descriptions-item label="ID">{{ 123 }}</a-descriptions-item>
              <a-descriptions-item label="产品">
                <div>
                  {{ 123 }}
                  <a
                    :style="{marginLeft: '10px'}"
                    @click="() => {
                      router.push(`/device/product/save/${data.productId}`);
                    }"
                  >查看</a>
                </div>
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </div>
      </template>
      <template v-if="ActiveTabKey ==='info' ">
        <ins-editor-detail></ins-editor-detail>
      </template>
      <template v-if="ActiveTabKey ==='status' ">
        <ins-editor-status></ins-editor-status>
      </template>
      <template v-if="ActiveTabKey ==='function' ">
        <ins-editor-function></ins-editor-function>
      </template>
      <template v-if="ActiveTabKey ==='log' ">
        <ins-editor-log></ins-editor-log>
      </template>
      <template v-if="ActiveTabKey ==='alarm' ">
        <device-alarm></device-alarm>
      </template>
    </page-header-wrapper>
  </a-spin>
</template>

<script>
  import InsEditorDetail from './detail'
  import InsEditorStatus from './detail/Status'
  import InsEditorFunction from './detail/Function'
  import InsEditorLog from './detail/Log'
  import DeviceAlarm from '../../alarm'
  export default {
    name: 'InsEditor',
    components: {
      InsEditorDetail,
      InsEditorStatus,
      InsEditorFunction,
      InsEditorLog,
      DeviceAlarm
    },
    data () {
      return {
        tableList: [
          {
            key: 'info',
            tab: '实例信息'
          },
          {
            key: 'status',
            tab: '运行状态'
          },
          {
            key: 'function',
            tab: '设备功能'
          },
          {
            key: 'log',
            tab: '日志管理'
          },
          {
            key: 'alarm',
            tab: '告警设置'
          },
          {
            key: 'visualization',
            tab: '可视化'
          },
          {
            key: 'shadow',
            tab: '设备影子'
          }
        ],
        ActiveTabKey: 'info'

      }
    },
    methods: {
      onTabChange (key) {
        // if (!data.metadata) {
        //     message.error('请检查产品物模型');
        //     return;
        // }
        this.ActiveTabKey = key
      }
    }
  }
</script>

<style lang="less" scoped>
  .deviceInsTitle{
    display: flex;
    flex-direction: column;
  }
</style>
