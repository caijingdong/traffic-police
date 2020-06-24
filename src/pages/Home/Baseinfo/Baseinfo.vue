<template>
  <div>
    <van-tabs
      v-model="allinfo"
      offset-top="0px"
      background="#3270e1"
      color="white"
      title-active-color="white"
      title-inactive-color="#b1c8f2"
      ref="resize"
      title-style="78px"
    >
      <!-- 基本信息 -->
      <van-tab title="基本">
        <van-tabs v-model="base" color="#3270e1" sticky>
          <van-tab class="list" title="基本">
            <li class="listxx">
              姓名
              <span>{{lists.name}}</span>
            </li>
            <li class="listxx">
              政治面貌
              <span>
                <!-- {{lists.politicsStatusKey}} -->
                {{dada}}
              </span>
            </li>
            <li class="listxx">
              身份证号码
              <span>{{lists.idNumber}}</span>
            </li>
            <li class="listxx">
              联系方式
              <span>{{lists.contactWay}}</span>
            </li>
            <li class="listxx">
              学历
              <span>{{lists.educationBackground}}</span>
            </li>
            <li class="listxx">
              银行卡号
              <span>{{lists.creditCardNumber}}</span>
            </li>
            <li class="listxx">
              通讯地址
              <span>{{lists.contactAddress}}</span>
            </li>
            <li class="listxx">
              户籍地址
              <span>{{lists.permanentResidenceAddress | ellipsis }}</span>
            </li>
            <li class="listxx">
              籍贯
              <span>{{lists.nativePlaceName }}</span>
            </li>
            <li class="listxx">
              户口所在地
              <span>{{lists.registeredPermanentResidenceName}}</span>
            </li>
            <li class="listxx">
              民族
              <span>{{lists.nation}}</span>
            </li>
            <li class="listxx">
              学位
              <span>{{lists.degree}}</span>
            </li>
            <li class="listxx">
              专业
              <span>{{lists.major}}</span>
            </li>
            <li class="listxx">
              婚姻情况
              <span>{{lists.maritalStatus}}</span>
            </li>
            <li class="listxx">
              生育情况
              <span>{{lists.fertilityStatus}}</span>
            </li>
            <li class="listxx">
              所属党支部
              <span>{{lists.partyBranch}}</span>
            </li>
            <li class="listxx">
              入党时间
              <span>{{lists.partyDate | ellipsis1}}</span>
            </li>
            <li class="listxx">
              紧急联系人
              <span>{{lists.emergencyContactPerson}}</span>
            </li>
            <li class="listxx">
              紧急联系方式
              <span>{{lists.emergencyContact}}</span>
            </li>
          </van-tab>
          <van-tab title="工作" class="list">
            <li class="listxx">
              工作单位
              <span>{{office.officeName}}</span>
            </li>
            <li class="listxx">
              工作状态
              <span>{{lists.statePersonnel}}</span>
            </li>
            <li class="listxx">
              人员性质
              <span>{{lists.typesOfIdentity}}</span>
            </li>
            <li class="listxx">
              工作类别
              <span>{{lists.personnelCategory}}</span>
            </li>
            <li class="listxx">
              工作岗位
              <span>{{lists.operatingPost}}</span>
            </li>
            <li class="listxx">
              管理民警
              <span>{{lists.managementOfCivilianPolice}}</span>
            </li>
            <li class="listxx">
              层级
              <span>{{lists.jobLevel}}</span>
            </li>
            <li class="listxx">
              人员状况
              <span>{{lists.personnelStatus}}</span>
            </li>
            <li class="listxx">
              职位
              <span>{{lists.position}}</span>
            </li>
            <li class="listxx">
              身份编号
              <span>{{lists.managementOfCivilianPolice}}</span>
            </li>
            <li class="listxx">
              初始警龄
              <span>{{lists.initialYearsOfService}}</span>
            </li>
          </van-tab>
          <van-tab title="聘用信息" class="list">
            <li class="listxx">
              社保情况
              <span>{{lists.socialSecuritySituation}}</span>
            </li>
            <li class="listxx">
              公积金情况
              <span>{{lists.houseSocialSecuritySituation}}</span>
            </li>
            <li class="listxx">
              入职时间
              <span>{{lists.joinAuxiliaryPoliceDate | ellipsis1}}</span>
            </li>
            <li class="listxx">
              用工签订合同方
              <span>{{lists.thePartySigningTheContract}}</span>
            </li>
            <li class="listxx">
              签订合同时间
              <span>{{lists.timeOfContractSigning | ellipsis1}}</span>
            </li>
            <li class="listxx">
              合同到期时间
              <span>{{lists.expiryDate | ellipsis1}}</span>
            </li>
            <li class="listxx">
              社保开始时间
              <span>{{lists.insuredTime | formatDate}}</span>
            </li>
            <li class="listxx">
              公积金开始时间
              <span>{{lists.houseSocialSecuritySituationDate | ellipsis1}}</span>
            </li>
            <li class="listxx">
              离职时间
              <span>{{lists.resignationTime | ellipsis1}}</span>
            </li>
            <li class="listxx">
              离职原因
              <span>{{lists.resignationReason}}</span>
            </li>
            <li class="listxx">
              最后体检时间
              <span>{{lists.lastMedicalExaminationTime | ellipsis1}}</span>
            </li>
            <li class="listxx">
              离职类型
              <span>{{lists.resignationType}}</span>
            </li>
          </van-tab>
          <van-tab title="被装信息" class="list">
            <li class="listxx">
              身高
              <span>{{lists.height}}</span>
            </li>
            <li class="listxx">
              鞋码
              <span>{{lists.shoeSize}}</span>
            </li>
            <li class="listxx">
              头围
              <span>{{lists.headCircumference}}</span>
            </li>
            <li class="listxx">
              肩宽
              <span>{{lists.shoulderWidth}}</span>
            </li>
            <li class="listxx">
              臂长
              <span>{{lists.brachium}}</span>
            </li>
            <li class="listxx">
              胸围
              <span>{{lists.chestCircumference}}</span>
            </li>
            <li class="listxx">
              腰围
              <span>{{lists.waistline}}</span>
            </li>
            <li class="listxx">
              臀围
              <span>{{lists.hipline}}</span>
            </li>
          </van-tab>
        </van-tabs>
      </van-tab>
      <!-- 履历 -->
      <van-tab title="履历">
        <!-- <div class="border" ></div> -->
        <div class="recoder">
          <van-collapse v-model="activeNames">
            <van-collapse-item
              :title="record.takeOffice"
              :name="record.id"
              v-for="record in record1"
              class="list-record"
              :key="record.id"
            >
              <ul>
                <!-- <li class="listxx1 tebie" style="font-weight:bold">装备详情</li> -->
                <li class="listxx1">
                  开始时间
                  <span>{{record.startDate | ellipsis1}}</span>
                </li>
                <li class="listxx1">
                  结束时间
                  <span>{{record.endDate | ellipsis1}}</span>
                </li>
                <li class="listxx1">
                  在何地任何职
                  <span>{{record.takeOffice}}</span>
                </li>
                <li class="listxx1">
                  证明人
                  <span>{{record.certifier}}</span>
                </li>
                
                <li class="listxx1">
                  更新时间
                  <span>{{record.updateDate | ellipsis1}}</span>
                </li>
              </ul>
            </van-collapse-item>
          </van-collapse>
        </div>
      </van-tab>
      <!-- 装备 -->
      <van-tab title="装备" class="recoder">
        <van-collapse v-model="activeNames">
          <van-collapse-item
            :title="equipment.equipmentNumber"
            size="large"
            :name="equipment.equipmentNumber"
            v-for="equipment in  equipments"
            class="list-record"
            :key="equipment.id"
          >
            <ul>
              <li class="listxx1">
                所属部门
                <span>{{officename}}</span>
              </li>
              <li class="listxx1">
                装备种类
                <span>{{equipment.equipmentKindValue}}</span>
              </li>
              <li class="listxx1">
                装备编号
                <span>{{equipment.equipmentNumber}}</span>
              </li>
              <li class="listxx1" style="border:none">
                装备状态
                <span>{{equipment.equipmentStateKey}}</span>
              </li>
            </ul>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <!-- 训练 -->
      <van-tab title="训练" class="recoder" >
        <van-collapse v-model="activeNames">
          <van-collapse-item
            :title="train.project"
            :name="train.id"
            size="large"
            v-for="train in train1"
            class="list-record"
            :key="train.id"
            border="false"
          >
            <ul>
              <!-- <li class="listxx1 tebie" style="font-weight:bold">装备详情</li> -->
              <li class="listxx1">
                项目
                <span>{{train.project}}</span>
              </li>
              <li class="listxx1">
                开始时间
                <span>{{train.startTime}}</span>
              </li>
              <li class="listxx1">
                时间长度
                <span>{{train.timeSpan}}</span>
              </li>
              <li class="listxx1">
                地点
                <span>{{train.position}}</span>
              </li>
              <li class="listxx1">
                组织单位
                <span>{{train.organizationalUnit}}</span>
              </li>
              <li class="listxx1">
                图片附件
                <span>{{train.picture}}</span>
              </li>
              <li class="listxx1">
                更新时间
                <span>{{train.updateDate | ellipsis1}}</span>
              </li>
              <li class="listxx1">
                备注信息
                <span>{{train.remarks}}</span>
              </li>
            </ul>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <!-- 家庭 -->
      <van-tab title="家庭" class="recoder hh" style="height:1500px;">
        <van-collapse v-model="activeNames">
          <van-collapse-item
            :title="info.relationship"
            :name="info.id"
            size="large"
            v-for="info in familyinfo"
            class="list-record"
            :key="info.id"
          >
            <ul class="family-title">
              <!-- <li class="listxx1 tebie" style="font-weight:bold">装备详情</li> -->
              <li class="listxx1">
                姓名
                <span>{{info.name}}</span>
              </li>
              <li class="listxx1">
                关系
                <span>{{info.relationship}}</span>
              </li>
              <li class="listxx1">
                出生日期
                <span>{{info.dateOfBirth | ellipsis1}}</span>
              </li>
              <li class="listxx1">
                政治面貌
                <span>{{info.politicsStatus}}</span>
              </li>
              <li class="listxx1">
                工作单位
                <span>{{info.jobEngineering}}</span>
              </li>
              <li class="listxx1">
                职务
                <span>{{info.duty}}</span>
              </li>
              <li class="listxx1">
                联系方式
                <span>{{info.contactWay}}</span>
              </li>
              <li class="listxx1">
                更新时间
                <span>{{info.updateDate | ellipsis1}}</span>
              </li>
              <li class="listxx1">
                备注信息
                <span></span>
              </li>
            </ul>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import qs from "qs";
