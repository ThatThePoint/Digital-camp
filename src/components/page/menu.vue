<template>
  <div>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;"  row-key="id">
      <el-table-column prop="name" label="名称" sortable width="180"></el-table-column>
      <el-table-column prop="note" label="描述" sortable width="180"></el-table-column>
      <el-table-column sort="address" label="序号"></el-table-column>
      <el-table-column status="address" label="状态"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "政治部",
          note: "政治部",
          sort: "1",
          status: "有效"
        },
        {
          id: 2,
          name: "政治部",
          note: "政治部",
          sort: "2",
          status: "有效"
        },
        {
          id: 3,
          name: "政治部",
          note: "政治部",
          sort: "3",
          status: "有效",
          children: [
            {
              id: 31,
              name: "政治部",
              note: "政治部",
              sort: "1",
              status: "有效"
            },
            {
              id: 32,
              name: "政治部",
              note: "政治部",
              sort: "2",
              status: "有效"
            }
          ]
        },
      ],
    };
  },
  methods: {
    load(tree, treeNode, resolve) {
      resolve([
        {
          id: 31,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: 32,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        }
      ]);
    },
    handleEdit(index, row) {
      console.log(index, row);
    }
  }
};
</script>