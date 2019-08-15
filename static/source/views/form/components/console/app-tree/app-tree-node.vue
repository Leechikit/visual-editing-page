<template>
  <collapse-transition>
    <!-- v-if="!(IsTargetTree&&(data.NodeType=='Field'||data.NodeType=='Association'))" -->
    <li :class="classes" v-show="visible" v-if="handleRenderTree">
      <div :style="mainstyles" v-show="data.display!=false">
        <span :class="[arrowClasses,{'ivu-tree-user' : data.NodeType=='User'}]" @click="handleExpand">
          <i class="ivu-icon" :class="{'icon-ewnwu' : data.NodeType=='User', 'ivu-icon-arrow-right-b' : data.NodeType!='User'}"></i>
        </span>
        <span class="ivu-tree-sheet" v-if="IsTargetTree && (data.NodeType=='AppMenu'||data.NodeType=='SubSheet')">
          <i class="ivu-icon" :class="{'icon-mainsheet' : data.NodeType=='AppMenu', 'icon-subsheet' : data.NodeType=='SubSheet'}"></i>
        </span>
        <Checkbox v-if="showCheckbox" :value="data.checked" :indeterminate="indeterminate" :disabled="data.disabled || data.disableCheckbox"
          @click.native.prevent="handleCheck"></Checkbox>
        <span :class="titleClasses" @click="handleSelect">
          {{ computedName }}
        </span>
      </div>

      <ul v-if="data.children && data.children.length>0">
        <app-tree-node v-for="item in data.children" :key="item.nodeKey" :data="item" :parentData="data" 
          :config="config" :visible="data.expand" :level="addLevel" :multiple="multiple"
          :show-checkbox="showCheckbox" :IsTargetTree="IsTargetTree">
        </app-tree-node>
      </ul>
    </li>
  </collapse-transition>
</template>
<script>
// import { Checkbox } from "iview";
import { CollapseTransition, Emitter, findComponentsDownward } from "./apptree";
import { getAppTreeOnAction } from "../../../service/getData";
import HTTP from "@/api/form.js"

const prefixCls = "ivu-tree";

