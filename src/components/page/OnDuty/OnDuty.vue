<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>值班执勤</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="值班执勤" name="first">
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'job', order: 'descending'}"
              max-height="600px"
            >
              <el-table-column prop="job" label="岗位名称" sortable width="180">{{}}</el-table-column>
              <el-table-column prop="dept" label="单位" sortable width="180"></el-table-column>
              <el-table-column prop="dutyNow" label="当前值班人"></el-table-column>
              <el-table-column prop="dutyToday" label="当日值班安排"></el-table-column>
              <el-table-column prop="remark" label="值班记录"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                layout="total, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="值班计划" name="second">
          <el-form :model="form">
            <div class="flex">
              <el-form-item label="岗位部门" :label-width="formLabelWidth">
                <el-select
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
                <el-select class="input-width" v-model="value" filterable placeholder="岗位">
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
              <el-select class="input-width" v-model="value" filterable placeholder="值班人">
                <el-option
                  v-for="item in person"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="footer">
            <el-button>取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="值班查询" name="third">
          <div class="messages">
            <span>所属部门</span>
            <el-select class="input-width" v-model="value" filterable placeholder="请选择">
              <el-option
                v-for="item in depts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span>值班日期</span>
            <el-date-picker class="input-width" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            <el-button type="primary">查询</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'job', order: 'descending'}"
              max-height="600px"
            >
              <el-table-column prop="job" label="岗位名称" sortable width="180">{{}}</el-table-column>
              <el-table-column prop="dept" label="单位" sortable width="180"></el-table-column>
              <el-table-column prop="dutyNow" label="当前值班人"></el-table-column>
              <el-table-column prop="dutyToday" label="当日值班安排"></el-table-column>
              <el-table-column prop="remark" label="值班记录"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                layout="total, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
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
      activeName: "first",
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
          dutyToday: "8:00-20:00 王小虎<br>20:00-24:00 王小虎",
          remark: "值班正常"
        },
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          dutyToday: "8:00-20:00王小虎</br>20:00-24:00 王小虎",
          remark: "值班正常"
        },
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          dutyToday: "8:00-20:00王小虎</br>20:00-24:00 王小虎",
          remark: "值班正常"
        },
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          dutyToday: "8:00-20:00王小虎</br>20:00-24:00 王小虎",
          remark: "值班正常"
        },
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          dutyToday: "8:00-20:00王小虎</br>20:00-24:00 王小虎",
          remark: "值班正常"
        },
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          dutyToday: "8:00-20:00 王小虎<br>20:00-24:00 王小虎",
          remark: "值班正常"
        },
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          dutyToday: "8:00-20:00王小虎</br>20:00-24:00 王小虎",
          remark: "值班正常"
        },
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          dutyToday: "8:00-20:00王小虎</br>20:00-24:00 王小虎",
          remark: "值班正常"
        },
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          dutyToday: "8:00-20:00王小虎</br>20:00-24:00 王小虎",
          remark: "值班正常"
        },
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          dutyToday: "8:00-20:00王小虎</br>20:00-24:00 王小虎",
          remark: "值班正常"
        },
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          dutyToday: "8:00-20:00 王小虎<br>20:00-24:00 王小虎",
          remark: "值班正常"
        },
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          dutyToday: "8:00-20:00王小虎</br>20:00-24:00 王小虎",
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
      formLabelWidth: "120px",
      keyword: "集团",
      total: 12,
      currentPage: 1,
      multipleSelection: []
    };
  },
  created() {
    this.fetchData();
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
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(function(row) {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    callbackFunction(result) {
      alert(result + "aaa");
    },
    fetchData() {
      //获取数据
      this.total = this.tableData.length;
      // this.currentPage = res.body.curr;
      // this.tableData = res.body.data;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.fetchData(1, val);
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData(val, this.pageSize);
      // console.log(`当前页: ${val}`);
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
