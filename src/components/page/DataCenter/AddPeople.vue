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
        <el-tab-pane label="现役人员信息" name="first" :disabled="flagone" >
          <Soldier :data="rowdata"></Soldier>
        </el-tab-pane>
        <!-- <el-tab-pane label="士兵信息登记表" name="second" :disabled="">
          <Officer :data="rowdata"/>
        </el-tab-pane> -->
        <el-tab-pane label="文职人员信息" name="secend" :disabled="flagtwo">
          <Civilian :data="rowdata"/>
        </el-tab-pane>
        <el-tab-pane label="社会聘用人员信息" name="third" :disabled="flagthree">
          <Society :data="rowdata"/>
        </el-tab-pane>
        <!-- <el-tab-pane label="公勤人员信息" name="five" :disabled="flagfive">
          <Gongqin :data="rowdata"/>
        </el-tab-pane> -->
        <el-tab-pane label="家属信息" name="four" :disabled="flagfour">
          <Xianyi :data="rowdata"/>
        </el-tab-pane>
        <el-tab-pane label="其他人员信息" name="five" :disabled="flagfive">
          <Jiashu :data="rowdata"/>
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
      flagone : false,
      flagtwo : false,
      flagthree : false,
      flagfour : false,
      flagfive : false,
      flagsix : false,
      flagseven : false,
      activeName: "first",
      rowdata : {}
    };
  },
  created(){
    debugger
    let type = this.$route.query.type;
    this.rowdata = this.$route.query.row
    if(type == 'first'){
      this.flagone = false
      this.flagtwo = true
      this.flagthree = true
      this.flagfour = true
      this.flagfive = true
      this.activeName = "first"
    }else if(type == 'secend'){
      this.flagone = true
      this.flagtwo = false
      this.flagthree = true
      this.flagfour = true
      this.flagfive = true
      this.activeName = "secend"
    }else if(type == 'third'){
      this.flagone = true
      this.flagtwo = true
      this.flagthree = false
      this.flagfour = true
      this.flagfive = true
      this.activeName = "third"
    }else if(type == 'fouth'){
      this.flagone = true
      this.flagtwo = true
      this.flagthree = true
      this.flagfour = false
      this.flagfive = true
      this.activeName = "four"
    }else if(type == 'fifth'){
      this.flagone = true
      this.flagtwo = true
      this.flagthree = true
      this.flagfour = true
      this.flagfive = false
      this.activeName = "five"
    }
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
