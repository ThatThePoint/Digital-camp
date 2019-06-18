<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs tab-position="top" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="现役人员" name="first">
          <div class="messages">
            <span>部门</span>
            <el-select clearable class="input-width" v-model="deptValue" filterable placeholder="请选择">
              <el-option
                v-for="item in DeptOptions"
                :key="item.tid"
                :label="item.name"
                :value="item.tid"
              ></el-option>
            </el-select>
            <el-input
              class="input-width"
              placeholder="请输入姓名"
              prefix-icon="el-icon-search"
              v-model="name"
            ></el-input>
            <el-button type="primary" @click="searchdata">查询</el-button>
            <el-button type="success" @click="addPeople" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'name', order: 'descending'}"
            >
              <el-table-column prop="name" label="姓名" width="100"></el-table-column>
              <el-table-column prop="gender" label="性别" width="100"></el-table-column>
              <el-table-column prop="deptName" label="部门"></el-table-column>
              <el-table-column prop="buzhibie" label="职位"></el-table-column>
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


        <el-tab-pane label="部队家属" name="secend">
          <div class="messages">
            <el-input
              class="input-width"
              placeholder="请输入姓名"
              prefix-icon="el-icon-search"
              v-model="name"
            ></el-input>
            <el-button type="primary" @click="searchdata">查询</el-button>
            <el-button type="success" @click="addPeople" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'name', order: 'descending'}"
            >
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="gender" label="性别"></el-table-column>
              <el-table-column prop="sodierName" label="部队联系人"></el-table-column>
              <el-table-column prop="tel" label="联系电话"></el-table-column>
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


        <el-tab-pane label="部队职工" name="third">
          <div class="messages">
            <el-input
              class="input-width"
              placeholder="请输入姓名"
              prefix-icon="el-icon-search"
              v-model="name"
            ></el-input>
            <el-button type="primary" @click="searchdata">查询</el-button>
            <el-button type="success" @click="addPeople" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'name', order: 'descending'}"
            >
              <el-table-column prop="name" label="姓名" width="100"></el-table-column>
              <el-table-column prop="gender" label="性别" width="100"></el-table-column>
              <el-table-column prop="deptName" label="部门" width="100"></el-table-column>
              <el-table-column prop="buzhibie" label="职位"></el-table-column>
              <el-table-column prop="tel" label="联系电话"></el-table-column>
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


        <el-tab-pane label="临时人员" name="fouth">
          <div class="messages">
            <el-input
              class="input-width"
              placeholder="请输入姓名"
              prefix-icon="el-icon-search"
              v-model="name"
            ></el-input>
            <el-button type="primary" @click="searchdata">查询</el-button>
            <el-button type="success" @click="addPeople" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'name', order: 'descending'}"
            >
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="gender" label="性别"></el-table-column>
              <el-table-column prop="tel" label="电话"></el-table-column>
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
export default {
  name: "documentManagement",
  data() {
    return {
      deptValue: "",
      name: "",
      activeName: "first",
      count: 0,
      DeptOptions: [],
      tableData: [
        {
          name: "李云龙",
          gender: "男",
          dept: "保卫科",
          job: "保卫员",
          tel: "1388585452",
          type: "现役"
        }
      ],
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getdata("1", "10");
    let personTypes = this.$route.query&&this.$route.query.personType
    if(personTypes == 1){
      this.activeName = 'first'
    }else if(personTypes == 2){
      this.activeName = 'secend'
    }else if(personTypes == 3){
      this.activeName = 'third'
    }else if(personTypes == 4){
      this.activeName = 'fouth'
    }else if(personTypes == 5){
      this.activeName = 'secend'
    }else if(personTypes == 6){
      this.activeName = 'secend'
    }else if(personTypes == 7){
      this.activeName = 'secend'
    }
  },
  methods: {
    searchdata(){
      this.getdata("1","10")
    },
    getdata(num, size) {
      if (this.activeName !== "first") {
        this.deptValue = "";
      }
      var params = {
        personType:
          this.activeName == "first"
            ? 1
            : this.activeName == "secend"
            ? "2"
            : this.activeName == "third"
            ? "3"
            : "4",
        deptId: this.deptValue,
        where: this.name,
        pageNum: num,
        pageSize: size
      };
      this.postAxios("DataCenter/StaffList", params)
        .then(res => {
          console.log(res);
          this.count = res.count;
          this.tableData = res.data;
          this.DeptOptions = res.deptOptions;
        })
        .catch(err => {
          console.log(err);
        });
    },
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      this.$router.push({ 
        path: "/addpeople",
         query: { 
           id: row.tid,
           index : row.personType,
           row : row
          } 
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
      if (confirm("确认删除？")) {
        this.postAxios("DataCenter/DeleteStaff", { tid: row.tid })
          .then(res => {
            console.log(res);
            alert("删除成功");
            this.getdata("1", "10");
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    addPeople() {
      this.$router.push("/addpeople");
    },
    handleClick(tab, event) {
      this.getdata("1", "10");
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
.messages {
}
.flex {
  display: flex;
}
.staffStatu {
  margin: 0 20px;
}
</style>
