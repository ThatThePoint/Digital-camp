<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-row>
      <el-col :span="5">
        <el-form-item label="姓名" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="男" value="1"></el-radio>
            <el-radio label="女" value="2"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="出生日期">
          <el-date-picker
            class="input-width"
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
            style="max-width:167px"
          ></el-date-picker>
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
            style="max-width:167px"
            class="input-width"
            v-model="form.joinArmyDate"
            type="date"
            placeholder="选择日期"
            
          ></el-date-picker>
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
          <el-select clearable v-model="form.licenseType" placeholder="请选择证件类型">
            <el-option label="士兵证" value="1"></el-option>
            <el-option label="退休证" value="2"></el-option>
            <el-option label="学员" value="3"></el-option>
            <el-option label="护照" value="4"></el-option>
            <el-option label="军官证" value="5"></el-option>
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
        <el-form-item label="士官改选日期">
          <el-date-picker
            class="input-width"
            v-model="form.shiguanChangeDate"
            type="date"
            placeholder="选择日期"
            style="max-width:167px"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="工作岗位">
          <el-input v-model="form.jobPostion"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="人员类别">
          <el-select clearable v-model="form.staffType" placeholder="请选择">
            <el-option label="士官" value="1"></el-option>
            <el-option label="兵" value="2"></el-option>
            <el-option label="培养士官学员" value="3"></el-option>
            <el-option label="学兵" value="4"></el-option>
            <el-option label="退休士兵" value="5"></el-option>
            <el-option label="其他士兵" value="6"></el-option>       
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
      <el-col :span="5">
        <el-form-item label="军衔">
          <el-select clearable v-model="form.armyRank" placeholder="请选择">
            <el-option label="一级军士长" value="1"></el-option>
            <el-option label="二级军士长" value="2"></el-option>
            <el-option label="三级军士长" value="3"></el-option>
            <el-option label="四级军士长" value="4"></el-option>
            <el-option label="上士" value="5"></el-option>
            <el-option label="中士" value="6"></el-option>
            <el-option label="下士" value="7"></el-option>
            <el-option label="上等兵" value="8"></el-option>
            <el-option label="列兵" value="9"></el-option>
            <el-option label="未授衔" value="10"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="军衔日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.rankDate"
            style="max-width:167px"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">{{sub}}</el-button>
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
      },
      deptOptions:[],
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
    cancel() {
      this.$router.push({
          path : '/UserManage',
          query : {
            personType : '2'
          }
      })
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
            this.form.personType = 2;
            this.postAxios("DataCenter/SaveStaff", { staff: this.form })
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
            personType : '2'
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
