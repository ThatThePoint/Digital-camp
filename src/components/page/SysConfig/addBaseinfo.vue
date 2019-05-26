<template>
  <el-form :model="baseinfo">
    <div class="flex">
      <el-form-item label="字典编码">
        <el-input v-model="baseinfo.code" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="baseinfo.name" placeholder="请输入" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="baseinfo.note" placeholder="请输入" type="textarea"></el-input>
      </el-form-item>
    </div>
    <el-form-item label="字典状态">
      <el-radio v-model="baseinfo.status" :label="1">启用</el-radio>
      <el-radio v-model="baseinfo.status" :label="0">禁用</el-radio>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="commit">确 定</el-button>
    </el-form-item>
  </el-form>
</template>
  
  <script>
import qs from "qs";

export default {
  name: "documentManagement",
  data() {
    return {
      radio: 1,
      baseinfo: {
        code: "",
        name: "",
        status: 1,
        note: ""
      }
    };
  },
  created(){
//var host = "https://localhost:5001/api/";
      var host = "http://digitalcamp.oicp.io:54373/api/";
      this.$axios
        .post(host + "sysConfig/BasedataList",  {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            alert("保存成功");
          } else {
            alert("保存失败。请联系管理员");
          }
        });
  },
  methods: {
    getData() {
      this.postAxios("sysConfig/BasedataList")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
.input-width {
  width: 180px;
  margin: 0 10px;
}
</style>