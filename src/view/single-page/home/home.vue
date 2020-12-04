<template>
  <div>
    <Row :gutter="20">
      <i-col :md="12" :xs="24" :sm="12" :lg="12" :xl="6" style="margin-bottom: 20px;">
        <Card shadow>
          <div>
            <div class="online">
              <span class="online-title">当前设备</span>
              <span class="online-icon">
                <Icon type="md-refresh" />
              </span>
            </div>
            <div class="online-value">
              9999
            </div>
            <div style="height: 85px;">

            </div>
            <div class="antd-pro-pages-analysis-components-charts-chart-card-index-footer">
              <div style="white-space: nowrap; overflow: hidden;">
                <div style="margin-right: 40px; float: left;"><span><span>设备总数</span></span><span>2</span></div>
                <div><span><span>未激活设备</span></span><span>0</span></div>
              </div>
            </div>
          </div>
        </Card>
      </i-col>
      <i-col :md="12" :xs="24" :sm="12" :lg="12" :xl="6" style="margin-bottom: 20px;">
        <Card shadow>
          <div>
            <div class="online">
              <span class="online-title">今日设备消息量</span>
              <span class="online-icon">
                <Icon type="md-refresh" />
              </span>
            </div>
            <div class="online-value">
              9999
            </div>
            <div style="height: 85px;">

            </div>
            <div class="antd-pro-pages-analysis-components-charts-chart-card-index-footer">
              <div style="white-space: nowrap; overflow: hidden;">
                <div style="margin-right: 40px; float: left;"><span><span>当月设备消息量</span></span><span>2</span></div>
              </div>
            </div>
          </div>
        </Card>
      </i-col>
      <i-col :md="12" :xs="24" :sm="12" :lg="12" :xl="6" style="margin-bottom: 20px;">
        <Card shadow>
          <div>
            <div class="online">
              <span class="online-title">CPU使用率</span>
            </div>
            <div>
              <chart-pie style="height: 150px;" :value="pieData" text="用户访问来源"></chart-pie>
            </div>
          </div>
        </Card>
      </i-col>
      <i-col :md="12" :xs="24" :sm="12" :lg="12" :xl="6" style="margin-bottom: 20px;">
        <Card shadow>
          <div>
            <div class="online">
              <span class="online-title">JVM内存</span>
            </div>
            <div>
              <chart-pie style="height: 150px;" :value="pieData" text="用户访问来源"></chart-pie>
            </div>
          </div>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="20">
       <Card shadow>
       <Tabs value="name1">
              <TabPane label="设备消息" name="name1">
                  <example style="height: 310px;" />
              </TabPane>
              <RadioGroup v-model="data" type="button" slot="extra">
                      <Radio label="一小时"></Radio>
                      <Radio label="一天"></Radio>
                      <Radio label="7天"></Radio>
                      <Radio label="30天"></Radio>
                  </RadioGroup>
                  <DatePicker type="datetime" slot="extra" placeholder="" style="width: 200px;margin-left: 10px;"></DatePicker>
          </Tabs>
  </Card>
    </Row>
  </div>
</template>

<script>
  import Example from './example.vue'
  import {
    ChartPie,
    ChartBar
  } from '_c/charts'
  export default {
    name: 'home',
    components: {
      ChartPie,
      ChartBar,
      Example
    },
    data() {
      return {
        data:'一小时',
        inforCardData: [{
            title: '新增用户',
            icon: 'md-person-add',
            count: 803,
            color: '#2d8cf0'
          },
          {
            title: '累计点击',
            icon: 'md-locate',
            count: 232,
            color: '#19be6b'
          },
          {
            title: '新增问答',
            icon: 'md-help-circle',
            count: 142,
            color: '#ff9900'
          },
          {
            title: '分享统计',
            icon: 'md-share',
            count: 657,
            color: '#ed3f14'
          },
          {
            title: '新增互动',
            icon: 'md-chatbubbles',
            count: 12,
            color: '#E46CBB'
          },
          {
            title: '新增页面',
            icon: 'md-map',
            count: 14,
            color: '#9A66E4'
          }
        ],
        pieData: [{
            value: 335,
            name: '直接访问'
          },
          {
            value: 310,
            name: '邮件营销'
          },
          {
            value: 234,
            name: '联盟广告'
          },
          {
            value: 135,
            name: '视频广告'
          },
          {
            value: 1548,
            name: '搜索引擎'
          }
        ],
        barData: {
          Mon: 13253,
          Tue: 34235,
          Wed: 26321,
          Thu: 12340,
          Fri: 24643,
          Sat: 1322,
          Sun: 1324
        }
      }
    },
    mounted() {
      //
    }
  }
</script>

<style lang="less" scoped>
  .online {
    position: relative;
  }

  .online-icon {
    position: absolute;
    right: 0;
  }

  .online-title {
    height: 22px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
  }

  .online-value {
    height: 38px;
    margin-top: 4px;
    margin-bottom: 0;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.85);
    font-size: 30px;
    line-height: 38px;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
</style>
