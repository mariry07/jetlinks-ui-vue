<template>
  <page-header-wrapper>
    <div class="filterCardList">
      <a-card :bordered="false">
        <a-form layout="inline">
          <standard-form-row title="组件类型" :block="true" :style="{ paddingBottom: '11px' }">
            <a-form-item>
              <tag-select :expandable="true">
                <a-checkable-tag
                  v-for="(item, index) in types"
                  :key="item.id + index"
                >
                  {{ item.name }}
                </a-checkable-tag>
              </tag-select>
            </a-form-item>
          </standard-form-row>
          <standard-form-row :title="'其它选项'" :grid="true" :last="true">
            <a-row :gutter="16">
              <a-col :lg="8" :md="10" :sm="10" :xs="24">
                <a-form-item :xs="{ span: 24 }" :sm="{ span: 16 }" label="配置名称">
                  <a-input />
                </a-form-item>
              </a-col>
            </a-row>
          </standard-form-row>
        </a-form>
      </a-card>
      <br/>
      <a-list
        :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
        :loading="loading"
        :data-source="data"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <template v-if="item.type === 'add'">
            <a-button
              type="dashed"
              class="newButton"
              @click="() => {
                DrawerVisible = true
                DrawerData = {}
              }"
            >
              <a-icon
                type="plus"
              />
              新增组件
            </a-button>
          </template>
          <template v-else>
            <a-card
              hoverable
              :bodyStyle="{ paddingBottom: '20px' }"
            >
              <template slot="actions">
                <a-tooltip key="edit" title="编辑" @click="editComponent(item)">
                  <a-icon type="edit"/>
                </a-tooltip>
                <a-tooltip key="bug" title="调试" @click="DebugVisiable">
                  <a-icon type="bug" />
                </a-tooltip>
                <a-tooltip key="delete" title="删除" >
                  <a-popconfirm
                    placement="topRight"
                    title="确定删除此组件吗？"
                    @confirm="deleteComponent(item)"
                  >
                    <a-icon type="close" />
                  </a-popconfirm>
                </a-tooltip>
              </template>
              <a-card-meta
                :style="{fontWeight:'600px'}"
              >
                <template slot="avatar">
                  <a-avatar size="small" :src="item.avatar" />
                </template>
                <template slot="title">
                  <com-hide :title="item.name" :styles="{width: '95%',fontWeight:'600px'}" />
                </template>
              </a-card-meta>
              <div class="cardItemContent">
                <div class="cardInfo">
                  <div :style="{ width: '50%', textAlign: 'center'}">
                    <p>组件类型</p>
                    <p :style="{fontWeight:600}">{{ item.type.name }}</p>
                  </div>
                  <div :style="{ width: '50%', textAlign: 'center'}">
                    <p>启动状态</p>
                    <p style="{ color: 'red' }">
                      <a-popconfirm
                        :title="`确认${item.state.value ? item.state.value === 'disabled' ? '启动' : '停止':''}`"
                      >
                        <span>
                          <a-switch
                            size="small"
                          />
                        </span>
                      </a-popconfirm>
                    </p>
                  </div>
                </div>
              </div>
            </a-card>
          </template>
        </a-list-item>
      </a-list>
    </div>
    <save-drawer
      :data="DrawerData"
      :visible="DrawerVisible"
      :types="types"
      :width="600"
      @submitData="submitData"
      @onClose="() => {
        DrawerVisible = false
        DrawerData = {}
      }"
    />
    <save-debug
      :data="DebugData"
      :visible="DebugVisible"
      :type="debugClienType"
      @closeModal="() => {
        DebugVisible = false
        DebugData = {}
      }"
    >
    </save-debug>
  </page-header-wrapper>
</template>

<script>
  import apis from '@/api'
  import StandardFormRow from '@/components/StandardFormRow'
  import TagSelect from '@/components/TagSelect'
  import SaveDrawer from './save'
  import ComHide from '@/components/Hide'
  import SaveDebug from './save/debug'

  export default {
    name: 'NetworkType',
    components: {
      StandardFormRow,
      TagSelect,
      SaveDrawer,
      ComHide,
      SaveDebug
    },
    data () {
      return {
        loading: false,
        formItems: [
          {
            label: '协议名称',
            key: 'name$LIKE',
            type: 'string'
          }
        ],
        data: [],
        types: [],
        DrawerVisible: false,
        DrawerData: {},
        DebugVisible: false,
        DebugData: {},
        debugClienType: 'MQTT_CLIENT'
      }
    },
    mounted () {
      this.GetData()
    },
    methods: {
      GetData () {
        this.getTypes()
        this.getLists()
      },
      getTypes () {
        apis.networkType.getComponentTypes()
          .then(res => {
            if (res.status === 200) {
              this.types = res.result
            }
          })
      },
      getLists () {
        apis.networkType.getComponentLists({
          paging: false,
          sorts: {
            field: 'id',
            order: 'desc'
          }
        })
          .then(res => {
            if (res.status === 200) {
              this.data = [ { type: 'add' }, ...res.result ]
              this.loading = false
            }
          })
      },
      editComponent (data) {
        this.DrawerVisible = true
        this.DrawerData = data
      },
      deleteComponent (data) {
        apis.networkType.deleteCertificateList(data.id)
          .then(res => {
            if (res.status === 200) {
              this.$message.success('删除成功')
              this.GetData()
            }
          }).catch(err => this.$message.error(err))
      },
      submitData (data) {
        this.DrawerVisible = false
        this.DrawerData = {}
        // 提交数据XXX
        apis.networkType.editCertificateList(data)
          .then(res => {
            if (res.status === 200) {
              this.$message.success('更新成功')
              this.GetData()
            }
          }).catch(err => this.$message.error(err))
      },
      DebugVisiable (data) {
        this.DebugVisible = true
        this.DebugData = { age: 1 }
      }
    }
  }
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
