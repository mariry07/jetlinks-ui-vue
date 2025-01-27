import Vue from 'vue'

// base library
import {
  ConfigProvider,
  Layout,
  Input,
  InputNumber,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Icon,
  Badge,
  Popover,
  Dropdown,
  List,
  Avatar,
  Breadcrumb,
  Steps,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Alert,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  Upload,
  Progress,
  Skeleton,
  Popconfirm,
  PageHeader,
  Result,
  Statistic,
  Descriptions,
  message,
  notification,
  // 新增的ui组件
  Cascader,
  TreeSelect,
  AutoComplete,
  Collapse
} from 'ant-design-vue'
import Viser from 'viser-vue'
// 新增的edit功能插件
import VueAceEdit from 'vue-ace-edit'
import parseTime from '@/utils'
// ext library
import VueCropper from 'vue-cropper'
import Dialog from '@/components/Dialog'
import PermissionHelper from '@/utils/helper/permission'
import './directives/action'

Vue.use(ConfigProvider)
Vue.use(Layout)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Badge)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(Steps)
Vue.use(Spin)
Vue.use(Menu)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Alert)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Skeleton)
Vue.use(Popconfirm)
Vue.use(PageHeader)
Vue.use(Result)
Vue.use(Statistic)
Vue.use(Descriptions)
// 注册新增的ui组件
Vue.use(Cascader)
Vue.use(TreeSelect)
Vue.use(AutoComplete)
Vue.use(Collapse)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.formatDate = function (val) {
  //  shijianchuo是整数，否则要parseInt转换
  var time = new Date(val)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  d = d < 10 ? '0' + d : d
  var h = time.getHours()
  h = h < 10 ? '0' + h : h
  var mm = time.getMinutes()
  mm = mm < 10 ? '0' + mm : mm
  var s = time.getSeconds()
  s = s < 10 ? '0' + s : s
  return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
}
Vue.prototype.formatJson = function (filterVal, jsonData) {
  return jsonData.map(v =>
    filterVal.map(j => {
      if (j === 'timestamp') {
        return parseTime(v[j])
      } else {
        return v[j]
      }
    })
  )
}

Vue.use(Viser)
Vue.use(Dialog) // this.$dialog func
Vue.use(PermissionHelper)
Vue.use(VueCropper)
// 新增的edit功能插件
Vue.use(VueAceEdit)

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] NOTICE: Antd use lazy-load.')
