<template>
  <div id="app">
    <img class="vue" src="" />
    <router-view />
    <div class="box">
      <tree-transfer
        :title="title"
        :from_data="fromData"
        :to_data="toData"
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
          >随便写点啥</span
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
  data() {
    return {
      mode: "transfer", // transfer addressList
      //属性右侧默认数据
      fromData: [
        {
          id: 1,
          pid: 0,
          name: "测试右侧",
          children: [
            {
              id: 2,
              pid: 1,
              name: "水电费是打发斯",
              // disabled: true,
              children: []
            },
            {
              id: 3,
              pid: 1,
              name: "11-3",
              children: []
            },
             {
              id: 4,
              pid: 1,
              name: "11-4",
              children: [
                {
                  id: 5,
                  pid: 4,
                  name: "11-5",
                  children: [
                    {
                      id: 111,
                      pid: 5,
                      name: "11-111"
                    }
                  ]
                },
                {
                  id: 6,
                  pid: 4,
                  name: "11-6",
                  children: []
                }
              ]
            } 
          ]
        },
        {
          id: 7127,
          pid: 0,
          name: "debug",
          children: [
            {
              id: 71272,
              pid: 7127,
              name: "debug22",
              // disabled: true,
              children: []
            },
            {
              id: 71273,
              pid: 7127,
              name: "debug11",
              children: []
            }
          ]
        }
      ], 
      // 穿梭框 - 源数据 - 树形左侧默认数据
      toData: [
        // {
        //   id: 1,
        //   pid: 0,
        //   name: "测试左侧",
        //   children: [
        //     {
        //       id: 2,
        //       pid: 1,
        //       name: "水电费是打发斯蒂",
        //       children: [
        //         {
        //           id: 22222222,
        //           pid: 2,
        //           name: "2222222222"
        //         }
        //       ]
        //     }
        //   ]
        // } 
      ], // 穿梭框 - 目标数据 - 树形
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
    // this.defaultCheckedKeys = [1];

    this.$nextTick(() => {
      // this.defaultCheckedKeys = [1];
    });

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
    add(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
    },
    // 移除按钮
    remove(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
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
        return ["源列表", "目标列表"];
      } else {
        return ["通讯录", "收件人", "抄送人", "密送人"];
      }
    }
  },
  components: { treeTransfer }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
