/**
* @name:  interfaceOptions
* @description:  接口选择组件
* @author: lizijie
* @update:
*/
<template>
  <div v-if="modalVisible">
    <Modal
      v-model="modalVisible"
      title=" "
      ref="modal"
      :mask-closable="false"
      @on-cancel="cancel"
      @on-ok="confirm"
    >
      <p
        slot="header"
        class="header"
      >
        <span
          class="selected"
          v-if="selectedInterface"
        >已选中接口：{{selectedInterface.name}}</span>
        <span
          class="unselected"
          v-else
        >请点击选择接口</span>
      </p>
      <div class="interfaceOptions">
        <Input
          v-model="searchVal"
          class="searchInput"
          placeholder="查询接口"
        >
          <Button
            slot="append"
            icon="ios-search"
            @click="search"
          ></Button>
        </Input>
        <div class="interfaceCon">
          <Spin
            size="large"
            v-show="isLoading"
            fix
          ></Spin>
          <ul
            class="interfaceList"
            v-show="!isLoading"
          >
            <li
              v-for="item in interfaceList"
              :key="item.id"
              class="interfaceItem"
              :class="{'s-selected': item.id === selectedInterface.id}"
              @click="select(item)"
            >
              <Icon
                type="android-checkbox-outline"
                v-if="item.id === selectedInterface.id"
              ></Icon>
              <Icon
                type="android-checkbox-outline-blank"
                v-else
              ></Icon>&nbsp;
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>

        <Page
          :current="pageNum"
          :total="totalCount"
          simple
          style="text-align:center;"
          @on-change="changePageNum"
        />
      </div>
    </Modal>
  </div>
</template>
<script>
import HTTP_INTERFACE from '@/api/interface.js'

export default {
  props: {
    properties: {
      default: {},
      type: Object
    }
  },
  data () {
    return {
      modalVisible: false, // 组件显示
      selectedInterface: '', // 选中接口
      totalCount: 11, // 总条数
      pageNum: 1, // 页数
      pageSize: 10, // 每页展示条数
      isLoading: true, // 加载loading
      searchVal: '', // 查询值
      interfaceList: [] // 列表数据
    }
  },
  async created () {
    await this.getData()
    this.setDefaultValue()
    this.confirm()
  },
  methods: {
    // 获取数据
    async getData () {
      const result = await HTTP_INTERFACE.get({
        page: this.pageNum,
        count: this.pageSize,
        name: this.searchVal
      })
      if (+result.code === 0) {
        this.interfaceList = result.datas.records
        this.totalCount = result.datas.total
        this.isLoading = false
      }
    },
    // 设置默认值
    setDefaultValue () {
      if (this.properties) {
        const filterArrs = this.interfaceList.filter(item => {
          return +item.id === +this.properties.id
        })
        if (filterArrs && filterArrs.length > 0) {
          this.selectedInterface = filterArrs[0]
        }
      }
    },
    // 选择
    select (value) {
      this.selectedInterface = value
    },
    // 显示
    show () {
      this.modalVisible = true
      this.setDefaultValue()
    },
    // 隐藏
    cancel () {
      this.modalVisible = false
    },
    // 查询
    search () {
      this.getData()
    },
    // 切换页码
    changePageNum (num) {
      this.pageNum = num
      this.getData()
    },
    // 提交
    confirm () {
      this.$emit('confirm', this.selectedInterface)
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  .selected {
    font-size: 14px;
  }
  .unselected {
    color: #999;
  }
}
.interfaceOptions {
  color: #222;
}
.searchInput {
  margin-bottom: 10px;
}
.interfaceCon {
  height: 300px;
  overflow: hidden;
  position: relative;
}
.interfaceItem {
  line-height: 30px;
  height: 30px;
  padding-left: 10px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
  &.s-selected {
    background-color: #2d8cf0;
    color: #fff;
  }
}
</style>
