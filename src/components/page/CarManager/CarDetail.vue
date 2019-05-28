<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 车辆信息管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="部队车辆" name="first">
          <div class="messages">
            <el-select class="input-width" v-model="departmentValue" placeholder="所属部门">
              <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select class="input-width" v-model="inoutValue" placeholder="出入状态">
              <el-option
                v-for="item in inoutOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              class="input-width"
              placeholder="车牌号"
              prefix-icon="el-icon-search"
              v-model="input2"
            ></el-input>
            <el-button>搜索</el-button>
            <el-button type="success" @click="addCar()" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="carList"
              style="width: 100%"
              :default-sort="{prop: 'license', order: 'descending'}"
            >
              <el-table-column prop="LicensePlate" label="车牌号" sortable width="180">
                <template slot-scope="scope">
                  
                  {{ scope.row.license }}
                </template>
              </el-table-column>
              <el-table-column prop="carType" label="车辆类型" sortable width="180" formatter=""></el-table-column>
              <el-table-column prop="deptName" label="所属部门" sortable></el-table-column>
              <el-table-column prop="brand" label="车辆品牌" sortable formatter=""></el-table-column>
              <el-table-column prop="model" label="型号" sortable formatter=""></el-table-column>
              <el-table-column prop="useStatus" label="技术状态" sortable formatter=""></el-table-column>
              <el-table-column prop="inOrOut" label="出入状态" sortable formatter=""></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="私家车辆" name="second">
          <div class="messages">
            <el-select class="input-width" v-model="departmentValue" placeholder="所属部门">
              <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select class="input-width" v-model="inoutValue" placeholder="出入状态">
              <el-option
                v-for="item in inoutOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              class="input-width"
              placeholder="车牌号"
              prefix-icon="el-icon-search"
              v-model="input2"
            ></el-input>
            <el-button>搜索</el-button>
            <el-button type="success" @click="addCar()" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'license', order: 'descending'}"
            >
              <el-table-column prop="license" label="车牌号" sortable width="180">
                <template slot-scope="scope">
                  
                  {{ scope.row.license }}
                </template>
              </el-table-column>
              <el-table-column prop="owner" label="车主姓名" sortable></el-table-column>
              <el-table-column prop="ownerTel" label="联系电话" sortable></el-table-column>
               <el-table-column prop="registTime" label="登记时间" sortable width="180"></el-table-column>
              <el-table-column prop="relaterName" label="部队联系人" sortable></el-table-column>
              <el-table-column prop="inOrOut" label="出入状态" sortable></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="临时车辆" name="third">
          <div class="messages">
            <el-select class="input-width" v-model="departmentValue" placeholder="所属部门">
              <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select class="input-width" v-model="inoutValue" placeholder="出入状态">
              <el-option
                v-for="item in inoutOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              class="input-width"
              placeholder="车牌号"
              prefix-icon="el-icon-search"
              v-model="input2"
            ></el-input>
            <el-button>搜索</el-button>
            <el-button type="success" @click="addCar()" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'license', order: 'descending'}"
            >
              <el-table-column prop="license" label="车牌号" sortable width="180">
                <template slot-scope="scope">
                  {{ scope.row.license }}
                </template>
              </el-table-column>
              <el-table-column prop="carType" label="车辆属性" sortable width="180"></el-table-column>
              <el-table-column prop="tel" label="联系电话" sortable></el-table-column>
              <el-table-column prop="registTime" label="登记时间" sortable width="180"></el-table-column>
              <el-table-column prop="inout" label="出入状态" sortable></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import router from "vue-router";
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
      activeName: "first",
      departmentOptions: [
        {
          value: "1",
          label: "连队1"
        },
        {
          value: "2",
          label: "连队2"
        },
        {
          value: "3",
          label: "连队3"
        },
        {
          value: "4",
          label: "连队4"
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
      inoutOptions: [
        {
          value: "1",
          label: "在库"
        },
        {
          value: "2",
          label: "出库"
        }
      ],
      propertyValue: "",
      departmentValue: "",
      inoutValue: "",
      tableData: [
        {
          license: "冀A1231312",
          property: "内部车辆",
          department: "连队1",
          carUser:"小明",
          carUser1: "内部车辆",
          carUser2: "私家车辆",
          carUser3: "临时车辆",
          tel: "1329999999",
          inout: "内部车辆"
        },
        {
          license: "冀A1231312",
          property: "内部车辆",
          department: "连队1",
          carUser:"小明",
          carUser1: "内部车辆",
          carUser2: "私家车辆",
          carUser3: "临时车辆",
          tel: "1329999999",
          inout: "内部车辆"
        },
        {
          license: "冀A1231312",
          property: "内部车辆",
          department: "连队1",
          carUser:"小明",
          carUser1: "内部车辆",
          carUser2: "私家车辆",
          carUser3: "临时车辆",
          tel: "1329999999",
          inout: "内部车辆"
        },
        {
          license: "冀A1231312",
          property: "内部车辆",
          department: "连队1",
          carUser:"小明",
          carUser1: "内部车辆",
          carUser2: "私家车辆",
          carUser3: "临时车辆",
          tel: "1329999999",
          inout: "内部车辆"
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
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    addCar() {
      this.$router.push({ path: "/addcar" });
      // router.push({ path: '/addcar' })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style scoped>
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
</style>
