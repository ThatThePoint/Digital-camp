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
              :default-sort="{prop: 'posiName', order: 'descending'}"
            >
              <el-table-column prop="posiName" label="岗位名称" sortable width="180">{{}}</el-table-column>
              <el-table-column prop="dept" label="单位" sortable width="180"></el-table-column>
              <el-table-column prop="curDuty" label="当前值班人"></el-table-column>
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
                    v-model="gangwei"
                    filterable
                    placeholder="所属部门"
                    @change="selected"
                  >
                    <el-option
                      v-for="item in depts"
                      :key="item.tid"
                      :label="item.name"
                      :value="item.tid"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="岗位" :label-width="formLabelWidth">
                  <el-select class="input-width" v-model="gangweidetail" filterable placeholder="岗位">
                    <el-option
                      v-for="item in jobs"
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
                <el-select class="input-width" v-model="persons" filterable placeholder="值班人">
                  <el-option
                    v-for="item in person"
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
              :data="searchtableData"
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
      persons: "",//值班人
      gangweidetail: '',//岗位值
      gangwei: '',//岗位部门值
      jobDatalist: [],//保存岗位的临时数组
      personlist: [],//保存人员的临时数组
      searchtableData: [],//值班查询
      value3:"",
      value4:"",
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
      depts: [],//岗位部门
      jobs: [],//岗位
      person: [],//r人员列表
      value: "",
      tableData: [],
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
  created(){
    let data = {
      pageNum : 1,
      pageSize : 25
    }
    let _this = this;
    this.postAxios("/DailyOffice/JobRota",data)
      .then(res => {
        _this.tableData = res.list
      })
      .catch(err => {
        console.log(err);
    });
  },
  methods: {
    //选择岗位部门切换岗位
    selected(){
      this.jobs = []
      this.person = []
      this.gangweidetail = ''
      this.persons = ''
      for( let i = 0;i < this.jobDatalist.length; i++){
        if(this.gangwei == this.jobDatalist[i].parentId){
          this.jobs.push(this.jobDatalist[i])
        }
      }
      for( let i = 0;i < this.personlist.length; i++){
        if(this.gangwei == this.personlist[i].parentId){
          this.person.push(this.personlist[i])
        }
      }
    },   
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {

    },
    handleDelete(index, row) {

    },
    handleClick(tab, event) {
      this.jobDatalist = []
      this.personlist = []
      this.searchtableData = []
      this.tableData = []
      this.depts = []
      this.jobs = []
      this.person = []
      let index = tab.index
      if(index == 0){
        let data = {
          pageNum : 1,
          pageSize : 25
        }
        let _this = this;
        this.postAxios("/DailyOffice/JobRota",data)
          .then(res => {
            _this.tableData = res.list
          })
          .catch(err => {
            console.log(err);
        });
      }else if(index == 1){
        let data = {
          pageNum : 1,
          pageSize : 25
        }
        let _this = this;
        this.postAxios("/DailyOffice/RotaInfo",data)
          .then(res => {
            _this.jobDatalist = res.jobData;
            _this.personlist = res.dutyStaff
            for(let i =0;i < res.jobData.length;i++){
              if(res.jobData[i].parentId == '' || res.jobData[i].parentId == null){
                _this.depts.push(res.jobData[i])
              }
            }
          })
          .catch(err => {
            console.log(err);
        });
      }else if(index == 2){
        let data = {
          pageNum : 1,
          pageSize : 25
        }
        let _this = this;
        this.postAxios("/DailyOffice/RotaList",data)
          .then(res => {
            _this.searchtableData = res.list
          })
          .catch(err => {
            console.log(err);
        });

      }
    },
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
