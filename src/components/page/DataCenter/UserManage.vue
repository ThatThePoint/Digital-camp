<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs tab-position="top" >
        <el-tab-pane label="现役人员">
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
            <el-button type="success" @click="dialogFormVisible = true" class="right">新增</el-button>
            <el-dialog title="添加人员" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="人员信息：" :label-width="formLabelWidth"></el-form-item>
                <div class="flex">
                  <el-form-item label="所属部门" :label-width="formLabelWidth" v-show="deptVisible">
                    <el-select v-model="formInline.dept">
                      <el-option label="战斗班" value="shanghai"></el-option>
                      <el-option label="独立团" value="sss"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <el-form-item label="基础信息：" :label-width="formLabelWidth"></el-form-item>
                <div class="flex">
                  <el-form-item label="姓名：" :label-width="formLabelWidth">
                    <el-input
                      v-model="formInline.user"
                      :label-width="formLabelWidth"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio v-model="radio" label="1">男</el-radio>
                    <el-radio v-model="radio" label="2">女</el-radio>
                  </el-form-item>
                </div>
                <div class="flex">
                  <el-form-item label="身份证号：" :label-width="formLabelWidth">
                    <el-input
                      v-model="formInline.user"
                      :label-width="formLabelWidth"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="年龄：" :label-width="formLabelWidth">33</el-form-item>
                </div>
                <el-form-item label="联系电话：" :label-width="formLabelWidth">
                  <el-input v-model="formInline.user" style="width:200px" placeholder="请输入"></el-input>
                </el-form-item>
                <div class="flex" v-show="outManVisible">
                  <el-form-item label="内部联系人" :label-width="formLabelWidth">
                    <el-select v-model="formInline.relaterDept">
                      <el-option label="战斗班" value="we"></el-option>
                      <el-option label="退役人员" value="beijing"></el-option>
                      <el-option label="驻训人员" value="beijing"></el-option>
                    </el-select>
                    <el-select v-model="formInline.relater" style="margin-left:20px;">
                      <el-option label="老王" value="shanghai"></el-option>
                      <el-option label="老李" value="shanghai"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
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
        <el-tab-pane label="部队家属">部队家属</el-tab-pane>
        <el-tab-pane label="部队职工">部队职工</el-tab-pane>
        <el-tab-pane label="临时人员">临时人员</el-tab-pane>
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
