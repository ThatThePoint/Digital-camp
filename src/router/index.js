import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);
import DocumentManagement from '../components/page/DailyOffice/DocumentManagement.vue'
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                
                {
                    // 公文管理
                    path: '/documentmanagement',
                    component: resolve => require(['../components/page/DailyOffice/DocumentManagement.vue'], resolve),
                    meta: { title: '公文管理', permission: true }
                },
                {
                    // 公文管理
                    path: '/adddocument',
                    component: resolve => require(['../components/page/DailyOffice/AddDocument.vue'], resolve),
                    meta: { title: '增加公文', permission: true }
                },
                {
                    // 值班执勤
                    path: '/onduty',
                    component: resolve => require(['../components/page/OnDuty/OnDuty.vue'], resolve),
                    meta: { title: '值班执勤', permission: true }
                },
                {
                    // 人员动态
                    path: '/staffdynamics',
                    component: resolve => require(['../components/page/StaffDynamics/StaffDynamics.vue'], resolve),
                    meta: { title: '人员动态', permission: true }
                },
                
                {
                    // 警报传递
                    path: '/alert',
                    component: resolve => require(['../components/page/Alert/Alert.vue'], resolve),
                    meta: { title: '警报传递', permission: true }
                },
                
                {
                    // 车辆信息
                    path: '/cardetail',
                    component: resolve => require(['../components/page/CarManager/CarDetail.vue'], resolve),
                    meta: { title: '车辆信息', permission: true }
                },
                
                {
                    // 车库管理
                    path: '/garage',
                    component: resolve => require(['../components/page/CarManager/Garage.vue'], resolve),
                    meta: { title: '车库管理', permission: true }
                },
                {
                    // 司机管理
                    path: '/drivermanager',
                    component: resolve => require(['../components/page/CarManager/DriverManager.vue'], resolve),
                    meta: { title: '司机管理', permission: true }
                },
                {
                    // 车辆保养
                    path: '/carcare',
                    component: resolve => require(['../components/page/CarManager/CarCare.vue'], resolve),
                    meta: { title: '车辆保养', permission: true }
                },
                {
                    // 车辆进出
                    path: '/carinout',
                    component: resolve => require(['../components/page/CarManager/CarInout.vue'], resolve),
                    meta: { title: '车辆进出', permission: true }
                },
                {
                    // 增加车辆
                    path: '/addcar',
                    component: resolve => require(['../components/page/CarManager/AddCar.vue'], resolve),
                    meta: { title: '增加车辆', permission: true }
                },
                
                {
                    // 新增保养
                    path: '/addcare',
                    component: resolve => require(['../components/page/CarManager/AddCare.vue'], resolve),
                    meta: { title: '新增保养', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
