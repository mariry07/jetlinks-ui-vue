<template>
  <div>
    <Card>
      <div class="search-con search-con-top">
        <Button @click="addFun" class="search-btn" type="primary">
          <Icon type="search" />新建</Button>
      </div>
      <Table border :columns="columns12" :data="tableList">

        <template slot-scope="{ row, index }" slot="provider">
          {{setProviders()[row.provider]}}
        </template>
         <template slot-scope="{ row, index }" slot="networkId">
           {{setNoPaging()[row.networkId]}}
         </template>
         <template slot-scope="{ row, index }" slot="state">
          {{row.state.text}}
         </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="editFun(row)">编辑</Button>
          <Button type="error" v-if="row.state.text !='已暂停'&&row.state.text !='已启动'"  size="small" style="margin-right: 5px" @click="startFun(row)">启动</Button>
          <Button type="error" v-if="row.state.text !='已停止'&&row.state.text !='已暂停'"  size="small" style="margin-right: 5px" @click="pauseFun(row)">暂停</Button>
          <Button type="primary" v-if="row.state.text !='已暂停'"  size="small" @click="deleFun(row)">删除</Button>
           <Button type="primary" v-if="row.state.text !='已启动'&&row.state.text !='已停止'"  size="small" style="margin-right: 5px" @click="startFun(row)">恢复</Button>
        </template>
      </Table>
      <Page :total="page.total" :current="page.index" :page-size="page.size" show-sizer @on-change="changeIndexPage"
        @on-page-size-change="changePageSize" />
    </Card>
    <Modal ref="modalID" />
  </div>
</template>

<script>
  import {
    getTableData,
    deleDevice,
    getNoPaging,
    getProviders,
    getSupports,
    setStartup,
    setPause
  } from '@/api/network/gateway/data'
  import {
    deepClone
  } from '@/libs/tools'
  import Modal from './components/add'
  const form =  {
          provider:'',
          configuration:{}
        }
  export default {
    name: 'tables_page',
    components: {
      Modal
    },
    data() {
      return {
        columns: [],
        edittingCellId: '',
        edittingText: '',
        id:'',
        page: {
          index: 1,
          size: 10,
          total: 0
        },
        columns12: [{
            title: '名称',
            key: 'name'
          },
          {
            title: '类型',
            slot: 'provider'
          },
          {
            title: '网络组件',
            slot: 'networkId'
          },
          {
            title: '状态',
            slot: 'state'
          },
          {
            title: '操作',
            slot: 'action',
            width: 220,
            align: 'center'
          }
        ],
        tableList: [],
        getProvidersArr:[],
        getNoPagingArr:[]
      }
    },
    methods: {
      handleSearch() {},
      changeIndexPage(i) {
        // i是分页中当前页的页码
        this.page.index = i;
        this.getData()
      },
      changePageSize(s) {
        // s为页面大小
        this.page.index = 1;
        this.page.size = s;
        this.getData()
      },
      editFun(row) {
        this.$refs.modalID.title = '编辑网关'
        let copyRow = deepClone(row)
        this.publicFun()
        this.$nextTick(()=>{
          this.$refs.modalID.modalVisible = true
          this.$refs.modalID.formValidate = copyRow
        })
      },
      addFun(row) {
        this.$refs.modalID.title = '新建网关'
        this.$refs.modalID.formValidate = form
        this.$refs.modalID.modalVisible = true
       this.publicFun()
      },
      publicFun(){
        this.getSupports();
        this.$refs.modalID.providers = [...this.getProvidersArr].map(item => {
             return {
               label: item.name,
               value: item.id,
               id:item.networkType.value
             }
           })
      },
      deleFun(row) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗？</p>',
          onOk: () => {
            deleDevice(row.id).then(res => {
              this.getData()
            })

          },
          onCancel: () => {

          }
        });
      },
     async startFun(row){
        let res = await setStartup(row.id)
        if (res.data.status === 200) {
          this.getData()
        } else {
          this.$Message.error(res.data.message);
        }
      },
      async pauseFun(row){
         let res = await setPause(row.id)
         if (res.data.status === 200) {
           this.getData()
         } else {
           this.$Message.error(res.data.message);
         }
       },
      getData() {
        getTableData().then(res => {
          this.tableList = res.data.result.data
          this.page.total = res.data.result.total
          this.getProviders();
          this.getNoPaging()
        })

        },
       async getProviders(){
          let res = await getProviders()
          this.getProvidersArr = res.data.result
          this.setProviders()
        },
       async getNoPaging(){
          let res = await getNoPaging()
          this.getNoPagingArr = res.data.result
          this.setNoPaging()
        },
       async getSupports(){
          let res = await getSupports()
         this.$refs.modalID.protocols = [...res.data.result].map(item => {
            return {
              label: item.name,
              value: item.id,
            }
          })
        },
        setProviders(){
          let objProviders = {}
          this.getProvidersArr.forEach(item=>{
             objProviders[item.id] = item.name
          })
          return objProviders
        },
        setNoPaging(){
          let objNoPaging = {}
          this.getNoPagingArr.forEach(item=>{
             objNoPaging[item.id] = item.type.name
          })
          return objNoPaging
        }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style lang="less">
  .ivu-page {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }

  .search-con {
    padding: 10px 0;

    .search {
      &-col {
        display: inline-block;
        width: 200px;
      }

      &-input {
        display: inline-block;
        width: 200px;
        margin-left: 2px;
      }

      &-btn {
        margin-left: 2px;
      }
    }
  }
</style>
