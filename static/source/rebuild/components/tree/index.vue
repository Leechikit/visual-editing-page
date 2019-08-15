<template>
  <div class="public-tree" :class="`public-tree-${nodeSize}`">
    <el-input
      v-if="filter"
      :placeholder="placeholder"
      size="small"
      prefix-icon="el-icon-search"
      v-model="filterText"
    ></el-input>
    <div class="public-tree__box">
      <div class="public-tree__box-con">
        <el-tree
          ref="tree"
          :data="data"
          :props="defaultProps"
          node-key="id"
          :default-expand-all="defaultExpandAll"
          :filter-node-method="filterNode"
          :expand-on-click-node="expandOnClickNode"
          :highlight-current="true"
          :default-expanded-keys="expandedKeys"
          :lazy="lazy"
          :load="lazyLoad"
          @node-click="nodeClick"
          :render-content="renderContent"
        >
          <span class="custom-tree-node" slot-scope="{ data: item }">
            <span>
              <i
                v-if="item.icon"
                class="iconfont"
                :class="item.icon"
                style="margin-right: 5px;"
              ></i>
              <span class="custom-tree-node__label">{{ item.label }}</span>
            </span>
            <span
              v-if="item.hasOwnProperty('value')"
              class="custom-tree-node__value"
            >
              {{ item.value }}
            </span>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @author baoanjie
 * @name 公共组件-Tree
 * @description 使用到的地方：我的工作、文件库、组织管理、权限管理
 * @example example.vue
 */
export default {
  name: 'Tree',
  props: {
    // 是否开启过滤
    filter: {
      type: Boolean,
      default: false
    },
    // 过滤输入框 placeholder
    placeholder: {
      type: String,
      default: '过滤'
    },
    // 数据，每个节点包括以下字段
    // id: 节点唯一标识
    // label: 节点文本
    // value: 节点右侧文本
    // leaf: 是否叶节点，用于懒加载是否显示展开箭头
    // icon: 节点文本左侧图标
    data: Array,
    // 默认不全展开
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 点击节点文本默认不展开，点击箭头展开
    expandOnClickNode: {
      type: Boolean,
      default: false
    },
    // 默认展开的节点
    defaultExpandedKeys: {
      type: Array,
      default() {
        return []
      }
    },
    // 当前选中的节点
    currentNodeKey: [Number, String],
    // 懒加载
    lazy: {
      type: Boolean,
      default: false
    },
    // 懒加载回调函数，参数(node, resolve)
    lazyLoad: {
      type: Function,
      default() {
        return function() {}
      }
    },
    // 点击节点回调函数，参数(data)
    nodeClick: {
      type: Function,
      default() {
        return function() {}
      }
    },
    // 节点尺寸: small, medium, large
    nodeSize: {
      type: String,
      default: 'large'
    },
    // 自定义节点内容 h, { node, data, store }
    renderContent: {
      type: Function
    }
  },
  mounted() {
    this.selectNode(this.currentNodeKey)
  },
  data() {
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      expandedKeys: this.defaultExpandedKeys
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    currentNodeKey(val) {
      this.selectNode(val)
    },
    data: {
      // 解决数据刷新导致选中状态失效
      handler() {
        this.$nextTick(() => {
          this.selectNode(this.currentNodeKey)
        })
      },
      deep: true
    },
    defaultExpandedKeys(val) {
      this.expandedKeys = val
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 选中节点
    selectNode(key) {
      this.$refs.tree.setCurrentKey(key)
      const node = this.$refs.tree.getNode(key)
      const parent = node && node.parent
      if (parent && parent.data) this.expandNode(parent.data.id)
    },
    // 选中并展开节点
    selectAndExpandNode(key) {
      this.$refs.tree.setCurrentKey(key)
      this.expandNode(key)
    },
    // 展开节点
    expandNode(key) {
      this.expandedKeys = [].concat(key)
    },
    // 删除节点
    removeNode(key) {
      this.$refs.tree.remove(key)
    },
    // 添加节点
    appendNode(data, parentKey) {
      this.$refs.tree.append(data, parentKey)
    },
    // 获取节点
    getNode(key) {
      return this.$refs.tree.getNode(key)
    }
  }
}
</script>

<style lang="scss" scoped>
.public-tree {
  background-color: #fff;

  &__box {
    overflow: auto;

    &-con {
      display: inline-block;
      min-width: 100%;
    }
  }
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;

  &__label {
    color: $color-normal;
    font-size: $font-size-main;
  }

  &__value {
    color: #b4b4b4;
    margin-left: 10px;
    font-size: $font-size-main;
  }
}
</style>

<style lang="scss">
.public-tree {
  .el-input--prefix .el-input__inner {
    padding-left: 30px !important;
  }

  &-small .el-tree-node__content {
    height: 26px;
  }

  &-medium .el-tree-node__content {
    height: 32px;
  }

  &-large .el-tree-node__content {
    height: 40px;
  }

  .el-tree {
    .el-tree-node__expand-icon {
      font-size: $font-size-main;
    }
    .el-tree-node.is-current {
      & > .el-tree-node__content {
        color: $color-main;
        background-color: rgba($color-main, 0.1);

        .custom-tree-node__value,
        .custom-tree-node__label {
          color: $color-main;
        }
      }
    }
  }
}
</style>
