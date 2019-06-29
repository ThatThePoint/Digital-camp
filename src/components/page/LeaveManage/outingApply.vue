<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>请假外出管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="body">
        <el-form :model="form" label-width="130px" style="width:2000px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="操作人">{{form.applyer}}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="部门">{{form.applyerDept}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="请假人">
                <el-input 
                  v-model="form.selectedStaffNameList"  
                  placeholder="请输入关键词"   
                  style="width:300px"         
                  @focus="focus"                  
                  >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="请假事由">
                <el-select clearable v-model="form.outingTypeOptions" placeholder="请选择">
                  <el-option
                    v-for="item in outingTypeOptions"
                    :label="item.name"
                    :value="item.code"
                    :key="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="开始时间" >
                <el-date-picker style="width:300px"
                  v-model="form.startTime"
                  type="datetime"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="form.endTime"
                  type="datetime"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="到达地点">
                <el-input v-model="form.dest" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="路途时间">
                <el-input v-model="form.roadTime" style="width: 220px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="一级审批人">
                <el-select clearable v-model="form.firstApprover" style="width:300px" placeholder="请选择">
                  <el-option
                    v-for="item in firstApproverList"
                    :label="item.name"
                    :value="item.tid"
                    :key="item.tid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="交通工具">
                <el-input v-model="form.transport" style="width: 220px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="flex foot">
          <el-button style="margin-right:100px" @click="cancel">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">申 请</el-button>
        </div>
      </div>
    </div>
<!-- 窗锁狂 -->



    <el-dialog :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <span>
        <postemail v-on:confirm="confirms" :parentlist="parentlist"/>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>




    <!-- {{starttime}}{{endtime}} -->
  </div>
</template>
<script>
import postemail from "../DailyOffice/postemail"; // 源码位置
export default {
  name: "documentManagement",
  data() {
    return {
      
      firstApproverList: [],//一级审批人
      outingTypeOptions: [],//外出事由数组
      form:{
        selectedStaffIdList:"",//接受父组件传过来的id
        applyer: '',// 操作人
        applyerDept: '',// 部门
        selectedStaffNameList: '',// 请假人
        selectedStaffIdList: '', //请假人id
        outingTypeOptions: '',//外出事由
        startTime: '',
        endTime: '',
        dest: '',//到达地点
        roadTime: '',//路途时间
        transport: '',// 交通工具
        firstApprover: '',//一级审批人
      },//表单
      parentlist:[],
      postname: "", //请假人名字
      dialogVisible: false, //控制穿梭框显示
      formLabelWidth: "120px"
    };
  },
  components: {
    postemail
  },
  computed: {
    timenum:function() {
      return (
        (
          (new Date(this.form.endtime).getTime() -
            new Date(this.form.starttime).getTime()) /
          (1000 * 3600)
        ).toFixed(2) + "小时"
      );
    }
  },
  created(){
    this.getdata();
  },
  methods: {
    getTree(data){
      let map = {};
      let val = [];
      //生成数据对象集合
      data.forEach(it=>{
        delete it.children;
        map[it.id] = it;
      })
      //生成结果集
      data.forEach(it=>{
          const parent = map[it.pid];
          if(parent){
              if(!Array.isArray(parent.children)) parent.children = [];
              parent.children.push(it);
          }else{
              val.push(it);
          }
      })
      return val;
    },
    getdata(){
      var params={
       tid: this.$route.query.id
      };
      this.postAxios("/outApply/ApplyInfo",params)
        .then(res => {
          
          console.log("11111111111111",this.form)
          this.form.applyer = res.applyer
          this.form.applyerDept = res.applyerDept
          this.outingTypeOptions = res.outingTypeOptions
          this.firstApproverList = res.firstApproverList
          this.parentlist = this.getTree(res.staffList)
        })
        .catch(err => {
          console.log(err);
      });
    },
    cancel(){

    },
    handleSubmit(){
      this.form.outingLength= (
        (new Date(this.form.endtime).getTime() -
        new Date(this.form.starttime).getTime()) /
        (1000 * 3600)
        ).toFixed(2) + "小时";
        console.log("!111111111",this.form)
        let flag
        for(let i in this.form){
          if(this.form[i] == ''){
            this.$message("所有项都为必填项")
            flag = false
          }else{
            flag = true
          }
        }
        if(flag){
          this.postAxios("/outApply/SaveOutApplyInfo",{applyForm:this.form})
            .then(res => {
            if(res.status==1){
            alert("保存成功");
            this.form={};
            this.getdata();
            }
          })
          .catch(err => {
          console.log(err);
          });
        }

    },
    focus() {
      this.dialogVisible = true;
    },
    confirms(a) {
      this.form.selectedStaffNameList = a[0]
      this.form.selectedStaffIdList = a[1]
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    cancel() {
      this.dialogVisible = false;
    },
    confirm(info) {
      console.log(info);
      this.dialogVisible = false;
    },
    formatter(row, column) {
      return row.address;
    },
    onSubmit() {
      console.log("submit!");
    }
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
.foot {
  justify-content: center;
  margin-top: 100px;
}
.input-widths {
  width: 350px;
}
.person {
  padding-left: 52px;
  margin-bottom: 10px;
  text-align: left;
}
.persons {
  font-size: 14px;
  color: #606266;
}
.el-form-item__content::after,
.el-form-item__content::before {
  display: table;
  content: "";
  width: 50px !important;
}
</style>
