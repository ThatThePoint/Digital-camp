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
              <el-form-item label="操作人">李云龙</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="部职别">团长</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="请假人">
                <el-input type="text" v-model="postname" @focus="focus"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="请假事由">
                <el-select clearable v-model="form.leave" placeholder="请选择">
                  <el-option
                    v-for="item in leaveOptions"
                    :label="item.value"
                    value="item.key"
                    :key="item.key"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="starttime"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="endtime"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="请假时长：">
                {{timenum}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="到达地点">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="路途时间">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="交通工具">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="一级审批人">
                <el-select clearable v-model="form.leave" placeholder="请选择">
                  <el-option
                    v-for="item in leaveOptions"
                    :label="item.value"
                    value="item.key"
                    :key="item.key"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="flex foot">
          <el-button style="margin-right:100px">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">申 请</el-button>
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
      perid:"",//接受父组件传过来的id
      parentlist:[],
      starttime: 0, //请假开始时间
      endtime: 0,
      postname: "", //请假人名字
      dialogVisible: false, //控制穿梭框显示
      leaveOptions: [
        {
          value: "出差",
          key: 1
        },
        {
          value: "休假探亲",
          key: 2
        },
        {
          value: "事假",
          key: 3
        },
        {
          value: "病假",
          key: 4
        },
        {
          value: "公休假日离开驻地",
          key: 5
        },
        {
          value: "婚假",
          key: 6
        },
        {
          value: "疗养假",
          key: 7
        },
        {
          value: "护理假",
          key: 8
        },
        {
          value: "产假",
          key: 9
        },
        {
          value: "士官离队住宿",
          key: 10
        },
        {
          value: "借调",
          key: 11
        },
        {
          value: "其他",
          key: 12
        }
      ],
      confirmLeave: {},
      confirmFormVisible: false,
      checked: "",
      value1: "",
      value2: "",
      input2: "",
      value: "",
      tableData: [
        {
          name: "李云龙",
          dept: "保卫科",
          type: "请假",
          reason: "外出有事",
          startDate: "2019-04-22",
          returnDate: "2019-04-30",
          length: "18小时",
          curApproval: "老张",
          status: "归档"
        }
      ],
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
      activities: [
        {
          content: "张主任",
          timestamp: "2018-04-15"
        },
        {
          content: "王主任",
          timestamp: "2018-04-13"
        },
        {
          content: "高首长",
          timestamp: "2018-04-11"
        }
      ]
    };
  },
  components: {
    postemail
  },
  computed: {
    timenum() {
      return (
        (
          (new Date(this.endtime).getTime() -
            new Date(this.starttime).getTime()) /
          (1000 * 3600)
        ).toFixed(2) + "小时"
      );
    }
  },
  created(){
    this.getdata()
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
      let _this = this;
      this.postAxios("/OutApply/ApplyInfo",{})
      .then(res => {
        console.log(res)
        _this.parentlist = _this.getTree(res.staffList);
        console.log(_this.parentlist)
      })
      .catch(err => {
        console.log(err);
      });
    },
    confirms(a) {
      this.postname = a[0]
      this.perid = a[1]
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    focus() {
      this.dialogVisible = true;
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
    handleEdit(index, row) {
      console.log(index, row);
      this.confirmFormVisible = true;
      this.confirmLeave = this.tableData[index];
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onSubmit() {

      // docReceiversId : this.perid,请假人的id
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
