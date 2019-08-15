// 系统属性扩张函数 \ 元素扩张插件

import {
    Button,
    Modal,
    Tooltip,
    Message,
    Icon,
    Select,
    Option
} from 'iview';

(function ($) {
    // 获取字符串类看，所有的字符串添加Trim()函数
    String.prototype.Trim = function () {
        return this.replace(/[ ]/g, '');
    };

    Array.prototype.distinct = function () {
        var newArr = [],
            obj = {};
        for (var i = 0, len = this.length; i < len; i++) {
            if (!obj[typeof (this[i]) + this[i]]) {
                newArr.push(this[i]);
                obj[typeof (this[i]) + this[i]] = 'new';
            }
        }
        return newArr;
    };

    //a.AddMinutes();
    //a.AddHours();
    //a.AddDays();
    //a.AddMonths();
    //a.AddYears();
    Date.prototype.AddMinutes = function (double) {
        if (isNaN(double)) { return this; }
        var result = new Date();
        var totalMilliSeconds = this.getTime();
        var addMilliSeconds = double * 1000 * 60;
        totalMilliSeconds = totalMilliSeconds + addMilliSeconds;
        result.setTime(totalMilliSeconds);
        return result;
    };
    Date.prototype.AddHours = function (double) {
        if (isNaN(double)) { return this; }
        var result = new Date();
        var totalMilliSeconds = this.getTime();
        var addMilliSeconds = double * 1000 * 60 * 60;
        totalMilliSeconds = totalMilliSeconds + addMilliSeconds;
        result.setTime(totalMilliSeconds);
        return result;
    };
    Date.prototype.AddDays = function (double) {
        if (isNaN(double)) { return this; }
        var result = new Date();
        var totalMilliSeconds = this.getTime();
        var addMilliSeconds = double * 1000 * 60 * 60 * 24;
        totalMilliSeconds = totalMilliSeconds + addMilliSeconds;
        result.setTime(totalMilliSeconds);
        return result;
    };
    Date.prototype.AddMonths = function (double) {
        if (isNaN(double)) { return this; }
        var result = new Date();
        var totalMilliSeconds = this.getTime();
        var month = result.getMonth() + 1;
        var year = result.getFullYear();
        var days = this.GetMonthDays(year, month);
        var days = 30;
        var addMilliSeconds = double * 1000 * 60 * 60 * 24 * days;
        totalMilliSeconds = totalMilliSeconds + addMilliSeconds;
        result.setTime(totalMilliSeconds);
        return result;
    };
    Date.prototype.AddYears = function (double) {
        if (isNaN(double)) { return this; }
        var result = new Date();
        var totalMilliSeconds = this.getTime();
        var year = result.getFullYear();
        var days = this.IsLeap(year) ? 366 : 365;
        var addMilliSeconds = double * 60 * 1000 * 24 * days;
        totalMilliSeconds = totalMilliSeconds + addMilliSeconds;
        result.setTime(totalMilliSeconds);
        return result;
    };
    Date.prototype.IsLeap = function (year) {
        isLeap = false;
        if (year / 4 == 0) {
            if (year / 100 == 0) {
                if (year / 400 == 0) {
                    isLeap = true;
                }
            } else {
                isLeap = true;
            }
        }
        return isLeap;
    };
    Date.prototype.GetMonthDays = function (year, month) {
        var days = 30;
        switch (month) {
            case 1:
                days = 31;
                break;
            case 2:
                if (this.IsLeap(year)) {
                    days = 29;
                } else {
                    days = 28;
                }
                break;
            case 3:
                days = 31;
                break;
            case 4:
                days = 30;
                break;
            case 5:
                days = 31;
                break;
            case 6:
                days = 30;
                break;
            case 7:
                days = 31;
                break;
            case 8:
                days = 31;
                break;
            case 9:
                days = 30;
                break;
            case 10:
                days = 31;
                break;
            case 11:
                days = 30;
                break;
            case 12:
                days = 31;
                break;
        }
        return days;
    };
    //继承:所有的类继承关系，通过这个函数实现
    //用法:
    //var parentClass=function(){};
    //var subClass=function(){};
    //subClass.Inherit(parentClass,{subFun:function(){}});
    Function.prototype.Inherit = function (parent, overrides) {
        if (typeof parent !== 'function') return this;
        // 保存对父类的引用
        this.Base = parent.prototype;
        this.Base.constructor = parent;
        // 继承
        var f = function () { };
        f.prototype = parent.prototype;
        this.prototype = new f();
        this.prototype.constructor = this;
        //附加属性方法
        if (overrides) $.extend(this.prototype, overrides);
    };

    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            'M+': this.getMonth() + 1, //月份
            'd+': this.getDate(), //日
            'h+': this.getHours(), //小时
            'm+': this.getMinutes(), //分
            's+': this.getSeconds(), //秒
            'q+': Math.floor((this.getMonth() + 3) / 3), //季度
            'S': this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
    };
    //支持contructor.name
    if (! function f() { }.name) {
        Object.defineProperty(Function.prototype, 'name', {
            configurable: true,
            get: function () {
                var name = (this.toString().match(/function (.+?)\(/) || [, ''])[1];
                // For better performance only parse once, and then cache the
                // result through a new accessor for repeated access.
                Object.defineProperty(this, 'name', {
                    value: name
                });
                return name;
            }
        });
    }

    //浮动弹出框
    $.fn.FloatBox = function (opt) {
        var _Default = {
            width: 200,
            height: 250,
            offsetLeft: 20,
            offsetHeight: 30,
            base_x: 'innerright', //相对基目标的显示方向  left、innerright、innerLeft、right
            base_y: 'bottom', //target对齐方式目标底部  bottom 、top
            target: null,
            source: this,
            shownCallback: null,
            hiddenCallback: null,
            actions: [], //[title,callback]
            baseDom: null, //基准对象 如右侧对齐，上侧对齐
            documentClickVisible: true, //点击其他位置隐藏
            topbox: false
        };
        opt = $.extend({}, _Default, opt);
        var container = opt.target;
        return {
            opt: opt,
            getAbsPosition: function (element) {
                var left = 0;
                if (window.parent != window) {
                    if (window.screenLeft != void 0) {
                        left = window.screenLeft;
                    } else if (window.screenX != void 0) {
                        left = window.screenX;
                    }
                }
                var abs = {
                    x: 0,
                    y: 0
                };
                if (document.documentElement.getBoundingClientRect) {
                    abs.x = element.getBoundingClientRect().left;
                    abs.y = element.getBoundingClientRect().top;

                    abs.x += left + document.documentElement.scrollLeft - document.documentElement.clientLeft;
                    abs.y += document.body.scrollTop | document.documentElement.scrollTop + document.documentElement.scrollTop - document.documentElement.clientTop;
                } else {
                    while (element != document.body) {
                        abs.x += element.offsetLeft;
                        abs.y += element.offsetTop;
                        element = element.offsetParent;
                    }

                    abs.x += left + document.body.clientLeft - document.body.scrollLeft;
                    abs.y += document.body.scrollTop | document.documentElement.scrollTop + document.body.clientTop - document.body.scrollTop;
                }
                return abs;
            },
            show: function () {
                var right_dis = null,
                    bottom_dis = null,
                    position = this.getAbsPosition(opt.source.get(0));
                if (opt.baseDom) {
                    if (opt.base_x == 'innerright') {
                        var pos = this.getAbsPosition($(opt.baseDom).get(0));
                        var width = $(opt.baseDom).outerWidth();
                        right_dis = pos.x + width;
                    } else if (opt.base_x == 'innerleft' || opt.base_x == 'right') {
                        right_dis = 1000; //取无穷大
                    } else if (opt.base_x == 'left') {
                        var pos = this.getAbsPosition(opt.baseDom);
                        right_dis = pos.x;
                    }

                    //高度不限制
                    bottom_dis = $(window).height();
                } else {
                    right_dis = $(window).width();
                    bottom_dis = $(window).height();
                }

                //判断是否超出区域
                var top = 0,
                    left = 0,
                    selfHeight = $(opt.source).height();
                if ((position.y + selfHeight + opt.offsetHeight + opt.height) > bottom_dis) {
                    //超出屏幕高度，就在上面显示
                    top = position.y - opt.height - opt.offsetHeight;
                } else {
                    if (opt.base_y == 'top') {
                        top = position.y + opt.offsetHeight;
                    } else {
                        top = position.y + selfHeight + opt.offsetHeight;
                    }
                }
                if (position.x + opt.width > right_dis) {
                    left = right_dis - opt.width;
                } else {
                    left = position.x + opt.width;
                }
                container.css({
                    'position': 'absolute',
                    'top': top,
                    'left': left,
                    'width': opt.width + 'px',
                    'height': opt.height + 'px',
                    'border': '1px solid #ddd',
                    'box-shadow': '0 0 8px #ddd',
                    'z-index': 10002,
                    'background-color': '#fff',
                    'overflow-y': 'auto'
                });
                container.show();
                if (opt.shownCallback) {
                    opt.shownCallback();
                }

                document.onclick = function (event) {
                    if ($.ReportDesigner.FloatPanels.length == 0) {
                        return;
                    }
                    //如果编辑框显示也不处理
                    if ($('div#field-edit-panel').is(':visible')) {
                        return;
                    }
                    var curFloatPanel = $.ReportDesigner.FloatPanels[$.ReportDesigner.FloatPanels.length - 1];
                    if ($.ReportDesigner.FloatPanels.length - 2 >= 0) {
                        if ($.ReportDesigner.FloatPanels[$.ReportDesigner.FloatPanels.length - 1].opt.target.attr('id') && $.ReportDesigner.FloatPanels[$.ReportDesigner.FloatPanels.length - 1].opt.target.attr('id') == $.ReportDesigner.FloatPanels[$.ReportDesigner.FloatPanels.length - 2].opt.target.attr('id')) {
                            $.ReportDesigner.FloatPanels.pop();
                            $.ReportDesigner.FloatPanels.pop();
                            $.ReportDesigner.FloatPanels.push(curFloatPanel);
                        }
                        //
                    }
                    //if (!opt.documentClickVisible) {
                    //    curFloatPanel.onlyhide();
                    //    return;
                    //}
                    var target = curFloatPanel.opt.target;
                    if (!$(target).is(':visible')) {
                        return;
                    }
                    //判断点击范围
                    var x = event.pageX == 0 ? Math.abs(event.offsetX) : event.pageX;
                    var y = event.pageY == 0 ? Math.abs(event.offsetY) : event.pageY;
                    if (y > ($(target).position().top + $(target).height() + 30) ||
                        y < $(target).position().top - 30 ||
                        x > $(target).position().left + $(target).width() ||
                        x < $(target).position().left - 30
                    ) {
                        //if ($(target).is(':visible')) {
                        //    if (curFloatPanel.opt.hiddenCallback) {
                        //        curFloatPanel.opt.hiddenCallback();
                        //    }

                        //}
                        if (!opt.documentClickVisible) {
                            curFloatPanel.onlyhide();
                        } else {
                            curFloatPanel.hide();
                        }
                    }
                };
            },
            hide: function () {
                //if ($(this.opt.target).is(':visible')) {
                if (this.opt.hiddenCallback) {
                    this.opt.hiddenCallback();
                }
                $(this.opt.target).hide();
                $.ReportDesigner.FloatPanels.pop();
                //}
            },
            onlyhide: function () {
                //if ($(this.opt.target).is(':visible')) {

                $(this.opt.target).hide();
                $.ReportDesigner.FloatPanels.pop();
                //}
            }
        };
    };

    //---------------------------------------下拉框------------------------------------------------
    var AppFilterMultiSelect = function (opt, Base) {
        var that = this;
        this.Options = $.extend({}, opt);
        this.base = $(Base);
        this.Value = null;
        this.configurable = true;
        this.Init();
    };
    $.fn.AppFilterMultiSelect = function (opt) {
        return new AppFilterMultiSelect(opt, this);
    };
    AppFilterMultiSelect.prototype = {
        Init: function () {
            var that = this;
            if (that.Options.OnChange && $.isFunction(that.Options.OnChange)) {
                that.OnChange = that.Options.OnChange;
            }
            that.Render();
        },
        Render: function () {
            var that = this;
            var $this = that.base;
            $this.multiselect({
                enableFiltering: true,
                filterPlaceholder: '搜索',
                buttonText: function (options, select) {
                    if (options.length === 0) {
                        return '';
                    } else {
                        var labels = [];

                        options.each(function () {
                            if ($(this).attr('label') !== void 0) {
                                labels.push($(this).attr('label'));
                            } else {
                                labels.push($(this).html());
                            }
                        });
                        return labels.join(';') + '';
                    }
                },
                onChange: function () {
                    if (!that.configurable) { return; }
                    var v = [];
                    var selectedText = that.base.val();
                    if (selectedText) { v = selectedText; }
                    that.Value = v;
                    that.OnChange();
                },
                onDropdownShow: function () {
                    //点击时选人控件隐藏
                    $("div[data-FormMultiUserPanel='SelectorPanel'],div[data-FormUserPanel='SelectorPanel'],div[data-formmultiuserpanel='searchdiv']").hide();
                    $('.form-query-dropdown').hide();
                },
                selectedClass: 'multiselect-selected',
                nonSelectedText: ''
            });
            var propertyname = $this.attr('id');
            if (that.Options.defaultValue) {
                this.configurable = false;
                $this.multiselect('select', that.Options.defaultValue);
                this.configurable = true;
                this.Value = that.Options.defaultValue;
            }
            $this.parent().find('b.caret').removeClass('caret').addClass('icon-arrow-down-full');
            $this.next().find('ul.multiselect-container').off('scroll.list').on('scroll.list', function () {
                var scrollTop = $(this).scrollTop();
                $(this).find('li.filter').css({
                    'top': scrollTop + 'px'
                });
            });
        },
        GetValue: function () {
            return this.Value;
        },
        SetValue: function (v) {
            this.configurable = false;
            this.base.multiselect('select', v);
            this.OnChange();
            this.configurable = true;
        },
        OnChange: function () {

        }
    };
})(jQuery);
//新增和查看按钮
(function ($) {
    var NewOrCheckList = function (opt, Base) {
        this.opt = opt;
        this.base = $(Base);
        this.schemaCode = opt.schemaCode;
        this.Init();
    };
    $.fn.NewOrCheckList = function (opt) {
        return new NewOrCheckList(opt, this);
    };
    NewOrCheckList.prototype = {
        Init: function () {
            var that = this;
            $(this.base[0]).off('click').on('click', function (e) {
                var $target = $(e.target);
                if ($target.hasClass('chakanliebiao')) {
                    var url = '/App/?id=' + that.schemaCode;
                    window.open(url);
                    e.stopPropagation();
                    return false;
                } else if ($target.hasClass('xinzengshuju')) {
                    var url = '/Form/DefaultSheet?SchemaCode=' + that.schemaCode;
                    $.ISideModal.Show(url);
                    e.stopPropagation();
                    return false;
                } else {
                    var url = '/Form/DefaultSheet?SchemaCode=' + that.schemaCode;
                    $.ISideModal.Show(url);
                    e.stopPropagation();
                    return false;
                }
            });
            $(this.base[0]).off('mouseenter').on('mouseenter', function (e) {
                $(this).find('.box-recent-operate').show();
            });
            $(this.base[0]).off('mouseleave').on('mouseleave', function (e) {
                $(this).find('.box-recent-operate').hide();
            });
        }
    };
})(jQuery);

