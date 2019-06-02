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
          <input type="text" class="wenben" v-model="roleInfo.code"/>
        </div>
        <div class="role">
          <span>角色名称：</span>
          <input type="text" class="wenben" v-model="roleInfo.name"/>
        </div>
        <div class="role">
          <span style="width:'90px',display:inline-block" class="state">状态：</span>
          <el-radio-group v-model="roleInfo.status">
    <el-radio :label="3">启用</el-radio>
    <el-radio :label="6">禁用</el-radio>
  </el-radio-group>
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
          :data="menuData"
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
          :data="deptStaffData"
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
      roleInfo:{
        code:"",
        name:"",
        status
      },
      deptStaffData:
          [
        {
            "id": "4f4b5cf8-c589-4447-9bb0-6c19954175bf",
            "pid": "e77b0cd8-57b4-4c6e-8b8f-ae6c3aa6f06a",
            "name": "撒法发",
            "children": []
        },
        {
            "id": "5fbebecc-6601-47fc-8155-dafd856ebde1",
            "pid": "ce7bc410-acfe-4691-a9cb-7ee7a9d409e3",
            "name": "哈哈部门",
            "children": []
        },
        {
            "id": "84c71885-4d32-4e0e-983a-53d4d85c6f15",
            "pid": "4f4b5cf8-c589-4447-9bb0-6c19954175bf",
            "name": "一哈部门",
            "children": []
        },
        {
            "id": "ce7bc410-acfe-4691-a9cb-7ee7a9d409e3",
            "pid": "4f4b5cf8-c589-4447-9bb0-6c19954175bf",
            "name": "烦烦烦",
            "children": []
        },
        {
            "id": "e77b0cd8-57b4-4c6e-8b8f-ae6c3aa6f06a",
            "pid": "",
            "name": "哈哈哈哈",
            "children": []
        },
        {
            "id": "8c8aa69a-1d18-4e4a-a28e-6a38b72fb8e9",
            "pid": "4f4b5cf8-c589-4447-9bb0-6c19954175bf",
            "name": "是德国首都大概",
            "children": []
        },
        {
            "id": "9052b883-f74e-4e2d-8d81-d85c024f3d0f",
            "pid": "ce7bc410-acfe-4691-a9cb-7ee7a9d409e3",
            "name": "李时珍",
            "children": []
        },
        {
            "id": "c79337e2-c1f2-491c-8618-cea297b682d0",
            "pid": "",
            "name": "孙悟空",
            "children": []
        },
        {
            "id": "cd9e0920-649c-4c79-a3ae-5d6f835a4267",
            "pid": "d05ab819-2471-45d2-a84b-268bdee300da",
            "name": "猪八戒",
            "children": []
        },
        {
            "id": "f1919b84-cab2-4462-94d9-f39d1f60cf7b",
            "pid": "84c71885-4d32-4e0e-983a-53d4d85c6f15",
            "name": "张驴儿",
            "children": []
        },
        {
            "id": "f6a3ccd9-78d3-466d-8ccc-5a719676f94a",
            "pid": "4f4b5cf8-c589-4447-9bb0-6c19954175bf",
            "name": "张大爷",
            "children": []
        },
        {
            "id": "f75094e9-f2fd-4af8-93e8-53bd440118d2",
            "pid": "5fbebecc-6601-47fc-8155-dafd856ebde1",
            "name": "李世民",
            "children": []
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
    let rolelist = this.changeKey(this.deptStaffData);
    this.deptStaffData = this.getTree(rolelist)
  },

  methods: {
    //将数据源的name改为lable
    changeKey(array){
      var keyMap = {
          "name" : "label"
      };
      for(var i = 0;i < array.length;i++){
        var obj = array[i];
        for(var key in obj){
          var newKey = keyMap[key];
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
