<template>
  <div class="userpanel-box">
    <div class="form-control form-user-add" @click="showUserPanel">
      <input class="SheetUser-Input">
      <div class="input" v-if="selectedData.length < 1">
        <span class="sp_placeholder" v-text="placeHolder"></span>
      </div>
      <span class="SheetUser-Item label label-info icon-close-middle" v-for="(item, $index) in selectedData" :key="item.id" @click.stop.prevent="deleteNode($index)">
        <span v-text="item.name"></span>
      </span>
    </div>
    <div class="userpanel" v-show="isShowUserPanel">
      <!-- <div class="searchdiv">
        <input class="searchinput" type="text">
      </div> -->
      <div class="SheetUser-SelectorPanel" v-show="isShowUserPanel">
        <ul class="nav nav-tabs user-tabs">
          <li data-tabtype="tab_Users" v-show="isUser" :class="{'active': activeIndex === 0}" @click="changeTab">
            <a>用户</a>
          </li>
          <li data-tabtype="tab_Deps" v-show="isDep" :class="{'active': activeIndex === 1}" @click="changeTab">
            <a>部门</a>
          </li>
        </ul>
        <div class="SheetUser_DataPanel row SheetUser_tab_Users" v-show="activeIndex === 0">
          <div class="SheetUser_TreePanel col-sm-7 col-xs-7" style="height: 100%;">
            <Tree :data="depTreeData" :load-data="loadDepTreeData"></Tree>
          </div>
          <div class="col-sm-5 col-xs-5" style="height: 100%; overflow: auto;">
            <!-- <ul class="nav"></ul></div></div></div><div data-targetid="6a00eb0f-e7ba-4d99-940c-6ae2118bb4ce" class="SheetUser-SelectorPanel" data-formuserpanel="SearchPanel" style="overflow-y: auto; display: none;"></div> -->
            <ul class="nav">
              <li v-for="item in userData" class="SheetUser-LiItem">
                <a href="javascript:" v-text="item.DisplayName" @click="selectUser(item.DisplayName, item.id)"></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="SheetUser_DataPanel row SheetUser_tab_Deps" v-show="activeIndex === 1">
          <div class="SheetUser_TreePanel col-sm-12 col-xs-12" style="height: 100%;">
            <Tree :data="depTreeData" :load-data="loadDepTreeData"></Tree>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  GetChildDepartment,
  GetDepartmentUsers
} from "@/views/form/service/getData.js";
export default {
  props: {
    type: {
      type: String,
      default: "user" // "dep", "both"
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowUserPanel: false,
      depTreeData: [],
      userData: [],
      selectedData: [],
      activeIndex: this.type == "dep" ? 1 : 0
    };
  },
  computed: {
    isUser() {
      if (this.type == void 0) return true;
      return this.type == "user" || this.type == "both";
    },
    isDep() {
      return this.type == "dep" || this.type == "both";
    },
    placeHolder() {
      let result = '';
      switch(this.type) {
        case 'user':
          result = '点击选择人员';
          break;
        case 'dep':
          result = '点击选择部门';
          break;
        default:
          result = '点击选择';
          break;
      }
      return result;
    }
  },
  watch: {
    selectedData(newVal) {
      const params = newVal.map(item => {
        return item.id;
      });
      this.$emit("on-change", params);
    }
  },
  created() {},
  methods: {
    // 切换tab
    changeTab() {
      this.activeIndex = this.activeIndex === 0 ? 1 : 0;
    },
    // 显示组件
    showUserPanel() {
      if(this.readonly) return;
      this.isShowUserPanel = !this.isShowUserPanel;
      if (this.isShowUserPanel) {
        this.$nextTick(() => {
          $(window).on("click.userPanel", event => {
            let target = event.target;
            let isShow = false;
            while (target) {
              if ($(target).hasClass("userpanel")) {
                isShow = true;
                break;
              }
              target = target.parentNode;
            }
            if (!isShow) {
              this.isShowUserPanel = false;
              $(window).off("click.userPanel");
            }
          });
        });
        if (this.depTreeData.length <= 0) {
          GetChildDepartment(0).then(json => {
            if (json.code == 0) {
              let arrs = json.page.result;
              arrs.forEach(item => {
                this.depTreeData.push(this.formatTree(item, true));
              });
            }
          });
        }
      }
    },
    // 格式化树结构数据
    formatTree(obj, expand) {
      let result = {
        title: obj.name,
        id: obj.id,
        render: (h, { root, node, data }) => {
          return h(
            "span",
            {
              style: {
                display: "inline-block",
                width: "100%",
                cursor: "pointer"
              },
              on: {
                click: () => {
                  if (this.activeIndex === 0) {
                    this.selectDepNode(data);
                  } else if (this.activeIndex === 1) {
                    this.selectDep(data);
                  }
                }
              }
            },
            [
              h("i", {
                class: {
                  "icon-xiashuguanli": true
                },
                style: {
                  marginRight: "6px",
                  fontSize: "14px"
                },
                on: {
                  click: () => {
                    this.selectDepNodeEvent(data);
                  }
                }
              }),
              h("span", data.title)
            ]
          );
        }
      };
      if (obj.HasChild) {
        result.children = [];
        result.loading = false;
      }
      return result;
    },
    // 加载部门
    loadDepTreeData(item, callback) {
      GetChildDepartment(item.id).then(json => {
        if (json.code == 0) {
          let arrs = json.page.result;
          let result = [];
          arrs.forEach(item => {
            result.push(this.formatTree(item, true));
          });
          callback(result);
        }
      });
    },
    // 选择部门节点
    selectDepNode(dep) {
      GetDepartmentUsers(dep.id, 10000000).then(json => {
        if (json.code == 0) {
          let arrs = json.page.result;
          this.userData = arrs;
        }
      });
    },
    // 选择用户
    selectUser(name, id) {
      const isExist = this.selectedData.some(item => {
        return item.id == id;
      });
      if (!isExist) {
        this.selectedData.push({
          name,
          id
        });
      }
    },
    // 选择部门
    selectDep(dep) {
      const isExist = this.selectedData.some(item => {
        return item.id == dep.id;
      });
      if (!isExist) {
        this.selectedData.push({
          name: dep.title,
          id: dep.id
        });
      }
    },
    // 删除用户
    deleteNode(index) {
      this.selectedData.splice(index, 1);
    }
  }
};
</script>
<style lang="less" scoped>
.userpanel-box {
  position: relative;
  .form-user-add {
    overflow: auto;
    width: 100%;
    height: auto;
    max-height: 100px;
    min-height: 26px;
    padding-bottom: 6px !important;
    border: 1px dashed rgb(204, 204, 204);
    .SheetUser-Input {
      width: 1px;
      display: none;
    }
    .input {
      width: 98%;
      height: 26px;
      float: right;
      text-align: center;
    }
    .SheetUser-Item {
      color: #38adff;
      height: 20px;
      line-height: 20px;
      margin: 6px 5px 0;
      cursor: pointer;
      padding: 0 18px 0 6px;
      font-size: 12px;
      float: left;
      border-radius: 3px;
      position: relative;
    }
  }
  .userpanel {
    position: absolute;
    left: 50%;
    top: 32px;
    margin-left: -250px;
    .SheetUser-SelectorPanel {
      display: block;
    }
    .SheetUser_DataPanel {
      display: block;
    }
    .SheetUser_TreePanel {
      padding-left: 10px;
      overflow-x: hidden;
    }
    .nav-tabs {
      li {
        cursor: pointer;
      }
    }
  }
}
</style>

