<template>
  <Modal  v-model="modalVisible" title="新建权限" @on-ok="asyncOK">
      <Tabs size="small">
            <TabPane label="基本信息">

            </TabPane>
            <TabPane label="关联权限">

            </TabPane>
            <TabPane label="数据视图">

            </TabPane>
        </Tabs>
  </Modal>
</template>

<script>
  import {
    addUser
  } from '@/api/system/permission/data'
  export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formValidate.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        modalVisible: false,
        formValidate: {
          name: '',
          username: '',
          password: '',
          password1: ''
        },
        ruleValidate: {
          name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          password1: [{
            required: true,
            trigger: 'blur',
            validator: validatePass2,
          }],
        }
      }
    },
    methods: {
      asyncOK() {
        let data = null
        if(this.formValidate.id){
          data = {
            id:this.formValidate.id,
            name: this.formValidate.name,
            username: this.formValidate.username,
          }
        }else{
          data = {
            confirm: this.formValidate.name,
            name: this.formValidate.name,
            password: this.formValidate.password,
            status: 0,
            username: this.formValidate.username,
          }
        }

        addUser(data).then(res => {
          if (res.data.status === 200) {
            this.$parent.getData();
          }
        })
      }
    },
  }
</script>

<style>
</style>
