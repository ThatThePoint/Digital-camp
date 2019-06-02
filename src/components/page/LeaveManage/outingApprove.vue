<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>待审批请假</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="name" label="申请人" sortable></el-table-column>
          <el-table-column prop="dept" label="申请人部门" sortable></el-table-column>
          <el-table-column prop="type" label="外出类型"></el-table-column>
          <el-table-column prop="reason" label="外出内容"></el-table-column>
          <el-table-column prop="startDate" label="外出时间"></el-table-column>
          <el-table-column prop="returnDate" label="返岗时间"></el-table-column>
          <el-table-column prop="length" label="申请时长"></el-table-column>
          <el-table-column prop="curApproval" label="当前审批人"></el-table-column>
          <el-table-column prop="status" label="审批状态"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">退回</el-button>
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
      confirmLeave: {},
      confirmFormVisible: false,
      checked: "",
      value1: "",
      value2: "",
      input2: "",
      filterModel: {
        name: "",
        depts: "",
        types: ""
      },
      value: "",
      tableData: [
        {
          name: "李云龙",
          dept: "保卫科",
          type: "请假",
          reason: "外出有事",
          startDate: "2019-04-22",
          returnDate: "2019-04-30",
          length: "18小时",
          curApproval: "老张",
          status: "归档"
        },
        {
          name: "李云龙",
          dept: "保卫科",
          type: "请假",
          reason: "外出有事",
          startDate: "2019-04-22",
          returnDate: "2019-04-30",
          length: "18小时",
          curApproval: "老张",
          status: "归档"
        },
        {
          name: "李云龙",
          dept: "保卫科",
          type: "请假",
          reason: "外出有事",
          startDate: "2019-04-22",
          returnDate: "2019-04-30",
          length: "18小时",
          curApproval: "老张",
          status: "归档"
        },
        {
          name: "李云龙",
          dept: "保卫科",
          type: "请假",
          reason: "外出有事",
          startDate: "2019-04-22",
          returnDate: "2019-04-30",
          length: "18小时",
          curApproval: "老张",
          status: "归档"
        }
      ],
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
      activities: [
        {
          content: "张主任",
          timestamp: "2018-04-15"
        },
        {
          content: "王主任",
          timestamp: "2018-04-13"
        },
        {
          content: "高首长",
          timestamp: "2018-04-11"
        }
      ]
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.confirmFormVisible = true;
      this.confirmLeave = this.tableData[index];
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onSubmit() {
      console.log("submit!");
    }
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