(function ($) {
    $.H3Popup = {};
    $.H3Popup.IsShow = false;
    $.H3Popup.options = {
        title: '',
        message: '',
        error_detail: '',
        type: 'danger',
        ShowInRootWindow: false,
        MessageTip1: '查看错误详情',
        MessageTip2: '错误详情',
        showCancel: true,
        callBack: undefined
    };
    $.H3Popup.show = function (options) {
        try {
            var options = $.extend({}, $.H3Popup.options, options);
            //if (!$.H3Popup.IsShow) { //一次只显示一个modal窗口
            popup.add(options);
            //}
        } catch (msg) {

        }
    };

    var popup = {
        _modal: '<div class="h3-modal fade jconfirm"  tabindex= "-1" role= "dialog"  data-backdrop="false" ></div>',
        _modal_dialog: '<div class="modal-dialog " role="document"></div>',
        _modal_content: ' <div class="modal-content"></div>',
        _modal_header: ' <div class="modal-header-h3base h3-modal-header "><button type="button" class="close" data-dismiss="modal">' +
            '<span class="icon-close2" aria-hidden="true" style= "color:#FFFFFF" ></span></button> <h4 class="modal-title">提示</h4> </div>',
        _modal_body: ' <div class="modal-body" style="padding-top:55px;"></div>',
        _modal_message: '<span style="display: block;" class="messagesummary"></span>',
        _modal_errordetail: ' <div><div class="" style="text-align:center;margin-top:20px;margin-bottom:20px;">  <a class="has-error"><span class="messagetip1"></span><i class="icon-arrow-down"></i></a></div>  <div class="modal-errordetail">  <div class="modal-errorcode messagetip2"></div>   <div class="modal-errordetails">  </div>  </div></div>',
        _modal_footer: '<div class="modal-footer"><div class="button btn-ok">确定</div><div class="button btn-cancel" >取消</div></div>',

        add: function (option) {
            option.ShowInRootWindow = true;
            var that = this;
            $.H3Popup.IsShow = true;
            if (option && option.message) {
                var $modal = $(this._modal);
                $modal.append('<div class="modal-mask"></div>');
                var $Header = $(this._modal_header);
                var dialogClassName = 'modal-dialog-' + option.type;
                var headerClassName = 'modal-header-' + option.type;
                if (option.title) {
                    $Header.find('h4').html(option.title);
                }
                var $modaldialog = $(this._modal_dialog).addClass(dialogClassName);
                $Header.addClass(headerClassName);
                //var $modalbody = $(this._modal_body).append($(this._modal_message).text(option.message));
                var $modalbody = $(this._modal_body).append($(this._modal_message).html(option.message));

                var $modalerrordetail = $(this._modal_errordetail);
                $modalerrordetail.find('.modal-errordetails').html(option.error_detail);
                $modalbody.append($modalerrordetail);

                //提示信息
                $modalerrordetail.find('.messagetip1').text(option.MessageTip1);
                $modalerrordetail.find('.messagetip2').html(option.MessageTip2 + ':');

                $modalerrordetail.find('a.has-error').off('click.errordetail').on('click.errordetail', function () {
                    $modalerrordetail.find('div.modal-errordetail').toggle();
                    var $i = $(this).find('i');
                    if ($i.hasClass('icon-chevron-up-outline')) {
                        $i.removeClass('icon-chevron-up-outline').addClass('icon-chevron-down-outline');
                    } else {
                        $i.removeClass('icon-chevron-down-outline').addClass('icon-chevron-up-outline');
                    }
                });
                if (!option.error_detail) {
                    $($modalerrordetail.find('a.has-error')).hide();
                }

                var $modalfooter = $(this._modal_footer);

                //取消按钮
                if (!option.showCancel) {
                    $modalfooter.find('.btn-cancel').hide();
                }

                var $modalcontent = $(this._modal_content).append($Header).append($modalbody).append($modalfooter);
                $modaldialog.append($modalcontent);
                if (option.ShowInRootWindow) {
                    $modal.append($modaldialog).appendTo($(top.window.document.body));
                } else {
                    $modal.append($modaldialog).appendTo($('body'));
                }
                $modal.modal('show');

                //高斯模糊处理
                $.MsgFilter.show();

                //确定按钮
                $modalfooter.find('.btn-ok').click(function () {
                    $modal.modal('hide');
                    $(this).attr('disabled', 'disabled').text('处理中');
                    if ($.isFunction(option.callBack)) {
                        option.callBack.apply(that, [true]);
                    }
                });

                //取消操作
                $modalfooter.find('.btn-cancel').click(function () {
                    $modal.modal('hide');
                    if ($.isFunction(option.callBack)) {
                        option.callBack.apply(that, [false]);
                    }
                });
                $modal.on("show.bs.modal", function () {
                    $modal.find(".modal-dialog").css("transform", "scale(0.9,0.9)");
                });

                $modal.on('shown.bs.modal', function () {
                    //20180101修改margin-top为固定75px
                    //设置居中
                    // var windowHeight = 0;
                    // if (option.ShowInRootWindow) {
                    //     windowHeight = $(top.window).height();
                    // } else {
                    //     windowHeight = $(window).height();
                    // }

                    // var topValue = windowHeight / 2 - $modalcontent.height();
                    // $modalcontent.css('margin-top', topValue);
                    $modal.find(".modal-dialog").css("transform", "");
                });
                $modal.on("hide.bs.modal", function () {
                    // $modal.find(".modal-dialog").css("transform", "scale(0.9,0.9)");
                });
                $modal.on('hidden.bs.modal', function () {
                    $.H3Popup.IsShow = false;
                    $modal.remove();
                    $.MsgFilter.remove();
                    // $modal.find(".modal-dialog").css("transform", "");
                });
            }
        }
    };
})(jQuery);

