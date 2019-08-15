<template>
  <div class="query-item">
    <label class="query-left" for="" v-text="displayName"></label>
    <span class="query-right">
      <Input v-if="queryType === 'text'" :readonly="readonly" :value="value" @on-change="change($event.target.value)"></Input>
      <Input v-if="queryType === 'number'" type="number" :readonly="readonly" :value="value" @on-change="change($event.target.value)" style="width:100%"></Input>
      <DatePicker v-if="queryType === 'date'" :readonly="readonly" type="date" :value="value" @on-change="change" style="width:100%"></DatePicker>
      <Select v-if="queryType === 'select'" :readonly="readonly" multiple :value="value" @on-change="change" placeholder="">
        <Option v-for="(item, $index) in optionalArrs" :value="item" :key="$index">{{ item }}</Option>
      </Select>
      <!-- <Input v-if="queryType === 'user' || queryType === 'multiUser'" :readonly="readonly" :value="value" @on-change="change($event.target.value)"></Input> -->
      <user-panel v-if="queryType === 'user' || queryType === 'multiUser'" :readonly="readonly" type="user" @on-change="change"></user-panel>
      <user-panel v-if="queryType === 'dep' || queryType === 'multiDep'" :readonly="readonly" type="dep" @on-change="change"></user-panel>
      <CheckboxGroup v-if="queryType === 'checkbox'" size="large" v-model="checkbox" @on-change="change">
        <Checkbox :label="true" :disabled="readonly">
            <span>是</span>
        </Checkbox>
        <Checkbox :label="false" :disabled="readonly">
            <span>否</span>
        </Checkbox>
      </CheckboxGroup>
    </span>
  </div>
</template>
<script>
import userPanel from "./userPanel.vue";
export default {
  components: {
    userPanel
  },
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number
    },
    displayName: {
      type: String
    },
    optionValue: {
      type: String
    },
    unitType: {
      type: Number
    },
    value: {
      type: [String, Number, Date, Array]
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  data() {
    return {
      checkbox: []
    };
  },
  computed: {
    queryType() {
      let type = "text";
      switch (+this.type) {
        case 14: // 单行文本
          type = "text";
          // 单选、多选、下拉框
          if (this.optionValue) {
            type = "select";
          }
          break;
        case 13: // 多行文本
          type = "text";
          break;
        case 5: // 日期
          type = "date";
          break;
        case 7: // 数字
          type = "number";
          break;
        case 26:
          // 部门单选
          if (+this.unitType === 2) {
            type = "dep";
            // 人员单选
          } else if (+this.unitType === 4) {
            type = "user";
          }
          break;
        case 27:
          // 部门多选
          if (+this.unitType === 2) {
            type = "multiDep";
            // 人员多选
          } else if (+this.unitType === 4) {
            type = "multiUser";
          }
          break;
        case 1: // 是否
          type = "checkbox";
          break;
        default:
          type = "text";
          break;
      }
      return type;
    },
    optionalArrs() {
      let arrs = [];
      if (this.optionValue && typeof this.optionValue === "string") {
        arrs = JSON.parse(this.optionValue);
      }
      return arrs;
    }
  },
  methods: {
    change(value) {
      // 志亮要求：单选、多选、下拉框、是否 要 数组转字符串传
      if(value instanceof Array && (this.queryType === "select" || this.queryType === "checkbox")) {
        value = value.join(';');
      }
      this.$emit("change", value);
    }
  }
};
</script>
<style lang="less" scoped>
.query-item {
  .query-left {
    width: 80px;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .query-right {
    display: block;
    margin-left: 80px;
    margin-right: 40px;
  }
}
</style>
