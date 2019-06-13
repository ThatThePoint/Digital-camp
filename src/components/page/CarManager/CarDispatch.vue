<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 车辆派遣
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="车辆申请" name="first">
          <div class="body">
            <el-form :model="form">
              <div class="flex"></div>
              <el-form-item label="司机" :label-width="formLabelWidth">
                <el-select clearable v-model="formInline.region" placeholder="请选择">
                  <el-option label="老张" value="shanghai"></el-option>
                  <el-option label="老李" value="beijing"></el-option>
                </el-select>使用人
                <el-select clearable v-model="formInline.region" placeholder="请选择" style="margin-left:10px;">
                  <el-option label="老张" value="shanghai"></el-option>
                  <el-option label="老李" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="起始时间" :label-width="formLabelWidth">
                <el-date-picker placeholder="选择时间"></el-date-picker>--
                <el-date-picker placeholder="选择时间"></el-date-picker>
              </el-form-item>

              <el-form-item label="目的地" :label-width="formLabelWidth">
                <el-input type="input" class="input-width"></el-input>里程
                <el-input type="input" class="input-width"></el-input>
              </el-form-item>

              <el-form-item label="申请车辆" :label-width="formLabelWidth">
                <el-select clearable v-model="formInline.region" placeholder="请选择">
                  <el-option label="冀JHSKDLL" value="shanghai"></el-option>
                  <el-option label="冀JHSKDLL" value="beijing"></el-option>
                </el-select>调度员
                <el-select clearable v-model="formInline.region" placeholder="请选择" style="margin-left:10px;">
                  <el-option label="管理员" value="shanghai"></el-option>
                  <el-option label="李长官" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="事由" :label-width="formLabelWidth">
                <el-input class="input-width" placeholder v-model="input2" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input class="input-width" placeholder v-model="input2" type="textarea"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="车辆调度" name="second">
          <div class="messages">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="formInline.region" placeholder="申请类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label>
                <el-select clearable v-model="formInline.region" placeholder="申请状态">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label>
                <el-input v-model="formInline.user" placeholder="申请人"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'license', order: 'descending'}"
            >
              <el-table-column prop="license" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="carNo" label="车辆编号" sortable width="120"></el-table-column>
              <el-table-column prop="ofDept" label="所属部门" sortable width="100"></el-table-column>
              <el-table-column prop="applyPerson" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="type" label="申请类型" sortable width="100"></el-table-column>
              <el-table-column prop="disc" label="申请描述" sortable width="160"></el-table-column>
              <el-table-column prop="date" label="申请时间" sortable width="100"></el-table-column>
              <el-table-column prop="status" label="申请状态" sortable width="100"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待审批车辆" name="fourth">
          待审批车辆
          <div class="messages">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="formInline.region" placeholder="申请类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label>
                <el-select clearable v-model="formInline.region" placeholder="申请状态">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label>
                <el-input v-model="formInline.user" placeholder="申请人"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'license', order: 'descending'}"
            >
              <el-table-column prop="license" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="carNo" label="车辆编号" sortable width="100"></el-table-column>
              <el-table-column prop="ofDept" label="所属部门" sortable width="100"></el-table-column>
              <el-table-column prop="applyPerson" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="type" label="申请类型" sortable width="100"></el-table-column>
              <el-table-column prop="disc" label="申请描述" sortable width="160"></el-table-column>
              <el-table-column prop="date" label="申请时间" sortable width="100"></el-table-column>
              <el-table-column prop="status" label="申请状态" sortable width="100"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleFourthEdit(scope.$index, scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已审批车辆" name="fifth">
          <div class="messages">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="formInline.region" placeholder="申请类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label>
                <el-select clearable v-model="formInline.region" placeholder="申请状态">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label>
                <el-input v-model="formInline.user" placeholder="申请人"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'license', order: 'descending'}"
            >
              <el-table-column prop="license" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="carNo" label="车辆编号" sortable width="100"></el-table-column>
              <el-table-column prop="ofDept" label="所属部门" sortable width="100"></el-table-column>
              <el-table-column prop="applyPerson" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="type" label="申请类型" sortable width="100"></el-table-column>
              <el-table-column prop="disc" label="申请描述" sortable width="160"></el-table-column>
              <el-table-column prop="date" label="申请时间" sortable width="100"></el-table-column>
              <el-table-column prop="status" label="申请状态" sortable width="100"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog title="用车信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <div class="flex"></div>
                <el-form-item label="申请车辆" :label-width="formLabelWidth">
                  <el-select clearable v-model="formInline.region" placeholder="申请类型">
                    <el-option label="冀JHSKDLL" value="shanghai"></el-option>
                    <el-option label="冀JHSKDLL" value="beijing"></el-option>
                  </el-select>
                  <el-select clearable
                    v-model="formInline.region"
                    placeholder="申请类型"
                    style="margin-left:10px;"
                  >
                    <el-option label="外出" value="shanghai"></el-option>
                    <el-option label="因私" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="日期筛选" :label-width="formLabelWidth">
                  <el-date-picker
                    class="input-width"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>--
                  <el-date-picker
                    class="input-width"
                    v-model="value2"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="申请描述" :label-width="formLabelWidth">
                  <el-input class="input-width" placeholder v-model="input2" type="textarea"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-tab-pane>
        <el-tab-pane label="进行中车辆" name="sixth">
          进行中车辆
          <div class="messages">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="formInline.car" placeholder="车辆">
                  <el-option label="粵A88888" value="SS"></el-option>
                  <el-option label="粵A88888" value="SSSS"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label>
                <el-input v-model="formInline.user" placeholder="申请人"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'license', order: 'descending'}"
            >
              <el-table-column prop="license" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="carNo" label="车辆编号" sortable width="100"></el-table-column>
              <el-table-column prop="ofDept" label="所属部门" sortable width="100"></el-table-column>
              <el-table-column prop="applyPerson" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="type" label="申请类型" sortable width="100"></el-table-column>
              <el-table-column prop="disc" label="申请描述" sortable width="160"></el-table-column>
              <el-table-column prop="date" label="申请时间" sortable width="100"></el-table-column>
              <el-table-column prop="status" label="申请状态" sortable width="100"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog title="用车信息" :visible.sync="dialogFormVisible">
              <el-form :model="useCarInfo">
                <div class="flex"></div>
                <el-form-item label="申请车辆" :label-width="formLabelWidth">
                  <el-select clearable v-model="useCarInfo.region" placeholder="申请类型">
                    <el-option label="冀JHSKDLL" value="shanghai"></el-option>
                    <el-option label="冀JHSKDLL" value="beijing"></el-option>
                  </el-select>
                  <el-select clearable v-model="useCarInfo.type" placeholder="申请类型" style="margin-left:10px;">
                    <el-option label="外出" value="shanghai"></el-option>
                    <el-option label="因私" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="日期筛选" :label-width="formLabelWidth">
                  <el-date-picker
                    class="input-width"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>--
                  <el-date-picker
                    class="input-width"
                    v-model="value2"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="申请描述" :label-width="formLabelWidth">
                  <el-input
                    class="input-width"
                    placeholder
                    v-model="useCarInfo.input2"
                    type="textarea"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-tab-pane>
        <el-tab-pane label="未批车辆" name="seventh">
          未批车辆
          <div class="messages">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="formInline.region" placeholder="申请类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label>
                <el-select clearable v-model="formInline.region" placeholder="申请状态">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label>
                <el-input v-model="formInline.user" placeholder="申请人"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'license', order: 'descending'}"
            >
              <el-table-column prop="license" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="carNo" label="车辆编号" sortable width="100"></el-table-column>
              <el-table-column prop="ofDept" label="所属部门" sortable width="100"></el-table-column>
              <el-table-column prop="applyPerson" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="type" label="申请类型" sortable width="100"></el-table-column>
              <el-table-column prop="disc" label="申请描述" sortable width="160"></el-table-column>
              <el-table-column prop="date" label="申请时间" sortable width="100"></el-table-column>
              <el-table-column prop="status" label="申请状态" sortable width="100"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog title="用车信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <div class="flex"></div>
                <el-form-item label="申请车辆" :label-width="formLabelWidth">
                  <el-select clearable v-model="formInline.region" placeholder="申请类型">
                    <el-option label="冀JHSKDLL" value="shanghai"></el-option>
                    <el-option label="冀JHSKDLL" value="beijing"></el-option>
                  </el-select>
                  <el-select clearable
                    v-model="formInline.region"
                    placeholder="申请类型"
                    style="margin-left:10px;"
                  >
                    <el-option label="外出" value="shanghai"></el-option>
                    <el-option label="因私" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="日期筛选" :label-width="formLabelWidth">
                  <el-date-picker
                    class="input-width"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>--
                  <el-date-picker
                    class="input-width"
                    v-model="value2"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="申请描述" :label-width="formLabelWidth">
                  <el-input class="input-width" placeholder v-model="input2" type="textarea"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-dialog :visible.sync="secondFormVisible">
        <el-form :model="form" ref="form" label-width="100px">
          <div class="second-title">申请信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请单号">
                <!-- <el-input v-model="form.danhao"></el-input> -->
                <el-input value="aa-8798-88"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用车人">
                <!-- <el-input v-model="form.yongcheren"></el-input> -->
                <el-input value="李连长"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用车部门">
                <!-- <el-input v-model="form.yongchebumen"></el-input> -->
                <el-input value="一连"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="用车开始时间">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
                  v-model="form.startTime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用车结束时间">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
                  v-model="form.endTime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用车风险">
                <!-- <el-select clearable v-model="form.region" placeholder="请选择">
                  <el-option label="一般" value="1"></el-option>
                  <el-option label="危险" value="2"></el-option>
                </el-select>-->
                <el-select clearable v-model="form.region" vlaue="一般" placeholder="请选择">
                  <el-option label="一般" value="1"></el-option>
                  <el-option label="危险" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="路线目的地">
                <el-input value="张洼村"></el-input>
                <!-- <el-input v-model="form.danhao"></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请事由">
                <el-input value="接取技术人员"></el-input>
                <!-- <el-input type="texarea" v-model="form.danhao"></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="随车负责人">
                <!-- <el-input v-model="form.danhao"></el-input> -->
                <el-input value="老张"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8 ">
              <el-form-item label="申请人">
                <el-input value="小刘"></el-input>
                <!-- <el-input v-model="form.danhao"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请时间">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
                  v-model="form.shenqingtime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="second-title">调度信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="调度结果">
                <el-input value="同意"></el-input>
                <!-- <el-input v-model="form.danhao"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调度人">
                <el-input value="老吴"></el-input>
                <!-- <el-input v-model="form.danhao"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调度时间">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
                  v-model="form.shenqingtime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="车牌号">
                <el-input value="冀A88888"></el-input>
                <!-- <el-input v-model="form.danhao"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="司机">
                <el-input value="王猛"></el-input>
                <!-- <el-input v-model="form.danhao"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input value="1588888888"></el-input>
                <!-- <el-input v-model="form.danhao"></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input value="无"></el-input>
                <!-- <el-input type="texarea" v-model="form.beizhu"></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="activeName!=='second'">
            <div class="second-title">审批信息</div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="审批人">
                  <el-input value="张三"></el-input>
                  <!-- <el-input v-model="form.danhao"></el-input> -->
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审批时间">
                  <el-date-picker
                    type="datetime"
                    placeholder="选择日期"
                    v-model="form.shenqingtime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="审批意见">
                  <el-input value="无"></el-input>
                  <!-- <el-input type="texarea" v-model="form.beizhu"></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="secondFormVisible = false">{{activeName==='fourth' ? '退回':'取 消'}}</el-button>
          <el-button
            type="primary"
            @click="secondFormVisible = false"
          >{{activeName==='fourth' ? '同 意':'确 定'}}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "documentManagement",
  data() {
    return {
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
      useCarInfo: {
        region: "shanghai",
        type: "shanghai",
        input2: "天津战备支援"
      },
      value1: "",
      value2: "",
      input2: "",
      options: [
        {
          value: "1",
          label: "普通"
        },
        {
          value: "2",
          label: "提醒"
        },
        {
          value: "3",
          label: "严重"
        },
        {
          value: "4",
          label: "警告"
        },
        {
          value: "5",
          label: "紧急"
        }
      ],
      value: "",
      activeName: "first",
      tableData: [
        {
          license: "冀A1231312",
          carNo: "2323",
          ofDept: "连队1",
          applyPerson: "小张",
          type: "内部车辆",
          disc: "接送亲戚",
          date: "2019-04-23",
          status: "待审批"
        },
        {
          license: "冀A1231312",
          carNo: "2323",
          ofDept: "连队1",
          applyPerson: "小张",
          type: "内部车辆",
          disc: "接送亲戚",
          date: "2019-04-23",
          status: "通过"
        },
        {
          license: "冀A1231312",
          carNo: "2323",
          ofDept: "连队1",
          applyPerson: "小张",
          type: "内部车辆",
          disc: "接送亲戚",
          date: "2019-04-23",
          status: "待审批"
        },
        {
          license: "冀A1231312",
          carNo: "2323",
          ofDept: "连队1",
          applyPerson: "小张",
          type: "内部车辆",
          disc: "接送亲戚",
          date: "2019-04-23",
          status: "待审批"
        }
      ],
      formInline: {
        user: "",
        region: ""
      },
      secondFormVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "1",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.secondFormVisible = true;
    },
    handleFourthEdit() {
      this.secondFormVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style scoped>
.input-width {
  width: 180px;
  margin: 0 10px;
}
.second-title {
  font-size: 20px;
  font-weight: 600;
}
</style>
