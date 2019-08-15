<template>
    <div class="delUserRole">
        <Modal v-model="showFlag" :title="delTitle" @on-cancel="cancel" @on-ok="ok"
         width="410px" :loading="loading">
            <div class="modal-body">
                <p>
                    是否删除
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
import { RemoveRoleUser } from '../../api/role.js'   //引入删除角色用户接口

export default {
    props: [
        "showDelUserRoleFlag",
        "RoleId",
        "UserId",
        "delTitle",
        "removeAllUserIds",
        "removeAllOrgans"
    ],
    data() {
        return {
            loading: true,
            showFlag: false,
        }
    },
    watch: {
        showDelUserRoleFlag: function() {
            this.showFlag = this.showDelUserRoleFlag
        }
    },
    created: function() {
    },
    methods: {
        // 远程请求时，确定按钮出现loading圆圈
         _setLoading() {
            var _self = this
            setTimeout(() => {
                _self.loading = false;
                _self.$nextTick(() => {
                    _self.loading = true;
                })
            }, 1000)
        },
        // 删除角色用户
        async _RemoveRoleUser() {
            // 批量移除角色用户参数传递
            if(this.delTitle === "删除用户") {
                var res = await RemoveRoleUser("RemoveRoleUser", this.RoleId, this.UserId);
            }else{
                var res = await RemoveRoleUser("RemoveRoleUser", this.RoleId, this.removeAllUserIds, this.removeAllOrgans);
            }
            
            if (res.code === '0') {
                 this.$emit('getUserRoles', true)
            } else {
                // 获取数据失败
                $.IShowError(res.ErrorMessage);
            }
        },
        ok() {
            this._RemoveRoleUser()
            // 将点击确定之后的showModal 派发给父组件
            this.showFlag = false
            this.$emit('delUserRoleShowFlag')
            
        },
        cancel() {
            // 将点击取消之后的showModal 派发给父组件
            this.$emit('delUserRoleShowFlag')
        }
    }
}
</script>
