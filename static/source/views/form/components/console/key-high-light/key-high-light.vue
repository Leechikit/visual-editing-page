<template>
    <span v-html="html"></span>
</template>

<script>
export default {
  props: {
    words: { type: String, default: "" },
    keyword: { type: String, default: "" },
    color: {
      type: String,
      default: "#2d7fff"
    }
  },
  computed: {
    html() {
      let a=this.words.replace(
        this.keyword,
        '<span style="color:' + this.color + '">' + this.keyword + "</span >"
      );
      console.log(this.words+"||"+this.keyword+"||"+a);
      return this.words.replace(
        this.keyword,
        '<span style="color:' + this.color + '">' + this.keyword + "</span >"
      );
    }
  }
};
</script>


// WEBPACK FOOTER //
// src/components/console/key-high-light/key-high-light.vue