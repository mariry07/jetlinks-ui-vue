<template>
  <Drawer title="授权" v-model="drawerShow" width="420" :mask-closable="false" :styles="styles">
    

    
    <div slot="footer">
      <Button style="margin-right: 8px" @click="drawerShow = false">取消</Button>
      <Button type="primary" @click="saveFun">确定</Button>
    </div>
  </Drawer>
</template>

<script>
  import {
    getPermission,
    setPermission,
    setSave
  } from '@/api/system/user/data'
  export default {
    data() {
      return {
        drawerShow: false,
        
      }
    },
    mounted() {
     
    },
    methods: {
      
    },
  }
</script>

<style>
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
</style>
