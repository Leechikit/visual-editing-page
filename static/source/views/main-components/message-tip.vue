<template>
    <div @click="showMessage" class="message-con">
        <Tooltip :content="value > 0 ? '有' + value + '条未读消息' : '无未读消息'" placement="bottom">
            <Badge :count="value" dot>
                <Icon type="ios-bell" :size="23" style="color:black!important" ></Icon>
            </Badge>
        </Tooltip>
    </div>
</template>

<script>
import util from '@/libs/util.js';
export default {
    name: 'messageTip',
    props: {

    },
    computed: {
        // 计算属性的 getter
        value: function () {
        // `this` 指向 vm 实例
            return this.$store.state.app.messageCount;
        }
     },
    methods: {
        showMessage () {
            util.openNewPage(this, 'message_index');
            this.$router.push({
                name: 'unfinish-job'
            });
        }

    }
};
</script>
