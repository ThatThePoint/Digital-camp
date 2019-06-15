<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 车辆派遣
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="车辆申请" name="first">
          <div class="body">
            <el-form :model="applyInfo">
              <div class="flex"></div>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="使用人" :label-width="formLabelWidth">
                    <el-input disabled type="input" v-model="applyInfo.applyer" class="input-width"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="司机" :label-width="formLabelWidth">
                    <el-select clearable filterable v-model="applyInfo.driverid" placeholder="请选择">
                      <el-option
                        v-for="item in applyInfo.driverList"
                        :key="item.tid"
                        :label="item.name"
                        :value="item.tid"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="起始时间" :label-width="formLabelWidth">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择日期"
                      v-model="applyInfo.starttime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="截至时间" :label-width="formLabelWidth">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择日期"
                      v-model="applyInfo.endtime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-form-item label="目的地" :label-width="formLabelWidth">
                    <el-input type="input" v-model="applyInfo.destination" class="input-width"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="里程" :label-width="formLabelWidth">
                    <el-input type="input" v-model="applyInfo.mileage" class="input-width"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="申请车辆" :label-width="formLabelWidth">
                    <el-select clearable v-model="applyInfo.carid" placeholder="请选择">
                      <el-option
                        v-for="item in applyInfo.carList"
                        :key="item.tid"
                        :label="item.name"
                        :value="item.tid"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="调度员" :label-width="formLabelWidth">
                    <el-select
                      clearable
                      v-model="applyInfo.dispatcherid"
                      placeholder="请选择"
                      style="margin-left:10px;"
                    >
                      <el-option
                        v-for="item in applyInfo.dispatcherList"
                        :key="item.tid"
                        :label="item.name"
                        :value="item.tid"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="事由" :label-width="formLabelWidth">
                    <el-input
                      class="input-width"
                      placeholder
                      v-model="applyInfo.reason"
                      type="textarea"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input
                      class="input-width"
                      placeholder
                      v-model="applyInfo.remark"
                      type="textarea"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelApply">取 消</el-button>
              <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="车辆调度" name="second">
          <div class="messages">
            <el-form :inline="true" :model="param" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="param.carId" placeholder="申请车辆">
                  <el-option
                  v-for="item in carOptions"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'applytime', order: 'descending'}"
            >
              <el-table-column prop="licensePlate" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="applyer" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="applyerDeptName" label="用车部门" sortable width="100"></el-table-column>
              <el-table-column prop="reason" label="用车事由" sortable width="200"></el-table-column>
              <el-table-column prop="applytime" label="申请时间" sortable width="160"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleDetail(scope.row.tid)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待审批车辆" name="fourth">
          <div class="messages">
            <el-form :inline="true" :model="param" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="param.carId" placeholder="申请车辆">
                  <el-option
                  v-for="item in carOptions"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'applytime', order: 'descending'}"
            >
              <el-table-column prop="licensePlate" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="applyer" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="applyerDeptName" label="用车部门" sortable width="100"></el-table-column>
              <el-table-column prop="reason" label="用车事由" sortable width="200"></el-table-column>
              <el-table-column prop="applytime" label="申请时间" sortable width="160"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleDetail(scope.row.tid)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已审批车辆" name="fifth">
          <div class="messages">
            <el-form :inline="true" :model="param" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="param.carId" placeholder="申请车辆">
                  <el-option
                  v-for="item in carOptions"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'applytime', order: 'descending'}"
            >
              <el-table-column prop="licensePlate" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="applyer" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="applyerDeptName" label="用车部门" sortable width="100"></el-table-column>
              <el-table-column prop="reason" label="用车事由" sortable width="200"></el-table-column>
              <el-table-column prop="applytime" label="申请时间" sortable width="160"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleDetail(scope.row.tid)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="进行中车辆" name="sixth">
         <div class="messages">
            <el-form :inline="true" :model="param" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="param.carId" placeholder="申请车辆">
                  <el-option
                  v-for="item in carOptions"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'applytime', order: 'descending'}"
            >
              <el-table-column prop="licensePlate" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="applyer" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="applyerDeptName" label="用车部门" sortable width="100"></el-table-column>
              <el-table-column prop="reason" label="用车事由" sortable width="200"></el-table-column>
              <el-table-column prop="applytime" label="申请时间" sortable width="160"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleDetail(scope.row.tid)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="未批车辆" name="seventh">
          <div class="messages">
            <el-form :inline="true" :model="param" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="param.carId" placeholder="申请车辆">
                  <el-option
                  v-for="item in carOptions"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'applytime', order: 'descending'}"
            >
              <el-table-column prop="licensePlate" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="applyer" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="applyerDeptName" label="用车部门" sortable width="100"></el-table-column>
              <el-table-column prop="reason" label="用车事由" sortable width="200"></el-table-column>
              <el-table-column prop="applytime" label="申请时间" sortable width="160"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-dialog :visible.sync="applyDialogFormVisible">
        <el-form :model="applyInfo" ref="applyInfo" label-width="100px">
          <div class="second-title">申请信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请单号">
                <label>{{applyInfo.code}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用车人">
                <label>{{applyInfo.applyer}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用车部门">
                <label>{{applyInfo.applyerDeptName}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="用车开始时间">
                <label>{{applyInfo.starttime}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用车结束时间">
                <label>{{applyInfo.endtime}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请时间">
                <label>{{applyInfo.applytime}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="路线目的地">
                <label>{{applyInfo.destination}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请车辆">
                <label>{{applyInfo.licensePlate}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请司机">
                <label>{{applyInfo.driverName}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="申请事由">
                <label>{{applyInfo.reason}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="备注">
                <label>{{applyInfo.remark}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="second-title">调度信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="调度结果">
                <el-radio-group :disabled="dispatchDetailDisabled" v-model="dispatchResult">
                            <el-radio :label=1>同意</el-radio>
                            <el-radio :label=0>退回</el-radio>
                        </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调度人">
                <label>{{applyInfo.dispatcherName}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调度时间">
                <label>{{applyInfo.dispatchTime}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="调度车辆">
                <el-select clearable :disabled="dispatchDetailDisabled" v-model="applyInfo.carid" placeholder="调度车辆">
                  <el-option
                  v-for="item in carOptions"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调度司机">
                <el-select clearable :disabled="dispatchDetailDisabled" v-model="applyInfo.driverid" placeholder="调度司机">
                  <el-option
                  v-for="item in applyInfo.driverList"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审批人">
                <el-select clearable :disabled="dispatchDetailDisabled" v-model="applyInfo.approverid" placeholder="审批人">
                  <el-option
                  v-for="item in applyInfo.approverList"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-show="approvalDetail">
            <div class="second-title">审批信息</div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="审批人">
                  <label>{{applyInfo.approver}}</label>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <label>{{applyInfo.approverRemark}}</label>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="审批意见">
                  <el-input :disabled=approvalDetailDisabled v-model="applyInfo.approverRemark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelDetail">取消</el-button>
          <el-button @click="dispatchApply">提交</el-button>
          <el-button @click="passApproval">通过</el-button>
          <el-button @click="rejectApproval">退回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "carDispatch",
  data() {
    return {
      ///新数据-----------
      applyInfo: {},
      param:{
        carId:""
      },
      carOptions:[],
      activeName: "first",
      tableData: [],
      count:0,
      applyDialogFormVisible:false, //申请信息弹窗
      approvalDetail:true, //审批详情
      dispatchResult:1, //调度结果
      dispatchDetailDisabled:false,
      approvalDetailDisabled:false,

      ///新数据-----------

      
      form:{},
      secondFormVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getApplyInfo();
  },
  methods: {
    //以下====新
    search(){},
    getApplyInfo(id) {
      this.postAxios("/CarApply/ApplyInfo", {tid:id})
        .then(res => {
          console.log(res);
          this.applyInfo = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      var params = {
        info: this.applyInfo
      };
      this.postAxios("/CarApply/SaveApplyInfo", params)
        .then(res => {
          alert("保存成功");
          //保存成功重新加载表单
          //this.getApplyInfo();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //取消申请
    cancelApply() {
      this.getApplyInfo();
    },
    //获取列表数据
    getTableData(num,size){
      var canshu={
        tab:this.activeName,
        carId:this.param.carId,
        pageNum : num, 
        pageSize : size
      };
      this.postAxios("/CarApply/SearchCarApply", canshu)
        .then(res => {
          console.log(res);
          this.tableData=res.data;
          this.count=res.count;
          this.carOptions=res.carOptions;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //tab切换事件
    handleClick(tab, event) {
      console.log(tab, event);
      if(this.activeName!="first")
      {
        this.getTableData();
      }
    },
    handleDetail(tid){
      this.getApplyInfo(tid);
      //0-待调度 1-调度退回 2-待审批,3-已批准, 4-审批退回
      if(this.applyInfo.applystatus==0){//0-待调度
        this.approvalDetail=false;
        this.dispatchDetailDisabled=false;
      }else if(this.applyInfo.applystatus==1){//1-调度退回
        this.approvalDetail=false;
        this.dispatchDetailDisabled=true;
      }else if(this.applyInfo.applystatus==2){//2-待审批
        this.approvalDetail=true;
        this.dispatchDetailDisabled=true;
        this.approvalDetailDisabled=false;
      }else if(this.applyInfo.applystatus==3){//3-已批准
        this.approvalDetail=true;
        this.dispatchDetailDisabled=true;
        this.approvalDetailDisabled=true;
      }else{//4-审批退回
        this.approvalDetail=true;
        this.dispatchDetailDisabled=true;
        this.approvalDetailDisabled=true;
      }
      this.applyDialogFormVisible=true;
    },
    //关闭详情
    cancelDetail(){
      this.applyDialogFormVisible=false;
      this.applyInfo={};
    },
    //提交调度
    dispatchApply(){
      if(this.dispatchResult){//调度通过
        var appFlag=this.$utils.isEmpty(this.applyInfo.approverid);
        var carFlag=this.$utils.isEmpty(this.applyInfo.carid);
        var driverFlag=this.$utils.isEmpty(this.applyInfo.driverid);
        if(appFlag || carFlag || driverFlag){
          alert("请选择调度车辆、司机、审批人！");
          return false;
        }
      }
      var da={
        tid:this.applyInfo.formId,
        approvalStatus:this.dispatchResult,
        nexapproverid:this.applyInfo.approverid
      };
      this.postAxios("/CarApply/SaveApproval", da)
        .then(res => {
          console.log(res);
          if(res.status){
            this.applyDialogFormVisible=false;
          }else{
            alert(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //审批通过
    passApproval(){

    },
    //审批退回
    rejectApproval(){

    },
    //以上====新

    formatter(row, column) {
      return row.address;
    }
  }
};
</script>
<style scoped>
.input-width {
  width: 180px;
  margin: 0 10px;
}
.second-title {
  font-size: 20px;
  font-weight: 600;
}
</style>