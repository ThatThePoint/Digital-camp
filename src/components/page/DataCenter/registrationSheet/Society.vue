<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="出生日期">
          <el-date-picker
            class="input-width"
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="籍贯">
          <el-input v-model="form.origin"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="民族">
          <el-input v-model="form.national"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="登陆账号" required>
          <el-input v-model="form.loginName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="出生地">
          <el-input v-model="form.bornArea"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="血型">
          <el-select v-model="form.blood" placeholder="请选择血型">
            <el-option
              v-for="item in bloodOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="登陆密码" required>
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="部职别">
          <el-select v-model="form.deptId" placeholder="请选择部门">
             <el-option
              v-for="item in deptOptions"
              :label="item.name"
              :value="item.tid"
              :key="item.tid"
            ></el-option>
          </el-select>
          <el-input v-model="form.buzhibie"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="工作日期">
          <el-date-picker class="input-width" v-model="form.jobDate" type="date" placeholder="选择日期"></el-date-picker>
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
      <el-col :span="6">
        <el-form-item label="离退休日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.retiredDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="职工身份类别">
          <el-select v-model="form.employeeStatus" placeholder="请选择证件类型">
            <el-option
              v-for="item in employeeStatusOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="岗位情况">
          <el-select v-model="form.dutySituation" placeholder="请选择">
            <el-option
              v-for="item in dutySituationOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="职工登记号码">
          <el-input v-model="form.staffLoginNo"></el-input>
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
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
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
      <el-col :span="6">
        <el-form-item label="毕业专业">
          <el-input v-model="form.gradProf"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-col :span="8">
          <el-form-item label="行政职务及日期">
            <el-input v-model="form.chiefJob"></el-input>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.chiefJobDate"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-col>
      <el-col :span="8">
        <el-form-item label="行政职务（管理岗位）等级及日期">
          <el-input v-model="form.chiefPosition" style="width: 60%;"></el-input>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.chiefDate"
            style="width: 60%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="专业技术职务及日期">
          <el-input v-model="form.professionTech" style="width: 60%;"></el-input>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.professionTechDate"
            style="width: 60%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="岗位等级及日期">
          <el-select v-model="form.professionTechLevel" placeholder="请选择">
             <el-option
              v-for="item in professionTechLevelOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.professionTechLevelDate"
            style="width: 60%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="文职人员级别及日期">
          <el-input v-model="form.civilStaffLevel" style="width: 60%;"></el-input>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.civilStaffLevelDate"
            style="width: 60%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary"  @click="submitForm('form')">立即创建</el-button>
      <el-button  @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        //以下才是对的数据
        tid: "",
        name: "",
        gender: "",
        birthday: "",
        origin: "",
        national: "",
        bornArea: "",
        blood: "",
        buzhibie: "",
        jobDate: "",
        idcard: "",
        marry: "",
        retiredDate: "",
        employeeStatus: "",
        dutySituation: "",
        staffLoginNo: "",
        educatLevel: "",
        schoolDate: "",
        gradSchool: "",
        graduateType: "",
        gradDate: "",
        gradProf: "",
        chiefJob: "",
        chiefJobDate: "",
        chiefPosition: "",
        chiefDate: "",
        professionTech: "",
        professionTechDate: "",
        professionTechLevel: "",
        professionTechLevelDate: "",
        civilStaffLevel: "",
        civilStaffLevelDate: ""
        // photoPath: "",
        // shiguanChangeDate: "",
        // jobPostion: ""
      },
      deptOptions:[],
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
          value: "在编职员"
        },
        {
          key: 2,
          value: "在编工人"
        },
        {
          key: 3,
          value: "非编职员"
        },
        {
          key: 4,
          value: "非编工人"
        },
        {
          key: 5,
          value: "文职人员"
        },
        {
          key: 6,
          value: "非现役公勤"
        },
        {
          key: 7,
          value: "离退休职工"
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
      bloodOptions: [
        {
          key: "1",
          value: "A"
        },
        {
          key: "2",
          value: "B"
        },
        {
          key: "3",
          value: "AB"
        },
        {
          key: "4",
          value: "O"
        },
        {
          key: "5",
          value: "其他"
        }
      ],
      postionLevelOptions: [
        {
          key: "1",
          value: "部级副职"
        },
        {
          key: "2",
          value: "局级正职"
        },
        {
          key: "3",
          value: "局级副职"
        },
        {
          key: "4",
          value: "处级正职"
        },
        {
          key: "5",
          value: "处级副职"
        },
        {
          key: "6",
          value: "科级正职"
        },
        {
          key: "7",
          value: "科级副职"
        },
        {
          key: "8",
          value: "办事员一级"
        },
        {
          key: "9",
          value: "办事员二级"
        },
        {
          key: "10",
          value: "办事员三级"
        },
        {
          key: "11",
          value: "办事员四级"
        },
        {
          key: "12",
          value: "办事员五级"
        },
        {
          key: "13",
          value: "办事员六级"
        },
        {
          key: "14",
          value: "办事员七级"
        },
        {
          key: "15",
          value: "办事员八级"
        },
        {
          key: "16",
          value: "办事员九级"
        },
        {
          key: "17",
          value: "办事员十级"
        },
        {
          key: "18",
          value: "办事员十一级"
        },
        {
          key: "19",
          value: "办事员十二级"
        },
        {
          key: "20",
          value: "办事员十三级"
        },
        {
          key: "21",
          value: "文职人员级别转改特级"
        },
        {
          key: "22",
          value: "转改1级"
        },
        {
          key: "23",
          value: "转改2级"
        },
        {
          key: "24",
          value: "转改3级"
        },
        {
          key: "25",
          value: "转改4级"
        },
        {
          key: "26",
          value: "转改5级"
        },
        {
          key: "27",
          value: "转改6级"
        },
        {
          key: "28",
          value: "转改7级"
        },
        {
          key: "29",
          value: "转改8级"
        }
      ],
      professionTechDutyOptions: [
        {
          key: "1",
          value: "高级工程师"
        },
        {
          key: "2",
          value: "会计师"
        },
        {
          key: "3",
          value: "教授"
        },
        {
          key: "4",
          value: "研究员"
        },
        {
          key: "5",
          value: "医师"
        }
      ],
      employeeStatusOptions: [
        {
          key: "1",
          value: "行政管理职员"
        },
        {
          key: "2",
          value: "专业技术职员"
        },
        {
          key: "3",
          value: "全民固定工人"
        },
        {
          key: "4",
          value: "合同制工人"
        },
        {
          key: "5",
          value: "大集体工人"
        }
      ],
      dutySituationOptions: [
        {
          key: "1",
          value: "在岗"
        },
        {
          key: "2",
          value: "转岗非现役"
        },
        {
          key: "3",
          value: "抽组"
        },
        {
          key: "4",
          value: "托管"
        },
        {
          key: "5",
          value: "内退"
        },
        {
          key: "6",
          value: "待岗"
        },
        {
          key: "7",
          value: "长期病休假"
        },
        {
          key: "8",
          value: "立案"
        },
        {
          key: "9",
          value: "停止审查"
        },
        {
          key: "10",
          value: "离休"
        },
        {
          key: "11",
          value: "退休"
        },
        {
          key: "12",
          value: "退职"
        },
        {
          key: "13",
          value: "交社保"
        }
      ],
      chiefPositionOptions: [
        {
          key: "1",
          value: "管理一级"
        },
        {
          key: "2",
          value: "管理二级"
        },
        {
          key: "3",
          value: "管理三级"
        },
        {
          key: "4",
          value: "管理四级"
        },
        {
          key: "5",
          value: "管理五级"
        },
        {
          key: "6",
          value: "管理六级"
        },
        {
          key: "7",
          value: "管理七级"
        },
        {
          key: "8",
          value: "管理八级"
        },
        {
          key: "9",
          value: "管理九级"
        },
        {
          key: "10",
          value: "管理十级"
        },
      ],
       professionTechLevelOptions: [
        {
          key: "1",
          value: "专业技术二级"
        },
        {
          key: "2",
          value: "专业技术三级"
        },
        {
          key: "3",
          value: "专业技术四级"
        },
        {
          key: "4",
          value: "专业技术五级"
        },
        {
          key: "5",
          value: "专业技术六级"
        },
        {
          key: "6",
          value: "专业技术七级"
        },
        {
          key: "7",
          value: "专业技术八级"
        },
        {
          key: "8",
          value: "专业技术九级"
        },
        {
          key: "9",
          value: "专业技术十级"
        },
        {
          key: "10",
          value: "专业技术十一级"
        },
        {
          key: "11",
          value: "专业技术十二级"
        },
        {
          key: "12",
          value: "专业技术十三级"
        },
      ]
    };
    
  },
  created(){
    this.postAxios("DataCenter/StaffInfo")
        .then(res => {
          console.log(res);
          this.deptOptions=res.deptOptions;
        })
        .catch(err => {
          console.log(err);
        });
  },
  methods: {
    cancel(){ history.go(-1);},
    formatter(row, column) {
      return row.address;
    },
    handleClick(){},
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleBack() {
      history.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var nameFlag= this.$utils.isEmpty(this.form.name);
      var codeFlag= this.$utils.isEmpty(this.form.gender);
      if(nameFlag || codeFlag){
        alert("请先输入部门名称和性别");
        return false;
      }else{
        this.form.personType=4;
        this.postAxios("DataCenter/SaveStaff", {staff:this.form})
        .then(res => {
          console.log(res);
          alert("保存成功");
        })
        .catch(err => {
          console.log(err);
        });
      }
          history.go(-1);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
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
