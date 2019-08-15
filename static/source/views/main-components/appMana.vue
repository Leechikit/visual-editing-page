<template>
    <div class="full-screen-btn-con" @click="goAppManager()">
        <Tooltip content="设置" placement="bottom">
            <Icon type="android-settings" :size="23" style="color:black!important"></Icon>
        </Tooltip>
    </div>
</template>

<script>
export default {
    name: 'fullScreen',
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        showFullScreenBtn () {
            return window.navigator.userAgent.indexOf('MSIE') < 0;
        }
    },
    methods: {
        goAppManager(){
          this.$router.push({
              name: 'workflow-design'
          });
        }
      }
};
</script>
