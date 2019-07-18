<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 司机管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="messages">
        <el-select clearable class="input-width" v-model="departmentValue" placeholder="所属部门">
          <el-option
            v-for="item in departmentOptions"
            :key="item.tid"
            :label="item.name"
            :value="item.tid"
          ></el-option>
        </el-select>
        <el-select clearable class="input-width" v-model="dutyValue" placeholder="在岗状态">
          <el-option
            v-for="item in dutyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          class="input-width"
          placeholder="姓名"
          prefix-icon="el-icon-search"
          v-model="driverName"
        ></el-input>
        <el-button @click="search">搜索</el-button>
        <el-button size="mini" @click="addDriver" type="success">新增</el-button>
        <!-- 新增框 -->
        <div class="messages">
          <el-dialog
            title="司机信息"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <div class="role">
              <el-input v-model="driverId" style="display:none;"></el-input>
              <span class="widths">驾驶证号：</span>
              <el-input v-model="carcode" placeholder="请输入内容"></el-input>
            </div>
            <div class="role">
              <span class="widths">姓名：</span>
              <el-select clearable v-model="pername" placeholder="请选择">
                <el-option
                  v-for="item in carnames"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
              </el-select>
            </div>
            <div class="role">
              <span class="widths">有效期：</span>
              <el-date-picker v-model="dateend" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="role">
              <span class="widths">驾驶证附件：</span>
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
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirms">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'name', order: 'descending'}"
        >
          <el-table-column prop="name" label="姓名" ></el-table-column>
          <el-table-column prop="deptName" label="所属部门"  ></el-table-column>
          <el-table-column prop="lisenceCode" label="驾驶证号"  ></el-table-column>
          <el-table-column prop="licensedate" label="驾驶证有效期" :formatter="formatterDate"   ></el-table-column>
          <el-table-column prop="duty" label="在岗状态"  :formatter="state"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="total, prev, pager, next"
            :total="count"
            :page-size="10"
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
      pageSize: 10,
      pageNum : 1,
      count: 0,
      currentPage: 1,
      downloadUrl:"",
      pername: "",
      fileList: [],
      driverId: "", //tid 用于编辑时上传
      fileId: "", //图片上传id
      path: "", //图片上传路径
      dateend: "", //驾驶证有效期
      carcode: "", //驾驶证号
      dialogVisible: false, //控制新增弹框
      driverName:"", //姓名搜索
      departmentValue: "", //所属部门
      departmentOptions: [], //部门下拉框
      dutyOptions: [
        {
          value: "1",
          label: "在岗"
        },
        {
          value: "0",
          label: "外出"
        },
        {
          value: "3",
          label: "请假"
        }
      ],
      propertyValue: "",
      dutyValue: "",
      tableData: [
        {
          name: "小明",
          department: "连队1",
          date: "2018-9-2",
          licenseDate: "2019-06-06",
          duty: "在岗"
        }
      ],
      carnames: []
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    //时间格式化  
    formatterDate(row,index){
      return this.$utils.timeFormatter(row.licensedate);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageNum = val;
      this.getTableData();
    },
    //新增确认
    confirms() {
      let data = {
        tid: this.driverId,
        licensePath1:this.licensePath1,
        licensedate: this.dateend, //驾驶证号
        licenseNo: this.carcode, //驾驶证号
        staffid: this.pername //姓名
      };
      let _this = this;
      this.postAxios("/Garage/SaveDriver", data)
        .then(res => {
         
          _this.getTableData();
          _this.dialogVisible = false;
        })
        .catch(err => {
          console.log(err);
        });
      // dialogVisible
    },
    //打开新增司机弹框
    addDriver() {
      this.driverId="";
      this.pername="";
      this.carcode="";
      this.dateend="";
      this.dialogVisible = true;
      let _this = this;
      this.postAxios("/Garage/GetDriver", {
      })
        .then(res => {
          _this.carnames = res.staffOptions;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //在岗状态
    state(row, index) {
      return row.staffStatus == 1
        ? "在岗"
        : row.staffStatus == 0
        ? "外出"
        : "请假";
    },
    //获取table数据
    getTableData() {
      var pa={
        param:{
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          deptId:this.departmentValue,
          staffStatus:this.dutyValue,
          name:this.driverName
        }
      };
      let _this = this;
      this.postAxios("/Garage/GetDriverList", pa)
        .then(res => {
          _this.count = res.count
          _this.tableData = res.list;
          _this.departmentOptions = res.deptOptions;
        })
        .catch(err => {
          console.log(err);
        });
    },
    search(){
      this.currentPage = 1
      this.pageNum = 1
      this.getTableData();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      this.postAxios("/Garage/GetDriver", { id: row.driverid })
        .then(res => {
          this.carnames = res.staffOptions;
          this.carcode=res.info.licenseNo;
          this.pername = res.info.staffid;
          this.dateend = res.info.licensedate;
          this.path=res.info.licensePath1;
          this.driverId = res.info.tid;
          this.dialogVisible = true;
        })
        .catch(err => {
          console.log(err);
        });
      console.log(index, row);
    },
    handleDelete(index, row) {
      if(index==0&&this.pageNum!=1){
        this.pageNum = this.pageNum -1
      }
      if(confirm("确定删除吗？")){
        this.postAxios("/Garage/DeleteDriver", { id: row.driverid })
        .then(res => {
          if(res.status==1){
          alert("删除成功");
          this.getTableData();
          }else{
            alert("删除失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
      console.log(index, row);
    },
    //上传文件三个函数
    //删除
    handleRemove(file, fileList) {

      console.log(file, fileList);
    },
    handlePreview(file) {
      var a = document.createElement('a');
      a.href = this.downloadUrl;
      a.download = 'dname';
      a.target = "_block"
      a.click();
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
      this.licensePath1 = file.path
      this.downloadUrl = "http://digitalcamp.oicp.io:54373/here/"+file.path
      console.log(this.licensePath1,file)
    },
  }
};
</script>
<style scoped lang='scss'>
.messages {
  .el-dialog__body {
    height: 350px;
  }
}
.input-width {
  width: 180px;
  margin: 0 10px;
}
.carImg {
  width: 40px;
  height: 40px;
  background: red;
  display: inline-block;
  vertical-align: middle;
}
.el-input {
  width: 200px;
}
.role {
  display: flex;
  height: 40px;
  line-height: 40px;
}
.dialog-footer {text-align: center}
.widths {
  display: inline-block;
  width: 100px;
}
</style>