(function ($) {
    $.H3WarningBox = {};
    $.H3WarningBox.options = {
        message: '',
        type: 'danger',
        fade_in_speed: 1000,
        ShowInRootWindow: false
    };

    $.H3WarningBox.GetBoxArray = function () {
        if (typeof top.$ !== 'undefined' && top.$.H3WarningBox) {
            return top.$.H3WarningBox.BoxArray;
        }
        return $.H3WarningBox.BoxArray;
    };

    $.H3WarningBox.BoxArray = [];

    var box = new Object();
    box._box = '<div class="alert" role= "alert" style="z-index:999999" ></div>';
    box.add = function (option) {
        var that = this;
        this.$box = $(this._box);
        var id = $.IGuid();
        this.$box.attr('id', id);
        if (option && option.message) {
            this.$box.html(option.message);
        }
        this.$box.addClass('alert-' + option.type);

        var $tipCuowu = $("<span class='' style='position: absolute;left: 24px;top: 16px;'></span>");
        var $tipChengong = $("<span class='icon-chengong' style='position: absolute;left: 24px;top: 16px;'></span>");
        var $tipWarn = $("<span class='icon-exclamation-circle' style='position: absolute;left: 24px;top: 16px;'></span>");

        if (option.type == 'danger') {
            this.$box.append($tipCuowu);
        } else if (option.type == 'success') {
            this.$box.append($tipChengong);
        } else {
            this.$box.append($tipWarn);
        }

        var $close = $("<span class='icon-close hide' style='position:absolute;font-size:16px;float:right;right:24px;top:16px;'></span>");
        $close.click(function (e) {
            that.$box.remove();
            e.stopPropagation();
            e.preventDefault();
            $(window).off('unload.warningbox');
        });
        this.$box.append($close);

        var windowWidth = option.ShowInRootWindow ? top.window.innerWidth : window.innerWidth;
        var boxWidth = this.$box.outerWidth();
        if (option.ShowInRootWindow) {
            this.$box.appendTo($(top.document.body));
            $(window).off('unload.warningbox').on('unload.warningbox', function () {
                that.$box.remove();
            });
        } else {
            this.$box.appendTo($('body'));
        }

        this.$box.on('mouseenter', function () {
            console.log('mouseenter');
            //停止淡出
            $(this).stop().css({
                opacity: '',
                height: ''
            });
            if (that.timeOut) {
                clearTimeout(that.timeOut);
            }
            $close.removeClass('hide');
        }).on('mouseleave', function () {
            console.log('mouseleave');
            $close.addClass('hide');
            that.timeOut = setTimeout(function () {
                that._fadeout();
            }, 1000);
        });

        this.$box.css('left', (windowWidth - 600) / 2 + 'px');
        this.timeOut;
        this.$box.fadeIn(option.fade_in_speed, function () {
            that.timeOut = setTimeout(
                function () {
                    that._fadeout();
                }, 1000 * 2
            );
        });
        return this;
    },
        box.clear = function () {
            if (this.$box) {
                this.$box.remove();
                $(window).off('unload.warningbox');
            }
        },
        //淡出并移除
        box._fadeout = function () {
            var that = this;
            var BoxArray;

            if (typeof top.$ !== 'undefined' && top.$.H3WarningBox) {
                BoxArray = top.$.H3WarningBox.BoxArray;
            } else {
                BoxArray = $.H3WarningBox.BoxArray;
            }

            $.each(BoxArray, function (index, obj) {
                $.DeleteObj(obj);
            });

            this.timeOut = this.$box.fadeOut(1000, function () {
                that.$box.remove();
                $(window).off('unload.warningbox');
            });
        },

        $.H3WarningBox.show = function (options) {
            var BoxArray = this.GetBoxArray();
            try {
                //清空
                if (BoxArray.length > 0) {
                    for (var i = 0; i < BoxArray.length; i++) {
                        var _box = BoxArray[i];
                        if (_box) {
                            _box.clear();
                        }
                    }
                    BoxArray.splice(0, BoxArray.length);
                }
                var options = $.extend({}, $.H3Popup.options, options);
                var b = box.add(options);
                BoxArray.push(b);
            } catch (msg) { }
        };
})(jQuery);

(function ($) {
    $.GetRequest = function () {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf('?') != -1) {
            var str = url.substr(1);
            var strs = str.split('&');
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
            }
        }
        return theRequest;
    };
})(jQuery);

(function ($) {
    //高斯模糊处理
    $.MsgFilter = {};
    $.MsgFilter.show = function () {
        $('body header').addClass('msg-filter');
        $('body section').addClass('msg-filter');
        $('body').find('iframe.filter').addClass('msg-filter');
    };
    $.MsgFilter.remove = function () {
        $('body header').removeClass('msg-filter');
        $('body section').removeClass('msg-filter');
        $('body').find('iframe.filter').removeClass('msg-filter');
    };
})(jQuery);

(function ($) {
    //关闭所有弹窗，选人控件，时间控件，下拉框, FormQuery
    $.HideAllPopup = function () {
        //选人
        $("div[data-FormMultiUserPanel='SelectorPanel'],div[data-FormUserPanel='SelectorPanel'],div[data-formmultiuserpanel='searchdiv']").hide();
        //下拉
        $('ul.drop-list.drop-list_s').hide();
        $(document).find('#ListView .fa-chevron-up').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        //时间
        $('[data-provide="datetimepicker"]').each(function () {
            var $this = $(this);
            if ($this.data('datetimepicker')) return;
            $this.datetimepicker('hide');
        });
        //FormQuery
        $('.form-query-dropdown').hide();
    };
})(jQuery);

