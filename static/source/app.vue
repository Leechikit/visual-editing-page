<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                theme: this.$store.state.app.themeColor
            };
        },
        mounted () {
             if("\v"!=="v") {

                }
            else{
                alert("使用IE浏览器访问本系统会出现错误，请前往百度下载谷歌浏览器")
                }
        },
        beforeDestroy () {

        },
        methods: {

        }
    };
</script>

<style>
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 0
}
</style>
