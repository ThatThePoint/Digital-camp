<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>值班执勤</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="rotaInfo">
        <div class="flex">
          <el-form-item label="岗位部门" :label-width="formLabelWidth">
            <el-select clearable
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
            <el-select clearable
              class="input-width"
              v-model="gangweidetail"
              filterable
              placeholder="岗位"
              @change="selectedgangwei"
            >
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
            default-time="12:00:00"
          ></el-date-picker>--
          <el-date-picker
            v-model="rotaInfo.end"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="值班人" :label-width="formLabelWidth">
          <el-select clearable
            class="input-width"
            v-model="persons"
            filterable
            placeholder="值班人"
            @change="selectperson"
          >
            <el-option
              v-for="item in person"
              :key="item.tid"
              :label="item.name"
              :value="item.tid"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelPlan">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="container" ref="print">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="值班查询" name="third">
          <el-button class="addduty" @click="addduty">增加值班</el-button>
          <div class="messages">
            <span>所属部门</span>
            <el-select clearable class="input-width" v-model="dept" filterable placeholder="请选择">
              <el-option
                v-for="item in deptOptions"
                :key="item.tid"
                :label="item.name"
                :value="item.tid"
              ></el-option>
            </el-select>
            <span>值班日期</span>
            <el-date-picker class="input-width" v-model="dutyDate" type="date" placeholder="选择日期"></el-date-picker>
            <el-button type="primary" @click="getdatatwo(true)">查询</el-button>
          </div>
          <div class="body">
            <el-table
              :data="searchtableData"
              style="width: 100%"
              :default-sort="{prop: 'job', order: 'descending'}"
            >
              <el-table-column prop="posiName" label="岗位名称" sortable width="180"></el-table-column>
              <el-table-column prop="dept" label="单位" sortable width="180"></el-table-column>
              <el-table-column prop="dutyPerson" label="当前值班人"></el-table-column>
              <el-table-column prop="startTime" label="起始时间"></el-table-column>
              <el-table-column prop="endTime" label="截至时间"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChangetwo"
                :current-page.sync="currentPage1"
                layout="total, prev, pager, next"
                :total="counttwo"
                :page-size="10"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Print from '../../../api/Print'
