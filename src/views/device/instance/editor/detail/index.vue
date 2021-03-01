<template>
  <div>
    <a-card :style="{marginBottom: '20px'}">
      <a-descriptions style="{marginBottom: 20}" bordered :column="3" size="small">
        <template slot="title">
          <span>设备信息
            <a-button icon="edit" :style="{marginLeft: '20px'}" type="link">编辑</a-button>
          </span>
        </template>
        <a-descriptions-item label="产品名称" span="1">
          2
        </a-descriptions-item>
        <a-descriptions-item label="设备类型" span="1">
          1
        </a-descriptions-item>
        <a-descriptions-item label="所属机构" span="1">
          1
        </a-descriptions-item>
        <a-descriptions-item label="连接协议" span="1">
          1
        </a-descriptions-item>
        <a-descriptions-item label="消息协议" span="1">
          1
        </a-descriptions-item>
        <a-descriptions-item label="IP地址" span="1">
          1
        </a-descriptions-item>
        <a-descriptions-item label="创建时间" span="1">
          1
        </a-descriptions-item>
        <a-descriptions-item label="注册时间" span="1">
          1
        </a-descriptions-item>
        <a-descriptions-item label="最后上线时间" span="1">
          1
        </a-descriptions-item>
        <a-descriptions-item label="说明" span="3">
          1
        </a-descriptions-item>
        <!-- 循环的tags -->
        <a-descriptions-item label="云对云接入" :span="3">
          <a-tag color="blue" >
            <a-tooltip :title="23414">
              <span>{{ 1234 }}</span>
            </a-tooltip>
            <a-popconfirm title="`是否解绑234接入`">
              <span :style="{display: 'inline-block', marginLeft: '10px'}">{{ 33 }}</span>
            </a-popconfirm>
          </a-tag>
        </a-descriptions-item>
      </a-descriptions>
      <div :style="{width: '100%'}">
        <a-descriptions>
          <template slot="title">
            <span>配置
              <a-button icon="edit" :style="{marginLeft: '20px'}" type="link">编辑</a-button>
              <a-popconfirm title="确认重新应用该配置？">
                <a-button icon="check" type="link">应用配置</a-button>
                <a-tooltip title="修改配置后需重新应用后才能生效。">
                  <a-icon type="question-circle-o"/>
                </a-tooltip>
              </a-popconfirm>
              <a-popconfirm title="确认恢复默认配置？">
                <a-button icon="undo" type="link">恢复默认</a-button>
                <a-tooltip title="`该设备单独编辑过${props.configuration.name}，点击此将恢复成默认的配置信息，请谨慎操作。`">
                  <a-icon type="question-circle-o"/>
                </a-tooltip>
              </a-popconfirm>
            </span>
          </template>
        </a-descriptions>
      </div>
      <div :style="{marginBottom: '20px'}" >
        <h3>{{ 'MQTT认证配置' }}</h3>
        <a-descriptions bordered :column="2" title="">
          <a-descriptions-item :span="1">
            <template slot="label">
              <div>
                <span :style="{marginRight: '10px'}">{{ 'username' }}</span>
                <a-tooltip :title="'用户名'">
                  <a-icon type="question-circle-o"/>
                </a-tooltip>
              </div>
            </template>
          </a-descriptions-item>
          <a-descriptions-item :span="1">
            <template slot="label">
              <div>
                <span :style="{marginRight: '10px'}">{{ 'password' }}</span>
                <a-tooltip :title="'密码'">
                  <a-icon type="question-circle-o"/>
                </a-tooltip>
              </div>
            </template>
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: 'InsEditorDetail'
  }
</script>

<style lang="scss" scoped>

</style>
