// import Main from '@/views/Main.vue';

export default [
  /**
   * 应用列表页
   *
   * @param: {String} moduleId 模块id
   * @param: {String} appId 应用id （可选，会切换到指定应用）
   */
  {
    path: '/app-list',
    title: '应用列表',
    name: 'app-list',
    component: () => import('@/rebuild/views/applist/index.vue')
  },
  {
    path: '/home',
    name: 'home_index',
    title: { i18n: 'home' },
    component: () => import('@/rebuild/views/home/index.vue')
  },
  {
    path: '/demo1',
    component: () => import('@/rebuild/views/layout/demo1.vue')
  },
  {
    path: '/demo2',
    component: () => import('@/rebuild/views/layout/demo2.vue')
  },
  {
    path: '/document-lib',
    title: '文件库',
    icon: 'document',
    name: 'document-lib',
    component: () => import('@/rebuild/views/documentLib/index.vue')
  },
  {
    path: '/workflow-design',
    title: '应用管理',
    icon: 'document',
    name: 'workflow-design',
    component: () => import('@/rebuild/views/workflow/workflow-design')
  },
  {
    path: '/my-work',
    icon: 'person',
    title: '我的工作',
    name: 'my-work',
    component: () => import('@/rebuild/views/myWork/index.vue')
  },
  {
    path: '/admin',
    title: '管理后台',
    name: 'admin',
    component: () => import('@/rebuild/views/admin/index.vue'),
    redirect: '/admin/ebj',
    children: [
      {
        name: 'ebj',
        path: 'ebj',
        component: () => import('@/rebuild/views/admin/elastic-job/index.vue'),
        children: [
          {
            name: 'ej-center',
            path: 'ej-center',
            component: () =>
              import('@/rebuild/views/admin/elastic-job/ej-center/index.vue'),
            meta: { menu: 'ebj' }
          },
          {
            name: 'ej-source',
            path: 'ej-source',
            component: () =>
              import('@/rebuild/views/admin/elastic-job/ej-source/index.vue'),
            meta: { menu: 'ebj' }
          },
          {
            name: 'ej-homework',
            path: 'ej-homework',
            component: () =>
              import('@/rebuild/views/admin/elastic-job/ej-homework/index.vue'),
            meta: { menu: 'ebj' }
          },
          {
            name: 'ej-server',
            path: 'ej-server',
            component: () =>
              import('@/rebuild/views/admin/elastic-job/ej-server/index.vue'),
            meta: { menu: 'ebj' }
          }
        ]
      },
      {
        name: 'template',
        path: 'template',
        component: () =>
          import('@/rebuild/views/admin/template/template-list.vue')
      },
      {
        name: 'order',
        path: 'order',
        component: () => import('@/rebuild/views/admin/order/index.vue')
      },
      {
        name: 'orderdetl',
        path: 'order/:id',
        component: () => import('@/rebuild/views/admin/order/detl.vue'),
        meta: { menu: 'order' }
      },
      {
        name: 'template-form',
        path: 'template-form',
        component: () =>
          import('@/rebuild/views/admin/template/template-form.vue')
      }
    ]
  },
  {
    path: '/monitor',
    title: '监控中心',
    name: 'monitor',
    component: () => import('@/rebuild/views/monitor/index.vue')
  }
]
