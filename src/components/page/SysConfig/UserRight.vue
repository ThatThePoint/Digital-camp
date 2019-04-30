<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>人员权限</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
     <div class="messages">
            <el-button type="success" @click="addPeople" class="right">新增角色</el-button>
          </div>
    <div class="container">
      <div class="body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="code" label="角色编码">{{}}</el-table-column>
          <el-table-column prop="name" label="角色名称"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">角色人员</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
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
      outerVisible: false,
      value1: "",
      value2: "",
      input2: "",
      typeValue: "",
      deptValue: "",
      deptOptions: [
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
      value: "",
      tableData: [
        {
          code: "admin",
          name: "管理员",
          status: "启用"
        },
        {
          code: "generalUser",
          name: "普通用户",
          status: "启用"
        },
        {
         code: "seniorUser",
          name: "高级用户",
          status: "启用"
        }
      ],
      
      formInline: {
        user: "",
        region: ""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
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
      formLabelWidth: "120px",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.outerVisible = true;
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
.messages {
}
.flex {
  display: flex;
}
.staffStatu {
  margin: 0 20px;
}
</style>
