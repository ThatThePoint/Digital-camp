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
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="outerVisible = true">新增</el-button>
          </el-form-item>
          <el-dialog title="添加字典" :visible.sync="outerVisible">
            <el-dialog width="30%" title="添加明细" :visible.sync="innerVisible" append-to-body>
              <el-form :model="form">
                <div class="flex">
                  <el-form-item label="明细编号">
                    <el-input v-model="formInline.user" :label-width="formLabelWidth" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="显示值">
                    <el-input v-model="formInline.user" :label-width="formLabelWidth" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <el-form-item label="明细状态">
                  <el-radio v-model="radio" label="1">启用</el-radio>
                  <el-radio v-model="radio" label="2">禁用</el-radio>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="innerVisible = false">确 定</el-button>
              </div>
            </el-dialog>
            <el-form :model="form">
              <div class="flex">
                <el-form-item label="字典名称">
                  <el-input v-model="formInline.user" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="formInline.user" placeholder="请输入" type="textarea"></el-input>
                </el-form-item>
              </div>
              <el-form-item label="字典状态">
                <el-radio v-model="radio" label="1">启用</el-radio>
                <el-radio v-model="radio" label="2">禁用</el-radio>
              </el-form-item>
              <div>
                <el-form-item>
                  <el-button type="primary" @click="innerVisible = true">添加明细</el-button>
                </el-form-item>
              </div>
              <div>
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  :default-sort="{prop: 'name', order: 'descending'}"
                >
                  <el-table-column prop="name" label="明细编码" sortable></el-table-column>
                  <el-table-column prop="desc" label="显示值" sortable></el-table-column>
                  <el-table-column prop="status" label="状态" sortable></el-table-column>
                  <el-table-column prop="date" label="添加日期" sortable></el-table-column>
                  <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="innerVisible = true">编辑</el-button>
                      <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="outerVisible = false">取 消</el-button>
              <el-button type="primary" @click="outerVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </el-form>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'name', order: 'descending'}"
        >
          <el-table-column prop="name" label="字典名称" sortable width="180"></el-table-column>
          <el-table-column prop="desc" label="描述" sortable width="180"></el-table-column>
          <el-table-column prop="status" label="使用状态" sortable></el-table-column>
          <el-table-column prop="date" label="修改时间" sortable></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "documentManagement",
  data() {
    return {
      radio: 1,
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
      outerVisible: false,
      innerVisible: false,
      value1: "",
      value2: "",
      input2: "",
      radioStatus: "", //新增-启用/禁用 单选
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
      tableData: [
        {
          name: "警告级别",
          desc: "警告分级",
          status: "启用",
          date: "2019-04-23"
        },
        {
          name: "警告级别",
          desc: "警告分级",
          status: "启用",
          date: "2019-04-23"
        },
        {
          name: "警告级别",
          desc: "警告分级",
          status: "启用",
          date: "2019-04-23"
        },
        {
          name: "警告级别",
          desc: "警告分级",
          status: "启用",
          date: "2019-04-23"
        }
      ],
      formInline: {
        user: "",
        region: ""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
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
