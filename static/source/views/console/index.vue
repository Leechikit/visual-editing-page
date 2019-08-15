<style scoped lang='less'>
    .layout2{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
    }
    
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .logo-con {
        padding: 8px;
        text-align: center;

        img {
            height: 44px;
            width: auto;
        }
    }
</style>
<template>
    <div class=" layout2">
        <Layout style="height:100%">
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <div  class="logo-con">
                    <img  src="./logo.png" key="max-logo">
                </div>
                <Menu active-name="interface" theme="dark" width="auto" :class="menuitemClasses" @on-select='selectMenu'>
                    <!-- <MenuItem name="interface">
                        <Icon type="ios-navigate"></Icon>
                        <span>接口管理</span>
                    </MenuItem> -->
                    <MenuItem name="ebj">
                        <Icon type="search"></Icon>
                        <span>定時任務</span>
                    </MenuItem>
                    <MenuItem name="sql">
                        <Icon type="settings"></Icon>
                        <span>sql監控</span>
                    </MenuItem>
                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout>
                <Header class="layout-header-bar">
                   <div style="float:right;margin-right:30px;font-size:30px;cursor: pointer;" @click="exit()"><Icon type="arrow-return-right" :size="20"></Icon></div>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '220px'}">
                    <elastic-job v-if="mark=='ebj'" style="height:100%;width:100%;marigin-left:220px"></elastic-job>
                    <!-- <interface-manage v-if="mark=='interface'"></interface-manage> -->
                    <iframe v-if="mark=='sql'" style="height:100%;width:100%" :src="url"></iframe>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import elasticJob from  "../elastic-job/index.vue"
import interfaceManage from  "../interface-manage/index.vue"
import Cookies from 'js-cookie';
    export default {

        data () {
            return {
                isCollapsed: false,
                mark:'ebj',
                url:'',
                size:"30px"

            };
        },
        components:{
            elasticJob,
            interfaceManage,
        },
        mounted(){
            this.url=window.location.hostname+':8090/druid/sql.html';
        },
        methods:{
            selectMenu(name){
                this.mark=name;
            },
            exit(){
                Cookies.set("consoleLogin",0);
                 this.$router.push({
                        name: 'consoleLogin'
                    });
            }
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    }
</script>
