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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未读消息" name="first">
          <div class="messages">
            <span>公文标题</span>
            <el-input
              class="input-width"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="title"
            ></el-input>
            <span>公文等级</span>
            <el-select clearable class="input-width" v-model="level" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
            发送时间
            <el-date-picker class="input-width" v-model="start" type="date" placeholder="选择日期"></el-date-picker>--
            <el-date-picker class="input-width" v-model="end" type="date" placeholder="选择日期"></el-date-picker>
            <el-button type="primary" @click="getdata(true)">查询</el-button>
            <el-button type="success" @click="addDocument()" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableDataone"
              style="width: 100%"
              :default-sort="{prop: 'code', order: 'descending'}"
            >
              <el-table-column prop="code" label="公文号" sortable width="80">{{}}</el-table-column>
              <el-table-column prop="title" label="公文标题" sortable width="120"></el-table-column>
              <el-table-column prop="messageLevel" label="公文等级" :formatter="formatterLever"></el-table-column>
              <el-table-column prop="sendDeptName" label="发送部门"></el-table-column>
              <el-table-column prop="docCreaterName" label="发送人"></el-table-column>
              <el-table-column prop="docReceiversName" label="收件人" width="200"></el-table-column>
              <el-table-column prop="sendTime" label="发送时间" :formatter="formatterDate"></el-table-column>
              <el-table-column prop="docStatus" label="状态" :formatter="formatterStauswei"></el-table-column>
              <el-table-column prop="allReceive" label="全部已阅" :formatter="formatterReceive"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row, '1')">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="countone"
                :current-page.sync="currentPage"
                :page-size="10"
              >
              </el-pagination>
          </div>
          </div>
        </el-tab-pane>


        <el-tab-pane label="已读消息" name="second">
          <div class="messages">
            <span>公文标题</span>
            <el-input
              class="input-width"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="title"
            ></el-input>
            <span>公文等级</span>
            <el-select clearable  class="input-width" v-model="level" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>发送时间
            <el-date-picker class="input-width" v-model="start" type="date" placeholder="选择日期"></el-date-picker>--
            <el-date-picker class="input-width" v-model="end" type="date" placeholder="选择日期"></el-date-picker>
            <el-button type="primary" @click="getdata(true)">查询</el-button>
            <el-button type="success" @click="addDocument()" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableDatatwo"
              style="width: 100%"
              :default-sort="{prop: 'date', order: 'descending'}"
            >
              <el-table-column prop="code" label="公文号" sortable width="180">{{}}</el-table-column>
              <el-table-column prop="title" label="公文标题" sortable width="180"></el-table-column>
              <el-table-column prop="messageLevel" label="公文等级" :formatter="formatterLever"></el-table-column>
              <el-table-column prop="sendDeptName" label="发送部门"></el-table-column>
              <el-table-column prop="docCreaterName" label="发送人"></el-table-column>
              <el-table-column prop="docReceiversName" label="收件人"></el-table-column>
              <el-table-column prop="sendTime" label="发送时间" :formatter="formatterDate"></el-table-column>
              <el-table-column prop="docStatus" label="状态" :formatter="formatterStausyi"></el-table-column>
              <el-table-column prop="allReceive" label="全部已阅" :formatter="formatterReceive"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row, '2')">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                :page-size="10"
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="counttwo"
                :current-page.sync="currentPage"
              >
              </el-pagination>
            </div>



          </div>
        </el-tab-pane>
        <el-tab-pane label="已发送消息" name="third">
          <div class="messages">
            <span>公文标题</span>
            <el-input
              class="input-width"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="title"
            ></el-input>
            <span>公文等级</span>
            <el-select clearable clearable class="input-width" v-model="level" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>发送时间
            <el-date-picker class="input-width" v-model="start" type="date" placeholder="选择日期"></el-date-picker>--
            <el-date-picker class="input-width" v-model="end" type="date" placeholder="选择日期"></el-date-picker>
            <el-button type="primary" @click="getdata(true)">查询</el-button>
            <el-button type="success" @click="addDocument()" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableDatathree"
              style="width: 100%"
              :default-sort="{prop: 'date', order: 'descending'}"
            >
              <el-table-column prop="code" label="公文号" sortable width="180">{{}}</el-table-column>
              <el-table-column prop="title" label="公文标题" sortable width="180"></el-table-column>
              <el-table-column prop="messageLevel" label="公文等级" :formatter="formatterLever"></el-table-column>
              <el-table-column prop="sendDeptName" label="发送部门"></el-table-column>
              <el-table-column prop="docCreaterName" label="发送人"></el-table-column>
              <el-table-column prop="docReceiversName" label="收件人"></el-table-column>
              <el-table-column prop="sendTime" label="发送时间" :formatter="formatterDate"></el-table-column>
              <el-table-column prop="docStatus" label="状态" :formatter="formatterStausfa"></el-table-column>
              <el-table-column prop="allReceive" label="全部已阅" :formatter="formatterReceive"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row, '3')">查看</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination">
              <el-pagination
                background
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :page-size="10"
                :total="countthree"
                :current-page.sync="currentPage"
              >
              </el-pagination>
          </div>
          </div>
        </el-tab-pane>
      </el-tabs>
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
      countthree: 0,
      counttwo: 0,
      countone: 0,
      currentPage: 1,
      tableDataone: [],//未读公文列表
      tableDatatwo: [],//已读公文列表
      tableDatathree: [],//已发送公文列表
      activeName: 'first',
      level: "",
      title: "",
      start: "",
      end:"",
      options: [],
      tableData: [
        {
          code: "121",
          title: "老哥来访",
          messageLevel: 2,
          sendDeptName: "独立团",
          docCreaterName: "张三丰",
          docReceiversName: "老刘，老李，张三",
          sendTime: "2016-05-02",
          docStatus: 1,
          allReceive: 2
        }
      ]
    };
  },
  created(){
    this.getdata();
    this.getTableDataone()
    this.getTableDatatwo()
    this.getTableDatathree()
    let num = this.$route.query.num
    if(num&&num == '3'){
      this.activeName = 'third'
      this.getTableDatathree()
    }else if(num&&num == '1'){
      this.activeName = 'first'
      this.getTableDataone()
    }else if(num&&num == '2'){
      this.activeName = 'second'
      this.getTableDatatwo()
    }
  },
  methods: {
    //时间格式化  
    formatterDate(row,index){
      return this.$utils.timeFormatter(row.sendTime);
    },
    // 点击分页
    handleCurrentChange(val) {
      debugger
      console.log(val);
      this.currentPage = val;
      this.pageNum = val;
      this.getdata()
    },
    //未读
    getTableDataone(){
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        tab : "first",
        title : this.title,//标题
        level : this.level,//等级
        start	: this.start,
        end : this.end
      }
      let _this = this
      this.postAxios("/DailyOffice/DocumentList",data)
      .then(res => {
        
        _this.tableDataone = res.data
        _this.countone = res.count;
        console.log(res,_this);
      })
      .catch(err => {
        console.log(err);
    });
    },
    //已读
    getTableDatatwo(){
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        tab : "secend",
        title : this.title,//标题
        level : this.level,//等级
        start	: this.start,
        end : this.end
      }
      this.postAxios("/DailyOffice/DocumentList",data)
      .then(res => {
        this.counttwo = res.count
        this.tableDatatwo = res.data
        console.log(res);
      })
      .catch(err => {
        console.log(err);
    });
    },
    //已发送
    getTableDatathree(){
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        tab : "third",
        title : this.title,//标题
        level : this.level,//等级
        start	: this.start,
        end : this.end
      }
      this.postAxios("/DailyOffice/DocumentList",data)
      .then(res => {
        this.countthree = res.count
        this.tableDatathree = res.data
      })
      .catch(err => {
        console.log(err);
    });
    },
    formatterStausfa(row, column){
      return '已发送'
    },
    formatterStauswei(row, column){
      return '未读'
    },
    formatterStausyi(row, column){
      return '已读'
    },
    formatterStaus(row, column) {
      return row.status == 1 ? "发布" : "草稿";
    },
    formatterLever(row, column) {
      return row.messageLevel == "Regular"
        ? "普通"
        : row.messageLevel == ""
        ? "提醒"
        : row.messageLevel == "Serious"
        ? "严重"
        : row.messageLevel == 4
        ? "警告"
        : "紧急";
        
    },
    formatterReceive(row, column) {
      return row.allReceive == 1 ? "已收录" : "待收录";
    },
    handleEdit(index, row, num) {
     this.$router.push({ 
       path: "/adddocument",
       query:{
         type: 'edit',
         id: row.tid,
         num: num
        }
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    addDocument() {
      this.$router.push({ 
          path: "/adddocument",
          query:{
            'type': 'add',
            num: '0'
          } 
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 查询
    getdata(flag){
      if(flag == true){
        this.currentPage = 1
        this.pageNum = 1
      }
      
      var params={
        pageNum: this.pageNum,
        pageSize: 10,
        tab:this.activeName,
        title:this.title,
        level:this.level,
        start:this.start,
        end:this.end
      };
      this.postAxios("DailyOffice/DocumentList",params)
        .then(res => {
          console.log(res);
          this.options=res.levelOps;
          if(this.activeName=="first"){
            this.countone = res.count;
            this.tableDataone = res.data
          }else if(this.activeName=="second"){
            this.counttwo = res.count;
            this.tableDatatwo = res.data
          }else{
            this.countthree = res.count;
            this.tableDatathree = res.data
          }
          
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
  width: 150px;
  margin: 0 10px;
}
</style>
