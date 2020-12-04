<template>
  <Content>
    <Row>
      <Col span="24">
        <Card :bordered="false">
          <Row>
            <Col span="7">
              <Select v-model="model1" style="width: 300px; margin-top: 10px">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </Col>
            <Col span="4">
              <span>全部设备</span>
              <p style="font-size: 26px">2</p>
            </Col>
            <Col span="4">
              <Badge color="green" text="在线" />
              <p style="font-size: 26px">1</p>
            </Col>
            <Col span="4">
              <Badge color="red" text="离线" />
              <p style="font-size: 26px">1</p>
            </Col>
            <Col span="4">
              <Badge color="blue" text="未激活" />
              <p style="font-size: 26px">1</p>
            </Col>
            <Col span="1">
              <Button
                style="border-color: #fff; font-size: 30px"
                icon="md-refresh"
                :loading="loading"
                shape="circle"
                @click="toLoading"
              >
                <!-- <Icon size="30" type="md-refresh" /> -->
              </Button>
              <!-- <Button shape="circle" size="large" icon="ios-refresh" :loading="loading" @click="toLoading">
			<span v-if="!loading"></span>
			<span v-else></span>
		</Button> -->
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Card>
          <Row>
            <Col span="8">
              <Select v-model="model1" style="width: 100px">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
              <Input
                v-model="model1"
                placeholder="请输入"
                style="width: 300px"
              />
            </Col>
            <Col offset="12" span="4">
              <Button type="primary">查询</Button>
              <Button style="margin-left: 10px">重置</Button>
            </Col>
          </Row>
          <div style="margin-top: 20px">
            <Button icon="md-add" type="primary" @click="modal1 = true"
              >添加设备</Button
            >
            <Dropdown style="margin-left: 20px">
              <Button type="primary">
                其他操作
                <Icon type="ios-arrow-down"></Icon>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem>批量导出设备</DropdownItem>
                <DropdownItem>批量导入设备</DropdownItem>
                <DropdownItem disabled>激活全部设备</DropdownItem>
                <DropdownItem disabled>同步设备状态</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <Table
            style="margin-top: 15px"
            :data="tableData1"
            :columns="tableColumns1"
          >
            <template slot-scope="{ row, index }" slot="action">
              <Button
                type="primary"
                size="small"
                style="margin-right: 5px"
                @click="show(index)"
                >查看</Button
              >
              <Button
                type="info"
                size="small"
                style="margin-right: 5px"
                @click="edit(index)"
                >编辑</Button
              >
              <Button type="error" size="small" @click="remove(index)"
                >注销</Button
              >
            </template>
          </Table>
          <div style="margin: 10px; overflow: hidden">
            <div style="float: right">
              <Page
                show-total
                show-sizer
                :total=page.total
                :current=page.index
                @on-change="changePage"
              ></Page>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    <Modal v-model="modal1" :title="modalTitle" @on-ok="ok" @on-cancel="cancel">
      <Form :label-width="80">
        <FormItem label="设备ID:" prop="name">
          <Input placeholder="请输入设备ID"></Input>
        </FormItem>
        <FormItem label="设备名称" prop="name">
          <Input placeholder="请输入设备名称"></Input>
        </FormItem>
        <FormItem label="产品" prop="city">
          <Select placeholder="请选择产品">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="所属机构:" prop="orgId">
          <selectTree
            v-model="addModal.orgId"
            clearable
            :treeData="addModal.organizationList"
          ></selectTree>
        </FormItem>
        <FormItem label="说明">
          <Input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入至少5个字符"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
  </Content>
</template>
<script>
import {
  getProtocol,
  getSupports,
  getOrganization,
  getCategory,
} from "@/api/device/product/data";

import {
    getDate
  } from '@/libs/tools';
import{list} from "@/api/device/instance/data";

import selectTree from "@/components/selectTree/selectTree";
export default {
  components: {
    selectTree,
  },
  data() {
    return {
		page: {
          index: 1,
          size: 10,
          total: 0
        },
      addModal: {
        organizationList: [],
        orgId: "",
      },
      modal1: false,
      modalTitle: "新建设备",
      loading: false,
      cityList: [
        {
          value: "New York",
          label: "New York",
        },
        {
          value: "London",
          label: "London",
        },
        {
          value: "Sydney",
          label: "Sydney",
        },
      ],
      model1: "",
      tableData1: [],
      tableColumns1: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "ID",
          key: "id",
        },
        {
          title: "设备名称",
          key: "name",
        },
        {
          title: "产品名称",
          key: "productName",
        },
        {
          title: "注册时间",
          key: "registryTime",
          render: (h, params) => {
            return h(
              "span",
              getDate(params.row.registryTime,'year')
            );
          },
        },
        {
          title: "状态",
          key: "state",
          render: (h, params) => {
            const row = params.row;
            const color = row.state.value === "offline"? "error":"success";
            const text = row.state.text;
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color,
                },
              },
              text
            );
          },
        },
        {
          title: "描述",
          key: "describe",
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    toLoading() {
      this.loading = true;
    },
    
    changePage() {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
    //   this.tableData1 = this.mockTableData1();
    },
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：111`,
      });
    },
    remove(index) {
      this.tableData1.splice(index, 1);
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    handleReset(name) {
      this.$refs[name].resetFields();
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
  },
  computed: {},
  created() {
	let self = this;
	
	//获取表格数据
	list(this.page.size).then((res)=>{
		this.tableData1 = res.data.result.data;
		this.page.total = res.data.result.total;
	});


    //获取机构并转化成tree数据
    getOrganization().then((res) => {
      self.addModal.organizationList = res.data.result;
      console.log(self.addModal.organizationList);
      let resData = res.data.result;
      let treeDataList = resData.map((item) => {
        let treeData = {
          title: item.name,
          value: item.id,
          parentId: item.parentId,
        };
        return treeData;
      });

      this.addModal.organizationList = this.jsonToTree(treeDataList);
      //  console.log("treeDataList==" + JSON.stringify(this.jsonToTree(treeDataList)));
    });
  },
};
</script>
<style lang="less">
</style>
