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
        <el-tab-pane label="我的申请" name="first">
          <div class="messages">
            <el-form :inline="true" :model="param" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="param.carId" placeholder="我的申请">
                  <el-option
                  v-for="item in carOptions"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="adduser">新增</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'applytime', order: 'descending'}"
            >
              <el-table-column prop="licensePlate" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="applyer" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="applyerDeptName" label="用车部门" sortable width="100"></el-table-column>
              <el-table-column prop="reason" label="用车事由" sortable width="200"></el-table-column>
              <el-table-column prop="applytime" label="申请时间" :formatter="formatterDate" sortable width="160"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleDetail(scope)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="车辆调度" name="second">
          <div class="messages">
            <el-form :inline="true" :model="param" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="param.carId" placeholder="申请车辆">
                  <el-option
                  v-for="item in carOptions"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'applytime', order: 'descending'}"
            >
              <el-table-column prop="formcode" label="申请单号" sortable width="100"></el-table-column>
              <el-table-column prop="licensePlate" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="applyer" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="applyerDeptName" label="用车部门" sortable width="100"></el-table-column>
              <el-table-column prop="reason" label="用车事由" sortable width="200"></el-table-column>
              <el-table-column prop="applytime" label="申请时间" :formatter="formatterDate" sortable width="160"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleDetail(scope)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待审批车辆" name="fourth">
          <div class="messages">
            <el-form :inline="true" :model="param" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="param.carId" placeholder="申请车辆">
                  <el-option
                  v-for="item in carOptions"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'applytime', order: 'descending'}"
            >
              <el-table-column prop="licensePlate" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="applyer" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="applyerDeptName" label="用车部门" sortable width="100"></el-table-column>
              <el-table-column prop="reason" label="用车事由" sortable width="200"></el-table-column>
              <el-table-column prop="applytime" label="申请时间" :formatter="formatterDate"  sortable width="160"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleDetail(scope)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已审批车辆" name="fifth">
          <div class="messages">
            <el-form :inline="true" :model="param" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="param.carId" placeholder="申请车辆">
                  <el-option
                  v-for="item in carOptions"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'applytime', order: 'descending'}"
            >
              <el-table-column prop="licensePlate" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="applyer" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="applyerDeptName" label="用车部门" sortable width="100"></el-table-column>
              <el-table-column prop="reason" label="用车事由" sortable width="200"></el-table-column>
              <el-table-column prop="applytime" label="申请时间" :formatter="formatterDate"  sortable width="160"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleDetail(scope)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="进行中车辆" name="sixth">
         <div class="messages">
            <el-form :inline="true" :model="param" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="param.carId" placeholder="申请车辆">
                  <el-option
                  v-for="item in carOptions"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'applytime', order: 'descending'}"
            >
              <el-table-column prop="licensePlate" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="applyer" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="applyerDeptName" label="用车部门" sortable width="100"></el-table-column>
              <el-table-column prop="reason" label="用车事由" sortable width="200"></el-table-column>
              <el-table-column prop="applytime" label="申请时间" :formatter="formatterDate"  sortable width="160"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleDetail(scope)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="未批车辆" name="seventh">
          <div class="messages">
            <el-form :inline="true" :model="param" class="demo-form-inline">
              <el-form-item label>
                <el-select clearable v-model="param.carId" placeholder="申请车辆">
                  <el-option
                  v-for="item in carOptions"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'applytime', order: 'descending'}"
            >
              <el-table-column prop="licensePlate" label="车牌号" sortable width="100"></el-table-column>
              <el-table-column prop="applyer" label="申请人" sortable width="100"></el-table-column>
              <el-table-column prop="applyerDeptName" label="用车部门" sortable width="100"></el-table-column>
              <el-table-column prop="reason" label="用车事由" sortable width="200"></el-table-column>
              <el-table-column prop="applytime" label="申请时间" :formatter="formatterDate" sortable width="160"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleDetail(scope)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>


      <el-dialog :visible.sync="carApplyInfoVisible">
        <el-form :model="applyInfo">
              <div class="flex">用车申请</div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="用车人" :label-width="formLabelWidth">
                    <el-input disabled type="input" v-model="applyInfo.applyer" class="input-width"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="用车部门" :label-width="formLabelWidth">
                    <el-input disabled type="input" v-model="applyInfo.applyerDeptName" class="input-width"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="起始时间" :label-width="formLabelWidth">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择日期"
                      v-model="applyInfo.starttime"
                      style="width:145px;margin-left:10px"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="截至时间" :label-width="formLabelWidth">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择日期"
                      v-model="applyInfo.endtime"
                      style="width:145px;margin-left:10px"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="目的地" :label-width="formLabelWidth">
                    <el-input type="input" v-model="applyInfo.destination" class="input-width"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="用车风险" :label-width="formLabelWidth">
                    <el-select clearable v-model="applyInfo.risk" placeholder="请选择" style="margin-left:10px;width:145px">
                      <el-option
                        v-for="item in riskOptions"
                        :key="item.code"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="事由" :label-width="formLabelWidth">
                    <el-input
                      class="input-width"
                      placeholder
                      v-model="applyInfo.reason"
                      type="textarea"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="调度员" :label-width="formLabelWidth">
                    <el-select
                      clearable
                      v-model="applyInfo.dispatcherid"
                      placeholder="请选择"
                      style="margin-left:10px;width:145px"
                    >
                      <el-option
                        v-for="item in applyInfo.dispatcherList"
                        :key="item.tid"
                        :label="item.name"
                        :value="item.tid"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="随车人" :label-width="formLabelWidth">
                    <el-input v-show="false" v-model="applyInfo.followersIds" type="input"></el-input>
                    <el-input 
                      class="input-width" 
                      v-model="applyInfo.followersNames" 
                      type="input" 
                      style="width:386px"
                      @focus="focus"  
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelApply">取 消</el-button>
              <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
      </el-dialog>


      <!-- 没有审批信息 -->
      <el-dialog :visible.sync="wushenpi">
        11
        <el-form :model="applyInfo" ref="applyInfo" label-width="100px">
          <div class="second-title">申请信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请单号">
                <label>{{applyInfo.code}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用车人">
                <label>{{applyInfo.applyer}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用车部门">
                <label>{{applyInfo.applyerDeptName}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="用车开始时间">
                <label>{{applyInfo.starttime}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用车结束时间">
                <label>{{applyInfo.endtime}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请时间">
                <label>{{applyInfo.applytime}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="路线目的地">
                <label>{{applyInfo.destination}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请车辆">
                <label>{{applyInfo.licensePlate}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请司机">
                <label>{{applyInfo.driverName}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="申请事由">
                <label>{{applyInfo.reason}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="备注">
                <label>{{applyInfo.remark}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="second-title">调度信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="调度结果">
                <el-radio-group :disabled="dispatchDetailDisabled" v-model="dispatchResult">
                            <el-radio :label=1>同意</el-radio>
                            <el-radio :label=0>退回</el-radio>
                        </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调度人">
                <label>{{applyInfo.dispatcherName}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调度时间">
                <label>{{applyInfo.dispatchTime}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="调度车辆">
                <el-select clearable :disabled="dispatchDetailDisabled" v-model="applyInfo.carid" placeholder="调度车辆">
                  <el-option
                  v-for="item in carOptions"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调度司机">
                <el-select clearable :disabled="dispatchDetailDisabled" v-model="applyInfo.driverid" placeholder="调度司机">
                  <el-option
                  v-for="item in applyInfo.driverList"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审批人">
                <el-select clearable :disabled="dispatchDetailDisabled" v-model="applyInfo.approverid" placeholder="审批人">
                  <el-option
                  v-for="item in applyInfo.approverList"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelDetail">取消</el-button>
          <el-button v-show="dispatchCommit" @click="dispatchApply">提交</el-button>
          <el-button v-show="approvalPass" @click="passApproval">通过</el-button>
          <el-button v-show="approvalPass" @click="rejectApproval">退回</el-button>
        </div>
      </el-dialog>


      <!-- 有审批信息 -->
      <el-dialog :visible.sync="youshenpi">
        22
        <el-form :model="applyInfo" ref="applyInfo" label-width="100px">
          <div class="second-title">申请信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请单号">
                <label>{{applyInfo.code}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用车人">
                <label>{{applyInfo.applyer}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用车部门">
                <label>{{applyInfo.applyerDeptName}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="用车开始时间">
                <label>{{applyInfo.starttime}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用车结束时间">
                <label>{{applyInfo.endtime}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请时间">
                <label>{{applyInfo.applytime}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="路线目的地">
                <label>{{applyInfo.destination}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请车辆">
                <label>{{applyInfo.licensePlate}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请司机">
                <label>{{applyInfo.driverName}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="申请事由">
                <label>{{applyInfo.reason}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="备注">
                <label>{{applyInfo.remark}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="second-title">调度信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="调度结果">
                <el-radio-group :disabled="dispatchDetailDisabled" v-model="dispatchResult">
                            <el-radio :label=1>同意</el-radio>
                            <el-radio :label=0>退回</el-radio>
                        </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调度人">
                <label>{{applyInfo.dispatcherName}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调度时间">
                <label>{{applyInfo.dispatchTime}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="调度车辆">
                <el-select clearable :disabled="dispatchDetailDisabled" v-model="applyInfo.carid" placeholder="调度车辆">
                  <el-option
                  v-for="item in carOptions"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调度司机">
                <el-select clearable :disabled="dispatchDetailDisabled" v-model="applyInfo.driverid" placeholder="调度司机">
                  <el-option
                  v-for="item in applyInfo.driverList"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审批人">
                <el-select clearable :disabled="dispatchDetailDisabled" v-model="applyInfo.approverid" placeholder="审批人">
                  <el-option
                  v-for="item in applyInfo.approverList"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 审批信息 -->
          <div>
            <div class="second-title">审批信息</div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="审批人">
                  <label>{{applyInfo.approver}}</label>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <label>{{applyInfo.approverRemark}}</label>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="审批意见">
                  <el-input :disabled=approvalDetailDisabled v-model="applyInfo.approverRemark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelDetail">取消</el-button>
          <el-button v-show="dispatchCommit" @click="dispatchApply">提交</el-button>
          <el-button v-show="approvalPass" @click="passApproval">通过</el-button>
          <el-button v-show="approvalPass" @click="rejectApproval">退回</el-button>
        </div>
      </el-dialog>

      <el-dialog
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <span> <postemail  v-on:confirm="confirms" :parentlist="parentlist"/></span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm" >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import postemail from "../DailyOffice/postemail"; // 源码位置
export default {
  name: "carDispatch",
  data() {
    return {
      ///新数据-----------
      wushenpi: false,
      youshenpi: false,
      parentlist:[],//传给穿梭框的树表数据
      dialogVisible: false,
      applyInfo: {},
      param:{
        carId:""
      },
      carOptions:[],
      activeName: "first",
      tableData: [],
      count:0,
      applyDialogFormVisible:false, //申请信息弹窗
      approvalDetail:false, //审批详情
      dispatchResult:1, //调度结果
      dispatchDetailDisabled:false,
      approvalDetailDisabled:false,
      dispatchCommit:false, //调度提交按钮显示隐藏
      approvalPass:false,//通过/退回 审核

      carApplyInfoVisible : false ,
      riskOptions:[
        "一般风险",
        "较高风险",
        "高风险"
      ],
      applystatus:1,
      ///以上新数据-----------

      
      form:{},
      formLabelWidth: "120px"
    };
  },
  components: {
    postemail
  },
  created() {
    this.getTableData();
    this.postAxios("/CarApply/ApplyInfo",{
        //  tid:this.docuId
      })
      .then(res => {
        this.parentlist = this.getTree(res.staffData);

      })
      .catch(err => {
        console.log(err);
    });
  },
  methods: {
    //时间格式化  
    formatterDate(row,index){
      return this.$utils.timeFormatter(row.applytime);
    },
    getTree(data){
      let map = {};
      let val = [];
      //生成数据对象集合
      data.forEach(it=>{
        delete it.children;
        map[it.id] = it;
      })
      //生成结果集
      data.forEach(it=>{
          const parent = map[it.pid];
          if(parent){
              if(!Array.isArray(parent.children)) parent.children = [];
              parent.children.push(it);
          }else{
              val.push(it);
          }
      })
      return val;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    cancel(){
      this.dialogVisible = false;
    },
    confirm(info){
      this.dialogVisible = false;
    },
    confirms(a){
      this.applyInfo.followersNames = a[0]
      this.perid = a[1]
    },
    focus(){
      this.dialogVisible = true;
    },
    //新增
    adduser(){
      this.carApplyInfoVisible = true
    },
    //以下====新
    search(){

    },
    getApplyInfo(id) {
      this.postAxios("/CarApply/ApplyInfo", {tid:id})
        .then(res => {
          this.applyInfo = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      var params = {
        info: this.applyInfo
      };
      this.postAxios("/CarApply/SaveApplyInfo", params)
        .then(res => {
          alert("保存成功");
          //保存成功重新加载表单
          //this.getApplyInfo();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //取消申请
    cancelApply() {
      this.carApplyInfoVisible=false;
    },
    //获取列表数据
    getTableData(num,size){
      var canshu={
        tab:this.activeName,
        carId:this.param.carId,
        pageNum : num, 
        pageSize : size
      };
      this.postAxios("/CarApply/SearchCarApply", canshu)
        .then(res => {
          console.log(res);
          this.tableData=res.data;
          this.count=res.count;
          this.carOptions=res.carOptions;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //tab切换事件
    handleClick(tab, event) {
      console.log(tab, event);
      this.getTableData();
    },
    handleDetail(scope){
      
      //0-待调度 1-调度退回 2-待审批,3-已批准, 4-审批退回
      if(this.activeName=='first'){//0-待调度
      // approvalDetail  审批信息
        if(scope.row.applystatus=='1'){
          this.carApplyInfoVisible=true      //一弹框
          this.youshenpi=false; 
          this.wushenpi=false; 
          this.dispatchDetailDisabled=false;
          
          
          this.dispatchCommit=true; //显示提交按钮
          this.approvalPass=false; //隐藏审批通过和退回按钮
        }else if(scope.row.applystatus=='0' || scope.row.applystatus=='2'){
          this.carApplyInfoVisible=false //一弹框
          this.youshenpi=false; 
          this.wushenpi=true; 
          this.dispatchDetailDisabled=false;
          
                    
          this.dispatchCommit=true; //显示提交按钮
          this.approvalPass=false; //隐藏审批通过和退回按钮
        }else if(scope.row.applystatus=='3' || scope.row.applystatus=='4')
          this.dispatchDetailDisabled=false;
          this.carApplyInfoVisible=false //一弹框
          this.youshenpi=true; 
          this.wushenpi=false; 
          this.dispatchCommit=true; //显示提交按钮
          this.approvalPass=false; //隐藏审批通过和退回按钮
      }
      // else if(scope.row.applystatus==1){//1-调度退回
      //   this.approvalDetail=false;
      //   this.dispatchDetailDisabled=false;
      //   this.dispatchCommit=true;//隐藏提交
      //   this.approvalPass=false;//隐藏审批通过和退回
      // }else if(scope.row.applystatus==2){//2-待审批
      //   this.approvalDetail=true;
      //   this.dispatchDetailDisabled=true;
      //   this.approvalDetailDisabled=false;
      //   this.dispatchCommit=false;//隐藏提交
      //   this.approvalPass=true;//显示审批通过和退回
        
      // }else if(scope.row.applystatus==3){//3-已批准
      //   this.approvalDetail=true;
      //   this.dispatchDetailDisabled=true;
      //   this.approvalDetailDisabled=true;
      //   this.dispatchCommit=false;//隐藏提交
      //   this.approvalPass=false;//隐藏审批通过和退回
      // }else if(scope.row.applystatus==4){//4-审批退回
      //   this.approvalDetail=true;
      //   this.dispatchDetailDisabled=true;
      //   this.approvalDetailDisabled=false;
      //   this.dispatchCommit=false;//隐藏提交
      //   this.approvalPass=true;//显示审批通过和退回
      // }
      this.getApplyInfo(scope.row.tid);
    },
    //关闭详情
    cancelDetail(){
      this.applyDialogFormVisible=false;
      this.youshenpi = false
      this.wushenpi = false
      this.applyInfo={};
    },
    //提交调度
    dispatchApply(){
      if(this.dispatchResult){//调度通过
        var appFlag=this.$utils.isEmpty(this.applyInfo.approverid);
        var carFlag=this.$utils.isEmpty(this.applyInfo.carid);
        var driverFlag=this.$utils.isEmpty(this.applyInfo.driverid);
        if(appFlag || carFlag || driverFlag){
          alert("请选择调度车辆、司机、审批人！");
          return false;
        }
      }
      var da={
        tid:this.applyInfo.formId,
        approvalStatus:this.dispatchResult,
        nexapproverid:this.applyInfo.approverid,
        driverid:this.applyInfo.driverid,
        carid:this.applyInfo.carid
      };
      this.postAxios("/CarApply/SaveApproval", da)
        .then(res => {
          console.log(res);
          if(res.status){
            this.applyDialogFormVisible=false;
          }else{
            alert(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //审批通过
    passApproval(){
      var da={
        tid:this.applyInfo.formId,
        approvalStatus:1
      };
      this.postAxios("/CarApply/SaveApproval", da)
        .then(res => {
          console.log(res);
          if(res.status){
            alert("审批完成");
            this.applyDialogFormVisible=false;
          }else{
            alert(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //审批退回
    rejectApproval(){
      var da={
        tid:this.applyInfo.formId,
        approvalStatus:0
      };
      this.postAxios("/CarApply/SaveApproval", da)
        .then(res => {
          console.log(res);
          if(res.status){
            alert("审批完成");
            this.applyDialogFormVisible=false;
          }else{
            alert(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //以上====新

    formatter(row, column) {
      return row.address;
    }
  }
};
</script>
<style scoped>
.input-width {
  width: 145px;
  margin: 0 10px;
}
.second-title {
  font-size: 20px;
  font-weight: 600;
}
</style>