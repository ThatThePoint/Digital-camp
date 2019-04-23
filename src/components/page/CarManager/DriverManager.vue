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
      <div class="messages">
        <el-select class="input-width" v-model="departmentValue" placeholder="所属部门">
          <el-option
            v-for="item in departmentOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'name', order: 'descending'}"
        >
          <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
          <el-table-column prop="department" label="所属部门" sortable></el-table-column>
          <el-table-column prop="date" label="入职时间" sortable></el-table-column>
          <el-table-column prop="licenseDate" label="驾驶证有效期" sortable></el-table-column>
          <el-table-column prop="duty" label="在岗状态" sortable></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination background layout="prev, pager, next" :total="70"></el-pagination>
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
          licenseDate: "2020-9",
          duty: "在岗"
        },
        {
          name: "小明",
          department: "连队1",
          date: "2018-9-2",
          licenseDate: "2020-9",
          duty: "在岗"
        },
        {
          name: "小明",
          department: "连队1",
          date: "2018-9-2",
          licenseDate: "2020-9",
          duty: "在岗"
        },
        {
          name: "小明",
          department: "连队1",
          date: "2018-9-2",
          licenseDate: "2020-9",
          duty: "在岗"
        },
        {
          name: "小明",
          department: "连队1",
          date: "2018-9-2",
          licenseDate: "2020-9",
          duty: "在岗"
        },
        {
          name: "小明",
          department: "连队1",
          date: "2018-9-2",
          licenseDate: "2020-9",
          duty: "在岗"
        },
        {
          name: "小明",
          department: "连队1",
          date: "2018-9-2",
          licenseDate: "2020-9",
          duty: "在岗"
        },
        {
          name: "小明",
          department: "连队1",
          date: "2018-9-2",
          licenseDate: "2020-9",
          duty: "在岗"
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
