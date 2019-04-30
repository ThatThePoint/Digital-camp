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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="军官信息登记表" name="first">
          <el-form ref="form" :model="form" label-width="80px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="姓名">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="性别">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="出生日期">
                  <el-date-picker
                    class="input-width"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="籍贯">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="民族">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="出生地">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="血型">
                  <el-select v-model="form.region" placeholder="请选择血型">
                    <el-option label="A" value="shanghai"></el-option>
                    <el-option label="B" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <el-form-item label="入伍日期">
                  <el-date-picker
                    class="input-width"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="工作日期">
                  <el-date-picker
                    class="input-width"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <el-form-item label="部职别">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="政治面貌">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="身份证">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="婚姻状况">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="证件类型">
                  <el-select v-model="form.region" placeholder="请选择证件类型">
                    <el-option label="军官证" value="shanghai"></el-option>
                    <el-option label="文职干部证" value="beijing"></el-option>
                    <el-option label="离休证" value="beijing"></el-option>
                    <el-option label="退休证" value="beijing"></el-option>
                    <el-option label="学员证" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="证件号码">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="人员类别">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="后勤人员分类">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="后勤专业类别">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="文化程度">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="入学日期">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="毕业院校">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="学位">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="毕业日期">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="毕业专业">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="离退休日期">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="所在气候区">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="军种">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="主类别">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="军事"></el-radio>
                    <el-radio label="政工"></el-radio>
                    <el-radio label="后勤"></el-radio>
                    <el-radio label="装备"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="军衔（文职）级及日期">
                  <el-input v-model="form.name" style="width: 40%;"></el-input>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 40%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="行政职务及日期">
                  <el-input v-model="form.name" style="width: 40%;"></el-input>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 40%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="行政职务等级及日期">
                  <el-input v-model="form.name" style="width: 40%;"></el-input>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 40%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="士兵信息登记表" name="second">士兵信息登记表</el-tab-pane>
        <el-tab-pane label="文职人员信息登记表" name="third">文职人员信息登记表</el-tab-pane>
        <el-tab-pane label="社会聘用人员信息登记表" name="fourth">社会聘用人员信息登记表</el-tab-pane>
        <el-tab-pane label="公勤人员信息登记表" name="fif">公勤人员信息登记表</el-tab-pane>
        <el-tab-pane label="家属区人员信息登记表" name="six">家属区人员信息登记表</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "documentManagement",
  data() {
    return {
      activeName: "first",
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
      propertyValue: "", //车辆属性1-内部 2-外部 3-临时
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
          value: "3",
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
          label: "3",
          value: "3"
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
