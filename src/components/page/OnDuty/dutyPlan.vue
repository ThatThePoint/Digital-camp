<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>值班计划</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="messages">
        <span>所属部门</span>
        <el-select clearable class="input-width" v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in depts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>




          
        </el-select>
        <el-button type="primary">查询</el-button>
        <el-button type="success" @click="dialogFormVisible = true" class="right">新增</el-button>
        <el-dialog title="值班安排" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <div class="flex">
              <el-form-item label="岗位部门" :label-width="formLabelWidth">
                <el-select clearable
                  label="部门"
                  class="input-width"
                  v-model="value"
                  filterable
                  placeholder="所属部门"
                >
                  <el-option
                    v-for="item in depts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="岗位" :label-width="formLabelWidth">
                <el-select clearable class="input-width" v-model="value" filterable placeholder="岗位">
                  <el-option
                    v-for="item in jobs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-form-item label="值班时间" :label-width="formLabelWidth">
              <el-date-picker class="input-width" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>--
              <el-date-picker class="input-width" v-model="value2" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
             <el-form-item label="值班人" :label-width="formLabelWidth">
                <el-select clearable class="input-width" v-model="value" filterable placeholder="值班人">
                  <el-option
                    v-for="item in person"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
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
          :default-sort="{prop: 'job', order: 'descending'}"
        >
          <el-table-column prop="job" label="岗位名称" sortable width="180">{{}}</el-table-column>
          <el-table-column prop="dept" label="单位" sortable width="180"></el-table-column>
          <el-table-column prop="dutyNow" label="当前值班人"></el-table-column>
          <el-table-column prop="satus" label="岗位状态"></el-table-column>
          <el-table-column label="操作">
            <template >
              <el-button size="mini" @click="dialogFormVisible = true">新增</el-button>
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      input2: "",
      depts: [
        {
          value: "1",
          label: "信息科"
        },
        {
          value: "2",
          label: "保卫处"
        },
        {
          value: "3",
          label: "后勤处"
        },
        {
          value: "4",
          label: "警告"
        }
      ],
      jobs: [
        {
          value: "1",
          label: "班长"
        },
        {
          value: "2",
          label: "后勤员"
        },
        {
          value: "3",
          label: "科长"
        }
      ],
      person: [
        {
          value: "1",
          label: "张大锤"
        },
        {
          value: "2",
          label: "刘力"
        },
        {
          value: "3",
          label: "哈哈"
        }
      ],
      value: "",
      tableData: [
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          satus: "值班正常"
        },
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          remark: "值班正常"
        },
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          remark: "值班正常"
        },
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          remark: "值班正常"
        },
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          remark: "值班正常"
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
</style>
