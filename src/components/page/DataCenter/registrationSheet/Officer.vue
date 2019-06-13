<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="姓名" required>
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
          <el-select clearable v-model="form.blood" placeholder="请选择血型">
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
        <el-form-item label="入伍日期">
          <el-date-picker
            class="input-width"
            v-model="form.joinArmyDate"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="政治面貌">
          <el-select clearable v-model="form.politicsType" placeholder="请选择">
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
          <el-select clearable v-model="form.marry" placeholder="请选择">
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
          <el-select clearable v-model="form.licenseType" placeholder="请选择证件类型">
            <el-option label="士兵证" value="1"></el-option>
            <el-option label="退休证" value="2"></el-option>
            <el-option label="学员" value="3"></el-option>
            <el-option label="护照" value="4"></el-option>
            <el-option label="军官证" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="证件编号">
          <el-input v-model="form.licenseCode"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="部职别">
          <el-select clearable v-model="form.deptId" placeholder="请选择部门">
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
        <el-form-item label="士官改选日期">
          <el-date-picker
            class="input-width"
            v-model="form.shiguanChangeDate"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="工作岗位">
          <el-input v-model="form.jobPostion"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="人员类别">
          <el-select clearable v-model="form.staffType" placeholder="请选择">
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
          <el-select clearable v-model="form.houqinType" placeholder="请选择">
            <el-option label="机关人员" value="1"></el-option>
            <el-option label="直属分队" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="文化程度">
          <el-select clearable v-model="form.educatLevel" placeholder="请选择">
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
          <el-select clearable v-model="form.graduateType" placeholder="请选择">
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
        <el-form-item label="军种">
          <el-select clearable v-model="form.armyType" placeholder="请选择">
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
      <el-col :span="6">
        <el-form-item label="军衔">
          <el-select clearable v-model="form.armyRank" placeholder="请选择">
            <el-option
              v-for="item in armyRankOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="军衔日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.rankDate"
            style="width: 60%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
      <el-button @click="cancel">取消</el-button>
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
        joinArmyDate: "",
        politicsType: "",
        idcard: "",
        marry: "",
        licenseType: "",
        licenseCode: "",
        staffType: "",
        jobPostion: "",
        houqinType: "",
        houqinProf: "",
        educatLevel: "",
        schoolDate: "",
        gradSchool: "",
        graduateType: "",
        gradDate: "",
        gradProf: "",
        ArmyType: "",
        majorType: "",
        armyRank: "",
        rankDate: ""
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
          value: "士官"
        },
        {
          key: 2,
          value: "兵"
        },
        {
          key: 3,
          value: "培养士官学员"
        },
        {
          key: 4,
          value: "学兵"
        },
        {
          key: 5,
          value: "退休士兵"
        },
        {
          key: 6,
          value: "其他士兵"
        }
      ],
      armyRankOptions: [
        {
          key: 1,
          value: "一级军士长"
        },
        {
          key: 2,
          value: "二级军士长"
        },
        {
          key: 3,
          value: "三级军士长"
        },
        {
          key: 4,
          value: "四级军士长"
        },
        {
          key: 5,
          value: "上士"
        },
        {
          key: 6,
          value: "中士"
        },
        {
          key: 7,
          value: "下士"
        },
        {
          key: 8,
          value: "上等兵"
        },
        {
          key: 9,
          value: "列兵"
        },
        {
          key: 10,
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
    cancel() {
      history.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var nameFlag = this.$utils.isEmpty(this.form.name);
          var codeFlag = this.$utils.isEmpty(this.form.gender);
          if (nameFlag || codeFlag) {
            alert("请先输入部门名称和性别");
            return false;
          } else {
            this.form.personType = 1;
            this.postAxios("DataCenter/SaveStaff", { staff: this.form })
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
    handleClick() {}
  }
};
</script>
<style lang="sass" scoped>

</style>
