<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 部门管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
        <div class="container">
          <el-button type="success" @click="handleAdd" class="right">新增</el-button>
          <div class="body">
            <el-dialog title="部门信息" :visible.sync="dialogFormVisible">
              <el-form :model="deptInfo">
                <div class="flex"></div>
                <el-form-item label="上级部门" :label-width="formLabelWidth">
                  <el-select v-model="deptInfo.parentId" placeholder="请选择" style="margin-left: 10px">
                    <el-option
                        v-for="item in deptsOps"
                        :key="item.tid"
                        :label="item.name"
                        :value="item.tid"
                      ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="部门名称" :label-width="formLabelWidth" required>
                  <el-input class="input-width" placeholder="请输入" v-model="deptInfo.name" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="部门编码" :label-width="formLabelWidth" required>
                  <el-input class="input-width" placeholder="请输入" v-model="deptInfo.code" type="textarea"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleSave">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
    </div>
    <el-tree
      class="trees aass"
      :data="treedata"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="twos" @click="() => append(node, data)">{{ node.label }}</span>
        <span class="detail">
          <el-button
            style="opacity:0"
            type="text"
            size="mini"
            class="butoon"
            @click="() => append(node, data)">
            详情
          </el-button>
          <!-- <el-button
            type="text"
            class="butoon"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button> -->
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline:{},
      deptsOps:[],
      deptInfo:{
        tid:"",
        name:"",
        parentId:"",
        parentName:"",
        code:""
      },
      dialogFormVisible : false,
      formLabelWidth: "120px",
      deptsTableData: [],
      treedata : []
    };
  },
  methods: {
    //详情
    append(node, data) {
      console.log(node, data)
      this.dialogFormVisible = true;
      this.postAxios("DataCenter/InitForm",{tid:data.id})
        .then(res => {
          console.log(res);
          this.deptsOps=res.deptsOps;
          this.deptInfo=res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除  
    remove(node, data) {
      this.postAxios("DataCenter/DeleteDept", {deptId:data.id})
        .then(res => {
          console.log(res);
          alert("删除成功");
          this.getData();
        })
        .catch(err => {
          console.log(err);
        });

      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    handleAdd(){
      this.deptInfo={};
      this.postAxios("DataCenter/InitForm")
        .then(res => {
          console.log(res);
          this.deptsOps=res.deptsOps;
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogFormVisible = true;
    },
    handleEdit(id) {
      this.postAxios("DataCenter/InitForm", {tid:id})
        .then(res => {
          console.log(res);
          this.deptInfo=res.data;
          this.deptsOps=res.deptsOps;
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogFormVisible = true;
    },
    handleCancel(){
      this.dialogFormVisible = false;
    },
    //保存
    handleSave(){
      var nameFlag= this.$utils.isEmpty(this.deptInfo.name);
      var codeFlag= this.$utils.isEmpty(this.deptInfo.code);
      if(nameFlag || codeFlag){
        alert("请先输入部门名称和编码");
        return false;
      }else{
        this.postAxios("DataCenter/SaveDept", this.deptInfo)
        .then(res => {
          console.log(res);
          alert("保存成功");
          this.getData();
        })
        .catch(err => {
          console.log(err);
        });
        this.getData();
      this.dialogFormVisible = false;
      }
    },
    getTree(data){
      let map = {};
      let val = [];
      //生成数据对象集合
      data.forEach(it=>{
        delete it.children;
        map[it.id] = it;
      })
      //生成结果集
      data.forEach(it=>{
          const parent = map[it.parentId];
          if(parent){
              if(!Array.isArray(parent.children)) parent.children = [];
              parent.children.push(it);
          }else{
              val.push(it);
          }
      })
      return val;
    },
    //拿接口数据
    getData(name, pageNum = 1, pageSize = 10) {
      this.postAxios("DataCenter/GetDepts", { name, pageNum, pageSize })
        .then(res => {
          console.log(res);
          this.count = res.count;
          this.deptsTableData = [...res.depts];
          var keyMap = {
              "tid" : "id",
              "name" : "label"
          };
          for(let i = 0; i < this.deptsTableData.length; i++){
            let obj = this.deptsTableData[i];
            for(let key in obj){
              var newKey = keyMap[key];
              if(newKey){
                obj[newKey] = obj[key];
                delete obj[key];
              }
            }
          }
          this.treedata=this.getTree(this.deptsTableData)
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
<style scoped lang="scss">





.input-width {
  width: 180px;
  margin: 0 10px;
}
.box{
  background: white;
}
.container{
  border: none !important;
  width: 400px;
}
.detail{
  width: 150px;
  display: inline-block;
  text-align: right;
}
.el-tree-node__content{
  margin-bottom: 10px!important;
}
.custom-tree-node{
  display: inline-block;
  /* margin-bottom: 10px; */
}
.butoon{
  font-size: 15px;
}
.el-tree.trees{
  .el-tree-node__content{
    height: 32px !important;
  }
}
.twos{
  font-size: 18px;
}
</style>
