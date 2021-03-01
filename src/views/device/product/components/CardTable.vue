<template>
  <a-card
    :title="title"
    style="width:100%;padding:10px"
  >
    <a-button slot="extra" type="primary" @click="addData">添加</a-button>
    <a-table :columns="attributeColumns" :data-source="showData">
      <template slot="operation">
        <a-button type="link" style="padding: 0;">编辑</a-button>
        <a-divider type="vertical" />
        <a-button type="link" style="padding: 0;">删除</a-button>
      </template>
    </a-table>
    <com-drawer :width="'500px'" :title="title" :visible="showDrawer" @onClose="onCloseDrawer">
      <template v-if="tabKey==='1'">
        <define-attribute :form="form"></define-attribute>
      </template>
      <template v-if="tabKey==='2'">
        <define-function :form="form"></define-function>
      </template>
      <template v-if="tabKey==='3'">
        <define-event ></define-event>
      </template>
      <template v-if="tabKey==='4'">
        <define-tags :form="form"></define-tags>
      </template>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onCloseDrawer">
          关闭
        </a-button>
        <a-button type="primary" >
          保存
        </a-button>
      </div>
    </com-drawer>
  </a-card>
</template>

<script>
  import ComDrawer from '@/components/Drawer'
  import DefineAttribute from '@/pages/device/product/save/definition/attribute.vue'
  import DefineFunction from '@/pages/device/product/save/definition/Functions.vue'
  import DefineEvent from '@/pages/device/product/save/definition/Events.vue'
  import DefineTags from '@/pages/device/product/save/definition/Tags.vue'

  export default {
    name: 'CardTable',
    components: {
      ComDrawer,
      DefineAttribute,
      DefineFunction,
      DefineEvent,
      DefineTags
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      tabKey: {
        type: String,
        default: '1'
      },
      attributeColumns: {
        type: Array,
        default: () => []
      },
      showData: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        showDrawer: false,
        form: this.$form.createForm(this)
      }
    },
    methods: {
      addData () {
        this.showDrawer = true
      },
      onCloseDrawer () {
        this.showDrawer = false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
