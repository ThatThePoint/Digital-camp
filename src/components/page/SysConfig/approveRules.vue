<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>审批规则</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="messages">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" v-loading="loading">
          <el-form-item label="审批规则名称">
            <el-input v-model="formInline.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-button type="success" @click="addRuleInfo" class="right">新增</el-button>
          <el-dialog title="审批规则" :visible.sync="outerVisible">
            <el-dialog width="30%" title="审批规则明细" :visible.sync="innerVisible" append-to-body>
              <el-form :model="detailInfo">
                <div class="flex">
                  <el-input v-model="detailInfo.tid" style="display:none;"></el-input>
                  <el-input v-model="detailInfo.parentId" style="display:none;"></el-input>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="规则明细">
                        <label>{{detailInfo.name}}</label>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="起始时长">
                        <el-input disabled v-model="detailInfo.startTimeLength" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="终止时长">
                        <el-input v-model="detailInfo.endTimeLength" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="handledetailsave">确 定</el-button>
              </div>
            </el-dialog>
            <el-form :model="ruleinfo">
              <el-input v-model="ruleinfo.tid" style="display:none;"></el-input>
              <el-form-item label="规则名称">
                <el-input v-model="ruleinfo.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="ruleinfo.remark" placeholder="请输入" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="规则状态">
                <el-radio disabled v-model="ruleinfo.status" :label="1">启用</el-radio>
                <el-radio disabled v-model="ruleinfo.status" :label="0">禁用</el-radio>
              </el-form-item>
              <div>
                <el-form-item>
                  <el-button type="primary" v-show="addDetailVisible" @click="addDetailInfo">添加明细</el-button>
                </el-form-item>
              </div>
              <div>
                <el-table
                  :data="detailList"
                  style="width: 100%"
                  :default-sort="{prop: 'name', order: 'ascending'}"
                >
                  <el-table-column prop="name" label="名称" width="100px"></el-table-column>
                  <el-table-column prop="startTimeLength" label="起始时长"></el-table-column>
                  <el-table-column prop="endTimeLength" label="结束时长" ></el-table-column>
                  <el-table-column prop="modifyTime" label="修改日期" ></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="editDetail(scope.$index, scope.row)">编辑</el-button>
                      <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="handleCancel">取 消</el-button>
              <el-button type="primary" @click="handleSave">确 定</el-button>
            </div>
          </el-dialog>
        </el-form>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="name" label="名称" ></el-table-column>
          <el-table-column prop="remark" label="描述" ></el-table-column>
          <el-table-column prop="status" label="状态" :formatter="formatterStatus"></el-table-column>
          <el-table-column prop="modifyTime" label="修改时间" ></el-table-column>
          <el-table-column label="操作" min-width="160px">
            <template slot-scope="scope">
              <el-button size="mini" @click="getRuleInfo(scope.row.tid)">编辑</el-button>
              <el-button size="mini" @click="handleOn(scope.$index, scope.row)">启用</el-button>
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "approvalRule",
  data() {
    return {
      loading: true,
      formInline: {
        name: ""
      },
      outerVisible: false,
      innerVisible: false,
      addDetailVisible: false, //添加明细按钮 显示隐藏
      ruleinfo: {
        tid:"",
        name: "",
        note: "",
        status: 0
      },
      startTimeLength: "0",
      endTimeLength: "",
      detailInfo: {},
      tableData: [{}],
      count: 0,
      detailList: []
    };
  },
  created() {
    this.handleSearch();
  },
  methods: {
    ///以下-----新
    //新增审批规则
    addRuleInfo() {
      this.addDetailVisible = false;
      this.ruleinfo = {
        status: 0
      };
      this.outerVisible = true;
    },
    //编辑审批规则
    getRuleInfo(id) {
      var params = { tid: id };
      this.postAxios("Sysconfig/GetRuleinfo", { tid: id })
        .then(res => {
          this.addDetailVisible = true;
          this.detailList = res.detailList;
          this.ruleinfo = res.ruleinfo;
        })
        .catch(err => {
          console.log(err);
        });
      this.outerVisible = true;
    },
    //查询
    handleSearch(num = 1, size = 10) {
      var params = {
        name: this.formInline.name,
        pageNum: num,
        pageSize: size
      };
      this.postAxios("Sysconfig/ApprovalRuleList", params)
        .then(res => {
          console.log(res);
          this.count = res.count;
          this.tableData = res.data;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存规则
    handleSave() {
      console.log(this.ruleinfo);
      let nameFlag = this.$utils.isEmpty(this.ruleinfo.name);
      console.log(this.ruleinfo);
      if (!nameFlag) {
        this.postAxios("Sysconfig/SaveApprovalRule", {
          ruleInfo: this.ruleinfo
        })
          .then(res => {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.initRuleinfo();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          message: "请填写完整信息",
          type: "warning"
        });
      }
      this.outerVisible = false;
    },
    handleCancel() {
      this.ruleinfo = {};
      this.outerVisible = false;
    },
    initRuleinfo() {
      this.ruleinfo = {
        name: "",
        status: 1,
        note: ""
      };
      this.currentPage = 1;
      this.detailInfo = {};
      this.handleSearch();
    },
    addDetailInfo() {
      this.detailInfo = {
        parentId: this.ruleinfo.tid
      };
      if (this.detailList.length == 0) {
        //没有明细时
        this.detailInfo.name = "1级审批";
      } else if (this.detailList.length == 1) {
        //有一条明细时
        this.detailInfo.name = "2级审批";
        this.detailInfo.startTimeLength=this.detailList[0].endTimeLength;
      } else if (this.detailList.length == 2) {
        //有2条明细时
        this.detailInfo.name = "3级审批";
        this.detailInfo.startTimeLength=this.detailList[1].endTimeLength;
      } else {
        //有三级审批
        this.$message({
          message: "最多只能有三级审批",
          type: "warning"
        });
        return false;
      }
      this.innerVisible = true;
    },
    //编辑明细
    getDetailInfo(id) {
      this.postAxios("Sysconfig/GetRuleinfo", { tid: id })
        .then(res => {
          this.detailInfo = res.ruleinfo;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handledetailsave() {
      console.log(this.detailInfo);
      let pFlag = this.$utils.isEmpty(this.detailInfo.parentId);
      let statusFlag = this.$utils.isEmpty(this.detailInfo.endTimeLength);
      console.log(pFlag, );
      console.log(this.ruleinfo);
      if (!pFlag && !statusFlag) {
        this.postAxios("Sysconfig/SaveApprovalRule", {
          ruleInfo: {
            parentId: this.detailInfo.parentId,
            name: this.detailInfo.name,
            startTimeLength: this.detailInfo.startTimeLength,
            endTimeLength: this.detailInfo.endTimeLength
          }
        })
          .then(res => {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.getRuleInfo(this.ruleinfo.tid);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          message: "请填写完整信息",
          type: "warning"
        });
      }

      this.innerVisible = false;
    },
    ///以上-----新
    formatterStatus(row, column) {
      if(row.status){
        return "启用";
      }else{
        return "禁用";
      }      
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.outerVisible = true;
    },
    handleDelete(index, row) {
      if (row.status == 1) {
        alert("请先启用其他审批规则，再删除此审批规则。");
        return false;
      }
      this.$confirm("此操作将永久删除该审批规则, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.postAxios("Sysconfig/DeleteApprovalRule", { tid: row.tid })
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              if (this.outerVisible) {
                this.postAxios("Sysconfig/GetRuleinfo", {
                  tid: this.ruleinfo.tid
                })
                  .then(res => {
                    this.detailList = res.detailList;
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                this.handleSearch();
              }
            })
            .catch(err => {
              this.$message({
                type: "success",
                message: err.message
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      console.log(row);
    },
    handleOn(index, row){
      this.$confirm("启用此规则时其他其他审批规则将禁用, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
          this.postAxios("Sysconfig/HandleOnRule", { tid: row.tid })
            .then(res => {
              this.$message({
                type: "success",
                message: "启用成功!"
              });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消启用"
          });
        });
      console.log(row);
    })
  }
  }   
}
</script>
<style scoped>
.input-width {
  width: 180px;
  margin: 0 10px;
}
.messages {
}
.flex {
  display: flex;
}
.staffStatu {
  margin: 0 20px;
}
</style>