import Vue from 'vue'
Vue.use(Print)
export default {
  name: "rota",
  data() {
    return {
      flagon: true,
      dialogVisible: false,
      deptOptions: [], //部门下拉框数据源
      countone: 0, //数据总条数
      counttwo: 0,
      pageNum: 1, //值班执勤分页页数
      search_page: 1, //值班查询页数
      currentPage1: 1, //分页选中当前页，感觉这个参数没意义，先别删
      dept: "", //所属部门
      dutyDate: "", //值班日期
      rotaInfo: {
        //start : 'Tue Nov 07 2019 22:38:00 GMT+0800 (中国标准时间)',可以赋值
        start: "",
        end: "",
      },
      persons: "", //值班人
      gangweidetail: "", //岗位值
      gangwei: "", //岗位部门值
      jobDatalist: [], //保存岗位的临时数组
      personlist: [], //保存人员的临时数组
      searchtableData: [], //值班查询
      activeName: "third",
      depts: [], //岗位部门
      jobs: [], //岗位
      person: [], //r人员列表
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
      formLabelWidth: "120px",
      posiId: "", //传给后台保存用的岗位id
      staffId: "", //传给后台保存用的人员id
      tid: "", //修改时带过来的
      flaghand: false
    };
  },
  created() {
    this.getdatatwo(true);
  },
  methods: {
    print(){
      this.$print(this.$refs.print)
    },
    addduty(){
      this.tid="";
      this.dialogVisible = true
      this.gangwei = '';
      this.gangweidetail = '';
      this.jobDatalist = [];
      this.personlist = [];
      this.depts = [];
      this.getdatathree()
      this.flagon = false
      this.flaghand = false
    },
    handleClose(done){
      this.dialogVisible = false
        
    },

    //获取值班人id
    selectperson() {
      this.staffId = this.persons;
    },
    //岗位变化事获取id
    selectedgangwei() {
      this.posiId = this.gangweidetail;
    },
    //保存值班计划
    confirm() {
      let data = {
        tid: this.tid,
        posiId: this.posiId,
        staffId: this.staffId,
        start: this.rotaInfo.start,
        end: this.rotaInfo.end
      };
      let _this = this;
      this.postAxios("/DailyOffice/SaveRotaInfo", data)
        .then(res => {
          if (res.status) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.rotaInfo.start='';
            this.rotaInfo.end='';
            this.persons="";
            // this.tid = row.tid;
            this.getdatatwo()
          } else {
            this.$message({
              message: "保存失败",
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
        this.dialogVisible = false
      // if(this.flagon == true){
      //   this.activeName = "third"
      // }else{
      //   this.activeName="first";
      // }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.jobDatalist = [];
      this.personlist = [];
      this.searchtableData = [];
      this.tableData = [];
      this.depts = [];
      this.jobs = [];
      this.person = [];
      this.pageNum = val;
      this.getdataone();
    },
    //值班查询改变页码
    handleCurrentChangetwo(val) {
      this.jobDatalist = [];
      this.personlist = [];
      this.searchtableData = [];
      this.tableData = [];
      this.depts = [];
      this.jobs = [];
      this.person = [];
      this.search_page = val;
      this.getdatatwo();
    },
    //值班执勤分页
    getdataone() {
      let data = {
        pageNum: this.pageNum,
        pageSize: 10
      };
      let _this = this;
      this.postAxios("/DailyOffice/JobRota", data)
        .then(res => {
          _this.tableData = res.list;
          _this.countone = res.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //值班查询分页
    getdatatwo(flag) {
      if(flag==true){
        this.currentPage1 = 1
      }

      let data = {
        currentPage: 1,
        pageNum: 1,
        where: this.dept,
        dutyDate:this.dutyDate,
        pageNum: this.search_page,
        pageSize: 10
      };
      let _this = this;
      this.postAxios("/DailyOffice/RotaList", data)
        .then(res => {
          _this.counttwo = res.count
          _this.searchtableData = res.list;
          _this.deptOptions = res.deptOptions;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //选择岗位部门切换岗位
    selected() {
      this.jobs = [];
      this.person = [];
      this.gangweidetail = "";
      this.persons = "";
      for (let i = 0; i < this.jobDatalist.length; i++) {
        if (this.gangwei == this.jobDatalist[i].parentId) {
          this.jobs.push(this.jobDatalist[i]);
        }
      }
      for (let i = 0; i < this.personlist.length; i++) {
        if (this.gangwei == this.personlist[i].parentId) {
          this.person.push(this.personlist[i]);
        }
      }
    },
    formatter(row, column) {
      return row.address;
    },
    // handledel(){
    //   let _this = this;
    //   this.postAxios("/DailyOffice/RotaInfo", {tid: row.tid})
    //     .then(res => {
    //       _this.jobDatalist = res.jobData;
    //       _this.personlist = res.dutyStaff;
    //       _this.staffId = res.rotaInfo.dutyPerson
    //       _this.posiId  = res.rotaInfo.dutyPosition
    //       for (let i = 0; i < res.jobData.length; i++) {
    //         if ( res.jobData[i].parentId == "" || res.jobData[i].parentId == null ) {
    //           _this.depts.push(res.jobData[i]);
    //         }
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    //值班查询编辑
    handleEdit(index, row) {
      this.gangwei = ''
      this.gangweidetail = ''
      this.persons = ''
      this.jobDatalist = [];
      this.personlist = [];
      this.depts = [];
      // this.flagon = true
      this.flaghand = true
      this.dialogVisible = true
      this.gangwei = row.dept;
      this.gangweidetail = row.posiName
      this.persons = row.dutyPerson;
      this.rotaInfo.start = new Date(Date.parse(row.startTime.replace(/-/g, "/")));
      this.rotaInfo.end = new Date(Date.parse(row.endTime.replace(/-/g, "/")));
      this.tid = row.tid;
      let _this = this;
      debugger
      this.postAxios("/DailyOffice/RotaInfo", {tid: row.tid})
        .then(res => {
          _this.jobDatalist = res.jobData;
          _this.personlist = res.dutyStaff;
          _this.staffId = res.rotaInfo.dutyPerson
          _this.posiId  = res.rotaInfo.dutyPosition
          for (let i = 0; i < res.jobData.length; i++) {
            if ( res.jobData[i].parentId == "" || res.jobData[i].parentId == null ) {
              _this.depts.push(res.jobData[i]);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancelPlan(){
      this.dialogVisible = false
      
      // if(this.flagon == true){
      //   this.activeName = "third"
      // }else{
      //   this.activeName="first";
      // }
      this.getdataone();
      this.rotaInfo.start='';
      this.rotaInfo.end='';
      this.persons="";
    },
    handleDelete(index, row) {
      if(!confirm("确定要删除吗？")){
        return false;
      }
      this.postAxios("/DailyOffice/DeleteRotaInfo", {tid:row.tid})
        .then(res => {
          if (res.status==1) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getdatatwo();
          } else {
            this.$message({
              message: "删除失败",
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getdatathree(){
        let data = {
          pageNum: 1,
          pageSize: 10
        };
        let _this = this;
        this.postAxios("/DailyOffice/RotaInfo", data)
          .then(res => {
            _this.jobDatalist = res.jobData;
            _this.personlist = res.dutyStaff;
            for (let i = 0; i < res.jobData.length; i++) {
              if ( res.jobData[i].parentId == "" || res.jobData[i].parentId == null ) {
                _this.depts.push(res.jobData[i]);
              }
            }
            if(_this.flaghand == true){
              console.log(_this.gangwei,_this.depts)
            }
          })
          .catch(err => {
            console.log(err);
          });
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.jobDatalist = [];
      this.personlist = [];
      this.searchtableData = [];
      this.tableData = [];
      this.depts = [];
      this.jobs = [];
      this.person = [];
      let index = tab.index;
      if (index == 0) {
        this.getdataone();
      } else if (index == 1) {
        
        this.getdatatwo();
      } 
    }
  }
};
</script>
<style scoped>
.addduty{
  margin-right: 20px;
  float: right;
}
.input-width {
  width: 180px;
  margin: 0 10px;
}
.messages {
}
.dialog-footer {text-align: center}
.flex {
  display: flex;
}
</style>
