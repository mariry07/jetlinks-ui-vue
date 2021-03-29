<template>
  <page-header-wrapper>
    <a-card
      :bordered="false"
    >
      <div class="tableList">
        <div>
          <com-search-form :formItems="formItems"/>
        </div>
        <div class="tableListOperator">
          <a-button
            icon="plus"
            type="primary"
            @click="setSaveVisible"
          >
            新建
          </a-button>
          <a-upload
            :showUploadList="false"
            accept=".json"
          >
            <a-button>
              <a-icon type="upload" />导入
            </a-button>
          </a-upload>
        </div>
      </div>
      <div class="StandardTable">
        <a-table
          rowKey="id"
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
    </a-card>
    <save-drawer
      :visible="DrawerVisible"
      :dataSource="DrawerData"
      @onClose="onClose"
    >
    </save-drawer>
  </page-header-wrapper>
</template>

<script>
  import moment from 'moment'
  import { tableMixin } from '@/core/mixins/tableMixin'
  import apis from '@/api/index.js'
  import ComSearchForm from '@/components/SearchForm'
  import SaveDrawer from './save'
  const data = [
    {
      key: 'id',
      id: '1',
      name: '1',
      createTime: '2020-10-20',
      state: {
        text: '已启动'
      },
      option: {
        alarmData: JSON.stringify({
          alarmData: 'id',
          description: '1'
        })
      }
    }
  ]
  const statusMap = new Map()
  statusMap.set('已启动', 'success')
  statusMap.set('已停止', 'error')
  statusMap.set('已禁用', 'processing')

  export default {
    name: 'RuleEngineSqlrule',
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
        },

        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          sorter: true,
          defaultSortOrder: 'descend',
          customRender: (text) => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '/'
        },
        {
          title: '状态',
          dataIndex: 'state',
          customRender: record => record ? <a-badge status={statusMap.get(record.text)} text={record.text} /> : ''
        },
        {
          title: '操作',
          width: '25%',
          customRender: (text, record) => (
            <div>
              <a onClick={() => {
                this.DrawerVisible = true
                this.DrawerData = record
              }}>编辑</a>
              <a-divider type="vertical" />
              {record.state?.value === 'started' ? (
                <span>
                  <a-popconfirm title="确认停止？" >
                    <a>停止</a>
                  </a-popconfirm>
                </span>
              ) : (
                  <span>
                    <a-popconfirm title="确认启用?" >
                      <a>启动</a>
                    </a-popconfirm>
                    <a-divider type="vertical" />
                    <a-popconfirm title="确认删除?" onConfirm={() => this.delete(record)}>
                      <a>删除</a>
                    </a-popconfirm>
                  </span>
                )}
              <a-divider type="vertical" />
              <a onClick={() => {}}>下载配置</a>
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
          }
        ],
        columns,
        data,
        DrawerVisible: false,
        DrawerData: {}
      }
    },
    methods: {
      GetData () {
        apis.ruleEngine.getSqlRuleLists({
          pageSize: this.pageSize,
          terms: { modelType: 'sql_rule' },
          sorts: {
            order: 'descend',
            field: 'createTime'
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
      onClose (result) {
        if (result !== '') {
          this.GetData()
        }
        this.DrawerVisible = false
        this.DrawerData = {}
      },
      setSaveVisible () {
        this.DrawerVisible = true
        this.DrawerData = {}
      },
      delete (data) {
        apis.ruleEngine.deleteSqlRuleLists(data.id)
          .then(res => {
            if (res.status === 200) {
              this.GetData()
            }
          })
        // console.log('dele', data)
      }
    }
  }
</script>

<style lang="less" scoped>
@import '~@/utils/table.less';
</style>
