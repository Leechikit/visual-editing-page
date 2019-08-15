/**
* @name:  defaultValueSetting
* @description:  默认值设置组件
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
      <div
        slot="header"
        class="header"
      >
        <div
          class="selected"
          v-if="selectedOption.id"
        >
          <span>已选中默认值：</span>
          <div class="select-item">
            <span>{{selectedOption.name}}</span>
            <span
              class="btn-close"
              @click="clearSelectedOption"
            >
              <Icon type="close"></Icon>
            </span>
          </div>
        </div>
        <div
          class="unselected"
          v-else
        >请选择默认值</div>
      </div>
      <div class="defaultValueSetting">
        <div class="g-left">
          <div
            v-for="(obj,$index) in leftList"
            :key="$index"
          >
            <Tree
              class="tree-box"
              v-if="obj.type === 'tree'"
              :data="obj.data"
              :load-data="obj.expandHandle"
              @on-select-change="obj.selectHandle"
            ></Tree>
            <ul
              class="select-list"
              v-if="obj.type === 'list'"
            >
              <li
                class="select-item"
                :class="{'s-selected': item.id === selectedOption.id}"
                v-for="(item,$index) in obj.data"
                :key="$index"
                @click="selectNode(item)"
              >
                <Icon
                  type="android-checkbox-outline"
                  v-if="item.id === selectedOption.id"
                ></Icon>
                <Icon
                  type="android-checkbox-outline-blank"
                  v-else
                ></Icon>
                <span class="select-content">{{item.name}}</span>
              </li>
            </ul>
            <div
              v-if="obj.type === 'input'"
              class="select-item"
              :class="{'s-selected': obj.id === selectedOption.id}"
              @click="selectNode(obj)"
            >
              <Icon
                type="android-checkbox-outline"
                v-if="obj.id === selectedOption.id"
              ></Icon>
              <Icon
                type="android-checkbox-outline-blank"
                v-else
              ></Icon>
              <DatePicker
                class="select-content"
                type="datetime"
                v-model="obj.id"
                :format="obj.format"
                :placeholder="obj.placeholder"
                size="small"
                confirm
                style="width: 200px; color: #485c83;"
                @on-open-change="openDatePickerHandle(obj, $event)"
                @on-change="dateInputChangeHandle(obj)"
              ></DatePicker>
            </div>
          </div>
        </div>
        <div
          class="g-right"
          v-if="rightListVisible"
        >
          <ul class="select-list">
            <li
              class="select-item"
              :class="{'s-selected': item.id === selectedOption.id}"
              v-for="(item,$index) in rightList"
              :key="$index"
              @click="selectNode(item)"
            >
              <Icon
                type="android-checkbox-outline"
                v-if="item.id === selectedOption.id"
              ></Icon>
              <Icon
                type="android-checkbox-outline-blank"
                v-else
              ></Icon>
              <span class="select-content">{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import dateUtil from 'iview/src/utils/date'
import {
  GetChildDepartment,
  GetDepartmentUsers
} from "@/views/form/service/getData.js";
export default {
  name: 'defaultValueSetting',
  props: {
    properties: {
      default: {},
      type: Object
    }
  },
  data () {
    return {
      modalVisible: false, // 组件显示
      selectedOption: {}, // 选中项
      leftList: [], // 左侧列表数据
      rightList: [] // 右侧列表数据
    }
  },
  computed: {
    type () {
      return this.properties.type
    },
    // 是否显示右侧列表
    rightListVisible () {
      return this.type === 'user'
    }
  },
  created () {
    this.setDefaultValue()
    this.confirm()
    this.getData()
  },
  methods: {
    // 获取数据
    async getData () {
      let list = []
      if (this.type === 'user') {
        list = await this.getFormUserData()
      } else if (this.type === 'date') {
        list = await this.getFormDateTimeData()
      }
      this.leftList.push(...list)
    },
    // 设置默认值
    setDefaultValue () {
      if (this.properties) {
        this.selectedOption = {
          id: this.properties.id,
          name: this.properties.name
        }
      }
    },
    // 清空选中值
    clearSelectedOption () {
      this.selectedOption = {}
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
    // 选中值
    selectNode (node) {
      this.selectedOption = node
    },
    // 提交
    confirm () {
      this.$emit('confirm', this.selectedOption)
    },
    /* 人员单选控件相关 */
    // 获取人员单选默认值选项
    async getFormUserData () {
      let userList = []
      // 任务节点人员
      // userList.push({
      //   type: 'list',
      //   data: [{
      //     id: '{{currentApprovalUser}}',
      //     name: '当前任务审批人'
      //   }, {
      //     id: '{{createUser}}',
      //     name: '表单发起人'
      //   }]
      // })
      // 组织人员
      let obj = {
        type: 'tree',
        data: [],
        expandHandle: this.loadDepTreeData,
        selectHandle: this.selectDepNode
      }
      let result = await GetChildDepartment(0)
      if (result.code == 0) {
        let arrs = result.page.result;
        arrs.forEach(item => {
          obj.data.push(this.formatDepTree(item));
        });
      }
      userList.push(obj)
      return userList
    },
    // 格式化部门树结构数据
    formatDepTree (obj) {
      let result = {
        title: obj.name,
        id: obj.id
      }
      if (obj.HasChild === true) {
        result.children = []
        result.loading = false
      }
      return result
    },
    // 加载部门
    async loadDepTreeData (item, callback) {
      let result = await GetChildDepartment(item.id)
      let data = []
      if (result.code == 0) {
        let arrs = result.page.result;
        arrs.forEach(item => {
          data.push(this.formatDepTree(item));
        });
      }
      callback(data);
    },
    // 选择部门节点
    async selectDepNode (dep) {
      let result = await GetDepartmentUsers(dep[0].id, 10000000)
      let data = []
      if (result.code == 0) {
        let arrs = result.page.result;
        arrs.forEach(item => {
          data.push({
            name: item.DisplayName,
            id: item.id
          });
        });
        this.rightList = data
      }
    },
    /* 日期控件相关 */
    // 获取日期控件默认值选项
    async getFormDateTimeData () {
      // 任务节点时间
      let dateList = []
      dateList.push(
        // {
        //   type: 'list',
        //   data: [{
        //     id: '{{currentApprovalDate}}',
        //     name: '当前任务审批时间'
        //   }, {
        //     id: '{{createDate}}',
        //     name: '表单发起时间'
        //   }]
        // },
        {
          type: 'input',
          placeholder: '请选择日期时间',
          name: '',
          id: '',
          format: 'yyyy-MM-dd HH:mm'
        })
      return dateList
    },
    // 打开日期控件
    openDatePickerHandle (item, event) {
      if (event === true && item.id instanceof Date) {
        item.id = dateUtil.format(item.id, item.format)
      }
    },
    // 日期控件点击
    dateInputChangeHandle (item) {
      if (item.id instanceof Date) {
        item.id = item.name = dateUtil.format(item.id, item.format)
      }
    }
  },
}
</script>
<style lang="less" scoped>
.header {
  height: 24px;
  line-height: 24px;
  & > div {
    line-height: 24px;
  }
  .select-item {
    display: inline-block;
    background: #f4f8ff;
    border-radius: 3px;
    color: #4ba0fa;
    font-size: 14px;
    line-height: 24px;
    margin: 0 3px 3px 0;
    padding: 0 8px;
  }
  .btn-close {
    cursor: pointer;
    margin-left: 2px;
  }
}
.defaultValueSetting {
  display: flex;
  min-width: 500px;
  height: 250px;
  .g-left {
    flex-basis: 0%;
    flex-grow: 3;
    padding-right: 5px;
    overflow-y: auto;
  }
  .g-right {
    flex-basis: 0%;
    flex-grow: 2;
    padding-left: 5px;
    border-left: 1px solid #e9eaec;
    overflow-y: auto;
  }
  .tree-box {
    padding-left: 6px;
  }
  .select-item {
    line-height: 30px;
    height: 30px;
    padding-left: 10px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #eeeeee;
    }
    &.s-selected {
      background-color: #2d8cf0;
      color: #fff;
    }
    .select-content {
      margin-left: 8px;
    }
  }
}
</style>
