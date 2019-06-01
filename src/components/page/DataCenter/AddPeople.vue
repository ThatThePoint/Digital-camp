<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 新增人员
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="军官信息登记表" name="first">
          <Soldier></Soldier>
        </el-tab-pane>
        <el-tab-pane label="士兵信息登记表" name="second">
          <Officer/>
        </el-tab-pane>
        <el-tab-pane label="文职人员信息登记表" name="third">
          <Civilian/>
        </el-tab-pane>
        <el-tab-pane label="社会聘用人员信息登记表" name="fourth">
          <Society/>
        </el-tab-pane>
        <el-tab-pane label="公勤人员信息登记表" name="fif">
          <Gongqin/>
        </el-tab-pane>
        <el-tab-pane label="现役人员家属信息登记表" name="six">
          <Xianyi/>
        </el-tab-pane>
        <el-tab-pane label="家属区人员信息登记表" name="seven">
          <Jiashu/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Soldier from "./registrationSheet/Soldier.vue";
import Officer from "./registrationSheet/Officer.vue";
import Civilian from "./registrationSheet/Civilian.vue";
import Society from "./registrationSheet/Society.vue";
import Gongqin from "./registrationSheet/gongqin.vue";
import Xianyi from "./registrationSheet/xianyi.vue";
import Jiashu from "./registrationSheet/jiashu.vue";
export default {
  name: "documentManagement",
  components: {
    Soldier,
    Officer,
    Civilian,
    Society,
    Gongqin,
    Xianyi,
    Jiashu
  },
  data() {
    return {
      activeName: "first",
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
    },
    handleBack() {
      history.go(-1);
    }
    }
};
</script>
<style scoped>
.input-width {
  /* width: 100px; */
  width: 150px;
  margin: 0 10px;
}
.header-container {
  /* background:#d8d5d5; */
  display: flex;
}
.carImg {
  width: 100px;
  height: 120px;
  vertical-align: middle;
  border: 1px solid;
  text-align: center;
  line-height: 120px;
}
.carDet {
  vertical-align: middle;
  box-sizing: border-box;
  padding: 26px 20px;
}
.license {
  padding: 10px 0;
}
.itemDet {
  padding: 20px 0 0 80px;
}
.upload {
  display: inline-block;
}
.one,
.two {
  padding: 10px 20px;
  border: 1px solid #d0d0d0;
  margin-top: 5px;
}
.itemDet[data-v-b889b1ce] {
  padding: 7px 0 7px 80px;
}
.color {
  display: inline-block;
  width: 68px;
}
.datas {
  display: inline-block;
  width: 96px;
}
.carstwo {
  display: inline-block;
  width: 100px;
}
.used {
  display: inline-block;
  width: 60px;
  height: 20px;
  text-align: center;
  border-radius: 2px;
  color: red;
}
</style>
