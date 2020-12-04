<template>
  <Modal v-model="modalVisible" title="新建证书" @on-ok="asyncOK">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <FormItem label="名称" prop="name">
        <Input v-model="formValidate.name" placeholder=""></Input>
      </FormItem>
      <FormItem label="类型" prop="instance">
        <Select v-model="formValidate.instance" >
            <Option v-for="item in instanceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="秘钥库" prop="configs['keystoreBase64']">
        <Upload action="/api/jetlinks/network/certificate/upload" :headers="{'X-Access-Token':token}" :on-success='onSuccess'>
            <Button icon="ios-cloud-upload-outline">点击上传</Button>
         </Upload>
        <Input v-model="formValidate.configs.keystoreBase64"  type="textarea"></Input>
      </FormItem>
      <FormItem v-if="!(formValidate.instance.indexOf('PEM')>-1)" label="秘钥库密码" prop="configs.keystorePwd">
        <Input v-model="formValidate.configs.keystorePwd" placeholder=""></Input>
      </FormItem>
      <FormItem label="信任库" prop="configs.trustKeyStoreBase64">
         <Upload action="/api/jetlinks/network/certificate/upload" :headers="{'X-Access-Token':token}" :on-success='onSuccess1'>
            <Button icon="ios-cloud-upload-outline">点击上传</Button>
         </Upload>
        <Input v-model="formValidate.configs.trustKeyStoreBase64"  type="textarea"></Input>
      </FormItem>
      <FormItem v-if="!(formValidate.instance.indexOf('PEM')>-1)" label="信任库密码">
        <Input v-model="formValidate.configs.trustKeyStorePwd" placeholder=""></Input>
      </FormItem>
      <FormItem label="描述" prop="description">
        <Input v-model="formValidate.description" placeholder=""></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
  import {
    addCertificate
  } from '@/api/network/certificate/data'
  import {getToken } from '@/libs/util'
  const form = {
          name: '',
          instance:'PEM',
          description:'',
          configs:{
            keystoreBase64:'',
            keystorePwd:'',
            trustKeyStoreBase64:'',
            trustKeyStorePwd:''
          }
        }
  export default {
    data() {
      return {
        modalVisible: false,
        token:getToken(),
        instanceList:[
          {
            value: 'PFX',
            label: 'PFX'
          },{
            value: 'JKS',
            label: 'JKS'
          },{
            value: 'PEM',
            label: 'PEM'
          },
        ],
        file:null,
        formValidate: form,
        ruleValidate: {
          name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          instance: [{
            required: true,
            message: '请选择类型',
            trigger: 'blur'
          }],
          description: [{
            required: true,
            message: '请输入描述',
            trigger: 'blur'
          }],
        }
      }
    },
    methods: {
      asyncOK() {
        addCertificate(this.formValidate).then(res => {
          if (res.data.status === 200) {
            this.$parent.getData();
          }
        })
      },
      onSuccess(data){
        this.formValidate.configs.keystoreBase64 = data.result
      },
      onSuccess1(data){
        this.formValidate.configs.trustKeyStoreBase64 = data.result
      }
    },
  }
</script>

<style>
</style>
