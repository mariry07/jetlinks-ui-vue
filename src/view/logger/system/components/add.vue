<template>
  <Modal v-model="modalVisible" width="50%" title="系统日志详情" @on-ok="asyncOK">
    <table class="form-table el-form-item--mini" cellspacing="0" cellpadding="0">
      <tr>
        <td class="input-label">线程名称</td>
        <td colspan="3">
          {{form.threadName}}
        </td>
        <td class="input-label">日志级别</td>
        <td colspan="3">
          {{form.level}}
        </td>
      </tr>
      <tr>
        <td class="input-label">方法名</td>
        <td colspan="3">
          {{form.methodName}}
        </td>
        <td class="input-label">行号</td>
        <td colspan="3">
          {{form.lineNumber}}
        </td>
      </tr>
      <tr>
        <td class="input-label">线程ID</td>
        <td colspan="3">
          {{form.threadName}}
        </td>
        <td class="input-label">创建时间</td>
        <td colspan="3">
          {{form.createTime}}
        </td>
      </tr>
      <tr>
        <td class="input-label">名称</td>
        <td colspan="6">
          {{form.name}}
        </td>
      </tr>
      <tr>
        <td class="input-label">消息</td>
        <td colspan="6">
          {{form.message}}
        </td>
      </tr>
      <tr>
        <td class="input-label">上下文</td>
        <td colspan="6">
          {{form.context}}
        </td>
      </tr>
      <tr>
        <td class="input-label">异常线</td>
        <td colspan="6">
          {{form.exceptionStack}}
        </td>
      </tr>
    </table>
  </Modal>
</template>

<script>
  import {
    addUser
  } from '@/api/logger/system/data'
  export default {
    data() {
      return {
        modalVisible: false,
        form: {

        },
      }
    },
    methods: {
      asyncOK() {

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
