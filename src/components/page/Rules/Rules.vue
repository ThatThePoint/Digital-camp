<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 规章制度
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="messages">
        <el-form :inline="true" :model="status" class="demo-form-inline">
          <el-form-item label="生效状态">
            <el-select v-model="status" placeholder="请选择">
              <el-option label="有效" value="shanghai"></el-option>
              <el-option label="失效" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规章名称">
            <el-input v-model="name" placeholder="请输入"></el-input>
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
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="ruleName" label="制度名称" sortable width="180">{{}}</el-table-column>
          <el-table-column prop="ruleSynopsis" label="制度简介" sortable width="180"></el-table-column>
          <el-table-column prop="version" label="版本"></el-table-column>
          <el-table-column prop="status" label="生效状态"></el-table-column>
          <el-table-column prop="publisherName" label="发布人"></el-table-column>
          <el-table-column prop="publishTime" label="发布时间"></el-table-column>
          <el-table-column prop="readTimes" label="阅读次数"></el-table-column>
          <el-table-column prop="downTimes" label="下载次数"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">预览</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="新增规章制度" :visible.sync="dialogFormVisible">
          <el-form :model="ruleInfo">
            <div class="flex"></div>
            <el-form-item label="规章名称" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder="请输入" v-model="ruleInfo.ruleName"></el-input>
            </el-form-item>
            <el-form-item label="版本" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder="请输入" v-model="ruleInfo.version"></el-input>
            </el-form-item>
            <el-form-item label="简介" :label-width="formLabelWidth">
              <el-input type="textarea" class="input-width"  placeholder="请输入" v-model="ruleInfo.ruleSynopsis"></el-input>
            </el-form-item>
            <el-form-item label="附件" :label-width="formLabelWidth">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
      status: "", //生效状态
      name:"",
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
          ruleName: "宿舍管理条例",
          ruleSynopsis: "宿舍管理",
          version: "1.0",
          status: "生效",
          publisherName: "老张",
          publishTime: "2016-05-02",
          readTimes: "23",
          downTimes: "22"
        }
      ],
      dialogFormVisible: false,
      ruleInfo: {
        ruleName: "",
        ruleSynopsis: "",
        version: "",
        status: ""
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
  },
  
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
