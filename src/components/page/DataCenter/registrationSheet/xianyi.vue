<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-row>
      <el-col :span="5">
        <el-form-item label="姓名" required>
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="性别" required>
          <el-radio-group v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
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
            style="max-width:167px">
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
    </el-row>
      <el-row>
      <el-col :span="5">
        <el-form-item label="登陆账号" >
          <el-input v-model="form.loginName"></el-input>
        </el-form-item>
      </el-col>
     
      <el-col :span="5">
        <el-form-item label="登陆密码" >
          <el-input v-model="form.password"></el-input>
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
      <el-col :span="10">
        <el-form-item label="家庭住址" required>
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      
      <el-col :span="5">
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
      <el-col :span="5">
        <el-form-item label="对应军人姓名" required>
          <el-input v-model="form.sodierName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      
      <el-col :span="5">
        <el-form-item label="与军人关系" required>
          <el-select clearable v-model="form.sodierRelation" placeholder="请选择">
            <el-option
              v-for="item in sodierRelationOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="军人部别" required>
          <el-input v-model="form.deptName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="军人身份证号" required>
          <el-input v-model="form.sodierCode"></el-input>
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
  props:["data"],
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
        workStation: "",
        tel: "",
        address: "",
        idcard: "",
        marry: "",
        sodierName: "",
        sodierRelation: "",
        deptName: "",
        sodierCode: "",
        yizhu: "",
        familyStatus: "",
        sodierIdCard: "",
        EcoSituation: ""
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
      
     
      sodierRelationOptions: [
        {
          key: "1",
          value: "配偶"
        },
        {
          key: "2",
          value: "子女"
        },
        {
          key: "3",
          value: "其他家属"
        }
      ],
      
      
    };
  },
  created(){
    this.form = this.data ? this.data : this.form
  },
  methods: {
    cancel(){ 
      this.$router.push({
        path : '/UserManage',
        query : {
          personType : '4'
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var nameFlag = this.$utils.isEmpty(this.form.name);
          var codeFlag = this.$utils.isEmpty(this.form.gender);
          var deptFlag = this.$utils.isEmpty(this.form.address);
          var idFlag = this.$utils.isEmpty(this.form.sodierName);
          var idcFlag = this.$utils.isEmpty(this.form.sodierCode);
          var lisFlag = this.$utils.isEmpty(this.form.sodierRelation);
          var staffFlag = this.$utils.isEmpty(this.form.deptName);
      if(nameFlag || codeFlag||deptFlag || idFlag||idcFlag || lisFlag||staffFlag){
        alert("请先输入姓名性别等必填信息");
        return false;
      }else{
        this.form.personType=4;
        this.postAxios("DataCenter/SaveStaff", {staff:this.form})
        .then(res => {
          console.log(res);
          if(res.status){
            alert("保存成功");
            this.$router.push({
          path : '/UserManage',
          query : {
            personType : '4'
          }
      })
          }else{
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
    handleClick() {}
  }
};
</script>