import { formatDate } from "../js/format.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      allinfo: "",
      base: "",
      active2: "123",
      info: {},
      familyinfo: "",
      lists: {},
      record1: "",
      train1: "",
      params: {},
      value: "",
      code: {},
      dada: "",
      equiptype: "",
      office: {},
      office1: {},
      equipments: {},
      personid: "",
      officename: "",
      activeNames: ["1"],
      equipments1: "",
      equiptype: ""
    };
  },
  methods: {
    fine() {
      dd.ready(function() {
        dd.biz.util.scan({
          type: String,
          onSuccess: function() {},
          onFail: function() {}
        });
      });
    },
    getinfo() {
      this.axios({
        method: "get",
        url: "/js/a/ams/personnelfile/personnelFile/getCurrentUserPersonnelFile"
      })
        .then(res => {
          if (res.data.code == "0000") {
            let doc = res.data.data;
            this.personid = doc.id;
            this.lists = doc;
            this.office = this.lists.office;
            this.familyinfo = doc.familyMembers;
            console.log(this.familyinfo)
            this.record1 = doc.personnelRecords;
            this.train1 = doc.trainingRecords;
            this.dada = this.code.filter(item => {
              if (this.lists.politicsStatusKey == item.dictValue) {
                return item;
              }
            });
            this.dada = this.dada[0].treeNames;
          } else {
            this.$toast("user.get fail: " + JSON.stringify(res));
          }
        })
        .catch(e => {
          this.$toast("user.get fail: " + JSON.stringify(e));
        });
    },
    getEquepment() {
      this.axios({
        method: "get",
        url: "/js/a/ams/equipment/equipment/viewData"
      })
        .then(res => {
          this.equipments = res.data.list;
          this.office1 = this.equipments[0].office;
          this.officename = this.office1.officeName;
          
        })
        .catch(e => {
          this.$toast("user.get fail: " + JSON.stringify(res));
        });
    },
    getValueobj() {
      this.axios({
        method: "post",
        url: "/js/mobile/getDictList",
        data: qs.stringify(
          {
            dictTypes: [
              "asm_degree",
              "ams_equipment_kind",
              "ams_politics_status",
              "ams_equipment_kind",
              "ams_equipment_state"
            ]
          },
          { indices: false }
        ),
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          this.code = res.data.data[2];
          //this.code1 = res.data.data[3];
          //console.log(this.code1);
        })
        .catch(err => {
          this.$toast("user.get fail: " + JSON.stringify(err));
        });
    }
  },
  created() {
    //this.getNewlist()
    this.getinfo();
    this.getValueobj();
    this.getEquepment();
  },
  mounted() {},
  filters: {
    // 版本号显示12位，超过12位显示...
    ellipsis: function(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(12, 30) + "...";
      }
      return value;
    },
    ellipsis1: function(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 10);
      }
      return value;
    },
    formatDate(time) {
      //time = time * 1000;
      let date = new Date(time);
      //console.log(new Date(time));
      return formatDate(date, "yyyy-MM-dd ");
    }
  },

  computed: {
    reversedMessage: function() {
      // `this` 指向 vm 实例
      return this.office.officeName;
      /*       const arr = this.code.filter(item => {
        if(this.lists.politicsStatusKey == item.dictValue) {
          return item
        }
      }) */
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
body {
  background-color: #ccc;
}
ul,
li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.border {
  //color: blue;
  font-weight: bold;
  background-color: #f5f5f5;
  width: 750px;
  height: 8px;
}
.hh {
  height: 1400px;
}
.list {
  width: 15rem;
  margin: 0 auto;
  .listxx {
    font-size: 0.7rem;
    text-align: left;
    color: #595959;
    height: 2rem;
    line-height: 2rem;
    border-bottom: 1px solid #e5e5e5;
    span {
      float: right;
      text-align: right;
      line-height: 2rem;
      color: #ababab;
    }
  }
}
.recoder {
  background-color: white;
 // height: 800px;
  .family-title{

  }
  .list-record {
    margin: 10px;
    background-color: white;
    border:1px solid #ebebeb;
    

  }
  .tebie {
    font-weight: bold;
    border: 1px solid #f5f5f5;
    color: black;
  }
  .listxx1 {
    font-size: 0.7rem;
    text-align: left;
    color: #595959;
    height: 1.4rem;
    padding: 4px;
    line-height: 1.4rem;
    padding-left: 12px;
    padding-right: 12px;

    span {
      float: right;
      text-align: right;
      line-height: 1.6rem;
      color: #ababab;
    }
  }
}

/* .van-tabs--line /deep/ .van-tabs__wrap {
  //height: 2.2rem ;
  //line-height: 2.2rem ;
  //padding-top:0.8rem;
} */
/deep/ .van-tab {
  //line-height: 2.2rem ;
  font-size: 0.7rem;
}
/* /deep/ .van-hairline--top-bottom::after{
  border:none;
} */
</style>