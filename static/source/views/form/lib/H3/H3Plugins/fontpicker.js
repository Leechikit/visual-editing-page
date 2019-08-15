// import jQuery from 'jquery'
import axios from 'axios'

(function ($) {
  $.extend({
    // 字符图标选择器
    // export function IFontPicker () {
    IFontPicker: function () {
      var source = []
      var fontPickerCollection = []
      var init = function () {
        var path = document.location.href
        var pathName = document.location.pathname
        var localPath = path.substr(0, path.indexOf(pathName))
        $.ajaxSettings.async = false;
        $.getJSON('./static/selection.json').then((res) => {
          var result = res.data
          var icons = []
          for (var i = 0, len = result.icons.length; i < len; i++) {
            icons.push('icon-' + result.icons[i].properties.name)
          }
          source = icons
        })
      }
      init()

      this.AddFontPicker = function (selecter) {
        if (source.length > 0) {
          var fontPicker = selecter.fontIconPicker({
            source: source,
            emptyIcon: false,
            hasSearch: false
          })
          fontPickerCollection.push({
            'selecter': selecter.selecter,
            'picker': fontPicker
          })
        }
      }
      var getFontPicker = function (selecter) {
        if (selecter) {
          if (fontPickerCollection.length == 1) return fontPickerCollection[0].picker
          for (var i = 0, len = fontPickerCollection.length; i < len; i++) {
            if (fontPickerCollection[i].picker && fontPickerCollection[i].picker.selector == selecter.selector) {
              return fontPickerCollection[i].picker
            }
          }
          return null
        }
      }
      //动态参数
      this.SetIcon = function (icon, selecter) {
        var fontPicker = null
        if (!selecter) {
          fontPicker = fontPickerCollection[0].picker
        } else {
          fontPicker = getFontPicker(selecter)
        }
        if (fontPicker) {
          fontPicker.refreshPicker({
            source: source,
            emptyIcon: true,
            emptyIconValue: icon,
            hasSearch: false
          })
        }
      }
      return this
    }
  })
  // console.log($.fn.IFontPicker)
})(jQuery)
// 系统属性扩张函数 \ 元素扩张插件



// WEBPACK FOOTER //
// ./src/lib/H3/H3Plugins/fontpicker.js