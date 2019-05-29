<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 公文信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="messages">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="发布单位">
            <el-select v-model="formInline.dept" placeholder="请选择">
              <el-option
                    v-for="item in deptsOps"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="警报等级">
            <el-select v-model="formInline.level" placeholder="请选择">
              <el-option
                    v-for="item in messageLevelOps"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="警报状态">
            <el-select v-model="formInline.status" placeholder="请选择">
              <el-option label="生效" value="1"></el-option>
              <el-option label="失效" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="警报内容">
            <el-input v-model="formInline.content" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
            <el-button type="success" @click="dialogFormVisible = true"  class="right">新增</el-button>
        </el-form>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="content" label="警报内容" sortable width="180">{{}}</el-table-column>
          <el-table-column prop="postDeptName" label="发布单位" sortable width="180"></el-table-column>
          <el-table-column prop="alertLevel" label="警报类型" ></el-table-column>
          <el-table-column prop="status" label="警报状态" ></el-table-column>
          <el-table-column prop="postTime" label="发布时间" ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row.tid)">警报解除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="增加警报" :visible.sync="dialogFormVisible">
          <el-form :model="alertInfo">
            <div class="flex">
            </div>
            <el-form-item label="警报内容" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder="警报内容" v-model="alertInfo.content"></el-input>
            </el-form-item>
            <el-form-item label="警报等级" :label-width="formLabelWidth">
              <el-select v-model="alertInfo.alertLevel" placeholder="请选择">
             <el-option
                    v-for="item in messageLevelOps"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
      value1: "",
      value2: "",
      input2: "",
      deptsOps:[
        {
          label:"警卫处",
          value:1
        },
        {
          label:"消防处",
          value:2
        }
      ],
      messageLevelOps: [
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
      tableData: [
        {
          content: "狼来了",
          dept: "保卫科",
          level: "一级",
          status: "生效",
          date:"2019-04-23 23:56"
        }
      ],
      formInline: {
        dept: "",
        level: "",
        status:"",
        content:""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      alertInfo: {
        content: "",
        alertLevel: "",
        status:""
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
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onSubmit() {
      console.log("submit!");
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
</style>
