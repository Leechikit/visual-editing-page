<template>
  <div class="creatRole">
    <Modal
      v-model="showFlag"
      title="新建角色组"
      @on-cancel="cancel"
      :mask-closable="false"
      width="410px"
    >
      <div class="modal-body" style="padding: 54px 8px;">
        <Row style="display: flex; align-items: center;">
          <Col span="6">角色组名称<span style="color: red;">*</span></Col>
          <Col span="18">
            <Input
              :maxlength="15"
              v-model="roleName"
              type="text"
              placeholder="输入角色组名称"
            ></Input>
          </Col>
        </Row>
      </div>
      <div slot="footer" class="bottom_btns">
        <Button
          type="primary"
          :loading="loading"
          :disabled="!roleName"
          @click="confirm"
        >确定</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { CreateRoleGroup } from '../../api/role.js';

export default {
  props: [
    'showCreatRoleGroupFlag',
    'SortKey'
  ],
  data () {
    return {
      showFlag: false,
      loading: false,
      roleName: ''
    };
  },
  watch: {
    showCreatRoleGroupFlag () {
      this.roleName = '';
      this.showFlag = this.showCreatRoleGroupFlag;
    }
  },
  methods: {
    async confirm () {
      try {
        this.loading = true;
        const res = await CreateRoleGroup(this.roleName);
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
      this.roleName = '';
      // 将点击取消之后的showModal 派发给父组件
      this.$emit('creatRoleShowFlag');
    }
  }
};
</script>

