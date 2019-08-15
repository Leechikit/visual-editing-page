<template>
  <div class="report-sql-config-form-item-content">
    <Select
      v-if="choices.length === 0 || multiple"
      :value="choices"
      @on-change="$emit('change', $event)"
      multiple
      placement="bottom"
      style="width:200px"
    >
      <OptionGroup
        v-for="app in apps"
        :key="app.id"
        :label="app.title"
      >
        <Option
          v-for="item in app.children"
          :value="app.id + '#' + item.id"
          :key="app.id + '#' + item.id"
        >{{ item.title }}</Option>
      </OptionGroup>
    </Select>
    <Tag
      v-if="choices.length !== 0 || multiple"
      v-for="item in choiceTags"
      :key="item.id"
      :fade="false"
      :name="item.id"
      color="green"
      type="border"
      closable
      @on-close="$emit('closeTag', item.id)"
    >{{ item.title }}</Tag>
  </div>
</template>

<script>
export default {
  name: 'FormItemContent',
  model: {
    prop: 'controls',
    event: 'change'
  },
  props: {
    controls: Array,
    apps: Array,
    multiple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    choices () {
      return this.controls;
    },
    choiceTags () {
      const tags = this.choices.map(choice => {
        const [appId, controlId] = choice.split('#');
        const app = this.apps.find(item => item.id === appId);
        const control = app.children.find(item => item.id === controlId);
        return {
          id: choice,
          title: `${app.title} . ${control.title}`,
          appId,
          controlId
        };
      });
      return tags;
    }
  }
};
</script>

<style>
.report-sql-config-form-item-content {
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
}
</style>
