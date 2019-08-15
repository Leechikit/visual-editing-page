<template>
    <div id="CsCodeZone" v-show="showEditor">
        <MonacoEditor id="csText" height="100%" language="alonesharp" srcPath="static" theme="vs" :code="csCode" :options="options" @mounted="onMounted">
        </MonacoEditor>
        <div class="vs-error-container">
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import MonacoEditor from "../monaco/Monaco";
import { baseUrl } from "../../config/env";

export default {
  props: ["csCode", "appCode", "schemaCode", "showIndex"],
  data() {
    return {
      showEditor: true,
      options: {
        selectOnLineNumbers: false,
        mode: "alonesharp",
        fontIsMonospace: true,
        suggestOnTriggerCharacters: true,
        folding: true
      }
    };
  },
  methods: {
    onMounted(editor) {
      this.editor = editor;
      let appCode = this.appCode;
      let fileName = this.schemaCode + "_ListViewController";
      window.aloneSharpEditConfigs = [];
      window.aloneSharpEditConfigs.push({
        editor: editor,
        data: {
          Url: baseUrl + "/codeeditor/OnAction",
          AppCode: appCode,
          FileName: fileName,
          errorContainer: $(".vs-error-container")
        }
      });
      this.showEditor = false;
      this.showEditor = false;
      this.$emit('mounted',editor);
    },
    onCodeChange(editor) {
      //console.log(this.editor.getValue());
    }
  },
  watch: {
    showIndex() {
      if (this.showIndex == 1) {
        this.showEditor = true;
      } else {
        this.showEditor = false;
      }
    }
  },
  components: { MonacoEditor }
};
</script>

<style>
#CsCodeZone {
  height: 100%;
}

.vs-error-container {
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  z-index: 99999999;
  background: gray;
  display: none;
}
</style>





// WEBPACK FOOTER //
// src/components/listviewdesigner/cs-code-zone.vue