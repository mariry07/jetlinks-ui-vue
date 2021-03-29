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
  import apis from '@/api/index.js'
  import ComSearchForm from '@/components/SearchForm'
  import SaveModal from './save'

export default {
    name: 'LoggerSystem',
    mixins: [tableMixin],
    components: {
      ComSearchForm,
      SaveModal
    },
    data () {
      const columns = [
        {
          title: '线程',
          dataIndex: 'threadName',
          ellipsis: true
        },
        {
          title: '名称',
          dataIndex: 'name',
          ellipsis: true
        },
        {
          title: '级别',
          dataIndex: 'level',
          width: 80,
          customRender: text => <a-tag color={text === 'ERROR' ? 'red' : 'orange'}>{text}</a-tag>
        },
        {
          title: '日志内容',
          dataIndex: 'exceptionStack',
          ellipsis: true
        },
        {
          title: '服务名',
          dataIndex: 'context.server',
          width: 150,
          ellipsis: true
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: 200,
          sorter: true,
          ellipsis: true,
          defaultSortOrder: 'descend',
          customRender: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: '操作',
          customRender: (_, record) => (
            <div>
              <a
                onClick={() => this.setSaveVisible(record) }
              >
                详情
              </a>
            </div>
          )
        }
      ]
      return {
        formItems: [
          {
            label: '名称',
            key: 'name$LIKE',
            type: 'string'
          },
          {
            label: '日志级别',
            key: 'level$IN',
            type: 'list',
            options: {
              data: ['ERROR', 'INFO', 'WARN', 'DEBUG'],
              mode: 'multiple'
            }
          },
          {
            label: '日志时间',
            key: 'createTime$btw',
            type: 'time'
          },
          {
            label: '日志内容',
            key: 'message$LIKE',
            type: 'string'
          }
        ],
        columns,
        ModalVisible: false,
        ModalData: {}
      }
    },
    methods: {
      GetData (terms) {
        apis.loggerSystem.getSystemLists({
          pageSize: this.pageSize,
          pageIndex: this.current,
          terms: terms || '',
          sorts: {
            field: 'createTime',
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

<style lang="less" scoped>
@import '~@/utils/table.less';

</style>
