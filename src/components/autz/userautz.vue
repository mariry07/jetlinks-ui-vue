<template>
  <div>
    <Drawer title="绑定用户" v-model="userShow" width="30%" :mask-closable="false" :styles="styles">
      <div class="search-con search-con-top">
        <Button @click="addFun" class="search-btn" type="primary">
          <Icon type="search" />绑定</Button>
      </div>
      <Table border ref="selection" :columns="columns12" :data="tableList">
        <template slot-scope="{ row }" slot="userName">
          <strong>{{ row.userName }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click.prevent.native="deleDimensionUser(row,index)">删除</Button>
        </template>
      </Table>
    </Drawer>
    <Drawer title="选择用户" v-model="userChange" width="30%" :mask-closable="false" :styles="styles" >
      <div class="search-con search-con-top" v-show="selectionChangeArry.length!=0">
        <div data-v-2250fff5="" class="ivu-alert ivu-alert-info ivu-alert-with-icon" style="margin-top: 16px;"><span
            class="ivu-alert-icon"><i class="ivu-icon ivu-icon-ios-information-circle"></i></span> <span class="ivu-alert-message">已选择{{selectionChangeArry.length}}项 </span> <span class="ivu-alert-desc"></span>
          <!---->
        </div>
        <Button @click="saveFun" class="search-btn" type="primary">
          <Icon type="search" />保存</Button>
      </div>
      <Table ref="selection1" border :columns="columns11" :data="tableListUser" @on-selection-change="selectionChange">

      </Table>
    </Drawer>
  </div>
</template>

<script>
  import {
    getDimensionUser,
    getUser,
    setDimensionUser,
    deleDimensionUser
  } from '@/api/system/org/data'
  export default {
    props: ['dimensionTypeId'],
    data() {
      return {
        userShow: false,
        userChange: false,
        // checkAllGroup: [],
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        columns11: [{
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '用户姓名',
            key: 'name',
          },
          {
            title: '用户名',
            key: 'username',
          }
        ],
        columns12: [ {
            title: '用户名',
            slot: 'userName',
          },
          {
            title: '操作',
            slot: 'action',
            align: 'center'
          }
        ],
        tableList: [],
        tableListUser: [],
        selectionChangeArry:[],
        form:{},
        id:''
      }
    },
    watch: {
      userChange(val) {
        if(!val){
          this.getDimension(this.id)
        }
      }
    },
    mounted() {

    },
    methods: {
      async getDimension(id) {
        this.id = id
        let res = await getDimensionUser(id)
        this.tableList = res.data.result
      },
      async addFun() {
        this.userChange = true
        let res = await getUser()
        this.tableListUser = res.data.result.data
      },
      selectionChange(row){
        this.selectionChangeArry = row
      },
     async saveFun(){
         for (let i=0;i<this.selectionChangeArry.length;i++) {
              let res = await setDimensionUser({
                dimensionId:this.form.id,
                dimensionName:this.form.name,
                dimensionTypeId:this.dimensionTypeId,
                userId:this.selectionChangeArry[i].id,
                userName:this.selectionChangeArry[i].username,
              })
         }
      },
     async deleDimensionUser(row){
       let res = await deleDimensionUser(row.id)
       console.log(res)
       if(res.data.status===200){
         this.getDimension(this.id)
       }
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
