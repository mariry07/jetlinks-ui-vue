<template>
  <Drawer title="编辑协议" v-model="drawerShow" width="60%" :mask-closable="false" :styles="styles">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <Row :gutter="20" style="margin-top: 10px;">
        <i-col :md="12" :lg="12">
          <FormItem label="协议ID" prop="id">
            <Input v-model="formValidate.id" placeholder=""></Input>
          </FormItem>
        </i-col>
        <i-col :md="12" :lg="12">
          <FormItem label="协议名称" prop="name">
            <Input v-model="formValidate.name" placeholder=""></Input>
          </FormItem>
        </i-col>
        <i-col :md="12" :lg="12">
          <FormItem label="类型" prop="type">
            <Select v-model="formValidate.type" style="width:200px">
              <Option v-for="item in providers" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </i-col>
      </Row>
      <Row :gutter="20" style="margin-top: 10px;" v-if="String(formValidate.type).indexOf('jar')>-1">
        <i-col :md="12" :lg="12">
          <FormItem label="类名" prop="configuration.provider">
            <Input v-model="formValidate.configuration.provider" placeholder=""></Input>
          </FormItem>
        </i-col>
        <i-col :md="12" :lg="12">
          <FormItem label="文件地址" prop="configuration.location">
            <Row :gutter="20">
              <i-col :md="12" :lg="12">
                <Input v-model="formValidate.configuration.location" placeholder=""></Input>
              </i-col>
              <i-col :md="4" :lg="4">
                <Upload action="/api/jetlinks/file/static" :headers="{'X-Access-Token':token}" :on-success='onSuccess'
                  accept=".jar" :show-upload-list="false">
                  <Button type="primary" icon="ios-cloud-upload-outline">上传Jar包</Button>
                </Upload>
              </i-col>
            </Row>
          </FormItem>
        </i-col>
      </Row>
      <Row :gutter="20" style="margin-top: 10px;" v-if="String(formValidate.type).indexOf('script')>-1">
        <i-col :md="12" :lg="12">
          <FormItem label="协议标识" prop="configuration.protocol">
            <Input v-model="formValidate.configuration.protocol" placeholder=""></Input>
          </FormItem>
        </i-col>
        <i-col :md="12" :lg="12">
          <FormItem label="连接协议" prop="configuration.transport">
            <Select v-model="formValidate.configuration.transport" multiple style="width:260px">
              <Option v-for="item in transports" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </i-col>
      </Row>
      <FormItem label="脚本" v-if="String(formValidate.type).indexOf('script')>-1">
        <codemirror ref="mycode" v-model="formValidate.configuration.script" @changes="changes" :options="cmOptions"
          class="code"></codemirror>
      </FormItem>
      <Row :gutter="20" style="margin-top: 10px;">
        <i-col :md="24" :lg="24">
          <FormItem label="描述" prop="description">
            <Input v-model="formValidate.description" placeholder=""></Input>
          </FormItem>
        </i-col>
      </Row>
    </Form>

    <Collapse @on-change="convertFun" :accordion="accordion" v-model="collapse">
      <Panel name="调试">
        调试
        <p slot="content">
          <Tabs v-model="tabsValue">
            <TabPane label="模拟输入" name="name1">
              <Row :gutter="20" style="margin-top: 10px;">
                <i-col :md="4" :lg="4" style="margin-top: 15px">
                  <RadioGroup v-model="request.type">
                    <Radio label="encode">编码</Radio>
                    <Radio label="decode">解码</Radio>
                  </RadioGroup>
                </i-col>
                <i-col :md="20" :lg="20">
                  <Form ref="request" :model="request" :label-width="80">
                    <Row :gutter="20" style="margin-top: 10px;">
                      <i-col :md="12" :lg="12">
                        <FormItem label="连接类型">
                          <Select v-model="request.transport" style="width:200px">
                            <Option v-for="item in transports1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                        </FormItem>
                      </i-col>
                      <i-col :md="12" :lg="12">
                        <FormItem label="消息类型">
                          <Select v-model="request.payloadType" style="width:200px">
                            <Option v-for="item in payloadTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                        </FormItem>
                      </i-col>
                    </Row>
                  </Form>
                </i-col>
              </Row>
              <codemirror ref="mycode" v-model="request.payload" @changes="changes" :options="cmOptions" class="code"></codemirror>
              <Button style="margin-top: 10px;" @click="implementFun" type="primary">执行</Button>
            </TabPane>
            <TabPane label="运行结果" name="name2"> <Input v-model="value6" type="textarea" :rows="20" /></TabPane>
          </Tabs>
        </p>
      </Panel>
    </Collapse>
    <div class="demo-drawer-footer">
      <Button style="margin-right: 8px" @click="drawerShow = false">取消</Button>
      <Button type="primary" @click="saveFun">确定</Button>
    </div>
  </Drawer>
</template>

