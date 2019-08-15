<template>
    <div class="custom-btn" @click="goDocumentLib()">
        <!-- <Tooltip content="文件库" placement="bottom"> -->
            <Icon type="ios-paper-outline" :size="23" ></Icon>
            <span  class="custom-title">文件库</span>
        <!-- </Tooltip> -->
    </div>
</template>

<script>
export default {
    name: 'fullScreen',
    computed: {
    },
    methods: {
        goDocumentLib(){
          this.$router.push({
              name: 'document-lib'
          });
        }
      }
};
</script>
