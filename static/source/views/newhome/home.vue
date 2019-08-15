<style lang="less">
    @import "./home.less";

</style>
<template>
    <div>
        <div class="home-main  main-panel" style="margin-top:10px">
            <Row v-if="reTable1">
                <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '12px'}">
                <infor-card
                    id-name="user_created_count"
                    iconType="android-person-add"
                    color="#FFF"
                    :data ='reTable1.data[0]'
                    :countSize='fontSize'
                ></infor-card>
            </Col>

            </Row>
            <Row  v-if="reTable2">
                <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '12px'}">
                <infor-card
                    id-name="user_created_count"
                    iconType="android-person-add"
                    color="#FFF"
                    :data ='reTable2.data[0]'
                    :countSize='fontSize'
                ></infor-card>
            </Col>

            </Row>
            <Row  v-if="reTable3">
                <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '12px'}">
                <infor-card
                    id-name="user_created_count"
                    iconType="android-person-add"
                    color="#FFF"
                    :data ='reTable3.data[0]'
                    :countSize='fontSize'
                ></infor-card>
            </Col>

            </Row>
            <Row :gutter="20">

                <Col :span="lineSpan" :style="{marginBottom: '10px'}" v-if="linePic">
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="ios-shuffle-strong"></Icon>
                           {{linePic.data[0].text}}
                        </p>
                        <div class="data-source-row">
                            <service-requests :data="linePic.data[0]"></service-requests>
                        </div>
                    </Card>
                </Col>
                <Col :span="barSpan" :style="{marginBottom: '10px'}"   v-if="barPic">
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="android-map"></Icon>
                            {{barPic.data[0].text}}
                        </p>
                        <div class="data-source-row">
                            <visite-volume :data="barPic.data[0]"></visite-volume>
                        </div>
                    </Card>
                </Col>


            </Row>
            <Row class="margin-top-10" v-if="homeConfiguration === '1'">

                    <p  class="margin-top-10 text-title">
                        快捷应用
                    </p>
                    <div class="line-chart-con margin-top-10">
                        <Row :gutter="5" v-for = "(rowItem, index) in formatedData" :key="index">
                        <Col span="3"  class="app-index" v-for = "(item, innerIndex) in rowItem" style="width:173px;margin-right:13px;margin-bottom:15px" >
                            <Card style="background-color:#FFF" >
                                <div style="cursor:pointer" @click="showApp(item.moduleId,item.appName,item.id,item.appKey)">
                                    <Row class-name="made-child-con-middle app-name" type="flex" align="middle">
                                        <Col span="8">
                                            <svg class="icon-recent" aria-hidden="true" v-html = 'item.icon'>
                                                <!-- <use xlink:href="item.icon"></use> -->
                                                {{item.icon}}
                                            </svg>
                                        </Col>
                                        <Col span="16">
                                            <div>
                                                <Tooltip :content=item.appName placement="top">
                                                    <span class="app-name">{{item.appName}}</span>
                                                </Tooltip>

                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    </div>

            </Row>
            <Row class="margin-top-10" v-if="homeConfiguration === '2'">
                <appCollection></appCollection>
            </Row>
        </div>
    </div>
</template>

<script>
import cityData from './map-data/get-city-value.js';
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import CountTo from './components/CountTo.vue';
import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';
import toDoListItem from './components/toDoListItem.vue';
import HTTP from '../../api/app-apply.js';
import router from '../../router/router.js';
import Cookies from 'js-cookie';
import '@/views/home/components/orgTree/libs/default/orgTree.css'
import appCollection from './components/appCollection/index.vue'
import HTTP_COLLECT from '@/api/collect.js';

