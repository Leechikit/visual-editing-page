<template>
  <div class="creatRole">
    <Modal
      v-model="showFlag"
      title="新建角色"
      @on-cancel="cancel"
      :mask-closable="false"
      width="410px"
    >
      <div class="modal-body" style="padding: 54px 8px;">
        <Row style="display: flex; align-items: center;">
          <Col span="6">角色名称<span style="color: red;">*</span></Col>
          <Col span="18">
            <Input :maxlength="15" v-model="roleName" type="text" placeholder="输入新角色名称"></Input>
          </Col>
        </Row>
        <br>
        <Row style="display: flex; align-items: center;">
          <Col span="6">角色分组</Col>
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
import { CreateRole } from '../../api/role.js';

export default {
  props: [
    'showCreatRoleFlag',
    'SortKey',
    'RoleGroupList'
  ],
  data () {
    return {
      showFlag: false,
      roleName: '',
      roleGroup: '',
      currentSortKey: '',
      loading: false
    };
  },
  watch: {
    showCreatRoleFlag () {
      this.roleName = '';
      this.roleGroup = '';
      this.showFlag = this.showCreatRoleFlag;
    }
  },
  methods: {
    // 创建角色
    async confirm () {
      try {
        this.loading = true;
        const res = await CreateRole(this.roleName, this.roleGroup || undefined);
        if (+res.code === 0) {
          this.$emit('getAllRoles', true);
          this.showFlag = false;
          // 将点击确定之后的showModal 派发给父组件
          this.$emit('creatRoleShowFlag');
        } else {
          throw new Error(res.msg);
        }
      } catch (error) {
        this.$Message.error(error.message);
      } finally {
        this.loading = false;
      }
    },
    cancel () {
      // 将点击取消之后的showModal 派发给父组件
      this.$emit('creatRoleShowFlag');
    }
  }
};
</script>

