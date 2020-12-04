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
        <template slot-scope="{ row, index }" slot="status">
          <Tag v-if="row.hasOwnProperty('state')&&row.state!=0" color="green">已发布</Tag>
          <Tag v-else color="error">未发布</Tag>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="editFun(row)">编辑</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="deleFun(row)">删除</Button>
          <Button type="primary" v-if="row.hasOwnProperty('state')&&row.state!=0" size="small" @click="deployFun(row)">取消发布</Button>
          <Button type="primary" v-else size="small" @click="releaseFun(row)">发布</Button>
        </template>
      </Table>
      <Page :total="page.total" :current="page.index" :page-size="page.size" show-sizer @on-change="changeIndexPage"
        @on-page-size-change="changePageSize" />
    </Card>
    <drawer ref="modalID" />
  </div>
</template>

<script>
  import {
    getTableData,
    deleCertificate,
    setRelease,
    setUnRelease
  } from '@/api/network/protocol/data'
  import {
    deepClone
  } from '@/libs/tools'
  import drawer from './components/drawer'
  const form = {
    type:'',
    id:'',
    name:'',
    description:'',
    configuration: {
      provider: '',
      location: '',
      protocol: '',
      script: '//解码,收到设备上行消息时\n' +
        'codec.decoder(function (context) {\n' +
        '  var message = context.getMessage();\n' +
        '  return {\n' +
        '    messageType:"REPORT_PROPERTY"//消息类型\n' +
        '  };\n' +
        '});\n' +
        '\n' +
        '//编码读取设备属性消息\n' +
        'codec.encoder("READ_PROPERTY",function(context){\n' +
        '  var message = context.getMessage();\n' +
        '  var properties = message.properties;\n' +
        '})',
      transport: []
    }
  }
  export default {
    name: 'tables_page',
    components: {
      drawer
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
            title: 'ID',
            key: 'id'
          },
          {
            title: '名称',
            key: 'name'
          }, {
            title: '状态',
            slot: 'status',
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
        if (copyRow.configuration.hasOwnProperty('transport')) {
          try {
            copyRow.configuration.transport = copyRow.configuration.transport.split(',')
          } catch (e) {
            //TODO handle the exception
          }
        }
        this.$refs.modalID.formValidate = copyRow
        this.$refs.modalID.drawerShow = true
      },
      addFun(row) {
        this.$refs.modalID.formValidate = form
        this.$refs.modalID.collapse = ['测试']
        this.$refs.modalID.drawerShow = true
      },
      releaseFun(row) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要发布吗？</p>',
          onOk: () => {
            setRelease(row.id).then(res => {
              this.getData()
            })

          },
          onCancel: () => {

          }
        });
      },
      deployFun(row) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要取消发布吗？</p>',
          onOk: () => {
            setUnRelease(row.id).then(res => {
              this.getData()
            })

          },
          onCancel: () => {

          }
        });
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
        getTableData(this.page.size, this.page.index - 1).then(res => {
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
