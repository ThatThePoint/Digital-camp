<template>
  <div id="app">
    <img class="vue" src="" />
    <router-view />
    <div class="box">
      <tree-transfer
        :title="title"
        :from_data="parentlist"
        :to_data="fromData"
        :defaultProps="{ label: 'name', children: 'children' }"
        :defaultCheckedKeys="defaultCheckedKeys"
        :mode="mode"
        height="540px"
        node_key="id"
        @addBtn="add"
        @removeBtn="remove"
        @left-check-change="leftCheckChange"
        @right-check-change="rightCheckChange"
        filter        
      >
        <span
          slot="title-right"
          class="my-title-right"
          @click="handleTitleRight"
          ></span
        >
      </tree-transfer>
    </div>
  </div>
</template>

<script>
import treeTransfer from "@/components/common/transfer-extend"; // 源码位置
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
export default {
  name: "App",
  props:["parentlist"],
  data() {
    return {
      pername:[],//想父组件传值名字
      perid:[],//向父组件传id
      mode: "transfer", // transfer addressList
      fromData:[],
      fromArray: [
        {
          id: "1",
          name: "1",
          pid: "0"
        },
        {
          id: "2",
          name: "2",
          pid: "0"
        },
        {
          id: "1-1",
          name: "1-1",
          pid: "1"
        },
        {
          id: "1-2",
          name: "1-2",
          pid: "1"
        },
        {
          id: "1-1-1",
          name: "1-1-1",
          pid: "1-1"
        },
        {
          id: "1-1-1-1",
          name: "1-1-1-1",
          pid: "1-1-1"
        },
        {
          id: "2-1",
          name: "2-1",
          pid: "2"
        },
        {
          id: "2-2",
          name: "2-2",
          pid: "2"
        }
      ],
      toArray: [],
      defaultCheckedKeys: [] // 左侧默认选中数据
    };
  },
  created() {


  },
  computed:{
    ...mapState["pername"],
    treeData(){

    }
  },
  methods: {
    // 标题自定义区点击事件
    handleTitleRight() {
      alert("标题自定义区点击事件");
      this.$emit("chuan",false)
    },
    changeMode() {
      if (this.mode == "transfer") {
        this.mode = "addressList";
      } else {
        this.mode = "transfer";
      }
    },
    // 添加按钮
    // ...mapMutations["add"],
    add(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData1:", fromData);
      console.log("toData1:", toData);
      this.pername = []
      this.perid = []
      for(let i = 0;i < toData.length;i++){
        this.pername.push(toData[i].name)
        this.perid.push(toData[i].id)
      }
      this.$emit("confirm",[this.pername.join(";"),this.perid.join(";")])
    },
    // 移除按钮
    remove(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
      this.pername = []
      for(let i = 0;i < obj.harfKeys.length; i++){
        this.pername.push(obj.harfKeys[i])  
      }
      this.$emit("confirm",this.pername.join(";"))
      console.log("1111",this.pername.join(";"))
    },
    // 左侧源数据选中事件
    leftCheckChange(nodeObj, treeObj) {
      console.log(nodeObj);
      console.log(treeObj);
    },
    // 右侧目标数据选中事件
    rightCheckChange(nodeObj, treeObj) {
      console.log(nodeObj);
      console.log(treeObj);
    },
    // 自定义节点 仅树形结构支持
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    }

  },
  computed: {
    title() {
      if (this.mode == "transfer") {
        return ["人员", "已选择"];
      } else {
        return ["通讯录", "收件人", "抄送人", "密送人"];
      }
    }
  },
  components: { treeTransfer }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.box {
  width: 600px;
  margin: 0 auto;
  text-align: left;
  background: white;
}

.btn {
  border: 1px solid #ebeef5;
  padding: 5px 10px;
  background-color: #f5f7fa;
  outline: none;
}

.my-title-right {
  float: right;
  font-size: 18px;
  cursor: pointer;
}
</style>
