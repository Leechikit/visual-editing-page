<template>
  <div>
    <Card style="max-width:800px;margin:30px auto;">
      <p slot="title">
        首页配置
      </p>
      <div class="box">
        <Row>
          <div class="title-name left">应用展示</div>
          <RadioGroup v-model="showModel" class="right">
            <Radio label="1" style="margin-right:10px!important">
              最常应用
            </Radio>
            <Radio label="2"> 我的收藏 </Radio>
          </RadioGroup>
        </Row>
        <Row>
          <div class="title-name left">背景图</div>
          <div class="right" style="min-height:50px">
            <Upload
              :before-upload="handleUpload"
              :on-success="updateBg"
              name="fileToUpload"
              :with-credentials="true"
              :show-upload-list="false"
              :action="uploadUrl"
            >
              <img
                v-if="homePicture"
                :src="homePicture"
                title="点击更换背景图"
                width="100%"
                style="cursor:pointer"
              />
              <div
                v-else
                style="width:50px;height:50px;cursor:pointer"
                title="点击更换背景图"
              ></div>
            </Upload>
            <Spin size="large" fix v-if="picShow"></Spin>
          </div>
        </Row>
        <Row>
          <div class="title-name left">快捷入口</div>
          <div class="right" style="min-height:50px">
            <Checkbox
              :value="checkAll"
              @click.prevent.native="handleCheckAll"
              style="float:left;margin-right:20px !important"
              >全选</Checkbox
            >
            <CheckboxGroup
              v-model="checkAllGroup"
              @on-change="checkAllGroupChange"
              style="float:left"
            >
              <Checkbox
                v-for="(item, index) in appGroup"
                :key="index"
                :label="item.label"
                style="margin-right:10px !important"
              > {{ item.value }} </Checkbox>
            </CheckboxGroup>
            <div v-if="!checkAllGroup.length" style="float:left;width:100%;color:red"> 至少选择一项 </div>
          </div>
        </Row>
        <Row>
          <div class="title-name left">公告列表</div>
          <div class="right" style="min-height:50px">
            <div class="noeNews" v-if="!noticeLoading && !noticeList.length" style="text-align:center;line-height:37px">
              暂无公告
            </div>
            <div
              class="news-main"
              v-loading="noticeLoading"
              v-if="noticeList.length"
              v-infinite-scroll="getListNotices"
              :infinite-scroll-disabled="noticeTotal === noticeList.length || getNoticeLoading"
            >
              <div class="notice-list" v-for="(item, index) in noticeList" :key="index">
                <div class="head">
                  <span class="iconfont iconriqi"></span>
                  <div class="title" :title="item.title"> {{ item.title }} </div>
                  <div class="time">发布于 {{ item.updateTime }}</div>
                  <div class="del">
                    <el-button size="mini" @click="noticeDel(item.id, index)">删除</el-button>
                  </div>
                </div>
                <div class="content">
                  {{ item.content }}
                </div>
              </div>
              <p v-if="getNoticeLoading" style="text-align:center">加载中...</p>
              <p v-if="noticeTotal === noticeList.length" style="text-align:center">没有更多了</p>
            </div>
            <div class="add-btn" style="margin-top:20px;text-align:center">
              <el-button type="primary" @click="addNoticeShow" size="mini">添加公告</el-button>
            </div>
          </div>
        </Row>
        <Row>
          <div style="width: 100px;margin:30px auto">
            <Button
              type="primary"
              style="width:100%"
              :loading="loading"
              @click="handleSubmit"
              :disabled="disabled"
              >保存</Button
            >
          </div>
        </Row>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <el-dialog
      title="公告内容"
        :visible.sync="showAddNotice"
        width="500px"
        :close-on-click-modal="false"
        :modal-append-to-body="false">
        <el-input maxlength="100" show-word-limit v-model="notice.title" placeholder="请输入标题" size="small" style="width:220px;margin-bottom:24px"></el-input>
        <el-input
          type="textarea"
          :autosize="{minRows: 6}"
          placeholder="请输入正文"
          maxlength="5000"
          show-word-limit
          v-model="notice.content">
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showAddNotice = false" size="mini">关 闭</el-button>
          <el-button type="primary" @click="addNotice" size="mini">保存</el-button>
        </span>
      </el-dialog>
    </Card>
  </div>
</template>

