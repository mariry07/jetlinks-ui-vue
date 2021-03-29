<template>
  <page-header-wrapper title="证书管理">
    <a-card :bordered="false">
      <div class="tableList">
        <com-search-form :formItems="formItems" @search="search"></com-search-form>
        <div class="tableListOperator">
          <a-button icon="plus" type="primary" @click="() => { ModalVisible = true }">
            新建
          </a-button>
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
      </div>
    </a-card>
    <save-modal
      :data="ModalData"
      :visible="ModalVisible"
      @submitData="submitData"
      @close="() => {
        ModalVisible = false
        ModalData = {}
      }"
    />
  </page-header-wrapper>
</template>

<script>
  import apis from '@/api'
  import { tableMixin } from '@/core/mixins/tableMixin'
  import ComSearchForm from '@/components/SearchForm'
  import SaveModal from './save'

  export default {
    name: 'NetworkCertificate',
    mixins: [tableMixin],
    components: {
      ComSearchForm,
      SaveModal
    },
    data () {
      const columns = [
        {
          title: '名称',
          dataIndex: 'name'
        },

        {
          title: '类型',
          dataIndex: 'instance'
        },
        {
          title: '描述',
          dataIndex: 'description'
        },
        {
          title: '操作',
          dataIndex: 'actions',
          customRender: (text, record) => (
            <div>
              <a onClick={() => this.edit(record)}>编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确认删除？" onConfirm={() => this.delete(record)}>
                <a>删除</a>
              </a-popconfirm>
            </div>
          )
        }
      ]
      return {
        loading: true,
        formItems: [
          {
            label: '名称',
            key: 'name$LIKE',
            type: 'string'
          },
          {
            label: '类型',
            key: 'instance$IN',
            type: 'list',
            options: {
              mode: 'multiple',
              data: ['PFX', 'JKS', 'PEM']
            }
          }
        ],
        columns,
        data: [],
        ModalVisible: false,
        ModalData: {}
      }
    },
    methods: {
      GetData (terms) {
        apis.networkCertificate.getCertificateLists({
          pageSize: this.pageSize,
          pageIndex: this.current,
          terms: terms || ''
        }).then(res => {
          if (res.status === 200) {
            this.data = res.result.data
            this.loading = false
          }
        })
      },
      edit (data) {
        this.ModalVisible = true
        this.ModalData = data
      },
      delete (data) {
        apis.networkCertificate.deleteCertificateLists(data.id)
          .then(res => {
            if (res.status === 200) {
              this.GetData()
            }
          })
      },
      submitData (data) {
        this.ModalVisible = false
        this.ModalData = {}
        apis.networkCertificate.addCertificateLists(data)
          .then(res => {
            if (res.status === 200) {
              this.GetData()
            }
          })
      }
    }
  }
</script>

<style lang="less" scoped>
@import '~@/utils/table.less';
</style>
