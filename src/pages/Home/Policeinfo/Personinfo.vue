<template>
  <div>
    <van-tabs
      v-model="selectName"
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
        <van-tabs v-model="myText" color="#3270e1" sticky>
          <van-tab class="list" title="基本">
            <li class="item-list">
              姓名
              <span>{{lists.name}}</span>
            </li>
            <li class="item-list">
              政治面貌
              <span>
                <!-- {{lists.politicsStatusKey}} -->
                {{dada}}
              </span>
            </li>
            <li class="item-list">
              身份证号码
              <span>{{lists.idNumber}}</span>
            </li>
            <li class="item-list">
              联系方式
              <span>{{lists.contactWay}}</span>
            </li>
            <li class="item-list">
              学历
              <span>{{lists.educationBackground}}</span>
            </li>
            <li class="item-list">
              银行卡号
              <span>{{lists.creditCardNumber}}</span>
            </li>
            <li class="item-list">
              通讯地址
              <span>{{lists.contactAddress}}</span>
            </li>
            <li class="item-list">
              户籍地址
              <span>{{lists.permanentResidenceAddress | ellipsis }}</span>
            </li>
            <li class="item-list">
              籍贯
              <span>{{lists.nativePlaceName }}</span>
            </li>
            <li class="item-list">
              户口所在地
              <span>{{lists.registeredPermanentResidenceName}}</span>
            </li>
            <li class="item-list">
              民族
              <span>{{lists.nation}}</span>
            </li>
            <li class="item-list">
              学位
              <span>{{lists.degree}}</span>
            </li>
            <li class="item-list">
              专业
              <span>{{lists.major}}</span>
            </li>
            <li class="item-list">
              婚姻情况
              <span>{{lists.maritalStatus}}</span>
            </li>
            <li class="item-list">
              生育情况
              <span>{{lists.fertilityStatus}}</span>
            </li>
            <li class="item-list">
              所属党支部
              <span>{{lists.partyBranch}}</span>
            </li>
            <li class="item-list">
              入党时间
              <span>{{lists.partyDate | ellipsis1}}</span>
            </li>
            <li class="item-list">
              紧急联系人
              <span>{{lists.emergencyContactPerson}}</span>
            </li>
            <li class="item-list">
              紧急联系方式
              <span>{{lists.emergencyContact}}</span>
            </li>
          </van-tab>
          <van-tab title="工作" class="list">
            <li class="item-list">
              工作单位
              <span>{{office.officeName}}</span>
            </li>
            <li class="item-list">
              工作状态
              <span>{{lists.statePersonnel}}</span>
            </li>
            <li class="item-list">
              人员性质
              <span>{{lists.typesOfIdentity}}</span>
            </li>
            <li class="item-list">
              工作类别
              <span>{{lists.personnelCategory}}</span>
            </li>
            <li class="item-list">
              工作岗位
              <span>{{lists.operatingPost}}</span>
            </li>
            <li class="item-list">
              管理民警
              <span>{{lists.managementOfCivilianPolice}}</span>
            </li>
            <li class="item-list">
              层级
              <span>{{lists.jobLevel}}</span>
            </li>
            <li class="item-list">
              人员状况
              <span>{{lists.personnelStatus}}</span>
            </li>
            <li class="item-list">
              职位
              <span>{{lists.position}}</span>
            </li>
            <li class="item-list">
              身份编号
              <span>{{lists.managementOfCivilianPolice}}</span>
            </li>
            <li class="item-list">
              初始警龄
              <span>{{lists.initialYearsOfService}}</span>
            </li>
          </van-tab>
          <van-tab title="聘用信息" class="list">
            <li class="item-list">
              社保情况
              <span>{{lists.socialSecuritySituation}}</span>
            </li>
            <li class="item-list">
              公积金情况
              <span>{{lists.houseSocialSecuritySituation}}</span>
            </li>
            <li class="item-list">
              入职时间
              <span>{{lists.joinAuxiliaryPoliceDate | ellipsis1}}</span>
            </li>
            <li class="item-list">
              用工签订合同方
              <span>{{lists.thePartySigningTheContract}}</span>
            </li>
            <li class="item-list">
              签订合同时间
              <span>{{lists.timeOfContractSigning | ellipsis1}}</span>
            </li>
            <li class="item-list">
              合同到期时间
              <span>{{lists.expiryDate | ellipsis1}}</span>
            </li>
            <li class="item-list">
              社保开始时间
              <span>{{lists.insuredTime | formatDate}}</span>
            </li>
            <li class="item-list">
              公积金开始时间
              <span>{{lists.houseSocialSecuritySituationDate | ellipsis1}}</span>
            </li>
            <li class="item-list">
              离职时间
              <span>{{lists.resignationTime | ellipsis1}}</span>
            </li>
            <li class="item-list">
              离职原因
              <span>{{lists.resignationReason}}</span>
            </li>
            <li class="item-list">
              最后体检时间
              <span>{{lists.lastMedicalExaminationTime | ellipsis1}}</span>
            </li>
            <li class="item-list">
              离职类型
              <span>{{lists.resignationType}}</span>
            </li>
          </van-tab>
          <van-tab title="被装信息" class="list">
            <li class="item-list">
              身高
              <span>{{lists.height}}</span>
            </li>
            <li class="item-list">
              鞋码
              <span>{{lists.shoeSize}}</span>
            </li>
            <li class="item-list">
              头围
              <span>{{lists.headCircumference}}</span>
            </li>
            <li class="item-list">
              肩宽
              <span>{{lists.shoulderWidth}}</span>
            </li>
            <li class="item-list">
              臂长
              <span>{{lists.brachium}}</span>
            </li>
            <li class="item-list">
              胸围
              <span>{{lists.chestCircumference}}</span>
            </li>
            <li class="item-list">
              腰围
              <span>{{lists.waistline}}</span>
            </li>
            <li class="item-list">
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
          <van-collapse v-model="recorderName">
            <van-collapse-item
              :title="record.takeOffice"
              :name="record.id"
              v-for="record in userRecord"
              class="list-record"
              :key="record.id"
            >
              <ul>
                <li class="item-record">
                  开始时间
                  <span>{{record.startDate | ellipsis1}}</span>
                </li>
                <li class="item-record">
                  结束时间
                  <span>{{record.endDate | ellipsis1}}</span>
                </li>
                <li class="item-record">
                  在何地任何职
                  <span>{{record.takeOffice}}</span>
                </li>
                <li class="item-record">
                  证明人
                  <span>{{record.certifier}}</span>
                </li>

                <li class="item-record">
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
        <van-collapse v-model="recorderName">
          <van-collapse-item
            :title="equipment.equipmentNumber"
            size="large"
            :name="equipment.equipmentNumber"
            v-for="equipment in  equipments"
            class="list-record"
            :key="equipment.id"
          >
            <ul>
              <li class="item-record">
                所属部门
                <span>{{equipment.office.officeName}}</span>
              </li>
              <li class="item-record">
                装备种类
                <span>{{equipment.equipmentKindValue}}</span>
              </li>
              <li class="item-record">
                装备编号
                <span>{{equipment.equipmentNumber}}</span>
              </li>
              <li class="item-record" style="border:none">
                装备状态
                <span>{{equipment.equipmentStateKey}}</span>
              </li>
            </ul>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <!-- 训练 -->
      <van-tab title="训练" class="recoder">
        <van-collapse v-model="recorderName">
          <van-collapse-item
            :title="train.project"
            :name="train.id"
            size="large"
            v-for="train in userTrain"
            class="list-record"
            :key="train.id"
          >
            <ul>
              <!-- <li class="item-record tebie" style="font-weight:bold">装备详情</li> -->
              <li class="item-record">
                项目
                <span>{{train.project}}</span>
              </li>
              <li class="item-record">
                开始时间
                <span>{{train.startTime}}</span>
              </li>
              <li class="item-record">
                时间长度
                <span>{{train.timeSpan}}</span>
              </li>
              <li class="item-record">
                地点
                <span>{{train.position}}</span>
              </li>
              <li class="item-record">
                组织单位
                <span>{{train.organizationalUnit}}</span>
              </li>
              <li class="item-record">
                图片附件
                <span>{{train.picture}}</span>
              </li>
              <li class="item-record">
                更新时间
                <span>{{train.updateDate | ellipsis1}}</span>
              </li>
              <li class="item-record">
                备注信息
                <span>{{train.remarks}}</span>
              </li>
            </ul>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <!-- 家庭 -->
      <van-tab title="家庭" class="recoder">
        <van-collapse v-model="recorderName">
          <van-collapse-item
            :title="info.relationship"
            :name="info.id"
            size="large"
            v-for="info in familyInfo"
            class="list-record"
            :key="info.id"
          >
            <ul class="family-title">
              <!-- <li class="item-record tebie" style="font-weight:bold">装备详情</li> -->
              <li class="item-record">
                姓名
                <span>{{info.name}}</span>
              </li>
              <li class="item-record">
                关系
                <span>{{info.relationship}}</span>
              </li>
              <li class="item-record">
                出生日期
                <span>{{info.dateOfBirth | ellipsis1}}</span>
              </li>
              <li class="item-record">
                政治面貌
                <span>{{info.politicsStatus}}</span>
              </li>
              <li class="item-record">
                工作单位
                <span>{{info.jobEngineering}}</span>
              </li>
              <li class="item-record">
                职务
                <span>{{info.duty}}</span>
              </li>
              <li class="item-record">
                联系方式
                <span>{{info.contactWay}}</span>
              </li>
              <li class="item-record">
                更新时间
                <span>{{info.updateDate | ellipsis1}}</span>
              </li>
              <li class="item-record">
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
import { PERSON_GET_DATA } from "@/api/api";
export default {
  name: "HelloWorld",
  data() {
    return {
      id: this.$route.params.id,
      selectName: "",
      myText: "",
      info: {},
      familyInfo: "", //家庭信息
      lists: {},
      userRecord: "", //用户履历
      userTrain: "", //用户训练信息
      params: {},
      value: "",
      code: {},
      dada: "",
      equiptype: "",
      office: {},
      // office1: {},
      equipments: {},
      personid: "",
      officename: "",
      recorderName: ["1"],
      //equipments1: "",
      equiptype: ""
    };
  },
  methods: {
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
          this.$toast("valueobj.get fail: " + JSON.stringify(err));
        });
    },
    getDetailinfo() {
      const params = { id: this.id };
      PERSON_GET_DATA(
        "/js/a/ams/personnelfile/personnelFile/getAuxiliaryPolice",
        params
      ).then(res => {
        if (res.data.code == "0000") {
          //console.log(res.data)
          let doc = res.data.data;
          this.personid = doc.id;
          this.lists = doc;
          this.office = this.lists.office;
          this.familyInfo = doc.familyMembers;
          this.userRecord = doc.personnelRecords;
          this.userTrain = doc.trainingRecords;
          this.equipments = doc.equipmentList;
          let arr = [];
          this.equipments.forEach(element => {
            arr.push(element.office);
          });
          //console.log(arr)
          let max = arr[0];
          for (let i = 0; i < arr.length; i++) {
            if (max < arr[i]) {
              max = arr[i];
            }
          }
          this.dada = this.code.filter(item => {
            if (this.lists.politicsStatusKey == item.dictValue) {
              return item;
            }
          });
          this.dada = this.dada[0].treeNames;
        } else {
          this.$toast("暂无信息");
        }
      });
    }
  },
  created() {
    //this.getNewlist()
    //this.getinfo();
    this.getValueobj();
    //this.getEquepment();
    this.getDetailinfo();
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
    //reversedMessage: function() {
    //return this.office.officeName;
    /*       const arr = this.code.filter(item => {
        if(this.lists.politicsStatusKey == item.dictValue) {
          return item
        }
      }) */
    // },
    getinfo: function() {
      this.equipments.forEach(element => {});
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
  .item-list {
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
  .list-record {
    margin: 10px;
    background-color: white;
    border: 1px solid #ebebeb;
  }
  .tebie {
    font-weight: bold;
    border: 1px solid #f5f5f5;
    color: black;
  }
  .item-record {
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