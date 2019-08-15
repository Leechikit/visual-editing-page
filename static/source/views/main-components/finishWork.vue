<template>
    <div class="full-screen-btn-con" @click="goAppManager()">
        <Tooltip content="已办" placement="bottom">
            <Icon type="briefcase" :size="23" style="color:black!important"></Icon>
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
              name: 'finish-job'
          });
        }
      }
};
</script>
