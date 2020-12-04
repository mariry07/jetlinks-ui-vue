<template>
  <Drawer title="授权" v-model="drawerShow" width="30%" :mask-closable="false" :styles="styles">
    <Table border :columns="columns12" :data="tableList">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row,index }" slot="authorization">
        <CheckboxGroup v-model="row.checkAllGroup">
          <Checkbox v-for="item in row.actions" :label="item.action"><span>{{item.name}}</span></Checkbox>
        </CheckboxGroup>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" v-if="row.checkAllGroup.length === row.actions.length|| row.checkAllGroup.length>row.actions.length"
          size="small" style="margin-right: 5px" @click.prevent.native="handleCheckAllCloase(row,index)">取消全选</Button>
        <Button type="primary" v-else size="small" style="margin-right: 5px" @click.prevent.native="handleCheckAll(row,index)">全选</Button>
      </template>
    </Table>
    <div class="demo-drawer-footer">
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
    props:['targetType'],
    data() {
      return {
        drawerShow: false,
        id: '',
        // checkAllGroup: [],
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        columns12: [{
            title: '权限名称',
            slot: 'name',
           
          },
          {
            title: '权限操作',
           
            slot: 'authorization',
          },
          {
            title: '操作',
            slot: 'action',
            align: 'center'
          }
        ],
        tableList: []
      }
    },
    mounted() {
      this.getPermission()
    },
    methods: {
      async getPermission() {
        let res = await getPermission({
          paging: false
        })
        this.tableList = res.data.result
        this.tableList.forEach(e => {
          e.checkAllGroup = []
        })
      },
      async setPermission() {
        let res = await setPermission({
          paging: false,
          "terms[0].column": 'dimensionTarget',
          "terms[0].value": this.id
        })
        this.tableList.forEach(item => {
          res.data.result.forEach(e => {
            if (item.id === e.permission) {
              let arry = e.actions
              item.checkAllGroup = [...arry]
            }
          })
        })
        this.$set(this.tableList, 'checkAllGroup', []);
      },
      handleCheckAll(row, index) {
        let arry = []
        row.actions.forEach(e => {
          row.checkAllGroup.push(e.action)
        })
        let data = row.checkAllGroup
        this.$set(this.tableList[index], 'checkAllGroup', [...data]);
      },
      handleCheckAllCloase(row,index) {
        row.checkAllGroup = []
        this.tableList[index].checkAllGroup = []
      },
     async saveFun(){
        let copyTable = JSON.parse(JSON.stringify(this.tableList))
       let  permissionList = copyTable.map(item=>{
         if(item.checkAllGroup.length!=0){
           return {
             id:item.id,
             actions:item.checkAllGroup
           }
         }
        }).filter(e=>e)
        await setSave({
          permissionList,
          targetId:this.id,
          targetType:this.targetType
        })

      }
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
