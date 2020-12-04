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
      </div>
      <Table border :columns="columns12" :data="tableList">
        <template slot-scope="{ row }" slot="httpMethod">
          <Tag color="success">{{row.httpMethod}}</Tag> {{row.url}}
        </template>
        <template slot-scope="{ row }" slot="describe">
          <Tag v-if="row.hasOwnProperty('action')" color="orange">{{row.action}}</Tag>
          <Tag v-else color="primary">{{row.describe}}</Tag>
        </template>
        <template slot-scope="{ row }" slot="name">
          <Tag color="blue">{{row.context.username}}</Tag>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="datilFun(row)">详情</Button>
        </template>
      </Table>
      <Page :total="page.total" :current="page.index" :page-size="page.size" show-sizer @on-change="changeIndexPage"
        @on-page-size-change="changePageSize" />
    </Card>
    <Modal ref="modalID" />
    <Drawer ref="drawerID" targetType="user"></Drawer>
  </div>
</template>

<script>
  import {
    getTableData,
  } from '@/api/logger/access/data'
  import {
    deepClone,
    getDate
  } from '@/libs/tools'
  import Modal from './components/add'
  import Drawer from '@/components/autz/drawer'
  const setMap = {
    1: '正常',
    0: '已禁用'
  }
  export default {
    name: 'tables_page',
    components: {
      Modal,
      Drawer
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
        id: '',
        page: {
          index: 1,
          size: 10,
          total: 0
        },
        columns12: [{
            type: 'index',
            width: 60,
            align: 'center'
          }, {
            title: 'IP',
            key: 'ip'
          },
          {
            title: '请求路径',
            slot: 'httpMethod'
          },
          {
            title: '说明',
            slot: 'describe'
          },
          {
            title: '请求时间',
            key: 'requestTime',
            render: (h, params) => {
              const row = params.row;
              return h('div', [
                h('span', {}, getDate(row.requestTime, 'year')),
              ]);
            }
          },
          {
            title: '请求耗时',
            key: 'responseTime',
            render: (h, params) => {
              const row = params.row;
              return h('div', [
                h('Tag', {
                    color: "purple"
                }, (row.responseTime - row.requestTime) + 'ms'),
              ]);
            }
          },
          {
            title: '请求用户',
            slot: 'name'
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
      datilFun(row) {
        let copyRow = deepClone(row)
        this.$refs.modalID.modalVisible = true
        this.$refs.modalID.form = copyRow
      },
      getData() {
        getTableData(this.page.size, this.page.index - 1).then(res => {
          this.tableList = res.data.result.data
          this.page.total = res.data.result.total
          this.tableList.forEach(e => {
            e.status = setMap[e.status]
          })
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
