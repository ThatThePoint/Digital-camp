<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-lx-home",
          index: "dashboard",
          title: "系统首页"
        },
        // {
        //     icon: 'el-icon-lx-cascades',
        //     index: 'table',
        //     title: '基础表格'
        // },
        // {
        //     icon: 'el-icon-lx-copy',
        //     index: 'tabs',
        //     title: 'tab选项卡'
        // },
        // {
        //   icon: "el-icon-lx-calendar",
        //   index: "3",
        //   title: "表单相关",
        //   subs: [
        //     {
        //       index: "form",
        //       title: "基本表单"
        //     },
        //     {
        //       index: "3-2",
        //       title: "三级菜单",
        //       subs: [
        //         {
        //           index: "editor",
        //           title: "富文本编辑器"
        //         },
        //         {
        //           index: "markdown",
        //           title: "markdown编辑器"
        //         }
        //       ]
        //     },
        //     {
        //       index: "upload",
        //       title: "文件上传"
        //     }
        //   ]
        // },
        // {
        //     icon: 'el-icon-lx-emoji',
        //     index: 'icon',
        //     title: '自定义图标'
        // },
        // {
        //     icon: 'el-icon-lx-favor',
        //     index: 'charts',
        //     title: 'schart图表'
        // },
        // {
        //     icon: 'el-icon-rank',
        //     index: '6',
        //     title: '拖拽组件',
        //     subs: [
        //         {
        //             index: 'drag',
        //             title: '拖拽列表',
        //         },
        //         {
        //             index: 'dialog',
        //             title: '拖拽弹框',
        //         }
        //     ]
        // },
        // {
        //     icon: 'el-icon-lx-warn',
        //     index: '7',
        //     title: '错误处理',
        //     subs: [
        //         {
        //             index: 'permission',
        //             title: '权限测试'
        //         },
        //         {
        //             index: '404',
        //             title: '404页面'
        //         }
        //     ]
        // },
        {
          icon: "el-icon-lx-cascades",
          index: "documentmanagement",
          title: "日常办公",
          subs: [
            {
              index: "documentManagement",
              title: "公文管理"
            },
            {
              index: "onduty",
              title: "值班执勤"
            },
            {
              index: "StaffDynamics",
              title: "人员动态"
            },
            {
              index: "33",
              title: "*电子日志管理"
            },
            {
              index: "44",
              title: "*同步点名"
            },
            {
              index: "55",
              title: "*查铺查哨"
            },
            {
              index: "66",
              title: "*电子公告"
            },
            {
              index: "alert",
              title: "警报传递"
            },
            {
              index: "rules",
              title: "规章制度"
            }
          ]
        },
        {
          icon: "el-icon-lx-copy",
          index: "cars",
          title: "车辆管理",
          subs: [
            {
              index: "cardetail",
              title: "车辆信息管理"
            },
            {
              index: "garage",
              title: "车库管理"
            },
            {
              index: "drivermanager",
              title: "司机管理"
            },
            {
              index: "cardispatch",
              title: "车辆派遣"
            },
            {
              index: "carcare",
              title: "车辆维修保养"
            },
            {
              index: "carinout",
              title: "车辆进出记录"
            },
            {
              index: "usecar",
              title: "用车统计"
            }
          ]
        },
        {
          icon: "el-icon-rank",
          index: "leavemanage",
          title: "请假审批管理"
        },
        {
          icon: "el-icon-lx-copy",
          index: "data",
          title: "数据中心",
          subs: [
            {
              index: "DeptManage",
              title: "部门管理"
            },
            {
              index: "UserManage",
              title: "用户管理"
            },
            {
              index: "EquipManage",
              title: "设备管理"
            }
          ]
        },
        {
          icon: "el-icon-lx-copy",
          index: "system",
          title: "系统设置",
          subs: [
            {
              index: "UserRight",
              title: "用户权限"
            },
            {
              index: "DicManage",
              title: "字典管理"
            }
          ]
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
