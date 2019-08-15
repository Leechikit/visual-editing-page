import { mapState, mapMutations } from 'vuex'
import { validateForm } from '@/rebuild/helper/validate-helper'

export default {
  computed: {
    ...mapState(['controls']),
    ...mapState('childControls', ['childMap', 'defaultChildMap']),
    list() {
      const renderList = []
      let subList = []
      let flag = false
      this.controls.list.forEach((item, index) => {
        item.controlListIndex = index
        if ((item.expand && flag) || (!item.expand && !flag)) {
          subList.push(item)
        } else {
          flag = item.expand
          renderList.push(subList)
          subList = [item]
        }
      })
      renderList.push(subList)
      return renderList
    }
  },
  methods: {
    // 初始化
    async init() {
      try {
        this.setControls([])
        const applyInfo = await this.getData()
        this.getControls(applyInfo)
      } catch (error) {
        // 增加提示
        console.log(error)
      }
    },
    // 生成控件数组
    getControls(applyInfo) {
      let _fieldsCollection = applyInfo.ReturnData.ResponseContext.ReturnData
      let _associatedBoNames =
        applyInfo.ReturnData.ResponseContext.AssociatedBoNames
      let _RTFData = applyInfo.ReturnData.ResponseContext.RTFData
      let _createTime = applyInfo.createTime
      let _htmlString = applyInfo.ReturnData.RuntimeContent
      let _parser = new DOMParser()
      let _doc = _parser.parseFromString(_htmlString, 'text/html')
      let _sheetControls = Array.from(
        _doc.querySelectorAll('.page-header, .col-md-6, .sheet-control')
      )
      let _list = []
      _sheetControls.forEach(control => {
        if (_fieldsCollection[control.dataset.datafield]) {
          if (control.dataset.datafield === 'CreatedBy.FullName') {
            control.dataset.controlkey = 'CreatedBy'
            control.dataset.datafield = 'CreatedBy'
          }
          if (control.dataset.ismappingproperty === 'true') {
            control.dataset.controlkey = 'FormTextBox'
          }
          switch (control.className) {
            // 分组标题
            case 'page-header':
              _list.push({
                controlkey: 'FormHeader',
                Value: control.querySelector('strong').innerText,
                isDisplay: true // 隐藏条件计算是否是显示
              })
              break
            // 描述说明
            case 'page-header page-describle':
              _list.push({
                controlkey: 'FormDescrible',
                Value: control.querySelector('strong').innerText,
                isDisplay: true // 隐藏条件计算是否是显示
              })
              break
            default: {
              let _dataset = _fieldsCollection[control.dataset.datafield]
              _list.push(
                Object.assign(
                  {
                    // 展开收起
                    expand: control.parentNode.parentNode.className.includes(
                      'expand-layout-comps'
                    ),
                    // 展开收起标题
                    expandTitle:
                      control.parentNode.parentNode.parentNode.getAttribute &&
                      control.parentNode.parentNode.parentNode.getAttribute(
                        'expand-title'
                      ),
                    // 一行两列
                    columnTwo: control.parentNode.className.includes(
                      'col-md-6'
                    ),
                    isDisplay: true // 隐藏条件计算是否是显示
                  },
                  control.dataset,
                  _dataset
                )
              )
            }
          }
          // 分组标题
        } else if (control.className === 'page-header') {
          _list.push({
            controlkey: 'FormHeader',
            Value: control.querySelector('strong').innerText,
            Visible: true,
            textAlign: control.style.textAlign,
            isDisplay: true // 隐藏条件计算是否是显示
          })
          // 描述说明
        } else if (control.className === 'page-header page-describle') {
          _list.push({
            controlkey: 'FormDescrible',
            Value: control.querySelector('strong').innerText,
            Visible: true,
            textAlign: control.style.textAlign,
            isDisplay: true // 隐藏条件计算是否是显示
          })
        }
      })

      // this.setAssociatedBoNames(_associatedBoNames)
      // this.setRTFData(_RTFData)
      // this.setCreateTime(_createTime)
      // this.setSheetControls(_sheetControls)
      this.setControls(_list)
      // 获取控件计算公式
      this.setComputationRule(_list)
      // 获取控件隐藏条件
      this.setDisplayRule(_list)
    },
    handleInput(index, event) {
      this.$set(this.controls.list[index], 'Value', event)
      this.setControls(this.controls.list)
    },
    bindGetValueFn(index, event) {
      this.$set(this.controls.list[index], 'getValue', event)
      this.setControls(this.controls.list)
    },
    bindSetValueFn(index, event) {
      if (event) {
        this.$set(this.controls.list[index], 'setValue', event)
        this.setControls(this.controls.list)
      }
    },
    // 获取表单数据
    getFormData() {
      let formData = {}
      this.controls.list.forEach(control => {
        if (
          control.getValue &&
          typeof control.getValue === 'function' &&
          control.Type !== 52 &&
          control.Type !== 53
        ) {
          formData[control.datafield] = control.getValue()
        }
      })
      for (let datafield in this.childMap) {
        if (datafield.indexOf('.expand') < 0) {
          const controlMap = this.childMap[datafield]
          formData[datafield] = []
          for (let objectId in controlMap) {
            let obj = {}
            obj['ObjectId'] = objectId
            controlMap[objectId].forEach(control => {
              if (
                control.getValue &&
                typeof control.getValue === 'function' &&
                control.Type !== 52 &&
                control.Type !== 53
              ) {
                const datafieldArrs = control.datafield.split('.')
                const controlDatafield = datafieldArrs[datafieldArrs.length - 1]
                obj[controlDatafield] = control.getValue()
              }
            })
            formData[datafield].push(obj)
          }
        }
      }
      return formData
    },
    // 验证表单
    validateForm() {
      if (!validateForm(this.controls.list)) {
        return false
      }
      for (let datafield in this.childMap) {
        // 子表节点
        let parentControl = find(this.controls.list, { datafield })
        if (datafield.indexOf('.expand') < 0) {
          const controlMap = this.childMap[datafield]
          for (let objectId in controlMap) {
            if (!validateForm(controlMap[objectId], parentControl)) {
              return false
            }
          }
        }
      }
      return true
    },
    ...mapMutations('controls', [
      'setControls',
      'setComputationRule',
      'setDisplayRule'
    ])
  }
}
