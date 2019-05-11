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
        <el-select class="input-width" v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary">查询</el-button>
        <span class="staffStatu" style="float:right">总人数：100人 在岗：98人 休假：1人</span>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="name" label="姓名">{{}}</el-table-column>
          <el-table-column prop="gender" label="性别"></el-table-column>
          <el-table-column prop="dept" label="单位"></el-table-column>
          <el-table-column prop="job" label="职务"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="total"
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
      value1: "",
      value2: "",
      input2: "",
      options: [
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
          name: "李云龙",
          gender: "男",
          dept: "保卫科",
          job: "保卫员",
          status: "在岗"
        },
        {
          name: "李云龙",
          gender: "男",
          dept: "保卫科",
          job: "保卫员",
          status: "在岗"
        },
        {
          name: "李云龙",
          gender: "男",
          dept: "保卫科",
          job: "保卫员",
          status: "在岗"
        },
        {
          name: "李云龙",
          gender: "男",
          dept: "保卫科",
          job: "保卫员",
          status: "在岗"
        }
      ],
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
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
      keyword: "集团",
      total: 12,
      currentPage: 1,
      multipleSelection: []
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    callbackFunction(result) {
      alert(result + "aaa");
    },
    fetchData() {
      //获取数据
      this.total = this.tableData.length;
      // this.currentPage = res.body.curr;
      // this.tableData = res.body.data;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.fetchData(1, val);
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData(val, this.pageSize);
      // console.log(`当前页: ${val}`);
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
.staffStatu {
  margin: 0 20px;
}
</style>
