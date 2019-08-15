<template>
    <div id="JavaScriptCodeZone" v-show="showEditor">
        <MonacoEditor id="jsText" height="100%" language="javascript" 
        :code="jsCode" srcPath="static" :options="options" theme="vs" @mounted="onMounted">
        </MonacoEditor>
    </div>
</template>

<script type="text/ecmascript-6">
// import MonacoEditor from "vue-monaco-editor";
import MonacoEditor from "../monaco/Monaco";
export default {
  props: ["jsCode", "show", "showIndex"],
  data() {
    return {
      showEditor: true,
      options: {
        selectOnLineNumbers: true,
        mode: "javascript",
        fontIsMonospace: true,
        suggestOnTriggerCharacters: true,
        folding: true
      }
    };
  },
  created() {},
  methods: {
    initMonacoEditor() {},
    onMounted(editor) {
      this.editor = editor;
      this.showEditor = false;
      this.$emit('mounted',editor)
    },
    onCodeChange(editor) {
      //console.log(this.editor.getValue());
    }
  },
  watch: {
    showIndex() {
      if (this.showIndex == 2) {
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
#JavaScriptCodeZone {
  height: 100%;
}
</style>





// WEBPACK FOOTER //
// src/components/listviewdesigner/javascript-code-zone.vue