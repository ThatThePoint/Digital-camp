<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>人员动态</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <Table :tableData1="tableData1"></Table>
    </div>
  </div>
</template>
<script>
import Table from "../page/BaseTable.vue";
export default {
  name: "documentManagement",
  data() {
    return {
      url: "./vuetable.json",
      tableData1: {
        sortSelect: true,
        tableColumn: [
          {
            key: "date",
            value: "日期",
            sortable: true,
            width: "150"
          },
          {
            key: "name",
            value: "姓名",
            sortable: false,
            width: "120"
          },
          {
            key: "address",
            value: "地址",
            sortable: false
          }
        ],
        editColumn: [
          {
            key: "edit",
            value: "编辑",
            className: ""
          },
          {
            key: "delete",
            value: "删除",
            className: "red"
          }
        ],
        // tableData:[],
        cur_page: 1,
      }
    };
  },
  components: { Table },
  methods: {
    // getData() {
    //   // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
    //   if (process.env.NODE_ENV === "development") {
    //     this.url = "/ms/table/list";
    //   }
    //   this.$axios
    //     .post(this.url, {
    //       page: this.cur_page
    //     })
    //     .then(res => {
    //       this.tableData1.tableData = res.data.list;
    //     });
    // }
    // formatter(row, column) {
    //   return row.address;
    // },
    // handleEdit(index, row) {
    //   console.log(index, row);
    // },
    // handleDelete(index, row) {
    //   console.log(index, row);
    // },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    // callbackFunction(result) {
    //   alert(result + "aaa");
    // },
    // fetchData() {
    //   //获取数据
    //   this.total = this.tableData.length;
    //   // this.currentPage = res.body.curr;
    //   // this.tableData = res.body.data;
    // },
    // handleSizeChange(val) {
    //   this.pageSize = val;
    //   this.currentPage = 1;
    //   this.fetchData(1, val);
    //   // console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   this.currentPage = val;
    //   this.fetchData(val, this.pageSize);
    //   // console.log(`当前页: ${val}`);
    // }
  }
};
</script>
<style scoped>
.input-width {
  width: 180px;
  margin: 0 10px;
}
.flex {
  display: flex;
}
.staffStatu {
  margin: 0 20px;
}
</style>
