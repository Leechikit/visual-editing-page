<template>
  <div class="admin">
    <el-container>
      <el-aside width="auto">
        <div class="admin-title" :class="{ 's-collapse': isCollapse }">
          <div class="logo"></div>
          <span class="text">协同管理后台</span>
        </div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#141E28"
          text-color="#fff"
          active-text-color="#327DFF"
          :default-active="currentMenuName"
          :collapse="isCollapse"
          @select="selectMenu"
        >
          <el-menu-item
            v-for="(item, $index) in menuList"
            :key="$index"
            :index="item.name"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
        <el-tooltip
          effect="dark"
          :content="isCollapse === true ? '展开菜单' : '收起菜单'"
          placement="right"
        >
          <div class="button-collapse" @click="toggleMenu">
            <i v-show="isCollapse === false" class="el-icon-s-fold"></i>
            <i v-show="isCollapse === true" class="el-icon-s-unfold"></i>
          </div>
        </el-tooltip>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <div class="admin-header">
            <div class="user">
              <el-dropdown
                trigger="click"
                @command="goSystem"
                placement="bottom"
              >
                <div class="user-box">
                  <!-- <img
                    :src="userPhoto"
                    class="user-photo"
                    style="width:20px;height:20px;border-radius:50%;margin-right:5px;margin-top:3px"
                  /> -->
                  <i class="iconfont iconFgerenyonghu user-photo"></i>
                  <span class="user-name"> {{ userName }} </span>
                  <i class="iconfont iconxia"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="consoleLogin">
                    <span class="iconfont icontuichu blue"></span> 退出系统
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-main>
          <div class="admin-main">
            <!-- <elastic-job
              v-if="currentMenuName === 'ebj'"
              style="height:100%;width:100%;marigin-left:220px"
            ></elastic-job> -->
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// import elasticJob from '@/views/elastic-job/index.vue'
import Cookies from 'js-cookie'

export default {
  name: 'admin',
  components: {
    // elasticJob
  },
  data() {
    return {
      currentMenuName: 'template', // 当前展示菜单
      isCollapse: false, // 是否收起
      userPhoto: '',
      userName: '管理员',
      menuList: [
        {
          name: 'ebj',
          title: '定时任务',
          icon: 'el-icon-time'
        },
        {
          name: 'sql',
          title: 'SQL监控',
          icon: 'el-icon-data-line'
        },
        {
          name: 'template',
          title: '模板中心',
          icon: 'el-icon-tickets'
        },
        {
          name: 'order',
          title: '订单管理',
          icon: 'el-icon-shopping-cart-full'
        }
      ]
    }
  },
  mounted() {
    this.currentMenuName = this.$route.meta.menu || this.$route.name
  },
  methods: {
    // 选择菜单
    selectMenu(name) {
      // this.currentMenuName = name
      this.$router.push({ name: name })
    },
    // 展开收起菜单
    toggleMenu() {
      this.isCollapse = !this.isCollapse
    },
    // 跳转系统
    goSystem(name) {
      // 登出
      if (name === 'consoleLogin') {
        Cookies.set('consoleLogin', 0)
      }
      this.$router.push({
        name: name
      })
    }
  },
  watch: {
    $route(to) {
      this.currentMenuName = to.meta.menu || to.name
    }
  }
}
</script>
<style lang="scss" scoped>
.admin {
  display: flex;
  flex-direction: column;
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-aside {
    position: relative;
    padding-bottom: 50px;
    background-color: #141e28;
    .el-menu {
      width: 200px;
      border-right: none;
      &--collapse {
        width: 64px;
        .el-menu-item {
          [class^='el-icon-'] {
            line-height: 50px;
          }
        }
      }
    }
    .el-menu-item {
      height: 50px;
      line-height: 50px;
      [class^='el-icon-'] {
        font-size: 14px;
        vertical-align: baseline;
      }
      span {
        font-size: 14px;
      }
    }
    .button-collapse {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      border-top: 1px solid #323c46;
      cursor: pointer;
      [class^='el-icon-'] {
        font-size: 18px;
        color: #fff;
        vertical-align: middle;
      }
    }
  }
  .el-header {
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(#000, 0.2);
  }
  .el-main {
    display: flex;
    flex-direction: column;
  }
  &-title {
    height: 50px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    &.s-collapse {
      width: 64px;
      overflow: hidden;
      .text {
        display: none;
      }
    }
    .logo {
      width: 20px;
      height: 20px;
      background: url('~@/rebuild/assets/image/logo.png') center center
        no-repeat;
      background-size: contain;
    }
    .text {
      margin-left: 10px;
      font-size: 16px;
      color: #fff;
    }
  }
  &-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    overflow: hidden;
    .user-box {
      i,
      span {
        vertical-align: middle;
      }
      .user-photo {
        margin-right: 4px;
      }
      .iconxia {
        font-size: 10px;
        margin-left: 4px;
      }
    }
  }
  &-main {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #fff;
    overflow: auto;
  }
}
</style>
