<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>人员权限</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 角色编辑框 -->
    <div class="messages">
      <el-button type="success" @click="adddialogVisible" class="right">新增角色</el-button>
      <el-dialog
        title="新增角色"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div class="role">
          <span>角色编码：</span>
          <input type="text" class="wenben" v-model="rolenum"/>
        </div>
        <div class="role">
          <span>角色名称：</span>
          <input type="text" class="wenben" v-model="rolename"/>
        </div>
        <div class="role">
          <span style="width:'90px',display:inline-block" class="state">状态：</span>
          <el-switch
            v-model="switchstate"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 角色权限弹框 -->
    <div class="messages">
      <el-dialog
        title="角色权限"
        :visible.sync="roleperim"
        width="30%"
        :before-close="handleClose">
        <div class="rolemenu">
          <span>角色名称：</span>
          <span class="rights">{{rolehandle}}</span>
          <el-button type="primary" size="mini">授权</el-button>
           <el-button type="warning" size="mini">返回</el-button>
        </div>
        
        <el-tree
          :data="treedata"
          show-checkbox
          default-expand-all 
          node-key="id"
          :props="defaultProps">
        </el-tree>

        <span slot="footer" class="dialog-footer">
          <el-button @click="roleperim = false">取 消</el-button>
          <el-button type="primary" @click="roleperim = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 角色人员弹框 -->
    <div class="messages">
      <el-dialog
        title="角色成员"
        :visible.sync="jueserenyuan"
        width="30%"
        :before-close="handleClose">


        <div class="rolemenu">
          <span>角色名称：</span>
          <span class="rights">{{rolemingcheng}}</span>
          <el-button type="primary" size="mini">添加用户</el-button>
          <el-button type="primary" size="mini">移除用户</el-button>
           <el-button type="warning" size="mini">返回</el-button>
        </div>
        
        <el-tree
          :data="treedata"
          show-checkbox
          default-expand-all 
          node-key="id"
          :props="defaultProps">
        </el-tree>



        <span slot="footer" class="dialog-footer">
          <el-button @click="jueserenyuan = false">取 消</el-button>
          <el-button type="primary" @click="jueserenyuan = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>





    <div class="container">
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="code" label="角色编码" width="250">{{}}</el-table-column>
          <el-table-column prop="name" label="角色名称" width="250"></el-table-column>
          <el-table-column prop="status" label="状态" width="250"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="editDialogVisible(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleRole(scope.$index, scope.row)">角色人员</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" @click="handRoleperim(scope.$index, scope.row)">角色权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "documentManagement",
  data() {
    return {
      jueserenyuan: false,//角色人员弹框
      rolemingcheng: "孙老板",//角色人员弹框名字
      rolehandle:"",//角色权限框的角色名称
      roleperim : false,//角色权限弹框
      switchstate:false,//角色状态狂false默认没有
      rolenum:"",//角色编码
      rolename:"",//角色名称
      dialogVisible: false,//新增角色弹框
      outerVisible: false,
      value1: "",
      value2: "",
      input2: "",
      typeValue: "",
      deptValue: "",
      treedata: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
      deptOptions: [
        {
          value: "1",
          label: "连队1"
        },
        {
          value: "2",
          label: "连队2"
        },
        {
          value: "3",
          label: "连队3"
        },
        {
          value: "4",
          label: "连队4"
        }
      ],
      value: "",
      tableData: [
        {
          code: "admin",
          name: "管理员",
          status: "启用"
        },
        {
          code: "generalUser",
          name: "普通用户",
          status: "启用"
        },
        {
          code: "seniorUser",
          name: "高级用户",
          status: "启用"
        }
      ],

      formInline: {
        user: "",
        region: ""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleRole(index,row){
      this.jueserenyuan = true
    },
    //角色权限弹框
    handRoleperim(index,row){
      this.rolehandle = row.name
      this.roleperim = true
    },
    //新增角色
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //新增打开角色框
    adddialogVisible(){
      this.rolenum = ''
      this.rolename = ''
      this.switchstate = false
      this.dialogVisible = true
    },
    //编辑打开角色框
    editDialogVisible(index, row){
      console.log(index,row)
      this.rolenum = row.code
      this.rolename = row.name
      if( row.status == '启用'){
        this.switchstate = true
      }else{
        this.switchstate = false
      }
      this.dialogVisible = true
    },
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.outerVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
<style scoped>
.state{
  display: inline-block;
  width: 90px;
}
.input-width {
  width: 180px;
  margin: 0 10px;
}
.messages {
}
.flex {
  display: flex;
}
.staffStatu {
  margin: 0 20px;
}
.wenben{
  margin-left: 20px;
}
.role{
  margin-bottom: 10px;
}
.rolemenu{
  display: flex;
  height: 40px;
  line-height: 40px;
}
.rights{
  margin-right: 20px;
}
</style>
