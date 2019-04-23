<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 车库管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="body">
        <div class="legend">
          <div>
            <span class="set danger"></span>在用
          </div>
          <div>
            <span class="set success"></span>空闲
          </div>
          <div>
            <span class="set warning"></span>专属车位
          </div>
        </div>
        <ul class="garage">
          <li v-for="(item) in departmentOptions" :key="item.value"  :class="item.statu" >
            {{item.label}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "documentManagement",
  data() {
    return {
      departmentOptions: [
        {
          value: "1-2",
          label: "A1",
          statu: "use"
        },
        {
          value: "2-2",
          label: "A2",
          statu: "nouse"
        },
        {
          value: "3-2",
          label: "A3",
          statu: "private"
        },
        {
          value: "4-2",
          label: "A4",
          statu: "use"
        },
        {
          value: "1-2",
          label: "A5",
          statu: "use"
        },
        {
          value: "2-2",
          label: "A6",
          statu: "nouse"
        },
        {
          value: "3-2",
          label: "C1",
          statu: "private"
        },
        {
          value: "4-2",
          label: "C2",
          statu: "use"
        },
        {
          value: "1-2",
          label: "C4",
          statu: "use"
        },
        {
          value: "2-2",
          label: "C6",
          statu: "nouse"
        },
        {
          value: "3-2",
          label: "D5",
          statu: "private"
        },
        {
          value: "4-2",
          label: "E5",
          statu: "use"
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
.legend {
  display: flex;
  justify-content: center;
}
.set {
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 0 10px;
  vertical-align: baseline;
}
.garage{
  width: 900px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
}
.garage>li{
  width: 100px;
  height: 100px;
  margin: 20px;
  text-align: center;
  line-height: 100px;
  border: 1px solid #eee;
}
</style>
