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
          </div>
        </el-tab-pane>
        <el-tab-pane label="值班计划" name="second">
            <el-form :model="rotaInfo">
              <div class="flex">
                <el-form-item label="岗位部门" :label-width="formLabelWidth">
                  <el-select
                    label="部门"
                    class="input-width"
                    v-model="rotaInfo.deptId"
                    filterable
                    placeholder="所属部门"
                  >
                    <el-option
                      v-for="item in deptOptions"
                      :key="item.tid"
                      :label="item.name"
                      :value="item.tid"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="岗位" :label-width="formLabelWidth">
                  <el-select class="input-width" v-model="rotaInfo.posiId" filterable placeholder="岗位">
                    <el-option
                      v-for="item in jobOptions"
                      :key="item.tid"
                      :label="item.name"
                      :value="item.tid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item label="值班时间" :label-width="formLabelWidth">
                    <el-date-picker
                      v-model="rotaInfo.start"
                      type="datetime"
                      placeholder="选择日期时间"
                      default-time="12:00:00">
                    </el-date-picker>--
                    <el-date-picker
                      v-model="rotaInfo.end"
                      type="datetime"
                      placeholder="选择日期时间"
                      default-time="12:00:00">
                    </el-date-picker>
              </el-form-item>
              <el-form-item label="值班人" :label-width="formLabelWidth">
                <el-select class="input-width" v-model="rotaInfo.staffId" filterable placeholder="值班人">
                  <el-option
                    v-for="item in personOptions"
                    :key="item.tid"
                    :label="item.name"
                    :value="item.tid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="footer">
              <el-button >取 消</el-button>
              <el-button type="primary">确 定</el-button>
            </div>
        </el-tab-pane>
        <el-tab-pane label="值班查询" name="third">
              <div class="messages">
            <span>所属部门</span>
            <el-select class="input-width" v-model="dept" filterable placeholder="请选择">
              <el-option
                v-for="item in deptOptions"
                :key="item.tid"
                :label="item.name"
                :value="item.tid"
              ></el-option>
            </el-select>
            <span>值班日期</span>
              <el-date-picker class="input-width" v-model="dutyDate" type="date" placeholder="选择日期"></el-date-picker>
            <el-button type="primary">查询</el-button>
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
              <el-table-column prop="dutyToday" label="当日值班安排"></el-table-column>
              <el-table-column prop="remark" label="值班记录"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "rota",
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
      deptOptions: [], //部门下拉框数据源
      jobOptions: [],  //值班岗位下拉框数据源
      personOptions: [],
      tableData: [
        {
          job: "门卫",
          dept: "保卫处",
          dutyNow: "王小虎",
          dutyToday: "8:00-20:00 王小虎<br>20:00-24:00 王小虎",
          remark: "值班正常"
        }
      ],
      dutyDate:"", //值班时间筛选项
      rotaInfo: {  //新增/修改 值班信息
        deptId:"",//不用传给后台
        tid:"",
        posiId:"", // 岗位id
        staffId:"", // 值班人id
        start:"", // 开始时间
        end:""  //结束时间
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
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
