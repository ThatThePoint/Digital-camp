<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>已审批请假</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="name" label="申请人" sortable width="180">{{}}</el-table-column>
          <el-table-column prop="dept" label="申请人部门" sortable width="180"></el-table-column>
          <el-table-column prop="type" label="外出类型"></el-table-column>
          <el-table-column prop="reason" label="外出内容"></el-table-column>
          <el-table-column prop="startDate" label="外出时间"></el-table-column>
          <el-table-column prop="returnDate" label="返岗时间"></el-table-column>
          <el-table-column prop="length" label="申请时长"></el-table-column>
          <el-table-column prop="curApproval" label="当前审批人"></el-table-column>
          <el-table-column prop="status" label="审批状态"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
        <el-dialog title="外出申请" :visible.sync="confirmFormVisible">
          <el-form :model="form" label-width="100px" ref="form">
            <el-row>
              <el-col :span="6">
                <el-form-item label="申请人">{{confirmLeave.name}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="请假人">{{confirmLeave.name}}</el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="部门">{{confirmLeave.dept}}</el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="岗位">科长</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="外出类型">{{confirmLeave.type}}</el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="外出原因">{{confirmLeave.reason}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="开始日期">{{confirmLeave.startDate}}</el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="结束日期">{{confirmLeave.returnDate}}</el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="请假时间">{{confirmLeave.length}}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="block">
            <el-timeline>
              <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                  <h4>张主任</h4>
                  <p>同意</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/3" placement="top">
                <el-card>
                  <h4>王主任</h4>
                  <p>同意</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/3" placement="top">
                <el-card>
                  <h4>高首长</h4>
                  <p>同意</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="confirmFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmFormVisible = false">确定</el-button>
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
      confirmLeave: {},
      confirmFormVisible: false,
      checked: "",
      value1: "",
      value2: "",
      input2: "",
      filterModel: {
        name: "",
        depts: "",
        types: ""
      },
      count: 0,
      currentPage: 1,
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
      value: "",
      tableData: [
        {
          name: "李云龙",
          dept: "保卫科",
          type: "请假",
          reason: "外出有事",
          startDate: "2019-04-22",
          returnDate: "2019-04-30",
          length: "18小时",
          curApproval: "老张",
          status: "归档"
        },
        {
          name: "李云龙",
          dept: "保卫科",
          type: "请假",
          reason: "外出有事",
          startDate: "2019-04-22",
          returnDate: "2019-04-30",
          length: "18小时",
          curApproval: "老张",
          status: "归档"
        },
        {
          name: "李云龙",
          dept: "保卫科",
          type: "请假",
          reason: "外出有事",
          startDate: "2019-04-22",
          returnDate: "2019-04-30",
          length: "18小时",
          curApproval: "老张",
          status: "归档"
        },
        {
          name: "李云龙",
          dept: "保卫科",
          type: "请假",
          reason: "外出有事",
          startDate: "2019-04-22",
          returnDate: "2019-04-30",
          length: "18小时",
          curApproval: "老张",
          status: "归档"
        }
      ],
      activities: [
        {
          content: "张主任",
          timestamp: "2018-04-15"
        },
        {
          content: "王主任",
          timestamp: "2018-04-13"
        },
        {
          content: "高首长",
          timestamp: "2018-04-11"
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
      this.confirmFormVisible = true;
      this.confirmLeave = this.tableData[index];
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onSubmit() {
      console.log("submit!");
    },
    // 分页导航
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
      this.getData("", val);
    },
    handleSearch() {
      this.getData(this.formInline.user);
      this.currentPage = 1;
    },
    initBaseinfo() {
      this.baseinfo = {
        code: "",
        name: "",
        status: 1,
        note: ""
      };
      this.currentPage = 1;
      this.title = "添加字典";
      this.detailInfo = {};
      this.getData();
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
            this.initBaseinfo();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          message: "请填写完整信息",
          type: "warning"
        });
      }
      this.innerVisible = false;
    },
    getData(approvalStatus = "0", pageNum = "1", pageSize = "10") {
      var params = {
        approvalStatus: "0",
        pageNum: "1",
        pageSize: "10"
      };
      this.postAxios("OutApply/OutingApplyList", params)
        .then(res => {
          console.log(res);
          this.count = res.count;
          this.tableData = [...res.data];
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.input-width {
  width: 180px;
  margin: 0 10px;
}
.flex {
  display: flex;
}
.staffStatu {
  margin: 0 20px;
}
</style>
