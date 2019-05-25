<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-row>
      <el-col :span="3">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="性别">
          <el-radio-group v-model="form.resource">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="出生日期">
          <el-date-picker class="input-width" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-form-item label="籍贯">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="民族">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="出生地">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="血型">
          <el-select v-model="form.region" placeholder="请选择血型">
            <el-option label="A" value="shanghai"></el-option>
            <el-option label="B" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-form-item label="入伍日期">
          <el-date-picker class="input-width" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="4">
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
        <el-form-item label="身份证">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="婚姻状况">
          <el-select v-model="form.marry" placeholder="请选择">
            <el-option label="已婚" value="shaasanghai"></el-option>
            <el-option label="未婚" value="beisdjing"></el-option>
            <el-option label="未知" value="shaasanghai"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="证件类型">
          <el-select v-model="form.licenseType" placeholder="请选择证件类型">
            <el-option label="士兵证" value="shanghai"></el-option>
            <el-option label="退休证" value="beijing"></el-option>
            <el-option label="学员" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="证件编号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-form-item label="部职别">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="士官改选日期">
          <el-date-picker
            class="input-width"
            v-model="shiguanChangeDate"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item label="工作岗位">
          <el-input v-model="form.jobPostion"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="人员类别">
          <el-select v-model="form.staffType" placeholder="请选择">
            <el-option label="士官" value="shanghai"></el-option>
            <el-option label="兵" value="beijing"></el-option>
            <el-option label="培养士官学员" value="beijing"></el-option>
            <el-option label="学兵" value="beijing"></el-option>
            <el-option label="。。。" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="后勤人员分类">
          <el-select v-model="form.houqinType" placeholder="请选择">
            <el-option label="机关人员" value="shanghai"></el-option>
            <el-option label="直属分队" value="beijing"></el-option>
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
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="毕业院校">
          <el-input v-model="form.name"></el-input>
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
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="毕业专业">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="军种">
          <el-select v-model="form.armyType" placeholder="请选择">
            <el-option label="陆军" value="shanghai"></el-option>
            <el-option label="海军" value="beijing"></el-option>
            <el-option label="空军" value="beijing"></el-option>
            <el-option label="火箭军" value="beijing"></el-option>
            <el-option label="战略支援部队" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="主类别">
          <el-radio-group v-model="form.resource">
            <el-radio label="军事"></el-radio>
            <el-radio label="政工"></el-radio>
            <el-radio label="后勤"></el-radio>
            <el-radio label="装备"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="军衔及日期" :span="5">
          <el-select v-model="form.armyRank" placeholder="请选择">
            <el-option label="上将" value="shanghai"></el-option>
            <el-option label="中将" value="beijing"></el-option>
            <el-option label="少将" value="beijing"></el-option>
            <el-option label="大校" value="beijing"></el-option>
            <el-option label="。。。" value="beijing"></el-option>
          </el-select>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 40%;"></el-date-picker>
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
  data() {return{}},
  methods: {
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
    }
  }
};
</script>
<style lang="sass" scoped>

</style>
