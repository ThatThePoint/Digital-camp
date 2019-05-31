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
        <el-select class="input-width" v-model="departmentValue" placeholder="所属部门">
          <el-option
            v-for="item in departmentOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select class="input-width" v-model="inoutValue" placeholder="状态">
          <el-option
            v-for="item in inoutOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select class="input-width" v-model="careTypeValue" placeholder="保养类型">
          <el-option
            v-for="item in careType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        发送时间
        <el-date-picker class="input-width" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>--
        <el-date-picker class="input-width" v-model="value2" type="date" placeholder="选择日期"></el-date-picker>
        <el-input
          class="input-width"
          placeholder="车牌号"
          prefix-icon="el-icon-search"
          v-model="input2"
        ></el-input>
        <el-button>搜索</el-button>
        <el-button type="success"  @click="addCare()" class="right">新增</el-button>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'license', order: 'descending'}"
        >
          <el-table-column prop="license" label="车牌号" sortable width="180">
          </el-table-column>
          <el-table-column prop="property" label="维护类型" sortable width="180"></el-table-column>
          <el-table-column prop="department" label="维护原因" sortable></el-table-column>
          <el-table-column prop="inout" label="维护时间" sortable></el-table-column>
          <el-table-column prop="carUser" label="经办人" sortable></el-table-column>
          <el-table-column prop="carUser" label="备注" sortable></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEditcar(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
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
      careTypeValue:"",//保养类型
      inoutOptions:"",//先随便写个空，一直报错
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
      tableData: [
        {
          license: "冀A1231312",
          property: "2211",
          department: "连队1",
          carUser: "常规保养",
          tel: "￥885",
          inout: "2019-04-21"
        },
        {
          license: "冀A1231312",
          property: "2211",
          department: "连队1",
          carUser: "常规保养",
          tel: "￥885",
          inout: "2019-04-21"
        },
        {
          license: "冀A1231312",
          property: "2211",
          department: "连队1",
          carUser: "常规保养",
          tel: "￥885",
          inout: "2019-04-21"
        },
        {
          license: "冀A1231312",
          property: "2211",
          department: "连队1",
          carUser: "常规保养",
          tel: "￥885",
          inout: "2019-04-21"
        },
      ]
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    //详情
    // ...mapMutations(['handleEditcar']),
    handleEditcar(index, row) {
      console.log(index, row);
      this.$router.push({
        path : '/addcare',
        query : {
          "row" : row
        }
      })
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //新增
    addCare(){
      this.$router.push({path: '/addcare'})
      // router.push({ path: '/addcar' })
    }
  }
};
</script>
<style scoped>
.input-width {
  width: 100px;
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
