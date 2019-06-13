<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>请假外出管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="body">
        <el-form :model="form" label-width="130px">
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
                <!-- <el-input type="text" v-model="postname" @focus="focus"></el-input> -->
                <el-select clearable v-model="form.selectedStaffIdList" placeholder="请选择">
                  <el-option
                    v-for="item in form.staffList"
                    :label="item.name"
                    :value="item.id"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="请假事由">
                <el-select clearable v-model="form.outingType" placeholder="请选择">
                  <el-option
                    v-for="item in form.outingTypeOptions"
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
              <el-form-item label="开始时间">
                <el-date-picker
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
            <!-- <el-col :span="6">
              <el-form-item label="请假时长：">
                {{timenum}}
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="到达地点">
                <el-input v-model="form.dest"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="路途时间">
                <el-input v-model="form.roadTime"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="交通工具">
                <el-input v-model="form.transport"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="一级审批人">
                <el-select clearable v-model="form.firstApprover" placeholder="请选择">
                  <el-option
                    v-for="item in form.firstApproverList"
                    :label="item.name"
                    :value="item.tid"
                    :key="item.tid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="flex foot">
          <el-button style="margin-right:100px">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">申 请</el-button>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <span>
        <postemail v-on:confirm="confirms"/>
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
      form:{},//表单

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
    getdata(){
      var params={
       tid: this.$route.query.id
      };
      this.postAxios("/outApply/ApplyInfo",params)
        .then(res => {
          this.form=res;
        })
        .catch(err => {
          console.log(err);
      });
    },
    handleSubmit(){
      this.form.outingLength= (
          (new Date(this.form.endtime).getTime() -
            new Date(this.form.starttime).getTime()) /
          (1000 * 3600)
        ).toFixed(2) + "小时";
      var params={
       applyForm: this.form
      };
      this.postAxios("/outApply/SaveOutApplyInfo",params)
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
    },
    focus() {
      this.dialogVisible = true;
    },
    confirms(a) {
      this.postname = a;
      console.log(a);
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
