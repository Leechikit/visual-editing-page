<template>
  <div class="confirmDetele">
    <Modal
      v-model="modalVisible"
      width="360"
    >
      <p
        slot="header"
        style="color:#f60;text-align:center"
      >
        <Icon type="information-circled"></Icon>
        <span v-text="title"></span>
      </p>
      <div
        style="text-align:center"
        v-html="content"
      ></div>
      <div slot="footer">
        <Button
          type="error"
          size="large"
          long
          :loading="modal_loading"
          @click="del"
        >{{button}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
const DEFAULTSETTING = {
  title: '删除确认',
  content: '<p>是否确认删除？</p>',
  button: '删除'
}
export default {
  name: 'confirmDetele',
  data () {
    return {
      modalVisible: false,
      title: '',
      content: '',
      button: '',
      modal_loading: false,
      callback: () => { }
    }
  },
  methods: {
    showModal ({ title = DEFAULTSETTING.title, content = DEFAULTSETTING.content, button = DEFAULTSETTING.button, callback } = { ...DEFAULTSETTING }) {
      this.title = title
      this.content = content
      this.button = button
      this.modalVisible = true
      this.modal_loading = false
      if (typeof callback === 'function') {
        this.callback = callback
      }
    },
    async del () {
      let result = ''
      try {
        this.modal_loading = true
        result = await this.callback()
        this.title = DEFAULTSETTING.title
        this.content = DEFAULTSETTING.content
        this.button = DEFAULTSETTING.button
        this.$Message.success(result || '删除成功');
      } catch (error) {
        this.$Message.error(error || '删除失败');
        console.log(error)
      }
      this.modal_loading = false
      this.modalVisible = false
      
    }
  }
}
</script>
<style lang="less" scoped>
</style>
