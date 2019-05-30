<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="男" value="1"></el-radio>
            <el-radio label="女" value="2"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="出生日期">
          <el-date-picker v-model="birthday " type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="籍贯">
          <el-input v-model="form.origin"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="民族">
          <el-input v-model="form.national"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="出生地">
          <el-input v-model="form.bornArea"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="血型">
          <el-select v-model="form.blood" placeholder="请选择血型">
            <el-option label="A" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
            <el-option label="AB" value="3"></el-option>
            <el-option label="O" value="4"></el-option>
            <el-option label="其他" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="入伍日期">
          <el-date-picker v-model="form.joinArmyDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="工作日期">
          <el-date-picker v-model="form.jobDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="部职别">
          <el-select v-model="form.buzhibie" placeholder="请选择部门">
            <el-option label="团员" value="1"></el-option>
            <el-option label="党员" value="2"></el-option>
            <el-option label="群众" value="3"></el-option>
            <el-option label="预备党员" value="4"></el-option>
          </el-select>
          <el-input v-model="form.buzhibie"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="政治面貌">
          <el-select v-model="form.politicsType" placeholder="请选择">
            <el-option
              v-for="item in politicsTypeOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="身份证">
          <el-input v-model="form.idcard"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="婚姻状况">
          <el-select v-model="form.marry" placeholder="请选择">
            <el-option
              v-for="item in marryOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="证件类型">
          <el-select v-model="form.licenseType" placeholder="请选择证件类型">
            <el-option label="士兵证" value="1"></el-option>
            <el-option label="退休证" value="2"></el-option>
            <el-option label="学员" value="3"></el-option>
            <el-option label="护照" value="4"></el-option>
            <el-option label="军官证" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="证件编号">
          <el-input v-model="form.licenseCode"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="人员类别">
          <el-select v-model="form.staffType" placeholder="请选择">
            <el-option
              v-for="item in staffTypeOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="后勤人员分类">
          <el-select v-model="form.houqinType" placeholder="请选择">
            <el-option label="机关人员" value="shanghai"></el-option>
            <el-option label="直属分队" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="后勤专业类别">
          <el-input v-model="form.houqinProf"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="文化程度">
          <el-select v-model="form.educatLevel" placeholder="请选择">
            <el-option
              v-for="item in educatLevelOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="入学日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.schoolDate"
            style="width: 80%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="毕业院校">
          <el-input v-model="form.gradSchool"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="学位">
          <el-select v-model="form.graduateType" placeholder="请选择">
            <el-option
              v-for="item in graduateTypeOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="毕业日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.gradDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="毕业专业">
          <el-input v-model="form.gradProf"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="军种">
          <el-select v-model="form.armyType" placeholder="请选择">
              <el-option
              v-for="item in armyTypeOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="主类别">
          <el-radio-group v-model="form.majorType">
            <el-radio label="军事" value="1"></el-radio>
            <el-radio label="政工" value="2"></el-radio>
            <el-radio label="后勤" value="3"></el-radio>
            <el-radio label="装备" value="4"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="军衔及日期" :span="5">
          <el-select v-model="form.armyRank" placeholder="请选择">
              <el-option
              v-for="item in armyRankOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.rankDate"
            style="width: 40%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="行政职务及日期" :span="5">
          <el-input v-model="form.chiefPosition"></el-input>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.chiefDate"
            style="width: 40%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="行政职务等级及日期" :span="5">
          <el-input v-model="form.chiefLevel"></el-input>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.chiefLevDate"
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
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      form: {
        //以下才是对的数据
        birthday: "",
        joinArmyDate: "",
        tid: "",
        name: "",
        gender: "",
        origin: "",
        national: "",
        bornArea: "",
        blood: "",
        jobDate: "",
        buzhibie: "",
        politicsType: "",
        idcard: "",
        marry: "",
        licenseType: "",
        licenseCode: "",
        staffType: [],
        houqinType: "",
        houqinProf: "",
        educatLevel: "",
        schoolDate: "",
        gradSchool: "",
        graduateType: "",
        gradDate: "",
        gradProf: "",
        retiredDate: "",
        retiredDate: "",
        localWeather: "",
        armyType: "",
        majorType: "",
        armyRank: "",
        rankDate: "",
        chiefPosition: "",
        chiefDate: "",
        chiefLevel: "",
        chiefLevDate: ""
      },
      politicsTypeOptions: [
        {
          key: 1,
          value: "党员"
        },
        {
          key: 2,
          value: "预备党员"
        },
        {
          key: 3,
          value: "团员"
        },
        {
          key: 4,
          value: "群众"
        },
        {
          key: 5,
          value: "其他"
        }
      ],
      marryOptions: [
        {
          key: 1,
          value: "未婚"
        },
        {
          key: 2,
          value: "已婚"
        },
        {
          key: 3,
          value: "丧偶"
        },
        {
          key: 4,
          value: "离婚"
        }
      ],
      armyTypeOptions: [
        {
          key: 1,
          value: "陆军"
        },
        {
          key: 2,
          value: "海军"
        },
        {
          key: 3,
          value: "火箭军"
        },
        {
          key: 4,
          value: "战略支援部队"
        }
      ],
      localWeatherOptions: [
        {
          key: 1,
          value: "高寒区"
        },
        {
          key: 2,
          value: "寒区"
        },
        {
          key: 3,
          value: "温区"
        },
        {
          key: 4,
          value: "亚热区"
        },
        {
          key: 5,
          value: "热区"
        }
      ],
      staffTypeOptions: [
        {
          key: 1,
          value: "军政后装军官"
        },
        {
          key: 2,
          value: "专业技术军官"
        },
        {
          key: 3,
          value: "其他军官"
        },
        {
          key: 4,
          value: "专业技术文职干部"
        },
        {
          key: 5,
          value: "非专业技术文职干部"
        },
        {
          key: 6,
          value: "其他文职干部"
        },
        {
          key: 7,
          value: "生长干部学员"
        },
        {
          key: 8,
          value: "离休干部"
        },
        {
          key: 9,
          value: "退休干部"
        }
      ],
      armyRankOptions: [
        {
          key: 1,
          value: "上将"
        },
        {
          key: 2,
          value: "中将"
        },
        {
          key: 3,
          value: "少将"
        },
        {
          key: 4,
          value: "大校"
        },
        {
          key: 5,
          value: "中校"
        },
        {
          key: 6,
          value: "少校"
        },
        {
          key: 7,
          value: "上尉"
        },
        {
          key: 8,
          value: "中尉"
        },
        {
          key: 9,
          value: "少尉"
        },
        {
          key: 10,
          value: "文职特技"
        },
        {
          key: 11,
          value: "文职1级"
        },
        {
          key: 12,
          value: "文职2级"
        },
        {
          key: 13,
          value: "文职3级"
        },
        {
          key: 15,
          value: "文职4级"
        },
        {
          key: 16,
          value: "文职5级"
        },
        {
          key: 17,
          value: "文职6级"
        },
        {
          key: 18,
          value: "文职7级"
        },
        {
          key: 19,
          value: "文职8级"
        },
        {
          key: 20,
          value: "文职9级"
        },
        {
          key: 21,
          value: "学员衔"
        },
        {
          key: 22,
          value: "未授衔"
        }
      ],
      educatLevelOptions: [
        {
          key: 1,
          value: "研究生"
        },
        {
          key: 2,
          value: "大学本科"
        },
        {
          key: 3,
          value: "大学专科"
        },
        {
          key: 4,
          value: "专科学校"
        },
        {
          key: 5,
          value: "中等专业学校"
        },
        {
          key: 6,
          value: "校工学校"
        },
        {
          key: 7,
          value: "高中"
        },
        {
          key: 8,
          value: "初中"
        },
        {
          key: 9,
          value: "小学"
        },
        {
          key: 10,
          value: "文盲"
        },
        {
          key: 11,
          value: "半文盲"
        }
      ],
      graduateTypeOptions: [
        {
          key: 1,
          value: "博士"
        },
        {
          key: 2,
          value: "硕士"
        },
        {
          key: 3,
          value: "学士"
        },
        {
          key: 4,
          value: "其他"
        }
      ],
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
    birthday() {},
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
    onSubmit() {},
    handleClick() {},

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
  }
};
</script>
<style lang="sass" scoped>

</style>