<script>
  import {
    codemirror
  } from "vue-codemirror";
  import "codemirror/theme/dracula.css"; // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
  require("codemirror/mode/javascript/javascript"); // 这里引入的模式的js，根据设置的mode引入，一定要引入！！
  require("codemirror/mode/python/python.js");
  require("codemirror/addon/fold/foldcode.js");
  require("codemirror/addon/fold/foldgutter.js");
  require("codemirror/addon/fold/brace-fold.js");
  require("codemirror/addon/fold/xml-fold.js");
  require("codemirror/addon/fold/indent-fold.js");
  require("codemirror/addon/fold/markdown-fold.js");
  require("codemirror/addon/fold/comment-fold.js");
  require("codemirror/addon/display/fullscreen.js");
  require("codemirror/mode/shell/shell");
  import {
    addProtocol,
    convertClick,
    encodeClick,
    decodeClick
  } from '@/api/network/protocol/data'
  import {
    deepClone
  } from '@/libs/tools'
  import {
    getToken
  } from '@/libs/util'
  export default {
    data() {
      return {
        token: getToken(),
        accordion:true,
        value6: '',
        collapse: [],
        tabsValue: 'name1',
        formValidate: {},
        request: {
          payload: '{\n' +
            '  "messageType":"READ_PROPERTY",\n' +
            '  "properties":[\n' +
            '    \n' +
            '  ]\n' +
            '}',
          payloadType: '',
          transport: '',
          type: 'encode'
        },
        providers: [{
          value: 'script',
          label: 'script'
        }, {
          value: 'jar',
          label: 'jar'
        }],
        transports: [{
          value: 'MQTT',
          label: 'MQTT'
        }, {
          value: 'UDP',
          label: 'UDP'
        }, {
          value: 'CoAP',
          label: 'CoAP'
        }, {
          value: 'HTTP',
          label: 'HTTP'
        }, {
          value: 'TCP',
          label: 'TCP'
        }, {
          value: 'HTTPS',
          label: 'HTTPS'
        }],
        payloadTypes: [{
          value: 'JSON',
          label: 'JSON'
        }, {
          value: 'STRING',
          label: 'STRING'
        }, {
          value: 'HEX',
          label: 'HEX'
        }, {
          value: 'BINARY',
          label: 'BINARY'
        }],
        transports1:[],
        curCode: '//解码,收到设备上行消息时\n' +
          'codec.decoder(function (context) {\n' +
          '  var message = context.getMessage();\n' +
          '  return {\n' +
          '    messageType:"REPORT_PROPERTY"//消息类型\n' +
          '  };\n' +
          '});\n' +
          '\n' +
          '//编码读取设备属性消息\n' +
          'codec.encoder("READ_PROPERTY",function(context){\n' +
          '  var message = context.getMessage();\n' +
          '  var properties = message.properties;\n' +
          '})',
        cmOptions: {
          value: "",
          mode: {
            name: "text/javascript"
          },
          theme: "dracula",
          lineNumbers: true,
          readOnly: false, // 只读
        },
        ruleValidate: {
          id: [{
            required: true,
            message: '请输入协议ID',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入协议名称',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请选择类型',
            trigger: 'blur'
          }],
          'configuration.provider': [{
            required: true,
            trigger: 'blur',
            message: '请输入类名',
          }],
          'configuration.location': [{
            required: true,
            trigger: 'blur',
            message: '请输入文件地址',
          }],
          'configuration.protocol': [{
            required: true,
            trigger: 'blur',
            message: '请输入协议标识',
          }],
          'configuration.transport': [{
            required: true,
            trigger: 'blur',
            message: '请现在连接协议',
          }],

        },
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        drawerShow: false,

      }
    },
    components: {
      codemirror
    },
    watch:{
      'formValidate.type'(val){
        if(val==='script'){
          return this.formValidate.configuration.script = '//解码,收到设备上行消息时\n' +
             'codec.decoder(function (context) {\n' +
             '  var message = context.getMessage();\n' +
             '  return {\n' +
             '    messageType:"REPORT_PROPERTY"//消息类型\n' +
             '  };\n' +
             '});\n' +
             '\n' +
             '//编码读取设备属性消息\n' +
             'codec.encoder("READ_PROPERTY",function(context){\n' +
             '  var message = context.getMessage();\n' +
             '  var properties = message.properties;\n' +
             '})'
        }
      }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
      async saveFun() {
        this.$refs.formValidate.validate(async (valid) => {
          if (valid) {
          let res = await addProtocol(this.publicFun(this.formValidate))
          if (res.data.status === 200) {
            this.drawerShow = false
            this.$parent.getData()
          }
          }
        })

      },
      publicFun(data) {
        let formCopy = deepClone(data)
        if (formCopy.type === 'script') {
          formCopy.configuration.lang = 'js'
          formCopy.configuration.transport = formCopy.configuration.transport.toString()
        }
        return formCopy
      },
      convertFun(e) {
        this.$refs.formValidate.validate(async (valid) => {
          if (valid) {
            this.collapse = ['调试']
              let res = await convertClick(this.publicFun(this.formValidate))
              if (res.data.status === 200) {
                console.log(res.data)
                  this.transports1 = res.data.result.transports
                  this.transports1.forEach(item=>{
                    item.value = item.id
                    item.label = item.name
                  })
              } else {
                this.$Message.error(res.data.message);
              }
          } else {
            this.collapse = ['测试']
          }
        })
      },
      async implementFun() {
        switch (this.request.type) {
          case 'encode':
            let res = await encodeClick({
              entity: this.publicFun(this.formValidate),
              request: this.request
            })
            if (res.data.status === 200) {
              this.tabsValue = 'name2'
              this.value6 = res.data.result
            } else {
              this.$Message.error(res.data.message);
            }
            break;
          case 'decode':
            let res1 = await decodeClick({
              entity: this.publicFun(this.formValidate),
              request: this.request
            })
            if (res1.data.status === 200) {
              this.tabsValue = 'name2'
              this.value6 = res1.data.result
            } else {
              this.$Message.error(res1.data.message);
            }
            break;
          default:
            break;
        }
      },
      onSuccess(row) {
        this.formValidate.configuration.location = row.result
      },
      changes() {}
    },
  }
</script>

<style lang="less">
  .demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }

  .cm-s-material.CodeMirror {
    height: 400px !important;
  }
</style>
