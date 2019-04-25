<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 设备管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="messages">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="归属部门" :label-width="formLabelWidth">
            <el-select v-model="formInline.region" placeholder="请选择">
              <el-option label="团支部" value="shanghai"></el-option>
              <el-option label="政治部" value="beijing"></el-option>
              <el-option label="组织部" value="hangz"></el-option>
              <el-option label="理事部" value="guangz"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
            <el-button type="success" @click="dialogFormVisible = true" class="right">新增</el-button>
        </el-form>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'ofDept', order: 'descending'}"
        >
          <el-table-column prop="name" label="设备名称" sortable width="180"></el-table-column>
          <el-table-column prop="equipNo" label="设备编号" sortable width="180"></el-table-column>
          <el-table-column prop="ofDept" label="所属部门" sortable></el-table-column>
          <el-table-column prop="type" label="设备类型" sortable></el-table-column>
          <el-table-column prop="status" label="状态" sortable></el-table-column>
          <el-table-column prop="date" label="修改时间" sortable></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="设备信息" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <div class="flex"></div>
            <el-form-item label="设备名称" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder="请输入" v-model="input2" type="input"></el-input>
            </el-form-item>
             <el-form-item label="设备编号" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder="请输入" v-model="input3" type="input"></el-input>
            </el-form-item>
            <el-form-item label="设备类型" :label-width="formLabelWidth">
              <el-select v-model="formInline.region" placeholder="请选择">
                <el-option label="后勤设备" value="shanghai"></el-option>
                <el-option label="日常设备" value="beijing"></el-option>
                <el-option label="办公设备" value="hangz"></el-option>
                <el-option label="库存设备" value="guangz"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属部门" :label-width="formLabelWidth">
              <el-select v-model="formInline.region" placeholder="请选择">
                <el-option label="后勤部" value="shanghai"></el-option>
                <el-option label="政治部" value="beijing"></el-option>
                <el-option label="组织部" value="hangz"></el-option>
                <el-option label="真理部" value="guangz"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备备注" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder="请输入" v-model="input2" type="textarea"></el-input>
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
      input3:"",
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
          name: "取暖机",
          equipNo: "2323",
          ofDept: "连队1",
          type: "日用设备",
          status: "在用",
          date: "2019-04-23"
        },
        {
          name: "取暖机",
          equipNo: "2323",
          ofDept: "连队1",
          type: "日用设备",
          status: "在用",
          date: "2019-04-23"
        },
        {
          name: "取暖机",
          equipNo: "2323",
          ofDept: "连队1",
          type: "日用设备",
          status: "在用",
          date: "2019-04-23"
        },
        {
          name: "取暖机",
          equipNo: "2323",
          ofDept: "连队1",
          type: "日用设备",
          status: "在用",
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
