<template>
  <a-drawer
    :visible="visible"
    :width="width"
    :title="`${ data.id ? '编辑' : '新建'}网络组件`"
    @close="onClose"
  >
    <a-form
      :form="form"
      :labelCol="{ span: 4 }"
      :wrapperCol="{ span: 20 }"
    >

      <a-form-item key="name" label="组件名称" >
        <a-input
          v-decorator="['name', {
            rules: [
              { required: true, message: '请输入组件名称' }
            ],
            initialValue:data ? data.name : undefined
          }]"
          placeholder="组件名称"
        />
      </a-form-item>
      <a-form-item key="type" label="组件类型" >
        <a-select
          v-decorator="['type', {
            rules: [
              { required: true, message: '请选择组件类型' }
            ],
            initialValue:data.type ? data.type.value : undefined
          }]"
          @change="setType"
          placeholder="请选择组件类型"
        >
          <a-select-option v-for="(item, index) in types" :key="item.id+index" :value="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <template v-if="type === 'MQTT_CLIENT' || type === 'MQTT_SERVER'">
        <a-form-item label="线程数" v-if="type === 'MQTT_SERVER'">
          <a-input
            v-decorator="['configuration.instance', {
              initialValue:data.configuration ? data.configuration.instance : undefined
            }]"
          />
        </a-form-item>
        <a-form-item label="clientId" v-else>
          <a-input
            v-decorator="['configuration.clientId', {
              initialValue:data.configuration ? data.configuration.clientId : undefined
            }]"
          />
        </a-form-item>
        <a-form-item label="HOST">
          <a-input
            v-decorator="['configuration.host',{
              initialValue:data.configuration ? data.configuration.host : '0.0.0.0'
            }]"
          />
        </a-form-item>
        <a-form-item label="PORT">
          <a-input
            v-decorator="['configuration.port',{
              initialValue:data.configuration ? data.configuration.port : ''
            }]"
          />
        </a-form-item>
        <a-form-item label="TLS">
          <a-radio-group
            v-decorator="['configuration.ssl', {
              initialValue:data.configuration ? data.configuration.ssl : ''
            }]"
          >
            <a-radio :value="true">是</a-radio>
            <a-radio :value="false">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="证书" v-if="type === 'MQTT_CLIENT'">
          <a-select
            v-decorator="['configuration.certId', {
              initialValue:data.configuration ? data.configuration.certId : ''
            }]"
          >
            <a-select-option v-for="(item, index) in certificateList" :key="item.id+index" :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="用户名" v-if="type === 'MQTT_CLIENT'">
          <a-input
            v-decorator="['configuration.username', {
              initialValue:data.configuration ? data.configuration.username : ''
            }]"
          />
        </a-form-item>
        <a-form-item label="密码" v-if="type === 'MQTT_CLIENT'">
          <a-input
            v-decorator="['configuration.password',{
              initialValue:data.configuration ? data.configuration.password : ''
            }]"
          />
        </a-form-item>
        <a-form-item label="最大消息长度">
          <a-input-number
            :style="{ width: '100%' }"
            v-decorator="['configuration.maxMessageSize', {
              initialValue:data.configuration ? data.configuration.maxMessageSize : ''
            }]"
          />
        </a-form-item>
      </template>
      <template v-if="type === 'TCP_SERVER' || type === 'TCP_CLIENT'">
        <a-form-item label="开启SSL">
          <a-radio-group
            v-decorator="['configuration.ssl', {
              initialValue:data.configuration ? data.configuration.ssl : ''
            }]"
          >
            <a-radio :value="true">是</a-radio>
            <a-radio :value="false">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="证书" >
          <a-select
            v-decorator="['configuration.certId', {
              initialValue:data.configuration ? data.configuration.certId : ''
            }]"
          >
            <a-select-option v-for="(item, index) in certificateList" :key="item.id+index" :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="HOST">
          <a-input
            v-decorator="['configuration.host',{
              initialValue:data.configuration ? data.configuration.host || '0.0.0.0' : ''
            }]"
          />
        </a-form-item>
        <a-form-item label="PORT">
          <a-input
            v-decorator="['configuration.port',{
              initialValue:data.configuration ? data.configuration.port : ''
            }]"
          />
        </a-form-item>
        <a-form-item label="解析方式" >
          <a-select
            v-decorator="['configuration.parserType', {
              initialValue:data.configuration ? data.configuration.parserType : ''
            }]"
            @change="setParserType"
          >
            <a-select-option v-for="(item, index) in parserList" :key="item.name+index" :value="item.value">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <template v-if="parserType === 'delimited'">
          <a-form-item label="分割符" >
            <a-input
              v-decorator="['configuration.parserConfiguration.delimited', {
                initialValue:data.configuration.parserConfiguration ? data.configuration.parserConfiguration.delimited : ''
              }]"
            ></a-input>
          </a-form-item>
        </template>
      </template>

      <a-form-item key="describe" label="描述">
        <a-textarea
          :rows="3"
          v-decorator="['configuration.describe', {
            initialValue:data.describe ? data.configuration.describe : ''
          }]"
        />
      </a-form-item>
    </a-form>
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button :style="{ marginRight: '8px' }">
        关闭
      </a-button>
      <a-button type="primary" @click="submitData">
        保存
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
import apis from '@/api'
  export default {
    name: 'TypeSaveModal',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number || String,
        default: 900
      },
      types: {
        type: Array,
        default: () => []
      },
      data: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'TypeSaveModalForm' }),
        certificateList: [],
        parserList: [{
          name: '不处理',
          value: 'DIRECT'
        }, {
          name: '分隔符',
          value: 'delimited'
        }, {
          name: '自定义脚本',
          value: 'script'
        }, {
          name: '固定长度',
          value: 'fixed_length'
        }],
        type: '',
        parserType: ''
      }
    },
    mounted () {
      this.GetData()
    },
    watch: {
      data: {
        handler (newVal, oldVal) {
          if (Object.keys(newVal).length > 0) {
            this.type = newVal.type.value
          }
        }
      }
    },
    methods: {
      GetData () {
        apis.networkType.getCertificateList({
          paging: false
        }).then(res => {
          if (res.status === 200) {
            this.certificateList = res.result
          }
        })
      },
      clearData () {
        this.form.resetFields()
        this.type = ''
        this.parserType = ''
      },
      setType (value) {
        this.type = value
      },
      setParserType (value) {
        this.parserType = value
      },
      submitData () {
        const {
          form: { validateFields }
        } = this
        validateFields((err, fileds) => {
          if (!err) {
            console.log(fileds)
            this.$emit('submitData', {
              ...fileds,
              id: this.data.id
            })
            this.clearData()
          }
        })
      },
      onClose (e) {
        this.clearData()
        this.$emit('onClose', 123)
      },
      getAccessToken () {
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
