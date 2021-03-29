<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="tableList">
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
          >
          </a-table>
        </div>
      </div>
    </a-card>
    <save-modal
      :showData="ModalData"
      :types="providerList"
      :width="760"
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
  import SaveModal from './save'

  export default {
    name: 'NetworkGateway',
    components: {
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
          dataIndex: 'provider',
          customRender: text => {
            const temp = this.providerList.find((item) => item.id === text)
            return temp ? temp.name : text
          }
        },
        {
          title: '网络组件',
          dataIndex: 'networkId',
          customRender: text => {
            const temp = this.netWorkComLists.find((item) => item.id === text)
            return temp ? temp.type?.name : text
          }
        },
        {
          title: '状态',
          dataIndex: 'state',
          customRender: text => text?.text
        },
        {
          title: '操作',
          width: '250px',
          align: 'center',
          dataIndex: 'actions',
          customRender: (text, record) => (
            <div>
              <a onClick={() => this.edit(record)}>
                编辑
              </a>
              <a-divider type="vertical" />
              {record.state && record.state.value === 'disabled' && (
                <span>
                  <a>
                    启动
                  </a>
                  <a-divider type="vertical" />
                  <a-popconfirm title="确认删除？" onConfirm={() => this.delete(record)}>
                    <a>删除</a>
                  </a-popconfirm>
                </span>
              )}
              {record.state && record.state.value === 'enabled' && (
                <span>
                  <a>
                    暂停
                  </a>
                  <a-divider type="vertical" />
                  <a>
                    停止
                  </a>
                </span>
              )}
              {record.state && record.state.value === 'paused' && (
                <a>
                  恢复
                </a>
              )}
            </div>
          )
        }
      ]
      return {
        loading: true,
        columns,
        data: [],
        providerList: [],
        netWorkComLists: [],
        ModalVisible: false,
        ModalData: {}
      }
    },
    mounted () {
      this.GetData()
    },
    methods: {
      GetData () {
        this.getGateWayList()
        this.getProviders()
        this.gateWayNetCom()
      },
      getGateWayList () {
        apis.networkGateway.getGateWayList()
          .then(res => {
            if (res.status === 200) {
              this.data = res.result.data
              this.loading = false
            }
          })
      },
      getProviders () {
        apis.networkGateway.getProviders()
          .then(res => {
            if (res.status === 200) {
              this.providerList = res.result
            }
          })
      },
      gateWayNetCom () {
        apis.networkGateway.gateWayNetCom()
          .then(res => {
            if (res.status === 200) {
              this.netWorkComLists = res.result
            }
          })
      },
      edit (data) {
        this.ModalVisible = true
        this.ModalData = data
      },
      delete (data) {
        apis.networkGateway.deleteGateWayList(data.id)
          .then(res => {
            if (res.status === 200) {
              this.getGateWayList()
            }
          }).catch(err => this.$message.error(err))
      },
      submitData (data) {
        this.ModalVisible = false
        // 提交数据XXX
        apis.networkGateway.editGateWayList(data)
          .then(res => {
            if (res.status === 200) {
              this.$message.success('更新成功')
              this.getGateWayList()
            }
          })
      }
    }
  }
</script>

<style lang="less" scoped>
@import '~@/utils/table.less';
</style>
