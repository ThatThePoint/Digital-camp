<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="messages">
        <span>部门</span>
        <el-select class="input-width" v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in DeptOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary">查询</el-button>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'name', order: 'descending'}"
        >
          <el-table-column prop="name" label="姓名" >{{}}</el-table-column>
          <el-table-column prop="gender" label="性别" ></el-table-column>
          <el-table-column prop="dept" label="部门" ></el-table-column>
          <el-table-column prop="job" label="职位" ></el-table-column>
          <el-table-column prop="tel" label="联系电话"></el-table-column>
          <el-table-column prop="type" label="人员类型"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      value1: "",
      value2: "",
      input2: "",
      DeptOptions: [
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
          job:"保卫员",
          tel: "1388585452",
          type: "现役"
        },
        {
          name: "李云龙",
          gender: "男",
          dept: "保卫科",
          job:"保卫员",
          tel: "1388585452",
          type: "现役"
        },
        {
          name: "李云龙",
          gender: "男",
          dept: "保卫科",
          job:"保卫员",
          tel: "1388585452",
          type: "现役"
        },
        {
          name: "李云龙",
          gender: "男",
          dept: "保卫科",
          job:"保卫员",
          tel: "1388585452",
          type: "现役"
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
