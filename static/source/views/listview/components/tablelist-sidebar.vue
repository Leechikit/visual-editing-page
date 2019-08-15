<template>
    <div class="sidebar">
        <div style="margin-bottom: 5px;">
          <Input placeholder="请输入名称" style="width:200px;margin-left:20px" v-model="formatListAppName" @on-change="searchName"/>
        </div>

        <dl v-for="(item, $index) in formatListApp" :key="$index">
          <dt v-if="item.type === 'group' && item.children.length" class="sidebar-item sidebar-group" @click="expandGroup($index)">
            <a href="javascript:">
              <Icon type="folder"></Icon>
              <span class="text" :title="item.moduleName" v-text="item.moduleName"></span>
            </a>
          </dt>
          <dt v-if="item.type === 'app'" class="sidebar-item sidebar-app"  :class="item.appId == currentId ? 'active': ''" @click="refreshList(item.type, item.appId,item.appKey,item.appName)">
            <a href="javascript:">
              <Icon type="ios-paper"></Icon>
              <span class="text" :title="item.appName" v-text="item.appName"></span>
            </a>
          </dt>
          <dt v-if="item.type === 'report'" class="sidebar-item sidebar-app"  :class="item.reportId == currentId ? 'active': ''" @click="refreshList(item.type, item.reportId,item.reportId,item.reportName)">
            <a href="javascript:">
              <Icon type="pie-graph"></Icon>
              <span class="text" :title="item.reportName" v-text="item.reportName"></span>
            </a>
          </dt>
          <template v-for="app in item.children">
            <dd v-if="app.type === 'app'" :key="app.appId"  v-show="item.expand" class="sidebar-item sidebar-group-app" :class="app.appId == currentId ? 'active': ''" @click="refreshList(app.type, app.appId,app.appKey,app.appName)">
              <a href="javascript:">
                <Icon type="ios-paper"></Icon>
                <span class="text" :title="app.appName" v-text="app.appName"></span>
              </a>
            </dd>
            <dd v-if="app.type === 'report'" :key="app.reportId" v-show="item.expand" class="sidebar-item sidebar-group-app" :class="app.reportId == currentId ? 'active': ''" @click="refreshList(app.type, app.reportId,app.reportId,app.reportName)">
              <a href="javascript:">
                <Icon type="pie-graph"></Icon>
                <span class="text" :title="app.reportName" v-text="app.reportName"></span>
              </a>
            </dd>
          </template>
          <template>
            
          </template>
        </dl>
    </div>
</template>
<script>
import { mapGetters,mapMutations } from "vuex";
export default {
  props: ["currentId"],
  data() {
    return {
      allformatListApp: [],
      indexFormatListApp: [],
      formatListApp: [],
      formatListAppName: ''
    };
  },
  computed: {
    ...mapGetters("listview", ["getListApp","getListThead"])
  },
  watch: {
    getListApp(val, oldVal) {
      this.resetFormatListApp({
        listApp: val
      });
    },
    currentId(val) {
      this.resetFormatListApp({
        currentId: val
      });
    }
  },
  methods: {
    ...mapMutations('listview',['setCurrentAppId', 'setCurrentAppKey','setCurrentAppName']),
    refreshList(type,appId,appKey,appName) {
      this.$emit('changeTabPaneList',type, appId, appKey, appName);
    },
    expandGroup(index) {
      this.formatListApp[index].expand = !this.formatListApp[index].expand
    },
    resetFormatListApp({listApp = this.formatListApp, currentId = this.currentId}) {
      if (this.formatListAppName !== '') return
      let data = [];
      let obj = [];
      listApp.forEach(group => {
        let groupData = {
          expand: false
        }
        groupData = Object.assign({}, group, groupData);
        if (groupData.appId === currentId || groupData.reportId === currentId) {
          groupData.selected = true;
        }else if(groupData.children && groupData.children.length > 0) {
          for(let i = 0, len = groupData.children.length; i < len; i++){
            let app = groupData.children[i];
            if(app.appId === currentId || app.reportId === currentId){
              app.selected = true;
              groupData.expand = true;
              break;
            }
          }
        }
        if(groupData.children && groupData.children.length > 0) {
          groupData.children.forEach(item => {
            obj.push(item)
          })
        }
        data.push(groupData);
        obj.push(Object.assign({}, groupData));
      });
      this.allformatListApp = obj;
      this.indexFormatListApp = [...data]
      this.formatListApp = [...data];
    },
    searchName() {
      if (this.formatListAppName === '') {
        this.formatListApp = [...this.indexFormatListApp]
      } else {
        this.formatListApp = this.allformatListApp.filter(item => {
          if (item.moduleName) return item.moduleName.indexOf(this.formatListAppName) !== -1
          if (item.reportName) return item.reportName.indexOf(this.formatListAppName) !== -1
          if (item.appName) return item.appName.indexOf(this.formatListAppName) !== -1
        })
      }
    }
  }
};
</script>
<style lang="less" scoped>
.sidebar {
  height: 100%;
  overflow-y: auto;
  margin-bottom: 0;
  dl{
    margin-bottom: 0;
  }
  &-item {
    a {
      display: block;
      transition: all 0.2s ease-out 0s;
      padding: 11px 15px;
      padding-left: 26px;
      margin: 0 1px 0 0;
      position: relative;
      border-left: 1px solid #fff;
      // text-overflow: ellipsis;
      // white-space: nowrap;
      // overflow: hidden;
      outline: none;
      text-decoration: none;
      &:hover {
        background-color: #d4edfe !important;
      }
      .ivu-icon {
        font-size: 20px;
        margin-right: 8px;
        color: #37abfd;
      }
      .text {
        vertical-align: text-bottom;
        color: #495060;
      }
    }
  }
  &-group{
    &-app {
      a{
        padding: 7px 15px;
        padding-left: 38px;
        .ivu-icon {
          font-size: 18px;
          color: #999;
        }
      }
    }
  }
  &-app {
    a{
      .ivu-icon {
        font-size: 18px;
        color: #999;
      }
    }
  }
  .active {
    a {
      border-top: 0;
      margin-right: 0;
      background-color: #f9fafb;
      .ivu-icon {
        color: #37abfd;
      }
      .text{
        color: #37abfd;
      }
    }
  }
}
</style>
