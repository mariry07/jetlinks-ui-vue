<template>
  <a-modal
    :visible="visible"
    :title="`${ showData.id ? '编辑' : '新建'}网关`"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="width"
  >
    <a-form
      :form="form"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 19 }"
    >
      <a-form-item key="name" label="名称" >
        <a-input
          v-decorator="['name', {
            rules: [
              { required: true, message: '请输入组件名称' }
            ],
            initialValue:name ? name : undefined
          }]"
          @change="setName"
        />
      </a-form-item>
      <a-form-item key="provider" label="类型" >
        <a-select
          v-decorator="['provider', {
            rules: [
              { required: true, message: '请选择组件类型' }
            ],
            initialValue:provider ? provider : undefined
          }]"
          @change="setProvider"
          placeholder="请选择组件类型"
        >
          <a-select-option
            v-for="(item, index) in types"
            :key="item.id+index"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item key="networkId" label="网络组件" >
        <a-select
          :disabled="provider ==='' ? true : false"
          v-decorator="['networkId', {
            rules: [
              { required: true, message: '请选择网络组件' }
            ],
            initialValue:networkId?networkId : undefined
          }]"
          @change="setNetworkId"
        >
          <a-select-option
            v-for="(item, index) in networkLists"
            :key="item.id+index"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        key="configuration.protocol"
        label="消息协议"
        v-if="provider !== ''"
      >
        <a-select
          v-decorator="['configuration.protocol', {
            rules: [
              { required: true, message: '请选择消息协议' }
            ],
            initialValue:configuration.protocol? configuration.protocol : undefined
          }]"
        >
          <a-select-option
            v-for="(item, index) in protocolList"
            :key="item.id+index"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-if="provider === 'mqtt-client-gateway'" key="configuration.topics" label="Topics" >
        <a-textarea
          v-decorator="['configuration.topics', {
            rules: [
              { required: true }
            ],
            initialValue:showData.configuration? showData.configuration.topics : undefined
          }]"
          :rows="3"
          placeholder="缺少数据格式判断的组件占位"
        />
      </a-form-item>
      <a-form-item key="describe" label="描述" >
        <a-textarea
          v-decorator="['describe', {
            rules: [
              { required: true }
            ],
            initialValue:describe? describe : undefined
          }]"
          :rows="3"
          @change="setDescribe"
          placeholder="从MQTT服务订阅Topic.多个使用,分割"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import apis from '@/api'
  export default {
    name: 'GeteWaySaveModal',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 800
      },
      showData: {
        type: Object,
        default: () => {}
      },
      types: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      showData: {
        handler (newVal, oldVal) {
          this.initData(newVal)
        },
        immediate: true
      }
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'GeteWaySaveModalForm' }),
        name: '',
        typeValue: '',
        provider: '',
        networkId: '',
        describe: '',
        configuration: {},
        networkLists: [],
        protocolList: []
      }
    },
    methods: {
      initData (data) {
        // todo 不是每一次点击都去请求消息协议
        this.getProtocolList()
        if (Object.keys(data).length > 0) {
          this.getTypeValue(data.provider)
          this.name = data.name
          this.provider = data.provider
          this.networkId = data.networkId
          this.describe = data.describe
          this.configuration = { ...data.configuration }
          this.getNetComponts()
          this.getProtocolList()
        }
      },
      clearData () {
        this.name = ''
        this.provider = ''
        this.networkId = ''
        this.describe = ''
        this.configuration = {}
      },
      getProtocolList () {
        apis.networkGateway.getProtocolList()
          .then(res => {
            if (res.status === 200) {
              this.protocolList = res.result
            }
          })
      },
      getTypeValue (id) {
        const result = this.types.filter(v => v.id === id)[0]
        this.typeValue = result.networkType.value
      },
      getNetComponts () {
        apis.networkGateway.getNetComponts(this.typeValue)
          .then(res => {
            if (res.status === 200) {
              this.networkLists = res.result
            }
          })
      },
      setName (e) {
        this.name = e.target.value
      },
      setProvider (value) {
        this.provider = value
        this.getTypeValue(value)
        this.networkId = ''
        this.getNetComponts()
      },
      setNetworkId (value) {
        this.networkId = value
      },
      setDescribe (e) {
        this.describe = e.target.value
      },
      handleOk () {
        // const subData = {
        //   name: this.name,
        //   id: this.showData.id,
        //   des
        // }
        const {
          form: { validateFields }
        } = this
        validateFields((err, fileds) => {
          if (!err) {
            this.$emit('submitData', {
              ...fileds,
              id: this.showData.id ? this.showData.id : ''
            })
            this.form.resetFields()
            this.clearData()
          }
        })
      },
      handleCancel (e) {
        this.clearData()
        this.form.resetFields()
        this.$emit('close')
      },
      getAccessToken () {
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
