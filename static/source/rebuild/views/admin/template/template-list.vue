<template>
  <div class="templateList">
    <div class="g-container-column">
      <div class="g-header u-bd-bottom">
        <PageTitle :text="title"></PageTitle>
      </div>
      <div class="g-main u-pd-20-20">
        <TemplateListHeader
          ref="templateListHeader"
          @changeSearchParams="changeSearchParams"
          @createTemplate="createTemplate"
        ></TemplateListHeader>
        <TemplateListTable :searchParams="searchParams"></TemplateListTable>
      </div>
    </div>
  </div>
</template>
<script>
import PageTitle from '@/rebuild/components/pageTitle'
import TemplateListHeader from './template-list-header'
import TemplateListTable from './template-list-table'

export default {
  name: 'templateList',
  components: {
    PageTitle,
    TemplateListHeader,
    TemplateListTable
  },
  data() {
    return {
      title: '模板中心',
      searchParams: {}
    }
  },
  methods: {
    createTemplate() {
      this.$router.push({
        name: 'template-form'
      })
    },
    changeSearchParams() {
      this.searchParams = {
        templateName: this.$refs.templateListHeader.templateName,
        categoryId: this.$refs.templateListHeader.categoryId[1]
      }
      console.log(this.searchParams)
    }
  }
}
</script>
<style lang="scss" scoped></style>
