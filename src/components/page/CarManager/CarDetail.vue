<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 车辆信息管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="部队车辆" name="first">
          <div class="messages">
            <el-select clearable  class="input-width" v-model="departmentValue1" placeholder="所属部门">
              <el-option
                v-for="item in departmentOptions"
                :key="item.tid"
                :label="item.name"
                :value="item.tid"
              ></el-option>
            </el-select>
            <el-input
              class="input-width"
              placeholder="车牌号"
              prefix-icon="el-icon-search"
              v-model="licensePlate1"
            ></el-input>
            <el-button @click="search">搜索</el-button>
            <el-button type="success" @click="addCar('1')" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableDataone"
              style="width: 100%"
              :default-sort="{prop: 'licensePlate', order: 'descending'}"
            >
              <el-table-column prop="licensePlate" label="车牌号"  > </el-table-column>
              <el-table-column prop="carType" label="车辆类型"  :formatter="carnum"></el-table-column>
              <el-table-column prop="deptName" label="所属部门" ></el-table-column>
              <el-table-column prop="brand" label="车辆品牌" :formatter="formatterBrand"></el-table-column>
              <el-table-column prop="model" label="型号" :formatter="formatterModel"></el-table-column>
              <el-table-column prop="useStatus" label="技术状态" :formatter="formatterUseType"></el-table-column>
              <el-table-column prop="inOrOut" label="出入状态" :formatter="formatterInOut" ></el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="countone"
                :current-page.sync="currentPage"
                :page-size="10"
              >
              </el-pagination>
          </div>
          </div>
        </el-tab-pane>


        <el-tab-pane label="私家车辆" name="second">
          <div class="messages">
            <el-input
              class="input-width"
              placeholder="车牌号"
              prefix-icon="el-icon-search"
              v-model="licensePlate2"
            ></el-input>
            <el-input
              class="input-width"
              placeholder="车主名字"
              prefix-icon="el-icon-search"
              v-model="ownerName"
            ></el-input>
            <el-input
              class="input-width"
              placeholder="部队联系人"
              prefix-icon="el-icon-search"
              v-model="relaterName"
            ></el-input>
            <el-select clearable  class="input-width" v-model="relaterDept" placeholder="联系人部门">
              <el-option
                v-for="item in departmentOptions"
                :key="item.tid"
                :label="item.name"
                :value="item.tid"
              ></el-option>
            </el-select>
            <el-button @click="search">搜索</el-button>
            <el-button type="success" @click="addCar('2')" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableDatatwo"
              style="width: 100%"
              :default-sort="{prop: 'licensePlate', order: 'descending'}"
            >
              <el-table-column prop="licensePlate" label="车牌号" ></el-table-column>
              <el-table-column prop="owner" label="车主姓名" ></el-table-column>
              <el-table-column prop="ownerTel" label="联系电话" ></el-table-column>
              <el-table-column prop="registTime" label="登记时间" :formatter="formatterDate"></el-table-column>
              <el-table-column prop="relater" label="部队联系人" ></el-table-column>
              <el-table-column prop="relaterDeptName" label="联系人部门" ></el-table-column>
              <el-table-column prop="inOrOut" label="出入状态" :formatter="formatterInOut" ></el-table-column>
              <el-table-column label="操作" ortable width="200">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="counttwo"
                :current-page.sync="currentPage"
                :page-size="10"
              >
              </el-pagination>
          </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="临时车辆" name="third">
          <div class="messages">
            <el-input
              class="input-width"
              placeholder="车牌号"
              prefix-icon="el-icon-search"
              v-model="licensePlate3"
            ></el-input>
            <el-input
              class="input-width"
              placeholder="车主名字"
              prefix-icon="el-icon-search"
              v-model="ownerName"
            ></el-input>
            <el-input
              class="input-width"
              placeholder="部队联系人"
              prefix-icon="el-icon-search"
              v-model="relaterName"
            ></el-input>
             <el-select clearable  class="input-width" v-model="relaterDept" placeholder="联系人部门">
              <el-option
                v-for="item in departmentOptions"
                :key="item.tid"
                :label="item.name"
                :value="item.tid"
              ></el-option>
            </el-select>
            <el-button @click="search">搜索</el-button>
            <el-button type="success" @click="addCar('3')" class="right">新增</el-button>
          </div>
          <div class="body">
            <el-table
              :data="tableDatathree"
              style="width: 100%"
              :default-sort="{prop: 'licensePlate', order: 'descending'}"
            >
              <el-table-column prop="licensePlate" label="车牌号" ></el-table-column>
              <el-table-column prop="owner" label="车主姓名" ></el-table-column>
              <el-table-column prop="ownerTel" label="联系电话" ></el-table-column>
              <el-table-column prop="registTime" label="登记时间" :formatter="formatterDate" ></el-table-column>
              <el-table-column prop="relater" label="部队联系人" ></el-table-column>
              <el-table-column prop="relaterDeptName" label="联系人部门" ></el-table-column>
              <el-table-column prop="inout" label="出入状态" :formatter="formatterInOut" ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope" width="200">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="countthree"
                :current-page.sync="currentPage"
                :page-size="10"
              >
              </el-pagination>
          </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import router from "vue-router";
