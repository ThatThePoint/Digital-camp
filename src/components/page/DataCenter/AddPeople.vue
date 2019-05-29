<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 新增人员
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="军官信息登记表" name="first">
          <Soldier></Soldier>
        </el-tab-pane>
        <el-tab-pane label="士兵信息登记表" name="second">
          <Officer/>
        </el-tab-pane>
        <el-tab-pane label="文职人员信息登记表" name="third">
          <Civilian/>
        </el-tab-pane>
        <el-tab-pane label="社会聘用人员信息登记表" name="fourth">
          <Society/>
        </el-tab-pane>
        <el-tab-pane label="公勤人员信息登记表" name="fif">
          <Gongqin/>
        </el-tab-pane>
        <el-tab-pane label="现役人员家属信息登记表" name="six">
          <Xianyi/>
        </el-tab-pane>
        <el-tab-pane label="家属区人员信息登记表" name="seven">
          <Jiashu/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Soldier from "./registrationSheet/Soldier.vue";
import Officer from "./registrationSheet/Officer.vue";
import Civilian from "./registrationSheet/Civilian.vue";
import Society from "./registrationSheet/Society.vue";
import Gongqin from "./registrationSheet/gongqin.vue";
import Xianyi from "./registrationSheet/xianyi.vue";
import Jiashu from "./registrationSheet/jiashu.vue";
export default {
  name: "documentManagement",
  components: {
    Soldier,
    Officer,
    Civilian,
    Society,
    Gongqin,
    Xianyi,
    Jiashu
  },
  data() {
    return {
      activeName: "first",
      form: {
        name: "",
        politicsType: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        //以下才是对的数据
        tid: "",
        name: "",
        gender: "",
        origin: "",
        national: "",
        bornArea: "",
        blood: "",
        buzhibie: "",
        politicsType: "",
        idcard: "",
        marry: "",
        licenseType: "",
        licenseCode: "",
        staffType: "",
        houqinType: "",
        houqinProf: "",
        educatLevel: "",
        schoolDate: "",
        gradSchool: "",
        graduateType: "",
        gradDate: "",
        gradProf: "",
        retiredDate: "",
        localWeather: "",
        armyType: "",
        majorType: "",
        armyRank: "",
        rankDate: "",
        chiefPosition: "",
        chiefDate: "",
        chiefLevel: "",
        chiefLevDate: "",
        photoPath: "",
        shiguanChangeDate: "",
        jobPostion: ""
      },
      pickerOptions: {
        onSubmit() {},
       handleClick(){},
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
              date.setTime(date.getTime() - 6600 * 1000 * 26);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 6600 * 1000 * 26 * 7);
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
          value: "6",
          label: "连队6"
        },
        {
          value: "6",
          label: "连队6"
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
          value: "6",
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
          value: "6",
          label: "临时车辆"
        }
      ],
      propertyValue: "", //车辆属性1-内部 2-外部 6-临时
      departmentValue: "", //单位
      carOfDept: "", //车辆单位
      carType1: "", //type1
      carType2: "", //
      inoutValue: "", //出入库状态
      brandValue: "", //品牌
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
          value: "6",
          label: "本田"
        }
      ],
      modelValue: "", //型号
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
          value: "6",
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
          value: "6",
          label: "绿色"
        }
      ],
      VehicleNo: "", //行驶证号
      driverNo: "", //驾驶证号
      carSeat: 5, //座位数
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
          label: "6",
          value: "6"
        }
      ],
      carLoad: "", //车辆载重
      frameNo: "", //车架号
      engineNo: "", //发动机号
      carType1: "", //
      carType2: "", //
      carRight: "", //
      date1: "",
      date2: "",
      bumen: "",
      hah1: "",
      jhh: "",
      hahhsd: "",
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
          value: "6",
          label: "最低权限"
        }
      ],
      tableData: [
        {
          license: "冀A1261612",
          property: "内部车辆",
          department: "连队1",
          carUser: "小明",
          tel: "1629999999",
          inout: "内部车辆"
        },
        {
          license: "冀A1261612",
          property: "内部车辆",
          department: "连队1",
          carUser: "小明",
          tel: "1629999999",
          inout: "内部车辆"
        },
        {
          license: "冀A1261612",
          property: "内部车辆",
          department: "连队1",
          carUser: "小明",
          tel: "1629999999",
          inout: "内部车辆"
        },
        {
          license: "冀A1261612",
          property: "内部车辆",
          department: "连队1",
          carUser: "小明",
          tel: "1629999999",
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
    handleBack() {
      history.go(-1);
    },
    getData() {
      this.postAxios("sysConfig/BasedataList")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.$message("数据获取错误");
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
  padding: 26px 20px;
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
  width: 96px;
}
.carstwo {
  display: inline-block;
  width: 100px;
}
.used {
  display: inline-block;
  width: 60px;
  height: 20px;
  text-align: center;
  border-radius: 2px;
  color: red;
}
</style>
