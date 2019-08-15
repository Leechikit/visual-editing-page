<template>
  <div class="creatRole">
    <Modal
      v-model="showFlag"
      :title="isRoleGroup ? '删除角色组' : '删除角色'"
      :mask-closable="false"
      @on-cancel="cancel"
      @on-ok="ok"
      width="410px"
    >
      <div class="modal-body" style="padding: 54px 8px;">
        <p>
          确定删除
          <span style="color: #ed3f14;">
            {{RoleName}}{{isRoleGroup ? '及包含的所有角色' : ''}}
          </span>
          吗？
        </p>
      </div>
      <div slot="footer" class="bottom_btns">
        <Button type="error" @click="ok" :loading="loading">确定</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { RemoveRole, RemoveRoleGroup } from '@/api/role.js';

export default {
  props: [
    'showDelRoleFlag',
    'RoleId',
    'isRoleGroup',
    'RoleName'
  ],
  data () {
    return {
      loading: false,
      showFlag: false
    };
  },
  watch: {
    showDelRoleFlag () {
      this.showFlag = this.showDelRoleFlag;
    }
  },
  methods: {
    // 创建角色
    async _RemoveRole () {
      this.loading = true;
      let res = await RemoveRole('RemoveRole', this.RoleId);

      if (res.code === '0') {
        this.$emit('getAllRoles', true);
        this.showFlag = false;
        this.$emit('delRoleShowFlag');
      } else {
        // 获取数据失败
        this.$Message.error(res.msg);
      }
      this.loading = false;
    },
    // 创建角色
    async _RemoveRoleGroup () {
      this.loading = true;
      try {
        const res = await RemoveRoleGroup(this.RoleName);
        if (+res.code === 0) {
          this.$emit('getAllRoles', true);
          this.showFlag = false;
          this.$emit('delRoleShowFlag');
        } else {
          throw new Error(res.msg);
        }
      } catch (error) {
        this.$Message.error(error.message);
      } finally {
        this.loading = false;
      }
    },
    ok () {
      if (this.isRoleGroup) {
        this._RemoveRoleGroup();
      } else {
        this._RemoveRole();
      }
    },
    cancel () {
      // 将点击取消之后的showModal 派发给父组件
      this.$emit('delRoleShowFlag');
    }
  }
};
</script>


