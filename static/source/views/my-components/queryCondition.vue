<template>
  <div class="report-cond" v-if="qryStr && qryStr !== '[]'">
    <Row>
      <Form ref="formInline" inline>
        <FormItem
          v-for="(item, index) in query" 
          :key="item.index">
          <Input type="text" size="small"
            v-if="item.fieldType === '1' || item.fieldType === '2'"
            v-model="item.fieldValue"
            :placeholder="item.fieldAlias + fieldQryTypeObj[item.fieldQryType]" >
          </Input>
          <DatePicker type="date" size="small"
            v-if="item.fieldType === '3'"
            v-model="item.fieldValue"
            :placeholder="item.fieldAlias + fieldQryTypeObj[item.fieldQryType]"></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="ghost" @click="queryCond" size="small" icon="ios-search">查询</Button>
        </FormItem>
      </Form>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'queryCondition',
  data () {
    return {
      query: JSON.parse(this.qryStr || '[]'),
      fieldQryTypeObj: {
        1: '等于',
        2: '不等于',
        3: '大于等于',
        4: '小于等于',
        5: '包含'
      }
    };
  },
  props: {
    qryStr: {
      type: String
    },
    qryIndex: {
      type: Number
    }
  },
  methods: {
    queryCond () {
      let sqlQuery = this.query.map(q => ({...q}));
      // 做一些乱七八糟的校验,数字和日期类型需要转化
      sqlQuery = sqlQuery.filter(item => {
        if (item.fieldType === '1') {
          if (item.fieldValue && parseInt(item.fieldValue)) {
            item.fieldValue = parseInt(item.fieldValue);
            return true;
          } else {
            item.fieldValue = '';
            return true;
          }
        } else if (item.fieldType === '2') {
          if (item.fieldValue && item.fieldValue.trim()) {
            item.fieldValue = item.fieldValue.trim();
            return true;
          } else {
            item.fieldValue = '';
            return true;
          }
        } else if (item.fieldType === '3') {
          if (item.fieldValue) {
            item.fieldValue = item.fieldValue.getTime();
            return true;
          } else {
            item.fieldValue = '';
            return true;
          }
        }
      });
      // 返回图表index以及查询字段至父组件
      if (sqlQuery && sqlQuery.length > 0) {
        let obj = {index: this.qryIndex};
        let sqlValueMap = {};
        sqlValueMap[this.qryIndex] = sqlQuery;
        obj.sqlValueMap = JSON.stringify(sqlValueMap);
        this.$emit('query-condition', obj);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.report-cond{
  padding: 0 10px;
}
</style>

<style>
.report-cond .ivu-form-item{
  margin-bottom: 0;
}
.report-cond .ivu-input-small {
  max-width: 100px;
}
.report-cond .ivu-date-picker-editor .ivu-input-small {
  max-width: 120px;
}
/* 单列图表采用较宽的输入框 用于覆盖上面样式 */
.layout-only .ivu-input-small {
  max-width: 150px;
}
.layout-only .report-cond .ivu-date-picker-editor .ivu-input-small {
  max-width: 180px;
}
</style>


