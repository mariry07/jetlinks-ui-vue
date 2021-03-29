<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="tableList">
        <div>
          <com-search-form :formItems="formItems" @search="search"></com-search-form>
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
            @change="onTableChange"
          >
          </a-table>
        </div>
      </div>
    </a-card>
    <save-modal
      :data="ModalData"
      :visible="ModalVisible"
      :width="900"
      @submitData="submitData"
      @close="() => {
        ModalVisible = false
        ModalData = {}
      }"
    />
  </page-header-wrapper>
</template>

<script>
  import moment from 'moment'
  import { tableMixin } from '@/core/mixins/tableMixin'
  import apis from '@/api'
  import SaveModal from './save'
  import ComSearchForm from '@/components/SearchForm'

  export default {
    name: 'LoggerAccess',
    mixins: [tableMixin],
    components: {
      ComSearchForm,
      SaveModal
    },
    data () {
      const columns = [
        {
          title: '序号',
          dataIndex: 'id',
          customRender: (text, record, index) => index + 1
        },

        {
          title: 'IP',
          dataIndex: 'ip'
          // ellipsis: true
        },
        // {
        //     title: '请求方法',
        //     dataIndex: 'httpMethod',
        // },
        {
          title: '请求路径',
          dataIndex: 'url',
          // ellipsis: true,
          customRender: (text, record) => (
            <div>
              <a-tag color="#87d068">{record.httpMethod}</a-tag>
              {record.url}
            </div>
          )
        },
        {
          title: '说明',
          dataIndex: 'describe',
          // ellipsis: true,
          customRender: (text, record) => {
            const action = record.action ? <a-tag color="volcano">{record.action}</a-tag> : ''
            const describe = record.describe ? <a-tag color="#2db7f5">{record.describe}</a-tag> : ''
            return (
              <div>
                {action}
                {describe}
              </div>
            )
          }
        },
        // {
        //     title: "动作",
        //     dataIndex: 'action',
        //     ellipsis: true,
        // },
        {
          title: '请求时间',
          dataIndex: 'requestTime',
          sorter: true,
          defaultSortOrder: 'descend',
          // ellipsis: true,
          customRender: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: '请求耗时',
          // width: 100,
          customRender: (record) => (
            <a-tag color="purple">{record.responseTime - record.requestTime}ms</a-tag>
          )
        },
        {
          title: '请求用户',
          dataIndex: 'context.username',
          customRender: text => <a-tag color="geekblue">{text}</a-tag>
        },
        {
          title: '操作',
          customRender: (text, record) => (
            <div>
              <a onClick={() => this.setSaveVisible(record)}>
                详情
              </a>
            </div>
          )
        }
      ]
      return {
        formItems: [
          {
            label: '请求路径',
            key: 'url$LIKE',
            type: 'string'
          },
          {
            label: 'IP',
            key: 'ip',
            type: 'string'
          },

          {
            label: '操作',
            key: 'action',
            type: 'string'
          },
          {
            label: '请求ID',
            key: 'id',
            type: 'string'
          },
          {
            label: '日志时间',
            key: 'requestTime$btw',
            type: 'dateTimeRange',
            props: {
              showTime: { format: 'HH:mm' },
              format: 'YYYY-MM-DD HH:mm',
              placeholder: ['开始时间', '结束时间']
            }
          }
        ],
        columns,
        ModalVisible: false,
        ModalData: {}
      }
    },
    mounted () {
      this.GetData()
    },
    methods: {
      GetData (terms) {
        apis.loggerAccess.getAccessLists({
          pageSize: this.pageSize,
          pageIndex: this.current,
          terms: terms || '',
          sorts: {
            field: 'requestTime',
            order: 'desc'
          }
        }).then(res => {
          if (res.status === 200) {
            this.data = res.result.data
            this.total = res.result.total
            this.current = res.result.pageIndex
            this.loading = false
          }
        })
      },
      setSaveVisible (data) {
        this.ModalVisible = true
        this.ModalData = data
      },
      submitData (data) {
        this.ModalVisible = false
        // 提交数据XXX
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
