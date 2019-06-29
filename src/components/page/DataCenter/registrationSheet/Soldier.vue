<template>
  <el-form ref="form" :model="form" label-width="100px" :rules="rules">
    <el-row>
      <el-col :span="5">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="男" value="1"></el-radio>
            <el-radio label="女" value="2"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="出生日期">
          <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" style="max-width:197px" class="aaaa"></el-date-picker>
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
        <el-form-item label="入伍日期" prop="joinArmyDate" >
          <el-date-picker v-model="form.joinArmyDate" type="date" placeholder="选择日期" style="max-width:197px" class="aaaa"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="工作日期">
          <el-date-picker v-model="form.jobDate" type="date" placeholder="选择日期" style="max-width:197px" class="aaaa"></el-date-picker>
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
        <el-form-item label="身份证">
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
        <el-form-item label="证件类型">
          <el-select clearable v-model="form.licenseType" placeholder="请选择证件类型" style="max-width:216px">
            <el-option label="士兵证" value="1"></el-option>
            <el-option label="退休证" value="2"></el-option>
            <el-option label="学员" value="3"></el-option>
            <el-option label="护照" value="4"></el-option>
            <el-option label="军官证" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="证件编号" >
          <el-input v-model="form.licenseCode"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="人员类别">
          <el-select clearable v-model="form.staffType" placeholder="请选择">
            <el-option label="军政后装军官" value="1"></el-option>
            <el-option label="专业技术军官" value="2"></el-option>
            <el-option label="其他军官" value="3"></el-option>
            <el-option label="专业技术文职干部" value="4"></el-option>
            <el-option label="非专业技术文职干部" value="5"></el-option>
            <el-option label="其他文职干部" value="6"></el-option>
            <el-option label="生长干部学员" value="7"></el-option>
            <el-option label="离休干部" value="8"></el-option>
            <el-option label="退休干部" value="9"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="后勤人员分类">
          <el-select clearable v-model="form.houqinType" placeholder="请选择">
            <el-option label="机关人员" value="1"></el-option>
            <el-option label="直属分队" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="后勤专业类别">
          <el-input v-model="form.houqinProf"></el-input>
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
            style="max-width:197px" class="aaaa"
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
        <el-form-item label="军种">
          <el-select clearable v-model="form.armyType" placeholder="请选择">
            <el-option label="陆军" value="1"></el-option>
            <el-option label="海军" value="2"></el-option>
            <el-option label="火箭军" value="3"></el-option>
            <el-option label="战略支援部队" value="4"></el-option>
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
          <el-select clearable v-model="form.armyRank" placeholder="请选择" style="max-width:197px" class="aaaa">
            <el-radio label="上将" value="1"></el-radio>
            <el-radio label="中将" value="2"></el-radio>
            <el-radio label="少将" value="3"></el-radio>
            <el-radio label="大校" value="4"></el-radio>
            <el-radio label="中校" value="5"></el-radio>
            <el-radio label="少校" value="6"></el-radio>
            <el-radio label="上尉" value="7"></el-radio>
            <el-radio label="中尉" value="8"></el-radio>
            <el-radio label="少尉" value="9"></el-radio>
            <el-radio label="文职特技" value="10"></el-radio>
            <el-radio label="文职1级" value="11"></el-radio>
            <el-radio label="文职2级" value="12"></el-radio>
            <el-radio label="文职3级" value="13"></el-radio>
            <el-radio label="文职4级" value="14"></el-radio>
            <el-radio label="文职5级" value="15"></el-radio>
            <el-radio label="文职6级" value="16"></el-radio>
            <el-radio label="文职7级" value="17"></el-radio>
            <el-radio label="文职8级" value="18"></el-radio>
            <el-radio label="文职9级" value="19"></el-radio>

            <el-radio label="学员衔" value="20"></el-radio>
            <el-radio label="未授衔" value="21"></el-radio>
          </el-select>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.rankDate"
            style="max-width:197px" class="aaaa"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="行政职务及日期" :span="7">
          <el-input v-model="form.chiefPosition" style="max-width:197px" ></el-input>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.chiefDate"
            style="max-width:197px" class="aaaa"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="行政职务等级及日期" :span="7">
          <el-input v-model="form.chiefLevel" style="max-width:197px" ></el-input>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.chiefLevDate"
            style="max-width:197px" class="aaaa"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">{{sub}}</el-button>
      <el-button  @click="cancel">取消</el-button>
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
      deptOptions:[],
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2,  message: "长度最少俩个字符", trigger: "blur" }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        // joinArmyDate: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择日期",
        //     trigger: "change"
        //   }
        // ]
      },
    };
  },
  created(){
    console.log("父组件传来的",this)
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
          personType : '1'
        }
      })
    },
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
      this.$router.push({
        path : '/UserManage',
        query : {
          personType : '1'
        }
      })
    },
    onSubmit() {
      console.log(this.$utils);
      this.$utils.isEmpty(form.name);
    },
    submitForm(formName) {
      debugger
      this.$refs[formName].validate(valid => {
        if (valid) {
          var nameFlag= this.$utils.isEmpty(this.form.name);
      var codeFlag= this.$utils.isEmpty(this.form.gender);
      if(nameFlag || codeFlag){
        alert("请先输入部门名称和性别");
        return false;
      }else{
        this.form.personType=1;
        this.postAxios("DataCenter/SaveStaff", {staff:this.form})
        .then(res => {
          console.log(res);
          alert("保存成功");
        })
        .catch(err => {
          console.log(err);
        });
      }
        this.$router.push({
          path : '/UserManage',
          query : {
            personType : '1'
          }
      })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.aaaa{
  width: auto !important;
}
</style>
