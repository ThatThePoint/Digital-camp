<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 增加车辆
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="内部车辆" name="first">
          <div class="header-container">
            <div class="carImg">车辆照片</div>
            <div class="carDet">
              <div class="license">
                奔驰2号
                <span class="used">在用</span>
              </div>
              <div>
                车辆类型
                <el-select class="input-width" v-model="carInfo.carType" placeholder="请选择">
                  <el-option
                    v-for="item in carTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="one">
              <p>车辆基本信息：</p>
              <div class="itemDet">
                车辆品牌：
                <el-select class="input-width" v-model="carInfo.brand" placeholder="请选择">
                  <el-option
                    v-for="item in brandOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>车辆型号：
                <el-select class="input-width" v-model="carInfo.model" placeholder="请选择">
                  <el-option
                    v-for="item in modelOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <span class="color">颜色：</span>
                <el-select class="input-width" v-model="carInfo.color" placeholder="请选择">
                  <el-option
                    v-for="item in colorOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>行驶证号：
                <el-input class="input-width" placeholder="车牌号" v-model="carInfo.LicensePlate"></el-input>
                <el-button size="small" type="success">照片上传</el-button>
              </div>
              <div class="itemDet">
                车辆座位：
                <el-select class="input-width" v-model="carInfo.loadNumber" placeholder="请选择">
                  <el-option
                    v-for="item in seatOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>车辆载重：
                <el-select class="input-width" v-model="carInfo.load" placeholder="请选择">
                  <el-option v-for="item in seatOptions" :key="item.value" :value="item.value"></el-option>
                </el-select>车架号：
                <el-input class="input-width" placeholder="请输入" v-model="carInfo.frameCode"></el-input>发动机号：
                <el-input class="input-width" placeholder="请输入" v-model="carInfo.motorCode"></el-input>
              </div>
            </div>
            <div class="two">
              <p>内部车辆附加：</p>
              <div class="itemDet">
                所属单位：
                <el-select class="input-width" v-model="carInfo.ofDept" placeholder="请选择">
                  <el-option
                    v-for="item in departmentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>车辆类别1：
                <el-select class="input-width" v-model="carInfo.carType1" placeholder="请选择">
                  <el-option
                    v-for="item in propertyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <span class="carstwo">类别2：</span>
                <el-select class="input-width" v-model="carInfo.carType2" placeholder="请选择">
                  <el-option
                    v-for="item in propertyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="itemDet">
                车辆权限：
                <el-select class="input-width" v-model="carInfo.carRight" placeholder="请选择">
                  <el-option
                    v-for="item in rightOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <span class="datas">登记日：</span>
                <el-date-picker class="input-width" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>授权有效期：
                <el-date-picker class="input-width" v-model="value2" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="外部车辆/临时车辆" name="second">
          <div class="header-container">
            <div class="carImg">车辆照片</div>
            <div class="carDet">
              <div class="license">
                奔驰2号
                <span class="used">在用</span>
              </div>
              <div>
                车辆类型
                <el-select class="input-width" v-model="carInfo.carType" placeholder="请选择">
                  <el-option
                    v-for="item in inoutOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="one">
            <p>外部车辆附加：</p>
            <div class="itemDet">
              车主姓名：
              <el-input class="input-width" placeholder="请输入" v-model="carInfo.owner"></el-input>电话：
              <el-input class="input-width" placeholder="请输入" v-model="carInfo.ownerTel"></el-input>部队联系人：
              <el-input class="input-width" placeholder="请输入" v-model="carInfo.relater"></el-input>联系人部门：
              <el-select class="input-width" v-model="carInfo.relaterDept" placeholder="请选择">
                <el-option
                  v-for="item in departmentOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="itemDet">
              车辆权限：
              <el-select class="input-width" v-model="carInfo.carRight" placeholder="请选择">
                <el-option
                  v-for="item in rightOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>权限有效期
              <el-date-picker class="input-width" v-model="carInfo.rightValid" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="itemDet">
              身份证：
              <el-input class="input-width" placeholder="请输入" v-model="carInfo.ownerIdCard"></el-input>
              <el-button size="small" type="success">身份证正面上传</el-button>
              <el-button size="small" type="success">身份证背面上传</el-button>
            </div>
            <div class="itemDet">
              驾驶证：
              <el-input class="input-width" placeholder="请输入" v-model="carInfo.relaterLicensePhoto"></el-input>
              <el-button size="small" type="success">驾驶证正面上传</el-button>
              <el-button size="small" type="success">驾驶证背面上传</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="flex-center itemDet" style="margin-top:20px;">
        <el-button class="editor-btn" type="danger" @click="handleBack">取消</el-button>
        <el-button class="editor-btn" type="success" style="margin-left:40px;">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "documentManagement",
  data() {
    return {
      activeName: "first",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      departmentOptions: [
        {
          value: "1",
          label: "连队1"
        },
        {
          value: "2",
          label: "连队2"
        }
      ],
      carTypeOptions: [
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
      brandOptions: [
        {
          value: "1",
          label: "丰田"
        },
        {
          value: "2",
          label: "大众"
        },
        {
          value: "3",
          label: "本田"
        }
      ],
      modelOptions: [
        {
          value: "1",
          label: "途观"
        },
        {
          value: "2",
          label: "帕萨特"
        },
        {
          value: "3",
          label: "捷达"
        }
      ],
      colorValue: "", //颜色
      colorOptions: [
        {
          value: "1",
          label: "红色"
        },
        {
          value: "2",
          label: "白色"
        },
        {
          value: "3",
          label: "绿色"
        }
      ],
      seatOptions: [
        {
          label: "1",
          value: "1"
        },
        {
          label: "2",
          value: "2"
        },
        {
          label: "3",
          value: "3"
        }
      ],
      rightOptions: [
        {
          value: "1",
          label: "最高权限"
        },
        {
          value: "2",
          label: "普通权限"
        },
        {
          value: "3",
          label: "最低权限"
        }
      ],
      tableData: [
        {
          license: "冀A1231312",
          property: "内部车辆",
          department: "连队1",
          carUser: "小明",
          tel: "1329999999",
          inout: "内部车辆"
        }
      ],
      carInfo:{
        tid:"",

        //<summary>车辆类型 1-内部车辆 2-外部车辆 3-临时车辆</summary>
        carType:"",

        // <summary>车牌号</summary>
        LicensePlate:"",

        // <summary>部门</summary>
        ofDept:"",

        // <summary>部门名称</summary>
        deptName:"",

        // <summary>品牌code</summary>
        brand:"",

        // <summary>品牌名</summary>
        brandName:"",

        // <summary>型号</summary>
        model:"",

        // <summary>型号名</summary>
        modelName:"",

        // <summary>车架号</summary>
        frameCode:"",

        // <summary>发动机号</summary>
        motorCode:"",

        // <summary>技术状态（1-正常 2待修 3维修中 4报废）</summary>
         useStatus:"",

        // <summary>颜色</summary>
        color:"",

        // <summary>车辆类型1</summary>
        carType1:"",

        // <summary>类型2</summary>
        carType2:"",

        // <summary>载重</summary>
        load:"",

        // <summary>荷载人数</summary>
         loadNumber:"",

        // <summary>行驶证号</summary>
        driveLicense:"",

        // <summary>行驶证附件路径</summary>
        DriveLicensephoto:"",

        // <summary>当前位置（在内/在外）</summary>
         inOrOut:"",

        // <summary>车辆权限(参考人员权限，这里可能不需要这个字段)</summary>
        carRight:"",

        // <summary>权限有效期</summary>
        rightValid:"",

        // <summary>登记时间</summary>
        registTime:"",

        // <summary>车辆照片路径</summary>
        carPhoto:"",

        // <summary>下次保养时间</summary>
        nextMainTime:"",

        // <summary>保险有效期</summary>
        insuranceValid:"",

        // <summary>车主id</summary>
        ownerId:"",

        // <summary>车主</summary>
        owner:"",

        // <summary>车主电话</summary>
        ownerTel:"",

        // <summary>部队联系人</summary>
        relater:"",

        // <summary>部队联系人姓名</summary>
        relaterName:"",

        // <summary>联系人部门编号</summary>
        relaterDept:"",

        // <summary>联系人部门名称</summary>
        relaterDeptName:"",

        // <summary>车主驾驶证号</summary>
        relaterLicenseNo:"",

        // <summary>车主驾驶证附件</summary>
        relaterLicensePhoto:"",

        // <summary>车主身份证号</summary>
        ownerIdCard:"",

        // <summary>车主身份证照片</summary>
        ownerIdCardPhoto:""
      }
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
    handleBack() {
      history.go(-1);
    }
  }
};
</script>
<style scoped>
.input-width {
  /* width: 100px; */
  width: 150px;
  margin: 0 10px;
}
.header-container {
  /* background:#d8d5d5; */
  display: flex;
}
.carImg {
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
.one,
.two {
  padding: 10px 20px;
  border: 1px solid #d0d0d0;
  margin-top: 5px;
}
.itemDet[data-v-b889b1ce] {
  padding: 7px 0 7px 80px;
}
.color {
  display: inline-block;
  width: 68px;
}
.datas {
  display: inline-block;
  width: 93px;
}
.carstwo {
  display: inline-block;
  width: 100px;
}
.used {
  display: inline-block;
  width: 40px;
  height: 20px;
  text-align: center;
  border-radius: 2px;
  color: red;
}
</style>