export default {
    name: 'home',
    components: {
        homeMap,
        dataSourcePie,
        visiteVolume,
        serviceRequests,
        userFlow,
        CountTo,
        inforCard,
        mapDataTable,
        toDoListItem,
        appCollection
    },
    data () {
        return {
             iconList:[
                '#icon-renshishenqing',
                '#icon-diannaoguzhang',
                '#icon-buqian',
                '#icon-fukuanshenqing',
                '#icon-jiaotongbaoxiao',
                '#icon-jiekuanshenqing',
                '#icon-xiujia',
                '#icon-ITshenqing',
                '#icon-jiaban',
                '#icon-nan',
                '#icon-youxiangmimagenggai',
                '#icon-nv'
            ],
            maxRowNum:2,
            columnNum: 6,
            lineSpan:12,
            barSpan:12,
            reTable1:null,
            reTable2:null,
            reTable3:null,
            linePic:null,
            barPic:null,
            fontSize:'20px',
            classList:[
                'box-recent',
                'box-recent',
                'box-recent',
                'box-recent',
                'box-recent',
                'box-recent',
                'box-recent',
                'box-recent',
                'box-recent',
                'box-recent',
                'box-recent',
                'box-recent',
            ],

            formatedData:[],
            cityData: cityData,
            currentTime:'',
            showAddNewTodo: false,
            newToDoItemValue: '',
            userName:Cookies.get('userName'),
            myCount:{
                toDoTaskCount:0,
                toVerifyTaskCount:0,
                fillTaskCount: 0
            },
            homeConfiguration: null //快捷应用和收藏显示 1-快捷应用 2-收藏
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
     mounted(){
        this.getHomeReport();
        this.getAppList();
        this.getCount();
        this.getCurrentTime();
        this.getHomeConfiguration();
    },
    methods: {
        async getHomeConfiguration() {
            try {
                const companyId = this.$store.state.user.companyId;
                const result = await HTTP_COLLECT.getHomeConfiguration({ companyId })
                if (+result.code === 0) {
                    this.homeConfiguration = result.homeConfiguration
                } else{
                    this.$Message.error(result.msg)
                }
            } catch (error) {
                this.$Message.error('getHomeConfiguration接口获取失败')
            }
        },
        getHomeReport(){
            var that =this
            HTTP.getDataByIconId().then((data)=>{
               if(data.code==0){
                    that.reTable1 = data['1'];
                    that.reTable2 = data['2'];
                    that.reTable3 = data['3'];
                    that.linePic = data['4'];
                    that.barPic = data['5'];
                    if(that.linePic&&that.barPic){
                        that.lineSpan=12;
                        that.barSpan=12;
                    }
                    else if(!that.linePic){
                        that.lineSpan=0;
                        that.barSpan=24
                    }
                    else if(!that.barSpan){
                        that.lineSpan=24;
                        that.barSpan=0
                    }
                    else{
                        that.lineSpan=0;
                        that.barSpan=0;
                    }
               }
            })
        },
        getCurrentTime(){
            var now = new Date(),hour = now.getHours()
            if(hour < 6){this.currentTime="凌晨好！"}
            else if (hour < 9){this.currentTime="早上好！"}
            else if (hour < 12){this.currentTime="上午好！"}
            else if (hour < 14){this.currentTime="中午好！"}
            else if (hour < 18){this.currentTime="下午好！"}
            else {this.currentTime="晚上好！"}

        },
        getCount(){
            HTTP.myUpcomingCount().then((data)=>{
                if(data.code==0){
                    this.myCount.toDoTaskCount=data.toDoTaskCount;
                    this.myCount.toVerifyTaskCount=data.toVerifyTaskCount;
                    this.myCount.fillTaskCount = data.fillTaskCount;
                }
                else{
                    this.$Message.error('error')
                }
            }).catch((err)=>{
                 this.$Message.error(err.msg)
            })
        },
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        },
        toTask(param = '1'){
             this.$router.push({
                name: 'my-work',
                query: {type: param}
            });
        },
        toApp (itemId, itemName) {
            // itemId='0f60c6ecf77a431490ac69fd0d24adf4';
            this.$router.push({
                name: 'start-application',
                params: {moduleId: itemId, moduleName: itemName}
            });
        },
        getAppList() {
            this.getLoading=true;
                HTTP.getAllApp()
                    .then(res => {
                    this.appData=res.page.result;
                    this.formatedData = this.resolveData(res.page.result);
                    console.log(this.formatedData);
            })
        .catch(err => {
            console.log(err);
        }).finally(()=>{
                this.getLoading=false;
        })
        },
        showApp(itemId,itemName,id,appKey){
            if(itemId){
                 this.$router.push({
                    name: 'start-application',
                    params: {moduleId: itemId, appName: itemName,appId:id,appKey}
                });
            }
           
        },
        resolveData(dataList){
            let n = 0;
            let newList = [];
            for (let i = 0; i<dataList.length; i++){
                dataList[i].class = this.classList[i];
                dataList[i].icon = `<use xlink:href="${this.iconList[i]}"></use>`;
            }
            for (let i = 0; i<this.columnNum*this.maxRowNum; i++){
                if(!dataList[i]){
                    dataList[i] = false;
                }
            }
            let rowNum = dataList.length > this.columnNum*this.maxRowNum ? this.maxRowNum : parseInt(dataList.length/this.columnNum);
            console.log(rowNum);
            for (let i = 0; i < rowNum; i++) {
                let star = i * this.columnNum;
                newList[n++] = dataList.slice(star, star + this.columnNum);
            }
            var y = dataList.length - rowNum * 6;
            if (y > 0) {
                newList[n++] = dataList.slice(rowNum * 4);
            }
            console.log(newList);
            return newList;
        },


    }
};
</script>
<style>

.main-panel{
    margin:0 auto;
    width:1100px;
}

.margin-top-8{
    margin-top: 8px;
}
.margin-top-10{
    margin-top: 10px;
}
.margin-top-20{
    margin-top: 20px;
}
.margin-left-10{
    margin-left: 10px;
}
.margin-bottom-10{
    margin-bottom: 10px;
}
.margin-bottom-100{
    margin-bottom: 100px;
}
.margin-right-10{
    margin-right: 10px;
}
.padding-left-6{
    padding-left: 6px;
}
.padding-left-8{
    padding-left: 5px;
}
.padding-left-10{
    padding-left: 10px;
}
.padding-left-20{
    padding-left: 20px;
}
.height-100{
    height: 100%;
}
.height-120px{
    height: 100px;
}
.height-200px{
    height: 200px;
}
.height-492px{
    height: 492px;
}
.height-460px{
    height: 460px;
}
.line-gray{
    height: 0;
    border-bottom: 2px solid #dcdcdc;
}
.notwrap{
    word-break:keep-all;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.padding-left-5{
    padding-left: 10px;
}
[v-cloak]{
    display: none;
}
 .service-tag-box {
    overflow: hidden;
    margin:100px;
  }

  .icons-item {
    margin: 0 0 15px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    color: #5c6b77;
  }

  .icons-item:hover {
    cursor: pointer;
    background-color: #f8f8f8
  }

  .icons-item i {
    font-size: 30px;
  }

  .icons-item span {
    display: block;
  }
.icon-recent {
      /* 通过设置 font-size 来改变图标大小 */
      width: 1.5em; height: 1.5em;
      /* 图标和文字相邻时，垂直对齐 */
      vertical-align: -0.15em;
      /* 通过设置 color 来改变 SVG 的颜色/fill */
      fill: currentColor;
      /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
         normalize.css 中也包含这行 */
      overflow: hidden;
      margin:0 auto;
    }

    .btn-outline {
    width: 100%;
    min-height: 85px;
    display: table;
}
 .btn-outline {
    border: 1px dashed #d7d5d5;
    background-color: #f9fafb;
    border-radius: 3px;
    color: #848484;
    font-size: 14px;
    padding: 0;
    height: 32px;
    padding-top: 5px;
}
.main-text{
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 27px!important;
    color:rgb(72,92,131)
}
</style>



<style scoped>

.app-index:nth-child(6)
{
    margin-right:0!important
}
.app-index:nth-child(12)
{
    margin-right:0!important
}
.card-top-left{
    margin-right:6px!important;
    width:266px!important
}
.card-top-right{
    margin-left:6px!important;
    width:267px!important
}
.loading-spin {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .home-section {
        background-color: #fff;
    }
    .mainpanel {
        width: 100%;
        margin-left: 0;
        text-align: center;
        background-color: #fff;
    }
    .contentpanel{
        text-align: center;
        height:100%;
    }
    .mainwrapper {
        text-align: center;
        position: relative;
        padding: 8px 8px 0 8px;
        height: 100%;

        background-color: #fff
        .img-online {
        border: 2px solid #5cb85c;
        padding: 2px;
        background-color: #fff;
        }
    }
    .img-offline {
        border: 2px solid #ccc;
        padding: 2px;
        background-color: #fff;
    }

    .left-hide:after {
        content: '';
        width: 1px;
        background-color: #ddd;
        position: fixed;
        top: 60px;
        bottom: 10px;
        margin-left: 21px
    }
    .left-tool {
    position: fixed;
    width: 22px;
    height: 40px;
    background-color: #e1e1e1;
    top: 50%;
    margin-top: -15px;
    overflow: hidden;
    z-index: 200;
    display: none
}

.left-tool:hover {
}

.left-tool:hover>.left-hide>.left-icon:after {
    border-right-color: rgba(75,155,237,1)
}

.left-tool:hover>.left-show>.left-icon:after {
    border-left-color: rgba(75,155,237,1)
}
.left-hide {
    border-radius: 30px 0 0 30px;
    left: 217px
}

.left-hide>.left-icon:before {
    right: 4px;
    border-right-color: #fff
}

.left-hide>.left-icon:after {
    right: 2px;
    border-right-color: #e1e1e1
}
.left-hide:after {
    content: '';
    width: 1px;
    background-color: #ddd;
    position: fixed;
    top: 60px;
    bottom: 10px;
    margin-left: 21px
}

.has-announce .left-hide:after {
    top: 80px
}
.mainpanel {
    text-align: center;
    margin-top:100px;
    position: relative;
    height: 100%;
    margin:0 auto;
}


#main-body {

    width: 700px;
    height: 100%;
    top: 20%;
    text-align: center;
    margin:0 auto;
}
div.logo-wrapper {
    margin-bottom: 30px
}

div.logo-wrapper a{
    cursor: default;
}

img#activityImg:focus {
    outline: none;
}

div.search-wrapper {
    position: relative;
    margin-bottom: 40px
}

div.search-wrapper>.form-search input {
    width: 600px;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    margin-left: 50px;
    font-size: 14px;
    font-family: 'Microsoft YaHei';
    color: #333;
    letter-spacing: 0;
    border: 1px solid #d6d4d4;
    border-radius: 2px
}

div.search-wrapper>.form-search input.search-input:focus {
    border: 1px solid #38adff
}

div.search-wrapper>.form-search input+span.search-btn .icon-nav_search {
    cursor: pointer
}


div.search-wrapper>.form-search span.search-btn {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 65px;
    margin-top: 8px;
    color: #37abfd;
    font-size: 18px
}
.form-search input::-webkit-input-placeholder {
    font-size: 14px;
    color: #999
}

.form-search input:-moz-placeholder {
    font-size: 14px;
    color: #999
}

.form-search input::-moz-placeholder {
    font-size: 14px;
    color: #999
}

.form-search input:-ms-input-placeholder {
    font-size: 14px!important;
    color: #999!important;
    line-height: normal!important
}
.recent-wrapper{
    height:430px!important;
}

.recent-wrapper  td {
    position: relative;
    padding: 8px;


}

.recent-wrapper td .box-recent:hover {
    cursor: pointer;

}


.box-recent,.box-recent-empty {
    width: 158px;
    height: 130px;
    border:1px solid;
    border-radius:10px;
    border-color:#ece5e5;
    padding-top: 30px
}

.box-recent-empty {
    background-color: #ffffff
}

.box-recent:hover {
    box-shadow: 0 0 5px #666;
}

.box-recent:hover .box-recent-operate{
   bottom: 9px;
   display: flex;
   justify-content: center;
   align-items: center;
}

.box-recent-logo {
    margin-bottom: 15px
}

.box-recent-logo>span {
    font-size: 40px;
    color: #fff;
    vertical-align: middle;
}

.box-recent-text>span {
    font-size: 14px;
    font-family: 'Microsoft YaHei';
    color: #000;
    letter-spacing: 0
}

.box-recent-operate {
    position: absolute;
    display: none;
    right: 9px;
    bottom: 9px;
    left: 9px;
    height: 34px;
    line-height: 34px;
    color: #fff;
    background-color: #000;
    opacity: 0.6;
    transition: all 0.5s ease 0s;
}
.box-recent-operate:hover{
    bottom: 9px;
    display: inline-block;
}

.box-recent-operate span {
    display: inline-block;
    width: 40%;
    height: 30px;
    line-height: 30px;
    color: #fff
}

.box-recent-operate .split-icon {
    width: 10px;
}

/*.box-recent-operate span:before {
    margin-right: 5px
}*/

.box-a-bg {
    background-color: #0fa2d1
}

.box-b-bg {
    background-color: #55b088
}

.box-c-bg {
    background-color: #c85241
}

.box-d-bg {
    background-color: #d8743b
}

.box-e-bg {
    background-color: #d89327
}

.box-f-bg {
    background-color: #0fa2d1
}





</style>

<style lang="less">
.home-new-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
        top: 0;
    }

    .ivu-modal-footer {
        display: none;
    }
}

/* 首页统计数据 */
.board-container {
  padding: 8px 12px 8px 8px;

  .board-card {
    .board-header {
      text-align: center;
      background-color: rgba(102, 153, 255, 1);
      color: white;
      padding: 5px;
      margin: 0;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    .board-content {
      padding: 10px 0;
      border: 1px solid rgba(204, 204, 204, 1);
      border-top: none;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;

      .board-number {
        font-weight: 400;
        font-size: 34px;
        color: #3399FF;
        cursor: pointer;
      }

      .board-text {
        color: #666666;
      }

      .board-number-error {
        font-weight: 400;
        font-size: 34px;
        color: #FD5956;
        cursor: pointer;
      }
    }
  }
}

.devide-line {
  height: 1px;
  margin: 15px 12px 15px 8px;
  background-color: #e9eaec;
}
</style>
