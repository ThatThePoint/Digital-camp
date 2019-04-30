<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs tab-position="top" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="现役人员" name="first">
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
            <el-input
              class="input-width"
              placeholder="请输入姓名"
              prefix-icon="el-icon-search"
              v-model="input2"
            ></el-input>
            <el-button type="primary">查询</el-button>
            <el-button type="success" @click="addPeople" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'name', order: 'descending'}"
            >
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="gender" label="性别"></el-table-column>
              <el-table-column prop="dept" label="部门"></el-table-column>
              <el-table-column prop="job" label="职位"></el-table-column>
              <el-table-column prop="tel" label="联系电话"></el-table-column>
              <el-table-column prop="type" label="人员类型"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleEdit(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="部队家属" name="secend">
          <div class="messages">
            <span>联系人部门</span>
            <el-select class="input-width" v-model="value" filterable placeholder="请选择">
              <el-option
                v-for="item in DeptOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              class="input-width"
              placeholder="请输入姓名"
              prefix-icon="el-icon-search"
              v-model="input2"
            ></el-input>
            <el-button type="primary">查询</el-button>
            <el-button type="success" @click="addPeople" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'name', order: 'descending'}"
            >
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="gender" label="性别"></el-table-column>
              <el-table-column prop="name" label="部队联系人"></el-table-column>
              <el-table-column prop="dept" label="联系人部门"></el-table-column>
              <el-table-column prop="tel" label="联系电话"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleEdit(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="部队职工" name="third">
          <div class="messages">
            <span>职工部门</span>
            <el-select class="input-width" v-model="value" filterable placeholder="请选择">
              <el-option
                v-for="item in DeptOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              class="input-width"
              placeholder="请输入姓名"
              prefix-icon="el-icon-search"
              v-model="input2"
            ></el-input>
            <el-button type="primary">查询</el-button>
            <el-button type="success" @click="addPeople" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'name', order: 'descending'}"
            >
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="gender" label="性别"></el-table-column>
              <el-table-column prop="dept" label="部门"></el-table-column>
              <el-table-column prop="job" label="职位"></el-table-column>
              <el-table-column prop="tel" label="联系电话"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleEdit(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="临时人员" name="fouth">
          <div class="messages">
            <span>联系人部门</span>
            <el-select class="input-width" v-model="value" filterable placeholder="请选择">
              <el-option
                v-for="item in DeptOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              class="input-width"
              placeholder="请输入姓名"
              prefix-icon="el-icon-search"
              v-model="input2"
            ></el-input>
            <el-button type="primary">查询</el-button>
            <el-button type="success" @click="addPeople" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'name', order: 'descending'}"
            >
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="gender" label="性别"></el-table-column>
              <el-table-column prop="name" label="联系人"></el-table-column>
              <el-table-column prop="dept" label="联系人部门"></el-table-column>
              <el-table-column prop="tel" label="电话"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleEdit(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "documentManagement",
  data() {
    return {
      radio: 1,
      dialogFormVisible: false,
      deptVisible: true,
      value1: "",
      value2: "",
      input2: "",
      activeName: "first",
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
          job: "保卫员",
          tel: "1388585452",
          type: "现役"
        },
        {
          name: "李云龙",
          gender: "男",
          dept: "保卫科",
          job: "保卫员",
          tel: "1388585452",
          type: "现役"
        },
        {
          name: "李云龙",
          gender: "男",
          dept: "保卫科",
          job: "保卫员",
          tel: "1388585452",
          type: "现役"
        },
        {
          name: "李云龙",
          gender: "男",
          dept: "保卫科",
          job: "保卫员",
          tel: "1388585452",
          type: "现役"
        }
      ],
      outManVisible: true,
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
      formInline: {
        user: "",
        region: "",
        dept: "",
        status: "",
        relaterDept: "",
        relater: ""
      }
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
    addPeople(){
      this.$router.push('/addpeople');
    },
    InOutUser(ss) {
      console.log(ss);
      console.log("status" + this.formInline.status);
      if (this.formInline.status <= 3) {
        this.deptVisible = true;
        this.outManVisible = false;
      } else {
        this.deptVisible = false;
        this.outManVisible = true;
      }
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
