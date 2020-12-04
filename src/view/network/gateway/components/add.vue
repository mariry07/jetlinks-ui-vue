<template>
  <Modal v-model="modalVisible" :title="title">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="名称" prop="name">
        <Input v-model="formValidate.name" placeholder=""></Input>
      </FormItem>
      <FormItem label="类型" prop="provider">
        <Select v-model="formValidate.provider" >
          <Option @click.native="providerChange(item)" v-for="item in providers" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="网络组件" prop="networkId">
        <Select v-model="formValidate.networkId" >
          <Option v-for="item in networkIds" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <template v-if="formValidate.provider.indexOf('mqtt-client-gateway')>-1">
        <FormItem label="消息协议">
          <Select v-model="formValidate.configuration.protocol">
            <Option v-for="item in protocols" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="Topics">
          <Input type="textarea" :rows="4" v-model="formValidate.configuration.topics" placeholder="从MQTT服务订阅Topic.多个使用,分割"></Input>
        </FormItem>
      </template>
      <template v-if="formValidate.provider.indexOf('mqtt-server-gateway')>-1">
        <FormItem label="认证协议" >
          <Select v-model="formValidate.configuration.protocol">
            <Option v-for="item in protocols" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
      </template>
      <template v-if="formValidate.provider.indexOf('tcp-server-gateway')>-1">
       <FormItem label="消息协议">
         <Select v-model="formValidate.configuration.protocol">
           <Option v-for="item in protocols" :value="item.value" :key="item.value">{{ item.label }}</Option>
         </Select>
       </FormItem>
      </template>
      <FormItem label="描述" prop="describe">
        <Input type="textarea" :rows="4" v-model="formValidate.describe" placeholder=""></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button   @click="modalVisible=false">取消</Button>
        <Button type="primary"  @click="asyncOK">确定</Button>
    </div>
  </Modal>
</template>

<script>
  import {
   getDetail,
   setDevice
  } from '@/api/network/gateway/data'
  export default {
    data() {
      return {
        modalVisible: false,
        formValidate: {
          provider:'',
          configuration:{}
        },
        title:'新建网关',
        protocols:[],
        providers:[],
        networkIds:[],
        ruleValidate: {
          name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          provider: [{
            required: true,
            message: '请选择类型',
            trigger: 'blur'
          }],
          networkId: [{
            required: true,
            message: '请选择组件',
            trigger: 'blur'
          }]
        }
      }
    },
    watch:{
      'formValidate.provider'(val){
        if(val){
          this.providerChange(this.providers.filter(item=>item.value===val)[0])
        }
      }
    },
    methods: {
      asyncOK() {
        this.$refs.formValidate.validate(async (valid) => {
          if (valid) {
           let res = await setDevice(this.formValidate)
            if (res.data.status === 200) {
              this.$parent.getData()
              this.modalVisible = false
            } else {
              this.$Message.error(res.data.message);
            }
           }
        })
      },
      providerChange(data){
          this.$nextTick(async()=>{
              let res = await getDetail(data.id)
              this.networkIds = [...res.data.result].map(item => {
                 return {
                   label: item.name,
                   value: item.id
                 }
               })
          });

      }
    },
  }
</script>

<style>
</style>
