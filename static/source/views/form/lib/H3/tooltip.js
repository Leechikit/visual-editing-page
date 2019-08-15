var $ToolTip = $(
    '<div class="table-tip" style="display: none;"></div>'
  ).appendTo($("body"));
$('.ivu-icon-help-circled')
  .mouseenter(function () {
      var $that = $(this)
      var offset = $that.offset()
      $ToolTip
          .html($that.attr('data-tip'))
          .css({
              left:
                  offset.left +
                  ($that.outerWidth() - $ToolTip.outerWidth()) / 2 -
                  $(window).scrollLeft(),
              bottom:
                  $(window).height() - offset.top + 6 + $(window).scrollTop()
          })
          .toggle()
      return false
  })

$('.ivu-icon-help-circled')
  .mouseleave(function () {
      $ToolTip.hide()
  })


// WEBPACK FOOTER //
// ./src/lib/H3/tooltip.js