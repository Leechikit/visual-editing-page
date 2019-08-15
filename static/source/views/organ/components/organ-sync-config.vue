<template>
  <Modal
    v-model="visible"
    title="配置定时自动同步组织机构"
    :loading="loading"
    @on-ok="confirm"
  >
    <div>开启定时自动同步: <i-switch v-model="status"></i-switch></div>
    <br>
    <div v-if="status">
      每
      <InputNumber
        size="small"
        :max="365"
        :min="1"
        v-model="days"
        placeholder="必填"
      ></InputNumber>
      天同步一次，同步时间: 
      <TimePicker
        v-model="time"
        size="small"
        format="HH:mm:ss"
        placeholder="必填"
        style="width: 100px"
    ></TimePicker>
    </div>
    <Spin v-if="spin" fix></Spin>
  </Modal>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      loading: true,
      spin: false,
      status: false,
      days: 2,
      time: '03:00:00'
    };
  },
  methods: {
    show () {
      this.visible = true;
      this.status = false;
      this.spin = true;
      setTimeout(() => {
        this.status = true;
        this.spin = false;
      }, 1000);
    },
    confirm () {
      setTimeout(() => {
        this.visible = false;
      }, 1000);
    }
  }
};
</script>
