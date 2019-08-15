import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const consoleLogin = {
    path: '/console-login',
    name: 'consoleLogin',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/console-login/login.vue')
};
export const accountManageRoute = {
    path: '/account-manager/updatePassword',
    name: 'updatePassword',
    meta: {
        title: '修改密码'
    },
    component: () => import('@/views/account-manager/modifyPassWord.vue')
};
export const corpAccountManageRoute = {
    path: '/account-manager/corpAccount',
    name: 'corpAccount',
    meta: {
        title: '创建企业'
    },
    component: () => import('@/views/account-manager/corpAccountCreate.vue')
};
export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const consolePage = {
    path: '/consolePage',
    meta: {
        title: '系统管理'
    },
    name: 'consolePage',
    component: () => import('@/views/console/index.vue')
};

// export const preview = {
//     path: '/preview',
//     name: 'preview',
//     component: () => import('@/views/form/article-publish/preview.vue')
// };

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'report', title:'报表设计', name: 'report', component: () => import('@/views/form-report/designTab.vue') },
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/newhome/home.vue') },
        { path: 'ownspace', title: '企业信息', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'personal-information', title: '个人信息', name: 'personal_information', component: () => import('@/views/personal-information/personal-information.vue') },
        //{ path: 'showReport', title: {i18n: 'home'}, name: 'showReport', component: () => import('@/views/listview/components/tablelist-report.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') },
        //{ path: 'report', title: {i18n: 'report'}, name: 'report', component: () => import('@/views/form-report/designReport.vue') },
        // { path: 'app-index', title: '新建应用', name: 'appPage_index', component: () => import('@/views/app/app-apply.vue') },
        { path: 'app-index/:moduleId/:moduleName', title: '应用管理', name: 'appManager_index', component: () => import('@/views/app/app-manage.vue') },
        { path: 'interface-manage', title: '接口管理', name: 'interface-manage', component: () => import('@/views/interface-manage/index.vue')},
        { path: 'log-manage', title: '日志管理', name: 'log-manage', component: () => import('@/views/log-manage/index.vue')},
        { path: 'elastic-job', title: '定时任务', name: 'elastic-job', component: () => import('@/views/elastic-job/index.vue')},
        { path: 'file-setup', title: '档案设置', name: 'file-setup', component: () => import('@/views/file-setup/index.vue')},
        { path: 'home-setting', title: '首页配置', name: 'home-setting', component: () => import('@/views/home-setting/index.vue')},
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export var appRouter = [
    {
        path: '/flow-page',
        icon: 'ios-box',
        title: '',
        name: 'workflowManager',
        component: Main,
        children: [
            { path: 'workflow-design', title: '应用管理',icon: 'pinpoint', name: 'workflow-design', component: () => import('@/views/home/home-flowDesign.vue') },
            { path: 'design-page', title: '流程设计',icon: 'pinpoint', name: 'design-page', component: () => import('@/views/form/pages/workflowDesigner/pic.vue') },
            { path: 'design-sheet', title: '表单设计',icon: 'pinpoint', name: 'design-sheet', component: () => import('@/views/form/sheetDesigner/page/design.vue') },
            { path: 'finish-job', title: '我的已办',icon: 'person', name: 'finish-job', component: () => import('@/views/flow-manager/finish-work.vue') },
            { path: 'self-submit', title: '我的提交',icon: 'person', name: 'self-submit', component: () => import('@/views/flow-manager/self-submit.vue') },
            { path: 'my-work', title: '我的工作',icon: 'person', name: 'my-work', component: () => import('@/views/flow-manager/my-work.vue') },
            { path: 'document-lib', title: '文件库',icon: 'document', name: 'document-lib', component: () => import('@/views/document-lib/document.vue') },
            { path: 'add-form', title: '表单新增',icon: 'android-send', name: 'add-form', component: () => import('@/views/form/pages/sheetDesignerIndex/pages.vue') },
            // { path: 'start-application/:moduleId', title: '应用新增',icon: 'android-send', name: 'start-application', component: () => import('@/views/allFlow/allflow.vue') },
            { path: 'application/:moduleId', title: '',icon: 'android-send', name: 'start-application', component: () => import('@/views/listview/pages/tablelist.vue') },
            { path: 'design-list', title: '列表设计',icon:'pinpoint', name: 'design-list', component: ()=> import('@/views/listview/pages/listviewdesign.vue')}

        ]
    },
    {
        path: '/organ',
        icon: 'ios-box',
        title: '',
        name: 'organManager',
        component: Main,
        children: [
            {path: 'temp', title: '组织管理',icon: 'pinpoint', name: 'people-manage', component: () => import('@/views/organ/organUserManage.vue')},
            {path: 'people-manage', title: '组织管理',icon: 'pinpoint', name: 'people-manage', component: () => import('@/views/organ/user-manage.vue')}
        ]
    },
    {
        path: '/role',
        icon: 'ios-box',
        title: '权限管理',
        name: 'roleManager',
        component: Main,
        children: [
            {path: 'roleIndex', title: '权限管理',icon:'pinpoint',name:'roleIndex',component:() => import('@/views/role/App.vue')}
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    consoleLogin,
    consolePage,
    loginRouter,
    accountManageRoute,
    corpAccountManageRoute,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
