<template>
  <div class="assotable-box">
    <span v-for="item in values" :class="{'assotable':!isEmpty}" v-text="formatDisplayName(item.DisplayName)" @click="clickMethod(item)"></span>
    <span v-if="values.length <= 0">--</span>
  </div>
</template>
<script>
import { Modal } from "iview";
import HTTP from "@/api/form.js";
import assoModal from "@/views/home/assoModal.vue";

export default {
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  data() {
    return {};
  },
  computed: {
    values(){
      return this.rowData[this.field] ? this.rowData[this.field] : [];
    },
    isEmpty(){
      return this.rowData['isEmpty'] || this.values.length <= 0 ? true : false;
    }
  },
  created() {
  },
  methods: {
    // 获取显示名字
    formatDisplayName(displayName){
      return displayName && displayName.trim() ? displayName : "--";
    },
    // 点击事件
    clickMethod(obj) {
      console.log(obj);
      const boId = obj.ObjectId;
      if (boId && !this.isEmpty) {
          Modal.info({
            okText: "关闭",
            //scrollable:true,
            title: boId,
            width: "800px",
            maskClosable: true,
            render: h => {
            return h(assoModal, {
                props: {
                    code:boId
                },
                on: {}
            });
            },
            onOk: () => {}
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.assotable-box{
  display:inline-block;
}
.assotable {
  position: relative;
  padding-right: 8px;
  color: #37abfd;
  cursor: pointer;
  &:not(:only-child):not(:last-child){
    &::after{
      content:';';
      color: #333;
      position: absolute;
      right: 3px;
    }
  }
}
</style>

