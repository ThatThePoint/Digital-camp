<template>
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">
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
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
            style="max-width:197px"
            class="aaaa"
          ></el-date-picker>
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
        <el-form-item label="登陆账号">
          <el-input v-model="form.loginName"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="5">
        <el-form-item label="登陆密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="入伍日期" prop="joinArmyDate">
          <el-date-picker
            v-model="form.joinArmyDate"
            type="date"
            placeholder="选择日期"
            style="max-width:197px"
            class="aaaa"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="工作日期">
          <el-date-picker
            v-model="form.jobDate"
            type="date"
            placeholder="选择日期"
            style="max-width:197px"
            class="aaaa"
          ></el-date-picker>
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
          <el-select
            clearable
            v-model="form.licenseType"
            placeholder="请选择证件类型"
            style="max-width:216px"
          >
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
          <el-input type="number" v-model="form.licenseCode"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="人员类别" required>
          <el-select clearable v-model="form.staffType" placeholder="请选择">
            <el-option label="军官" value="1"></el-option>
            <el-option label="士兵" value="2"></el-option>
            <el-option label="义务兵" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item label="军衔及日期" :span="5">
          <el-select
            clearable
            v-model="form.armyRank"
            placeholder="请选择"
            style="max-width:197px"
            class="aaaa"
          >
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
import utils from "../../../../utils";
export default {
  props: ["data"],
  data() {
    return {
      sub: "立即创建",
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
      deptOptions: [],
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, message: "长度最少俩个字符", trigger: "blur" }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        licenseCode: [
          { required: true, message: "请输入证件编号", trigger: "change" },
          { min: 1, max: 20, message: "请输入1-20位数字", trigger: "blur" }
        ]
        // joinArmyDate: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择日期",
        //     trigger: "change"
        //   }
        // ]
      }
    };
  },
  created() {
    console.log("父组件传来的", this);
    this.form = this.data ? this.data : this.form;
    if (this.data) {
      this.sub = "立即提交";
    }
    this.postAxios("DataCenter/StaffInfo")
      .then(res => {
        console.log(res);
        this.deptOptions = res.deptOptions;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    blurs() {
      utils.isCardNo(this.form.idcard);
    },
    cancel() {
      this.$router.push({
        path: "/UserManage",
        query: {
          personType: "1"
        }
      });
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
        path: "/UserManage",
        query: {
          personType: "1"
        }
      });
    },
    onSubmit() {
      console.log(this.$utils);
      this.$utils.isEmpty(form.name);
    },
    submitForm(formName) {
      debugger;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var nameFlag = this.$utils.isEmpty(this.form.name);
          var codeFlag = this.$utils.isEmpty(this.form.gender);
          var deptFlag = this.$utils.isEmpty(this.form.deptId);
          var idFlag = this.$utils.isEmpty(this.form.idcard);
          var lisFlag = this.$utils.isEmpty(this.form.licenseType);
          var staffFlag = this.$utils.isEmpty(this.form.staffType);
          if (nameFlag || codeFlag ||deptFlag || idFlag||lisFlag || staffFlag) {
            alert("请先输入部门名称、性别等必要信息");
            return false;
          } else {
            this.form.personType = 1;
            this.postAxios("DataCenter/SaveStaff", { staff: this.form })
              .then(res => {
                console.log(res);
                if (res.satus) {
                  alert("保存成功");
                  this.$router.push({
            path: "/UserManage",
            query: {
              personType: "1"
            }
          });
                } else {
                  alert(res.msg);
                  return false;
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
          
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
.aaaa {
  width: auto !important;
}
</style>
