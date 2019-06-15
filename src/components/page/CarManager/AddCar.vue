<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i> 增加车辆
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane label="内部车辆" name="first" :disabled="flagone">
          <div class="header-container">

            <div class="carImg">
              <el-upload
                class="avatar-uploader"
                action="http://digitalcamp.oicp.io:54373/api/Upload/Upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>

            <div class="carDet">
              <div class="license">
              </div>
              <div>
                <span class="starred">*</span>车辆类型
                <el-select clearable class="input-width" v-model="carInfo.carType" placeholder="请选择">
                  <el-option
                    v-for="item in carTypeOptionsone"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="one">
              <p>车辆基本信息：<span class="starred">*</span>车牌号：<el-input class="input-width" placeholder="请输入" v-model="carInfo.licensePlate"></el-input></p>
              <div class="itemDet">
                <span class="starred">*</span>车辆品牌：
                <el-select clearable class="input-width" v-model="carInfo.brand" placeholder="请选择">
                  <el-option
                    v-for="item in brandOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
                <span class="starred">*</span>车辆型号：
                <el-select clearable class="input-width" v-model="carInfo.model" placeholder="请选择">
                  <el-option
                    v-for="item in modelOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
                <br/>
                <span class="color"><span class="starred">*</span>颜色：</span>
                <el-select clearable class="input-width" v-model="carInfo.color" placeholder="请选择">
                  <el-option
                    v-for="item in colorOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
                <span class="starred">*</span>行驶证号： 
                <el-input class="input-width" placeholder="行驶证号" v-model="carInfo.driveLicense"></el-input>
                <!-- <el-button size="small" type="success">照片上传</el-button> -->

              </div>
              <div class="itemDet">
                <span class="starred">*</span>车辆座位：
                <el-select clearable class="input-width" v-model="carInfo.loadNumber" placeholder="请选择">
                  <el-option
                    v-for="item in seatOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <span class="starred">*</span>车辆载重：
                <el-select clearable class="input-width" v-model="carInfo.load" placeholder="请选择">
                  <el-option v-for="item in countCar" :key="item.value" :value="item.value"></el-option>
                </el-select><br/>
                <span class="starred">*</span><span class="chejia">车架号：</span>
                <el-input class="input-width" placeholder="请输入" v-model="carInfo.frameCode"></el-input>
                <span class="starred">*</span>发动机号：<el-input class="input-width" placeholder="请输入" v-model="carInfo.motorCode"></el-input>
                
              </div>
              <el-upload
                class="upload"
                action="http://digitalcamp.oicp.io:54373/api/Upload/Upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-error="errorHandle"
                :on-success="successHandle"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
              > 
                <el-button size="small" type="primary">点击上传行驶证照片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </div>



            <div class="two">
              <p>内部车辆附加：</p>
              <div class="itemDet">
                <span class="starred">*</span>所属单位：
                <el-select clearable class="input-width" v-model="carInfo.ofDept" placeholder="请选择">
                  <el-option
                    v-for="item in departmentOptions"
                    :key="item.tid"
                    :label="item.name"
                    :value="item.tid"
                  ></el-option>
                </el-select>车辆类别1：
                <el-select clearable class="input-width" v-model="carInfo.carType1" placeholder="请选择">
                  <el-option
                    v-for="item in carType1Options"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
                <span class="carstwo">类别2：</span>
                <el-select clearable class="input-width" v-model="carInfo.carType2" placeholder="请选择">
                  <el-option
                    v-for="item in carType2Options"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </div>
              <div class="itemDet">
                <span class="starred">*</span>车辆权限：
                <el-select clearable class="input-width" v-model="carInfo.carRight" placeholder="请选择">
                  <el-option
                    v-for="item in carRightOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
                <span class="datas">登记日：</span>
                <el-date-picker class="input-width" v-model="carInfo.registTime" type="date" placeholder="选择日期"></el-date-picker>授权有效期：
                <el-date-picker class="input-width" v-model="carInfo.rightValid" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </div>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="外部车辆/临时车辆" name="second" :disabled="flagtwo">
          <div class="header-container">
            <div class="carImg">
              <el-upload
                class="avatar-uploader"
                action="http://digitalcamp.oicp.io:54373/api/Upload/Upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="carDet">
              <div class="license">
              </div>
              <div>
                车辆类型
                <el-select clearable class="input-width" v-model="carInfo.carType" placeholder="请选择">
                  <el-option
                    v-for="item in carTypeOptionstwo"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
            <div class="one three">
              <p>车辆基本信息：<span class="starred">*</span>车牌号：<el-input class="input-width" placeholder="请输入" v-model="carInfo.licensePlate"></el-input></p>
              <div class="itemDet">
                <span class="starred">*</span>车辆品牌：
                <el-select clearable class="input-width" v-model="carInfo.brand" placeholder="请选择">
                  <el-option
                    v-for="item in brandOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select><span class="starred">*</span>车辆型号：
                <el-select clearable class="input-width" v-model="carInfo.model" placeholder="请选择">
                  <el-option
                    v-for="item in modelOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
                <br/>
                <span class="color"><span class="starred">*</span>颜色：</span>
                <el-select clearable class="input-width" v-model="carInfo.color" placeholder="请选择">
                  <el-option
                    v-for="item in colorOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select><span class="starred">*</span>行驶证号：
                <el-input class="input-width" placeholder="行驶证号" v-model="carInfo.driveLicense"></el-input>
              </div>
              <div class="itemDet">
                <span class="starred">*</span>车辆座位：
                <el-select clearable class="input-width" v-model="carInfo.loadNumber" placeholder="请选择">
                  <el-option
                    v-for="item in seatOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select><span class="starred">*</span>车辆载重：
                <el-select clearable class="input-width" v-model="carInfo.load" placeholder="请选择">
                  <el-option v-for="item in seatOptions" :key="item.value" :value="item.value"></el-option>
                </el-select><br/>
                 <span class="starred">*</span><span class="chejia">车架号：</span>
                <el-input class="input-width" placeholder="请输入" v-model="carInfo.frameCode"></el-input>
                <span class="starred">*</span>发动机号：
                <el-input class="input-width" placeholder="请输入" v-model="carInfo.motorCode"></el-input>
                <div>
                  <el-upload
                    class="upload twoq"
                    action="http://digitalcamp.oicp.io:54373/api/Upload/Upload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-error="errorHandle"
                    :on-success="successHandle"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                  > 
                    <el-button size="small" type="primary">点击上传行驶证照片</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </div>
              </div>

            </div>
          <div class="one">
            <p>外部车辆附加：</p>
            <div class="itemDet">
              <span class="starred">*</span>
              <span class="ddd">车主姓名：</span>
              <el-input class="input-width" placeholder="请输入" v-model="carInfo.owner"></el-input>
              <span class="starred">*</span>
              <span class="ddd">手机号： </span>
              <el-input class="input-width" placeholder="请输入" v-model="carInfo.ownerTel" @blur="telBlue" type="number"></el-input><br/>
              <span class="starred">*</span>
              <span class="ddd">部队联系人：</span>
              <el-input class="input-width" placeholder="请输入" v-model="carInfo.relater"></el-input>
              <span class="starred">*</span>
              <span class="ddd">联系人部门：</span>
              <el-select clearable class="input-width" v-model="carInfo.relaterDept" placeholder="请选择">
                <el-option
                  v-for="item in departmentOptions"
                  :key="item.tid"
                  :label="item.name"
                  :value="item.tid"
                ></el-option>
              </el-select>
            </div>
            <div class="itemDet">
              <span class="dddd">车辆权限：</span>
              <el-select clearable class="input-width" v-model="carInfo.carRight" placeholder="请选择">
                <el-option
                  v-for="item in carRightOptions"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
              <span class="ddd">权限有效期：</span>
              <el-date-picker class="input-width" v-model="carInfo.rightValid" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="itemDet">
              身份证：
              <el-input class="input-width cards" placeholder="请输入" v-model="carInfo.ownerIdCard" @blur="cardBlue"></el-input>
                <div style="display:flex">
                  <div class="carImg" style="margin-right:50px">
                    <el-upload
                      class="avatar-uploader"
                      action="http://digitalcamp.oicp.io:54373/api/Upload/Upload"
                      :show-file-list="false"
                      :on-success="cardone"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="cardimg1" :src="cardimg1" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>     
                  </div>
                  <div class="carImg">
                    <el-upload
                      class="avatar-uploader"
                      action="http://digitalcamp.oicp.io:54373/api/Upload/Upload"
                      :show-file-list="false"
                      :on-success="cardtwo"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="cardimg2" :src="cardimg2" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>                   
                  </div>
                </div>
                <div style="display:flex">
                  <div style="margin-right:70px;margin-left:10px;">身份证正面</div>
                  <div>身份证反面</div>
                </div>
            </div>
            <div class="itemDet">
              驾驶证：
              <el-input class="input-width cards" placeholder="请输入" v-model="carInfo.relaterLicenseNo"></el-input>
                <div style="display:flex">
                  <div class="carImg" style="margin-right:50px">
                    <el-upload
                      class="avatar-uploader"
                      action="http://digitalcamp.oicp.io:54373/api/Upload/Upload"
                      :show-file-list="false"
                      :on-success="liceone"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="liceimg1" :src="liceimg1" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>     
                  </div>
                  <div class="carImg">
                    <el-upload
                      class="avatar-uploader"
                      action="http://digitalcamp.oicp.io:54373/api/Upload/Upload"
                      :show-file-list="false"
                      :on-success="licetwo"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="liceimg2" :src="liceimg2" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>                   
                  </div>
                </div>
                <div style="display:flex">
                  <div style="margin-right:70px;margin-left:10px;">驾驶证正面</div>
                  <div>驾驶证反面</div>
                </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="flex-center itemDet" style="margin-top:20px;">
        <el-button class="editor-btn" type="danger" @click="handleBack">取消</el-button>
        <el-button class="editor-btn" type="success" style="margin-left:40px;" @click="confirms">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import utils from '../../../utils'
