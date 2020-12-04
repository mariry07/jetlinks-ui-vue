<template>
  <div>
    <Card>
      <div class="search-con search-con-top">
        <Select v-model="searchKey" class="search-col">
          <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
        </Select>
        <Input clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue" />
        <Button @click="handleSearch" class="search-btn" type="primary">
          <Icon type="search" />&nbsp;&nbsp;搜索</Button>
        <Button @click="addFun" class="search-btn" type="primary">
          <Icon type="search" />新建</Button>
      </div>
      <Table border :columns="columns12" :data="tableList">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="editFun(row)">编辑</Button>
          <Button type="error"  size="small" @click="deleFun(row)">删除</Button>
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
    deleCertificate
  } from '@/api/network/certificate/data'
  import {
    deepClone
  } from '@/libs/tools'
  import Modal from './components/add'
  const form = {
          name: '',
          instance:'PEM',
          description:'',
          configs:{
            keystoreBase64:'',
            keystorePwd:'',
            trustKeyStoreBase64:'',
            trustKeyStorePwd:''
          }
        }
  export default {
    name: 'tables_page',
    components: {
      Modal
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
            title: '名称',
            slot: 'name'
          },
          {
            title: '类型',
            key: 'instance'
          },
          {
            title: '描述',
            key: 'description'
          },
          {
            title: '操作',
            slot: 'action',
            width: 220,
            align: 'center'
          }
        ],
        tableList: []
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
        let copyRow = deepClone(row)
        this.$refs.modalID.modalVisible = true
        this.$refs.modalID.formValidate = copyRow
      },
      addFun(row) {
        this.$refs.modalID.formValidate = form
        this.$refs.modalID.modalVisible = true
      },
      deleFun(row) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗？</p>',
          onOk: () => {
            deleCertificate(row.id).then(res => {
              this.getData()
            })

          },
          onCancel: () => {

          }
        });
      },
      getData() {
        getTableData(this.page.size,this.page.index-1).then(res => {
          this.tableList = res.data.result.data
          this.page.total = res.data.result.total
        })
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
