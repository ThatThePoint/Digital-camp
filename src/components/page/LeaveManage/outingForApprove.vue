<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>待审批请假</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'formcode', order: 'descending'}"
        >
          <el-table-column prop="formcode" label="请假单号"></el-table-column>
          <el-table-column prop="applyerName" label="申请人" sortable></el-table-column>
          <el-table-column prop="applyDeptName" label="申请人部门" sortable></el-table-column>
          <el-table-column prop="outingType" label="外出类型"></el-table-column>
          <el-table-column prop="startTime" label="外出时间" :formatter="starttimeFormatter"></el-table-column>
          <el-table-column prop="endTime" label="返岗时间" :formatter="endtimeFormatter"></el-table-column>
          <el-table-column prop="timeLength" label="申请时长"></el-table-column>
          <el-table-column prop="curApprovalName" label="当前审批人"></el-table-column>
          <el-table-column prop="status" label="审批状态" :formatter="statusFormatter"></el-table-column>
          <el-table-column label="操作" sortable width="300px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="count"
            :current-page.sync="currentPage"
          ></el-pagination>
        </div>
        <el-dialog title="外出申请" :visible.sync="confirmFormVisible">
          <el-form :model="form" label-width="100px" ref="form">
            <div class="second-title">申请信息</div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="申请人">
                  <label>{{form.applyer}}</label>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门">
                  <label>{{form.applyerDept}}</label>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="请假人">
                  <label>{{form.selectedStaffNameList}}</label>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="外出类型">
                  <label>{{form.outingTypeName}}</label>
                </el-form-item>
              </el-col>
               <el-col :span="8">
                <el-form-item label="请假时间">
                  <label>{{form.timeLength}}小时</label>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="开始日期">
                  <label>{{form.startTime}}</label>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结束日期">
                  <label>{{form.endTime}}</label>
                </el-form-item>
              </el-col>
            </el-row>

            <div v-show="firstApprovalInfo">
              <div class="second-title">一级审批信息</div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="审批人">
                    <label>{{form.firstApproverName}}</label>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="下一级审批人">
                  <el-select clearable v-model="form.secApprover" placeholder="审批人">
                    <el-option
                    v-for="item in form.secApproverList"
                    :key="item.tid"
                    :label="item.name"
                    :value="item.tid"
                  ></el-option>
                  </el-select>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="审批意见">
                    <el-input v-model="form.firstRemark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div v-show="secondApprovalInfo">
              <div class="second-title">二级审批信息</div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="审批人">
                    <label>{{form.secApproverName}}</label>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="下一级审批人">
                  <el-select clearable  v-model="form.thdApprover" placeholder="审批人">
                    <el-option
                    v-for="item in form.thdApproverList"
                    :key="item.tid"
                    :label="item.name"
                    :value="item.tid"
                  ></el-option>
                  </el-select>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="审批意见">
                    <el-input  v-model="form.secRemark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div v-show="thirdApprovalInfo">
              <div class="second-title">三级审批信息</div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="审批人">
                    <label>{{form.thdApproverName}}</label>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="审批意见">
                    <el-input  v-model="form.thdRemark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>



          <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancelDetail">取 消</el-button>
            <el-button @click="handlePass">通 过</el-button>
            <el-button @click="handleReject">退 回</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "outingForApproval",
  data() {
    return {
      name: "",
      form: {
        //申请单id
        tid :"",

        //申请人姓名
        applyer :"",

        //申请人部门名称
        applyerDept :"",

        //可请假人列表list
        staffList : [], 


        //已选择请假人idlist
        selectedStaffIdList :"",

        //已选择请假人名字,用小写分号';'分隔
        selectedStaffNameList :"",

        //外出事由字典
        outingTypeOptions : [], 

        //当前选择外出事由
        outingType :"",

        outingTypeName:"",

        //开始时间
        startTime :"",

        //结束时间
        endTime :"",

        //请假时长
        outingLength :"",

        //到达地点
        dest :"",

        //路途时间
        roadTime :"",

        //交通工具
        transport :"",

        //一级审批人列表
        firstApproverList : [], 

        //当前一级审批人
        firstApprover :"",

        //当前一级审批人姓名
        firstApproverName :"",

        //一级审批状态1-通过 2-退回 0-待审批
        firstStatus :0,

        //一级审批意见
        firstRemark :"",

        //二级审批人列表
        secApproverList : [],

        //当前二级审批人
        secApprover :"",

        //当前二级审批人姓名
        secApproverName :"",

        //二级审批状态 1-通过 2-退回 0-待审
        secStatus :0,

        //二级审批意见
        secRemark :"",

        //三级审批人列表
        thdApproverList :[],

        //当前三级审批人
        thdApprover :"",

        //三级审批人姓名
        thdApproverName :"",

        //三级审批状态 1-通过 2-退回 0-待审
        thdStatus :0,

        //三级审批意见
        thdRemark :"",

        //总共审批等级
        totalAppLevel :0,

        //当前节点 1-建单 2-一级审批（有二级审批） 3-一级审批（无二级审批） 4-二级审批（有三级审批）5-二级审批（无三级审批） 6-三级审批  7-归档：此时只能查看不能修改（表单退回即为归档）
        curNode :0
      },
      count: 1,
      currentPage: 1,
      confirmLeave: {},
      confirmFormVisible: false,
      tableData: [],
      //查看时显隐内容
      firstApprovalInfo:true,
      secondApprovalInfo:true,
      thirdApprovalInfo:true,
      //禁用内容
      firstAppDisabled:false,
      secondAppDisabled:false
    };
  },
  methods: {
    //  当前节点 1-建单
    //  2-一级审批（有二级审批）
    //  3-一级审批（无二级审批）
    //  4-二级审批（有三级审批）
    //  5-二级审批（无三级审批）
    //  6-三级审批
    //  7-归档：此时只能查看不能修改（表单退回即为归档）
    starttimeFormatter(row, column) {
      if (row.startTime) {
        return row.startTime.replace("T", " ");
      } else {
        return row.startTime;
      }
    },
    endtimeFormatter(row, column) {
      if (row.endTime) {
        return row.endTime.replace("T", " ");
      } else {
        return row.endTime;
      }
    },
    statusFormatter(row, colum) {
      switch (row.status) {
        case 1:
          return "待审批";
          break;
        case 2:
          return "归档";
          break;
        case 1:
          return "退回";
          break;
        case 1:
          return "草稿";
          break;
        default:
          return "待审批";
          break;
      }
    },
    // 分页导航
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
      this.getData("", val);
    },
    handleSearch() {
      this.getData(this.formInline.user);
      this.currentPage = 1;
    },
    getFormData(id) {
      this.postAxios("OutApply/ApplyInfo", { tid:id })
        .then(res => {
          this.form = res;
          console.log(res);
          //判断显隐和禁用
          if(this.form.curNode==2 ){//一级审批 有二级审批
          this.firstAppDisabled=false;
          this.firstApprovalInfo=true;
          this.secondApprovalInfo=false;
          this.thirdApprovalInfo=false;
      }else if(this.form.curNode==3){//一级审批 无二级审批
          this.firstAppDisabled=true;
          this.firstApprovalInfo=true;
          this.secondApprovalInfo=false;
          this.thirdApprovalInfo=false;
      }else if(this.form.curNode==4 ){//二级审批 有三级审批
          this.firstAppDisabled=true;
          this.secondAppDisabled=false;
          this.firstApprovalInfo=true;
          this.secondApprovalInfo=true;
          this.thirdApprovalInfo=false;
      }else if(this.form.curNode==5){//二级审批 无三级审批
          this.firstAppDisabled=true;
          this.secondAppDisabled=true;
          this.firstApprovalInfo=true;
          this.secondApprovalInfo=true;
          this.thirdApprovalInfo=false;
      }
      else{ //三级审批
          this.firstAppDisabled=true;
          this.secondAppDisabled=true;
          this.firstApprovalInfo=true;
          this.secondApprovalInfo=true;
          this.thirdApprovalInfo=true;
      }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData(approvalStatus = "0", pageNum = "1", pageSize = "10") {
      var params = {
        approvalStatus: "0",
        pageNum: "1",
        pageSize: "10"
      };
      this.postAxios("OutApply/OutingApplyList", params)
        .then(res => {
          console.log(res);
          this.count = res.count;
          this.tableData = [...res.data];
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleDetail(index, row) {
      this.getFormData(row.tid);
      this.confirmFormVisible = true;
      
    },
    handleCancelDetail(){
      this.confirmFormVisible = false;
      this.form={};
    },
    //审批通过
    handlePass(){
      let remark="";
      let nextApp="";
      let msg="";
      if(this.form.curNode==2 ){//一级审批 有二级审批
          remark=this.form.firstRemark;
          nextApp=this.form.secApprover;
          let secAppFlag = this.$utils.isEmpty(nextApp);
          if(secAppFlag){
            this.$message({
                type: "warning",
                message: "请选择下级审批人!"
              });
              return false;
          }
      }else if(this.form.curNode==3){//一级审批 无二级审批
          remark=this.form.firstRemark;
      }else if(this.form.curNode==4 ){//二级审批 有三级审批
          remark=this.form.secRemark;
          nextApp=this.form.thdApprover;
          let secAppFlag = this.$utils.isEmpty(nextApp);
          if(secAppFlag){
            this.$message({
                type: "warning",
                message: "请选择下级审批人!"
              });
              return false;
          }
      }else if(this.form.curNode==5){//二级审批 无三级审批
          remark=this.form.secRemark;
      }
      else{ //三级审批
          remark=this.form.thdRemark;
      }
      //审批信息
      let params={
        tid : this.form.tid,
        curNode :this.form.curNode,
        approvalStatus : 1,
        approvalRemark : remark,
        nextAppId : nextApp
      };
      this.postAxios("OutApply/SaveApproveInfo", params)
        .then(res => {
          console.log(res);
          if(res.status){
            this.$message({
                type: "success",
                message: "保存审批成功!"
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //审批退回
    handleReject(){
      let remark="";
      if(this.form.curNode==2 ){//一级审批 有二级审批
          remark=this.form.firstRemark;
      }else if(this.form.curNode==3){//一级审批 无二级审批
          remark=this.form.firstRemark;
      }else if(this.form.curNode==4 ){//二级审批 有三级审批
          remark=this.form.secRemark;
      }else if(this.form.curNode==5){//二级审批 无三级审批
          remark=this.form.secRemark;
      }
      else{ //三级审批
          remark=this.form.thdRemark;
      }
      //审批信息
      let params={
        tid : this.form.tid,
        curNode :this.form.curNode,
        approvalStatus : 0,
        approvalRemark : remark,
      };
      this.postAxios("OutApply/SaveApproveInfo", params)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
.input-width {
  width: 180px;
  margin: 0 10px;
}
.flex {
  display: flex;
}
.staffStatu {
  margin: 0 20px;
}
</style>
