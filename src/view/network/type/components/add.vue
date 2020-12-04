<template>
  <Drawer title="新建网络组件" v-model="drawerShow" width="400px" :mask-closable="false" :styles="styles">
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
      <FormItem label="组件名称" prop="passwd">
        <Input v-model="formCustom.name"></Input>
      </FormItem>
      <FormItem label="组件类型" prop="type">
        <Select v-model="formCustom.type" style="width:200px">
          <Option v-for="item in comTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <template v-if="formCustom.type.indexOf('TCP_SERVER')>-1 || formCustom.type.indexOf('TCP_CLIENT')>-1">
        <FormItem label="开启SSL" prop="configuration.ssl">
          <RadioGroup v-model="formCustom.configuration.ssl">
            <Radio :label="true">是</Radio>
            <Radio :label="false">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="证书" prop="configuration.certId">
          <Select v-model="formCustom.configuration.certId" style="width:200px">
            <Option v-for="item in certs" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="HOST" prop="configuration.host">
          <Input v-model="formCustom.configuration.host"></Input>
        </FormItem>
        <FormItem label="PORT" prop="configuration.port">
          <Input v-model="formCustom.configuration.port"></Input>
        </FormItem>
        <FormItem label="解析方式" prop="parserType">
          <Select v-model="formCustom.configuration.parserType" @on-change="parserType('parserType',formCustom.configuration.parserType)">
            <Option v-for="item in parserTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <template v-if="parserType('parserType','delimited')">
          <FormItem label="分隔符">
            <Input v-model="formCustom.configuration.parserConfiguration.delimited"></Input>
          </FormItem>
        </template>
        <template v-if="parserType('parserType','script')">
          <FormItem label="脚本语言">
            <RadioGroup v-model="formCustom.configuration.parserConfiguration.lang" type="button">
              <Radio label="JavaScript"></Radio>
              <Radio label="Groovy"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="解析脚本">
            <Input type="textarea" :rows="4" v-model="formCustom.configuration.parserConfiguration.script"></Input>
          </FormItem>
        </template>
        <template v-if="parserType('parserType','fixed_length')">
          <FormItem label="长度值">
            <Input v-model="formCustom.configuration.parserConfiguration.size"></Input>
          </FormItem>
        </template>
      </template>
      <template v-if="formCustom.type.indexOf('MQTT_CLIENT')>-1">
        <FormItem label="clientId">
          <Input v-model="formCustom.configuration.clientId"></Input>
        </FormItem>
        <FormItem label="HOST">
          <Input v-model="formCustom.configuration.host"></Input>
        </FormItem>
        <FormItem label="PORT">
          <Input v-model="formCustom.configuration.port"></Input>
        </FormItem>
        <FormItem label="TLS">
          <RadioGroup v-model="formCustom.configuration.ssl">
            <Radio label="true">是</Radio>
            <Radio label="false">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="证书">
          <Select v-model="formCustom.configuration.certId" style="width:200px">
            <Option v-for="item in certs" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="用户名">
          <Input v-model="formCustom.configuration.username"></Input>
        </FormItem>
        <FormItem label="密码">
          <Input v-model="formCustom.configuration.password"></Input>
        </FormItem>
        <FormItem label="最大消息长度">
          <Input v-model="formCustom.configuration.maxMessageSize"></Input>
        </FormItem>
      </template>
      <template v-if="formCustom.type.indexOf('MQTT_SERVER')>-1">
        <FormItem label="线程数">
          <Input v-model="formCustom.configuration.instance"></Input>
        </FormItem>
        <FormItem label="HOST">
          <Input v-model="formCustom.configuration.host"></Input>
        </FormItem>
        <FormItem label="PORT">
          <Input v-model="formCustom.configuration.port"></Input>
        </FormItem>
        <FormItem label="TLS">
          <RadioGroup v-model="formCustom.configuration.ssl">
            <Radio label="true">是</Radio>
            <Radio label="false">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="证书">
          <Select v-model="formCustom.configuration.certId" style="width:200px">
            <Option v-for="item in certs" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="最大消息长度">
          <Input v-model="formCustom.configuration.maxMessageSize"></Input>
        </FormItem>
      </template>
      <FormItem label="描述" prop="describe">
        <Input type="textarea" :rows="4" v-model="formCustom.describe"></Input>
      </FormItem>
    </Form>
    <div class="demo-drawer-footer">
      <Button style="margin-right: 8px" @click="drawerShow = false">取消</Button>
      <Button type="primary" @click="saveFun">确定</Button>
    </div>
  </Drawer>
</template>

<script>
  import {
    setConfig
  } from '@/api/network/type/data'
  import {
    deepClone
  } from '@/libs/tools'
  const mapType = {
    "DIRECT": "DIRECT",
    "delimited": "delimited",
    "script": "script",
    "fixed_length": "fixed_length"
  }
  const form = {
    type: "",
    configuration: {
      ssl: true,
      parserType: "",
      parserConfiguration: {
        size: ''
      }
    }
  }
  export default {
    data() {
      return {
        comTypes: [{
          value: 'TCP_SERVER',
          label: 'TCP服务'
        }, {
          value: 'MQTT_CLIENT',
          label: 'MQTT客户端'
        }, {
          value: 'MQTT_SERVER',
          label: 'MQTT服务'
        }, {
          value: 'TCP_CLIENT',
          label: 'TCP客户端'
        }],
        certs: [],
        parserTypes: [{
          value: 'DIRECT',
          label: '不处理'
        }, {
          value: 'delimited',
          label: '分隔符'
        }, {
          value: 'script',
          label: '自定义脚本'
        }, {
          value: 'fixed_length',
          label: '固定长度'
        }],
        formCustom: form,
        ruleCustom: {},
        drawerShow: false,
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
      }
    },
    components: {

    },
    watch: {

    },
    computed: {
      parserType() {
        return function(type, value) {
          try {
            if (this.formCustom.configuration.hasOwnProperty(type)) {
              if (mapType[this.formCustom.configuration[type]] === value) {
                return true
              } else {
                return false
              }
            }
          } catch (e) {
            //TODO handle the exception
          }

        }
      }
    },
    mounted() {

    },
    methods: {
      async saveFun() {
        let res = await setConfig(this.formCustom)
        if (res.data.status === 200) {
          this.$parent.getData()
          this.drawerShow = false
        } else {
          this.$Message.error(res.data.message);
        }
      },

    },
  }
</script>

<style lang="less">
  .demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }

  .cm-s-material.CodeMirror {
    height: 400px !important;
  }
</style>
