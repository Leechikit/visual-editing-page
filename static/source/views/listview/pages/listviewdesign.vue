<template>
  <div id="listviewdesign">
      <designer-top-nav :title="getTitle" :schema-code="schemaCode" :app-code="appCode" :type="type"></designer-top-nav>
      <c-listview-design :tableData="tableData"></c-listview-design>
  </div>
</template>

<script>
import DesignerTopNav from "@/views/form/components/console/designer-top-nav";
import cListviewDesign from "../components/listview-design";
import {mapGetters,mapActions} from 'vuex';
import HTTP from '@/api/listview';

export default {
  name: "listviewdesign",
  components: {
    DesignerTopNav,
    cListviewDesign
  },
  data() {
    return {
      title: "",
      type: "workflow",
      schemaCode: "",
      SheetCode: "",
      appCode: "",
      appId: this.$router.currentRoute.query.appId,
      tableData:[
        {
          Name: "模拟数据"
        },
        {
          Name: "模拟数据"
        }
      ]
    };
  },
  computed:{
    ...mapGetters('listview',['getTitle'])
  },
  created() {
    this.loadListSetting({
      appId: this.appId
    });
    this.$store.commit('updateCurrentApp', this.$route.query);
  },
  methods: {
    ...mapActions("listview", ["setListSetting"]),
    loadListSetting({ appId }) {
      this.setListSetting({
        appId
      });
    }
  }
};
</script>

<style lang="less" scoped>
#listviewdesign {
  position: relative;
  left: 0;
  top: 0;
  height: 100%;
}
</style>
