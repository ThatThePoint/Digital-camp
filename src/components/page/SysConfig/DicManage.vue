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
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="字典名称">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-button type="success" @click="outerVisible = true" class="right">新增</el-button>
          <el-dialog title="添加字典" :visible.sync="outerVisible">
            <el-form :model="baseinfo">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="outerVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleSave">确 定</el-button>
            </div>
          </el-dialog>
        </el-form>
      </div>
      <div class="body">
        <el-table
          :data="dicTableData"
          style="width: 100%"
          :default-sort="{prop: 'name', order: 'descending'}"
        >
          <el-table-column prop="name" label="字典名称" sortable width="180"></el-table-column>
          <el-table-column prop="note" label="描述" sortable width="180"></el-table-column>
          <el-table-column prop="status" label="使用状态" :formatter="formatter"></el-table-column>
          <el-table-column prop="modifyTime" label="修改时间" sortable></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      count: 0,
      outerVisible: false,
      currentPage: 1,
      radio: 1,
      baseinfo: {
        code: "",
        name: "",
        status: 1,
        note: ""
      },
      innerVisible: false,
      dicTableData: [],
      formInline: {
        user: "",
        region: ""
      }
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
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分页导航
    handleCurrentChange(val) {
      console.log(val);
      // this.tableData1.cur_page = val;
      this.currentPage = val;
      this.getData("", val);
    },
    handleSearch() {
      this.getData(this.formInline.user);
      this.currentPage = 1;
    },
    handleSave() {
      console.log(this.baseinfo);
      let codeFlag = this.$utils.isEmpty(this.baseinfo.code);
      let nameFlag = this.$utils.isEmpty(this.baseinfo.name);
      let noteFlag = this.$utils.isEmpty(this.baseinfo.note);
      console.log(codeFlag, nameFlag, noteFlag);
      console.log(this.baseinfo);
      if (!codeFlag && !nameFlag && !noteFlag) {
        this.postAxios("Sysconfig/SaveBasedata", { baseinfo: this.baseinfo })
          .then(res => {
            this.$message({
              message: "保存成功",
              type: "success"
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
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
</style>
