<template>
  <div class="copyRole">
    <Modal
      v-model="showFlag"
      :title="'复制角色 ' + RoleName"
      @on-cancel="cancel"
      :mask-closable="false"
      width="410px"
    >
      <div class="modal-body">
        <Row class="notice">
          <i-col>注：新角色的配置权限与 {{RoleName}} 相同</i-col>
        </Row>
        <br>
        <Row style="display: flex; align-items: center;">
          <i-col span="6">新角色名称<span style="color: red;">*</span></i-col>
          <i-col span="18">
            <i-input v-model="copyRoleName" type="text" placeholder="输入新角色名称"></i-input>
          </i-col>
        </Row>
        <br>
        <Row style="display: flex; align-items: center;">
          <i-col span="6">角色分组</i-col>
          <i-col span="18">
            <Select v-model="roleGroup" clearable placeholder="选择分组，默认无分组">
              <Option
                v-for="item in RoleGroupList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </i-col>
        </Row>
      </div>
      <div slot="footer" class="bottom_btns">
        <Button
          type="primary"
          :disabled="!copyRoleName"
          :loading="loading"
          @click="confirm"
        >确定</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { CopyRole } from '../../api/role.js';

export default {
  props: [
    'showCopyRoleFlag',
    'allRoleData', // 所有角色数据
    'AdminRoleId', // 系统管理员角色ID
    'SortKey', // 所有角色长度
    'RoleId',
    'RoleName',
    'RoleGroupList'
  ],
  data () {
    return {
      loading: false,
      showFlag: false,
      currentSortKey: '',
      copyRoleName: '',
      selectedRoleId: '',
      roleGroup: ''
    };
  },
  watch: {
    showCopyRoleFlag () {
      this.copyRoleName = '';
      this.roleGroup = '';
      this.showFlag = this.showCopyRoleFlag;
    }
  },
  methods: {
    // 复制角色
    async confirm () {
      try {
        this.loading = true;
        const res = await CopyRole(this.RoleId, this.copyRoleName, this.roleGroup || undefined);
        if (+res.code === 0) {
          this.$emit('getAllRoles', true);
          this.showFlag = false;
          this.$emit('copyRoleShowFlag');
        } else {
          throw new Error(res.msg);
        }
      } catch (error) {
        this.$Message.error(error.message || '复制出错');
      } finally {
        this.loading = false;
      }
    },
    cancel () {
      // 将点击取消之后的showModal 派发给父组件
      this.$emit('copyRoleShowFlag');
    }
  }
};
</script>
