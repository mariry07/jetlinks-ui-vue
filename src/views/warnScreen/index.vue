<template>
  <div class="warning-box">
    <audio
      id="music"
      src="./audio/6601.mp3"
      ref="audio"
      loop="true"
      controls="controls"
      hidden></audio>
    <div class="header">
      <div class="l-part">
        <b>{{ time }}</b>
        <div class="h-info">
          <p class="title">综合养老区</p>
          <div class="data-text">
            <span>{{ nowDate }}</span>
            <span style="margin-left:2rem">{{ nowWeek }}</span>
          </div>
        </div>
      </div>
      <div class="r-part">静</div>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item,index) in warningList" :key="item.alarmId">
          <span>
            {{ item.deviceName }}
            <!-- <br> -->
            {{ item.alarmName }}
            <div style="font-size:2.2rem">{{ item.date }}</div>
          </span>
          <i class="el-icon-delete" @click="delItem(item,index)"></i>
        </li>
        <!-- <span @click="control">
          <span>风险测试东方商厦对sdddsdsddsdsdssd冯绍峰似懂非懂</span>
          <i class="el-icon-delete"></i>
        </span>-->
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { getAccessToken } from '@/utils/authority'
// import {
//   getToken
// } from '@/utils/auth'
export default {
  data () {
    this.audioObj = null
    this.websock = null
    this.intervalObj = null
    return {
      alarmPlay: false,
      // warningList: [{
      //   date: '2021-11-12 22;22:22',
      //   deviceName: '测试第对冯绍峰是分',
      //   alarmName: '设备离线对冯绍峰',
      //   alarmId: 'ddssd'
      // }, {
      //   date: '2021-11-12 22;22:22',
      //   deviceName: '测试第对冯绍峰是分',
      //   alarmName: '设备离线对冯绍峰',
      //   alarmId: 'dds33sd'
      // }],
      warningList: [],
      time: moment().format('HH:mm:ss'),
      nowDate: moment().format('YYYY-MM-DD'),
      nowWeek: this.RetnW()
    }
  },

  watch: {
    warningList: {
      handler (val) {
        if (val.length) {
          this.audioObj.play()
        } else {
          this.audioObj.pause()
        }
      },
      deep: true
    }
    // warningList(val) {
    //   if (val.length) {
    //     this.audioObj.play();// 播放
    //   } else {
    //     this.audioObj.pause();// 暂停
    //   }
    // }
  },
  created () {
    this.initWebSocket()
  },
  mounted () {
    this.audioObj = document.getElementById('music')
    this.intervalObj = setInterval(() => {
      this.time = moment().format('HH:mm:ss')
    }, 1000)
  },
  methods: {
    RetnW () {
      //  JS的数组
      var date = new Date()
      var day = date.getDay()
      var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      var week = weeks[day]
      return week
    },
    delItem (item, index) {
      // this.$put(`/device/alarm/history/${item.alarmId}/_solve`).then()
      this.warningList.splice(index, 1)
    },
    initWebSocket () {
      if (typeof WebSocket === 'undefined') {
        alert('您的浏览器不支持WebSocket')
        return false
      }

      const wsuri = `ws://47.96.137.222:8848/messaging/${getAccessToken()}`
      // const wsuri = `ws://47.96.137.222:8848/messaging/64174ca0381bfdca6eab804faa73a910`
      // alert(wsuri)
      // const wsuri = 'ws://127.0.0.1:11007/targetlist/' + time1
      this.websock = new WebSocket(wsuri)
      this.websock.onopen = this.websocketonopen
      this.websock.onmessage = this.websocketonmessage
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    //  连接成功
    websocketonopen () {
      var json = '{ "type": "sub", "topic": "/rule-engine/device/alarm/1000/*/*", "parameter": {}, "id": "111111122222" }'
      //  可以给后台发送参数
      this.websock.send(json)
      console.log('WebSocket连接成功')
    },
    //  接收后端返回的数据
    websocketonmessage (e) {
      console.info(e)
      const formateData = JSON.parse(e.data)
      if (this.warningList.length >= 3) {
        this.warningList.spliit(this.warningList.length - 1, 1)
        this.warningList.unshift({
          date: this.formatDate(formateData.payload.timestamp),
          alarmName: formateData.payload.alarmName,
          deviceName: formateData.payload.deviceName,
          alarmId: formateData.payload.alarmId

        })
      } else {
        this.warningList.unshift({
          date: this.formatDate(formateData.payload.timestamp),
          alarmName: formateData.payload.alarmName,
          deviceName: formateData.payload.deviceName,
          alarmId: formateData.payload.alarmId
        })
      }
      // let dataJson = JSON.parse(e.data);
      //  仅messageType = 2 或 1 或 4, 才处理
      //  一旦这种事件发生，刷新页面就好
    },
    //  连接建立失败重连
    websocketonerror (e) {
      console.log(`连接失败的信息：`, e)
      this.initWebSocket() // 连接失败后尝试重新连接
    },
    //  关闭连接
    websocketclose (e) {
      console.log('断开连接', e)
    },
    control () {
      this.warningList.push({})
      if (this.audioObj !== null) {
        if (this.audioObj.paused) {
          this.audioObj.play()
        } else {
          this.audioObj.pause()
        }
      }
    }
  },
  destroyed () {
    // this.websock.close() //离开路由之后断开websocket连接
    clearInterval(this.intervalObj)
  }
}
</script>

<style lang="less" scoped>
.warning-box {
  box-sizing: border-box;
  border: 1.4rem solid rgb(63, 60, 60);
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
  .header {
    height: 26%;
    background: blue;
    padding: 2rem 4rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .l-part {
      display: flex;
      align-items: center;
      b {
        font-size: 6rem;
        margin-right: 2rem;
      }
      .title {
        font-size: 3rem;
      }
      .data-text {
        font-size: 2rem;
      }
    }
    .r-part {
      border: 2px solid #ffffff;
      font-size: 4rem;
      width: 6rem;
      height: 6rem;
      border-radius: 3rem;
      text-align: center;
    }
  }
  .content {
    height: 74%;
    padding: 0 4rem;
    ul {
      list-style: none;
      li {
        color: #f36161;
        font-size: 3.5rem;
        font-weight: 600;
        position: relative;
        padding: 1rem 3rem;
        background: #f5c5c5;
        border-radius: 1rem;
        margin-top: 2rem;
        span {
          display: block;
          width: 90%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        i {
          position: absolute;
          right: 1rem;
          top: 1.4rem;
          font-size: 3rem;
        }
      }
    }
  }
}
</style>
