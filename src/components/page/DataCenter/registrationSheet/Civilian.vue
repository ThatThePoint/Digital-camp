<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-row>
      <el-col :span="5">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="出生日期">
          <el-date-picker class="input-width" v-model="form.birthday" type="date" placeholder="选择日期" style="max-width:167px"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="籍贯">
          <el-input v-model="form.origin"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="民族">
          <el-input v-model="form.national"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="登陆账号" required>
          <el-input v-model="form.loginName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="出生地">
          <el-input v-model="form.bornArea"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="血型">
          <el-select clearable v-model="form.blood" placeholder="请选择血型">
            <el-option label="A" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
            <el-option label="AB" value="3"></el-option>
            <el-option label="O" value="4"></el-option>
            <el-option label="其他" value="5"></el-option>  
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="登陆密码" required>
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="入伍日期">
          <el-date-picker
            class="input-width"
            v-model="form.joinArmyDate"
            type="date"
            placeholder="选择日期"
            style="max-width:167px"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="工作日期">
          <el-date-picker class="input-width" v-model="form.jobDate" type="date" placeholder="选择日期" style="max-width:167px"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
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
      <el-col :span="5">
        <el-form-item label="政治面貌">
          <el-select clearable v-model="form.politicsType" placeholder="请选择">
            <el-option label="党员" value="1"></el-option>
            <el-option label="预备党员" value="2"></el-option>
            <el-option label="团员" value="3"></el-option>
            <el-option label="群众" value="4"></el-option>
            <el-option label="其他" value="5"></el-option>              
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="身份证" >
          <el-input v-model="form.idcard" @blur="blurs"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="婚姻状况">
          <el-select clearable v-model="form.marry" placeholder="请选择">
            <el-option label="未婚" value="1"></el-option>
            <el-option label="已婚" value="2"></el-option>
            <el-option label="丧偶" value="3"></el-option>
            <el-option label="离婚" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="军种">
          <el-select clearable v-model="form.armyType" placeholder="请选择">
            <el-option label="陆军" value="1"></el-option>
            <el-option label="海军" value="2"></el-option>
            <el-option label="火箭军" value="3"></el-option>
            <el-option label="战略支援部队" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="证件编号">
          <el-input v-model="form.licenseCode"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="转改/聘用时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.switchDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="转改命令/聘用合同编号">
          <el-input v-model="form.switchCode"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="文化程度">
          <el-select clearable v-model="form.educatLevel" placeholder="请选择">
            <el-option label="研究生" value="1"></el-option>
            <el-option label="大学本科" value="2"></el-option>
            <el-option label="大学专科" value="3"></el-option>
            <el-option label="专科学校" value="4"></el-option>
            <el-option label="中等专业学校" value="5"></el-option>
            <el-option label="校工学校" value="6"></el-option>
            <el-option label="高中" value="7"></el-option>
            <el-option label="初中" value="8"></el-option>
            <el-option label="小学" value="9"></el-option>  
            <el-option label="文盲" value="10"></el-option>
            <el-option label="半文盲" value="11"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="入学日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.schoolDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="毕业院校">
          <el-input v-model="form.gradSchool"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="学位">
          <el-select clearable v-model="form.graduateType" placeholder="请选择">
            <el-option label="博士" value="1"></el-option>
            <el-option label="硕士" value="2"></el-option>
            <el-option label="学士" value="3"></el-option>
            <el-option label="其他" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="毕业日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.gradDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="毕业专业">
          <el-input v-model="form.gradProf"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="人员类别">
          <el-select clearable v-model="form.civilStaffType" placeholder="请选择">
            <el-option label="转改管理文职人员" value="1"></el-option>
            <el-option label="转改技术文职人员" value="2"></el-option>
            <el-option label="招考管理文职人员" value="3"></el-option>
            <el-option label="招考管理文职人员" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="所在气候区">
          <el-select clearable v-model="form.localWeather" placeholder="请选择">
            <el-option label="高寒区" value="1"></el-option>
            <el-option label="寒区" value="2"></el-option>
            <el-option label="温区" value="3"></el-option>
            <el-option label="亚热区" value="4"></el-option>
            <el-option label="热区" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
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
      <el-col :span="5">
        <el-form-item label="岗位等级及日期">
          <el-select clearable v-model="form.postionLevel" placeholder="请选择">
            <el-option
              v-for="item in postionLevelOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.postionLevelDate"
            style="max-width:167px"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="文职人员等级及日期">
          <el-input v-model="form.civilStaffLevel" style="width: 60%;"></el-input>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.civilStaffLevelDate"
            style="width: 60%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="专业技术职务及日期">
          <el-input v-model="form.professionTechDuty" style="width: 60%;"></el-input>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.professionTechDutyDate"
            style="width: 60%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">{{sub}}</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import utils from '../../../../utils'
export default {
  props:["data"],
  data() {
    return {
      sub: '立即创建',
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
        jobDate: "",
        buzhibie: "",
        politicsType: "",
        idcard: "",
        marry: "",
        armyType: "",
        licenseCode: "",
        switchDate: "",
        switchCode: "",
        staffType: "",
        educatLevel: "",
        schoolDate: "",
        gradSchool: "",
        graduateType: "",
        gradDate: "",
        gradProf: "",
        civilStaffType: "",
        localWeather: "",
        majorType: "",
        postionLevel: "",
        postionLevelDate: "",
        civilStaffLevel: "",
        civilStaffLevelDate: "",
        professionTechDuty: "",
        professionTechDutyDate: ""
        // photoPath: "",
        // shiguanChangeDate: "",
        // jobPostion: ""
      },
      deptOptions:[],
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
    };
  },
  created(){
    this.form = this.data ? this.data : this.form
    if(this.data){
      this.sub = '立即提交'
    }
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
    blurs(){
      utils.isCardNo(this.form.idcard)
    },
    cancel(){ 
      this.$router.push({
        path : '/UserManage',
        query : {
          personType : '3'
        }
      })
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
    handleBack() {
      history.go(-1);
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
      if (valid) {
          var nameFlag= this.$utils.isEmpty(this.form.name);
      var codeFlag= this.$utils.isEmpty(this.form.gender);
      if(nameFlag || codeFlag){
        alert("请先输入部门名称和性别");
        return false;
      }else{
        this.form.personType=3;
        this.postAxios("DataCenter/SaveStaff", {staff:this.form})
        .then(res => {
          console.log(res);
          alert("保存成功");
        })
        .catch(err => {
          console.log(err);
        });
      }
          // history.go(-1);
          this.$router.push({
            path : '/UserManage',
            query : {
              personType : '3'
            }
          })
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
