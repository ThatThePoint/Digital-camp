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
        <el-button type="success"  @click="addDocument()" class="right">新增</el-button>
      </div>
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="number" label="公文号" sortable width="180">{{}}</el-table-column>
          <el-table-column prop="title" label="公文标题" sortable width="180"></el-table-column>
          <el-table-column prop="docLever" label="公文等级" :formatter="formatterLever"></el-table-column>
          <el-table-column prop="sendDept" label="发送部门" ></el-table-column>
          <el-table-column prop="sendPerson" label="发送人" ></el-table-column>
          <el-table-column prop="receiver" label="收件人" ></el-table-column>
          <el-table-column prop="date" label="发送时间" ></el-table-column>
          <el-table-column prop="status" label="状态" :formatter="formatterStaus"></el-table-column>
          <el-table-column prop="allReceive" label="全部已阅" :formatter="formatterReceive"></el-table-column>
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
      options: [
        {
          value: "1",
          label: "普通"
        },
        {
          value: "2",
          label: "提醒"
        },
        {
          value: "3",
          label: "严重"
        },
        {
          value: "4",
          label: "警告"
        },
        {
          value: "5",
          label: "紧急"
        }
      ],
      value: "",
            tableData: [
        {
          number: "121",
          title:"老哥来访",
          docLever:2,
          sendDept:"独立团",
          sendPerson:"张三丰",
          receiver:"老刘，老李，张三",
          date: "2016-05-02",
          status: 1,
          allReceive:2,
        },
        {
          number: "121",
          title:"老哥来访",
          docLever:2,
          sendDept:"独立团",
          sendPerson:"张三丰",
          receiver:"老刘，老李，张三",
          date: "2016-05-02",
          status: 2,
          allReceive:2,
        },
        {
          number: "121",
          title:"老哥来访",
          docLever:5,
          sendDept:"独立团",
          sendPerson:"张三丰",
          receiver:"老刘，老李，张三",
          date: "2016-05-02",
          status: 1,
          allReceive:2,
        },
        {
          number: "121",
          title:"老哥来访",
          docLever:4,
          sendDept:"独立团",
          sendPerson:"张三丰",
          receiver:"老刘，老李，张三",
          date: "2016-05-02",
          status: 1,
          allReceive:2,
        },
        {
          number: "121",
          title:"老哥来访",
          docLever:2,
          sendDept:"独立团",
          sendPerson:"张三丰",
          receiver:"老刘，老李，张三",
          date: "2016-05-02",
          status: 2,
          allReceive:2,
        }
      ]
    };
  },
  methods: {
    formatterStaus(row, column) {
      return row.status==1?"发布":"草稿";
    },
    formatterLever(row, column) {
      return row.docLevel==1?"普通":row.docLever==2?"提醒":row.docLever==3?"严重":row.docLever==4?"警告":"紧急";
    },
    formatterReceive(row, column) {
     return row.allReceive==1?"已收录":"待收录";
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    addDocument() {
      this.$router.push({ path: "/adddocument" });
      // router.push({ path: '/addcar' })
    }
  }
};
</script>
<style scoped>
.input-width {
  width: 180px;
  margin: 0 10px;
}
</style>
