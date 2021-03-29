<template>
  <a-drawer
    :visible="visible"
    :width="900"
    :title="`${dataSource?dataSource.id ? '编辑' : '新增':''}数据转发`"
    @close="onClose"
  >
    <a-form
      :form="form"
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 18 }"
      :style="{ paddingBottom: '20px' }"
      key="sqlRule_form"
    >
      <a-row>
        <a-col :span="12">
          <a-form-item key="name" label="名称" >
            <a-input
              v-decorator="['name', {
                rules: [
                  {required: true, message: '请输入名称'},
                  {max: 200, message: '名称不超过200个字符'}
                ],
                initialValue:dataSource.name ? dataSource.name: ''
              }]"
              @change="setName"
              placeholder="请输入名称"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item key="type" label="类型" >
            <a-select
              v-decorator="['type', {
                rules: [
                  { required: true, message: '类型' }
                ],
                initialValue:ruleType
              }]"
              placeholder="请选择类型"
              @change="changeType"
            >
              <a-select-option value="timer" key="timer">定时</a-select-option>
              <a-select-option value="realTime" key="realTime">实时</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12" v-if="ruleType === 'timer'">
          <a-form-item key="name" label="名称" >
            <a-input
              v-decorator="['cron', {
                rules: [
                  {required: true, message: 'cron表达式'}
                ],
                initialValue:cron
              }]"
              @change="setCron"
              placeholder="输入cron表达式"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="SQL" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <AceEditor
              mode="mysql"
              theme="eclipse"
              name="app_code_editor"
              :fontSize="14"
              showPrintMargin
              showGutter
              wrapEnabled
              v-model="sql"
              highlightActiveLine
              enableSnippets
              :style="{width: '100%', height: '300px'}"
              :setOptions="{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2
              }"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="执行动作" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <save-action></save-action>
            <a-button icon="plus" type="link">
              执行动作
            </a-button>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="失败执行动作" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <save-action></save-action>
            <a-button icon="plus" type="link">
              执行动作
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
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
      <a-button type="primary" @click="submit">
        确认
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
  import apis from '@/api'
  import SaveAction from './actions'
  export default {
    name: 'SaveDrawer',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      dataSource: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'SaveDrawerForm' }),
        name: '',
        ruleType: '',
        cron: '',
        sql: '',
        actions: [{ _id: 0 }],
        whenErrorThen: [{ _id: 0 }],
        modelType: 'sql_rule',
        modelVersion: 0
      }
    },
    watch: {
      dataSource: {
        handler (newVal, oldVal) {
          if (Object.keys(newVal).length > 0) {
            const modelMeta = JSON.parse(newVal.modelMeta)
            this.ruleType = modelMeta.type
            this.cron = modelMeta.cron
            this.sql = modelMeta.sql
          }
          // console.log('cccc', newVal)
          // this.data = { ...newVal }
        },
        immediate: true
      }
    },
    components: {
      SaveAction
    },
    methods: {
      setName (e) {
        this.name = e.target.value
      },
      setCron (e) {
        this.cron = e.target.value
      },
      setSql (value) {
        console.log(value, 11111111111111111)
        this.sql = value
      },
      changeType (type) {
        this.ruleType = type
        this.cron = ''
      },
      clearData () {
        this.form.resetFields()
        this.name = ''
        this.cron = ''
        this.sql = ''
        this.ruleType = ''
      },
      onClose (result = '') {
        this.clearData()
        this.$emit('onClose', result)
      },
      submit () {
        const modelMeta = {}
        modelMeta['name'] = this.name
        modelMeta['type'] = this.ruleType
        modelMeta['cron'] = this.cron
        modelMeta['sql'] = this.sql
        modelMeta['actions'] = this.actions
        modelMeta['whenErrorThen'] = this.whenErrorThen
        console.log(modelMeta, 'modelMeta')
        apis.ruleEngine.addSqlRuleLists({
          name: this.name,
          modelMeta: JSON.stringify(modelMeta),
          modelType: this.modelType,
          modelVersion: this.modelVersion
        }).then(res => {
          if (res.status === 200) {
            this.onClose(res.result)
          }
        }).catch(err => this.$message.error('err', err))
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
