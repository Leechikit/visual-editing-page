<template>
  <div class="appCollect">
    <div @click.stop="showAppList">
      <el-input
        size="small"
        v-model="appName"
        placeholder="请选择应用"
      ></el-input>
    </div>
    <div
      class="app-list"
      id="applist"
      v-loading="treeLoading"
      v-show="appListVisible"
    >
      <el-tree
        :props="moduleListFormat"
        :load="loadNode"
        lazy
        @node-click="selectApp"
      >
      </el-tree>
    </div>
  </div>
</template>
<script>
import HTTP_APPLY from '@/rebuild/api/app-apply.js'
export default {
  name: 'appCollect',
  props: {
    appId: {
      type: String
    },
    appName: {
      type: String
    }
  },
  data() {
    return {
      moduleList: [],
      appListVisible: false,
      moduleListFormat: {
        label: 'moduleName',
        children: 'zones',
        isLeaf: 'leaf'
      },
      treeLoading: false
    }
  },
  methods: {
    showAppList() {
      this.appListVisible = true
    },
    async loadNode(node, resolve) {
      var moduleList = []
      if (node.level === 0) {
        this.treeLoading = true
        try {
          let res = await HTTP_APPLY.getAllModule()
          if (res.code === '0') {
            moduleList = res.page.result
          } else {
            this.$message({
              message: 'error',
              type: 'error'
            })
          }
          this.treeLoading = false
          return resolve(moduleList)
        } catch (error) {
          this.$message({
            message: 'error',
            type: 'error'
          })
        }
      } else {
        try {
          let res = await HTTP_APPLY.appList2(node.data.id)
          if (res.code === '0') {
            res.page.result.forEach(item => {
              if (item.type === 'group' && item.children.length > 0) {
                item.children.forEach(app => {
                  if (app.type === 'app') {
                    app.moduleName = app.appName
                    app.leaf = true
                    moduleList.push(app)
                  }
                })
              } else if (item.type === 'app') {
                item.moduleName = item.appName
                item.leaf = true
                moduleList.push(item)
              }
            })
          } else {
            this.$message({
              message: 'error',
              type: 'error'
            })
          }
          return resolve(moduleList)
        } catch (error) {
          this.$message({
            message: 'error',
            type: 'error'
          })
        }
      }
    },
    selectApp(data) {
      if (data.type === 'app') {
        this.$emit('select', data)
      }
    }
  },
  created() {
    this.$nextTick(() => {
      document.onclick = () => {
        this.appListVisible = false
      }
      document.getElementById('applist').onclick = e => {
        e.stopPropagation()
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.appCollect {
  cursor: pointer;
  position: relative;
  .app-list {
    width: 100%;
    height: 300px;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 40px;
    z-index: 2;
    overflow-y: auto;
    background-color: #fff;
    border-width: 0 1px 1px;
    border-color: #ddd;
    border-style: solid;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}
</style>
