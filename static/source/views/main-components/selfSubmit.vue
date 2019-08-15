<template>
    <div class="full-screen-btn-con" @click="goAppManager()">
        <Tooltip content="我的提交" placement="bottom">
            <Icon type="person" :size="23" style="color:black!important"></Icon>
        </Tooltip>
    </div>
</template>

<script>
export default {
    name: 'fullScreen',
    computed: {
    },
    methods: {
        goAppManager(){
          this.$router.push({
              name: 'self-submit'
          });
        }
      }
};
</script>
