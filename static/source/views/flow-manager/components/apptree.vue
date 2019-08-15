<template>
  <Tree class="app-tree" ref="appTree" :data="appTree" :load-data="loadAppTree" @on-select-change="getCheckedApp"></Tree>
</template>
<script>
  import { getAppTreeOnAction } from "@/views/home/back-index/getData"

  export default {
    data() {
      return {
        appTree: []
      };
    },
    methods: {
      loadAppTree(item, callback) {
        let transformData = function(nodes) {
          let list = []
          if (nodes && nodes.length) {
            nodes.forEach(node => {
              let _node = {
                id: node.id,
                title: node.title
              }
              if(node.NodeType === 'AppGroup') {
                _node.loading = false
                _node.children = []
                _node.disableCheckbox = true
              }
              list.push(_node)
            })
          }
          return list
        }
        let param = {}
        if (item) {
          param = {
            id: item.id,
            NodeType: 'AppGroup'
          }
        }
        if(sessionStorage.getItem("currentAppType")=="op"){
          param.source='op'
        }
        getAppTreeOnAction(param).then(res => {
          if (!item) {
            this.appTree = transformData(res.ReturnData.ChildNodes)
          } else {
            callback(transformData(res.ReturnData.ChildNodes))
          }
        })
      },
      getCheckedApp() {
        let nodes = this.$refs.appTree.getSelectedNodes()
        let apps = []
        nodes.forEach(node => {
          if(node.disableCheckbox==undefined){
             apps.push({
              title: node.title,
              id: node.id
            })
          }
          else if (!node.disableCheckbox) {
            apps.push({
              title: node.title,
              id: node.id
            })
          }
          else{
            
          }
        })
        this.$emit('input', apps)
      },
    },
    mounted() {
      this.loadAppTree();
    }
  }
</script>
<style lang="less" scoped>
    .app-tree {
      /deep/ .ivu-tree-title {
        vertical-align: baseline;
      }
    }
</style>