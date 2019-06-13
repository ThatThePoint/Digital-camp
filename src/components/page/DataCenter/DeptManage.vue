<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 部门管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="messages">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-button type="success" @click="handleAdd" class="right">新增</el-button>
        </el-form>
      </div>
      <div class="body">
        <el-table :data="deptsTableData" style="width: 100%;margin-bottom: 20px;" row-key="tid">
          <el-table-column prop="name" label="名称" sortable ></el-table-column>
          <el-table-column prop="code" label="编码" sortable ></el-table-column>
          <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row.tid)">详情</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.tid)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="部门信息" :visible.sync="dialogFormVisible">
          <el-form :model="deptInfo">
            <div class="flex"></div>
            <el-form-item label="上级部门" :label-width="formLabelWidth">
              <el-select clearable v-model="deptInfo.parentId" placeholder="请选择">
                <el-option
                    v-for="item in deptsOps"
                    :key="item.tid"
                    :label="item.name"
                    :value="item.tid"
                  ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门名称" :label-width="formLabelWidth" required>
              <el-input class="input-width" placeholder="请输入" v-model="deptInfo.name" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="部门编码" :label-width="formLabelWidth" required>
              <el-input class="input-width" placeholder="请输入" v-model="deptInfo.code" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleSave">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      formInline:{},
      deptsOps:[],
      deptInfo:{
        tid:"",
        name:"",
        parentId:"",
        parentName:"",
        code:""
      },
      dialogFormVisible : false,
      formLabelWidth: "120px",
      deptsTableData: [],
    };
  },
  methods: {
    handleAdd(){
      this.deptInfo={};
      this.postAxios("DataCenter/InitForm")
        .then(res => {
          console.log(res);
          this.deptsOps=res.deptsOps;
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogFormVisible = true;
    },
    handleEdit(id) {
      this.postAxios("DataCenter/InitForm", {tid:id})
        .then(res => {
          console.log(res);
          this.deptInfo=res.data;
          this.deptsOps=res.deptsOps;
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogFormVisible = true;
    },
    handleDelete(tid) {
      if(confirm("确定删除？")){
      this.postAxios("DataCenter/DeleteDept", {deptId:tid})
        .then(res => {
          console.log(res);
          alert("删除成功");
          this.getData();
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    handleCancel(){
      this.dialogFormVisible = false;
    },
    handleSave(){
      var nameFlag= this.$utils.isEmpty(this.deptInfo.name);
      var codeFlag= this.$utils.isEmpty(this.deptInfo.code);
      if(nameFlag || codeFlag){
        alert("请先输入部门名称和编码");
        return false;
      }else{
        this.postAxios("DataCenter/SaveDept", this.deptInfo)
        .then(res => {
          console.log(res);
          alert("保存成功");
          this.getData();
        })
        .catch(err => {
          console.log(err);
        });
        this.getData();
      this.dialogFormVisible = false;
      }
    },
    formatter(row, column) {
      return row.address;
    },
    getData(name, pageNum = 1, pageSize = 10) {
      this.postAxios("DataCenter/GetDepts", { name, pageNum, pageSize })
        .then(res => {
          console.log(res);
          this.count = res.count;
          this.deptsTableData = [...res.depts];
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
.input-width {
  width: 180px;
  margin: 0 10px;
}
.messages {
}
</style>
