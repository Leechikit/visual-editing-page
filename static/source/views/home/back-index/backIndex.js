
import $ from 'jquery';
// import { sortAppData } from '../../../../service/getData';

const BoxWdith = 190;
const BoxHeight = 156;
let EmptyBox = '';
let DragBox = '';
let HasDown = false;
let StartPoint = {};

// 检测input框字符是否合法
export function checkvalue(e) {
  if (e.keyCode >= 37 && e.keyCode <= 40) return;
  var val = this.value.replace(/[^\w\.\/]/ig, '');
  if (val !== this.value) {
    this.value = val;
  }
}

//提交拖拽排序后的数据
async function updateSort(t) {
  // let res = await sortAppData('UpdateSort', t);
  // if (res.Successful) {
  //   // 提交重新排序后的返回             
  //   return res.ReturnData;
  // }
}

// 后台管理首页拖拽排序
export function dragMouseDown(e, Content, Add) {
  e = window.event || e;
  if ($(this).hasClass('box_add')) {
    return;
  }

  if (EmptyBox) {
    return;
  }
  StartPoint = e;

  // DragBox = $(e.currentTarget)
  // var dataVue = e.target.attributes[0].localName
  // EmptyBox = $('<div ' + dataVue + ' class="content_box content_normal empty_box"></div>').css('visibility', 'hidden')
  EmptyBox = $('<div class="content_box content_normal empty_box"></div>').css('visibility', 'hidden');
  DragBox = $(e.path ? e.path[2] : e.currentTarget.offsetParent);
  var offset = DragBox.offset();
  var point = {
    x: e.pageX - offset.left,
    y: e.pageY - offset.top
  };
  var scroll = {
    top: $(window).scrollTop(),
    left: $(window).scrollLeft()
  };
  DragBox.css({
    left: offset.left - scroll.left,
    top: offset.top - scroll.top
  });
  DragBox.addClass('drag_box');

  DragBox.before(EmptyBox);
  $(document).bind('mousemove.dragApp', function (ev) {
    scroll = {
      top: $(window).scrollTop(),
      left: $(window).scrollLeft()
    };
    EmptyBox.css('visibility', 'visible');
    var _x = ev.pageX - point.x;
    var _y = ev.pageY - point.y;

    if (DragBox) {
      DragBox.css({
        left: _x - scroll.left,
        top: _y - scroll.top
      });
    }

    var mx = _x + BoxWdith / 2;
    var my = _y + BoxHeight / 2;
    var range = 30;
    Content.children().not(DragBox).not(EmptyBox).not(Add).each(function (i) {
      var obj = $(this);
      var p = obj.offset();
      var a1 = p.left;
      var a2 = p.left + obj.width();
      var a3 = p.top;
      var a4 = p.top + obj.height();
      var ax = (a1 + a2) / 2;

      if (my > a3 && my < a4 && mx > a1 && mx < a2) {
        if (mx > a1 && mx < ax) {
          EmptyBox.insertBefore(this);
          return false;
        } else if (mx > ax && mx < a2) {
          EmptyBox.insertAfter(this);
          return false;
        }
      }
    });
  });

  $(document).bind('mouseup.dragApp', function (e) {
    $(document).off('mousemove.dragApp').off('mouseup.dragApp');
    HasDown = false;
    var offset = EmptyBox.offset();
    DragBox.animate({
      left: offset.left - scroll.left,
      top: offset.top - scroll.top
    }, 210, function () {
      DragBox.removeClass('drag_box');
      DragBox.css({
        left: 0,
        top: 0
      });
      EmptyBox.replaceWith(DragBox);
      EmptyBox = null;

      var t = {};
      Content.children('.content_box').not(Add).each(function (i) {
        var code = $(this).attr('data-item');
        t[code] = i;
      });

      t = JSON.stringify(t);
      updateSort(t);
    });

  });
}



// WEBPACK FOOTER //
// ./src/lib/H3/Console/backIndex/backIndex.js