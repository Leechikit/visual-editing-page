<template>
    <div  class="tags-outer-scroll-con">
        <ButtonGroup style="margin-top:3px；left;margin:auto;">
            <Button @click="toRouter('workflow-design')">应用管理</Button>
            <Button @click="toRouter('organManager')">组织机构</Button>
            <Button @click="toRouter('roleIndex')">权限管理</Button>
        </ButtonGroup>
    </div>
</template>
<script>
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
export default {
    name: 'tagsPageOpened',
    data () {
        return {
            currentPageName: this.$route.name,
            tagBodyLeft: 0,
            refsTag: [],
            tagsCount: 1
        };
    },
    props: {

    },
    computed: {

    },
    methods: {
        toRouter(value){
              this.$router.push({
                  name: value
              });
        },

    }

};
</script>
