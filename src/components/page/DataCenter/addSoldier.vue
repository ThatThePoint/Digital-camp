<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 新增现役人员
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="header-container">
        <div class="carImg">人员照片</div>
        <div class="carDet">
          <div class="license">
            奔驰2号
            <span class=" used" >在用</span>
          </div>
          <div>
            车辆类型
            <el-select class="input-width" v-model="inoutValue" placeholder="请选择">
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
      <div class="footer">
        <div class="one">
          <p>车辆基本信息：</p>
          <div class="itemDet">
            车辆品牌：
            <el-select class="input-width" v-model="brandValue" placeholder="请选择">
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>车辆型号：
            <el-select class="input-width" v-model="modelValue" placeholder="请选择">
              <el-option
                v-for="item in modelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select><span class="color">颜色：</span>
            <el-select class="input-width" v-model="colorValue" placeholder="请选择">
              <el-option
                v-for="item in colorOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>行驶证号：
            <el-input class="input-width" placeholder="车牌号" v-model="input2"></el-input>
            <el-button size="small" type="success" >照片上传</el-button>
          </div>
          <div class="itemDet">
            车辆座位：
            <el-select class="input-width" v-model="carSeat" placeholder="请选择">
              <el-option
                v-for="item in seatOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>车辆载重：
            <el-select class="input-width" v-model="value1" placeholder="请选择">
              <el-option
                v-for="item in seatOptions"
                :key="item.value"
                :value="item.value"
              ></el-option>
            </el-select>车架号：
            <el-input class="input-width" placeholder="车牌号" v-model="input2"></el-input>发动机号：
            <el-input class="input-width" placeholder="车牌号" v-model="input2"></el-input>
          </div>
        </div>
        <div class="two">
          <p>内部车辆附加：</p>
          <div class="itemDet">
            所属单位：
            <el-select class="input-width" v-model="carOfDept" placeholder="请选择">
              <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>车辆类别1：
            <el-select class="input-width" v-model="carType1" placeholder="请选择">
              <el-option
                v-for="item in propertyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select><span class="carstwo">类别2：</span>
            <el-select class="input-width" v-model="carType2" placeholder="请选择">
              <el-option
                v-for="item in propertyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="itemDet" >
            车辆权限：
            <el-select class="input-width" v-model="carRight" placeholder="请选择">
              <el-option
                v-for="item in rightOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select><span class="datas">登记日：</span>
            <el-date-picker class="input-width" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>授权有效期：
            <el-date-picker class="input-width" v-model="value2" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </div>
      </div>
      <div class="one">
        <p>外部车辆附加：</p>
        <div class="itemDet">
          车主姓名：
          <el-input class="input-width" placeholder="请输入" v-model="hah1"></el-input>电话：
          <el-input class="input-width" placeholder="请输入" v-model="hahhsd"></el-input>部队联系人：
          <el-input class="input-width" placeholder="请输入" v-model="jhh"></el-input>联系人部门：
          <el-select class="input-width" v-model="bumen" placeholder="请输入">
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
          <el-select class="input-width" v-model="carRight" placeholder="请选择">
            <el-option
              v-for="item in rightOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>权限有效期
          <el-date-picker class="input-width" v-model="value2" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <div class="itemDet">
          身份证：
          <el-input class="input-width" placeholder="请输入" v-model="input2"></el-input>
          <el-button size="small" type="success" >身份证正面上传</el-button>
          <el-button size="small" type="success" >身份证背面上传</el-button>
        </div>
        <div class="itemDet">
          驾驶证：
          <el-input class="input-width" placeholder="请输入" v-model="input2"></el-input>
          <el-button size="small" type="success" >驾驶证正面上传</el-button>
          <el-button size="small" type="success" >驾驶证背面上传</el-button>
        </div>
      </div>
      <div class="flex-center itemDet" style="margin-top:20px;"> 
        <el-button class="editor-btn" type="danger" @click="handleBack" >取消</el-button>
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
      propertyValue: "",//车辆属性1-内部 2-外部 3-临时
      departmentValue: "",//单位
      carOfDept:"",//车辆单位
      carType1:"",//type1
      carType2:"",//
      inoutValue: "",//出入库状态
      brandValue:"",//品牌
      brandOptions:[
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
      modelValue:"",//型号
      modelOptions:[
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
      colorValue:"",//颜色
      colorOptions:[
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
      VehicleNo:"",//行驶证号
      driverNo:"",//驾驶证号
      carSeat:5,//座位数
      seatOptions:[
        {
          label:"1",
          value: "1"
        },
        {
          label:"2",
          value: "2"
        },
        {
          label:"3",
          value: "3"
        }
      ],
      carLoad:"",//车辆载重
      frameNo:"",//车架号
      engineNo:"",//发动机号
      carType1:"",//
      carType2:"",//
      carRight:"",//
      date1:"",
      date2:"",
      bumen:"",
      hah1:"",
      jhh:"",
      hahhsd:"",
      rightOptions:[
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
        },
        {
          license: "冀A1231312",
          property: "内部车辆",
          department: "连队1",
          carUser: "小明",
          tel: "1329999999",
          inout: "内部车辆"
        },
        {
          license: "冀A1231312",
          property: "内部车辆",
          department: "连队1",
          carUser: "小明",
          tel: "1329999999",
          inout: "内部车辆"
        },
        {
          license: "冀A1231312",
          property: "内部车辆",
          department: "连队1",
          carUser: "小明",
          tel: "1329999999",
          inout: "内部车辆"
        }
      ]
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
      handleBack(){
      history.go(-1);
    }
  }
};
</script>
<style scoped>
.input-width {
  /* width: 100px; */
  width:150px;
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
  border: 1px solid ;
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
.one,.two{
    padding: 10px 20px;
    border: 1px solid #d0d0d0;
    margin-top: 5px;
}
.itemDet[data-v-b889b1ce] {
    padding: 7px 0 7px 80px;
}
.color{
    display: inline-block;
    width: 68px;
}
.datas{
  display: inline-block;
  width: 93px;
}
.carstwo{
  display: inline-block;
  width: 100px;
}
.used{
  display: inline-block;
  width: 40px;
  height: 20px;
  text-align: center;
  border-radius: 2px;
  color: red;
}
</style>
