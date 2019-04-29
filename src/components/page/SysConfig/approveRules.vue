<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>人员权限</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="请假审批" name="first">
          <div class="messages">
            <span>人员类型</span>
            <el-select class="input-width" v-model="typeValue" filterable placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span>所属部门</span>
            <el-select class="input-width" v-model="deptValue" filterable placeholder="请选择">
              <el-option
                v-for="item in deptOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input class="input-width" v-model="input2" placeholder="姓名"></el-input>
            <el-button type="primary">查询</el-button>
            <el-dialog title="编辑权限" :visible.sync="outerVisible">
              <el-form :model="form">
                <el-form-item :label-width="formLabelWidth">
                  <el-row :gutter="20">
                    <el-col :span="6">姓名：张三</el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">性别：男</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">年龄：35</div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="grid-content bg-purple">部门：野战旅</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">职位：野战旅长</div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="功能权限" :label-width="formLabelWidth">
                  <el-row :gutter="20" style="height:200px;overflow:auto;">
                    <el-col :span="6">
                      <el-tree
                        :data="data"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="[5]"
                        :props="defaultProps"
                      ></el-tree>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取 消</el-button>
                <el-button type="primary" @click="outerVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'date', order: 'descending'}"
            >
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="gender" label="性别"></el-table-column>
              <el-table-column prop="dept" label="单位"></el-table-column>
              <el-table-column prop="job" label="职务"></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑权限</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="车辆审批" name="second">车辆审批</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "documentManagement",
  data() {
    return {
         activeName: 'first',
      outerVisible: false,
      value1: "",
      value2: "",
      input2: "",
      typeValue: "",
      typeOptions: [
        {
          value: "1",
          label: "现役"
        },
        {
          value: "2",
          label: "职工"
        },
        {
          value: "3",
          label: "家属"
        }
      ],

      deptValue: "",
      deptOptions: [
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
      formInline: {
        user: "",
        region: ""
      },
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
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.outerVisible = true;
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
.staffStatu {
  margin: 0 20px;
}
</style>
