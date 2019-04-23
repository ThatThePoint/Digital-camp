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
          <el-form-item label>
            <el-select v-model="formInline.region" placeholder="生效状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label>
            <el-select v-model="formInline.region" placeholder="制度名称">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label>
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="dialogFormVisible = true">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="date" label="制度名称" sortable width="180">{{}}</el-table-column>
          <el-table-column prop="name" label="制度简介" sortable width="180"></el-table-column>
          <el-table-column prop="address" label="制度版本" :formatter="formatter"></el-table-column>
          <el-table-column prop="address" label="是否生效" :formatter="formatter"></el-table-column>
          <el-table-column prop="edit" label="上传人" :formatter="formatter"></el-table-column>
          <el-table-column prop="edit" label="发布时间" :formatter="formatter"></el-table-column>
          <el-table-column prop="edit" label="阅读次数" :formatter="formatter"></el-table-column>
          <el-table-column prop="edit" label="下载次数" :formatter="formatter"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">预览</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="制度信息" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <div class="flex"></div>
            <el-form-item label="制度名称" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder v-model="input2"></el-input>
            </el-form-item>
            <el-form-item label="制度简介" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder v-model="input2"></el-input>
            </el-form-item>
            <el-form-item label="制度版本" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder v-model="input2"></el-input>
            </el-form-item>
            <el-form-item label="制度版本" :label-width="formLabelWidth">
              <el-upload
                class="upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
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
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          edit: "1"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          edit: "1"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          edit: "1"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          edit: "1"
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
