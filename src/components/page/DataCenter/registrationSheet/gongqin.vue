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
          <el-date-picker class="input-width" v-model="birthday" type="date" placeholder="选择日期"></el-date-picker>
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
            <el-option label="A" value="shanghai"></el-option>
            <el-option label="B" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="部职别">
          <el-input v-model="form.buzhibie"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="工作日期">
          <el-date-picker class="input-width" v-model="joinArmyDate" type="date" placeholder="选择日期"></el-date-picker>
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
            <el-option label="团员" value="shaasanghai"></el-option>
            <el-option label="党员" value="beisdjing"></el-option>
            <el-option label="群众" value="shaasanghai"></el-option>
            <el-option label="预备党员" value="beisdjing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="人员类别">
          <el-select v-model="form.staffType" placeholder="请选择">
            <el-option label="军政后装军官" value="shanghai"></el-option>
            <el-option label="专业技术军官" value="beijing"></el-option>
            <el-option label="其他军官" value="beijing"></el-option>
            <el-option label="。。。" value="beijing"></el-option>
            <el-option label="。。。" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="婚姻状况">
          <el-select v-model="form.marry" placeholder="请选择">
            <el-option label="已婚" value="shaasanghai"></el-option>
            <el-option label="未婚" value="beisdjing"></el-option>
            <el-option label="未知" value="shaasanghai"></el-option>
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
            <el-option label="行政管理职员" value="shanghai"></el-option>
            <el-option label="专业技术职员" value="beijing"></el-option>
            <el-option label="全民固定工人" value="beijing"></el-option>
            <el-option label="。。。" value="beijing"></el-option>
            <el-option label="。。。" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="岗位情况">
          <el-select v-model="form.dutySituation" placeholder="请选择">
            <el-option label="在岗" value="shanghai"></el-option>
            <el-option label="转岗非现役" value="beijing"></el-option>
            <el-option label="抽组" value="beijing"></el-option>
            <el-option label="托管" value="beijing"></el-option>
            <el-option label="。。。" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="文化程度">
          <el-select v-model="form.educatLevel" placeholder="请选择">
            <el-option label="研究生" value="shanghai"></el-option>
            <el-option label="大学本科" value="beijing"></el-option>
            <el-option label="大学专科和专科学校" value="beijing"></el-option>
            <el-option label="。。。" value="beijing"></el-option>
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
            <el-option label="博士" value="shanghai"></el-option>
            <el-option label="硕士" value="beijing"></el-option>
            <el-option label="学士" value="beijing"></el-option>
            <el-option label="其他" value="beijing"></el-option>
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
        <el-form-item label="行政职务及日期">
          <el-select v-model="form.chiefJob" placeholder="请选择">
            <el-option label="上将" value="shanghai"></el-option>
            <el-option label="中将" value="beijing"></el-option>
            <el-option label="少将" value="beijing"></el-option>
            <el-option label="大校" value="beijing"></el-option>
            <el-option label="。。。" value="beijing"></el-option>
          </el-select>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.chiefJobDate"
            style="width: 60%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="行政职务（管理岗位）等级及日期">
          <el-input v-model="form.chiefPosition" style="width: 60%;"></el-input>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.chiefDate" style="width: 60%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="专业技术职务及日期">
          <el-input v-model="form.chiefPosition" style="width: 60%;"></el-input>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.chiefDate"
            style="width: 60%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="岗位等级及日期">
          <el-select v-model="form.professionTechLevel" placeholder="请选择">
            <el-option label="上将" value="shanghai"></el-option>
            <el-option label="中将" value="beijing"></el-option>
            <el-option label="少将" value="beijing"></el-option>
            <el-option label="大校" value="beijing"></el-option>
            <el-option label="。。。" value="beijing"></el-option>
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
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
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
        buzhibie,
        joinArmyDate: "",
        idcard: "",
        politicsType: "",
        staffType: "",
        marry: "",
        retiredDate: "",
        employeeStatus: "",
        dutySituation: "",
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
      }
    };
  },
  methods: {
      form(){

      },
       onSubmit() {},
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
       handleClick(){},

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
