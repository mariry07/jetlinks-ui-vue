import Main from '@/components/main'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('../view/login/login.vue')
  }, {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        hideInMenu: true,
        title: '首页',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('../view/single-page/home')
    }]
  }, {
    path: '/system',
    name: 'system',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '系统设置'
    },
    children: [{
        path: 'user',
        name: 'user',
        meta: {
          icon: '_qq',
          title: '用户管理'
        },
        component: () => import('@/view/system/user')
      },
      {
        path: 'permission',
        name: 'permission',
        meta: {
          icon: '_qq',
          title: '权限管理'
        },
        component: () => import('@/view/system/permission')
      }, {
        path: 'open-api',
        name: 'open_api',
        meta: {
          icon: '_qq',
          title: '第三方平台'
        },
        component: () => import('@/view/system/open-api')
      }, {
        path: 'org',
        name: 'org',
        meta: {
          icon: '_qq',
          title: '机构管理'
        },
        component: () => import('@/view/system/org')
      }, {
        path: 'role',
        name: 'role',
        meta: {
          icon: '_qq',
          title: '角色管理'
        },
        component: () => import('@/view/system/role')
      }, {
        path: 'config',
        name: 'config',
        meta: {
          icon: '_qq',
          title: '系统配置'
        },
        component: () => import('@/view/system/config')
      }, {
        path: 'tenant',
        name: 'tenant',
        meta: {
          icon: '_qq',
          title: '租户管理'
        },
        component: () => import('@/view/system/tenant')
      }
    ]
  }, {
    path: '/device',
    name: 'device',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '设备管理'
    },
    children: [{
      path: 'product',
      name: 'product',
      meta: {
        icon: '_qq',
        title: '产品'
      },
      component: () => import('@/view/device/product')
    }, {
      path: 'instance',
      name: 'instance',
      meta: {
        icon: '_qq',
        title: '设备'
      },
      component: () => import('@/view/device/instance')
    }, {
      path: 'tree',
      name: 'tree',
      meta: {
        icon: '_qq',
        title: '分组'
      },
      component: () => import('@/view/device/tree')
    }, {
      path: 'gateway',
      name: 'gateway',
      meta: {
        icon: '_qq',
        title: '网关'
      },
      component: () => import('@/view/device/gateway')
    }, {
      path: 'location',
      name: 'location',
      meta: {
        icon: '_qq',
        title: '地理位置'
      },
      component: () => import('@/view/device/location')
    }, {
      path: 'firmware',
      name: 'firmware',
      meta: {
        icon: '_qq',
        title: '固件升级'
      },
      component: () => import('@/view/device/firmware')
    }, {
      path: 'alarm',
      name: 'alarm',
      meta: {
        icon: '_qq',
        title: '设备告警'
      },
      component: () => import('@/view/device/alarm')
    }]
  }, {
    path: '/network',
    name: 'network',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '设备接入'
    },
    children: [{
      path: 'certificate',
      name: 'certificate',
      meta: {
        icon: '_qq',
        title: '证书管理'
      },
      component: () => import('@/view/network/certificate')
    }, {
      path: 'protocol',
      name: 'protocol',
      meta: {
        icon: '_qq',
        title: '协议管理'
      },
      component: () => import('@/view/network/protocol')
    }, {
      path: 'type',
      name: 'type',
      meta: {
        icon: '_qq',
        title: '网络组件'
      },
      component: () => import('@/view/network/type')
    }, {
      path: 'netgateway',
      name: 'netgateway',
      meta: {
        icon: '_qq',
        title: '设备网关'
      },
      component: () => import('@/view/network/gateway')
    }]
  }, {
    path: '/notice',
    name: 'notice',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '通知管理'
    },
    children: [{
      path: 'noticeconfig',
      name: 'noticeconfig',
      meta: {
        icon: '_qq',
        title: '通知配置'
      },
      component: () => import('@/view/notice/noticeconfig')
    }, {
      path: 'template',
      name: 'template',
      meta: {
        icon: '_qq',
        title: '通知模版'
      },
      component: () => import('@/view/notice/template')
    }]
  }, {
    path: '/rule-engine',
    name: 'rule_engine',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '规则引擎'
    },
    children: [{
      path: 'ruleinstance',
      name: 'ruleinstance',
      meta: {
        icon: '_qq',
        title: '规则实例'
      },
      component: () => import('@/view/rule-engine/ruleinstance')
    }, {
      path: 'sqlRule',
      name: 'sqlRule',
      meta: {
        icon: '_qq',
        title: '数据转发'
      },
      component: () => import('@/view/rule-engine/sqlRule')
    }]
  }, {
    path: '/data-screen',
    name: 'data_screen',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '大屏数据'
    },
    children: [{
      path: 'category',
      name: 'category',
      meta: {
        icon: '_qq',
        title: '分类管理'
      },
      component: () => import('@/view/data-screen/category')
    }, {
      path: 'screen',
      name: 'screen',
      meta: {
        icon: '_qq',
        title: '大屏管理'
      },
      component: () => import('@/view/data-screen/screen')
    }]
  }, {
    path: '/logger',
    name: 'logger',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '日志管理'
    },
    children: [{
      path: 'access',
      name: 'access',
      meta: {
        icon: '_qq',
        title: '访问日志'
      },
      component: () => import('@/view/logger/access')
    },{
      path: 'system',
      name: 'systemLog',
      meta: {
        icon: '_qq',
        title: '系统日志'
      },
      component: () => import('@/view/logger/system')
    }]
  },
  {
    path: '/device',
    name: 'device',
    component: Main,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
      path: 'product/padd',
      name: 'padd',
      meta: {
        icon: 'md-flower',
        title: '新建产品',
        notCache: true,
      },
      component: () => import('@/view/device/product/save')
    }, 
    {
      path: 'instance/dinfo',
      name: 'dinfo',
      meta: {
        icon: 'md-flower',
        title: '设备详情',
        notCache: true,
      },
      component: () => import('@/view/device/product/save')
    }, 
  ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }

]
