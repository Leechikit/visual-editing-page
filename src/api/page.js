export default {
  code: 0,
  result: {
    template: `<div
    style="overflow:scroll;width:100%;height:100%;background-color: #F5F5F5;"
  >
    <Nav :opacity="'0.5'" :display="'none'"></Nav>
    <div
      class="my-img"
      :style="{ backgroundImage: homeBG }"
      style="height:300px"
    >
      <el-row class="user-infor" type="flex" align="middle">
        <el-col :span="10">
          <el-row>
            <el-col :span="5" :offset="5">
              <img
                style="width:80px;height:80px;border-radius:50%;padding: 4px;background: #fff;"
                :onerror="defaultImg"
                :src="photo"
              />
            </el-col>
            <el-col :span="14">
              <div style="line-height:50px">
                <p style="color:#fff;font-size:20px;line-height:44px">
                  {{ currentTime }}{{ userName }}
                </p>
                <p style="color:#fff;font-size:14px">
                  做任何一件事都要有始有终,坚持把它做完
                </p>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="14" align="middle">
          <div class="app-list-box">
            <div
              v-for="(item, index) in showWorkApp"
              :key="index"
              class="app-list"
              @click="toTaskMyWork(item.task)"
            >
              <CountTo :endVal="item.num"> </CountTo>
              <p class="name">{{ item.name }}</p>
              <div class="icon-box">
                <span class="iconfont" :class="item.class"></span>
              </div>
              <div v-if="index === showWorkApp.length - 1" class="app-btn">
                <el-button
                  type="primary"
                  size="mini"
                  @click.stop="showQuickModel"
                  >编辑</el-button
                >
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="main-panel">
      <div v-if="reTable1" class="person-count">
        <infor-card
          id-name="user_created_count"
          iconType="android-person-add"
          color="#FFF"
          :data="reTable1.data[0]"
          :countSize="fontSize"
        ></infor-card>
      </div>
      <div class="person-count" v-if="reTable2 || reTable3">
        <div v-if="reTable2" class="reTable2">
          <infor-card
            id-name="user_created_count"
            iconType="android-person-add"
            color="#FFF"
            :data="reTable2.data[0]"
            :countSize="fontSize"
          ></infor-card>
        </div>
        <div v-if="reTable3" class="reTable3">
          <infor-card
            id-name="user_created_count"
            iconType="android-person-add"
            color="#FFF"
            :data="reTable3.data[0]"
            :countSize="fontSize"
          ></infor-card>
        </div>
      </div>
      <div class="echart-count" v-if="linePic || barPic">
        <div class="echart-count-count" v-if="linePic">
          <div class="echart-title">
            <span class="iconfont iconLbiaojixiangqing"></span>
            <span class="infor-intro-mainText">{{ linePic.data[0].text }}</span>
          </div>
          <div class="echart-main">
            <EchartsBar :data="linePic.data[0]" />
          </div>
        </div>
        <div class="echart-count-count" v-if="barPic">
          <div class="echart-title">
            <span class="iconfont iconLbiaojixiangqing"></span>
            <span class="infor-intro-mainText">{{ barPic.data[0].text }}</span>
          </div>
          <div class="echart-main">
            <EchartsBarTs :data="barPic.data[0]" />
          </div>
        </div>
      </div>
      <div class="app-notice">
        <div class="fast-entry-app">
          <div class="text-title">
            <span class="iconfont iconLbiaojixiangqing"></span> {{ shortcut }}
            <!-- <div class="btn-box">
              <div
                class="btn1"
                :class="{ active: shortcut === '常用应用' }"
                @click="changeShortcut('常用应用')"
              >
                常用
              </div>
              <div
                class="btn1"
                :class="{ active: shortcut === '我的收藏' }"
                @click="changeShortcut('我的收藏')"
              >
                收藏
              </div>
            </div> -->
          </div>
          <div class="custom-app" v-loading="customAppLoading">
            <div
              v-for="(item, index) in appData"
              :key="index"
              class="custom-app-show"
              @click="showApp(item.moduleId, item.id)"
            >
              <p class="custom-app-info-icon">
                <svg
                  class="icon-recent"
                  aria-hidden="true"
                  v-html="item.icon"
                  v-if="shortcut === '常用应用'"
                >
                  {{ item.icon }}
                </svg>
                <svg class="icon icon-recent" aria-hidden="true" v-else>
                  <use :xlink:href="item.appIcon"></use>
                </svg>
              </p>
              <p class="app-name">
                {{ shortcut === '我的收藏' ? item.displayName : item.appName }}
              </p>
              <div v-if="shortcut === '我的收藏'" class="button-list">
                <div class="button" @click.stop="modifyApp(item)">
                  <span class="iconfont iconLshezhi"></span>
                </div>
                <div class="button" @click.stop="deleteApp(item)">
                  <span class="iconfont iconLshanchu"></span>
                </div>
              </div>
            </div>
            <div
              v-if="shortcut === '我的收藏' && appData.length != 12"
              class="custom-app-show add-custom-app"
              shadow="hover"
              @click="addApp"
            >
              <span class="iconfont iconzengjia"></span>
            </div>
          </div>
        </div>
        <div class="news-bulletin">
          <div class="text-title">
            <span class="iconfont iconLbiaojixiangqing"></span> 公告
          </div>
          <div class="noeNews" v-if="!noticeLoading && !noticeList.length">
            暂无公告
          </div>
          <div
            class="news-main"
            v-loading="noticeLoading"
            v-if="noticeList.length"
            v-infinite-scroll="getListNotices"
            :infinite-scroll-disabled="
              noticeTotal === noticeList.length || getNoticeLoading
            "
          >
            <div
              class="notice-list"
              v-for="(item, index) in noticeList"
              :key="index"
              @click="showNoticeList(index)"
            >
              <div class="head">
                <span class="iconfont iconriqi"></span>
                <div class="title" :title="item.title">{{ item.title }}</div>
                <div class="time">{{ item.updateTime }}</div>
              </div>
              <div class="content">
                {{ item.content }}
              </div>
            </div>
            <p v-if="getNoticeLoading" style="text-align:center">加载中...</p>
            <p
              v-if="noticeTotal === noticeList.length"
              style="text-align:center"
            >
              没有更多了
            </p>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :title="popupData.title"
      :visible.sync="popupVisible"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      width="470px"
    >
      <el-form :model="popupData" label-width="80px" label-position="right">
        <el-form-item>
          <div class="form-item-title" slot="label">收藏应用</div>
          <div class="form-item-value">
            <appCollect
              :appId="popupData.appId"
              :appName="popupData.appName"
              @select="selectApp"
            ></appCollect>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="form-item-title" slot="label">显示名称</div>
          <div class="form-item-value">
            <el-input
              size="small"
              v-model="popupData.displayName"
              placeholder="请输入名称"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="form-item-title" slot="label">收藏图标</div>
          <div class="form-item-value">
            <appIcon
              :appIcon="popupData.appIcon"
              @select="selectIcon"
            ></appIcon>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="popupVisible = false" class="popup-confirm"
          >取 消</el-button
        >
        <el-button
          type="primary"
          class="popup-confirm"
          :loading="popupConfirm_loading"
          @click="popupConfirm"
          >{{
            this.popupData.title === '添加收藏' ? '添加' : '保存'
          }}</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="快捷应用"
      :visible.sync="quickModel"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      width="620px"
    >
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="entranceCheckAll"
        @change="entranceCheckAllChange"
        >全选</el-checkbox
      >
      <el-checkbox-group v-model="checkedEntrance">
        <el-checkbox
          v-for="entrance in entrances"
          :label="entrance"
          :key="entrance"
          >{{ entrance }}</el-checkbox
        >
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quickModel = false">取 消</el-button>
        <el-button
          type="primary"
          @click="changeEntrance"
          :loading="quickModel_loading"
          >保 存</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="公告内容"
      :visible.sync="showNoticeMain"
      width="500px"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <div class="notice-main" v-if="showNoticeMain">
        <div class="head" :title="noticeList[showNoticeListIndex].title">
          <div class="title">{{ noticeList[showNoticeListIndex].title }}</div>
          <div class="time">
            发布于 {{ noticeList[showNoticeListIndex].updateTime }}
          </div>
        </div>
        <div class="content">
          {{ noticeList[showNoticeListIndex].content }}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showNoticeMain = false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>
  </div>`
  }
}
