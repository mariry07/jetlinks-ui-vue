<template>
  <div>
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="当前在线" :total="6560 | NumberFormat">
          <a-tooltip title="刷新" slot="action">
            <a-icon type="sync" />
          </a-tooltip>
          <div>
            <mini-bar />
          </div>
          <template slot="footer">设备总数 <span>100，123</span>未激活设备 <span>0%</span></template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="今日设备消息量" :total="8846 | NumberFormat">
          <a-tooltip title="刷新" slot="action">
            <a-icon type="sync" />
          </a-tooltip>
          <div>
            <mini-area />
          </div>
          <template slot="footer">当月设备消息量<span> {{ '1234' | NumberFormat }}</span></template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="CPU使用率" :showFooter="false" :contentStyle="{ height: '78px' }">
          <div>
            <mini-dashboard :height="169" :warnLevel="[5, 8, 10]" :showData="10"/>
          </div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="JVM内存" :showFooter="false" :contentStyle="{ height: '78px' }">
          <div>
            <mini-dashboard :height="169" :dashboardMax="4" :warnColor="['#2F9CFF']" :showData="3.3" :dataUnit="'G'"/>
          </div>
        </chart-card>
      </a-col>
    </a-row>
    <a-card :loading="false" :bordered="false" :bodyStyle="{ padding: '0' }">
      <div class="salesCard">
        <a-tabs default-active-key="sales" size="large" :tabBarStyle="{ marginBottom: '24px' }">
          <div slot="tabBarExtraContent" class="salesExtraWrap">
            <div class="salesExtra">
              <a-radio-group defaultValue="1h" >
                <a-radio-button value="1h">
                  1小时
                </a-radio-button>
                <a-radio-button value="1d">
                  1天
                </a-radio-button>
                <a-radio-button value="7d">
                  7天
                </a-radio-button>
                <a-radio-button value="30d">
                  30天
                </a-radio-button>
              </a-radio-group>
            </div>
            <a-datePicker
              showTime
              :defaultValue="GetDate"
              placeholder="结束时间"
              format="YYYY-MM-DD HH:mm:ss" />
          </div>
          <a-tab-pane key="sales" tab="设备消息">
            <a-row>
              <a-col>
                <div class="salesBar">
                  <mini-message />
                </div>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniDashboard,
  MiniMessage
} from '@/components'
import moment from 'moment'
import { baseMixin } from '@/store/app-mixin'

export default {
  name: 'Analysis',
  mixins: [baseMixin],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniDashboard,
    MiniMessage
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    GetDate () {
      return moment(new Date(), 'YYYY-MM-DD HH:mm:ss')
    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
  @media screen and (max-width: 576px) {
    .salesExtraWrap {
      display: none !important;
    }

    .salesCard {
      :global {
        .ant-tabs-content {
          padding-top: 30px;
        }
      }
    }
  }
  .salesCard {
    .salesBar {
      padding: 0 0 32px 32px;
    }
    .salesRank {
      padding: 0 32px 32px 72px;
    }
    /deep/.ant-tabs-bar {
      padding-left: 16px;
      .ant-tabs-nav .ant-tabs-tab {
        padding-top: 16px;
        padding-bottom: 14px;
        line-height: 24px;
      }
    }
    /deep/.ant-tabs-extra-content {
      padding-right: 24px;
      line-height: 55px;
    }
    /deep/.ant-card-head {
      position: relative;
    }
    /deep/.ant-card-head-title {
      align-items: normal;
    }
  }

  .salesExtra {
    display: inline-block;
    margin-right: 24px;
    a {
      margin-left: 24px;
      color: #fff;
      &:hover {
        color: #1890ff;
      }
      &.currentDate {
        color: #1890ff;
      }
    }
  }
</style>
