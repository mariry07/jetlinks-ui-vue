<template>
  <Modal v-model="modalVisible" width="50%" title="访问日志详情" @on-ok="asyncOK">
 <table class="form-table el-form-item--mini" cellspacing="0" cellpadding="0">
     <tr>
         <td class="input-label">URL</td>
         <td colspan="3">
            {{form.url}}
         </td>
         <td class="input-label">请求方法</td>
         <td colspan="3">
           {{form.httpMethod}}
         </td>
     </tr>
     <tr>
         <td class="input-label">动作</td>
         <td colspan="3">
{{form.action}}
         </td>
         <td class="input-label">类名</td>
         <td colspan="3">
{{form.target}}
         </td>
     </tr>
     <tr>
         <td class="input-label">方法名</td>
         <td colspan="3">
{{form.method}}
         </td>
         <td class="input-label">IP</td>
         <td colspan="3">
           {{form.ip}}
         </td>
     </tr>
     <tr>
         <td class="input-label">请求时间</td>
         <td colspan="3">
{{form.requestTime}}
         </td>
         <td class="input-label">请求耗时</td>
         <td colspan="3">
{{form.responseTime-form.requestTime}}ms
         </td>
     </tr>
     <tr>
         <td class="input-label">请求头</td>
         <td colspan="6">
            {{form.httpHeaders}}
         </td>
     </tr>
     <tr>
         <td class="input-label">请求参数</td>
         <td colspan="6">
       {{form.parameters}}
         </td>
     </tr>
<tr>
         <td class="input-label">请求异常</td>
         <td colspan="6">
         </td>
     </tr>
 </table>
  </Modal>
</template>

<script>
  import {
    deepClone,
    getDate
  } from '@/libs/tools'
  export default {
    data() {
      return {
        modalVisible: false,
        form: {

        },
      }
    },
    methods: {
     asyncOK(){

     }
    },
  }
</script>

<style lang="less">
  .form-table {
      width: 100%;
      margin: 20px 0;
      border-collapse: collapse;
      font-size: 14px;

      .td-inner {
          padding: 0 10px;
          color: #999;
          font-size: 12px;
      }

      .el-select {
          width: 100%;
      }

      input {
          border: none;
          outline: none;
          width: 100%;
          color: #999;
      }

      td {
          height: 30px;
          width: 110px;
          padding: 16px 24px;
          word-break: break-word;
          border: 1px solid rgb(235, 238, 245);
      }
  }
</style>
