<template>
  <div>
    <a-card
      style="width:100%;padding:10px"
    >
      <a-tabs default-active-key="info" @change="callback">
        <a-tab-pane key="info" tab="产品信息">
          <a-descriptions bordered>
            <template v-slot:title>
              产品信息
              <a-button
                icon="edit"
                :style="{ marginLeft: 20 }"
                type="link"
                @click="editProduct"
              >编辑
              </a-button>
            </template>
            <a-descriptions-item label="产品ID" :span="1">
              {{ 1 }}
            </a-descriptions-item>
            <a-descriptions-item label="所属品类" :span="1">
              Prepaid
            </a-descriptions-item>
            <a-descriptions-item label="所属机构" :span="1">
              YES
            </a-descriptions-item>
            <a-descriptions-item label="消息协议" :span="1">
              2018-04-24 18:00:00
            </a-descriptions-item>
            <a-descriptions-item label="链接协议" :span="1">
              2019-04-24 18:00:00
            </a-descriptions-item>
            <a-descriptions-item label="设备类型" :span="1">
              <a-badge status="processing" text="Running" />
            </a-descriptions-item>
            <a-descriptions-item label="说明" :span="2">
              $80.00
            </a-descriptions-item>
          </a-descriptions>
          <template v-if="true">
            <a-descriptions>
              <template v-slot:title>
                配置
                <a-button icon="edit" :style="{ marginLeft: 20 }" type="link">编辑
                </a-button>
              </template>
            </a-descriptions>
            <div>
              <h3>{{ "摄像头配置" }}</h3>
              <a-descriptions bordered :column="2">
                <a-descriptions-item label="产品ID" :span="1">
                  {{ 1 }}
                </a-descriptions-item>
                <a-descriptions-item label="所属品类" :span="1">
                  Prepaid
                </a-descriptions-item>
                <a-descriptions-item label="说明" :span="2">
                  $80.00
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </template>
        </a-tab-pane>
        <a-tab-pane key="phyModel" tab="物模型">
          <pro-pyh-model></pro-pyh-model>
        </a-tab-pane>
        <a-tab-pane key="warnSetting" tab="告警设置">
          <device-alarm></device-alarm>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <com-drawer :width="'500px'" :title="title" :visible="showDrawer" @onClose="onCloseDrawer">
      <pro-base-info :form="form" :showIcon="true"></pro-base-info>
    </com-drawer>
  </div>
</template>

<script>
  import ComDrawer from '@/components/Drawer'
  import ProBaseInfo from '../components/ProBaseInfo'
  import ProPyhModel from './ProPyhModel'
  import DeviceAlarm from '@/views/device/alarm'

  export default {
    name: 'ProductDetail',
    components: {
      ComDrawer,
      ProBaseInfo,
      ProPyhModel,
      DeviceAlarm
    },
    data () {
      return {
        title: '',
        showDrawer: false,
        form: this.$form.createForm(this, { name: 'productAdd' })
      }
    },
    methods: {
      callback (key) {
        console.log(key)
      },
      editProduct () {
        this.title = '编辑产品'
        this.showDrawer = true
      },
      onCloseDrawer () {
        this.title = ''
        this.showDrawer = false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
