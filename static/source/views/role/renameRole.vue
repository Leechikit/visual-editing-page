<template>
  <div class="renameRole">
    <Modal
      v-model="showFlag"
      :title="isRoleGroup ? '修改角色组' : '修改角色'"
      @on-cancel="cancel"
      :mask-closable="false"
      width="410px"
    >
      <div class="modal-body" style="padding: 54px 8px;">
        <Row style="display: flex; align-items: center;">
          <Col span="6">修改名称<span style="color: red;">*</span></Col>
          <Col span="18">
            <Input :maxlength="15" v-model="roleName" type="text" placeholder="输入角色新名称"></Input>
          </Col>
        </Row>
        <br>
        <Row v-if="!isRoleGroup" style="display: flex; align-items: center;">
          <Col span="6">修改分组</Col>
          <Col span="18">
            <Select v-model="roleGroup" clearable placeholder="选择分组，默认无分组">
              <Option
                v-for="item in RoleGroupList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <div slot="footer" class="bottom_btns">
        <Button
          type="primary"
          :disabled="!roleName"
          :loading="loading"
          @click="confirm"
        >确定</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { UpdateRoleName, UpdateRoleGroupName } from '../../api/role.js';

export default {
  props: [
    'showRenameRoleFlag',
    'RoleId',
    'isRoleGroup',
    'RoleName',
    'RoleGroupList',
    'RoleGroupId'
  ],
  data () {
    return {
      loading: false,
      showFlag: false,
      roleName: '',
      oldName: '',
      roleGroup: ''
    };
  },
  watch: {
    showRenameRoleFlag () {
      this.showFlag = this.showRenameRoleFlag;
      if (this.showRenameRoleFlag) {
        this.roleName = this.RoleName;
        this.oldName = this.RoleName;
        this.roleGroup = this.RoleGroupId;
      }
    }
  },
  methods: {
    // 修改角色名
    async _UpdateRoleName () {
      try {
        this.loading = true;
        const res = await UpdateRoleName(this.roleName, this.RoleId, this.roleGroup || undefined);
        if (+res.code === 0) {
          this.$emit('getAllRoles', true);
          // 将点击确定之后的showModal 派发给父组件
          this.showFlag = false;
          this.$emit('renameRoleShowFlag');
        } else {
          throw new Error(res.msg);
        }
      } catch (error) {
        this.$Message.error(error.message);
      } finally {
        this.loading = false;
      }
    },
    // 修改角色组名
    async _UpdateRoleGroupName () {
      try {
        this.loading = true;
        const res = await UpdateRoleGroupName(this.oldName, this.roleName);
        if (+res.code === 0) {
          this.$emit('getAllRoles', true);
          // 将点击确定之后的showModal 派发给父组件
          this.showFlag = false;
          this.$emit('renameRoleShowFlag');
        } else {
          throw new Error(res.msg);
        }
      } catch (error) {
        this.$Message.error(error.message);
      } finally {
        this.loading = false;
      }
    },
    confirm () {
      if (this.isRoleGroup) {
        this._UpdateRoleGroupName();
      } else {
        this._UpdateRoleName();
      }
    },
    cancel () {
      // 将点击取消之后的showModal 派发给父组件
      this.$emit('renameRoleShowFlag');
    }
  }
};
</script>
