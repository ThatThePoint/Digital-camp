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
        <el-form :inline="true" :model="params" class="demo-form-inline">
          <el-form-item label="生效状态">
            <el-select clearable v-model="params.status" placeholder="请选择">
              <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规章名称">
            <el-input v-model="params.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getdata">查询</el-button>
          </el-form-item>
          <el-button type="success" @click="addrules" class="right">新增</el-button>
        </el-form>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="ruleName" label="制度名称" sortable width="100"></el-table-column>
          <el-table-column prop="ruleSynopsis" label="制度简介" sortable width="120"></el-table-column>
          <el-table-column prop="version" label="版本"  width="100"></el-table-column>
          <el-table-column prop="status" label="生效状态" width="100" :formatter="statusFormatter"></el-table-column>
          <el-table-column prop="publisherName" label="发布人"  width="100"></el-table-column>
          <el-table-column prop="publishTime" label="发布时间" width="200"></el-table-column>
          <el-table-column prop="readTimes" label="阅读次数" width="100"></el-table-column>
          <el-table-column prop="downTimes" label="下载次数" width="100"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">预览</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="新增规章制度" :visible.sync="dialogFormVisible">
          <el-form :rules="checkRules" ref="ruleInfo" :model="form.ruleInfo">
            <div class="flex"></div>
            <el-form-item label="规章名称" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder="请输入" v-model="form.ruleInfo.ruleName"></el-input>
            </el-form-item>
            <el-form-item label="版本" :label-width="formLabelWidth">
              <el-input class="input-width" placeholder="请输入" v-model="form.ruleInfo.version"></el-input>
            </el-form-item>
            <el-form-item label="简介" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                class="input-width"
                placeholder="请输入"
                v-model="form.ruleInfo.ruleSynopsis"
              ></el-input>
            </el-form-item>
            <el-form-item label="附件" :label-width="formLabelWidth">
              <el-upload
                class="upload"
                action="http://digitalcamp.oicp.io:54373/api/Upload/Upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-error="errorHandle"
                :on-success="successHandle"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
              > 
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="onSubmitForm('form')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "rule",
  data() {
    return {
      fileList:[],
      fileId:"",//图片上传id
      filePath1 :"",//图片上传路径
      form:{
        ruleInfo: {
          tid:"",
          ruleName: "",
          ruleSynopsis: "",
          version: "",
          status: ""
        },
      },
      params:{
      status: 1, //生效状态
      name: "", //制度名称
      },
      statusOptions:[
        {
          label:"有效",
          value : 1
        },
        {
          label:"有效",
          value : 0
        }
      ],
      tableData: [],
      dialogFormVisible: false,

      checkRules: {
        ruleName: [{ required: true, message: "制度名称", trigger: "blur" }],
        version: [{ required: true, message: "请输入版本号", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getdata("1","10");
  },
  methods: {
    getdata(num,size){
      var pa = {
      status: this.params.status,
      name: this.params.name,
      pageNum:num,
      pageSize:size
    };
    this.postAxios("/DailyOffice/GetRules", pa).then(res => {
      console.log(res);
      this.tableData = res.data;
      this.totalPage = res.count;
    });
    },
    //新增规章制度
    addrules(){
      this.form.ruleInfo={};
      this.dialogFormVisible = true;
    },
    cancel() {
      this.dialogFormVisible = false;
      this.form.ruleInfo = {};
    },
    statusFormatter(row, column) {
      return row.status==1?"有效":"失效";
    },



    handleRemove(file, fileList) {

      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    errorHandle(){
      console.log("error");
    },
    successHandle(file, fileList){
      this.fileId = file.fileId;
      this.filePath1 = file.filePath1
      console.log("success",this.fileId, this.filePath1);
    },




    onSubmitForm(form) {
      let data = {
        // ruleName : this.form.ruleInfo.ruleName,
        // version : this.form.ruleInfo.version,
        // ruleSynopsis : this.form.ruleInfo.ruleSynopsis
        fileId:this.fileId,
        filePath1:this.filePath1,
        model:this.form.ruleInfo
      }
      if(this.form.ruleInfo.ruleName && this.form.ruleInfo.version && this.form.ruleInfo.ruleSynopsis){
        let _this = this;
        this.postAxios("/DailyOffice/SaveRules",data)
          .then(res => {
            console.log(res);
            _this.dialogFormVisible = false;
            _this.getdata("1","10");
          })
          .catch(err => {
            console.log(err);
        });
      }else{
        this.$message.warning("输入不能为空")
      }

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
