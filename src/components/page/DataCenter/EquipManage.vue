<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 设备管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="messages">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="归属部门" :label-width="formLabelWidth">
            <el-select v-model="formInline.deptId" placeholder="请选择">
              <el-option
                v-for="item in deptOps"
                :key="item.tid"
                :label="item.name"
                :value="item.tid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备类型" :label-width="formLabelWidth">
            <el-select v-model="formInline.equipType" placeholder="请选择">
              <el-option
                v-for="item in typeOps"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="formInline.equipName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-button type="success" @click="dialogFormVisible = true" class="right">新增</el-button>
        </el-form>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'deptName', order: 'descending'}"
        >
          <el-table-column prop="name" label="设备名称" sortable width="180"></el-table-column>
          <el-table-column prop="equipNo" label="设备编号" sortable width="180"></el-table-column>
          <el-table-column prop="deptName" label="所属部门" sortable></el-table-column>
          <el-table-column prop="type" label="设备类型" sortable></el-table-column>
          <el-table-column prop="status" label="状态" sortable></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="设备信息" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <div class="flex"></div>
            <el-form-item label="设备名称" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder="请输入" v-model="form.name" type="input"></el-input>
            </el-form-item>
            <el-form-item label="设备编号" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder="请输入" v-model="form.code" type="input"></el-input>
            </el-form-item>
            <el-form-item label="设备类型" :label-width="formLabelWidth">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                v-for="item in typeOps"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属部门" :label-width="formLabelWidth">
              <el-select v-model="form.deptId" placeholder="请选择">
                <el-option
                v-for="item in deptOps"
                :key="item.tid"
                :label="item.name"
                :value="item.tid"
              ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备备注" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder="请输入" v-model="form.note" type="textarea"></el-input>
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
      tableData: [],
      deptOps: [],
      typeOps:[],
      count:0,
      formInline:{
        deptId:"",
        equipType:"",
        equipName:""
      },
      dialogFormVisible: false,
      form: {
        tid:"",
        name: "",
        code: "",
        type: "",
        deptId: "",
        deptName: "",
        note: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    getData(deptId,equipType,name, pageNum = 1, pageSize = 10) {
      this.postAxios("DataCenter/EquipList", { deptId,equipType,name, pageNum, pageSize })
        .then(res => {
          console.log(res);
          this.count = res.count;
          this.tableData = [...res.data];
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSearch() {
      this.getData(this.formInline.deptId,this.formInline.equipType,this.formInline.equipName);
      this.currentPage = 1;
    },
    handleCancel(){
      this.dialogFormVisible=false;
      this.form={};
    },
    handleSave() {
      console.log(this.baseinfo);
      let codeFlag = this.$utils.isEmpty(this.form.code);
      let nameFlag = this.$utils.isEmpty(this.form.name);
      let typeFlag = this.$utils.isEmpty(this.form.type);
      let deptId = this.$utils.isEmpty(this.form.deptId);
      console.log(codeFlag, nameFlag, typeFlag,deptId);
      console.log(this.form);
      if (!codeFlag && !nameFlag && !typeFlag && !deptId) {
        this.postAxios("DataCenter/SaveEquip", { equipment: this.form })
          .then(res => {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.dialogFormVisible=false;
          })
          .catch(err => {
            console.log(err);
          });
      }
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
