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
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="dialogFormVisible = true">新增</el-button>
          </el-form-item>
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
          <el-table-column prop="type" label="外出类型" ></el-table-column>
          <el-table-column prop="reason" label="外出内容" ></el-table-column>
          <el-table-column prop="startDate" label="外出时间" ></el-table-column>
          <el-table-column prop="returnDate" label="返岗时间" ></el-table-column>
          <el-table-column prop="length" label="申请时长" ></el-table-column>
          <el-table-column prop="curApproval" label="当前审批人" ></el-table-column>
          <el-table-column prop="status" label="审批状态" ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">退回</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="新增规章制度" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <div class="flex">
            </div>
            <el-form-item label="警报内容" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder="警报内容" v-model="input2"></el-input>
            </el-form-item>
            <el-form-item label="警报等级" :label-width="formLabelWidth">
              <el-select v-model="formInline.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
      value1: "",
      value2: "",
      input2: "",
      filterModel:{
          name:"",
          depts:"",
      types:""
      }, 
      value: "",
      tableData: [
        {
          name: "李云龙",
          dept: "保卫科",
          type:"请假",
          reason: "外出有事",
          startDate: "2019-04-22",
          returnDate: "2019-04-30",
          length: "18小时",
          curApproval:"老张",
          status: "归档"
        },
        {
          name: "李云龙",
          dept: "保卫科",
          type:"请假",
          reason: "外出有事",
          startDate: "2019-04-22",
          returnDate: "2019-04-30",
          length: "18小时",
          curApproval:"老张",
          status: "归档"
        },
        {
          name: "李云龙",
          dept: "保卫科",
          type:"请假",
          reason: "外出有事",
          startDate: "2019-04-22",
          returnDate: "2019-04-30",
          length: "18小时",
          curApproval:"老张",
          status: "归档"
        },
        {
          name: "李云龙",
          dept: "保卫科",
          type:"请假",
          reason: "外出有事",
          startDate: "2019-04-22",
          returnDate: "2019-04-30",
          length: "18小时",
          curApproval:"老张",
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
      formLabelWidth: "120px"
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
