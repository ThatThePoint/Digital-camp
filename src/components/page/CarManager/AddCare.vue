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
      <div class="header-container">
        <div class="carImg"></div>
        <div class="carDet">
          <div class="license">
            奔驰2号
            <span>状态</span>
            所属单位
            <el-select class="input-width" v-model="inputOptions" placeholder="请选择">
              <el-option
                v-for="item in inoutOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class>
            车辆品牌：
            <el-select class="input-width" v-model="propertyValue" placeholder="请选择">
              <el-option
                v-for="item in propertyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>车辆型号：
            <el-select class="input-width" v-model="propertyValue" placeholder="请选择">
              <el-option
                v-for="item in propertyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>颜色：
            <el-select class="input-width" v-model="propertyValue" placeholder="请选择">
              <el-option
                v-for="item in propertyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>行驶证号：
            <el-input class="input-width" placeholder="车牌号" v-model="input2"></el-input>
          </div>
          <div class>
            车辆座位：
            <el-select class="input-width" v-model="propertyValue" placeholder="请选择">
              <el-option
                v-for="item in propertyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>车辆载重：
            <el-select class="input-width" v-model="propertyValue" placeholder="请选择">
              <el-option
                v-for="item in propertyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>车架号：
            <el-input class="input-width" placeholder="车牌号" v-model="input2"></el-input>发动机号：
            <el-input class="input-width" placeholder="车牌号" v-model="input2"></el-input>
          </div>
        </div>
      </div>
      <div class="footer">
        <div>
          <h3>维修保养信息：</h3>
          <div class="itemDet">
            保养类型：
            <el-select class="input-width" v-model="propertyValue" placeholder="请选择">
              <el-option
                v-for="item in propertyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>费用：
            <el-input class="input-width" placeholder="车牌号" v-model="input2"></el-input>
            <el-button size="small" type="success">照片上传</el-button>
          </div>
          <div class="itemDet">
            维修日期：
            <el-date-picker class="input-width" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            保养明细：
            <el-input type="textarea" class="wenben"></el-input>
          </div>
        </div>
      </div>
      <div class="submit">
        <el-button type="danger">取消</el-button>
        <el-button type="success">保存</el-button>
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
      propertyValue: "",
      departmentValue: "",
      inoutValue: "",
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
    addCar() {
      this.$router.push({ path: "/addcare" });
      // router.push({ path: '/addcar' })
    }
  }
};
</script>
<style scoped>
.input-width {
  width: 100px;
  margin: 0 10px;
}
.header-container {
  display: flex;
}
.carImg {
  width: 100px;
  height: 120px;
  background: red;
  vertical-align: middle;
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
.wenben{
  width : 400px;
  vertical-align: top;
}
.submit{
  margin: 40px auto;
  text-align: center;
}
.submit button{
  margin: 0 100px;
}
</style>
