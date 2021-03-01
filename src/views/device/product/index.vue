<template>
  <page-header-wrapper :title="GetMetaTitle">
    <template v-slot:extra v-if="GetDetailStatus">
      <div class="page-header-extra">
        <div class="content">
          <div class="content-status">
            <a-badge status="success" />已发布
            <a-button type="link">
              停用
            </a-button>
          </div>
          <div class="content-restart">
            <a-button type="primary"><a-icon type="sync" />应用配置</a-button>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:content v-if="GetDetailStatus">
      <div class="page-header-product-num">
        <div class="content">
          <div class="content-title">
            设备数量 1
            <a-button type="link">
              查看
            </a-button>
          </div>
        </div>
      </div>
    </template>
    <div v-if="GetRouteShow">
      <a-card :bordered="false">
        <com-search-form :formItems="formItems"></com-search-form>

        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
          <a-divider type="vertical" />
          <a-upload
            name="file"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
            <a-button> <a-icon type="upload" /> 快速导入 </a-button>
          </a-upload>
        </div>
      </a-card>
      <div class="ant-pro-pages-list-applications-filterCardList">
        <a-list :loading="loading" :data-source="data" :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }" style="margin-top: 24px;">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card :body-style="{ paddingBottom: 20 }" hoverable>
              <a-card-meta :title="item.title">
                <template slot="avatar">
                  <a-avatar size="small" :src="item.avatar" style="width: 40px; height: 40px; line-height: 40px; font-size: 18px;"/>
                </template>
                <template slot="description">
                  www.instagram.com
                </template>
              </a-card-meta>
              <template slot="actions">
                <a-tooltip title="查看">
                  <a-icon type="eye" @click="() => { $router.push({ path: '/device/product/save/2' }) }"/>
                </a-tooltip>
                <a-tooltip title="编辑">
                  <a-icon type="edit" />
                </a-tooltip>
                <a-tooltip title="下载">
                  <a-icon type="download" />
                </a-tooltip>
                <a-dropdown>
                  <a class="ant-dropdown-link">
                    <a-icon type="ellipsis" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a-button type="link">
                        <a-icon type="close" />
                        <a href="javascript:;">停用</a>
                      </a-button>
                    </a-menu-item>
                    <a-menu-item>
                      <a-button type="link">
                        <a-icon type="stop" />
                        <a href="javascript:;">删除</a>
                      </a-button>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </template>
              <div class="">
                <card-info active-user="100" new-user="999"></card-info>
              </div>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
    </div>
    <router-view></router-view>
  </page-header-wrapper>
</template>

<script>
import { getServiceList } from '@/api/manage'
import CardInfo from './components/CardInfo'
import ComSearchForm from '@/components/SearchForm'

export default {
  name: 'DeviceProduct',
  components: {
    CardInfo,
    ComSearchForm
  },
  data () {
    return {
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getServiceList(requestParameters)
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],
      data: [],
      loading: true,
      formItems: [
        {
          label: '产品名称',
          key: 'name$LIKE',
          type: 'string'
        },
        {
          label: '所属品类',
          key: 'classifiedId$LIKE',
          type: 'treeSelect',
          options: {
            data: [
              {
                title: 'Node1',
                value: '0-0',
                key: '0-0',
                children: [
                  {
                    value: '0-0-1',
                    key: '0-0-1',
                    scopedSlots: {
                      // custom title
                      title: 'title'
                    }
                  },
                  {
                    title: 'Child Node2',
                    value: '0-0-2',
                    key: '0-0-2'
                  }
                ]
              },
              {
                title: 'Node2',
                value: '0-1',
                key: '0-1'
              }
            ],
            dropdownStyle: { maxHeight: 500 }
          }
        },
        {
          label: '产品类型',
          key: 'deviceType',
          type: 'list',
          options: {
            data: [
              { id: 'device', name: '直连设备' },
              { id: 'childrenDevice', name: '网关子设备' },
              { id: 'gateway', name: '网关设备' }
            ],
            mode: 'tags'
          }
        },
        {
          label: '消息协议',
          key: 'messageProtocol$IN',
          type: 'list',
          options: {
            data: [
              { id: 'device', name: '直连设备' },
              { id: 'childrenDevice', name: '网关子设备' },
              { id: 'gateway', name: '网关设备' }
            ],
            mode: 'tags'
          }
        }
      ]

    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    },
    GetMetaTitle () {
      if (this.$route.path.includes('/device/product/save')) {
        return this.$route.params.id
      }
      return this.$route.meta.title || ''
    },
    GetDetailStatus () {
      console.log(this.$route.path.includes('/device/product/save'))
      return this.$route.path.includes('/device/product/save')
    },
    GetRouteShow () {
      return this.$route.path === '/device/product'
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get('/list/article', { params: { count: 8 } }).then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
      })
    },
    handleAdd () {
      this.$router.push({
        path: '/device/product/add'
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
<style lang="less" scoped>
  /deep/ .ant-page-header-heading {
    display: flex;
    justify-content: flex-start;
  }
  /deep/ .ant-page-header-heading-title {
    flex-grow: 5;
  }
  /deep/ .ant-page-header-heading-extra {
    flex-grow: 5;
  }
  .page-header-extra{
    .content{
      display: flex !important;
      justify-content: space-between;
    }
  }
</style>
