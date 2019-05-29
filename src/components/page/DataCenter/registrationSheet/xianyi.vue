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
        <el-form-item label="工作单位">
          <el-input v-model="form.workStation"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="联系电话">
          <el-input v-model="form.tel"></el-input>
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
    <el-row>
      <el-col :span="6">
        <el-form-item label="身份证">
          <el-input v-model="form.idcard"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="婚姻状况">
          <el-select v-model="form.marry" placeholder="请选择">
            <el-option label="未婚" value="shaasanghai"></el-option>
            <el-option label="已婚" value="beisdjing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="对应军人姓名">
          <el-input v-model="form.sodierName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="与军人关系">
          <el-select v-model="form.sodierRelation" placeholder="请选择">
            <el-option label="配偶" value="shaasanghai"></el-option>
            <el-option label="子女" value="beisdjing"></el-option>
            <el-option label="其他家属" value="beisdjing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="军人部别">
          <el-input v-model="form.deptName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="军人证件号码">
          <el-input v-model="form.sodierCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="是否遗嘱">
          <el-radio-group v-model="form.yizhu">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="家属身份类别">
          <el-select v-model="form.familyStatus" placeholder="请选择">
            <el-option label="已故离休干部配偶" value="shaasanghai"></el-option>
            <el-option label="随军家属" value="beisdjing"></el-option>
            <el-option label="符合随军未随队家属" value="beisdjing"></el-option>
            <el-option label="。。。" value="beisdjing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item label="军人身份证号码">
          <el-input v-model="form.sodierIdCard"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="经济状况">
          <el-select v-model="form.EcoSituation" placeholder="请选择">
            <el-option label="无收入" value="shaasanghai"></el-option>
            <el-option label="空招空挂" value="beisdjing"></el-option>
            <el-option label="享受生活困难补贴" value="beisdjing"></el-option>
            <el-option label="。。。" value="beisdjing"></el-option>
          </el-select>
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
      }
    };
  },
  methods:{
       onSubmit() {},
       handleClick(){},
  }
};
</script>