// JQ 扩张插件
jQuery.extend({
    DeleteObj: function (obj) {
        var o = Object.create(null, {
            obj: {
                value: 1,
                configurable: true
            }
        });
        delete o.obj;
    },
    //创建Guid，用法:$.IGuid()
    IGuid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    isJsonLike: function (str) {
        var JSON_START = /^\[|^\{(?!\{)/;
        var JSON_ENDS = {
            '[': /]$/,
            '{': /}$/
        };
        var jsonStart = str.match(JSON_START);
        return jsonStart && JSON_ENDS[jsonStart[0]].test(str);
    },
    // 读取url的参数值
    IQuery: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = decodeURI(window.location.search.substr(1)).match(reg);
        if (r != null) return decodeURI(r[2]);
        return '';
    },

    IShowSuccess: function () {
        //title, msg, detail, showInRootWindow
        //{title:"",msg:"",detail:""}
        var title;
        var msg;
        var detail;
        if (!arguments) {
            return;
        } //没有输入相应参数
        if (arguments.length == 2) {
            title = arguments[0];
            msg = arguments[1];
        } else if (arguments.length == 1) {
            if (typeof (arguments[0]) === 'string') {
                msg = arguments[0];
            } else if (typeof (arguments[0]) === 'object') {
                var json = arguments[0];
                title = json.title;
                msg = json.msg;
                detail = json.detail;
            }
        }

        if ($.isEmptyObject(title) || title == '') {
            title = '提示';
        }
        if ($.isEmptyObject(msg) || msg == '') {
            msg = title || '';
        }
        if (detail) {
            $.H3Popup.show({
                title: title,
                message: msg,
                error_detail: detail,
                type: 'success',
                ShowInRootWindow: true
            });
        } else {
            $.H3WarningBox.show({
                message: msg,
                type: 'success',
                ShowInRootWindow: true
            });
        }
    },

    IShowError: function () {
        var title;
        var msg;
        var detail;
        if (!arguments) {
            return;
        } //没有输入相应参数
        if (arguments.length == 2) {
            title = arguments[0];
            msg = arguments[1];
        } else if (arguments.length == 1) {
            if (typeof (arguments[0]) === 'string') {
                msg = arguments[0];
            } else if (typeof (arguments[0]) === 'object') {
                var json = arguments[0];
                title = json.title;
                msg = json.msg;
                detail = json.detail;
            }
        }
        if ($.isEmptyObject(title) || title == '') {
            title = '提示';
        }
        if ($.isEmptyObject(msg) || msg == '') {
            msg = title || '';
        }

        if (detail) {
            $.H3Popup.show({
                title: title,
                message: msg,
                error_detail: detail,
                type: 'danger',
                ShowInRootWindow: true
            });
        } else {
            if (msg.length > 30) {
                $.H3Popup.show({
                    title: title,
                    message: msg.substring(0, 40) + '...',
                    error_detail: msg,
                    type: 'danger',
                    ShowInRootWindow: true,
                    MessageTip1: '查看错误详情',
                    MessageTip2: '错误详情'
                });
            } else {
                $.H3WarningBox.show({
                    message: msg,
                    type: 'danger',
                    ShowInRootWindow: true
                });
            }
        }
    },

    IShowWarn: function () {
        var title;
        var msg;
        var detail;
        if (!arguments) {
            return;
        } //没有输入相应参数
        if (arguments.length == 2) {
            title = arguments[0];
            msg = arguments[1];
        } else if (arguments.length == 1) {
            if (typeof (arguments[0]) === 'string') {
                msg = arguments[0];
            } else if (typeof (arguments[0]) === 'object') {
                var json = arguments[0];
                title = json.title;
                msg = json.msg;
                detail = json.detail;
            }
        }

        if ($.isEmptyObject(title) || title == '') {
            title = '提示';
        }
        if ($.isEmptyObject(msg) || msg == '') {
            msg = title || '';
        }

        if (detail) {
            $.H3Popup.show({
                title: title,
                message: msg,
                error_detail: detail,
                type: 'warning',
                ShowInRootWindow: true
            });
        } else {
            if (msg.length > 25) {
                $.H3Popup.show({
                    title: title,
                    message: msg.substring(0, 20) + '...',
                    error_detail: msg,
                    type: 'warning',
                    ShowInRootWindow: true,
                    MessageTip1: '查看警示详情',
                    MessageTip2: '警示详情'
                });
            } else {
                $.H3WarningBox.show({
                    message: msg,
                    type: 'warning',
                    ShowInRootWindow: true
                });
            }
        }
    },
    IShowTip: function () {
        var title;
        var msg;
        var detail;
        if (!arguments) {
            return;
        } //没有输入相应参数
        if (arguments.length == 2) {
            title = arguments[0];
            msg = arguments[1];
        } else if (arguments.length == 1) {
            if (typeof (arguments[0]) === 'string') {
                msg = arguments[0];
            } else if (typeof (arguments[0]) === 'object') {
                var json = arguments[0];
                title = json.title;
                msg = json.msg;
                detail = json.detail;
            }
        }

        if ($.isEmptyObject(title) || title == '') {
            title = '提示';
        }
        if ($.isEmptyObject(msg) || msg == '') {
            msg = title || '';
        }

        if (detail) {
            $.H3Popup.show({
                title: title,
                message: msg,
                error_detail: detail,
                type: 'remind',
                ShowInRootWindow: true
            });
        } else {
            if (msg.length > 68) {
                $.H3Popup.show({
                    title: title,
                    message: msg.substring(0, 68) + '...',
                    error_detail: msg,
                    type: 'warning',
                    ShowInRootWindow: true,
                    MessageTip1: '查看提示详情',
                    MessageTip2: '提示详情',
                    showCancel: false
                });
            } else {
                $.H3WarningBox.show({
                    message: msg,
                    type: 'remind',
                    ShowInRootWindow: true
                });
            }
        }
    },

    //使用bootstrap扩展插件pnotify弹出确认框
    //@title:对话框标题，可以为空
    //@text:对话框弹出消息
    //@callBack:回调函数，传回true/false
    IConfirm: function (title, text, callBack) {
        var that = this;
        var H3Popup = top.$.H3Popup;
        if (!H3Popup) {
            H3Popup = $.H3Popup;
        }
        H3Popup.show({
            title: $.isEmptyObject(title) ? '提示' : title,
            message: $.isEmptyObject(text) ? title : text,
            type: 'remind',
            ShowInRootWindow: true,
            callBack: callBack
        });
        return false;
    },

    //使用bootstrap的模态框，用法:$.SheetModal("",$("div"),[]);
    //@title:标题
    //@target:内容，可以是$("<div>") ,也可以是 url地址
    //@actions:工具栏，可不传；[{Text:"test",CallBack:function,Theme:btn-ok其他想要的参数},{Text:"test",DoAction:function,其他想要的参数}],btn-ok,btn-cancel,btn-normal
    //@callback:modal显示后的回调函数
    //@hiddenCallback隐藏后的回调函数
    //@type 内容类型Dom:0,html:1,url:2
    //@Class modalcontainer的样式
    //@ShowInRootWindow 如果在iframe中使用是否显示在最顶层
    //@ObjectId modal的Id,不传为随机数
    IModal: function (opt) {
        //title, Content, ToolButtons, OnShowCallback, OnHiddenCallback
        var iModal = new Object();
        var DefaultOption = {
            Title: '',
            Content: '',
            ToolButtons: [],
            OnShowCallback: null,
            OnHiddenCallback: null,
            ShowHeader: true,
            ShowFooter: true,
            Type: 0,
            Height: 'auto',
            Width: '80%',
            MarginTop: '',
            Firstload: null,
            Params: {},
            ShowInRootWindow: false,
            ObjectId: null,
            Class: ''
        };
        opt = $.extend({}, DefaultOption, opt);

        iModal.ActionObjects = [];
        iModal.Target = opt.Content;
        iModal.IsUrl = opt.Type == 2;
        iModal.ShowModal = function (title, Content, ToolButtons) {
            localStorage.setItem('DialogArguments', JSON.stringify(opt.Params));
            this.ContainerId = $.IGuid();
            this.Container = $("<div class='modalcontainer " + opt.Class + "' id='" + this.ContainerId + "'>");
            var currentWindow = window;
            var that = this;
            this.IsShow = false;
            this.ID = opt.ObjectId != null ? opt.ObjectId : $.IGuid();
            var $body = $('body');
            if (opt.ShowInRootWindow) {
                $body = $($(top.document).find('body')[0]);
            }
            if (opt.ShowInRootWindow) {
                this.Modal = $('<div class="modal fade" id="' + this.ID + '"  role="dialog" data-backdrop="false" ></div>').css('overflow', 'hidden');
            } else {
                this.Modal = $('<div class="modal fade" id="' + this.ID + '"  role="dialog" data-backdrop="false" ></span>').css('overflow', 'hidden');
            }
            this.Modal.css('z-index', '999');
            $body.append(this.Container);
            this.Container.append(this.Modal);
            var modalDialog = $('<div class="modal-dialog" style=""></div>').css('width', opt.Width).css('height', opt.Height - 0 + 26).css('margin-top', opt.MarginTop);
            this.ModalContent = $('<div class="modal-content" style="border-radius:0px;width:100%;height:100%;"></div>');
            this.ModalHeader = $('<div class="modal-header modal-header-form"><div class="close" data-dismiss="modal"><span aria-hidden="true" class="icon-close_2" style="font-size:12px;"></span></div></div>');
            //以下三个主要才是需要填充的
            this.ModalTitle = $('<h4 class="modal-title modal-title-form" id="myModalLabel"></h4>');

            this.Content = $('<div class="modal-body" ></div>').css('background-color', '#fff').css('width', '100%')
                .css('height', opt.Height.constructor.name == 'Number' ? (opt.Height - 85) : '100%');

            this.ModalFooter = $('<div class="modal-footer modal-footer-form "></div>').css('background-color', '#fff');
            this.Modal.append(modalDialog);
            modalDialog.append(this.ModalContent);
            if (opt.ShowHeader) {
                this.ModalContent.append(this.ModalHeader);
                this.ModalHeader.append(this.ModalTitle);
            }
            this.ModalContent.append(this.Content);
            if (opt.ShowFooter) {
                this.ModalContent.append(this.ModalFooter);
                //操作
                this.SetFooter(ToolButtons);
            }
            this.FooterHeiht = 100;
            this.SetTile(opt.Title);
            this.SetBody(opt.Content);
            if (typeof opt.Firstload === 'function') { opt.Firstload(); }
            //显示
            this.Modal.on('show.bs.modal', function (e) {
                that.Modal.addClass("fade");
                that.Modal.find(".modal-dialog").css("transform", "scale(0.9,0.9)");
                $.MsgFilter.show();
            });
            this.Modal.on('hide.bs.modal', function (e) {
                that.Modal.removeClass("fade");
                that.Modal.find(".modal-dialog").css("transform", "scale(0.9,0.9)");
                $.MsgFilter.remove();
            });
            this.show();
            var findparentmodal = false;
            if (window.parent != window) {
                $(window.parent.document).find('.modal').each(function () {
                    if (findparentmodal) return;
                    var iframe = $(this).find('iframe');
                    if (!$.isEmptyObject(iframe)) {
                        if (iframe[0]) {
                            if (!$.isEmptyObject($(iframe[0].contentDocument).find("#" + that.ID))) {
                                that.ParentModal = $(this);
                                $(this).find(".modal-header").attr("style", "background-color: #000;opacity: 0.5;border-bottom:none;")
                                $(this).find(".modal-body").css("box-shadow", "0 5px 15px rgba(0,0,0,.5)");
                                findparentmodal = true;
                            }
                        }
                    }
                });
            }

            this.Modal.on('shown.bs.modal', this, function (e) {
                // edited by xc
                var margintop = 0;
                var speed = 1000;
                var height = ((opt.ShowInRootWindow ? $(top).outerHeight() : ($(window.document.body).outerHeight() > window.innerHeight ? window.innerHeight : $(window.document.body).outerHeight())) - (modalDialog.height())) / 2;
                var time = (height - 0) / speed;
                var tempModal = that.Modal.find('.modal-dialog');
                tempModal.find(".modal-dialog").css("transform", "");
                // tempModal.css('transition', 'margin ease-in-out ' + time + 's');
                // tempModal.css('-moz-transition', 'margin ease-in-out ' + time + 's');
                // tempModal.css('-webkit-transition', 'margin ease-in-out ' + time + 's');
                // tempModal.css('-o-transition', 'margin ease-in-out ' + time + 's');
                if (height > 0) {
                    margintop = height + 'px';
                }
                modalDialog.css('margin-top', margintop);
                if (typeof opt.OnShowCallback === 'function') { opt.OnShowCallback.apply(that); }
            });
            //绑定关闭事件
            this.Modal.on('hidden.bs.modal', this, function (e) {
                that.Modal.find(".modal-dialog").css("transform", "");
                e.data.IsShow = false;
                localStorage.setItem('DialogArguments', ''); //关闭时清空参数值
                if (typeof opt.OnHiddenCallback === 'function') { opt.OnHiddenCallback.apply(that); }
            });

            this.Modal.css({
                "-webkit-transition": "all 0.5s ease",
                "transition": "all 0.5s ease"
            });
        };

        iModal.SetBody = function (Content) {
            if (this.IsUrl) {
                this.Modal.find('.modal-dialog').css('height', opt.Height).css('width', opt.Width).css('margin', '0 auto 0 auto');
                if (opt.ShowFooter) {
                    //this.Content.css("margin", "0px").css("padding", "0px").height(opt.ShowInRootWindow ? $(top).height :$(window).height() - this.FooterHeiht);
                } else {
                    //this.Content.css("margin", "0px").css("padding", "0px").css("height", "100%");//
                    this.Content.css('margin', '0px').css('padding', '0px'); //
                }

                //计算modal-body高度
                var reduceHeight = 0;
                if (opt.ShowFooter) {
                    reduceHeight += 61;
                }
                if (opt.ShowHeader) {
                    reduceHeight += 50;
                }
                if (opt.Height.constructor == Number) {
                    var bodyHeight = opt.Height - reduceHeight - 5;
                    this.Content.css('height', bodyHeight);
                }

                //兼容firefox
                var iframe = $("<iframe height='100%' width='100%'>").attr('frameborder', 0).attr('src', Content).attr('id', 'iframe_' + this.ID);
                this.Content.append(iframe);
            } else {
                $(Content).show();
                if (opt.type == 0) { this.Content.append($(Content)); }
                else (opt.type == 1);
                this.Content.html(Content);
            }
        };

        iModal.SetTile = function (title) {
            this.ModalTitle.html(title || ' ');
        };

        iModal.SetFooter = function (ToolButtons) {
            this.ModalFooter.html("<div class='btn-group'></div>");
            if (ToolButtons) {
                this.FooterHeiht = 120;
                for (var i = 0; i < ToolButtons.length; i++) {
                    var btnJson = ToolButtons[i];
                    this.AddAction(btnJson);
                }
            }
        };

        iModal.AddAction = function (actionObject) {
            var btn = $('<button type="button" class="masBox-btn btn ' + actionObject.Theme + '">' + actionObject.Text + '</button>');
            if (actionObject.position && actionObject.position == 'left') {
                btn.css('float', 'left').removeClass('masBox-btn');
            }
            $.extend(actionObject, {
                ModalManager: this,
                Element: btn
            });
            // 绑定修改事件
            if (actionObject.CallBack) {
                btn.unbind('click').bind('click', actionObject, function (e) {
                    e.data.CallBack.apply(e.data);
                });
            }
            this.ActionObjects.push(actionObject);
            this.ModalFooter.find('.btn-group').append(btn);
        };

        iModal.TrrigeFrameFun = function (action) {
            var frame = window.frames['iframe_' + this.ID];
            if (frame != null) {
                if ($.isFunction(frame.BoxCall)) {
                    frame.BoxCall.apply(this, [action]);
                } else if ($.isFunction(frame.contentWindow.BoxCall)) {
                    frame.contentWindow.BoxCall.apply(this, [action]);
                }
            }
        };

        iModal.show = function (src) {
            if (this.IsShow) return;
            this.IsShow = true;
            var that = this;

            if (typeof opt.OnShowBeforeCallback === 'function') { opt.OnShowBeforeCallback.apply(this); }

            this.Modal.find(".modal-dialog").css("transform", "scale(0.1,0.1)");
            this.Modal.modal('show');
            this.Modal.find(".modal-dialog").css("transform", "");
            if (opt.ShowInRootWindow) {
                //$(top.document.body).append("<div id='backdropid' class='modal-backdrop fade in ' ></div>");
            }
            if (this.IsUrl) {
                var iframeSrc = src || this.Content.find('iframe').attr('src');
                this.Content.find('iframe').attr('src', iframeSrc);
            }
            if (this.ParentModal) {
                this.ParentModal.find('.modal-header').attr('style', 'background-color: #000;opacity: 0.5;border-bottom:none;');
            }
        };

        iModal.destroy = function () {
            //if (opt.ShowInRootWindow)
            //$(top.document.body).find("#backdropid").remove();
            this.Container.remove();
            for (var key in this) {
                //delete this[key];
                $.DeleteObj(this[key]);
            }
        };

        iModal.hide = function () {
            if (!this.IsShow) return;
            this.IsShow = false;
            $(this.Modal).closest('modal-header').attr('style', '');
            this.Modal.modal('hide');
            if (opt.ShowInRootWindow) {
                //var t = $(top.document.body).find("#backdropid");
                //if (t)
                //    t.remove();
            }
            if (this.ParentModal) {
                this.ParentModal.find('.modal-header').attr('style', '');
            }
        };

        iModal.SetButtonLoading = function () {
            for (var i = 0; i < this.ActionObjects.length; i++) {
                this.ActionObjects[i].Element.attr('data-loading-text', 'loading');
                this.ActionObjects[i].Element.button('loading');
            }
        };

        iModal.ResetButton = function () {
            for (var i = 0; i < this.ActionObjects.length; i++) {
                this.ActionObjects[i].Element.button('reset');
            }
        };

        iModal.ShowModal(opt.title, opt.Content, opt.ToolButtons);
        iModal.GetRootWindow = function (w) {
            if (w.parent == w) { return w; }
            else {
                w = w.parent;
                w = GetRootWindow(w);
            }
        };
        iModal.openModal = function () {
            var t = $(top.document.body);
            var id = 'topMadal';
            var d = $('#' + id);
            if (d.length == 0) {
                d = $("<div class='modal fade' role='dialog' id='" + id + "' ></div>");
                d.appendTo(t);
            }
            d.load('model.html', function () {
                d.modal({
                    backdrop: false
                });
            });
            //t.append("<div id='backdropid' class'modal-backdrop fade in ' ></div>");
        };
        iModal.closeModal = function () {
            var t = $(top.document.body);
            t.find('#topMadal').on('hidden.bs.modal', function (e) {
                //t.find("#backdropid").remove();
            });
        };
        return iModal;
    },

    /*
   //浮动层
   //使用bootstrap的popover，用法:$.IToolTipBox($("div"),[{}]);
   //前提：需要引用bootstrap tooltip 和popover插件
   //$target:目标元素，jquery对象
   //@title:标题
   //@content:内容
   //@html : 标志内容是按html格式还是文本格式填充
   //@ToolButtons:按钮，可不传；[{Text:"test",CallBack:function,Theme:btn-ok其他想要的参数},{Text:"test",DoAction:function,其他想要的参数}],btn-ok,btn-cancel,btn-normal
   //@shownCallback显示后的回调函数
   //@hiddenCallback隐藏后的回调函数
   //@align: 箭头指向方向  top | bottom | left | right | auto, 对其方式
   //@trigger: 目标元素触发浮层方式： click | hover | focus | manual[手工]
   */
    IToolTipBox: function ($target, opt) {
        //title, Content, ToolButtons, OnShowCallback, OnHiddenCallback
        var iToolTip = new Object();
        var DefaultOption = {
            ToolButtons: [],
            trigger: 'click', //触发方式： click | hover | focus |manual
            container: 'body',
            align: 'bottom', //top | bottom | left | right | auto, 对其方式
            shownCallback: null,
            hiddenCallback: null,
            html: true, // true:内容作html处理，false：内容作文本处理
            title: '',
            content: '' //内容 文本或html

        };
        opt = $.extend({}, DefaultOption, opt);
        // iToolTip.Container = $("<div>");
        iToolTip.ActionObjects = [];
        iToolTip.Target = $target;
        var toolbox = $target.data('h3.itoolbox');
        if (toolbox) {
            return toolbox;
        }
        iToolTip.ShowToolTip = function (title, Content, ToolButtons) {
            var that = this;
            this.IsShow = false;
            this.ID = $.IGuid();
            thisTemplate = '<div class="popover" id="' + this.ID + '" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><div class="popover-footer"></div></div>',
                this.Target.popover({
                    trigger: opt.trigger, //触发方式： click | hover | focus |manual
                    container: opt.container,
                    placement: opt.align, //top | bottom | left | right | auto, 对其方式
                    html: opt.html, // true:内容作html处理，false：内容作文本处理
                    title: opt.title,
                    content: opt.content, //内容 文本或html
                    template: that.Template
                });

            var data = this.Target.data('bs.popover');
            this.popoverData = data;
            if (data) {
                this.$Tip = data.tip();
                this.TipTitle = this.$Tip.find('h3.popover-title');
                this.TipFooter = this.$Tip.find('div.popover-footer');
                this.TipContent = this.$Tip.find('div.popover-content');
            }

            //绑定关闭事件
            this.Target.on('hidden.bs.popover', this, function (e) {
                e.data.IsShow = false;
                if (typeof opt.hiddenCallback === 'function') { opt.hiddenCallback(that); }
                return false;
            });

            this.Target.on('shown.bs.popover', this, function (e) {
                if (typeof opt.shownCallback === 'function') { opt.shownCallback(that); }

                return false;
            });

            this.SetFooter(opt.ToolButtons);

            this.Target.data('h3.itoolbox', this);
            //显示
            this.show();
        },

            iToolTip.SetTile = function (title) {
                this.TipTitle.html(title || ' ');
                this.TipTitle.show();
            };

        iToolTip.SetFooter = function (ToolButtons) {
            this.TipFooter.html('');
            if (ToolButtons) {
                this.FooterHeiht = 120;
                for (var i = 0; i < ToolButtons.length; i++) {
                    var btnJson = ToolButtons[i];
                    this.AddAction(btnJson);
                }
            }
        };
        iToolTip.AddAction = function (actionObject) {
            var btn = $('<button type="button" class="masBox-btn ' + actionObject.Theme + '">' + actionObject.Text + '</button>');
            if (actionObject.position && actionObject.position == 'left') {
                btn.css('float', 'left').removeClass('masBox-btn');
            }
            $.extend(actionObject, {
                TipManager: this,
                Element: btn
            });
            // 绑定修改事件
            if (actionObject.CallBack) {
                btn.unbind('click').bind('click', actionObject, function (e) {
                    e.data.CallBack.apply(e.data);
                });
            }
            this.ActionObjects.push(actionObject);
            this.TipFooter.append(btn);
        };

        iToolTip.show = function () {
            if (this.IsShow) return;
            this.IsShow = true;
            this.Target.popover('show');
        };

        iToolTip.destroy = function () {
            iToolTip.Target.popover('destroy');
            this.Target.data('h3.itoolbox', null);
        };

        iToolTip.hide = function () {
            iToolTip.Target.popover('hide');
        };

        iToolTip.SetButtonLoading = function () {
            for (var i = 0; i < this.ActionObjects.length; i++) {
                this.ActionObjects[i].Element.attr('data-loading-text', 'loading');
                this.ActionObjects[i].Element.button('loading');
            }
        };

        iToolTip.ResetButton = function () {
            for (var i = 0; i < this.ActionObjects.length; i++) {
                this.ActionObjects[i].Element.button('reset');
            }
        };

        iToolTip.ShowToolTip(opt.title, opt.Content, opt.ToolButtons);

        return iToolTip;
    },

    //对象克隆,只对对象有效,用法:$.IClone(Obj)
    IClone: function (obj) {
        if (obj == null) return;
        var objClone;
        if (obj.constructor == Object ||
            obj.constructor == Array) {
            objClone = new obj.constructor();
        } else {
            objClone = new obj.constructor(obj.valueOf());
        }
        jQuery.extend(true, objClone, obj);
        return objClone;
    },

    //数字格式
    //@num:数值
    //@保留小数后几位
    //@separator 千分位分割
    IFormatNumber: function (num, precision, separator) {
        var parts;
        // 判断是否为数字
        if (!isNaN(parseFloat(num)) && isFinite(num)) {
            // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
            // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
            // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
            // 的值变成了 12312312.123456713
            num = Number(num);
            // 处理小数点位数
            num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
            // 分离数字的小数部分和整数部分
            parts = num.split('.');
            // 整数部分加[separator]分隔, 借用一个著名的正则表达式
            parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

            return parts.join('.');
        }
        return NaN;
    },

    //读取url的参数值
    IQuery: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = decodeURI(window.location.search.substr(1)).match(reg);
        if (r != null) return decodeURI(r[2]);
        return '';
    },

    IDialogModal: {
        ModalIdArray: [],
        DialogModalArray: [],
        currentWindow: window,
        Show: function (schemaCode, objectId, title, height, width, params, onShowCallback, onHiddenCallback) {
            this.SheetData = null; //弹出框表单数据
            this.ExecuteHideFunction = true; //是否执行隐藏回调事件onHiddenCallback

            var that = this;
            var url = '/Form/DefaultSheet/' + schemaCode + '?SchemaCode=' + schemaCode + '&ShowInModal=true';
            if (objectId) {
                url = url + '&BizObjectId=' + objectId;
            }
            this.iModal = new $.IModal({
                Content: url,
                OnShowCallback: onShowCallback,
                OnHiddenCallback: null, //挪到IDialogModal执行
                Title: title || '',
                ShowHeader: true,
                ShowFooter: false,
                Type: 2, //2 =IsUrl
                Height: height || 500,
                Width: width || 820,
                Params: params //弹框全局参数
            });
            this.iModal.show();
            //隐藏时显示工具栏
            this.iModal.Modal.on('hide.bs.modal.dialog', function () {
                that.ShowPreModalNav(); //显示上一层的工具栏
                //根据条件判断是否执行回调函数
                if (that.ExecuteHideFunction && that.SheetData != null) {
                    if (typeof onHiddenCallback === 'function') {
                        //新增传递打开表单的数据到回调函数
                        onHiddenCallback.apply(that, [that.SheetData]);
                    }
                }

                $(document.body).removeClass('modal-open');
                localStorage.setItem('DialogArguments', ''); //关闭时清空参数值
            });
            this.HidePreModalNav();
            this.ID = this.iModal.ContainerId;
            top.$.IDialogModal.ModalIdArray.push(this.ID);
            top.$.IDialogModal.DialogModalArray.push(this.iModal);

            //绑定关闭事件
            this.iModal.Container.find('div.close').off('click.close').on('click.close',
                function () {
                    that.Close();
                });
        },
        CloseAllModal: function () {
            for (var i = top.$.IDialogModal.DialogModalArray.length - 1; i >= 0; i--) {
                this.Close(top.$.IDialogModal.DialogModalArray[i].ContainerId);
            }
            top.$.IDialogModal.DialogModalArray = [];
        },
        //手工关闭
        Close: function (ModalId) {
            var that = this;
            this.ShowPreModalNav();
            if (ModalId) {
                //移除
                if (this.currentWindow == undefined) {
                    this.currentWindow = top;
                }
                //关闭弹出框
                $(this.currentWindow.document).unbind('click.Close_' + ModalId);
                //ModalId移除
                top.$.IDialogModal.ModalIdArray.splice(ModalId, 1);
                if (top.$.IDialogModal.DialogModalArray && top.$.IDialogModal.DialogModalArray.length > 0) {
                    for (var i = top.$.IDialogModal.DialogModalArray.length - 1; i >= 0; i--) {
                        var modal = top.$.IDialogModal.DialogModalArray[i];
                        var id = modal.ContainerId;
                        modal.hide(); //触发回调事件
                        //移出对话框
                        if (modal.Container) {
                            modal.Container.find('iframe').remove(); //先移除iframe再移除div，解决ie下新增后再打开侧滑框不能编辑文本框的问题
                            modal.Container.remove();
                        }
                        //delete modal;
                        $.DeleteObj(modal);
                        //当前对话框之后出现的都关闭掉
                        if (ModalId == id) {
                            break;
                        }
                    }
                }
            } else {
                this.CloseLastModal();
            }
        },

        CloseLastModal: function (params) {
            if (top.$.IDialogModal.DialogModalArray.length > 0) {
                var lastModal = top.$.IDialogModal.DialogModalArray[top.$.IDialogModal.DialogModalArray.length - 1];
                if (lastModal) {
                    this.Close(lastModal.ContainerId, params);
                }
            }
        },
        //隐藏上级侧滑框的按钮
        HidePreModalNav: function () {
            if (this.currentWindow == top) {
                return;
            }
            $(this.currentWindow.document.body).find('ul.navbar-nav').hide();
        },
        //显示上级侧滑框的按钮
        ShowPreModalNav: function () {
            $(this.currentWindow.document.body).find('ul.navbar-nav').show();
        }

    },

    //右侧划出的表单
    ISideModal: {
        ModalIdArray: [],
        CallBackArray: {},
        ModalBody: {},
        IsChanged: false,
        CustomParams: {},
        CheckIsChange: true, //检查改变
        //selfWindow : 计算从哪一层开始添加document.click事件
        Show: function (target, title, hiddenCallback, parentId, checkIsChange, params, selfWindow) {
            var that = this;
            if (this.IsChanged) return;
            if (checkIsChange == void 0) {
                this.CheckIsChange = true;
            } else {
                this.CheckIsChange = checkIsChange;
            }
            this.oldWindow = selfWindow || self;
            this.currentWindow = window;
            this.currentbody = $('body');
            var topValue = -1;
            var width = '70%'; //"70%";
            var oldself = self;
            //判断是否有通知公告
            if (this.currentWindow != top) {
                //this.HideLastModal();
                var $curentModal = top.$('#' + top.$.ISideModal.ModalIdArray[top.$.ISideModal.ModalIdArray.length - 1]);
                if (this.IsAnnounceShow()) {
                    topValue = 80;
                } else {
                    topValue = 50;
                }

                width = '100%'; // "100%";// $curentModal.width();
            } else {
                if (this.IsAnnounceShow()) {
                    topValue = 83;
                } else {
                    topValue = 53;
                }

                this.CloseAllModal();
            }

            var $Modal = null;
            var id = $.IGuid();
            $Modal = $('<div></div>');
            $Modal.css('left', 'auto');

            //$Modal.css("margin-top", top.$.ISideModal.ModalIdArray.length > 0 ? "37px" : "61px");
            $Modal.css('width', width);
            $Modal.css('z-index', '1040');
            $Modal.css('position', 'fixed');
            $Modal.css('top', topValue + 'px');
            $Modal.css('bottom', '-1px');
            $Modal.css('padding', '0');
            $Modal.css('background-color', '#fff');
            $Modal.css('background-clip', 'padding-box');
            //$Modal.css("border", "1px solid #adadad");
            $Modal.css('box-shadow', '0 2px 27px 0 rgba(0,0,0,0.30');
            if (!title) {
                title = '&nbsp;&nbsp;';
            }
            var $titlePanel = $('<div class="panel" style="margin-bottom:0px;"><div class="panel-heading"><span id="tile_' + id + '">' + title + '<span></div></div>');
            $titlePanel.children('div.panel-heading').append('<button type="button" class="close" data-dismiss="modal"><i aria-hidden="true" class="fa fa-times"></i></button>');
            $Modal.append($titlePanel.hide());
            $Modal.appendTo(this.currentbody);
            if (target.indexOf('?') > -1) {
                target += '&SideModal=true&mid=' + id;
            } else {
                target += '?SideModal=true&mid=' + id;
            }

            //var iframe = $("<iframe name='frame_" + id + "'>").height($(window).height() - $titlePanel.height() - 50).css("width", "100%").attr("frameborder", 0).attr("src", target);
            var iframe = $("<iframe name='frame_" + id + "'>").css('margin', '0').css('margin-left', '-1px').css('padding', '0').css('height', '100%').css('width', '100%').attr('frameborder', 0).attr('src', target).addClass('filter');
            $Modal.append(iframe);

            $Modal.css('right', this.currentbody.width() * -1);
            $Modal.children('div.panel:first').find('button.close').click(this, function (e) {
                e.data.AutoClose.apply(e.data, [id]);
            });

            $Modal.attr('id', id);
            $Modal.animate({
                right: 0
            }, function () {
                //if (self != top) {
                that.currentbody.css('overflow-y', 'hidden');
                that.currentbody.addClass('modal-back');
                //}
            });

            if ($.inArray(id, top.$.ISideModal.ModalIdArray) < 0) {
                top.$.ISideModal.ModalIdArray.push(id);
            }
            //iframe 加载完后读取内容，判断内容是否改变
            // var that = this;
            that.HidePreModalNav();
            iframe.load(function () {
                var checkLoadTimes = 0;
                var iframeLoaded = function () {
                    checkLoadTimes++;
                    if (that.currentWindow.frames['frame_' + id] == undefined) {
                        return;
                    }
                    var $frameBody = $(that.currentWindow.frames['frame_' + id].document.body);
                    if ($frameBody.find('form').children().length == 0 && checkLoadTimes < 5) {
                        setTimeout(iframeLoaded, 500);
                    }
                    that.ModalBody[id] = $frameBody.clone(true);
                    var oldInputs = $(that.ModalBody[id]).find('input,select,area,radio,textarea');
                    var currentInputs = $frameBody.find('input,select,area,radio,textarea');
                    for (var i = 0; i < oldInputs.length; i++) {
                        $(oldInputs[i]).val($(currentInputs[i]).val());
                    }

                    if (/msie/.test(navigator.userAgent.toLowerCase()) && !/opera/.test(navigator.userAgent.toLowerCase())) {
                        // 兼容ie关掉iframe后文本框不能输入值的问题
                        var $ie11focus = $frameBody.find('#ie11focus');
                        if ($ie11focus.length == 0) {
                            $ie11focus = $("<input type='text' id='ie11focus' style='width:0;height:0;padding:0;margin:0;border:0;' />");
                            $frameBody.find('.sheet_container').prepend($ie11focus);
                        }
                        $ie11focus.focus();
                    }
                    //点击其他地方，关闭，这里可能会执行多次
                    // that.ClickDocumentToClose.apply(that, [id]);
                };
                iframeLoaded();

                //点击其他地方，关闭
                that.ClickDocumentToClose.apply(that, [id]);
            });

            if (typeof (params) !== 'undefined') {
                top.$.ISideModal.CustomParams[id] = params;
            }

            if ($.isFunction(hiddenCallback)) {
                this.CallBackArray[id] = hiddenCallback;
            }
        },

        SetTile: function (Text, ModalId) {
            if (ModalId) {
                $('#tile_' + ModalId).text(Text);
            } else {
                ModalId = top.$.ISideModal.ModalIdArray[top.$.ISideModal.ModalIdArray.length - 1];
                if (ModalId) {
                    this.SetTile(Text, ModalId);
                }
            }
        },

        GetParamValue: function (name) {
            var modalId = top.$.ISideModal.ModalIdArray[top.$.ISideModal.ModalIdArray.length - 1];
            if (top.$.ISideModal.CustomParams[modalId] == null || (top.$.ISideModal.CustomParams[modalId][name]) == 'undefined') {
                return null;
            } else {
                return top.$.ISideModal.CustomParams[modalId][name];
            }
        },

        ClickDocumentToClose: function (ModalId) {
            var windows = [];
            var that = this;
            windows.push(this.oldWindow);
            var currentWindow = this.oldWindow;
            while (currentWindow != top) {
                windows.push(currentWindow.parent);
                currentWindow = currentWindow.parent;
            }

            if (currentWindow == top) {
                var iframes = $(top.document).find('iframe[data-active="true"]');
                if (iframes.length > 0) {
                    windows.push(iframes[0].contentWindow);
                }
            }

            $.each(windows, function (index, obj) {
                var objEvents = $(obj.document).data('events');
                if (objEvents && objEvents['click']) {
                    var evts = objEvents['click'];
                    for (var i = 0; i < evts.length; i++) {
                        if (evts[i].namespace == 'Close_' + ModalId) {
                            return;
                        }
                    }
                }
                //console.log("绑定document");
                //为什么one绑定的事件执行不止一次？
                $(obj.document).off('click.Close_' + ModalId).one('click.Close_' + ModalId, [ModalId, that], function (e) {
                    var tid = e.data[0];
                    if ($(e.target).closest('#' + tid).length == 0 &&
                        $(e.target).closest('div.jconfirm').length == 0 &&
                        $(e.target).closest('div.modal-backdrop').length == 0 &&
                        $(e.target).closest('div.modal-dialog-confirm').length == 0 &&
                        $(e.target).closest('.DeveloperTool').length == 0 &&
                        $(e.target).closest('.DeveloperMask').length == 0) {
                        //if (top.$.ISideModal.ModalIdArray.length > 0 && tid == top.$.ISideModal.ModalIdArray[top.$.ISideModal.ModalIdArray.length - 1]) {
                        //    $.ISideModal.AutoClose(tid, true);
                        //}
                        //else if ($.inArray(ModalId, top.$.ISideModal.ModalIdArray)<0) {
                        //    return false;
                        //}
                        //else {
                        //    $.ISideModal.CloseAllModal();//一次性关闭多个嵌套侧滑框时，关闭所有
                        //    return false;
                        //}
                        if (obj == top && top.$.ISideModal.ModalIdArray.length > 1 && tid == top.$.ISideModal.ModalIdArray[0]) {
                            $.ISideModal.CloseAllModal();
                            return false;
                        }

                        if (top.$.ISideModal.ModalIdArray.length == 0) {
                            return false;
                        }

                        $.ISideModal.AutoClose(tid, true);
                        return !e.data[1].IsChanged;
                    } else {
                        e.data[1].ClickDocumentToClose.apply(e.data[1], [ModalId]);
                    }
                    return false;
                });
            });
        },

        //检查是否改变
        CheckBodyIsChange: function (ModalId) {
            var oldBody = this.ModalBody[ModalId];
            if (oldBody == null) {
                return false;
            }
            if (this.currentWindow.frames['frame_' + ModalId] == null) {
                return false;
            }
            var currentBody = $(this.currentWindow.frames['frame_' + ModalId].document.body);
            //if (oldBody[0].outerHTML != currentBody[0].outerHTML) {
            //    return true;
            //}

            var oldInputs = oldBody.find("input:not([type='file']),select,area,radio,textarea");
            var currentInputs = currentBody.find("input:not([type='file']),select,area,radio,textarea");
            for (var i = 0; i < oldInputs.length; i++) {
                var oldItem = $(oldInputs[i]);
                var currentItem = $(currentInputs[i]);
                if (oldItem.val() != currentItem.val()) {
                    return true;
                } else if (oldItem.attr('type') == 'radio' || oldItem.attr('type') == 'checkbox') {
                    if (oldItem.prop('checked') != currentItem.prop('checked')) { return true; }
                }
            }

            //判断选人控件
            var oldUsers = oldBody.find("div.SheetUser[data-datafield][data-controlkey='FormUser']");
            var currentUsers = currentBody.find("div.SheetUser[data-datafield][data-controlkey='FormUser']");
            for (var i = 0; i < oldUsers.length; i++) {
                if ($(oldUsers[i]).find('span.SheetUser-Item').length != $(currentUsers[i]).find('span.SheetUser-Item').length) {
                    return true;
                } else if ($(oldUsers[i]).find('span.SheetUser-Item').length > 0) {
                    // console.log($(oldUsers[i]).find('span.SheetUser-Item').text());
                    if ($(oldUsers[i]).find('span.SheetUser-Item').text() != $(currentUsers[i]).find('span.SheetUser-Item').text()) {
                        return true;
                    }
                }
            }

            oldUsers = oldBody.find("div.SheetUser[data-datafield][data-controlkey='FormMultiUser']");
            currentUsers = currentBody.find("div.SheetUser[data-datafield][data-controlkey='FormMultiUser']");
            for (var i = 0; i < oldUsers.length; i++) {
                if ($(oldUsers[i]).find('span.SheetUser-Item').length != $(currentUsers[i]).find('span.SheetUser-Item').length) {
                    return true;
                } else if ($(oldUsers[i]).find('span.SheetUser-Item').length > 0) {
                    // console.log($(oldUsers[i]).find('span.SheetUser-Item').text());
                    if ($(oldUsers[i]).find('span.SheetUser-Item').text() != $(currentUsers[i]).find('span.SheetUser-Item').text()) {
                        return true;
                    }
                }
            }

            //判断关联查询
            var oldQuery = oldBody.find("div[data-datafield][data-controlkey='SheetQuery']");
            var currentQuery = currentBody.find("div[data-datafield][data-controlkey='SheetQuery']");
            for (var i = 0; i < oldQuery.length; i++) {
                if ($(oldQuery[i]).find('pre').html() != $(currentQuery[i]).find('pre').html()) {
                    return true;
                }
            }

            return false;
        },

        HideLastModal: function () {
            if (top.$.ISideModal.ModalIdArray.length > 0) {
                $('#' + top.$.ISideModal.ModalIdArray[top.$.ISideModal.ModalIdArray.length - 1]).animate({
                    right: $('body').width() * -0.75
                });
            }
        },

        CloseAllModal: function () {
            for (var i = top.$.ISideModal.ModalIdArray.length - 1; i >= 0; i--) {
                this.Close(top.$.ISideModal.ModalIdArray[i]);
            }
            top.$.ISideModal.ModalIdArray = [];
        },

        //自动关闭
        AutoClose: function (ModalId, isDocuemnt) {
            var that = this;
            //判断是否改变
            if (this.CheckIsChange && this.CheckBodyIsChange(ModalId)) {
                this.IsChanged = true;
                $.IConfirm('', '确定放弃保存?放弃后数据不会被保存！', function (isTrue) {
                    that.IsChanged = false;
                    if (isTrue) {
                        // delete that.ModalBody[ModalId];
                        $.DeleteObj(that.ModalBody[ModalId]);
                        that.Close.apply(that, [ModalId]);
                    } else if (isDocuemnt) {
                        that.ClickDocumentToClose.apply(that, [ModalId]);
                    }
                });
                return;
            }
            this.Close(ModalId);
        },

        //手工关闭
        Close: function (ModalId, Params) {
            var that = this;
            if (ModalId) {
                //移除
                if (this.currentWindow == undefined) {
                    this.currentWindow = top;
                }

                that.ShowPreModalNav();

                $(this.currentWindow.document).unbind('click.Close_' + ModalId);
                this.currentWindow.$('#' + ModalId).animate({
                    right: this.currentWindow.$('body').width() * -0.75
                }, function () {
                    that.currentWindow.$('#' + ModalId).find('iframe').remove(); //先移除iframe再移除div，解决ie下新增后再打开侧滑框不能编辑文本框的问题
                    that.currentWindow.$('#' + ModalId).remove();
                    that.currentWindow.$('body').css('overflow-y', 'auto');
                    that.currentWindow.$('body').removeClass('modal-back');
                });

                var index = $.inArray(ModalId, top.$.ISideModal.ModalIdArray);
                if (index > -1) {
                    top.$.ISideModal.ModalIdArray.splice(index, 1);
                }

                if (this.CallBackArray[ModalId] && $.isFunction(this.CallBackArray[ModalId])) {
                    this.CallBackArray[ModalId].call(this, Params);
                }

                //移除后，还有的话，显示最后一个
                //this.ShowLastModal();
            } else {
                this.CloseLastModal(Params);
            }
        },

        CloseLastModal: function (params) {
            if (top.$.ISideModal.ModalIdArray.length > 0) {
                this.Close(top.$.ISideModal.ModalIdArray[top.$.ISideModal.ModalIdArray.length - 1], params);
            }
        },

        ShowLastModal: function () {
            if (top.$.ISideModal.ModalIdArray.length > 0) {
                var id = top.$.ISideModal.ModalIdArray[top.$.ISideModal.ModalIdArray.length - 1];
                $('#' + id).animate({
                    right: 0
                });
                //点击其他地方，关闭
                this.ClickDocumentToClose.apply(this, [id]);
            }
        },

        GetPreModalBody: function () {
            if (top.$.ISideModal.ModalIdArray && top.$.ISideModal.ModalIdArray.length > 1) {
                return window.frames['frame_' + top.$.ISideModal.ModalIdArray[top.$.ISideModal.ModalIdArray.length - 2]].document.body;
            } else {
                return null;
            }
        },
        //隐藏上级侧滑框的按钮
        HidePreModalNav: function () {
            if (this.currentWindow == top) {
                return;
            }
            $(this.currentWindow.document.body).find('ul.navbar-nav').hide();
        },
        //显示上级侧滑框的按钮
        ShowPreModalNav: function () {
            if (window.parent) {
                $(this.currentWindow.document.body).find('ul.navbar-nav').show();
            }
        },
        //判断通知公告是否显示
        IsAnnounceShow: function () {
            var announce = $('.announce');
            if (announce && announce.is(':visible')) {
                return true;
            }
            return false;
        }

    },

    //打开表单模态窗口
    ISheetModal: {
        SheetMoal: null,
        //url:地址,title：模态窗口标题，可为空
        Show: function (url, title, hiddenCallback) {
            url = url.indexOf('?') > -1 ? url + '&t=' + $.IGuid() : url + '?t=' + $.IGuid();
            if (this.SheetMoal) {
                this.SheetMoal.Show(url);
            } else {
                this.SheetMoal = new $.IModal(title, url, null, null, hiddenCallback);
            }
        },
        Hide: function () {
            this.SheetMoal.Hide();
        }
    },

    //获取日期时间字符串，格式yyyy-MM-dd HH:mm:ss
    IGetDateString: function (datetime) {
        var Year = datetime.getFullYear();
        var Month = datetime.getMonth() + 1;
        var Day = datetime.getDate();
        var Hour = datetime.getHours();
        var Minutes = datetime.getMinutes();
        var Seconds = datetime.getSeconds();
        var DateStr = '';

        DateStr = Year + '-';
        if (Month > 10) {
            DateStr = DateStr + Month + '-';
        } else {
            DateStr = DateStr + '0' + Month + '-';
        }
        if (Day > 10) {
            DateStr = DateStr + Day + ' ';
        } else {
            DateStr = DateStr + '0' + Day + ' ';
        }
        if (Hour > 10) {
            DateStr = DateStr + Hour + ':';
        } else {
            DateStr = DateStr + '0' + Hour + ':';
        }
        if (Minutes > 10) {
            DateStr = DateStr + Minutes + ':';
        } else {
            DateStr = DateStr + '0' + Minutes + ':';
        }
        if (Seconds > 10) {
            DateStr = DateStr + Seconds;
        } else {
            DateStr = DateStr + '0' + Seconds;
        }
        return DateStr;
    },

    //查询数组里对象跟指定对象的某个属性相等的第一个位置
    IGetIndex: function (obj, array, attr) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][attr] == obj[attr]) {
                return i;
            }
        }
        return -1;
    },

    //判断浏览器设备类型
    IIfMobile: function () {
        var MobileUA = (function () {
            var ua = navigator.userAgent.toLowerCase();

            var mua = {
                IOS: /ipod|iphone|ipad/.test(ua), //iOS
                IPHONE: /iphone/.test(ua), //iPhone
                IPAD: /ipad/.test(ua), //iPad
                ANDROID: /android/.test(ua), //Android Device
                WINDOWS: /windows/.test(ua), //Windows Device
                TOUCH_DEVICE: ('ontouchstart' in window) || /touch/.test(ua), //Touch Device
                MOBILE: /mobile/.test(ua), //Mobile Device (iPad)
                ANDROID_TABLET: false, //Android Tablet
                WINDOWS_TABLET: false, //Windows Tablet
                TABLET: false, //Tablet (iPad, Android, Windows)
                SMART_PHONE: false //Smart Phone (iPhone, Android)
            };

            mua.ANDROID_TABLET = mua.ANDROID && !mua.MOBILE;
            mua.WINDOWS_TABLET = mua.WINDOWS && /tablet/.test(ua);
            mua.TABLET = mua.IPAD || mua.ANDROID_TABLET || mua.WINDOWS_TABLET;
            mua.SMART_PHONE = mua.MOBILE && !mua.TABLET;

            return mua;
        }());
        if (MobileUA.SMART_PHONE) {
            return true;
        }
        return false;
    },

    //检查是否是严格的文本:非空，不含有特殊字符 `!@#$%^&*()-_+=[{]}\\|;:\'\",<.>/? ~！￥…（）【】、：；‘“”，。《》？
    //IgnoreChars 可不传，数组，排除的类
    IValidateStrictText: function (str, IgnoreChars) {
        if (str == null || str.trim() == '') {
            return false;
        }
        var SpecialChars = ['`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', '{', ']', '}', '\\', '|', ';', ':', '\'', '\"', ',', '<', '.', '>', '/?', ' ', '~', '！', '￥', '…', '（', '）', '【', '】', '、', '：', '；', '‘', '“', '”', '，', '。', '《', '》', '？'];
        if (!$.isEmptyObject(IgnoreChars)) {
            for (var i = 0; i < IgnoreChars.length; i++) {
                var index = SpecialChars.indexOf(IgnoreChars[i]);
                if (index > -1) { SpecialChars.splice(index, 1); }
            }
        }
        for (var i = 0; i < str.length; i++) {
            if (SpecialChars.indexOf(str.charAt(i)) > -1) {
                return false;
            }
        }
        return true;
    },

    //检查是否是严格的文本:非空，不含有特殊字符 `!@#$%^&*()-_+=[{]}\\|;:\'\",<.>/? ~！￥…（）【】、：；‘“”，。《》？
    //IgnoreChars 可不传，数组，排除的类
    IValidatePassword: function (str) {
        if (str == null || str.trim() == '') {
            return false;
        }
        var match = /^[a-zA-Z0-9,.'"~!@@#$%^&*()_+{}[]|\/:;<>?`-=·！￥…（）—【】、，。《》？]*$/;
        var match1 = /\s/;
        if (str.length < 6 || str.length > 20) {
            return false;
        }
        for (var ooo = 0; ooo < str.length; ooo++) {
            if (!match.test(str.charAt(ooo)) || match1.test(str.charAt(ooo))) { return false; }
        }
        //密码强度
        var match2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (!match2.test(str)) { return false; }
        return true;
    },

    //校验电话号码
    IValidateMobile: function (str) {
        if (str == null || str.trim() == '') {
            return false;
        }
        var expression = /^1[3-8]\d{9}$/;
        return expression.test(str);
    },

    //校验邮箱
    IValidateEmail: function (str) {
        if (str == null || str.trim() == '') {
            return false;
        }
        var expression = /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/;
        return expression.test(str);
    },

    //校验微信号
    IValidateChat: function (str) {

    },
    /*
  鼠标滑过元素时在页面上生成缩略图
  selector：元素选择器
  imgPath：图片的路径
  */
    Ipreview: function (selector) {
        var imgPath = selector.attr('data-imgurl');
        if (imgPath == 'null' || imgPath == null || imgPath == void 0) {
            return;
        }
        var $preImgHtml = $('<div class="preimg"><img src="' + imgPath + '"  class="pcimg" /></div>');

        selector.mouseover(function (e) {
            selector.after($preImgHtml);
            $('.preimg').css({
                top: e.clientY + 3,
                left: e.clientX + 10
            });
        }).mousemove(function (e) {
            $('.preimg').css({
                top: e.clientY + 3,
                left: e.clientX + 10
            });
        }).mouseout(function () {
            $('.preimg').remove();
        });
    },

    //设置Cookie
    ISetCookie: function (name, value) {
        var str = name + '=' + escape(value);
        document.cookie = str;
    },

    //读取Cookie
    IGetCookie: function (name) {
        var arr = document.cookie.split(';');
        if (!name) { return null; }
        var name = name.trim();
        for (var i = 0; i < arr.length; i++) {
            var key = arr[i].split('=')[0].trim();
            if (key == name) {
                return arr[i].split('=')[1];
            }
        }
        return null;
    },

    //删除Cookie
    IRemoveCookie: function (name) {
        document.cookie = name + '=;expires=' + (new Date(0)).toGMTString();
    },

    // 字符图标选择器
    IFontPicker: function () {
        var source = [];
        var fontPickerCollection = [];
        var init = function () {
            var path = document.location.href;
            var pathName = document.location.pathname;
            var localPath = path.substr(0, path.indexOf(pathName));
            $.ajaxSettings.async = false;
            $.getJSON('./static/selection.json', function (data) {
                var icons = [];
                for (var i = 0, len = data.icons.length; i < len; i++) {
                    icons.push('icon-' + data.icons[i].properties.name);
                }
                source = icons;
            });
        };
        init();

        this.AddFontPicker = function (selecter) {
            if (source.length > 0) {
                var fontPicker = $(selecter).fontIconPicker({
                    source: source,
                    emptyIcon: false,
                    hasSearch: false
                });
                fontPickerCollection.push({
                    'selecter': selecter.selecter,
                    'picker': fontPicker
                });
            }
        };
        var getFontPicker = function (selecter) {
            if (selecter) {
                if (fontPickerCollection.length == 1) return fontPickerCollection[0].picker;
                for (var i = 0, len = fontPickerCollection.length; i < len; i++) {
                    if (fontPickerCollection[i].picker && fontPickerCollection[i].picker.selector == selecter.selector) {
                        return fontPickerCollection[i].picker;
                    }
                }
                return null;
            }
        };
        //动态参数
        this.SetIcon = function (icon, selecter) {
            var fontPicker = null;
            if (!selecter) {
                fontPicker = fontPickerCollection[0].picker;
            } else {
                fontPicker = getFontPicker(selecter);
            }
            if (fontPicker) {
                fontPicker.refreshPicker({
                    source: source,
                    emptyIcon: true,
                    emptyIconValue: icon,
                    hasSearch: false
                });
            }
        };
        return this;
    },
    isArray: function (o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    },
    IShowLoading: function (text) {
        var text = text || '处理中，请稍等...';
        var $loading = $('.loading-back');
        if ($loading.length > 0) {
            $loading.find('load-title').text(text).end().show();
        } else {
            $loading = $('<div class="loading-back">' +
                '<div class="loading">' +
                '<i class="fa fa-spinner fa-4x fa-pulse"></i>' +
                '<span class="load-title">' + text + '</span>' +
                '</div>' +
                '</div>');
            $('body').append($loading.show());
        }
    },
    IHideLoading: function () {
        $('.loading-back').hide();
    },
    //只允许输入中英文数字符号，目的是过滤表情
    IFilterCharacter: function (str) {
        var newStr = str;
        var range = /[\u4e00-\u9fa5a-zA-Z0-9\~\!\@\#\$\%\&\*\(\)\_\+\|\:\"\<\>\?\/\-\=\[\]\;\,\.\！\￥\……\：\“\”]/g;
        var arr = str.match(range);
        if (arr == null) { newStr = ""; }
        else { newStr = arr.join(''); }
        return newStr;
    },
    //数字转成千分位(对小数位没有做限制)
    IToKbit: function (num) {
        var temp = num;
        var num = (num || 0).toString(),
            result = '';
        if (isNaN(num)) return 0;
        var numStr = num + '';
        var potIndex = numStr.indexOf('.');
        var decimal = '';
        if (potIndex > -1) {
            num = numStr.slice(0, potIndex);
            decimal = numStr.slice(potIndex);
        }
        num = parseInt(num);
        var negative = false; //负数
        if (parseFloat(temp) < 0) {
            negative = true;
            num = Math.abs(num) + '';
        }
        num += '';
        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) {
            result = num + result;
        }
        if (potIndex > -1) {
            result += decimal;
        } else {
            //result += '.00';
        }
        if (negative) {
            result = '-' + result;
        }
        return result;
    },
    //获取当月最后一天日期
    GetFirstAndLastMonthDay: function (year, month) {
        var firstdate = year + '-' + month + '-01';
        var day = new Date(year, month, 0);
        var lastdate = year + '-' + month + '-' + day.getDate();
        return lastdate;
    },
    //获取本周的第一天和最后一天
    GetFirstAndLastdayweek: function () {
        var time = new Date();
        if (time.getDay() != 0) {
            time.setDate(time.getDate() - time.getDay() + 1);
        } else {
            time.setDate(time.getDate() - 6);
        }
        weekfirstday = time.getFullYear() + '-' + (time.getMonth() - 0 + 1) + '-' + time.getDate();
        time.setDate(time.getDate() + 6);
        weekdayLast = time.getFullYear() + '-' + (time.getMonth() - 0 + 1) + '-' + time.getDate();
        return [weekfirstday, weekdayLast];
    },
    //获取本季第一天，最后一天
    GetFirstAndLastDayQuarter: function () {
        var mydate = new Date();
        var month = mydate.getMonth() - 0 + 1;
        var year = mydate.getFullYear();
        if (month >= 1 && month <= 3) {
            var firstdate = year + '-01-01';
            var day = new Date(year, 3, 0);
            var lastdate = year + '-03-' + day.getDate(); //获取第一季度最后一天日期
            return [firstdate, lastdate];
        } else if (month >= 4 && month <= 6) {
            var firstdate = year + '-04-01';
            var day = new Date(year, 6, 0);
            var lastdate = year + '-06-' + day.getDate(); //获取第二季度最后一天日期
            return [firstdate, lastdate];
        } else if (month >= 7 && month <= 9) {
            var firstdate = year + '-07-01';
            var day = new Date(year, 9, 0);
            var lastdate = year + '-09-' + day.getDate(); //获取第三季度最后一天日期
            return [firstdate, lastdate];
        } else if (month >= 10 && month <= 12) {
            var firstdate = year + '-10-01';
            var day = new Date(year, 12, 0);
            var lastdate = year + '-12-' + day.getDate(); //获取第四季度最后一天日期
            return [firstdate, lastdate];
        }
    },
    nodeToString: function (node) {
        var tmpNode = document.createElement('div');
        tmpNode.appendChild(node.cloneNode(true));
        var str = tmpNode.innerHTML;
        tmpNode = node = null; // prevent memory leaks in IE
        return str;
    },
    ClearArray: function (array) {
        if (array) {
            var obj;
            for (var i = array.length - 1; i >= 0; i--) {
                obj = array.pop();
                obj.free && obj.free();
                obj = null;
            }
        }
    },
    // 函数节流
    Throttle: function (fn, context, delay) {
        return function () {
            var args = arguments;
            clearTimeout(fn.timerId);
            fn.timerId = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    },
    ////Date(1506476541000)/ 格式的日期转为date;
    GetDateTime(d) {
        return eval('new ' + d.substr(1, d.length - 2));
    }
});



// WEBPACK FOOTER //
// ./src/lib/H3/H3Plugins/H3.plugins.system.js