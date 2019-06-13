<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 新增维护记录
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">


      <!-- <div class="header-container">
        <div class="carImg">车辆照片</div>
        <div class="carDet">
          <div class="license">
            所属单位
            <el-input class="input-width" placeholder="车牌号" value="警卫连" disabled></el-input>
          </div>
          <div class="cars">
            车辆品牌：
            <el-input class="input-width" value="大众" disabled></el-input>车辆型号：
            <el-input class="input-width" value="大众" disabled></el-input>
            <span class="colors">颜色：</span>
            <el-input class="input-width" value="红色" disabled></el-input>行驶证号：
            <el-input class="input-width" value="DSK88339" disabled></el-input>
          </div>
          <div class>
            车辆座位：
            <el-input class="input-width" value="4座" disabled></el-input>车辆载重：
            <el-input class="input-width" value="2吨" disabled></el-input>车架号：
            <el-input class="input-width" value="123" disabled></el-input>发动机号：
            <el-input class="input-width" value="123" disabled></el-input>
          </div>
        </div>
      </div> -->


      <div class="footer">
        <div>
          <div>维修保养信息：</div>
            <div class="itemDet">
              维护车辆：
              <el-select style="width:200px;margin-right:20px;"  v-model="ruleForm.carId" placeholder="选择车辆">
                <el-option
                  v-for="item in selectCar"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
              </el-select>
              <br/>
              <br/>
              维护类型：
              <el-select style="width:200px; margin-right: 20px;" v-model="ruleForm.careTypeCode" placeholder="保养类型"  @change="getProvince" id="province">
                <el-option
                  v-for="item in careType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
              <el-input  placeholder="经办人" v-model="ruleForm.careOperatorName" style="width:200px;margin-right:20px;display:inline-block;"></el-input>
            </div>
            <div class="itemDet">
              维修日期：
              <el-date-picker class="input-width" v-model="ruleForm.operateDate" type="date" placeholder="选择日期" style="width:150px;margin-right:20px;"></el-date-picker>
              <el-input type="textarea" class="wenben" v-model="ruleForm.note"></el-input>
            </div>
        </div>
      </div>
      <div class="flex-center submit">
        <el-button type="danger" @click="cancel">取消</el-button>
        <el-button type="success" style="margin-left:40px;" @click="savedata">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "documentManagement",
  data() {
    return {
      selectCar : [],//车辆类型
      careType:[],//维护类型
      property:"",
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
      ruleForm: {
        carId:"",//车辆id 
        careTypeCode: "",//维护类型
        operateDate: "",//维修日期
        note: "",//备注
        careOperatorName: "",//经办人
        careTypeName :"",
        tid : ""
      },
      rules: {
        name: [
          { required: true, message: "请输入经办人", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择保养类型", trigger: "change" }
        ],
        value2: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        value1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
      },
      value1: "",
      value2: "",
      input2: "",
      departmentOptions: [
        {
          value: "1",
          label: "连队1"
        },
        {
          value: "2",
          label: "连队2"
        },
        {
          value: "3",
          label: "连队3"
        },
        {
          value: "4",
          label: "连队4"
        }
      ],
      propertyOptions: [
        {
          value: "1",
          label: "内部车辆"
        },
        {
          value: "2",
          label: "外部车辆"
        },
        {
          value: "3",
          label: "临时车辆"
        }
      ],
      inoutOptions: [
        {
          value: "1",
          label: "日常保养"
        },
        {
          value: "2",
          label: "顺坏维修"
        },
        {
          value: "3",
          label: "。。。"
        }
      ],
      propertyValue: "",
      departmentValue: "",
      inoutValue: "",
      tableData: []
    };
  },
  created(){
    if(this.$route.query.row){
      console.log(this.$route.query.row)
      this.ruleForm.tid = this.$route.query.row.tid
    }
    this.getselectData(this.ruleForm)
  },
  methods: {
    getProvince(){
      let str = this.ruleForm.careTypeCode;
      for ( let i = 0;i < this.careType.length; i++){
        if(str == this.careType[i].code)
          this.ruleForm.careTypeName = this.careType[i].name
      }
      console.log(this.ruleForm.careTypeName)
    },
    //获取下拉框内容
    getselectData(data){
      let _this = this;
      this.postAxios("/CarInfo/GetCareRecord",data)
        .then(res => {
          console.log(res)
          // _this.tableData = res.careList;
          _this.selectCar = res.carOptions
          _this.careType = res.careTypeOptions;
          // _this.ruleForm = res.info
          console.log(res)
        })
        .catch(err => {
          console.log(err);
      });
    },
    //保存
    savedata(){
      let info = this.ruleForm
      let _this = this;
      this.postAxios("/CarInfo/SaveCareRecord",info)
        .then(res => {
          console.log(res)
          if(res.status == 1){
            _this.$message.success("保存成功")
            _this.$destroy('AddCare')
            _this.$router.push({path: '/CarCare'})
          }
        })
        .catch(err => {
          console.log(err);
      });


      // this.$destroy('AddCare')
      // this.$router.push({path: '/CarCare'})
    },
    //取消
    cancel(){
      this.$destroy('AddCare')
      this.$router.push({path: '/CarCare'})
    },
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       history.go(-1);
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addCar() {
      this.$router.push({ path: "/addcare" });
      // router.push({ path: '/addcar' })
    }
  }
};
</script>
<style scoped>
.input-width{
  width: 150px;
}
.input-width {
  width: 100px;
  margin: 0 10px;
}
.header-container {
  display: flex;
}
.carImg {
  margin-top: 20px;
  width: 100px;
  height: 120px;
  vertical-align: middle;
  border: 1px solid;
  text-align: center;
  line-height: 120px;
}
.carDet {
  vertical-align: middle;
  box-sizing: border-box;
  padding: 24px 20px;
}
.license {
  padding: 10px 0;
}
.itemDet {
  padding: 20px 0 0 80px;
}
.upload {
  display: inline-block;
}
.wenben {
  width: 400px;
  vertical-align: top;
}
.submit {
  margin: 40px auto;
  text-align: center;
}

.used {
  display: inline-block;
  width: 40px;
  height: 20px;
  text-align: center;
  border-radius: 2px;
  color: red;
}
.cars {
  margin-bottom: 10px;
}
.colors {
  width: 68px;
  display: inline-block;
}
.fires {
  width: 75px;
  display: inline-block;
}
.itemDet[data-v-52dfd7c8] {
  padding: 20px 0 0 120px !important;
}
.wenben[data-v-52dfd7c8] {
  width: 504px;
  vertical-align: top;
}
/* .input-width[data-v-52dfd7c8]{
  margin: 0 20px 0 0 !important;
} */
</style>
