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
      <div class="header-container">
        <div class="carImg">车辆照片</div>
        <div class="carDet">
          <div class="license">
            奔驰2号
            <span class=" used">在用</span>
            所属单位
            <el-input
              class="input-width"
              placeholder="车牌号"
              value="警卫连"
              disabled
            ></el-input>
          </div>
          <div class="cars">
            车辆品牌：
             <el-input
              class="input-width"
              value="大众"
              disabled
            ></el-input>车辆型号：
            <el-input
              class="input-width"
              value="大众"
              disabled
            ></el-input><span class="colors">颜色：</span>
             <el-input
              class="input-width"
              value="红色"
              disabled
            ></el-input>行驶证号：
             <el-input
              class="input-width"
              value="DSK88339"
              disabled
            ></el-input>
          </div>
          <div class>
            车辆座位：
             <el-input
              class="input-width"
              value="4座"
              disabled
            ></el-input>车辆载重：
             <el-input
              class="input-width"
              value="2吨"
              disabled
            ></el-input>车架号：
             <el-input
              class="input-width"
              value="123"
              disabled
            ></el-input>发动机号：
             <el-input
              class="input-width"
              value="123"
              disabled
            ></el-input>
          </div>
        </div>
      </div>
      <div class="footer">
        <div>
          <div>维修保养信息：</div>
          <div class="itemDet">
            维护类型：
            <el-select class="input-width" v-model="propertyValue" placeholder="请选择">
              <el-option
                v-for="item in inoutOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input class="input-width" placeholder="经办人" v-model="input2"></el-input>
            
          </div>
          <div class="itemDet">
            维修日期：
            <el-date-picker class="input-width" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>备注：
            <el-input type="textarea" class="wenben"></el-input>
          </div>
        </div>
      </div>
      <div class="flex-center submit ">
        <el-button type="danger">取消</el-button>
        <el-button type="success" style="margin-left:40px;">保存</el-button>
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

.used{
  display: inline-block;
  width: 40px;
  height: 20px;
  text-align: center;
  border-radius: 2px;
  color: red;
}
.cars{
  margin-bottom: 10px;
}
.colors{
  width: 68px;
  display: inline-block;
}
.fires{
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
