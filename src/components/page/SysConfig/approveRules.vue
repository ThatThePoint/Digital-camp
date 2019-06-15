<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>审批规则</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="messages">
            <el-button type="success" @click="addPeople" class="right">新增规则</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'date', order: 'descending'}"
            >
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column prop="remark" label="描述"></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
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
      tableData: [
        {
          name: "一级审批",
          remark: "一级审批",
          status: "启用"
        },
        {
           name: "二级级审批",
          remark: "二级审批",
          status: "禁用"
        },
        {
           name: "三级审批",
          remark: "三级审批",
          status: "禁用"
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
      this.outerVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
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
