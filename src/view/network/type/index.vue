<template>
  <div>
    <Card>
      <div class="search-con search-con-top">
        <Form  :label-width="80">
          <FormItem label="组件类型:">
            <Tag checkable color="primary">全部</Tag>
            <Tag checkable color="primary">TCP服务</Tag>
            <Tag checkable color="primary">MQTT客户端</Tag>
            <Tag checkable color="primary">MQTT服务</Tag>
            <Tag checkable color="primary">TCP客户端</Tag>
          </FormItem>
          <FormItem label="其他选项:">
           <Form  :label-width="80">
             <FormItem label="配置名称:">
              <Input v-model="terms"  style="width: 150px" />
             </FormItem>
             </Form>
          </FormItem>
        </Form>
      </div>
    </Card>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" :xxl="6" style="padding: 0 15px;">
        <Card style="margin-top: 15px;height: 170px;">
          <div class="iview-item">
            <Button icon="md-add" @click="addFun">新增组件</Button>
          </div>
        </Card>
      </i-col>
      <i-col v-for="(infor, i) in inforCardData" :key="`infor-${i}`" :xs="24" :sm="24" :md="12" :lg="8" :xl="8" :xxl="6"
        style="padding: 0 15px;">
        <Card style="margin-top: 15px;height: 170px;">
          <div class="iview-item" style="height: 110px;">
            <div class="iview-net">
              <div class="iview-net-1">
                <span class="iview-avayar"></span>
              </div>
              <div class="iview-net-2">
                <p>{{infor.name}}</p>
                <div style="display: flex;justify-content: start;">
                  <p style="width: 50%;">组件类型</p>
                  <p>启动状态</p>
                </div>
                <div style="display: flex;justify-content: start;">
                  <p style="width: 50%;
    word-break: break-word;overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;">{{infor.type.name}}</p>
                  <i-switch size="small" true-value="enabled" false-value="disabled" v-model="infor.state.value"
                    @on-change="switchChange(infor)" />
                </div>
              </div>
            </div>
          </div>
          <ul class="iview--card-actions">
            <li>
              <Tooltip content="编辑" placement="top">
                <i @click='editConfig(infor)' class="ivu-icon ivu-icon-ios-create-outline" style="font-size: 20px;"></i>
              </Tooltip>
            </li>
            <li>
              <Tooltip content="调试" placement="top">
                <i class="ivu-icon ivu-icon-ios-bug" style="font-size: 20px;"></i>
              </Tooltip>
            </li>
            <li>
              <Tooltip content="删除" placement="top">
                <i class="ivu-icon ivu-icon-md-close" @click='deleConfig(infor)' style="font-size: 20px;"></i>
              </Tooltip>
            </li>
          </ul>
        </Card>
      </i-col>
    </Row>
    <Modal ref="modalID" />
  </div>
</template>

<script>
  import {
    getTableData,
    setStatus,
    deleConfig,
    getSupports,
    noPaging
  } from '@/api/network/type/data'
  import {
    deepClone
  } from '@/libs/tools'
  import Modal from './components/add'
  const form = {
    type: "",
    configuration: {
      ssl: true,
      parserType: "",
      parserConfiguration: {
        size: ''
      }
    }
  }
  export default {
    name: 'tables_page',
    components: {
      Modal
    },
    data() {
      return {
        inforCardData: [],
        searchKey: '',
        terms:''
      }
    },
    methods: {
      handleSearch() {},
      addFun(row) {
        this.$refs.modalID.formCustom = { ...form
        }
        this.$refs.modalID.drawerShow = true
        this.configFun()
      },
      deleFun(row) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗？</p>',
          onOk: () => {
            deleCertificate(row.id).then(res => {
              this.getData()
            })

          },
          onCancel: () => {

          }
        });
      },
      async switchChange(row) {
        let copyRow = deepClone(row)

        if (copyRow.state.value === 'disabled') {
          this.publicFun('确定关闭', copyRow, '_shutdown')
        } else {
          this.publicFun('确定开启', copyRow, '_start')
        }

      },
      publicFun(type, data, url) {
        console.log(data.state.value, url)
        this.$Modal.confirm({
          title: '提示',
          content: `<p>${type}？</p>`,
          onOk: async () => {
            let res = await setStatus(data.id, url)
            if (res.data.status === 200) {
              this.getData()
            } else {
              this.getData()
            }

          },
          onCancel: () => {
            this.getData()
          }
        });
      },
      async deleConfig(row) {
        let res = await deleConfig(row.id)
        if (res.data.status === 200) {
          this.getData()
        } else {

        }
      },
      async configFun() {
        let res = await getSupports()
        let resPaging = await noPaging()
        this.$refs.modalID.comTypes = [...res.data.result].map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
        this.$refs.modalID.certs = [...resPaging.data.result].map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
      },
      editConfig(row) {
        let copyRow = deepClone(row)
        this.$refs.modalID.drawerShow = true
        this.$refs.modalID.formCustom = copyRow
        this.$refs.modalID.formCustom.type = copyRow.type.value
        this.configFun()
      },
      getData() {
        getTableData().then(res => {
          this.inforCardData = res.data.result
        })
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style lang="less" scoped="scoped">
  .iview-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 24px;
  }

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

  .ivu-card-body {
    height: 100%;
  }

  .iview--card-actions {
    margin: 0;
    padding: 0;
    list-style: none;
    background: #fafafa;
    border-top: 1px solid #e8e8e8;
    zoom: 1;

    li {
      width: 33.33%;
      float: left;
      margin: 10px 0;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
    }

    li:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }
  }

  .iview-avayar {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: 'tnum';
    position: relative;
    display: inline-block;
    overflow: hidden;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
    background: #ccc;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
  }

  .iview-net {
    position: relative;
    width: 100%;
    height: 100%;

    .iview-net-1 {
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: 100%;
    }

    .iview-net-2 {
      position: absolute;
      top: 0;
      left: 50px;
      width: calc(100% - 50px);
    }
  }

  /deep/.ivu-tag:hover {
    cursor: pointer
  }
</style>
