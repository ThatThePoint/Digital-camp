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
        <el-select class="input-width" v-model="departmentValue" placeholder="所属部门">
          <el-option
            v-for="item in departmentOptions"
            :key="item.tid"
            :label="item.name"
            :value="item.tid"
          ></el-option>
        </el-select>
        <el-select class="input-width" v-model="dutyValue" placeholder="在岗状态">
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
          v-model="input2"
        ></el-input>
        <el-button>搜索</el-button>
        <el-button size="mini" @click="addDriver" type="success">新增</el-button>
        <!-- 新增框 -->
        <div class="messages">
          <el-dialog
            title="新增司机"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div class="role">
              <span class="widths">驾驶证号：</span>
              <el-input v-model="carcode" placeholder="请输入内容"></el-input>
            </div>
            <div class="role">
              <span class="widths">姓名：</span>
                <el-select v-model="pername" placeholder="请选择">
                  <el-option
                    v-for="item in carnames"
                    :key="item.tid"
                    :label="item.name"
                    :value="item.tid">
                  </el-option>
                </el-select>
            </div>
            <div class="role">
              <span class="widths">有效期：</span>
                <el-date-picker
                  v-model="dateend"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="role">
              <span class="widths">驾驶证附件：</span>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>

            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirms">确 定</el-button>
            </span>
          </el-dialog>
        </div>



      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'name', order: 'descending'}"
        >
          <el-table-column prop="name" label="姓名" sortable width="100"></el-table-column>
          <el-table-column prop="deptName" label="所属部门" sortable width="100"></el-table-column>
          <el-table-column prop="licensedate" label="驾驶证有效期" sortable width="160"></el-table-column>
          <el-table-column prop="duty" label="在岗状态" sortable width="100" :formatter="state"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      pername:"",
      fileList: [],
      dateend : "",//驾驶证有效期
      carcode:"",//驾驶证号
      dialogVisible: false,//控制新增弹框
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
      departmentValue:"",//所属部门
      departmentOptions: [],//部门下拉框
      dutyOptions: [
        {
          value: "1",
          label: "在岗"
        },
        {
          value: "2",
          label: "请假"
        },
        {
          value: "3",
          label: "外出"
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
        },
        {
          name: "小明",
          department: "连队1",
          date: "2018-9-2",
          licenseDate: "2019-06-06",
          duty: "在岗"
        },
        {
          name: "小明",
          department: "连队1",
          date: "2018-9-2",
          licenseDate: "2019-06-06",
          duty: "在岗"
        },
        {
          name: "小明",
          department: "连队1",
          date: "2018-9-2",
          licenseDate: "2019-06-06",
          duty: "在岗"
        },
        {
          name: "小明",
          department: "连队1",
          date: "2018-9-2",
          licenseDate: "2019-06-06",
          duty: "在岗"
        },
        {
          name: "小明",
          department: "连队1",
          date: "2018-9-2",
          licenseDate: "2019-06-06",
          duty: "在岗"
        },
        {
          name: "小明",
          department: "连队1",
          date: "2018-9-2",
          licenseDate: "2019-06-06",
          duty: "在岗"
        },
        {
          name: "小明",
          department: "连队1",
          date: "2018-9-2",
          licenseDate: "2019-06-06",
          duty: "在岗"
        }
      ],
      carnames: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
    };
  },
  created(){
    this.getTableData()
  },
  methods: {
    //新增确认
    confirms(){
      let data = {
        licensedate : this.dateend,//驾驶证号
        licenseNo: this.carcode,//驾驶证号
        staffid: this.pername,//姓名
      }
      let _this = this;
      this.postAxios("/Garage/SaveDriver",data)
        .then(res => {
          _this.getTableData()
          _this.dialogVisible = false
        })
        .catch(err => {
          console.log(err);
      });
// dialogVisible
    },
    //打开新增司机弹框
    addDriver(){
      this.dialogVisible = true
      let _this = this;
      this.postAxios("/Garage/GetDriver",{})
        .then(res => {
          _this.carnames = res.staffOptions
        })
        .catch(err => {
          console.log(err);
      });
    },
    // perlicensedate(row,index){
    //   return row.licensedate.slice(0,10)
    // },
    //在岗状态
    state(row,index){
      return row.staffStatus == 1 ? "在岗" : row.staffStatus == 0 ? "外出" : "请假"
    },
    //获取table数据
    getTableData(){
      let _this = this;
      this.postAxios("/Garage/GetDriverList",{})
        .then(res => {
          _this.tableData = res.list
          _this.departmentOptions = res.deptOptions
        })
        .catch(err => {
          console.log(err);
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.pername = row.name;
      this.dateend = row.licenseDate
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //上传文件三个函数
    //删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
};
</script>
<style scoped lang='scss'>
.messages{
  .el-dialog__body{
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
.role{
  display: flex;
  height: 40px;
  line-height: 40px;
}
.widths{
  display: inline-block;
  width: 100px;
}
</style>
