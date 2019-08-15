<template>
  <div class="appCollect">
    <div @click="showAppList">
      <Input
        class="app-input"
        v-model="modelValue"
        placeholder="请选择应用"
      ></Input>
    </div>
    <div
      class="app-list"
      ref="appList"
      v-if="appListVisible && moduleListFormat.length > 0"
    >
      <Tree
        :data="moduleListFormat"
        :loadData="loadAppList"
        @on-select-change="selectApp"
      ></Tree>
    </div>
  </div>
</template>
<script>
import HTTP_APP from '@/api/app-apply.js'
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
  data () {
    return {
      modelValue: '',
      moduleList: [],
      appListVisible: false,
      data1: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    moduleListFormat () {
      return this.moduleList.map(module => {
        return {
          type: 'module',
          title: module.moduleName,
          id: module.id,
          loading: false,
          children: []
        }
      })
    }
  },
  watch: {
    appListVisible (val) {
      if (val === true) {
        document.addEventListener('click', this.closeAppListEvent)
        this.getMoudleList()
      } else if (val === false) {
        document.removeEventListener('click', this.closeAppListEvent)
      }
    },
    appId(){
      this.modelValue = this.appName
    }
  },
  methods: {
    async getMoudleList () {
      try {
        this.moduleList = []
        let res = await HTTP_APP.getAllModule()
        if (res.code === '0') {
          this.moduleList = res.page.result
        } else {
          this.$Message.error({
            content: res.msg
          });
        }
      } catch (error) {
        console.log(error)
        this.$Message.error({
          content: '获取数据失败'
        });
      }
    },
    showAppList () {
      this.appListVisible = true
    },
    closeAppListEvent (event) {
      const appListEl = this.$refs.appList
      if (appListEl && !appListEl.contains(event.target)) {
        this.appListVisible = false
      }
    },
    // 加载应用列表
    async loadAppList (module, callback) {
      let result = []
      const appList = await this.getAppList(module.id);
      appList.forEach(item => {
        if (item.type === 'group' && item.children.length > 0) {
          item.children.forEach(app => {
            if (app.type === 'app') {
              result.push(app)
            }
          })
        } else if (item.type === 'app') {
          result.push(item)
        }
      })
      result = result.map(app => {
        return {
          appId: app.appId,
          title: app.appName,
          type: 'app'
        }
      })
      callback(result)
    },
    async selectApp (selectArr) {
      if (!selectArr || selectArr.length < 1) return
      const selectItem = selectArr[0]
      if (selectItem.type === 'module') {
        selectItem.selected = false
      } else if (selectItem.type === 'app') {
        this.$emit('select', selectItem)
        this.appListVisible = false
      }
    },
    async getAppList (moduleId) {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await HTTP_APP.appList2(moduleId)
          if (res.code === '0') {
            return resolve(res.page.result)
          } else {
            this.$Message.error({
              content: res.msg
            });
          }
        } catch (e) {
          console.log(e)
          this.$Message.error({
            content: '获取数据失败'
          });
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.appCollect {
  cursor: pointer;
  position: relative;
  .app-input {
    pointer-events: none;
  }
  .app-list {
    width: 100%;
    height: 300px;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 32px;
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
