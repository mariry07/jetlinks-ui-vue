<template>
  <a-drawer
    :visible="visible"
    :width="width"
    :title="`${ data.id ? '编辑' : '新建'}证书`"
    @close="onClose"
  >
    <a-form
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 18 }"
    >
      <a-row>
        <a-col :span="12">
          <a-form-item key="id" label="协议ID" >
            <a-input
              :value="data.id ? data.id: ''"
              v-decorator="['id', {
                rules: [
                  { required: true, message: '协议标识' }
                ],
              }]"
              placeholder="请输入协议ID"
              :disabled="data.id ? true:''"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item key="name" label="协议名称" >
            <a-input
              :value="data.name ? data.name: ''"
              v-decorator="['name', {
                rules: [
                  { required: true, message: '协议名称' }
                ],
              }]"
              placeholder="请输入协议名称"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item key="type" label="类型" >
            <a-select
              :value="data.type ? data.type: ''"
              v-decorator="['type', {
                rules: [
                  { required: true }
                ],
              }]"
              placeholder="请选择协议类型"
            >
              <a-select-option v-for="(item, index) in selectOptions" :key="item.id+index" :value="item.id">
                {{ item.text }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item key="description" label="描述" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
        <a-input
          :value="data.description ? data.description: ''"
          v-decorator="['description', {
            rules: [
              { required: true }
            ],
          }]"
          placeholder="请输入"
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
      <a-button type="primary" >
        确认
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
  export default {
    name: 'ProtoSaveModal',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 900
      },
      data: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        selectOptions: [
          { id: 'PFX', text: 'PFX' },
          { id: 'JKS', text: 'JKS' },
          { id: 'PEM', text: 'PEM' }
        ]
      }
    },
    methods: {
      onClose (e) {
        this.$emit('onClose', 123)
      },
      getAccessToken () {
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
