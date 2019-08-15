<template>
  <div class="elastic-job">
    <div class="g-container-column">
      <div class="g-header u-bd-bottom">
        <PageTitle text="定时任务"></PageTitle>
      </div>
      <div class="g-main">
        <div class="g-container">
          <div class="g-aside u-bd-right">
            <el-menu :default-active="menuActive" @select="selectMenu">
              <el-submenu
                v-for="(item, index) in subMenuList"
                :key="index"
                :index="item.name"
              >
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{ item.title }}</span>
                </template>
                <el-menu-item
                  v-for="(item, index) in item.children"
                  :key="index"
                  :index="item.name"
                  >{{ item.title }}</el-menu-item
                >
              </el-submenu>
            </el-menu>
          </div>
          <div class="g-main u-pd-20-20">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageTitle from '@/rebuild/components/pageTitle'

export default {
  name: 'templateList',
  components: {
    PageTitle
  },
  data() {
    return {
      menuActive: 'ej-homework',
      subMenuList: [
        {
          name: 'config',
          title: '全局配置',
          icon: '',
          children: [
            {
              name: 'ej-center',
              title: '注册中心'
            },
            {
              name: 'ej-source',
              title: '事件追踪数据源'
            }
          ]
        },
        {
          name: 'homework',
          title: '作业操作',
          icon: '',
          children: [
            {
              name: 'ej-homework',
              title: '作业维度'
            },
            {
              name: 'ej-server',
              title: '服务器维度'
            }
          ]
        }
      ]
    }
  },
  mounted() {
    if (this.$route.name === 'ebj') {
      this.$router.push({ name: this.menuActive })
    } else {
      this.menuActive = this.$route.name
    }
  },
  methods: {
    goBack() {
      history.go(-1)
    },
    selectMenu(name) {
      this.$router.push({ name: name })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/rebuild/assets/style/base.scss';
@import '~@/rebuild/assets/style/layout.scss';
.elastic-job {
  height: 100%;
  .g-main {
    overflow: scroll;
    .g-aside {
      width: 200px;
    }
    .el-menu {
      border: none;
      .el-submenu__title {
        height: 50px;
        line-height: 50px;
      }
      .el-menu-item {
        height: 45px;
        line-height: 45px;
        &.is-active {
          border-right: 2px solid $color-main;
        }
      }
    }
  }
  .u-bd-bottom {
    border-bottom: 1px solid $color-layout-border;
  }
  .u-pd-30-40 {
    padding: 30px 40px;
  }
  .u-bd-top {
    border-top: 1px solid $color-layout-border;
  }
}
</style>
