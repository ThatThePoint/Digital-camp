<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 公文管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>增加公文</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="container-header">
        <div class="container-header-left">
          <span class="poster">收件人：</span>
          <el-input class="input-width" 
              v-model="postname"  
              placeholder="请输入关键词"            
              @focus="focus"                  
              >
          </el-input>
        </div>
        <div class="container-header-left">
          <span>公文标题：</span>
          <el-input class="input-width" v-model="title"></el-input>
        </div>
        <div class="container-header-left">    
        <span>公文等级：</span>
          <el-select class="input-width" v-model="level" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
          </div>
        <el-upload
          class="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >     
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" style="height: 300px"></quill-editor>
      <div class="flex-center"> 
        <el-button class="editor-btn" type="danger" @click="handleBack" >取消</el-button>
        <el-button class="editor-btn" type="warn " style="margin-left:40px;">保存</el-button>
        <el-button class="editor-btn" type="success" @click="submit" style="margin-left:40px;">提交</el-button> 
      </div>
     
    </div>
    
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <span> <postemail  v-on:confirm="confirms" :parentlist="parentlist"/></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" >确 定</el-button>
      </span>
    </el-dialog>
    <template >
      <el-button :plain="true" @click="open3" v-show="false">警告</el-button>
    </template>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import { quillEditor } from "vue-quill-editor";
import postemail from "./postemail"; // 源码位置
export default {
  name: "editor",
  data: function() {
    return {
      docuId:"",//公文tid
      perid:"",//接受父组件传过来的id
      parentlist:[],//传给穿梭框的树表数据
      level: "",//传给后台公文等级
      options:"",//后台返回公文等级
      postname:"",//收件人
      dialogVisible: false,
      title:"",
      content: "",
      editorOption: {
        placeholder: ""
      },
      fileList: [],
      list: [],
      loading: false,
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ],
    };
  },
  components: {
    quillEditor,postemail
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  computed:{
  },
  created(){
    this.docuId= this.$route.query.id;
    let _this = this
    this.postAxios("/DailyOffice/GetDocument",{
         tid:this.docuId
      })
      .then(res => {
        console.log(res);
        this.options=res.options;
        _this.parentlist = _this.getTree(res.fromData);
        if(res.document){
        _this.docuId=res.document.tid;
        _this.title=res.document.title;
        _this.content=res.document.content;
        _this.postname=res.document.docReceiversName;
        _this.level=res.document.messageLevel;
        }
      })
      .catch(err => {
        console.log(err);
    });
    
  },
  methods: {
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
        const parent = map[it.pid];
        if(parent){
            if(!Array.isArray(parent.children)) parent.children = [];
            parent.children.push(it);
        }else{
            val.push(it);
        }
    })
    return val;
  },
    open3() {
      this.$message({
        message: '您有必填项未填',
        type: 'warning'
      });
    },
    //获取收件人
    getPoster(){

    },
    cancel(){
      this.dialogVisible = false;
    },
    confirm(info){
      console.log(info)
      this.dialogVisible = false;

    },
    confirms(a){
      debugger
      this.postname = a[0]
      this.perid = a[1]
  
    },
    focus(){
      this.dialogVisible = true;
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    submit() {
      let data = {
        tid:this.docuId,
        docReceiversName : this.postname,
        docReceiversId : this.perid,
        title : this.title,
        messageLevel : this.level,
        content : this.content
      };
      console.log(data);
      let flag;
      for( let i in data){
        if(data[i] == ''){
          flag = false
        }else{
          flag = true
        }
      }
      if(flag == false){
        this.open3()
      }else{
        this.postAxios("/DailyOffice/Savedocument",{
            model:data
          })
          .then(res => {
            console.log(res);
            this.$message.success("提交成功！");
            history.go(-1);
          })
          .catch(err => {
            console.log(err);
        });
      }
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleBack(){
      history.go(-1);
    }
   
  }
};
</script>
<style lang="scss">
.el-dialog__wrapper{
  overflow: hidden !important;
  .el-dialog{
    margin-top: 50px !important;;
  }
}
.el-dialog{
  .el-dialog__body{
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
}
.editor-btn {
  margin-top: 20px;
}
.upload {
  width: 200px;
}
.input-width {
  width: 150px;
}
.container{
  .container-header{
    .el-select.el-select--small{
      width: 700px;
      margin-bottom: 5px;
    }
    .el-input-width.el-input.el-input--small{
      width: 700px !important;
    }
    .button{
      height: 28px;
      width: 69px;
      background: white;
    }
    .input-width{
      width: 700px !important;
    }
  }
}
.post{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:#d0d0d0;
  .box{
    background: white !important;
  }
}
.container-header-left{
  text-align: left;
  margin-bottom: 5px;
  .poster{
    display: inline-block;
    width: 70px;
  }
}
</style>