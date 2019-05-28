<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 新增人员
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="军官信息登记表" name="first">
          <Soldier></Soldier>
        </el-tab-pane>
        <el-tab-pane label="士兵信息登记表" name="second"><Officer/></el-tab-pane>
        <el-tab-pane label="文职人员信息登记表" name="third"></el-tab-pane>
        <el-tab-pane label="社会聘用人员信息登记表" name="fourth">
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
                  <el-date-picker
                    class="input-width"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
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
                <el-form-item label="部职别">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="工作日期">
                  <el-date-picker
                    class="input-width"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="身份证">
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
              <el-col :span="4">
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
                    v-model="form.date1"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="职工身份类别">
                  <el-select v-model="form.region" placeholder="请选择证件类型">
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
                  <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="在岗" value="shanghai"></el-option>
                    <el-option label="转岗非现役" value="beijing"></el-option>
                    <el-option label="抽组" value="beijing"></el-option>
                    <el-option label="托管" value="beijing"></el-option>
                    <el-option label="。。。" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="职工登记号码">
                  <el-input v-model="form.houqinProf"></el-input>
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
                    v-model="form.date1"
                    style="width: 100%;"
                  ></el-date-picker>
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
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 100%;"
                  ></el-date-picker>
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
                <el-form-item label="行政职务及日期">
                  <el-select v-model="form.armyRank" placeholder="请选择">
                    <el-option label="上将" value="shanghai"></el-option>
                    <el-option label="中将" value="beijing"></el-option>
                    <el-option label="少将" value="beijing"></el-option>
                    <el-option label="大校" value="beijing"></el-option>
                    <el-option label="。。。" value="beijing"></el-option>
                  </el-select>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 40%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="行政职务（管理岗位）等级及日期">
                  <el-input v-model="form.name" style="width: 40%;"></el-input>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 40%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="专业技术职务及日期">
                  <el-input v-model="form.name" style="width: 40%;"></el-input>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 40%;"
                  ></el-date-picker>
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
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 40%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="文职人员级别及日期">
                  <el-input v-model="form.name" style="width: 40%;"></el-input>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 40%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="公勤人员信息登记表" name="fif">
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
                  <el-date-picker
                    class="input-width"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
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
                <el-form-item label="部职别">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="工作日期">
                  <el-date-picker
                    class="input-width"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="身份证">
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
              <el-col :span="4">
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
                    v-model="form.date1"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="职工身份类别">
                  <el-select v-model="form.region" placeholder="请选择证件类型">
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
                  <el-select v-model="form.region" placeholder="请选择">
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
                    v-model="form.date1"
                    style="width: 100%;"
                  ></el-date-picker>
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
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 100%;"
                  ></el-date-picker>
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
                <el-form-item label="行政职务及日期">
                  <el-select v-model="form.armyRank" placeholder="请选择">
                    <el-option label="上将" value="shanghai"></el-option>
                    <el-option label="中将" value="beijing"></el-option>
                    <el-option label="少将" value="beijing"></el-option>
                    <el-option label="大校" value="beijing"></el-option>
                    <el-option label="。。。" value="beijing"></el-option>
                  </el-select>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 40%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="行政职务（管理岗位）等级及日期">
                  <el-input v-model="form.name" style="width: 40%;"></el-input>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 40%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="专业技术职务及日期">
                  <el-input v-model="form.name" style="width: 40%;"></el-input>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 40%;"
                  ></el-date-picker>
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
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 40%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="文职人员级别及日期">
                  <el-input v-model="form.name" style="width: 40%;"></el-input>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 40%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="现役人员家属信息登记表" name="six">
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
                  <el-date-picker
                    class="input-width"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
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
                <el-form-item label="工作单位">
                  <el-input v-model="form.chiefPosition"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="联系电话">
                  <el-input v-model="form.chiefPosition"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="家庭住址">
                  <el-input v-model="form.name"></el-input>
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
                    <el-option label="未婚" value="shaasanghai"></el-option>
                    <el-option label="已婚" value="beisdjing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <el-form-item label="对应军人姓名">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="与军人关系">
                  <el-select v-model="form.armyRank" placeholder="请选择">
                    <el-option label="配偶" value="shaasanghai"></el-option>
                    <el-option label="子女" value="beisdjing"></el-option>
                    <el-option label="其他家属" value="beisdjing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="军人部别">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <el-form-item label="军人证件号码">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="是否遗嘱">
                  <el-radio-group v-model="form.chiefLevDate">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="家属身份类别">
                  <el-select v-model="form.armyRank" placeholder="请选择">
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
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="经济状况">
                  <el-select v-model="form.armyRank" placeholder="请选择">
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
        </el-tab-pane>
        <el-tab-pane label="家属区人员信息登记表" name="seven">
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
                  <el-date-picker
                    class="input-width"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
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
              <el-col :span="6"></el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <el-form-item label="工作单位">
                  <el-input v-model="form.chiefPosition"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="联系电话">
                  <el-input v-model="form.chiefPosition"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="家庭住址">
                  <el-input v-model="form.name"></el-input>
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
                    <el-option label="未婚" value="shaasanghai"></el-option>
                    <el-option label="已婚" value="beisdjing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Soldier from "./registrationSheet/Soldier.vue";
