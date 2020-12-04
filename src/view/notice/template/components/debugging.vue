<template>
  <Modal v-model="debugVisible" title="调试通知模板" >
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="通知配置" prop="template.id">
        <Select v-model="formValidate.template.id">
                <Option v-for="item in templates" @click.native="templateChange(item)"  :value="item.id" :key="item.id">{{ item.name }}</Option>
           </Select>
      </FormItem>
      <FormItem label="变量" prop="context">
        <Input type="textarea" :rows="4" v-model="formValidate.context" placeholder=""></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button style="margin-right: 8px" @click="debugVisible = false">取消</Button>
      <Button type="primary" @click="asyncOK">确定</Button>
    </div>
  </Modal>
</template>

<script>
import {
    getMetadata,
    saveConfig
  } from '@/api/notice/noticeconfig/data'
  export default {
    props:['templates','templateId'],
    data() {
      return {
        debugVisible: false,
        formValidate: {
          template:{
            id:''
          },
          context:''
        },
        ruleValidate: {
          "template.id": [{
            required: true,
            message: '请选择通知配置',
            trigger: 'blur'
          }],
        }
      }
    },
    methods: {
      asyncOK() {
      this.$refs.formValidate.validate(async (valid) => {
        if (valid) {
          let res = await sendConfig(this.templateId,this.formValidate)
          if (res.data.status === 200) {
            this.debugVisible = false
            this.$parent.getData()
          }
        }
      })
      },
      templateChange(data){
        this.formValidate.template = data
      }
    },
  }
</script>

<style>
</style>
