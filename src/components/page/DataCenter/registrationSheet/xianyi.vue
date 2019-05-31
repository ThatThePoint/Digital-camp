<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="姓名">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="出生日期">
          <el-date-picker
            class="input-width"
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="籍贯">
          <el-input v-model="form.origin"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="民族">
          <el-input v-model="form.national"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="出生地">
          <el-input v-model="form.bornArea"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="血型">
          <el-select v-model="form.blood" placeholder="请选择血型">
            <el-option
              v-for="item in bloodOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="工作单位">
          <el-input v-model="form.workStation"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="联系电话">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item label="家庭住址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="身份证">
          <el-input v-model="form.idcard"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="婚姻状况">
          <el-select v-model="form.marry" placeholder="请选择">
            <el-option
              v-for="item in marryOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="对应军人姓名">
          <el-input v-model="form.sodierName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="与军人关系">
          <el-select v-model="form.sodierRelation" placeholder="请选择">
            <el-option
              v-for="item in sodierRelationOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="军人部别">
          <el-input v-model="form.deptName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="军人证件号码">
          <el-input v-model="form.sodierCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="是否遗嘱">
          <el-radio-group v-model="form.yizhu">
            <el-radio label="是" value="1"></el-radio>
            <el-radio label="否" value="2"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="家属身份类别">
          <el-select v-model="form.familyStatus" placeholder="请选择">
            <el-option
              v-for="item in familyStatusOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item label="军人身份证号码">
          <el-input v-model="form.sodierIdCard"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="经济状况">
          <el-select v-model="form.EcoSituation" placeholder="请选择">
            <el-option
              v-for="item in EcoSituationOptions"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        //以下才是对的数据
        tid: "",
        name: "",
        gender: "",
        birthday: "",
        origin: "",
        national: "",
        bornArea: "",
        blood: "",
        workStation: "",
        tel: "",
        address: "",
        idcard: "",
        marry: "",
        sodierName: "",
        sodierRelation: "",
        deptName: "",
        sodierCode: "",
        yizhu: "",
        familyStatus: "",
        sodierIdCard: "",
        EcoSituation: ""
      },
      politicsTypeOptions: [
        {
          key: 1,
          value: "党员"
        },
        {
          key: 2,
          value: "预备党员"
        },
        {
          key: 3,
          value: "团员"
        },
        {
          key: 4,
          value: "群众"
        },
        {
          key: 5,
          value: "其他"
        }
      ],
      marryOptions: [
        {
          key: 1,
          value: "未婚"
        },
        {
          key: 2,
          value: "已婚"
        },
        {
          key: 3,
          value: "丧偶"
        },
        {
          key: 4,
          value: "离婚"
        }
      ],
      armyTypeOptions: [
        {
          key: 1,
          value: "陆军"
        },
        {
          key: 2,
          value: "海军"
        },
        {
          key: 3,
          value: "火箭军"
        },
        {
          key: 4,
          value: "战略支援部队"
        }
      ],
      localWeatherOptions: [
        {
          key: 1,
          value: "高寒区"
        },
        {
          key: 2,
          value: "寒区"
        },
        {
          key: 3,
          value: "温区"
        },
        {
          key: 4,
          value: "亚热区"
        },
        {
          key: 5,
          value: "热区"
        }
      ],
      staffTypeOptions: [
        {
          key: 1,
          value: "在编职员"
        },
        {
          key: 2,
          value: "在编工人"
        },
        {
          key: 3,
          value: "非编职员"
        },
        {
          key: 4,
          value: "非编工人"
        },
        {
          key: 5,
          value: "文职人员"
        },
        {
          key: 6,
          value: "非现役公勤"
        },
        {
          key: 7,
          value: "离退休职工"
        }
      ],
      armyRankOptions: [
        {
          key: 1,
          value: "上将"
        },
        {
          key: 2,
          value: "中将"
        },
        {
          key: 3,
          value: "少将"
        },
        {
          key: 4,
          value: "大校"
        },
        {
          key: 5,
          value: "中校"
        },
        {
          key: 6,
          value: "少校"
        },
        {
          key: 7,
          value: "上尉"
        },
        {
          key: 8,
          value: "中尉"
        },
        {
          key: 9,
          value: "少尉"
        },
        {
          key: 10,
          value: "文职特技"
        },
        {
          key: 11,
          value: "文职1级"
        },
        {
          key: 12,
          value: "文职2级"
        },
        {
          key: 13,
          value: "文职3级"
        },
        {
          key: 15,
          value: "文职4级"
        },
        {
          key: 16,
          value: "文职5级"
        },
        {
          key: 17,
          value: "文职6级"
        },
        {
          key: 18,
          value: "文职7级"
        },
        {
          key: 19,
          value: "文职8级"
        },
        {
          key: 20,
          value: "文职9级"
        },
        {
          key: 21,
          value: "学员衔"
        },
        {
          key: 22,
          value: "未授衔"
        }
      ],
      educatLevelOptions: [
        {
          key: 1,
          value: "研究生"
        },
        {
          key: 2,
          value: "大学本科"
        },
        {
          key: 3,
          value: "大学专科"
        },
        {
          key: 4,
          value: "专科学校"
        },
        {
          key: 5,
          value: "中等专业学校"
        },
        {
          key: 6,
          value: "校工学校"
        },
        {
          key: 7,
          value: "高中"
        },
        {
          key: 8,
          value: "初中"
        },
        {
          key: 9,
          value: "小学"
        },
        {
          key: 10,
          value: "文盲"
        },
        {
          key: 11,
          value: "半文盲"
        }
      ],
      graduateTypeOptions: [
        {
          key: 1,
          value: "博士"
        },
        {
          key: 2,
          value: "硕士"
        },
        {
          key: 3,
          value: "学士"
        },
        {
          key: 4,
          value: "其他"
        }
      ],
      bloodOptions: [
        {
          key: "1",
          value: "A"
        },
        {
          key: "2",
          value: "B"
        },
        {
          key: "3",
          value: "AB"
        },
        {
          key: "4",
          value: "O"
        },
        {
          key: "5",
          value: "其他"
        }
      ],
      postionLevelOptions: [
        {
          key: "1",
          value: "部级副职"
        },
        {
          key: "2",
          value: "局级正职"
        },
        {
          key: "3",
          value: "局级副职"
        },
        {
          key: "4",
          value: "处级正职"
        },
        {
          key: "5",
          value: "处级副职"
        },
        {
          key: "6",
          value: "科级正职"
        },
        {
          key: "7",
          value: "科级副职"
        },
        {
          key: "8",
          value: "办事员一级"
        },
        {
          key: "9",
          value: "办事员二级"
        },
        {
          key: "10",
          value: "办事员三级"
        },
        {
          key: "11",
          value: "办事员四级"
        },
        {
          key: "12",
          value: "办事员五级"
        },
        {
          key: "13",
          value: "办事员六级"
        },
        {
          key: "14",
          value: "办事员七级"
        },
        {
          key: "15",
          value: "办事员八级"
        },
        {
          key: "16",
          value: "办事员九级"
        },
        {
          key: "17",
          value: "办事员十级"
        },
        {
          key: "18",
          value: "办事员十一级"
        },
        {
          key: "19",
          value: "办事员十二级"
        },
        {
          key: "20",
          value: "办事员十三级"
        },
        {
          key: "21",
          value: "文职人员级别转改特级"
        },
        {
          key: "22",
          value: "转改1级"
        },
        {
          key: "23",
          value: "转改2级"
        },
        {
          key: "24",
          value: "转改3级"
        },
        {
          key: "25",
          value: "转改4级"
        },
        {
          key: "26",
          value: "转改5级"
        },
        {
          key: "27",
          value: "转改6级"
        },
        {
          key: "28",
          value: "转改7级"
        },
        {
          key: "29",
          value: "转改8级"
        }
      ],
      professionTechDutyOptions: [
        {
          key: "1",
          value: "高级工程师"
        },
        {
          key: "2",
          value: "会计师"
        },
        {
          key: "3",
          value: "教授"
        },
        {
          key: "4",
          value: "研究员"
        },
        {
          key: "5",
          value: "医师"
        }
      ],
      employeeStatusOptions: [
        {
          key: "1",
          value: "行政管理职员"
        },
        {
          key: "2",
          value: "专业技术职员"
        },
        {
          key: "3",
          value: "全民固定工人"
        },
        {
          key: "4",
          value: "合同制工人"
        },
        {
          key: "5",
          value: "大集体工人"
        }
      ],
      dutySituationOptions: [
        {
          key: "1",
          value: "在岗"
        },
        {
          key: "2",
          value: "转岗非现役"
        },
        {
          key: "3",
          value: "抽组"
        },
        {
          key: "4",
          value: "托管"
        },
        {
          key: "5",
          value: "内退"
        },
        {
          key: "6",
          value: "待岗"
        },
        {
          key: "7",
          value: "长期病休假"
        },
        {
          key: "8",
          value: "立案"
        },
        {
          key: "9",
          value: "停止审查"
        },
        {
          key: "10",
          value: "离休"
        },
        {
          key: "11",
          value: "退休"
        },
        {
          key: "12",
          value: "退职"
        },
        {
          key: "13",
          value: "交社保"
        }
      ],
      chiefPositionOptions: [
        {
          key: "1",
          value: "管理一级"
        },
        {
          key: "2",
          value: "管理二级"
        },
        {
          key: "3",
          value: "管理三级"
        },
        {
          key: "4",
          value: "管理四级"
        },
        {
          key: "5",
          value: "管理五级"
        },
        {
          key: "6",
          value: "管理六级"
        },
        {
          key: "7",
          value: "管理七级"
        },
        {
          key: "8",
          value: "管理八级"
        },
        {
          key: "9",
          value: "管理九级"
        },
        {
          key: "10",
          value: "管理十级"
        }
      ],
      professionTechLevelOptions: [
        {
          key: "1",
          value: "专业技术二级"
        },
        {
          key: "2",
          value: "专业技术三级"
        },
        {
          key: "3",
          value: "专业技术四级"
        },
        {
          key: "4",
          value: "专业技术五级"
        },
        {
          key: "5",
          value: "专业技术六级"
        },
        {
          key: "6",
          value: "专业技术七级"
        },
        {
          key: "7",
          value: "专业技术八级"
        },
        {
          key: "8",
          value: "专业技术九级"
        },
        {
          key: "9",
          value: "专业技术十级"
        },
        {
          key: "10",
          value: "专业技术十一级"
        },
        {
          key: "11",
          value: "专业技术十二级"
        },
        {
          key: "12",
          value: "专业技术十三级"
        }
      ],
      sodierRelationOptions: [
        {
          key: "1",
          value: "配偶"
        },
        {
          key: "2",
          value: "子女"
        },
        {
          key: "3",
          value: "其他家属"
        }
      ],
      familyStatusOptions: [
        {
          key: "1",
          value: "已故离休干部配偶"
        },
        {
          key: "2",
          value: "随军家属"
        },
        {
          key: "3",
          value: "符合随军未随队家属"
        },
         {
          key: "4",
          value: "随队家属"
        },
        {
          key: "5",
          value: "遗属"
        },
        {
          key: "6",
          value: "代管家属"
        },
         {
          key: "7",
          value: "代管家属（优惠）"
        },
        {
          key: "8",
          value: "代管家属（免费）"
        },
        {
          key: "9",
          value: "牺牲病故军人配偶子女"
        },
         {
          key: "10",
          value: "驻藏家属（3000米以上）"
        },
        {
          key: "11",
          value: "建国前参加工作"
        },
        {
          key: "12",
          value: "55年前后复员女同志"
        }
      ],
      EcoSituationOptions: [
        {
          key: "1",
          value: "无收入"
        },
        {
          key: "2",
          value: "空招空挂"
        },
        {
          key: "3",
          value: "享受生活困难补贴"
        },
         {
          key: "4",
          value: "300元以下"
        },
        {
          key: "5",
          value: "300-500元"
        },
        {
          key: "6",
          value: "500元以上"
        },
      ],
      
    };
  },
  methods: {
    onSubmit() {
      console.log(this.$utils)
    },
    handleClick() {}
  }
};
</script>
