<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>人员动态</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="messages">
        <span>所属部门</span>
        <el-select clearable class="input-width" v-model="deptId" filterable placeholder="请选择">
          <el-option
            v-for="item in deptOptions"
            :key="item.tid"
            :label="item.name"
            :value="item.tid"
          ></el-option>
        </el-select>
        <el-button type="primary" @click="getdata">查询</el-button>
        <span class="staffStatu" style="float:right">{{msg}}</span>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="name" label="姓名" >{{}}</el-table-column>
          <el-table-column prop="gender" label="性别" ></el-table-column>
          <el-table-column prop="dept" label="单位" ></el-table-column>
          <el-table-column prop="jobPostion" label="职务"></el-table-column>
          <el-table-column prop="status" label="状态" :formatter="formatterStatus"></el-table-column>
        </el-table>

        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="total, prev, pager, next"
            :total="count"
            :page-size="10"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "documentManagement",
  data() {
    return {
      pageSize: 10,
      pageNum : 1,
      count: 0,
      currentPage: 1,
      deptId:"",
      msg:"",
      deptOptions: [],
      tableData: []
    };
  },
  created(){
     this.getdata();
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.pageNum = val;
      this.getdata();
    },
    formatterStatus(row, column){
      if(row.status==1){
        return "在岗";
      }else{
        return "离岗";
      }
    },
    getdata(){
      var params={
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        deptId: this.deptId
      };
      this.postAxios("DailyOffice/StaffDynamics",params)
        .then(res => {
          console.log(res);
          this.count = res.count
          this.tableData=res.list;
          this.deptOptions=res.deptOptions;
          this.msg=res.msg;
        })
        .catch(err => {
          console.log(err);
        });
    },
    formatter(row, column) {
      return row.address;
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
.flex {
  display: flex;
}
.staffStatu{
    margin: 0 20px;
}
</style>
