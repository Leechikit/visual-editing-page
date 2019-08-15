<template>
  <div class="tree-example">
    <Tree
      ref="tree1"
      class="tree-instance"
      :data="data"
      :currentNodeKey="22"
      nodeSize="small"
    ></Tree>
    <Tree
      ref="tree2"
      class="tree-instance"
      :data="data"
      :filter="true"
      :defaultExpandAll="true"
      nodeSize="medium"
      :nodeClick="handleNodeClick"
    ></Tree>
    <Tree
      ref="tree3"
      class="tree-instance"
      :filter="true"
      :lazy="true"
      :lazyLoad="fetchChildren"
      :defaultExpandedKeys="expandKeys"
      :nodeClick="handleNodeClick"
    ></Tree>
    <div class="select-test">
      <el-button @click="select(92)">选中[五级 1-1-1]</el-button>
      <el-button @click="selectAE(5)">选中展开[二级 1-1]</el-button>
      <el-button @click="selectAE(9)">选中展开[三级 1-1-1]</el-button>
      <el-button @click="selectAE(91)">选中展开[四级 1-1-1]</el-button>
      <el-button @click="remove(21)">删除[二级 2-1]</el-button>
      <el-button @click="append(2)">为[一级 2]添加一个节点</el-button>
    </div>
  </div>
</template>

<script>
import Tree from './index'

export default {
  components: {
    Tree
  },
  data() {
    return {
      expandKeys: [],
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 5,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                  children: [
                    {
                      id: 91,
                      label: '四级 1-1-1',
                      children: [
                        {
                          id: 92,
                          label: '五级 1-1-1',
                          children: [
                            {
                              id: 93,
                              label: '六级 1-1-1',
                              children: [
                                {
                                  id: 931,
                                  label: '七级 1-1-1',
                                  children: [
                                    {
                                      id: 932,
                                      label: '八级 1-1-1',
                                      children: [
                                        {
                                          id: 933,
                                          label: '九级 1-1-1',
                                          value: 888
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 6,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          value: 99,
          icon: 'iconmoban',
          children: [
            {
              id: 21, // 节点唯一标识
              label: '二级 2-1', // 节点文本
              value: 66, // 节点右侧文本
              leaf: true, // 是否叶节点，用于懒加载是否显示展开箭头
              icon: 'iconmoban' // 节点文本左侧图标
            },
            {
              id: 22,
              label: '二级 2-2',
              value: 33,
              leaf: true,
              icon: 'iconmoban'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 31,
              label: '二级 3-1'
            },
            {
              id: 32,
              label: '二级 3-2'
            }
          ]
        },
        {
          id: 4,
          label: '一级 4',
          children: []
        }
      ]
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    fetchChildren(node, resolve) {
      if (node.level === 0) {
        this.expandKeys = [1, 2, 3, 4]
        return resolve(this.data)
      }
      console.log(node.data)
      setTimeout(() => {
        resolve(node.data.children || [])
      }, 500)
    },
    // 选中节点，若节点被折叠则展开其父节点，懒加载前无效
    select(id) {
      this.$refs.tree1.selectNode(id)
      this.$refs.tree2.selectNode(id)
      this.$refs.tree3.selectNode(id)
    },
    // 选中并展开节点，懒加载前仅支持逐级懒加载展开
    selectAE(id) {
      this.$refs.tree1.selectAndExpandNode(id)
      this.$refs.tree2.selectAndExpandNode(id)
      this.$refs.tree3.selectAndExpandNode(id)
    },
    remove(key) {
      this.$refs.tree3.removeNode(key)
    },
    append(key) {
      this.$refs.tree3.appendNode(
        {
          id: 23,
          label: '二级 2-3',
          value: 33,
          leaf: true,
          icon: 'iconmoban'
        },
        key
      )
    }
  }
}
</script>

<style scoped>
.tree-example {
  display: flex;
  background-color: #fff;
}

.tree-instance {
  width: 200px;
  padding: 10px;
  border-right: 1px solid #eee;
}

.select-test {
  width: 200px;
  padding: 10px;
}
</style>
