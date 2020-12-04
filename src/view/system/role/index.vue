<template>
  <div>
    <Card>
      <div class="search-con search-con-top">
        <Button @click="addFun" class="search-btn" type="primary">
          <Icon type="search" />新建</Button>
      </div>
      <Table border :columns="columns12" :data="tableList" row-key="id">
       <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="editFun(row)">编辑</Button>
          <Button type="primary"  size="small" style="margin-right: 5px" @click="autzFun(row)">权限分配</Button>
          <Button type="primary"  size="small" style="margin-right: 5px" @click="bindingFun(row)">绑定用户</Button>
          <Button type="error" size="small" @click="deleFun(row)">删除</Button>
        </template>
      </Table>
      <Page :total="page.total" :current="page.index" :page-size="page.size" show-sizer @on-change="changeIndexPage"
        @on-page-size-change="changePageSize" />
    </Card>
     <Modal ref="modalID" />
     <Drawer ref="drawerID" targetType="role"></Drawer>
     <userautz ref="userautzID" dimensionTypeId="role"/>
  </div>

</template>

<script>
  import {
    getTableData,
    deleDimension
  } from '@/api/system/role/data'
  import {
    deepClone
  } from '@/libs/tools'
  import Modal from './components/add'
  import Drawer from '@/components/autz/drawer'
  import userautz from '@/components/autz/userautz'
  export default {
    name: 'tables_page',
    components: {
Modal,
Drawer,
userautz
    },
    data() {
      return {
        columns: [],
        insideColumns: [],
        insideTableData: [],
        edittingCellId: '',
        edittingText: '',
        searchValue: '',
        searchKey: '',
        id:'',
        page: {
          index: 1,
          size: 10,
          total: 0
        },
        columns12: [{
            title: '机构标识',
            key: 'id',
            tree: true
          },
          {
            title: '机构名称',
            key: 'name'
          },
          {
            title: '描述',
            key: 'describe'
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
    methods: {
      getData() {
        getTableData(this.page.size,this.page.index-1).then(res => {
          this.tableList = res.data.result.data
        })
      },
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
      addFun(){
        this.$refs.modalID.title = `添加角色`
        this.$refs.modalID.clean()
        this.$refs.modalID.modalVisible = true
      },
      editFun(row){
        let copyRow = deepClone(row)
        this.$refs.modalID.formValidate = copyRow
        this.$refs.modalID.title = `编辑角色`
        this.$refs.modalID.modalVisible = true
      },
      autzFun(row){
        let copyRow = deepClone(row)
        this.$refs.drawerID.id = copyRow.id
        this.$refs.drawerID.drawerShow = true
        this.$refs.drawerID.setPermission();
      },
      bindingFun(row){
         this.$refs.userautzID.userShow = true
         this.$refs.userautzID.form = row
         this.$refs.userautzID.getDimension(row.id)
      },
      deleFun(row){
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗？</p>',
          onOk: () => {
            deleDimension(row.id).then(res => {
              this.getData()
            })

          },
          onCancel: () => {

          }
        });
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