export default {
  name: "documentManagement",
  data() {
    return {
      relaterDept: '',//联系人部门
      ownerName: '',//联系人名字
      relaterName: '',//部队联系人
      pageSize: 10,
      pageNum : 1,
      countthree: 0,
      counttwo: 0,
      countone: 0,
      currentPage: 1,
      carList:[],
        restaurants: [],
        state1: '',
        state2p: '',

      activeName: "first",
      departmentOptions: [],
      departmentValue1: "",//内部车辆
      licensePlate1:"",//内部车辆车票搜索
      licensePlate2:"",//私家车辆车票搜索
      licensePlate3:"",//临时车辆车票搜索
      tableDataone : [],
      tableDatatwo : [],
      tableDatathree : []
    };
  },
  created(){
    this.getdataone()
  },
  methods: {
    formatterInOut(row,index){
      if(row.inout){
        return "是";
      }else{
        return "否";
      }
    },
    formatterBrand(row,index){
      if(row.brand=="Toyota"){
        return "丰田";
      }else{
        return "本田";
      }
    },
    formatterModel(row,index){
      if(row.model=="Accare"){
        return "凯美瑞";
      }else{
        return "思域";
      }
    },
    formatterUseType(row,index){
      if(row.useStatus==0){
        return "正常";
      }else{
        return "待修";
      }
    },
     //时间格式化  
    formatterDate(row,index){
      return this.$utils.timeFormatter(row.registTime);
    },
        // 点击分页
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
      this.pageNum = val;
      if( this.activeName== 'first'){
        this.getdataone();
      }else if(this.activeName== 'second'){
        this.getdatatwo();
      }else{
        this.getdatathree();
      }
    },
    search(){
      this.pageNum = 1
      this.currentPage = 1
      var car=this.activeName;
      if(car=="first"){
        this.getdataone();
      }else if(car=="second"){
        this.getdatatwo();
      }else{
        this.getdatathree();
      }
    },
    carnum(row,index){
      return row.carType == '1' ? "内部车辆" : row.carType == '2' ? "外部车辆" : "临时车辆"
      console.log(row)
    },
    //获取部队车辆列表
    getdataone(){
      var params={
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        carType:1,
        ofDept:this.departmentValue1,
        LicensePlate:this.licensePlate1
      };
      let _this = this;
      this.postAxios("/CarInfo/GetCarList",params)
        .then(res => {
          _this.countone = res.count
          _this.tableDataone = res.carList;
          _this.count = res.count;
          _this.departmentOptions=res.deptOptions;
        })
        .catch(err => {
          console.log(err);
      });
    },
    getdatatwo(){
      var params={
        relaterDept: this.relaterDept,//联系人部门
        ownerName: this.ownerName,//联系人名字
        relaterName: this.relaterName,//部队联系人
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        carType:2,
        LicensePlate:this.licensePlate2
      };
      let _this = this;
      this.postAxios("/CarInfo/GetCarList",params)
        .then(res => {
          _this.counttwo = res.count
          _this.tableDatatwo = res.carList
          _this.count = res.count
        })
        .catch(err => {
          console.log(err);
      });
    },
    getdatathree(){
      var params={
        relaterDept: this.relaterDept,//联系人部门
        ownerName: this.ownerName,//联系人名字
        relaterName: this.relaterName,//部队联系人        
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        carType:3,
        LicensePlate:this.licensePlate3
      };
      let _this = this;
      this.postAxios("/CarInfo/GetCarList",params)
        .then(res => {
          _this.countthree = res.count
          _this.tableDatathree = res.carList
          _this.count = res.count
        })
        .catch(err => {
          console.log(err);
      });
    },
    handleEdit(index, row) {
      console.log("111")
      this.$router.push({
        path : '/addcar',
          query : {
            "row" : row
          }
      })
      console.log(index, row);
    },
    //删除
    handleDelete(index, row){
      if(!confirm("确定删除吗？")){
        return false;
      }
      let _this = this;
      this.postAxios("/CarInfo/DeleteCar",{id : row.tid})
        .then(res => {
          _this.$message.success("删除成功")
          _this.getdatatwo()
          _this.getdataone()
          _this.getdatathree()
        })
        .catch(err => {
          console.log(err);
      });
    },
    addCar(type) {
      this.$router.push({ 
          path: "/addcar",
          query:{
            type: type
          }
        });

      // router.push({ path: '/addcar' })
    },
    handleClick(tab, event) {
      this.relaterDept = ''//联系人部门
      this.ownerName = ''//联系人名字
      this.relaterName = ''//部队联系人
      if(tab.index == '0') {
        this.getdataone()
      }else if(tab.index == '1'){
        this.getdatatwo()
      }else if(tab.index == '2'){
        this.getdatathree()
      }
      console.log(tab.index, event);
    },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        console.log(results,queryString,restaurants)

        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      handleSelect(item) {
        console.log("111",item);
      }
  },
      mounted() {
      this.restaurants = this.loadAll();
    }
};
</script>
<style scoped>
.input-width {
  width: 180px;
  margin: 0 10px;
}
.carImg {
  width: 40px;
  height: 40px;
  background: red;
  display: inline-block;
  vertical-align: middle;
}
</style>
