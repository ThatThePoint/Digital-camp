<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>请假外出管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="body">
        <el-form :model="form">
          <div class="flex">
            <el-form-item label="姓名：" :label-width="formLabelWidth">李云龙</el-form-item>
            <el-form-item label="部门：" :label-width="formLabelWidth">独立团</el-form-item>
            <el-form-item label="岗位：" :label-width="formLabelWidth">团长</el-form-item>
          </div>
          <div class="flex">
            <el-form-item label="外出类型" :label-width="formLabelWidth">
              <el-select placeholder="请选择">
                <el-option label="学习" value="shanghai"></el-option>
                <el-option label="出差" value="beijing"></el-option>
                <el-option label="事假" value="shanghai"></el-option>
                <el-option label="病假" value="beijing"></el-option>
                <el-option label="婚假" value="shanghai"></el-option>
                <el-option label="其他" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="外出原因" :label-width="formLabelWidth">
              <el-input type="textarea" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div class="flex">
            <el-form-item label="开始日期" :label-width="formLabelWidth">
              <el-date-picker class="input-width" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>--
            </el-form-item>
            <el-form-item label="结束日期" :label-width="formLabelWidth">
              <el-date-picker class="input-width" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>--
            </el-form-item>
            <el-form-item label="请假时长" :label-width="formLabelWidth">19小时</el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">申 请</el-button>
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
      confirmLeave: {},
      confirmFormVisible: false,
      checked: "",
      value1: "",
      value2: "",
      input2: "",
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
        }
      ],
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
