<template>
    <div class="creatRole">
        <Modal v-model="showFlag" title="提示" @on-cancel="cancel" @on-ok="ok"
         width="410px">
            <div class="modal-body" style="padding: 54px 8px;">
                <p>
                    是否保存修改？
                </p>
            </div>
            <div slot="footer" class="bottom_btns">
                <a class="confirm" @click="ok">确定</a>
                <a class="cancel" @click="cancel">取消</a>
            </div>
        </Modal>
    </div>
</template>

<script>

export default {
    props: [
        "showSaveAclFlag"
    ],
    data() {
        return {
            showFlag: false,
        }
    },
    watch: {
        showSaveAclFlag: function() {
            this.showFlag = this.showSaveAclFlag;
        }
    },
    created: function() {
    },
    methods: {
        ok() {
            // 将点击确定之后的showModal 派发给父组件
            this.showFlag = false;
            this.$emit('closeSaveAclModal');
            this.$emit('confirmSaveAcl', true);
        },
        cancel() {
            this.showFlag = false;
            // 将点击取消之后的showModal 派发给父组件
            this.$emit('closeSaveAclModal');
            this.$emit('confirmSaveAcl', false);
        }
    }
}
</script>





// WEBPACK FOOTER //
// src/components/role/saveAcl.vue