export default {
  name: "documentManagement",
  computed:{
    seatOptions(){
      let arrobj = []
      for ( let i = 1; i < 100;i++){
        arrobj.push({'label':i,'value':i})
      }
      return arrobj
    },
    countCar(){
      let arrobj = []
      for ( let i = 1; i < 11;i++){
        arrobj.push({'label':i,'value':i+"吨"})
      }
      return arrobj
    }
  },
  data() {
    return {

      fileList:[],
      flagone:false,
      flagtwo:false,
      carRightOptions : [],//车辆权限
      carType1Options : [],//车辆类别1
      carType2Options :[],//车辆类别2
      inoutOptions:"",
      value1:"",
      value2:"",
      propertyOptions:"",
      activeName: "first",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      //单位
      departmentOptions: [],
      carTypeOptionsone: [
        {
          value: "1",
          label: "内部车辆"
        }
      ],
      carTypeOptionstwo: [
        {
          value: "2",
          label: "外部车辆"
        },
        {
          value: "3",
          label: "临时车辆"
        }
      ],
      //品牌
      brandOptions: [],
      modelOptions: [ ],
      colorValue: "", //颜色
      colorOptions: [],
      rightOptions: [],
      tableData: [],
      imageUrl: '',
      cardimg1:"",
      cardimg2:"",
      liceimg1:"",
      liceimg2:"",
      carPhoto:"",//车辆照片
      carInfo:{
        tid:"",
        //<summary>车辆类型 1-内部车辆 2-外部车辆 3-临时车辆</summary>
        carType:"",
        licensePlate:"",//车牌号
        // <summary>部门</summary>
        ofDept:"",
        // <summary>部门名称</summary>
        deptName:"",
        // <summary>品牌code</summary>
        brand:"",
        // <summary>品牌名</summary>
        brandName:"",

        // <summary>型号</summary>
        model:"",

        // <summary>型号名</summary>
        modelName:"",

        // <summary>车架号</summary>
        frameCode:"",

        // <summary>发动机号</summary>
        motorCode:"",

        // <summary>技术状态（1-正常 2待修 3维修中 4报废）</summary>
         useStatus:"",

        // <summary>颜色</summary>
        color:"",

        // <summary>车辆类型1</summary>
        carType1:"",

        // <summary>类型2</summary>
        carType2:"",

        // <summary>载重</summary>
        load:"",

        // <summary>荷载人数</summary>
         loadNumber:"",

        // <summary>行驶证号</summary>
        driveLicense:"",

        // <summary>行驶证附件路径</summary>
        driveLicensephoto:"",

        // <summary>当前位置（在内/在外）</summary>
         inOrOut:"",

        // <summary>车辆权限(参考人员权限，这里可能不需要这个字段)</summary>
        carRight:"",

        // <summary>权限有效期</summary>
        rightValid:"",

        // <summary>登记时间</summary>
        registTime:"",

        // <summary>车辆照片路径</summary>
        carPhoto:"",

        // <summary>下次保养时间</summary>
        nextMainTime:"",

        // <summary>保险有效期</summary>
        insuranceValid:"",

        // <summary>车主id</summary>
        ownerId:"",

        // <summary>车主</summary>
        owner:"",

        // <summary>车主电话</summary>
        ownerTel:"",

        // <summary>部队联系人</summary>
        relater:"",

        // <summary>部队联系人姓名</summary>
        relaterName:"",

        // <summary>联系人部门编号</summary>
        relaterDept:"",

        // <summary>联系人部门名称</summary>
        relaterDeptName:"",

        // <summary>车主驾驶证号</summary>
        relaterLicenseNo:"",

        // <summary>车主驾驶证附件</summary>
        relaterLicensePhoto:"",

        // <summary>车主身份证号</summary>
        ownerIdCard:"",

        // <summary>车主身份证照片</summary>
        ownerIdCardPhoto:"",
        ownerIdCardPhoto1:"",//身份证正面
        ownerIdCardPhoto2:"",//身份证背面
        relaterLicensePhoto1:"",//驾驶证正面
        relaterLicensePhoto2:"",//驾驶证背面
      }
    };
  },

  created(){
    //编辑时进入页面
    if( this.$route.query.row ){
      this.imageUrl = "http://digitalcamp.oicp.io:54373/here/" + this.$route.query.row.carPhoto
      this.cardimg1 = "http://digitalcamp.oicp.io:54373/here/" + this.$route.query.row.ownerIdCardPhoto1
      this.cardimg2 = "http://digitalcamp.oicp.io:54373/here/" + this.$route.query.row.ownerIdCardPhoto2
      this.liceimg1 = "http://digitalcamp.oicp.io:54373/here/" + this.$route.query.row.relaterLicensePhoto1
      this.liceimg2 = "http://digitalcamp.oicp.io:54373/here/" + this.$route.query.row.relaterLicensePhoto2
      this.fileList = [{"url":"http://digitalcamp.oicp.io:54373/here/"+this.$route.query.row.driveLicensephoto,"name":"行驶证照片"}]
      this.carInfo = this.$route.query.row
      if(this.$route.query.row.carType == 1){
        this.activeName = 'first',
        this.flagone = false
        this.flagtwo = true
      }else{
        this.activeName = 'second'
        this.flagone = true
        this.flagtwo = false
      }
    }
    this.getSelectValue()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.carInfo.carPhoto = res.path
      console.log(this.carInfo.carPhoto)
    },
    cardone(res, file){
      this.cardimg1 = URL.createObjectURL(file.raw);
      this.carInfo.ownerIdCardPhoto1 = res.path
    },
    cardtwo(res, file){
      this.cardimg2 = URL.createObjectURL(file.raw);
      this.carInfo.ownerIdCardPhoto2 = res.path
    },
    liceone(res, file){
      this.liceimg1 = URL.createObjectURL(file.raw);
      this.carInfo.relaterLicensePhoto1 = res.path
    },
    licetwo(res, file){
      this.liceimg2 = URL.createObjectURL(file.raw);
      this.carInfo.relaterLicensePhoto2 = res.path
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },


    handleRemove(file, fileList) {

      console.log(file, fileList);
    },
    handlePreview(file) {
      debugger
      var a = document.createElement('a');
      console.log("!1111111111",)
      a.href = this.fileList[0].url;
      a.download = 'dname';
      a.target = "_block"
      a.click();
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    errorHandle(){
      console.log("error");
    },
    successHandle(file, fileList){
      this.carInfo.driveLicensephoto = file.path
      console.log(this.carInfo.driveLicensephoto)
    },








    //验证手机号
    telBlue(){
      utils.isMobilePhone(this.carInfo.ownerTel)
    },
    //省份证号验证
    cardBlue(){
      utils.isCardNo(this.carInfo.ownerIdCard)
    },
  //获取车辆下拉框信息
    getSelectValue(){
      let _this = this;
      this.postAxios("/CarInfo/GetCar")
        .then(res => {
          console.log(res)
          _this.brandOptions = res.brandOptions
          _this.modelOptions = res.modelOptions
          _this.colorOptions = res.colorOptions
          _this.departmentOptions = res.deptOptions
          _this.carType1Options = res.carType1Options
          _this.carType2Options = res.carType2Options
          _this.carRightOptions = res.carRightOptions
        })
        .catch(err => {
          console.log(err);
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
      this.$destroy()
      history.go(-1);
    },
    confirms(){
      console.log(this.carInfo)
      let info = this.carInfo
      if(info.carType == 1){
        if(info.carType == '' || info.LicensePlate == '' || info.brand == '' || info.model == '' || info.color == '' || info.driveLicense == '' || info.motorCode == '' || info.frameCode == '' || info.load == ''|| info.loadNumber == ''|| info.ofDept == ''|| info.carRight == ''){
          this.$message.warning("必填项不能为空")
        }else{
          let _this = this;
          this.postAxios("/CarInfo/SaveCarInfo",_this.carInfo)
            .then(res => {
              console.log(res)
              _this.$destroy()
              history.go(-1);
            })
            .catch(err => {
              console.log(err);
          });
        }
      }else{
        if(info.carType == '' || info.LicensePlate == '' || info.brand == '' || info.model == '' || info.color == '' || info.driveLicense == '' || info.motorCode == '' || info.frameCode == '' || info.load == ''|| info.loadNumber == '' || info.owner == '' || info.ownerTel == '' || info.relater == ''|| info.relaterDept == ''){
          this.$message.warning("必填项不能为空")
        }else{
          let _this = this;
          this.postAxios("/CarInfo/SaveCarInfo",_this.carInfo)
            .then(res => {
              console.log(res)
              _this.$destroy()
              history.go(-1);
            })
            .catch(err => {
              console.log(err);
          });
        }
      }


      
    }
  }
};
</script>
<style scoped>
.starred{
  color: red;
  width: 10px;
}
.input-width {
  /* width: 100px; */
  width: 150px;
  margin: 0 10px;
  margin-bottom: 5px;
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
  padding: 24px 20px;
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
  padding: 7px 0 0 80px;
}
.color {
  display: inline-block;
  width: 91px;
}
.datas {
  display: inline-block;
  width: 93px;
}
.carstwo {
  display: inline-block;
  width: 100px;
}
.used {
  display: inline-block;
  width: 40px;
  height: 20px;
  text-align: center;
  border-radius: 2px;
  color: red;
}
.chejia{
  display: inline-block;
  width: 85px;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 120px;
    display: block;
  }
  .upload{
    margin-left: 82px;
  }
  .twoq{
    margin-left: 0;
  }
  .ddd{
    display: inline-block;
    width: 100px;
  }
  .dddd{
    display: inline-block;
    width: 107px;
  }
  .cards{
    width: 200px;
  }
</style>
