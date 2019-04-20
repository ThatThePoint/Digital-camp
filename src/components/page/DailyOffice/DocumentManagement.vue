<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 公文信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="messages">
        <span>公文标题</span>
        <el-input
          class="input-width"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="input2"
        ></el-input>
        <span>公文等级</span>
        <el-select class="input-width" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>发送时间
        <el-date-picker class="input-width" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>--
        <el-date-picker class="input-width" v-model="value2" type="date" placeholder="选择日期"></el-date-picker>
        <el-button type="primary">查询</el-button>
        <el-button type="success">新增</el-button>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="date" label="公文号" sortable width="180"></el-table-column>
          <el-table-column prop="name" label="公文标题" sortable width="180"></el-table-column>
          <el-table-column prop="address" label="公文等级" :formatter="formatter"></el-table-column>
          <el-table-column prop="address" label="发送部门" :formatter="formatter"></el-table-column>
          <el-table-column prop="edit" label="发送人" :formatter="formatter"></el-table-column>
          <el-table-column prop="address" label="发送时间" :formatter="formatter"></el-table-column>
          <el-table-column prop="edit" label="状态" :formatter="formatter"></el-table-column>
          <el-table-column prop="edit" label="全部已阅" :formatter="formatter"></el-table-column>
          <el-table-column prop="edit" label="操作" :formatter="formatter">

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
      options: [
        {
          value: "选项1",
          label: "普通"
        },
        {
          value: "选项2",
          label: "提醒"
        },
        {
          value: "选项3",
          label: "严重"
        },
        {
          value: "选项4",
          label: "警告"
        },
        {
          value: "选项5",
          label: "紧急"
        }
      ],
      value: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
           edit:'1'
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          edit:'1'
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
           edit:'1'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
           edit:'1'
        }
      ]
    };
  },    
  methods: {
    formatter(row, column) {
      return row.address;
    }
  }
};
</script>
<style scoped>
.input-width {
  width: 180px;
  margin-right: 20px;
}
.messages {
}
</style>
