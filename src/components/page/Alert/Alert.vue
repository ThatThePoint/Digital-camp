<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 公文信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="messages">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="发布单位">
            <el-select v-model="formInline.dept" placeholder="请选择">
              <el-option
                    v-for="item in deptsOps"
                    :key="item.tid"
                    :label="item.name"
                    :value="item.tid"
                  ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="警报等级">
            <el-select v-model="formInline.level" placeholder="请选择">
              <el-option
                    v-for="item in messageLevelOps"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="警报状态">
            <el-select v-model="formInline.status" placeholder="请选择">
              <el-option label="生效" value="1"></el-option>
              <el-option label="失效" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="警报内容">
            <el-input v-model="formInline.content" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
            <el-button type="success" @click="dialogFormVisible = true"  class="right">新增</el-button>
        </el-form>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="content" label="警报内容" sortable width="180">{{}}</el-table-column>
          <el-table-column prop="postDeptName" label="发布单位" sortable width="180"></el-table-column>
          <el-table-column prop="alertLevel" label="警报类型" ></el-table-column>
          <el-table-column prop="status" label="警报状态" ></el-table-column>
          <el-table-column prop="postTime" label="发布时间" ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleCancelAlert(scope.row.tid)">警报解除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="增加警报" :visible.sync="dialogFormVisible">
          <el-form :model="alertInfo">
            <div class="flex">
            </div>
            <el-form-item label="警报内容" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder="警报内容" v-model="alertInfo.content"></el-input>
            </el-form-item>
            <el-form-item label="警报等级" :label-width="formLabelWidth">
              <el-select v-model="alertInfo.alertLevel" placeholder="请选择">
              <el-option
                    v-for="item in messageLevelOps"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
              </el-select>
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
  name: "documentManagement",
  data() {
    return {
      deptsOps:[],
      messageLevelOps: [],
      value: "",
      tableData: [],
      formInline: {
        dept: "",
        level: "",
        status:"",
        content:""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      alertInfo: {
        content: "",
        alertLevel: "",
        status:""
      },
      formLabelWidth: "120px"
    };
  },
  created(){
    this.getdata();
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    handleSearch(){
      this.getdata();
    },
    getdata(){
      var params={
        deptId:this.formInline.dept,
        level:this.formInline.level,
        status:this.formInline.status, 
        content: this.formInline.content
      };
       this.postAxios("DailyOffice/GetAlerts", params)
        .then(res => {
          console.log(res);
          this.count = res.count;
          this.tableData = [...res.alerts];
          this.messageLevelOps=res.levelOps;
          this.deptsOps=res.depts;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCancelAlert(id) {
      var params={
        tid:id
      };
       this.postAxios("DailyOffice/CancelAlert", params)
        .then(res => {
          console.log(res);
          alert("取消成功");
          this.getdata();
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCancel(){
      this.alertInfo={};
      this.dialogFormVisible = false;
    },
    handleSave() {
      var params={
        content:this.alertInfo.content,
        level:this.alertInfo.alertLevel
      };
       this.postAxios("DailyOffice/SaveAlert", params)
        .then(res => {
          console.log(res);
          this.alertInfo={};
          alert("保存成功");
          this.getdata();
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogFormVisible = false;
    }
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
