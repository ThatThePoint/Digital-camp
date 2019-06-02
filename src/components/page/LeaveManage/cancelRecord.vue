<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>请假外出管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="messages">
        <el-form :inline="true" :model="filterModel" class="demo-form-inline">
          <el-form-item label="申请人部门">
            <el-select v-model="filterModel.depts" placeholder="请选择">
              <el-option label="组织部" value="shanghai"></el-option>
              <el-option label="一连" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请状态">
            <el-select v-model="filterModel.status" placeholder="请选择">
              <el-option label="归档" value="shanghai"></el-option>
              <el-option label="待审批" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请类型">
            <el-select v-model="filterModel.types" placeholder="请选择">
              <el-option label="请假" value="shanghai"></el-option>
              <el-option label="出差" value="beijing"></el-option>
              <el-option label="学习" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="filterModel.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="我的待办">
            <el-checkbox v-model="checked"></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-button type="success" @click="dialogFormVisible = true" class="right">新增</el-button>
        </el-form>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="name" label="申请人" sortable width="180">{{}}</el-table-column>
          <el-table-column prop="dept" label="申请人部门" sortable width="180"></el-table-column>
          <el-table-column prop="type" label="外出类型"></el-table-column>
          <el-table-column prop="reason" label="外出内容"></el-table-column>
          <el-table-column prop="startDate" label="外出时间"></el-table-column>
          <el-table-column prop="returnDate" label="返岗时间"></el-table-column>
          <el-table-column prop="length" label="申请时长"></el-table-column>
          <el-table-column prop="length" label="销假时长"></el-table-column>
          <el-table-column prop="status" label="审批状态"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="外出申请" :visible.sync="dialogFormVisible">
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
              <el-form-item label="请假天数" :label-width="formLabelWidth">2天</el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">申 请</el-button>
          </div>
        </el-dialog>

        <el-dialog title="外出申请" :visible.sync="confirmFormVisible">
          <el-form :model="form">
            <div class="flex">
              <el-form-item label="姓名：" :label-width="formLabelWidth">{{confirmLeave.name}}</el-form-item>
              <el-form-item label="部门：" :label-width="formLabelWidth">{{confirmLeave.dept}}</el-form-item>
              <el-form-item label="岗位：" :label-width="formLabelWidth">科长</el-form-item>
            </div>
            <div class="flex">
              <el-form-item label="外出类型：" :label-width="formLabelWidth">{{confirmLeave.type}}</el-form-item>
              <el-form-item label="外出原因：" :label-width="formLabelWidth">{{confirmLeave.reason}}</el-form-item>
            </div>
            <div class="flex">
              <el-form-item label="开始日期：" :label-width="formLabelWidth">{{confirmLeave.startDate}}</el-form-item>
              <el-form-item label="结束日期：" :label-width="formLabelWidth">{{confirmLeave.returnDate}}</el-form-item>
              <el-form-item label="请假天数：" :label-width="formLabelWidth">{{confirmLeave.length}}</el-form-item>
            </div>
          </el-form>
          <div class="block">
            <el-timeline>
              <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                  <h4>张主任</h4>
                  <p>同意</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="confirmFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmFormVisible = false">申 请</el-button>
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
