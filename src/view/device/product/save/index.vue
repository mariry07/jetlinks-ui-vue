<template>
  <Content>
    <Card>
      <p slot="title">基本信息</p>
      <Row>
        <Col span="8">
          <Form
            ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="100"
          >
            <FormItem label="产品ID:" prop="id">
              <Input
                v-model="formValidate.id"
                placeholder="请输入产品ID"
              ></Input>
            </FormItem>
            <FormItem label="产品名称:" prop="name">
              <Input
                v-model="formValidate.name"
                placeholder="请输入产品名称"
              ></Input>
            </FormItem>
            <FormItem label="所属品类:" prop="classaifiedId">
              <Cascader
                :data="classifiedId"
                @on-visible-change="openD"
                not-found-text=""
                placeholder="点击选择品类"
              ></Cascader>
            </FormItem>
            <FormItem label="所属机构:" prop="orgId">
              <selectTree
                v-model="formValidate.orgId"
                clearable
                :treeData="pageLoadData.organizationList"
              ></selectTree>
            </FormItem>
            <FormItem label="消息协议:" prop="messageProtocol">
              <Select
                v-model="formValidate.messageProtocol"
                placeholder="请选择消息协议"
                @on-change="protocol_change"
              >
                <Option
                  v-for="item in pageLoadData.protocolList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
            <FormItem label="传输协议:" prop="transportProtocol">
              <Select
                v-model="formValidate.transportProtocol"
                placeholder="请选择传输协议"
                @on-change="protocol_change"
              >
                <Option
                  v-for="item in pageLoadData.protocolTransports"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
            <FormItem label="设备类型:" prop="deviceType">
              <RadioGroup v-model="formValidate.deviceType">
                <Radio label="device">直连设备</Radio>
                <Radio label="childrenDevice">网关子设备</Radio>
                <Radio label="gateway">网关设备</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="描述:" prop="desc">
              <Input
                v-model="formValidate.desc"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 255 }"
                placeholder="Enter something..."
              ></Input>
            </FormItem>
          </Form>
        </Col>
        <Col span="6">
          <div style="margin-left: 3em">
            <h3>产品图标</h3>
            <div class="demo-avatar">
              <Avatar :src="photoUrl || productImg" shape="square" size="200">{{
                productImg
              }}</Avatar>
              <br />
              <Upload
                action="/jetlinks/file/static"
                :format="['jpg', 'jpeg', 'png']"
                :max-size="2048"
              >
                <Button style="margin-top: 10px" type="primary" size="large"
                  >更换图标</Button
                >
              </Upload>
            </div>
          </div>
        </Col>
      </Row>
      <Divider />
      <Button>返回</Button>
      <Button type="primary" style="margin-left: 20px">保存</Button>
    </Card>

    <div>
      <Drawer
        width="800"
        title="选择品类"
        :closable="false"
        v-model="classDrawer"
      >
        <Row>
          <Col span="11">
            <Select v-model="queryForm.categoryLIst" style="width: 300px">
              <Option value="all">全部领域</Option>
              <Option
                v-for="item in pageLoadData.categories"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </Col>
          <Col span="11">
            <Input
              search
              enter-button
              placeholder="请输入品类名称或者所属场景"
            />
          </Col>
        </Row>
        <Row>
         <!-- <Table :data="pageLoadData.categories" :columns="categoryTableColumns"></Table>
          <div style="margin: 10px; overflow: hidden">
            <div style="float: right">
               <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
          </div> -->
        </Row>
      </Drawer>
    </div>
  </Content>
</template>
<script>
import {
  getProtocol,
  getSupports,
  getOrganization,
  getCategory,
} from "@/api/device/product/data";
import selectTree from "@/components/selectTree/selectTree";
export default {
  components: {
    selectTree,
  },
  data() {
    return {
      queryForm: {
        queryVal1: "",
        queryVal2: [],
        categoryLIst: "all",
        categoryQuery: "",
      },

      //页面加载数据
      pageLoadData: {
        //消息协议
        protocolList: [],
        //传输协议
        protocolTransports: [],
        //所属机构
        organizationList: [],
        //所有品类
        categories: [
        ],
      },
      /**
       * 品类表格
       *
       */
      categoryTableColumns: [
        {
          title: "品类名称",
          key: "name",
        },
        {
          title: "所属场景",
          key: "parentId",
        },
        {
          title: "操作",
          key: "id",
        },
      ],
      productImg: "",
      classifiedId: [],
      classDrawer: false,
      photoUrl: "../images/product.png",
      formValidate: {
        id: "",
        name: "",
        classifiedId: "",
        messageProtocol: "",
        transportProtocol: "",
        interest: [],
        deviceType: "",
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
        messageProtocol: [
          {
            required: true,
            message: "请选择消息协议",
            trigger: "change",
          },
        ],
        transportProtocol: [
          {
            required: true,
            message: "请选择传输协议",
            trigger: "change",
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
  methods: {
    changeProductImg() {},

    openD(e) {
      if (e) {
        this.classDrawer = true;
      }
    },
    protocol_change(id) {
      //查询传输协议
      getSupports(id).then((res) => {
        if (res.status == 200) {
          this.pageLoadData.protocolTransports = res.data.result;
        }
      });
    },
    jsonToTree(jsonData) {
      //temp为临时对象，将json数据按照id值排序.
      var result = [],
        temp = {},
        len = jsonData.length;
      for (var i = 0; i < len; i++) {
        // 以id作为索引存储元素，可以无需遍历直接快速定位元素
        temp[jsonData[i]["value"]] = jsonData[i];
      }
      for (var j = 0; j < len; j++) {
        var list = jsonData[j];
        // 临时变量里面的当前元素的父元素，即parentId的值，与找对应id值
        var sonlist = temp[list["parentId"]];
        // 如果存在父元素，即如果有parentId属性
        if (sonlist && list["parentId"] !== "0") {
          // 如果父元素没有children键
          if (!sonlist["children"]) {
            // 设上父元素的children键
            sonlist["children"] = [];
          }
          // 给父元素加上当前元素作为子元素
          sonlist["children"].push(list);
        }
        // 不存在父元素，意味着当前元素是一级元素
        else {
          result.push(list);
        }
      }
      return result;
    },

    changePage() {
      // this.tableData1 = this.pageLoadData.categories;
    },
  },
  computed: {},
  created() {
    var self = this;
    //获取消息协议
    getProtocol().then((res) => {
      self.pageLoadData.protocolList = res.data.result;
    });
    //获取机构并转化成tree数据
    getOrganization().then((res) => {
      self.pageLoadData.organizationList = res.data.result;
      console.log(self.pageLoadData.organizationList);
      let resData = res.data.result;
      let treeDataList = resData.map((item) => {
        let treeData = {
          title: item.name,
          value: item.id,
          parentId: item.parentId,
        };
        return treeData;
      });

      this.pageLoadData.organizationList = this.jsonToTree(treeDataList);
      //  console.log("treeDataList==" + JSON.stringify(this.jsonToTree(treeDataList)));
    });

    //获取所有品类
    getCategory().then((res) => {
      let categoryList = res.data.result;
      
      for (let index in categoryList) {
        let change = [];
        if(typeof(categoryList[index].children) != "undefined"){
          change.push(categoryList[index])
        }
         console.log("categories==" + JSON.stringify(categoryList));
      }
     
    });
  },
};
</script>
<style lang="less">
</style>
