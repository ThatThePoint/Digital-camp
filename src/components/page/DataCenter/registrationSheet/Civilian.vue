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
        <el-form-item label="工作日期">
          <el-date-picker class="input-width" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-form-item label="部职别">
          <el-input v-model="form.name"></el-input>
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
          <el-select v-model="form.region" placeholder="请选择证件类型">
            <el-option label="军官证" value="shanghai"></el-option>
            <el-option label="文职干部证" value="beijing"></el-option>
            <el-option label="离休证" value="beijing"></el-option>
            <el-option label="退休证" value="beijing"></el-option>
            <el-option label="学员证" value="beijing"></el-option>
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
      <el-col :span="6">
        <el-form-item label="转改/聘用时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="转改命令/聘用合同编号">
          <el-input v-model="form.jobPostion"></el-input>
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
        <el-form-item label="人员类别">
          <el-select v-model="form.staffType" placeholder="请选择">
            <el-option label="转改管理" value="shanghai"></el-option>
            <el-option label="转改技术" value="beijing"></el-option>
            <el-option label="。。。" value="beijing"></el-option>
            <el-option label="。。。" value="beijing"></el-option>
            <el-option label="。。。" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="所在气候区">
          <el-select v-model="form.localWeather" placeholder="请选择">
            <el-option label="高寒区" value="shanghai"></el-option>
            <el-option label="寒区" value="beijing"></el-option>
            <el-option label="温区" value="beijing"></el-option>
            <el-option label="亚热区" value="beijing"></el-option>
            <el-option label="热区" value="beijing"></el-option>
          </el-select>
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
      <el-col :span="6">
        <el-form-item label="岗位等级及日期">
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
      <el-col :span="8">
        <el-form-item label="文职人员等级及日期">
          <el-input v-model="form.name" style="width: 40%;"></el-input>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 40%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="专业技术职务及日期">
          <el-input v-model="form.name" style="width: 40%;"></el-input>
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
export default {};
</script>
<style lang="sass" scoped>

</style>
