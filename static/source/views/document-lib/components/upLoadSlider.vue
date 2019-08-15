<template>
    <div >
        <template>
    <Progress  v-if="uploadPercent<98" :stroke-width="5"></Progress>
    <Progress v-if="uploadPercent>=98&&uploadPercent<=100">
        <Icon type="checkmark-circled"></Icon>
        <span>上传成功</span>
    </Progress>
</template>
    </div>
</template>
<script>
import documentReq from '@/api/document.js'
import Cookies from 'js-cookie'
import documentFilter from '@/views/document-lib/components/documentFilter.js'
import axios from 'axios'
export default {
  name: 'document',
  data() {
    return {
      uploadPercent:0,
    }
  },
  methods: {

  },
  mounted() {
  
  },
  computed: {},
}
</script>
<style lang="less" scoped>
@import '../../styles/common.less';
@import 'components/table.less';
.folder-modal {
  top: 100px;
  overflow: auto;
  height: 350px;
  width: 500px;
}
.user-manage {
  height: calc(88vh);
  &__tree-container {
    margin-top: 100px;
    padding-left: 20px;
    height: 100%;
    overflow: auto;
    &--tree {
      margin-left: 20px;
    }
  }

  &--delete-organ {
    color: red;
    float: right;
    > span {
      margin-left: 8px;
    }
  }

  &--downLoad-organ-form {
    display: flex;
    align-items: center;
    padding: 15px 0 25px 0;
    > span {
      margin-right: 8px;
    }
    > div {
      position: relative;
      flex-grow: 1;
    }
  }

  &__content {
    min-height: 120%;
    border-left: 1px solid #dddee1;
    padding: 60px 40px 60px 40px !important;
    &--table {
      margin-top: 20px;
    }

    &--table-control {
      margin-top: 20px;
      overflow: hidden;
    }

    &--table-head {
      display: flex;
      align-items: center;
      background-color: rgba(242, 242, 242, 1);
      height: 39px;
      > span {
        margin-left: 18px;
      }
    }
  }

  &__content-head {
    overflow: hidden;
    &--breadcrumb {
      float: left;
    }
    &--edit-btn {
      margin-left: 20px;
      /deep/ span {
        font-size: 13px;
      }
    }
    &--handle-sync-btn {
      /deep/ span {
        font-size: 13px;
      }
      float: right;
    }
  }
}
.document-operate {
  height: 30px;
  vertical-align: top;
}
</style>
<style>
.ivu-table-title {
  height: 39px !important;
}
</style>

