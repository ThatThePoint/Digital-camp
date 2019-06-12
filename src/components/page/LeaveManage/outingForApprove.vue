<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>待审批请假</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="applyerName" label="申请人" sortable></el-table-column>
          <el-table-column prop="applyDeptName" label="申请人部门" sortable></el-table-column>
          <el-table-column prop="outingType" label="外出类型"></el-table-column>
          <el-table-column prop="outingContent" label="外出内容"></el-table-column>
          <el-table-column prop="startTime" label="外出时间" :formatter="starttimeFormatter"></el-table-column>
          <el-table-column prop="endTime" label="返岗时间" :formatter="endtimeFormatter"></el-table-column>
          <el-table-column prop="timeLength" label="申请时长"></el-table-column>
          <el-table-column prop="curApprovalName" label="当前审批人"></el-table-column>
          <el-table-column prop="status" label="审批状态" :formatter="statusFormatter"></el-table-column>
          <el-table-column label="操作" sortable width="300px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="count"
            :current-page.sync="currentPage"
          ></el-pagination>
        </div>
        <el-dialog title="外出申请" :visible.sync="confirmFormVisible">
          <el-form :model="form" label-width="100px" ref="form">
            <el-row>
              <el-col :span="6">
                <el-form-item label="申请人">{{form.applyerName}}</el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="部门">{{form.applyDeptName}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="请假人">{{form.outingStaffName}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="外出类型">{{form.outingType}}</el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="外出原因">{{form.outingContent}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="开始日期">{{form.startTime}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结束日期">{{form.endTime}}</el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="请假时间">{{form.timeLength}}小时</el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="block">
            <el-timeline>
              <el-timeline-item
                timestamp="2018/4/2"
                placement="top"
                v-if="!activities.secApproverList"
              >
                <el-card>
                  <h4>张主任</h4>
                  <p>同意</p>
                  <div>
                    <el-radio-group v-model="resource">
                      <el-radio label="同意" value="1"></el-radio>
                      <el-radio label="退回" value="2"></el-radio>
                    </el-radio-group>
                    <el-row>
                      <el-col :span="18" class="flex">
                        <div style="width:80px;">意见</div>
                        <el-input v-model="name"></el-input>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </el-timeline-item>
              <el-timeline-item
                timestamp="2018/4/2"
                placement="top"
                v-if="activities.secApproverList"
              >
                <el-card>
                  <h4>张主任</h4>
                  <p>同意</p>
                  <div>
                    <el-radio-group v-model="resource">
                      <el-radio label="同意" value="1"></el-radio>
                      <el-radio label="退回" value="2"></el-radio>
                    </el-radio-group>
                    <el-row>
                      <el-col :span="18" class="flex">
                        <div style="width:80px;">意见</div>
                        <el-input v-model="name"></el-input>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </el-timeline-item>
              <el-timeline-item
                timestamp="2018/4/3"
                placement="top"
                v-if="activities.thdApproverList"
              >
                <el-card>
                  <h4>王主任</h4>
                  <p>同意</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="confirmFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "documentManagement",
  data() {
    return {
      name: "",
      form: {},
      curNode: 1,
      seletOptions: {},
      resource: 1,
      count: 1,
      currentPage: 1,
      confirmLeave: {},
      confirmFormVisible: false,
      checked: "",
      value: "",
      tableData: [],
      activities: {}
    };
  },
  methods: {
    //  当前节点 1-建单
    //  2-一级审批（有二级审批）
    //  3-一级审批（无二级审批）
    //  4-二级审批（有三级审批）
    //  5-二级审批（无三级审批）
    //  6-三级审批
    //  7-归档：此时只能查看不能修改（表单退回即为归档）
    starttimeFormatter(row, column) {
      if (row.startTime) {
        return row.startTime.replace("T", " ");
      } else {
        return row.startTime;
      }
    },
    endtimeFormatter(row, column) {
      if (row.endTime) {
        return row.endTime.replace("T", " ");
      } else {
        return row.endTime;
      }
    },
    statusFormatter(row, colum) {
      switch (row.status) {
        case 1:
          return "待审批";
          break;
        case 2:
          return "归档";
          break;
        case 1:
          return "退回";
          break;
        case 1:
          return "草稿";
          break;
        default:
          return "待审批";
          break;
      }
    },
    // 分页导航
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
      this.getData("", val);
    },
    handleSearch() {
      this.getData(this.formInline.user);
      this.currentPage = 1;
    },
    initBaseinfo() {
      this.baseinfo = {
        code: "",
        name: "",
        status: 1,
        note: ""
      };
      this.currentPage = 1;
      this.title = "添加字典";
      this.detailInfo = {};
      this.getData();
    },
    getFormData(tid) {
      this.postAxios("OutApply/ApplyInfo", { tid })
        .then(res => {
          this.activities = { ...res };
          console.log(111111111111);
          console.log(this.activities);
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // handleSave() {
    //   console.log(this.baseinfo);
    //   let codeFlag = this.$utils.isEmpty(this.baseinfo.code);
    //   let nameFlag = this.$utils.isEmpty(this.baseinfo.name);
    //   let noteFlag = this.$utils.isEmpty(this.baseinfo.note);
    //   console.log(codeFlag, nameFlag, noteFlag);
    //   console.log(this.baseinfo);
    //   if (!codeFlag && !nameFlag && !noteFlag) {
    //     this.postAxios("Sysconfig/SaveBasedata", { baseinfo: this.baseinfo })
    //       .then(res => {
    //         this.$message({
    //           message: "保存成功",
    //           type: "success"
    //         });
    //         this.initBaseinfo();
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   } else {
    //     this.$message({
    //       message: "请填写完整信息",
    //       type: "warning"
    //     });
    //   }
    //   this.innerVisible = false;
    // },
    getData(approvalStatus = "0", pageNum = "1", pageSize = "10") {
      var params = {
        approvalStatus: "0",
        pageNum: "1",
        pageSize: "10"
      };
      this.postAxios("OutApply/OutingApplyList", params)
        .then(res => {
          console.log(res);
          this.count = res.count;
          this.tableData = [...res.data];
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      this.confirmFormVisible = true;
      this.form = this.tableData[index];
      this.getFormData(row.tid);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onSubmit() {
      console.log("submit!");
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
.input-width {
  width: 180px;
  margin: 0 10px;
}
.flex {
  display: flex;
}
.staffStatu {
  margin: 0 20px;
}
</style>
