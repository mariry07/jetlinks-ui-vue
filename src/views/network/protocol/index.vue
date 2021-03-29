<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="tableList">
        <com-search-form :formItems="formItems"></com-search-form>
        <div class="tableListOperator">
          <a-button icon="plus" type="primary" @click="() => { DrawerVisible = true }">
            新建
          </a-button>
        </div>
        <div class="StandardTable">
          <a-table
            :rowKey="record => record.id"
            :loading="loading"
            :columns="columns"
            :data-source="data"
            :pagination="{
              current: current+1,
              total: total,
              pageSize: pageSize,
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              showTotal:total => `共${total}条记录
                                第${current + 1}/${Math.ceil(total / pageSize) }页`
            }"
          >
          </a-table>
        </div>
      </div>
    </a-card>
    <save-drawer
      :data="DrawerData"
      :visible="DrawerVisible"
      @submitData="submitData"
      @onClose="() => {
        DrawerVisible = false
        DrawerData = {}
      }"
    />
  </page-header-wrapper>
</template>

<script>
  import apis from '@/api'
  import { tableMixin } from '@/core/mixins/tableMixin'
  import ComSearchForm from '@/components/SearchForm'
  import SaveDrawer from './save'
  // import { HandleProtocolList } from './service'
  // import { ExixtKeys } from '@/utils/util'

  export default {
    name: 'NetworkProtocol',
    mixins: [tableMixin],
    components: {
      ComSearchForm,
      SaveDrawer
    },
    data () {
      const columns = [
        {
          title: 'ID',
          dataIndex: 'id'
        }, {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '状态',
          dataIndex: 'state',
          align: 'center',
          customRender: text =>
            text === 1 ? <a-tag color="#87d068">已发布</a-tag> : <a-tag color="#f50">未发布</a-tag>
        },
        {
          title: '描述',
          dataIndex: 'description'
        },
        {
          title: '操作',
          width: '250px',
          align: 'center',
          dataIndex: 'actions',
          customRender: (text, record) => (
            <div>
              <a onClick={() => this.edit(record)}>编辑</a>
              <a-divider type="vertical" />
              {record.state === 1 ? (
                  <a-popconfirm title="确认重新发布？" >
                    <a>重新发布</a>
                  </a-popconfirm>
                ) : (
                <a-popconfirm title="确认删除？" onConfirm={() => this.delete(record)}>
                  <a>删除</a>
                </a-popconfirm>
              ) }
              <a-divider type="vertical" />
              {record.state === 1 ? (
                <a-popconfirm title="确认取消发布？" >
                  <a>取消发布</a>
                </a-popconfirm>
              ) : (
                  <a-popconfirm title="确认发布？" >
                    <a>发布</a>
                  </a-popconfirm>
                )}
            </div>
          )
        }
      ]
      return {
        formItems: [
          {
            label: '协议名称',
            key: 'name$LIKE',
            type: 'string'
          }
        ],
        columns,
        data: [],
        DrawerVisible: false,
        DrawerData: {}
      }
    },
    methods: {
      async GetData () {
        const res = await apis.networkProtocol.GetProtocolList({
          pageSize: this.pageSize
        })
        // const handleData = HandleProtocolList(res)
        // this.data = handleData.data
        this.data = res.result.data
        this.loading = false
      },
      edit (data) {
        this.DrawerVisible = true
        this.DrawerData = data
      },
      delete (data) {
        apis.networkProtocol.deleteProtocolList(data.id)
          .then(res => {
            if (res.status === 200) {
              this.GetData()
            }
          }).catch(err => this.$message.error(err))
      },
      submitData (data) {
        this.DrawerVisible = false
        this.DrawerData = {}
        // 提交数据XXX
        apis.networkProtocol.editProtocolList(data)
          .then(res => {
            if (res.status === 200) {
              this.$message.success('更新成功')
              this.GetData()
            }
          }).catch(err => this.$message.error(err))
      }
    }
  }
</script>

<style lang="less" scoped>
@import '~@/utils/table.less';
</style>