import Officer from './registrationSheet/Officer.vue'
export default {
  name: "documentManagement",
  components: {
    Soldier,Officer
  },
  data() {
    return {
      activeName: "first",
      form: {
        name: "",
        politicsType: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        //以下才是对的数据
        tid: "",
        name: "",
        gender: "",
        origin: "",
        national: "",
        bornArea: "",
        blood: "",
        buzhibie: "",
        politicsType: "",
        idcard: "",
        marry: "",
        licenseType: "",
        licenseCode: "",
        staffType: "",
        houqinType: "",
        houqinProf: "",
        educatLevel: "",
        schoolDate: "",
        gradSchool: "",
        graduateType: "",
        gradDate: "",
        gradProf: "",
        retiredDate: "",
        localWeather: "",
        armyType: "",
        majorType: "",
        armyRank: "",
        rankDate: "",
        chiefPosition: "",
        chiefDate: "",
        chiefLevel: "",
        chiefLevDate: "",
        photoPath: "",
        shiguanChangeDate: "",
        jobPostion: ""
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      input2: "",
      departmentOptions: [
        {
          value: "1",
          label: "连队1"
        },
        {
          value: "2",
          label: "连队2"
        },
        {
          value: "3",
          label: "连队3"
        },
        {
          value: "4",
          label: "连队4"
        }
      ],
      propertyOptions: [
        {
          value: "1",
          label: "内部车辆"
        },
        {
          value: "2",
          label: "外部车辆"
        },
        {
          value: "3",
          label: "临时车辆"
        }
      ],
      inoutOptions: [
        {
          value: "1",
          label: "内部车辆"
        },
        {
          value: "2",
          label: "外部车辆"
        },
        {
          value: "3",
          label: "临时车辆"
        }
      ],
      propertyValue: "", //车辆属性1-内部 2-外部 3-临时
      departmentValue: "", //单位
      carOfDept: "", //车辆单位
      carType1: "", //type1
      carType2: "", //
      inoutValue: "", //出入库状态
      brandValue: "", //品牌
      brandOptions: [
        {
          value: "1",
          label: "丰田"
        },
        {
          value: "2",
          label: "大众"
        },
        {
          value: "3",
          label: "本田"
        }
      ],
      modelValue: "", //型号
      modelOptions: [
        {
          value: "1",
          label: "途观"
        },
        {
          value: "2",
          label: "帕萨特"
        },
        {
          value: "3",
          label: "捷达"
        }
      ],
      colorValue: "", //颜色
      colorOptions: [
        {
          value: "1",
          label: "红色"
        },
        {
          value: "2",
          label: "白色"
        },
        {
          value: "3",
          label: "绿色"
        }
      ],
      VehicleNo: "", //行驶证号
      driverNo: "", //驾驶证号
      carSeat: 5, //座位数
      seatOptions: [
        {
          label: "1",
          value: "1"
        },
        {
          label: "2",
          value: "2"
        },
        {
          label: "3",
          value: "3"
        }
      ],
      carLoad: "", //车辆载重
      frameNo: "", //车架号
      engineNo: "", //发动机号
      carType1: "", //
      carType2: "", //
      carRight: "", //
      date1: "",
      date2: "",
      bumen: "",
      hah1: "",
      jhh: "",
      hahhsd: "",
      rightOptions: [
        {
          value: "1",
          label: "最高权限"
        },
        {
          value: "2",
          label: "普通权限"
        },
        {
          value: "3",
          label: "最低权限"
        }
      ],
      tableData: [
        {
          license: "冀A1231312",
          property: "内部车辆",
          department: "连队1",
          carUser: "小明",
          tel: "1329999999",
          inout: "内部车辆"
        },
        {
          license: "冀A1231312",
          property: "内部车辆",
          department: "连队1",
          carUser: "小明",
          tel: "1329999999",
          inout: "内部车辆"
        },
        {
          license: "冀A1231312",
          property: "内部车辆",
          department: "连队1",
          carUser: "小明",
          tel: "1329999999",
          inout: "内部车辆"
        },
        {
          license: "冀A1231312",
          property: "内部车辆",
          department: "连队1",
          carUser: "小明",
          tel: "1329999999",
          inout: "内部车辆"
        }
      ]
    };
  },
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
    },
    getData() {
      this.postAxios("sysConfig/BasedataList")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.$message('数据获取错误')
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
.input-width {
  /* width: 100px; */
  width: 150px;
  margin: 0 10px;
}
.header-container {
  /* background:#d8d5d5; */
  display: flex;
}
.carImg {
  width: 100px;
  height: 120px;
  vertical-align: middle;
  border: 1px solid;
  text-align: center;
  line-height: 120px;
}
.carDet {
  vertical-align: middle;
  box-sizing: border-box;
  padding: 24px 20px;
}
.license {
  padding: 10px 0;
}
.itemDet {
  padding: 20px 0 0 80px;
}
.upload {
  display: inline-block;
}
.one,
.two {
  padding: 10px 20px;
  border: 1px solid #d0d0d0;
  margin-top: 5px;
}
.itemDet[data-v-b889b1ce] {
  padding: 7px 0 7px 80px;
}
.color {
  display: inline-block;
  width: 68px;
}
.datas {
  display: inline-block;
  width: 93px;
}
.carstwo {
  display: inline-block;
  width: 100px;
}
.used {
  display: inline-block;
  width: 40px;
  height: 20px;
  text-align: center;
  border-radius: 2px;
  color: red;
}
</style>
