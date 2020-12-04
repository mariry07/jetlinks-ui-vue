<template>
  <div>
    <Card>
      <div class="search-con search-con-top">
        <Form :label-width="80">
          <FormItem label="组件类型:">
            <Tag checkable color="primary">全部</Tag>
            <Tag checkable color="primary">微信</Tag>
            <Tag checkable color="primary">邮件</Tag>
            <Tag checkable color="primary">语音</Tag>
            <Tag checkable color="primary">钉钉</Tag>
            <Tag checkable color="primary">短信</Tag>
          </FormItem>
          <FormItem label="其他选项:">
            <Form :label-width="80">
              <FormItem label="配置名称:">
                <Input v-model="terms" style="width: 150px" />
              </FormItem>
            </Form>
          </FormItem>
        </Form>
      </div>
    </Card>
    <Row :gutter="20" style="margin-top: 10px;">
      <Card>
        <div class="iview-item">
          <Button type="primary" style="margin-right: 10px" @click="addFun">新建</Button>
          <Button style="margin-right: 10px" @click="addFun">导出配置</Button>
          <Button icon="md-add" @click="addFun">导入配置</Button>
        </div>
        <Table border :columns="columns12" :data="tableList">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="editFun(row)">编辑</Button>
            <Button type="error" size="small" style="margin-right: 5px" @click="deleFun(row)">删除</Button>
            <Button type="primary" size="small" style="margin-right: 5px" @click="downloadFun(row)">下载配置</Button>
            <Button type="primary" size="small" style="margin-right: 5px" @click="debugFun(row)">调试</Button>
          </template>
        </Table>
        <Page :total="page.total" :current="page.index" :page-size="page.size" show-sizer @on-change="changeIndexPage"
          @on-page-size-change="changePageSize" />
      </Card>
    </Row>
    <Modal ref="modalID" :types="types" />
    <debugging ref="debugID" :templates="templates" :templateId='templateId' />
  </div>
</template>

<script>
  import {
    getTableData,
    getTypes,
    getConfig,
    deleConfig,
    debugConfig,
    recordConfig
  } from '@/api/notice/template/data'
  import {
    deepClone,
    downloadObject
  } from '@/libs/tools'
  import Modal from './components/add'
  import debugging from './components/debugging'
  const form = {
    configuration: {
      properties: [{
        id: "",
        name: "",
        value: "",
        description: ""
      }]
    },
    type: '',
    provider: '',
    name: ''
  }
  export default {
    name: 'tables_page',
    components: {
      Modal,
      debugging,
    },
    data() {
      return {
        terms: '',
        page: {
          index: 1,
          size: 10,
          total: 0
        },
        templates: [],
        templateId: '',
        columns12: [{
            title: 'ID',
            key: 'id'
          },
          {
            title: '模板名称',
            key: 'name'
          },
          {
            title: '通知类型',
            key: 'type'
          },
          {
            title: '服务商',
            key: 'provider'
          },
          {
            title: '操作',
            slot: 'action',
            width: 350,
            align: 'center'
          }
        ],
        tableList: [],
        types: []
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
      async editFun(row) {
        let copyRow = deepClone(row)
        this.$refs.modalID.title = '编辑通知配置'
        let res = await getConfig(copyRow.id)
        this.$refs.modalID.modalVisible = true
        this.$refs.modalID.formValidate = res.data.result
      },
      addFun(row) {
        this.$refs.modalID.title = '新建通知配置'
        this.$refs.modalID.formValidate = form
        this.$refs.modalID.modalVisible = true
      },
      deleFun(row) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗？</p>',
          onOk: () => {
            deleConfig(row.id).then(res => {
              this.getData()
            })

          },
          onCancel: () => {

          }
        });
      },
      async debugFun(row) {
        let copyRow = deepClone(row)
        let res = await debugConfig(row.type, row.provider)
        this.templates = res.data.result.data
        this.templateId = copyRow.id
        this.$refs.debugID.debugVisible = true
      },
      downloadFun(row) {
        downloadObject(row, '通知配置')
      },
      async getTypes() {
        let res = await getTypes();
        this.types = [...res.data.result].map(item => {
          return {
            label: item.name,
            value: item.id,
            providerInfos: item.providerInfos
          }
        })
      },
      getData() {
        getTableData(this.page.size, this.page.index - 1).then(res => {
          this.tableList = res.data.result.data
          this.page.total = res.data.result.total
        })
      }
    },
    mounted() {
      this.getTypes()
      this.getData()
    }
  }
</script>

<style lang="less" scoped="scoped">
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

  .iview-item {
    margin: 15px 0;
  }

  /deep/.ivu-tag:hover {
    cursor: pointer
  }
</style>
