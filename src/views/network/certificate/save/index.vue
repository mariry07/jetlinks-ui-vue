<template>
  <a-modal
    :visible="visible"
    :title="`${ data.id ? '编辑' : '新建'}证书`"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="800"
  >
    <a-form
      :form="form"
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 16 }"
    >
      <a-form-item key="name" label="名称" >
        <a-input
          v-decorator="['name', {
            rules: [
              { required: true }
            ],
            initialValue:data.name ? data.name: ''
          }]"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item key="instance" label="类型" >
        <a-select
          v-decorator="['instance', {
            rules: [
              { required: true }
            ],
            initialValue:data.instance ? data.instance: ''
          }]"
          @change="setInstance"
          placeholder="请输入"
        >
          <a-select-option v-for="(item, index) in selectOptions" :key="item.id+index" :value="item.id">
            {{ item.text }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item key="configs.keystoreBase64" label="密钥库" >
        <a-upload
          name="file"
          action="/jetlinks/network/certificate/upload"
          :headers="{
            'X-Access-Token': getAccessToken,
          }"
        >
          <a-button :style="{ width: '100%' }">
            <a-icon type="upload" />
            点击上传
          </a-button>
        </a-upload>
        <a-textarea
          v-decorator="['configs.keystoreBase64', {
            rules: [
              { required: true }
            ],
            initialValue:data.configs ? data.configs.keystoreBase64 : ''
          }]"
          :rows="3"
        />
      </a-form-item>
      <a-form-item v-if="instance!=='PEM'" key="configs.keystorePwd" label="密钥库密码" >
        <a-input
          v-decorator="['configs.keystorePwd', {
            initialValue:data.configs ? data.configs.keystorePwd : ''
          }]"
        />
      </a-form-item>
      <a-form-item key="configs.trustKeyStoreBase64" label="信任库" >
        <a-upload
          name="file"
          action="/jetlinks/network/certificate/upload"
          :headers="{
            'X-Access-Token': getAccessToken,
          }"
        >
          <a-button :style="{ width: '100%' }">
            <a-icon type="upload" />
            点击上传
          </a-button>
        </a-upload>
        <a-textarea
          v-decorator="['configs.trustKeyStoreBase64', {
            rules: [
              { required: true }
            ],
            initialValue:data.configs ? data.configs.trustKeyStoreBase64 : ''
          }]"
          :rows="3"
        />
      </a-form-item>
      <a-form-item v-if="instance!=='PEM'" key="configs.trustKeyStorePwd" label="信任库密码" >
        <a-input
          v-decorator="['configs.trustKeyStorePwd', {
            initialValue:data.configs ? data.configs.trustKeyStorePwd : ''
          }]"
        />
      </a-form-item>
      <a-form-item key="description" label="描述" >
        <a-textarea
          v-decorator="['description', {
            rules: [
              { required: true }
            ],
            initialValue:data.description ? data.description : ''
          }]"
          :rows="3"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
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
      }
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'CerSaveModalForm' }),
        instance: '',
        selectOptions: [
          { id: 'PFX', text: 'PFX' },
          { id: 'JKS', text: 'JKS' },
          { id: 'PEM', text: 'PEM' }
        ]
      }
    },
    methods: {
      setInstance (value) {
        this.instance = value
      },
      clearData () {
        this.form.resetFields()
        this.instance = ''
      },
      handleOk (e) {
        const {
          form: { validateFields }
        } = this
        validateFields((err, fileds) => {
          if (!err) {
            // addCertificateLists
            this.clearData()
            this.$emit('submitData', {
              ...fileds,
              id: this.data.id ? this.data.id : ''
            })
          }
        })
      },
      handleCancel (e) {
        this.clearData()
        this.$emit('close')
      },
      getAccessToken () {
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
