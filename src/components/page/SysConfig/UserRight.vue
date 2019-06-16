<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>人员权限</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 角色编辑框 -->
    <div class="messages">
      
      <el-dialog
        title="新增角色"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div class="role">
          <span>角色编码：</span>
          <input type="text" class="wenben" v-model="code"/>
        </div>
        <div class="role">
          <span>角色名称：</span>
          <input type="text" class="wenben" v-model="name"/>
        </div>
        <div class="role">
          <span style="width:'90px',display:inline-block" class="state">状态：</span>
          <el-radio-group v-model="status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirms">确 定</el-button>
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
        </div>
        <el-tree
          ref="tre"
          :data="menuData"
          show-checkbox
          default-expand-all 
          node-key="id"
          :default-checked-keys="defaultarrtwo"
          :props="defaultProps">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="roleperim = false">取 消</el-button>
          <el-button type="primary" @click="roleperimss">确 定</el-button>
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
        </div>
        <el-tree
          :data="deptStaffData"
          show-checkbox
          default-expand-all 
          node-key="id"
          :default-checked-keys="defaultArr"
          ref="tree"
          :props="defaultProps">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="jueserenyuan = false">取 消</el-button>
          <el-button type="primary" @click="jueserenyuansss">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="container">
      <el-button type="success" @click="adddialogVisible" class="right">新增角色</el-button>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="code" label="角色编码" width="150">{{}}</el-table-column>
          <el-table-column prop="name" label="角色名称" width="150"></el-table-column>
          <el-table-column prop="status" label="状态" width="120" :formatter="state"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="editDialogVisible(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleRole(scope.$index, scope.row)">角色人员</el-button>
              <el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
      defaultarrtwo :[],//角色权限人员弹框打开默认选中
      defaultArr:[],//角色人员弹框打开时默认选中的
      roleId:"",//每一行的tid,打开角色框时保存用
      tid:"",
      jueserenyuan: false,//角色人员弹框
      rolemingcheng: "孙老板",//角色人员弹框名字
      rolehandle:"",//角色权限框的角色名称
      roleperim : false,//角色权限弹框
      switchstate:false,//角色状态狂false默认没有
      code:"",//角色编码
      name:"",//角色名称
      status:1,//jinyong
      dialogVisible: false,//新增角色弹框
      outerVisible: false,
      roleInfo:{
        code:"",
        name:"",
        status:1
      },
      deptStaffData://树
          [
            {
                "id": "4f4b5cf8-c589-4447-9bb0-6c19954175bf",
                "pid": "e77b0cd8-57b4-4c6e-8b8f-ae6c3aa6f06a",
                "name": "撒法发",
                "children": []
            }
    ],
      value: "",
      tableData: [],
      menuData: [
        {
          id: 1,
          label: "日常办公",
          children: [
            {
              id: 4,
              label: "公文管理"
            },
             {
              id: 5,
              label: "人员动态"
            },
            {
              id: 6,
              label: "警报传递"
            }
          ]
        },
        {
          id: 2,
          label: "车辆管理",
          children: [
            {
              id: 7,
              label: "车辆信息管理"
            },
            {
              id: 8,
              label: "车库管理"
            }
          ]
        },
        {
          id: 3,
          label: "请假审批管理",
          children: [
            {
              id: 9,
              label: "请假申请"
            },
            {
              id: 10,
              label: "待审批请假"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        lable: "name"
      }
    };
  },
  created(){
    
    this.getTableData()
  },

  methods: {
    //角色人员弹框确定事件
    jueserenyuansss(){
      let selectId = this.$refs.tree.getCheckedNodes()
      let selectIdArr = []
      for(let i = 0; i < selectId.length; i++){
        if(!selectId[i].children){
          selectIdArr.push(selectId[i].id)
        }
      }
      this.postAxios("Sysconfig/SaveRoleUser",{
        userIds : selectIdArr.join(";"),
        roleId : this.roleId
      })
        .then(res => {
          console.log(res)
          if(res.status == 1){
            this.jueserenyuan = false
          }
          // 
        })
        .catch(err => {
          console.log(err);
      });
      
      
    },
    //新增修改保存数据
    confirms(){
      let _this = this;
      // let data = _this.roleInfo
      let data = {
        code : this.code,
        name : this.name,
        status : this.status,
        tid : this.tid
      }
      if (this.code&&this.name&&this.status){
        this.postAxios("/Sysconfig/SaveRole",data)
          .then(res => {
            console.log(res)
            _this.getTableData()
            _this.dialogVisible = false
          })
          .catch(err => {
            console.log(err);
        });
      }else{
        this.$message.warning("您有必填项未填写")
      }
    },
    state(row,index){
      return row.status == 1 ? "启用" : "禁用"
    },
    //获取table数据
    getTableData(){
      let _this = this;
      this.postAxios("/Sysconfig/RoleList",{})
        .then(res => {
          _this.tableData = res.data
        })
        .catch(err => {
          console.log(err);
      });
    },
    //将数据源的name改为lable
    changeKey(array){
      let keyMap = {
          "name" : "label"
      };
      for(let i = 0;i < array.length;i++){
        let obj = array[i];
        for(let key in obj){
          let newKey = keyMap[key];
          if(newKey){
              obj[newKey] = obj[key];
              delete obj[key];
            }
          }
      }
      return array
    },
    getTree(data){
      let map = {};
      let val = [];
      //生成数据对象集合
      data.forEach(it=>{
        delete it.children;
        map[it.id] = it;
      })
      //生成结果集
      data.forEach(it=>{
          const parent = map[it.pid];
          if(parent){
              if(!Array.isArray(parent.children)) parent.children = [];
              parent.children.push(it);
          }else{
              val.push(it);
          }
      })
      return val;
    },
    //角色人员弹框
    handleRole(index,row){
      this.defaultArr = []
      let _this = this;
      this.postAxios("/Sysconfig/RoleUserList",{tid : row.tid})
        .then(res => {
          console.log(res)
          _this.deptStaffData = res.staffList
          for(let i = 0; i < res.checkedOps.length; i++){
            _this.defaultArr.push(res.checkedOps[i].id)
          }
          let rolelist = _this.changeKey(_this.deptStaffData);
          _this.deptStaffData = _this.getTree(rolelist)
        })
        .catch(err => {
          console.log(err);
      });
      this.jueserenyuan = true
      this.roleId = row.tid
    },



    //打开角色权限弹框
    handRoleperim(index,row){
      this.defaultarrtwo = []
      let _this = this;
      this.postAxios("/Sysconfig/RoleRightList",{tid : row.tid})
        .then(res => {
          console.log(res)
          _this.menuData = res.menuList
          for(let i = 0; i < res.checkedOps.length; i++){
            _this.defaultarrtwo.push(res.checkedOps[i].id)
          }
          let rolelist = _this.changeKey(_this.menuData);
          _this.menuData = _this.getTree(rolelist)
        })
        .catch(err => {
          console.log(err);
      });
      this.roleId = row.tid
      this.rolehandle = row.name
      this.roleperim = true
    },
    //角色权限弹框确认事件
    roleperimss(){
      let selectId = this.$refs.tre.getCheckedNodes()
      let selectIdArr = []
      for(let i = 0; i < selectId.length; i++){
        if(!selectId[i].children){
          selectIdArr.push(selectId[i].id)
        }
      }
      this.postAxios("/Sysconfig/SaveRoleMenu",{
        menuIds : selectIdArr.join(";"),
        roleId : this.roleId
      })
        .then(res => {
          console.log(res)
          if(res.status == 1){
            this.roleperim = false
          }
        })
        .catch(err => {
          console.log(err);
      });
    },

    //新增X角色
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //新增打开角色框
    adddialogVisible(){
      this.name = ''
      this.code = ''
      this.status = 1
      this.dialogVisible = true
    },
    //编辑打开角色框
    editDialogVisible(index, row){
      console.log(index,row)
      this.name = row.name;
      this.code = row.code;
      this.status = row.status;
      this.tid = row.tid
      this.dialogVisible = true
    },
    formatter(row, column) {
      return row.address;
    },
    //删除
    handleDel(index, row) {
      console.log(index, row);
      let _this = this;
      this.postAxios("/Sysconfig/DeleteRole",{
        tid : row.tid
      })
        .then(res => {
          _this.getTableData()
        })
        .catch(err => {
          console.log(err);
      });
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