<script>
import Home from '@/api/home.js';
import HTTP_Home from '@/rebuild/api/home.js'
import axios from 'axios';
export default {
  data () {
    return {
      oldShowModel: '1',
      showModel: '1',
      oldHomePicture: '',
      homePicture: '',
      uploadUrl: '',
      iconId: '',
      spinShow: true,
      picShow: true,
      disabled: false,
      loading: false,
      checkAll: false,
      oldCheckAllGroup: ['1', '2'],
      checkAllGroup: ['1', '2'],
      appGroup: [
        {value: '待办事项', label: '1'},
        {value: '审批事项', label: '2'},
        {value: '抄送审批', label: '3'},
        {value: '其他', label: '4'},
        {value: '已发起', label: '5'},
        {value: '已办理', label: '6'}
      ],
      notice:{},
      noticeLoading: true,
      noticeList: [],
      noticePageNum: 0,
      noticeTotal: null,
      getNoticeLoading: false,
      showAddNotice: false
    };
  },
  methods: {
    async handleSubmit () {
      if (!this.checkAllGroup.length) {
        this.$Message.warning('快捷入口至少需要选择一项');
        return;
      }
      if (this.notice.title && this.notice.content) {
      } else if (!this.notice.title && !this.notice.content) {
      } else {
        this.$Message.warning('请填写公告标题和内容');
        return;
      }
      try {
        var boo = 0;
        this.loading = true;
        this.disabled = true;
        if (this.oldShowModel === this.showModel) {
          boo++;
        } else {
          var paramsConf = {
            companyId: this.$store.state.user.companyId,
            homeConfiguration: this.showModel
          };
          var configuration = await Home.saveHomeConfiguration(paramsConf);
          if (configuration.code === '0') {
            boo++;
            this.oldShowModel = this.showModel;
          }
        }
        if (this.oldHomePicture === this.homePicture) {
          boo++;
        } else {
          var paramsPicture = {
            companyId: this.$store.state.user.companyId,
            iconId: this.iconId
          };
          var picture = await Home.updateHomePicture(paramsPicture);
          if (picture.code === '0') {
            var url = `url(${axios.defaults.baseURL}/Form/downloadFile/${
              this.iconId
            })`;
            this.$parent.changeHomeBG(url);
            boo++;
            this.oldHomePicture = this.homePicture;
          }
        }
        if (this.oldCheckAllGroup.sort().toString() === this.checkAllGroup.sort().toString()) {
          boo++;
        } else {
          var paramsUpcoming = {
            companyId: this.$store.state.user.companyId,
            upcomingConfiguration: this.checkAllGroup.join(';')
          };
          var upcoming = await Home.updateUpcomingConfiguration(paramsUpcoming);
          if (upcoming.code === '0') {
            this.$parent.changeShowWorkApp(this.checkAllGroup);
            boo++;
            this.oldCheckAllGroup = [...this.checkAllGroup];
          }
        }
      } catch (e) {
      } finally {
        if (boo === 3) {
          this.$Message.success('保存成功');
        } else {
          this.$Message.error('保存失败');
        }
        this.loading = false;
        this.disabled = false;
      }
    },
    handleUpload (file) {
      if (file.name.includes(',')) {
        this.$Message.error('图片名不能出现逗号","');
        return false;
      } else {
        this.disabled = true;
        this.picShow = true;
      }
    },
    updateBg (data) {
      this.homePicture =
        `${axios.defaults.baseURL}/Form/downloadFile/` + data.AttachmentId;
      this.iconId = data.AttachmentId;
      this.disabled = false;
      this.picShow = false;
    },
    handleCheckAll () {
      this.checkAll = !this.checkAll;
      if (this.checkAll) {
        this.checkAllGroup = this.appGroup.map(item => item.label);
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange (data) {
      if (data.length === this.appGroup.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    goTwoPlace(num) {
      return num > 9 ? '' + num : '0' + num
    },
    getListNotices() {
      this.noticePageNum++
      this.getNoticeLoading = true
      HTTP_Home.getListNotices({
        companyId: this.$store.state.user.companyId,
        pageSize: 4,
        pageNum: this.noticePageNum
      })
        .then(res => {
          if (res.code === '0') {
            res.page.result.forEach(item => {
              var M = new Date(item.updateTime).getMonth() + 1
              var d = new Date(item.updateTime).getDate()
              var h = new Date(item.updateTime).getHours()
              var m = new Date(item.updateTime).getMinutes()
              item.updateTime =
                this.goTwoPlace(M) +
                '-' +
                this.goTwoPlace(d) +
                ' ' +
                this.goTwoPlace(h) +
                ':' +
                this.goTwoPlace(m)
            })
            this.noticeList = [...this.noticeList, ...res.page.result]
            this.noticeTotal = res.page.total
          } else {
            this.$message(res.msg)
          }
        })
        .finally(() => {
          this.noticeLoading = false
          this.getNoticeLoading = false
        })
    },
    noticeDel(id, index) {
      this.$confirm('是否删除公告', '删除公告', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(() => {
            HTTP_Home.deleteNotice({id}).then(res => {
              if(res.code === '0'){
                this.$message.success('删除成功')
                this.noticeList.splice(index, 1)
              } else {
                this.$message.error(res.msg)
              }
            })
          })
          .catch(action => {
            this.$message.warning('取消删除')
          });
    },
    addNoticeShow() {
      this.notice = {}
      this.showAddNotice = true
    },
    async addNotice(){
      var paramsNotice = {
        companyId: this.$store.state.user.companyId,
        ...this.notice
      }
      var notice = await HTTP_Home.updateHomepageNotice(paramsNotice)
      if (notice.code === '0') {
        this.$message.success('添加成功')
        this.noticeList = []
        this.noticeTotal = null
        this.noticePageNum = 0
        this.getListNotices()
        this.showAddNotice = false
      } else {
        this.$message.error(res.msg)
      }
    }
  },
  async created () {
    var params = {
      companyId: this.$store.state.user.companyId
    };
    Home.getHomePicture(params).then(res => {
      if (!res.homePicture) {
        this.oldHomePicture = require('../index_bg.png');
        this.homePicture = require('../index_bg.png');
      } else {
        this.oldHomePicture = `${axios.defaults.baseURL}/Form/downloadFile/` + res.homePicture;
        this.homePicture = `${axios.defaults.baseURL}/Form/downloadFile/` + res.homePicture;
      }
    }).catch(e => {
      this.$Message.error('获取图片失败');
    }).finally(() => {
      this.picShow = false;
    });
    try {
      this.uploadUrl = `${axios.defaults.baseURL}/Form/SheetAttachmentAction?fileUsage=company_logo`;
      var ghc = await Home.getHomeConfiguration(params);
      if (ghc.code === '0') {
        if (ghc.homeConfiguration) {
          this.oldShowModel = ghc.homeConfiguration;
          this.showModel = ghc.homeConfiguration;
        } else {
          this.oldShowModel = '1';
          this.showModel = '1';
        }
      } else {
        this.$Message.error('获取应用展示数据失败');
      }
      var guc = await Home.getUpcomingConfiguration(params);
      if (guc.code === '0') {
        if (guc.UpcomingConfiguration) {
          this.oldCheckAllGroup = guc.UpcomingConfiguration.split(';');
          this.checkAllGroup = guc.UpcomingConfiguration.split(';');
          if (this.checkAllGroup.length === this.appGroup.length) {
            this.checkAll = true
          } 
        }
      } else {
        this.$Message.error('获取快捷入口数据失败');
      }
      // var notice = await HTTP_Home.getHomepageNotice({
      //   companyId: this.$store.state.user.companyId
      // })
      // if (notice.code === '0') {
      //   this.notice = {
      //     title: notice.homepageNotice.title,
      //     content: notice.homepageNotice.content
      //   }
      //   this.oldNotice = {
      //     title: notice.homepageNotice.title,
      //     content: notice.homepageNotice.content
      //   }
      // } else {
      //   this.$Message.error('获取公告信息失败');
      // }
    } catch (e) {
      console.log(e)
      this.$Message.error(e);
    } finally {
      this.spinShow = false;
    }
    
    this.getListNotices()
  }
};
</script>
<style lang='less' scoped>
.box {
  max-width: 700px;
  margin: 0 auto;
  .left {
    float: left;
    width: 100px;
    text-align: right;
    padding-right: 30px;
  }
  .right {
    float: right;
    width: calc(~"100% - 100px");
    position: relative;
    margin-bottom: 20px;
  }
  .title-name {
    font-weight: 600;
    line-height: 37px;
  }
  .news-main {
    height: 220px;
    overflow-y: auto;
    border:1px solid #aaa;
    border-radius: 4px;
    .notice-list{
      padding:10px 0;
      padding-left:10px;
      cursor: pointer;
      &:hover{
        background: #FAFAFA;
      }
      .head{
        overflow: hidden;
        .iconfont{
          color: #F7B500;
          float:left
        }
        .title{
          float: left;
          width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 24px;
          margin: 0;
          margin-left: 5px;
          font-size: 14px;
          font-weight: 550;
        }
        .time{
          float: left;
          margin-right: 10px;
          font-size: 12px;
          color: #B4B4B4
        }
        .del{
          float: right;
          margin-right:20px
        }
      }
      .content{
        font-size: 14px;
        color: #464646;
        text-indent: 22px;
        width: 230px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
