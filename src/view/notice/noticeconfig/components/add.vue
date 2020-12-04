<template>
  <Modal  v-model="modalVisible" :title="title" width="700px">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="配置名称" prop="name">
        <Input v-model="formValidate.name" placeholder=""></Input>
      </FormItem>
      <FormItem label="通知类型" prop="type">
        <Select v-model="formValidate.type">
          <Option v-for="item in types" @click.native="typeChange(item)" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="服务商" prop="provider">
        <Select v-model="formValidate.provider">
          <Option v-for="item in providers" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem v-for="item in properties" :label="item.name" :prop="item.value">
        <Row style="margin-top: 5px" v-for="(itemType,index) in formValidate.configuration.properties" v-if="item.type.hasOwnProperty('elementType')">
          <i-col :md="7" :lg="7" style="margin-right: 8px">
            <Input v-model="itemType.name" placeholder="key">
            </Input>
          </i-col>
          <i-col :md="7" :lg="7" style="margin-right: 8px">
            <Input v-model="itemType.value" placeholder="value">
            </Input>
          </i-col>
          <i-col :md="7" :lg="7" style="margin-right: 8px">
            <Input v-model="itemType.description" placeholder="说明">
            </Input>
          </i-col>
          <i-col :md="1" :lg="1">
            <Button v-if="index===0" shape="circle" icon="md-add" @click="addProperties(item.type)"></Button>
            <Button v-else shape="circle" icon="md-close" @click="reduceProperties(index,itemType)"></Button>
          </i-col>
        </Row>
        <Input v-if="!item.type.hasOwnProperty('elementType')" v-model="formValidate.configuration[item['property']]"
          placeholder=""></Input>
      </FormItem>
    </Form>
   <div slot="footer">
      <Button style="margin-right: 8px" @click="modalVisible = false">取消</Button>
      <Button type="primary" @click="asyncOK">确定</Button>
    </div>
  </Modal>
</template>

<script>
  import {
    getMetadata,
    saveConfig
  } from '@/api/notice/noticeconfig/data'
  const form = {
    configuration: {
      properties: [{
        id: "",
        name: "",
        value: "",
        description: ""
      }]
    },
    type: '',
    provider: '',
    name: ''
  }
  export default {
    props: ['types'],
    data() {
      return {
        modalVisible: false,
        providers: [],
        properties: [],
        copyTypes: this.types,
        title: '新建通知配置',
        formValidate: form,
        ruleValidate: {
          name: [{
            required: true,
            message: '请输入配置名称',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请选择通知类型',
            trigger: 'blur'
          }],
          provider: [{
            required: true,
            message: '请选择服务商',
            trigger: 'blur'
          }],
        }
      }
    },
    watch: {
      'formValidate.type'(val) {
        if (val) {
          this.typeChange(this.types.filter(item => item.value === val)[0])
        }
      },
      'formValidate.provider'(val) {
        if (val) {
          this.providerChange(this.types.filter(item => item.value === val)[0])
        }
      }
    },
    computed: {
      elementTypes() {
        return function(item) {
          if (item.type.hasOwnProperty('elementType')) {
            return item.type.elementType.properties
          } else {
            return []
          }
        }
      },
    },
    mounted() {

    },
    methods: {
      asyncOK() {
        this.$refs.formValidate.validate(async (valid) => {
          if (valid) {
            let res = await saveConfig(this.formValidate)
            if (res.data.status === 200) {
              this.modalVisible = false
              this.$parent.getData()
            }
          }
        })
      },
      typeChange(data) {
        this.providers = data.providerInfos
      },
      async providerChange(val) {
        let res = await getMetadata(this.formValidate.type, this.formValidate.provider)
        try {
          this.properties = res.data.result.properties
          if (!this.formValidate.id) {
            this.properties.forEach(item => {
              this.formValidate.configuration. [item.property] = ""
            })
          }
        } catch (e) {
          //TODO handle the exception
        }

      },
      addProperties(data) {
        this.$nextTick(_ => {
          this.formValidate.configuration.properties.push({
            id: "",
            name: "",
            value: "",
            description: ""
          })
          this.$forceUpdate()
        })
      },
      reduceProperties(index, data) {
        this.$nextTick(_ => {
          this.formValidate.configuration.properties.splice(index, 1)
          this.$forceUpdate()
        })
      }
    },
  }
</script>

<style>
</style>
