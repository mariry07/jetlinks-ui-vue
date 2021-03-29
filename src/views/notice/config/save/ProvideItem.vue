<template>
  <div>
    <a-form-item
      v-for="item in getProperties"
      :key="item.property"
      :label="item.name"

    >
      <template v-if="showType(item.type) === 'isnp'">
        <a-input
          v-decorator="[`configuration.${item.property}`, {
            initialValue: showData[`${item.property}`]
          }]"
        />
      </template>
      <template v-if="showType(item.type) === 'array'">
        <a-card v-if="item.property && item.property === 'properties'">
          <a-row v-for="(ele,inx) in otherConfig" :key="ele.id">
            <a-col :span="6">
              <a-input
                :value="ele.name"
                placeholder="key"
                @change="(e) => {
                  otherConfig[inx].name = e.target.value
                }"
              />
            </a-col>
            <a-col :span="2" :style="{ textAlign: 'center' }">
              <a-icon type="double-right" />
            </a-col>
            <a-col :span="6">
              <a-input
                :value="ele.value"
                placeholder="value"
                @change="(e) => {
                  otherConfig[inx].value = e.target.value
                }"
              />
            </a-col>
            <a-col :span="2" :style="{ textAlign: 'center' }">
              <a-icon type="double-right" />
            </a-col>
            <a-col :span="6">
              <a-input
                :value="ele.description"
                placeholder="说明"
                @change="(e) => {
                  otherConfig[inx].description = e.target.value
                }"
              />
            </a-col>
            <a-col :span="2" :style="{ textAlign: 'center' }">
              <template v-if="inx === 0">
                <a-icon type="plus" @click="addOtherConfig"/>
              </template>
              <template v-else>
                <a-icon type="minus" @click="deleteOtherConfig"/>
              </template>
            </a-col>
          </a-row>
        </a-card>
      </template>
    </a-form-item>
  </div>
</template>

<script>
  /* eslint-disable no-unreachable */
  import { randomString } from '@/utils/util'
  import { cloneDeep } from 'lodash'
  export default {
    name: 'ConfigProvideItem',
    props: {
      metaData: {
        type: Object,
        default: () => {}
      },
      showData: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        otherConfig: [
          {
            id: randomString(8),
            name: '',
            value: '',
            description: ''
          }
        ]
      }
    },
    watch: {
      showData: {
        handler (newVal, oldVal) {
          this.initData(newVal)
        },
        immediate: true
      }
    },
    computed: {
      getProperties () {
        return this.metaData.properties
      },
      showType (type) {
        return function ({ type }) {
          switch (type) {
            case 'int':
            case 'string':
            case 'number':
            case 'password':
              return 'isnp' // 类型首字母简写
              break
            case 'array':
              return 'array' // 类型首字母简写
              break
            default:
              break
          }
        }
      }
    },
    methods: {
      initData (data) {
        if (Object.keys(data).length && data.properties && data.properties.length) {
          this.otherConfig = cloneDeep(data.properties)
        }
      },
      addOtherConfig () {
        const config = {
          id: randomString(8),
          name: '',
          value: '',
          description: ''
        }
        this.otherConfig.push(config)
      },
      deleteOtherConfig () {
        this.otherConfig.pop()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
