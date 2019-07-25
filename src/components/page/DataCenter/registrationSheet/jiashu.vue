<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-row>
      <el-col :span="5">
        <el-form-item label="姓名" required>
          <el-input v-model="form.name"></el-input>
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
    </el-row>
    <el-row>
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
      <el-col :span="5">
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
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item label="家庭住址">
          <el-input v-model="form.address"></el-input>
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
      form: {
        //以下才是对的数据
        tid: "",
        birthday: "",
        name: "",
        gender: "",
        birthday: "",
        origin: "",
        national: "",
        bornArea: "",
        workStation: "",
        tel: "",
        address: "",
        idcard: "",
        marry: ""
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
      ]
    };
  },
  created() {
    this.form = this.data ? this.data : this.form;
    if (this.data) {
      this.sub = "立即提交";
    }
  },
  methods: {
    blurs() {
      utils.isCardNo(this.form.idcard);
    },
    cancel() {
      this.$router.push({
        path: "/UserManage",
        query: {
          personType: "5"
        }
      });
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
            this.form.personType = 5;
            this.postAxios("DataCenter/SaveStaff", { staff: this.form })
              .then(res => {
                console.log(res);
                if (res.satus) {
                  alert("保存成功");
                  this.$router.push({
                    path: "/UserManage",
                    query: {
                      personType: "5"
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
    handleClick() {}
  }
};
</script>