export default {
  name: "AppTreeNode",
  mixins: [Emitter],
  components: {
    // Checkbox,
    CollapseTransition
  },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    parentData: {
      type: Object,
      default() {
        return {};
      }
    },
    config: {
      type: Object,
      default() {
        return {};
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    level: {
      type: [Number, String],
      default: 0
    },
    IsTargetTree: {
      //是否是目标表单树，选择目标表单
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      indeterminate: false,
      handleType: {
        //点击树节点类型
        expend: 0, //展开
        select: 1 //选中
      }
    };
  },
  computed: {
    handleRenderTree() {
      //判断是否渲染
      //1、计算公式选择目标表单 组织、角色不渲染 关联表单和数据项不渲染，子表渲染,
      if (this.IsTargetTree) {
        return !(
          this.data.NodeType == "Company" ||
          this.data.NodeType == "Post" ||
          this.data.NodeType == "Field" ||
          this.data.NodeType == "Association"
        );
      }
      return true;
    },
    classes() {
      let hasChild = "";
      if (this.data.children && this.data.children.length > 0)
        hasChild = `${prefixCls}-has-child`;
      return [`${prefixCls}-children`, "level" + this.level, hasChild];
    },
    mainstyles() {
      let paddingLeft = 12 * this.level + (Number(this.level)==1?7:6);
      let styles = {
        paddingLeft: paddingLeft + "px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      };
      return styles;
    },
    selectedCls() {
      return [
        {
          [`${prefixCls}-node-selected`]: this.data.selected
        }
      ];
    },
    arrowClasses() {
      return [
        `${prefixCls}-arrow`,
        {
          [`${prefixCls}-arrow-disabled`]: this.data.disabled,
          [`${prefixCls}-arrow-open`]: this.data.expand
          // ,
          // [`${prefixCls}-arrow-hidden`]: !(
          //   this.data.isParent ||
          //   this.data.HasChild ||
          //   (this.data.children && this.data.children.length)
          // )
        }
      ];
    },
    titleClasses() {
      return [
        `${prefixCls}-title`,
        {
          [`${prefixCls}-title-selected`]: this.data.selected
        }
      ];
    },
    addLevel() {
      let lev = Number(this.level) + 1;
      return lev + "";
    },
    computedName() {
      let name = "";
      if (Number(this.level) == 1 && this.data.NodeType == "SubSheet") {
        //目标表单是子表时，显示  表单.子表
        try {
          if (this.data.parentData.title) {
            name = this.data.parentData.title + "." + this.data.title;
          } else {
            name = this.data.title;
          }
        } catch (e) {
          name = this.data.title;
        }
      } else {
        name = this.data.title;
      }
      return name;
    }
  },
  methods: {
    handleExpand() {      
      if (this.data.disabled) return;
      this.$set(this.data, "expand", !this.data.expand);
      this.dispatch("Tree", "toggle-expand", this.data);
      if (this.data.isParent) {
        if (this.data.children && this.data.children.length == 0) {
          this.loadTreeNodeData(this.handleType.expend);
        }
      }
      if (!this.data.parentData) {
        this.data.parentData = this.parentData;
      }
    },
    handleSelect() {
      if (!this.data.parentData) {
        this.data.parentData = this.parentData;
      }
      if (this.IsTargetTree) {
        //选择目标表单时逻辑
        if (
          this.data.NodeType === "AppPackage" ||
          this.data.NodeType === "AppGroup"
        ) {
          this.handleExpand();
          return false;
        }
        //选择当前表单
        if (this.data.isParent) {
          if (this.data.children && this.data.children.length == 0) {
            this.loadTreeNodeData(this.handleType.select);
          } else {
            this.dispatch("appTree", "chooseSheet", this.data);
          }
        }
      } else {
        this.dispatch("appTree", "onclick", this.data);
      }
      if (this.data.disabled) return;
      if (this.data.selected) {
        this.data.selected = false;
      } else if (this.multiple) {
        this.$set(this.data, "selected", !this.data.selected);
      } else {
        this.dispatch("appTree", "selected", this.data);
      }
      this.dispatch("appTree", "on-selected");
    },
    handleCheck() {
      if (this.disabled) return;
      const checked = !this.data.checked;
      if (!checked || this.indeterminate) {
        findComponentsDownward(this, "TreeNode").forEach(
          node => (node.data.checked = false)
        );
      } else {
        findComponentsDownward(this, "TreeNode").forEach(
          node => (node.data.checked = true)
        );
      }
      this.data.checked = checked;
      this.dispatch("Tree", "checked");
      this.dispatch("Tree", "on-checked");
    },
    setIndeterminate() {
      this.indeterminate = this.data.checked
        ? false
        : findComponentsDownward(this, "TreeNode").some(
            node => node.data.checked
          );
    },
    async loadTreeNodeData(type) {
      let treeNode = this.data;
      var cf = {
        id: treeNode.id,
        NodeType: treeNode.NodeType,
        Code: treeNode.Code
      };
      let params = Object.assign({}, cf, this.config);
      if(params.NodeType=="Company"){
         HTTP.getOrganMembers(params.id).then((res)=>{
           this.data.children = res.ReturnData.ChildNode;

        })
      }
      if(params.NodeType=="SubSheet"){
        var tem ={}
        tem.subControlId = params.id
        tem.appId = params.CurSheetCode
        HTTP.getSubSheet(tem).then((res)=>{
          if(res.ReturnData)
          this.data.children = res.ReturnData.ChildNodes;
        })
      }
      // let res = await getAppTreeOnAction(params);
      // this.data.children = res.ReturnData.ChildNodes;
      //判断是否是选择目标表单
      if (
        this.IsTargetTree &&
        !(
          this.data.NodeType === "AppPackage" ||
          this.data.NodeType === "AppGroup"
        )
      ) {
        // let hasSubSheet = false;
        // for (let i = 0, len = this.data.children.length; i < len; i++) {
        //   if (this.data.children[i].NodeType == "SubSheet") {
        //     hasSubSheet = true;
        //     break;
        //   }
        // }
        if (type == this.handleType.select) {
          this.dispatch("appTree", "chooseSheet", this.data);
        }
      }
    }
  },
  created() {
    // created node.vue first, mounted tree.vue second
    if (!this.data.checked) this.$set(this.data, "checked", false);
    this.data.level = this.level;
  },
  mounted() {
    this.$on("indeterminate", () => {
      this.broadcast("TreeNode", "indeterminate");
      this.setIndeterminate();
    });
  }
};
</script>
<style lang='less'>
li {
  display: block;
}

.ivu-tree ul {
  font-size: 14px;
}

.ivu-tree li ul, .ivu-tree ul li {
  padding: 0;
  margin: 0;
}

li.ivu-tree-children:not(.ivu-tree-has-child), li.ivu-tree-has-child>div {
  height: 30px;
  line-height: 30px;
}

.ivu-tree-arrow-hidden {
  margin-left: -8px;

  i {
    display: none;
  }

  &+.ivu-tree-title {
    // padding-left: 15px;
  }
}

.icon-mainsheet, .icon-subsheet {
  color: #2d7fff;
}

.ivu-tree-arrow {
  margin-right: 6px;
}

.ivu-tree-title {
  width: 100px;
  height: 30px;
  line-height: 30px;
  padding: 0;
  word-break: keep-all;
}

.ivu-tree-arrow+.ivu-tree-title {
  margin-left: -6px;
}

.ivu-tree-arrow-hidden+.ivu-tree-title {
  margin-left: 2px;
}

.ivu-tree-user {
  margin-left: 0;
  margin-right: -1px !important;

  i {
    display: inline;
  }
}

.ivu-tree-user+.ivu-tree-title {
  padding-left: 0;
}

.ivu-tree-sheet {
  margin-left: -5px;
}

.ivu-tree-title:hover, .ivu-tree-title.ivu-tree-title-selected {
  background-color: transparent;
}

.ivu-tree-children:not(.ivu-tree-has-child):hover {
  background-color: #E8F4FE;
}

.icon-ewnwu, .ivu-tree-arrow-hidden i.icon-ewnwu {
  display: inline-block;
  font-size: 14px;

  &:before {
    color: #2d7fff;
  }
}

.ivu-icon-arrow-right-b {
  color: #797979;
}

.ivu-tree-arrow-open .ivu-icon-arrow-right-b {
  color: #2d7fff;
}
</style>



// WEBPACK FOOTER //
// src/components/console/app-tree/app-tree-node.vue