<template>
  <Content>
    <Card>
      <Form ref="queryForm" :label-width="80" :model="queryForm" inline>
        <Row>
          <Col span="8">
            <FormItem label="产品名称:" prop="name">
              <Input
                type="text"
                v-model="queryForm.name"
                placeholder="产品名称"
              >
              </Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="所属品类:" prop="classifiedId">
              <Input
                type="text"
                v-model="queryForm.classifiedId"
                placeholder="所属品类"
              >
              </Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="产品类型:" prop="deviceType">
              <Input
                type="text"
                v-model="queryForm.deviceType"
                placeholder="产品类型"
              >
              </Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="消息协议:" prop="messageProtocol">
              <Input
                type="text"
                v-model="queryForm.messageProtocol"
                placeholder="消息协议"
              >
              </Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
              <Button type="primary" @click="handleSubmit('queryForm')"
                >查询</Button
              >
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleReset('queryForm')"
                >重置</Button
              >
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col span="2">
          <Button to="/device/product/padd" icon="md-add" type="primary"
            >新建</Button
          >
        </Col>
        <Col span="2" style="margin-left: 20px">
          <Button icon="ios-cloud-upload-outline" type="primary"
            >快速导入</Button
          >
        </Col>
      </Row>
    </Card>

    <!-- 
		产品列表
	 -->

    <Row style="margin-top: 20px">
      <div v-for="index in 5">
        <Col span="6">
          <Card style="width: 380px; margin-top: 20px">
            <div class="demo-avatar">
              <List>
                <ListItem>
                  <ListItemMeta
                    avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                    title="
智能温控111"
                    description="1199596756811550720"
                  />
                </ListItem>
              </List>
            </div>
            <Row>
              <Col span="8">
                <div>
                  <p>设备数量</p>
                  <p style="margin-top: 10px"><span>11</span></p>
                </div>
              </Col>
              <Col span="8">
                <div>
                  <p>发布状态</p>
                  <p style="margin-top: 10px">
                    <Badge
                      :color="0 === 0 ? 'blue' : 'green'"
                      :text="0 === 0 ? '未发布' : '已发布'"
                    />
                  </p>
                </div>
              </Col>
              <Col span="8">
                <div>
                  <p>产品类型</p>
                  <p style="margin-top: 10px">{{ 直连设备 }}</p>
                </div>
              </Col>
            </Row>

            <div class="card-actions">
              <List item-layout="vertical">
                <ListItem>
                  <template slot="action">
                    <li>
                      <Tooltip content="查看" placement="top-start">
                        <Icon type="ios-eye-outline" size="30" />
                      </Tooltip>
                    </li>
                    <li>
                      <Tooltip content="编辑" placement="top-start">
                        <Icon type="ios-create-outline" size="30" />
                      </Tooltip>
                    </li>
                    <li>
                      <Tooltip content="下载" placement="top-start">
                        <Icon type="ios-download-outline" size="30" />
                      </Tooltip>
                    </li>
                    <li>
                      <Dropdown>
                        <a href="javascript:void(0)">
                          <Icon type="ios-more" size="30" />
                        </a>
                        <DropdownMenu slot="list">
                          <DropdownItem>停用</DropdownItem>
                          <DropdownItem>删除</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </li>
                  </template>
                </ListItem>
              </List>
            </div>
          </Card>
        </Col>
      </div>
    </Row>
  </Content>
</template>
<script>
export default {
  data() {
    return {
      queryForm: {},
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        orgId: "",
        desc: "",
      },
      ruleValidate: {
        id: [
          {
            required: true,
            message: "请输入产品ID",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请选择产品名称",
            trigger: "blur",
          },
        ],
        classifiedId: [
          {
            required: true,
            message: "请选择所属品类",
            trigger: "blur",
          },
        ],
        deviceType: [
          {
            required: true,
            message: "请选择设备类型",
            trigger: "change",
          },
        ],
      },
    };
  },

  mounted() {},
  methods: {},
  computed: {},
  created() {},
};
</script>
<style lang="less">
.ivu-tag-dot {
  border: 1px #e8eaec !important;
}
.card-actions {
 height: 30px;
  width: 378px;
//   margin: 0;
  margin-left: -13px;
//   padding: 0;
  list-style: none;
  background: #fafafa;
  border-top: 1px solid #e8e8e8;
  zoom: 1;
}
</style>
