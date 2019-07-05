<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 车辆维修保养
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">

      <!-- 保养信息弹窗 -->
      <el-dialog :visible.sync="careInfoVisible">
        <el-form :model="careInfo">
          <el-row>
            <el-col :span="12">
              <el-form-item label="维护车辆">
                <el-select clearable v-model="careInfo.carId" placeholder="选择车辆">
                  <el-option
                    v-for="item in selectCar"
                    :key="item.tid"
                    :label="item.name"
                    :value="item.tid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维护日期">
                <el-date-picker
                  v-model="careInfo.operateDate"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="维修类型">
                <el-select clearable v-model="careInfo.careTypeCode" placeholder="请选择">
                  <el-option
                    v-for="item in careTypeOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经办人">
              <el-input v-model="careInfo.careOperatorName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12" >
              <el-form-item label="备注">
              <el-input v-model="careInfo.note"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="savedata">确 定</el-button>
        </div>
      </el-dialog>

      <div class="messages">
        <el-select clearable class="input-width" v-model="departmentValue" placeholder="所属部门">
          <el-option
            v-for="item in departmentOptions"
            :key="item.tid"
            :label="item.name"
            :value="item.tid"
          ></el-option>
        </el-select>
        <el-select clearable class="input-width" v-model="careTypeValue" placeholder="保养类型">
          <el-option
            v-for="item in careType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>保养时间
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          style="width:130px"
        ></el-date-picker>--
        <el-date-picker
          v-model="value2"
          type="date"
          placeholder="选择日期"
          style="width:130px"
        ></el-date-picker>
        <el-input
          placeholder="车牌号"
          prefix-icon="el-icon-search"
          v-model="input2"
          style="width:120px"
        ></el-input>
        <el-button @click="search">搜索</el-button>
        <el-button type="success" @click="handleDetail()" class="right">新增</el-button>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'license', order: 'descending'}"
        >
          <el-table-column prop="licensePlate" label="车牌号" sortable width="120"></el-table-column>
          <el-table-column prop="careTypeName" label="维护类型" sortable width="120"></el-table-column>

          <el-table-column
            prop="operateDate"
            label="维护时间"
            sortable
            width="150"
            :formatter="returnTime"
          ></el-table-column>
          <el-table-column prop="careOperatorName" label="经办人" sortable width="120"></el-table-column>
          <el-table-column prop="note" label="备注" sortable width="350"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEditcar(scope.$index, scope.row)">详情</el-button>
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
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "documentManagement",
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      count: 0,
      currentPage: 1,
      value1: "",
      value2: "",
      input2: "",
      departmentOptions: [
        {
          value: "1",
          label: "连队1"
        }
      ],
      propertyOptions: [
        {
          value: "1",
          label: "内部车辆"
        },
        {
          value: "2",
          label: "外部车辆"
        },
        {
          value: "3",
          label: "临时车辆"
        }
      ],
      careTypeValue: "", //保养类型
      inoutOptions: "", //先随便写个空，一直报错
      careType: [
        {
          value: "1",
          label: "常规保养"
        },
        {
          value: "2",
          label: "维修"
        },
        {
          value: "3",
          label: "损坏"
        }
      ],
      propertyValue: "",
      departmentValue: "",
      inoutValue: "",
      tableData: [],
      //0705修改
      careInfoVisible: false,
      careInfo: {
        carId:"",
        operateDate:"",
        careTypeCode:"",
        careOperatorName:"",
        note:""
      },
      selectCar:[],
      careTypeOptions:[]
    };
  },
  created() {
    this.getTableData({
      pageSize: this.pageSize,
      pageNum: this.pageNum
    });
  },
  methods: {
    //0705新增
    //取消
    cancel(){
      this.careInfoVisible=false;
      this.careInfo={};
    },
    //保存
    savedata(){
      let info = this.ruleForm
      let _this = this;
      this.postAxios("/CarInfo/SaveCareRecord",info)
        .then(res => {
          console.log(res)
          if(res.status == 1){
            _this.$message.success("保存成功")
            _this.$destroy('AddCare')
            _this.$router.push({path: '/CarCare'})
          }
        })
        .catch(err => {
          console.log(err);
      });
    },
    //获取详情
    handleDetail(id){
      this.postAxios("/CarInfo/GetCareRecord",{tid:id})
        .then(res => {
          console.log(res)
          // _this.tableData = res.careList;
          this.selectCar = res.carOptions;
          this.careType = res.careTypeOptions;
          if(id){
            this.careInfo = res.info;
          }    
          console.log(res);
        })
        .catch(err => {
          console.log(err);
      });
      this.careInfoVisible=true;
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageNum = val;
      this.getTableData({
        pageSize: this.pageSize,
        pageNum: this.pageNum
      });
    },
    returnTime(row, index) {
      if (row.operateDate) {
        return row.operateDate.slice(0, 10);
      }
    },
    //搜索数据
    search() {
      this.currentPage = 1;
      let data = {
        pageSize: this.pageSize,
        pageNum: 1,
        deptName: this.departmentValue,
        careTypeName: this.careTypeValue,
        StartTime: this.value1,
        EndTime: this.value2,
        licensePlate: this.input2
      };
      this.getTableData(data);
    },
    //表格数据
    getTableData(data) {
      let _this = this;
      this.postAxios("/CarInfo/GetCareRecordList", data)
        .then(res => {
          _this.count = res.count;
          console.log(res);
          _this.tableData = res.careList;
          _this.departmentOptions = res.deptOptions;
          _this.careType = res.careTypeOptions;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    formatter(row, column) {
      return row.address;
    },

    handleDelete(index, row) {
      console.log(index, row);
    },
    //新增
    addCare() {
      this.careInfoVisible=true;
    }
  }
};
</script>
<style scoped>
.input-width {
  width: 100px;
  margin: 0 10px;
}
</style>
