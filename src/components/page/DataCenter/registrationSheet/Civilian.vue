<template>
  <el-form ref="form" :model="form" label-width="80px">
      <el-row>
      <el-col :span="5">
        <el-form-item label="姓名" prop="name" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="性别" prop="gender" required>
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
        <el-form-item label="手机号">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
      </el-col>
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
      
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="登陆账号" required>
          <el-input v-model="form.loginName"></el-input>
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
        <el-form-item label="工作日期">
          <el-date-picker class="input-width" v-model="form.jobDate" type="date" placeholder="选择日期" style="max-width:167px"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="部职别" required>
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
        <el-form-item label="身份证" required>
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
        <el-form-item label="证件类型" required>
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
        <el-form-item label="证件编号" required>
          <el-input v-model="form.licenseCode"></el-input>
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
    </el-row>
    
    <el-row>
      <el-col :span="5" >
        <el-form-item label="人员类别" required>
          <el-select clearable v-model="form.civilStaffType" placeholder="请选择">
            <el-option label="转改管理文职人员" value="1"></el-option>
            <el-option label="转改技术文职人员" value="2"></el-option>
            <el-option label="招考管理文职人员" value="3"></el-option>
            <el-option label="招考管理文职人员" value="4"></el-option>
          </el-select>
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
      deptOptions:[]
      
     
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
          personType : '2'
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
        this.form.personType=2;
        this.postAxios("DataCenter/SaveStaff", {staff:this.form})
        .then(res => {
          console.log(res);
          if(res.satus){
            alert("保存成功");
          }else{
            alert(res.msg);
            return false;
          }          
        })
        .catch(err => {
          console.log(err);
        });
      }
          // history.go(-1);
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
