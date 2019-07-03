<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 字典管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="messages">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" v-loading="loading">
          <el-form-item label="字典名称">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-button type="success" @click="AddBaseinfo" class="right">新增</el-button>
          <el-dialog :title="title" :visible.sync="outerVisible">
            <el-dialog width="30%" title="添加明细" :visible.sync="innerVisible" append-to-body>
              <el-form :model="detailInfo">
                <div class="flex">
                  <el-input v-model="detailInfo.tid" style="display:none;"></el-input>
                  <el-input v-model="detailInfo.parentId" style="display:none;"></el-input>
                  <el-form-item label="明细编号">
                    <el-input v-model="detailInfo.code" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="显示值">
                    <el-input v-model="detailInfo.name" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <el-form-item label="明细状态">
                  <el-radio v-model="detailInfo.status" :label="1">启用</el-radio>
                  <el-radio v-model="detailInfo.status" :label="0">禁用</el-radio>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="handledetailsave">确 定</el-button>
              </div>
            </el-dialog>
            <el-form :model="baseinfo">
              <el-input v-model="baseinfo.tid" style="display:none;"></el-input>
              <el-form-item label="字典编码">
                <el-input v-model="baseinfo.code" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="baseinfo.name" placeholder="请输入" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="baseinfo.note" placeholder="请输入" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="字典状态">
                <el-radio v-model="baseinfo.status" :label="1">启用</el-radio>
                <el-radio v-model="baseinfo.status" :label="0">禁用</el-radio>
              </el-form-item>
              <div>
                <el-form-item>
                  <el-button type="primary" @click="addDetail">添加明细</el-button>
                </el-form-item>
              </div>
              <div>
                <el-table
                  :data="detailList"
                  style="width: 100%"
                  :default-sort="{prop: 'name', order: 'descending'}"
                >
                  <el-table-column prop="code" label="明细编码" sortable></el-table-column>
                  <el-table-column prop="name" label="显示值" sortable></el-table-column>
                  <el-table-column prop="status" label="状态" sortable :formatter="formatter"></el-table-column>
                  <el-table-column prop="modifyTime" label="修改日期" sortable></el-table-column>
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
              <el-button @click="outerVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleSave">确 定</el-button>
            </div>
          </el-dialog>
        </el-form>
      </div>
      <div class="body">
        <el-table :data="dicTableData" style="width: 100%">
          <el-table-column prop="name" label="字典名称" sortable width="160"></el-table-column>
          <el-table-column prop="code" label="字典编码" sortable width="160"></el-table-column>
          <el-table-column prop="note" label="描述" sortable width="200"></el-table-column>
          <el-table-column prop="status" label="使用状态" :formatter="formatter" width="100"></el-table-column>
          <el-table-column prop="modifyTime" label="修改时间" sortable width="160"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" type="danger">删除</el-button>
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "documentManagement",
  data() {
    return {
      loading: true,
      title: "添加字典",
      outerVisible: false,
      count: 0,
      currentPage: 1,
      radio: 1,
      baseinfo: {
        code: "",
        name: "",
        status: 1,
        note: "",
        tid: ""
      },
      innerVisible: false,
      dicTableData: [],
      formInline: {
        user: "",
        region: ""
      },
      detailList: [], //明细列表
      detailInfo: {},
      detailRadio: 1
    };
  },
  methods: {
    formatter(row, column) {
      if (row.status == 1) {
        return "已启用";
      } else {
        return "未启用";
      }
    },
    AddBaseinfo() {
      this.baseinfo = { status: 1 };
      this.detailList = [];
      this.outerVisible = true;
    },
    addDetail() {
      this.innerVisible = true;
      this.detailInfo = {
        status: 1,
        parentId: this.baseinfo.tid
      };
    },
    handledetailsave() {
      let codeFlag = this.$utils.isEmpty(this.detailInfo.code);
      let nameFlag = this.$utils.isEmpty(this.detailInfo.name);
      console.log(codeFlag, nameFlag);
      if (!codeFlag && !nameFlag) {
        this.postAxios("Sysconfig/SaveBasedata", { baseinfo: this.detailInfo })
          .then(res => {
            console.log(res);
            this.detailInfo = {};
            alert("保存成功");
            this.innerVisible = false;
            this.postAxios("Sysconfig/GetBaseinfo", { tid: this.baseinfo.tid })
              .then(res => {
                this.detailList = res.detailList;
                this.baseinfo = [...res.baseinfo];
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    editDetail(index, row) {
      Object.assign(this.detailInfo, row);
      this.detailInfo.parentId = this.baseinfo.tid;
      this.innerVisible = true;
    },
    handleEdit(index, row) {
      this.postAxios("Sysconfig/GetBaseinfo", { tid: row.tid })
        .then(res => {
          console.log(res);
          //Object.assign(this.detailList,res.detailList);
          this.detailList = res.detailList;
          this.baseinfo = [...res.baseinfo];
        })
        .catch(err => {
          console.log(err);
        });
      this.title = "编辑字典";
      Object.assign(this.baseinfo, row);
      this.outerVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.postAxios("Sysconfig/DeleteBasedata", { tid: row.tid })
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              if (this.outerVisible) {
                this.postAxios("Sysconfig/GetBaseinfo", {
                  tid: this.baseinfo.tid
                })
                  .then(res => {
                    this.detailList = res.detailList;
                    this.baseinfo = [...res.baseinfo];
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                getData();
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    getData(name, pageNum = 1, pageSize = 10) {
      this.postAxios("Sysconfig/BasedataList", { name, pageNum, pageSize })
        .then(res => {
          console.log(res);
          this.count = res.count;
          this.dicTableData = [...res.data];
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
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
    handleSave() {
      console.log(this.baseinfo);
      let codeFlag = this.$utils.isEmpty(this.baseinfo.code);
      let nameFlag = this.$utils.isEmpty(this.baseinfo.name);
      //let noteFlag = this.$utils.isEmpty(this.baseinfo.note);
      console.log(codeFlag, nameFlag);
      console.log(this.baseinfo);
      if (!codeFlag && !nameFlag) {
        this.postAxios("Sysconfig/SaveBasedata", { baseinfo: this.baseinfo })
          .then(res => {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.initBaseinfo();
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
.dialog-footer {text-align: center}
</style>
