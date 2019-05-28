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
         收件人：<el-input class="input-width" 
                  v-model="input2"  
                  placeholder="请输入关键词"
                  @focus="focus"
                  
                  >
                </el-input>
        <div>
          公文标题：
          <el-input class="input-width" v-model="input2"></el-input>
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
      <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
      <div class="flex-center"> 
        <el-button class="editor-btn" type="danger" @click="handleBack" >取消</el-button>
        <el-button class="editor-btn" type="warn " style="margin-left:40px;">保存</el-button>
        <el-button class="editor-btn" type="success" @click="submit" style="margin-left:40px;">提交</el-button> 
      </div>
     
    </div>
    <div class="post" v-show="flag">
      <postemail />
    </div>
    
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import postemail from "./postemail"; // 源码位置
export default {
  name: "editor",
  data: function() {
    return {
      flag:false,
      content: "",
      editorOption: {
        placeholder: ""
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      input2: "",
      value: "",
      options: [],
      value: [],
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
  methods: {
    focus(){
      console.log("11")
      this.flag = true
    },
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    submit() {
      console.log(this.content);
      this.$message.success("提交成功！");
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
<style scoped lang="scss">
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
      margin-left: 15px;
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
  opacity: 0.7;
  background:black;
}
</style>