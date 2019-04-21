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
      <div class="messages">
        <el-select class="input-width" v-model="propertyValue" placeholder="车辆属性">
          <el-option
            v-for="item in propertyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select class="input-width" v-model="cartypeValue" placeholder="所属部门">
          <el-option
            v-for="item in cartypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select class="input-width" v-model="statuValue" placeholder="状态">
          <el-option
            v-for="item in statuOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select class="input-width" v-model="careValue" placeholder="保养类型">
          <el-option
            v-for="item in careOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>发送时间
        <el-date-picker class="input-width" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>--
        <el-date-picker class="input-width" v-model="value2" type="date" placeholder="选择日期"></el-date-picker>
        <el-input
          class="input-width"
          placeholder="车牌号"
          prefix-icon="el-icon-search"
          v-model="input2"
        ></el-input>
        <el-button>搜索</el-button>
        <el-button type="success">新增</el-button>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'license', order: 'descending'}"
        >
          <el-table-column prop="license" label="车牌号" sortable width="180">
            <template slot-scope="scope">
              <div class="carImg"></div>
              {{ scope.row.license }}
            </template>
          </el-table-column>
          <el-table-column prop="property" label="车辆编号" sortable width="180"></el-table-column>
          <el-table-column prop="cartype" label="车辆类型" sortable></el-table-column>
          <el-table-column prop="carUser" label="所属部门" sortable></el-table-column>
          <el-table-column prop="tel" label="记录类型" sortable></el-table-column>
          <el-table-column prop="inout" label="时间" sortable></el-table-column>
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
      cartypeOptions: [
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
      statuOptions: [
        {
          value: "1",
          label: "在用"
        },
        {
          value: "2",
          label: "停用"
        }
      ],
      statuValue: "",
      careOptions: [
        {
          value: "1",
          label: "常规保养"
        },
      ],
      careValue: "",
      inoutOptions: [
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
      propertyValue: "",
      cartypeValue: "",
      inoutValue: "",
      tableData: [
        {
          license: "冀A1231312",
          property: "内部车辆",
          cartype: "连队1",
          carUser: "小明",
          tel: "1329999999",
          inout: "内部车辆"
        },
        {
          license: "冀A1231312",
          property: "内部车辆",
          cartype: "连队1",
          carUser: "小明",
          tel: "1329999999",
          inout: "内部车辆"
        },
        {
          license: "冀A1231312",
          property: "内部车辆",
          cartype: "连队1",
          carUser: "小明",
          tel: "1329999999",
          inout: "内部车辆"
        },
        {
          license: "冀A1231312",
          property: "内部车辆",
          cartype: "连队1",
          carUser: "小明",
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
    }
  }
};
</script>
<style scoped>
.input-width {
  width: 120px;
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
