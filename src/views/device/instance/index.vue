<template>
  <div>
    <page-header-wrapper
      :title="'设备管理'"
      v-if="!GetDetailStatus"
    >
      <div class="standardList" >
        <a-card :bordered="false" :style="{ height: '95px' }">
          <a-spin :spinning="false">
            <a-row>
              <a-col :sm="7" :xs="24">
                <a-select placeholder="选择产品" allowClear :style="{ width: '70%', marginTop: '7px' }" >
                  <a-select-option value="jack">
                    Jack
                  </a-select-option>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                </a-select>
              </a-col>
              <a-col :sm="4" :xs="24">
                <ins-info :badgeText="'全部设备'" :showData="100"></ins-info>
              </a-col>
              <a-col :sm="4" :xs="24">
                <ins-info :badgeStatus="'success'" :badgeText="'在线'" :showData="10"></ins-info>
              </a-col>
              <a-col :sm="4" :xs="24">
                <ins-info :badgeStatus="'success'" :badgeText="'离线'" :showData="10"></ins-info>
              </a-col>
              <a-col :sm="4" :xs="24">
                <ins-info :badgeStatus="'success'" :badgeText="'未启用'" :showData="10"></ins-info>
              </a-col>
              <a-col :sm="1" :xs="24">
                <a-tooltip title="刷新">
                  <a-icon type="sync" :style="{ fontSize: '20px' }" />
                </a-tooltip>
              </a-col>
            </a-row>
          </a-spin>
        </a-card>
        <br/>
        <a-card :bordered="false">
          <div class="tableList">
            <div class="tableListForm">
              <ins-search>
              </ins-search>
            </div>
            <div class="tableListOperator">
              <a-button icon="plus" type="primary" @click="AddInstance">添加设备</a-button>
              <a-divider type="vertical" />
              <a-dropdown>
                <a-menu slot="overlay">
                  <a-menu-item key="1">
                    <a-button icon="download" type="default" >
                      批量导出设备
                    </a-button>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <a-button icon="upload" >批量导入设备</a-button>
                  </a-menu-item>
                  <a-menu-item v-if="true" key="3">
                    <a-button icon="delete" >
                      删除选中设备
                    </a-button>
                  </a-menu-item>
                  <a-menu-item v-if="true" key="6">
                    <a-button icon="stop" >
                      注销选中设备
                    </a-button>
                  </a-menu-item>
                  <a-menu-item key="4" v-if="true">
                    <a-button icon="check-circle" type="danger" >
                      激活选中设备
                    </a-button>
                  </a-menu-item>
                  <a-menu-item key="4" v-else>
                    <a-button icon="check-circle" type="danger" >
                      激活全部设备
                    </a-button>
                  </a-menu-item>
                  <a-menu-item key="5">
                    <a-button icon="sync" type="danger" >
                      同步设备状态
                    </a-button>
                  </a-menu-item>
                </a-menu>
                <a-button icon="menu">
                  其他批量操作<a-icon type="down" />
                </a-button>
              </a-dropdown>
            </div>
            <div>
              <a-table
                :loading="false"
                :columns="attributeColumns"
                :dataSource="showData"
                rowKey="id"
                :row-selection="rowSelection"
              >
              </a-table>
            </div>
          </div>
        </a-card>
        <ins-save
          v-if="MobaleVisible"
          :type="MobalType"
          :showModal="MobaleVisible"
          @SetModalOk="() => MobaleVisible = false "
          @SetModalCancel="() => MobaleVisible = false"
        ></ins-save>
      </div>
    </page-header-wrapper>
    <router-view></router-view>
  </div>
</template>

<script>

  import InsInfo from './components/Info'
  import InsSearch from './search'
  import InsSave from './save'
  import moment from 'moment'
  const data = [
    {
      key: '1',
      id: '1',
      name: 'John Brown',
      productName: 'productName',
      registryTime: '2010-10-10',
      state: {
        text: '未启用',
        value: 'notActive'
      },
      describe: 'describe'
    }
  ]
  const statusMap = new Map()
  statusMap.set('在线', 'success')
  statusMap.set('离线', 'error')
  statusMap.set('未激活', 'processing')
  statusMap.set('online', 'success')
  statusMap.set('offline', 'error')
  statusMap.set('notActive', 'processing')

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows)
    }
  }

  export default {
    name: 'DeviceInstance',
    components: {
      InsInfo,
      InsSearch,
      InsSave
    },
    data () {
      const columns = [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '设备名称',
          dataIndex: 'name',
          ellipsis: true
        },
        {
          title: '产品名称',
          dataIndex: 'productName',
          ellipsis: true
        },
        {
          title: '注册时间',
          dataIndex: 'registryTime',
          width: '200px',
          customRender: (text) => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '/',
          sorter: true
        },
        {
          title: '状态',
          dataIndex: 'state',
          width: '90px',
          customRender: record => record ? <a-badge status={statusMap.get(record.value)} text={record.text} /> : '',
          filters: [
            {
              text: '未启用',
              value: 'notActive'
            },
            {
              text: '离线',
              value: 'offline'
            },
            {
              text: '在线',
              value: 'online'
            }
          ],
          filterMultiple: false
        },
        {
          title: '说明',
          dataIndex: 'describe',
          width: '15%',
          ellipsis: true
        },
        {
          title: '操作',
          width: '200px',
          align: 'center',
          customRender: (record) => (
            <div>
              <a onClick={() => {
                this.$router.push({ path: `/device/instance/save/1` })
              }}>
                查看
              </a>
              <a-divider type="vertical" />
              <a onClick={() => { this.AddInstance('edit') } }>
                编辑
              </a>
              <a-divider type="vertical" />
              {record.state?.value === 'notActive' ? (
                <span>
                  <a-popconfirm
                    title="确认启用？"
                    onConfirm={() => {}}
                  >
                    <a>启用</a>
                  </a-popconfirm>
                  <a-divider type="vertical" />
                  <a-popconfirm
                    title="确认删除？"
                    onConfirm={() => {}}
                  >
                    <a>删除</a>
                  </a-popconfirm>
                </span>
              ) : (
                  <a-popconfirm
                    title="确认禁用设备？"
                    onConfirm={() => { }}
                  >
                    <a>禁用</a>
                  </a-popconfirm>
                )}
            </div>
          )
        }
      ]
      return {
        attributeColumns: columns,
        showData: data,
        rowSelection,
        MobaleVisible: false,
        MobalType: 'add'
      }
    },
    computed: {
      GetMetaTitle () {
        if (this.$route.path.includes('/device/instance/save')) {
          return this.$route.params.id
        }
        return this.$route.meta.title || ''
      },
      GetDetailStatus () {
        return this.$route.path.includes('/device/instance/save')
      }
    },
    methods: {
      AddInstance (item) {
        this.MobaleVisible = true
        this.MobalType = item ? 'edit' : 'add'
      }
    }
  }
</script>

<style lang="less" scoped>
@import '~@/utils/table.less';
// @import './index.less';
</style>
