<template>
  <div class="home">
    <el-tree
      :data="treeNodes"
      :props="defaultProps"
      default-expand-all
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>
<script>
import API_PAGE from '@/api/page'
export default {
  name: 'home',
  data() {
    return {
      treeNodes: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    let domParser = new DOMParser()
    let template = domParser.parseFromString(
      API_PAGE.result.template,
      'text/html'
    )
    const body = template.querySelector('body')
    this.setTreeNodes(body)
  },
  methods: {
    setTreeNodes(node, parent = this.treeNodes) {
      if (node.children.length > 0) {
        Array.from(node.children).forEach((child, index) => {
          let obj = {
            label: child.tagName
          }
          if (node.children.length > 0) {
            obj.children = []
          }
          parent.push(obj)
          this.setTreeNodes(child, parent[index].children)
        })
      }
    },
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>
<style lang="scss">
</style>