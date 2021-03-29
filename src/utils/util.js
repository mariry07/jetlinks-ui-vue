import proxy from '../../config/proxy'
import moment from 'moment'

export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/**
 * @description 数据为空状态的判断处理
 * @param {*} data 数据源
 * @param {*} key 属性值
 */
export function ExixtKeys (data, key, resultType = []) {
  if (data !== null && typeof headers === 'object' && Object.keys(data).length) {
    return data[key]
  }
  return resultType
}

/**
 * @description 数据为空状态的判断处理
 * @param {*} data 数据源
 * @param {*} key 属性值
 */
export const wrapAPI = (url) => {
  // eslint-disable-next-line no-undef
  const { VUE_APP_ENV } = process.env
  if (VUE_APP_ENV === 'dev') {
    return url.replace('/jetlinks/', proxy.dev_aly['/jetlinks'].target)
  }
  return url
}

/**
 * @description 生成随机数
 * @param {*} length 长度
 */
export const randomString = (length) => {
  const tempLength = length || 32
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < tempLength; i += 1) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
/**
 * @description 下载配置文件
 * @param {*} record 数据
 * @param {*} fileName 名字
 */
export const downloadObject = (record, fileName) => {
  // 创建隐藏的可下载链接
  const eleLink = document.createElement('a')
  eleLink.download = `${fileName}-${record.name || moment(new Date()).format('YYYY/MM/DD HH:mm:ss')}.json`
  eleLink.style.display = 'none'
  // 字符内容转变成blob地址
  const blob = new Blob([JSON.stringify(record)])
  eleLink.href = URL.createObjectURL(blob)
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}
