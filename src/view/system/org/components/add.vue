<template>
  <Modal  v-model="modalVisible" :title="title" @on-ok="asyncOK">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="机构标识" prop="id">
        <Input v-model="formValidate.id" placeholder=""></Input>
      </FormItem>
      <FormItem label="机构名称" prop="name">
        <Input v-model="formValidate.name" placeholder=""></Input>
      </FormItem>
      <FormItem label="描述">
        <Input v-model="formValidate.describe" type="textarea" placeholder=""></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
  import {
    addDimension
  } from '@/api/system/org/data'
  const dataObj = {
          name: '',
          id: '',
          describe: '',
          typeId:"org"
        }
  export default {
    data() {
      return {
        modalVisible: false,
        title:'',
        formValidate: dataObj,
        ruleValidate: {
          id: [{
            required: true,
            message: '请输入机构标识',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入机构名称',
            trigger: 'blur'
          }],
        }
      }
    },
    methods: {
      clean(){
        this.formValidate = {...dataObj}
      },
      asyncOK() {
        let data = null
         // if( this.formValidate.hasOwnProperty('parentId')){
         //  this.formValidate.parentId = this.formValidate.id
         // }
        addDimension(this.formValidate.id,this.formValidate).then(res => {
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
