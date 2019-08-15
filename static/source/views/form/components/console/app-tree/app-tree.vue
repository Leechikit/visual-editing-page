<template>
    <div :class="prefixCls">
        <Tree-node
            v-for="item in data"
            :key="item.nodeKey"
            :data="item"
            :config="config"
            visible
            :multiple="multiple"
            :show-checkbox="showCheckbox"
            level="1"
            :parentData="parentData"
            :IsTargetTree="IsTargetTree">
        </Tree-node>
        <div :class="[prefixCls + '-empty']" v-if="!data.length">{{ localeEmptyText }}</div>
    </div>
</template>
<script>
import TreeNode from "./app-tree-node.vue";
import { findComponentsDownward, Emitter } from "./apptree.js";

const prefixCls = "ivu-tree";

let key = 1;

export default {
  name: "appTree",
  mixins: [Emitter],
  components: { TreeNode },
  props: {
    data: {
      type: Array,
      default() {
        return [];
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
    emptyText: {
      type: String
    },
    IsTargetTree: {
      //是否是目标表单树
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: prefixCls
    };
  },
  created() {},
  computed: {
    localeEmptyText() {
      if (this.emptyText === undefined) {
        return "";
      } else {
        return this.emptyText;
      }
    }
  },
  methods: {
    getSelectedNodes() {
      const nodes = findComponentsDownward(this, "TreeNode");
      return nodes.filter(node => node.data.selected).map(node => node.data);
    },
    getCheckedNodes() {
      const nodes = findComponentsDownward(this, "TreeNode");
      return nodes.filter(node => node.data.checked).map(node => node.data);
    },
    updateData(isInit = true) {
      // init checked status
      function reverseChecked(data) {
        if (!data.nodeKey) data.nodeKey = key++;
        if (data.children && data.children.length) {
          let checkedLength = 0;
          data.children.forEach(node => {
            if (node.children) node = reverseChecked(node);
            if (node.checked) checkedLength++;
          });
          if (isInit) {
            if (checkedLength >= data.children.length) data.checked = true;
          } else {
            data.checked = checkedLength >= data.children.length;
          }
          return data;
        } else {
          return data;
        }
      }

      function forwardChecked(data) {
        if (data.children) {
          data.children.forEach(node => {
            if (data.checked) node.checked = true;
            if (node.children) node = forwardChecked(node);
          });
          return data;
        } else {
          return data;
        }
      }
      this.data
        .map(node => reverseChecked(node))
        .map(node => forwardChecked(node));
      this.broadcast("TreeNode", "indeterminate");
    }
  },
  mounted() {
    this.updateData();
    this.$on("selected", ori => {
      const nodes = findComponentsDownward(this, "TreeNode");
      nodes.forEach(node => {
        this.$set(node.data, "selected", false);
      });
      this.$set(ori, "selected", true);
    });
    this.$on("on-selected", () => {
      this.$emit("on-select-change", this.getSelectedNodes());
    });
    this.$on("checked", () => {
      this.updateData(false);
    });
    this.$on("on-checked", () => {
      this.$emit("on-check-change", this.getCheckedNodes());
    });
    this.$on("toggle-expand", payload => {
      this.$emit("on-toggle-expand", payload);
    });
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.updateData();
        this.broadcast("TreeNode", "indeterminate");
      });
    }
  }
};
</script>


// WEBPACK FOOTER //
// src/components/console/app-tree/app-tree.vue