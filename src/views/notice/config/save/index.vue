<template>
  <a-modal
    :visible="visible"
    :title="`编辑通知配置`"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="840"
  >
    <a-form
      :form="form"
      :labelCol="{ span: 4 }"
      :wrapperCol="{ span: 20 }"
    >
      <a-form-item label="配置名称">
        <a-input
          v-decorator="['name', {
            rules: [
              { required: true, message: '请输入配置名称' }
            ],
            initialValue:data?data.name:''
          }]"
        />
      </a-form-item>
      <a-form-item label="通知类型">
        <a-select
          v-decorator="['type', {
            rules: [
              { required: true, message: '请输入通知类型' }
            ],
            initialValue:data?data.type:''
          }]"
          @change="setType"
        >
          <a-select-option
            v-for="(item, index) in types"
            :key="item + index"
            :value="item.id"
            :initialValue="item.name"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="服务商">
        <a-select
          v-decorator="['provider', {
            rules: [
              { required: true, message: '请输入通知类型' }
            ],
            initialValue:data?data.provider:''
          }]"
          @change="setProvider"
        >
          <a-select-option
            v-for="(item, index) in GetproviderItems(noticeType)"
            :key="item + index"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <template v-if="noticeType && typeMetas.name">
        <config-provide-item
          ref="provideItem"
          :metaData="typeMetas"
          :showData="configuration"
        >
        </config-provide-item>
      </template>
    </a-form>
  </a-modal>
</template>

<script>
  import apis from '@/api'
  import ConfigProvideItem from './ProvideItem'
  export default {
    name: 'CerSaveModal',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default: () => {}
      },
      types: {
        type: Array,
        default: () => []
      }
    },
    components: {
      ConfigProvideItem
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'CerSaveModalForm' }),
        noticeType: '',
        typeMetas: {},
        configuration: {}
      }
    },
    watch: {
      data: {
        handler (newVal, oldVal) {
          if (Object.keys(newVal).length) {
            this.initData(newVal)
          }
        }
      }
    },
    computed: {
      GetproviderItems () {
        return function (type) {
          return this.types.find(v => v.id === type)?.providerInfos || []
        }
      }
    },
    methods: {
      initData (data) {
        this.noticeType = data.type
        this.setProvider(data.provider)
        this.configuration = data.configuration
      },
      clearData () {
        this.form.resetFields()
        this.noticeType = ''
        this.typeMetas = {}
        this.configuration = {}
      },
      handleOk () {
        const {
          form: { validateFields }
        } = this
        const properties = this.$refs.provideItem.otherConfig
        validateFields((err, fileds) => {
          if (!err) {
            const addData = {
              ...fileds,
              configuration: {
                ...fileds.configuration,
                properties
              }
            }
            this.form.resetFields()
            this.clearData()
            this.$emit('submitData', addData)
          }
        })
      },
      handleCancel (e) {
        this.clearData()
        this.$emit('close')
      },
      setType (value) {
        this.noticeType = value
      },
      setProvider (value) {
        apis.noticeConfig.getConfigTypesMeta(this.noticeType, value)
          .then(res => {
            if (res.status === 200) {
              this.typeMetas = res.result
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
