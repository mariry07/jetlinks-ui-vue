<template>
  <div class="cardInfo">
    <div>
      <p >设备数量</p>
      <p>{{ activeUser }}</p>
    </div>
    <div>
      <p>活跃用户</p>
      <p><a-badge status="success" />{{ activeUser }}</p>
    </div>
    <div>
      <p>新增用户</p>
      <p style="font-size: 14px; font-weight: 600;">{{ newUser }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardInfo',
  props: {
    activeUser: {
      type: [String, Number],
      default: 0
    },
    newUser: {
      type: [String, Number],
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/components/index.less";
@import "~@/utils/utils.less";

.cardInfo {

  .clearfix();

  margin-top: 16px;
  & > div {
    position: relative;
    float: left;
    width: 33%;
    text-align: left;
    text-align: center;
    p {
      margin: 0;
      font-size: 14px;
      line-height: 32px;
    }
    p:first-child {
      margin-bottom: 4px;
      color: @text-color-secondary;
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>
