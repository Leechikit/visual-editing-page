jQuery.extend($.ListView, {
    _getEventsSourceUrl: function (params) {
        if (typeof (params) == "undefined") {
            params = {};
        }
        $.extend(params, {
            ActionName: "DoAction",
            Command: "Load",
            QueryCode: this.QueryCode,
            ListViewDisplayMode: ListViewDisplayMode.Calendar,
            scopeType: $.AppFilter.getScopeType(),
            searchParamsJson: $.AppFilter.getFiterJson() 
        });
        return this.AjaxUrl + "?PostData=" + JSON.stringify(params);
    },

    InitBody: function () {
        var that = this;
        this.InitCalendarTools();
        this.$Calendar = $("<div></div>");

        $(this.Element).append(this.$Calendar);
        this.CalendarView = "week";
        this.Calendar = this.$Calendar.calendar({
            tmpl_path: "/Content/plugins/bootstrap-calendar/tmpls/",
            tmpl_cache: false,
            events_source: this._getEventsSourceUrl(),
            language: "zh-CN",
            view: "week",
            //day:"2013-03-12",
            first_day: 1, // 星期一为一周的第一天
            display_week_numbers: true,
            weekbox: true,
            onAfterEventsLoad: function (events) {
                // 设置event显示的样式
                //var eventClass = ["event-important", "event-warning", "event-info", "event-inverse", "event-success", "event-special"];
                //var eventClassLength = eventClass.length;
                if (that.CalendarView == 'week') {
                    for (var i = 0, len = events.length; i < len; i++) {
                        events[i].class = "event-info";
                    }
                }
            },
            onAfterViewLoad: function (view) {
                var el = this.context[0];
                var datas = this.options.events;

                if (that.CalendarView == 'week') {
                    for (var i = 0; i < datas.length; i++) {
                        //running/finished/cancel  0 进行  1已完成   3取消
                        var id = datas[i].id;
                        var status = datas[i].Status;
                        var cls = "";
                        var tooltipName = "";
                        if (status == 0) {
                            $(el).find("a[data-event-id='" + id + "']").parent()
                                .addClass("running")
                                .attr("data-toggle", "tooltip")
                                .attr("data-original-title", "进行中");
                        }
                        else if (status == 1) {
                            $(el).find("a[data-event-id='" + id + "']").parent()
                                .addClass("finished");
                        }
                        else if (status == 3) {
                            $(el).find("a[data-event-id='" + id + "']").parent()
                                .addClass("cancel").attr("data-toggle", "tooltip").attr("data-original-title", "已取消");
                        }
                    }
                    if ($.ListView.ViewContext.Selectable) {
                        $("a.cal-event-week").each(function (index, el) {
                            var id = $.IGuid();
                            $(el).before($("<input type='checkbox' name='calendarbox' style='display: none;' id='" + id + "'/><label for='" + id + "' style='display:inline-flex;position:relative;'></label>"));
                        })
                    }
                    // 点击event打开表单
                    $("a.cal-event-week").click(function () {
                        $.ISideModal.Show($(this).attr("href"), that.ViewContext.DisplayName);
                        return false;
                    });
                    if (datas.length == 0 && that.CalendarView == 'week') {
                        that.$Calendar.append("<div class='nodata'><img src='/Content/images/meiyoushuju.png'><span class='nodata-title'>还没有任何数据</span></div>")
                    }


                }
                else {
                    for (var i = 0; i < datas.length; i++) {
                        //running/finished/cancel  0 进行  1已完成   3取消
                        var id = datas[i].id;
                        var status = datas[i].Status;
                        var cls = "";
                        var tooltipName = "";
                        if (status == 0) {
                            $(el).find("a[data-event-id='" + id + "']")
                                .attr("data-event-class", "running")
                        }
                        else if (status == 1) {
                            $(el).find("a[data-event-id='" + id + "']")
                                .attr("data-event-class", "finished");
                        }
                        else if (status == 3) {
                            $(el).find("a[data-event-id='" + id + "']")
                                .attr("data-event-class", "cancel");
                        }
                    }
                    $(el).find('.events-list a').each(function () {
                        $(this).removeClass('pull-left event');
                        $(this)[0].removeAttribute('data-toggle');
                        var text = $(this).attr('data-original-title');
                        $(this).html(text);
                        $(this).removeAttr('data-original-title');
                        $(this).off('click').on('click', function () {
                            $.ISideModal.Show($(this).attr("href"), that.ViewContext.DisplayName);
                            return false;
                        });
                    });

                    $(el).find('.events-list').each(function () {
                        if ($(this).find('a').length > 3) {
                            //超过3个隐藏，添加标记
                            $(this).find('a:gt(2)').hide();
                            $(this).parent().addClass("has-hide-event");
                            $(this).parent().append('<span class="more-event-btn">更多<span>')
                        }
                    });

                    $(el).find(".more-event-btn").off('click.showEvent').on('click.showEvent', function (e) {
                        var eventTarget = $(this).parents('.cal-month-day').find('.events-list a');
                        if (eventTarget.length > 3) {
                            items = [];
                            for (var i = 0, len = eventTarget.length; i < len; i++) {
                                var DisplayName = $(eventTarget[i]).text();
                                var item = { title: DisplayName, icon: null, type: "item", fn: openFromUrl, url: $(eventTarget[i]).attr("href") };
                                items.push(item);
                            }
                            var direction = "right";
                            var offset = $(this).offset();
                            if ($(window).width() - offset.left < 500) {
                                direction = "left";
                            }
                            basicContext.show(items, e, direction);
                        }
                    });

                    //取消点击事件  '.cal-month-day, .cal-year-box .span3'
                    var items = [];
                    $(el).find(".cal-month-day").off("click");
                    //取消Calendar默认的一些事件
                    $(el).find(".cal-cell").off("dblclick");
                    $(el).find(".cal-month-day").off("mouseenter");
                    //打开表单
                    var openFromUrl = function (e) {
                        var num = $(this).attr('data-num');
                        var url = items[num].url;
                        $.ISideModal.Show(url, that.ViewContext.DisplayName);
                        return false;
                    }
                }
                $(el).find("a").off("mouseenter").on('mouseenter.list', function (e) {
                    var $that = $(this);
                    var clientWidth = this.clientWidth;
                    var scrollWidth = this.scrollWidth;
                    if (clientWidth < scrollWidth) {
                        var tooltipText = $that.text() || "";
                        if (tooltipText != "") {
                            var offset = $that.offset();
                            $tableTip.text(tooltipText).css({
                                top: offset.top - $tableTip.height() - 30,
                                left: offset.left + $that.outerWidth() - $tableTip.outerWidth() + 25,
                            }).toggle();
                            e.stopPropagation();
                            return false;
                        }
                    }
                });
                $(el).find("a").off("mouseleave.list").on('mouseleave.list', function () {
                    $tableTip && $tableTip.hide();
                });

                that.GetResetHeight();
            }
        });
    },

    InitCalendarTools: function () {
        var $CalendarTools = $(' <div class="btn-group" role="group" id="mycalendar">');
        $CalendarTools.append('<button type="button" class="btn btn-info" data-calendar-view="month">月模式</button>');
        $CalendarTools.append('<button type="button" class="btn btn-info active" data-calendar-view="week">周模式</button>');

        //周模式按钮
        var $CalendarTools_weekView = $('<div class="btn-group week-group" role="group">');
        $CalendarTools_weekView.append('<button type="button" class="btn btn-info week" data-calendar-nav="prev">上一周</button>');
        $CalendarTools_weekView.append('<button type="button" class="btn btn-info week" data-calendar-nav="next">下一周</button>');
        $CalendarTools_weekView.append('<button type="button" class="btn btn-info week" data-calendar-nav="today">返回今日</button>');
        $CalendarTools.append($CalendarTools_weekView);

        //月模式按钮
        var $CalendarTools_monthView = $('<div class="btn-group month-group" role="group" style="display:none;">');
        var date = new Date();

        var year = '<div class="btn-group">';
        year += '<button type="button" class="btn btn-info prev-year">&lt;</button>';
        year += '<div class="btn-group btn-year">';
        year += '<button class="dropdown-toggle" data-toggle="dropdown">';
        year += '<span class="current-year">' + date.getFullYear() + '</span>';
        year += '</button>';
        year += '<ul class="dropdown-menu">';
        for (var i = 2015; i <= 2025; i++) {
            year += '<li><a>' + i + '</a></li>';
        }
        year += '</ul>';
        year += '</div>';
        year += '<button type="button" class="btn btn-info next-year">&gt;</button>';
        year += '</div>';
        $CalendarTools_monthView.append($(year));

        var mouth = '<div class="btn-group">';
        mouth += '<button type="button" class="btn btn-info prev-month" data-calendar-nav="prev">&lt;</button>';
        mouth += '<div class="btn-group btn-month">';
        mouth += '<button class="dropdown-toggle" data-toggle="dropdown">';
        mouth += '<span class="current-month">' + (date.getMonth() + 1) + '</span>';
        mouth += '</button>';
        mouth += '<ul class="dropdown-menu">';
        for (var i = 1; i <= 12; i++) {
            mouth += '<li><a>' + i + '</a></li>';
        }
        mouth += '</ul>';
        mouth += '</div>';
        mouth += '<button type="button" class="btn btn-info next-month" data-calendar-nav="next">&gt;</button>';
        mouth += '</div>';
        $CalendarTools_monthView.append($(mouth));
        $CalendarTools_monthView.append('<div class="btn-group"><button type="button" class="btn btn-info month" data-calendar-nav="today">今日</button></div>');
        $CalendarTools.append($CalendarTools_monthView);
        $(this.Element).append($('<div class="form-inline">').append($CalendarTools));

        //绑定事件
        var that = this;
        //切换视图   month-week
        $CalendarTools.find("button[data-calendar-view]").each(function () {
            var $this = $(this);
            $this.click(function () {
                var view = $this.data("calendar-view");
                that.CalendarView = view;
                if (view == "week") {
                    $CalendarTools_weekView.show();
                    $CalendarTools_monthView.hide();
                } else if (view == "month") {
                    $CalendarTools_weekView.hide();
                    $CalendarTools_monthView.show();
                }
                that.Calendar.view($this.data("calendar-view"));
                $CalendarTools.find("button[data-calendar-view]").each(function () {
                    $(this).removeClass("active");
                });
                $(this).addClass("active");
            });
        });
        //调整数据日期
        $CalendarTools.find("button[data-calendar-nav]").each(function () {
            var $this = $(this);
            $this.click(function () {
                that.Calendar.navigate($this.data("calendar-nav"));
                if (that.CalendarView == 'month') {
                    var month_label = $(this).parents('.month-group').find('.current-month');
                    var month = parseInt($(month_label).text());
                    if ($this.data("calendar-nav") == "prev") {
                        month--;
                    }
                    else if ($this.data("calendar-nav") == "next") {
                        month++;
                    } else if ($this.data("calendar-nav") == "today") {
                        month_label.html(date.getMonth() + 1);
                        $(this).parents('.month-group').find('.current-year').html(date.getFullYear());
                        return;
                    }
                    if (month == 0) {
                        month = 12;
                    } else if (month == 13) {
                        month = 1;
                    }
                    month_label.html(month);
                }
            });
        });
        //年份左右切换事件
        $CalendarTools.find('.month-group .prev-year,.month-group .next-year').each(function () {
            $(this).click(function () {
                var IsYearPrev, year, month;
                IsYearPrev = $(this).hasClass("prev-year") ? true : false;
                year = parseInt($(this).parents('.month-group').find('.current-year').text());
                month = parseInt($(this).parents('.month-group').find('.current-month').text());
                if (IsYearPrev) {
                    --year;
                } else {
                    ++year;
                }
                $(this).parents('.month-group').find('.current-year').html(year);
                month = month < 10 ? "0" + month : month;
                var day = year + "-" + month + "-01";
                that.Calendar.options.day = day;
                that.Calendar.view();
            });
        });
        //时间下拉选择
        $CalendarTools.find('.month-group ul li a').each(function () {
            $(this).click(function () {
                var IsMonthChange = $(this).parents('.btn-month').length == 0 ? false : true;//判断是否是月份改变
                var year, month;
                if (IsMonthChange) {
                    var year = parseInt($(this).parents('.month-group').find('.current-year').text());
                    var month = parseInt($(this).text());
                    $(this).parents('.btn-month').find('.current-month').html(month);
                } else {
                    var year = parseInt($(this).text());
                    var month = parseInt($(this).parents('.month-group').find('.current-month').text());
                    $(this).parents('.month-group').find('.current-year').html(year);
                }
                month = month < 10 ? "0" + month : month;
                var day = year + "-" + month + "-01";
                that.Calendar.options.day = day;
                that.Calendar.view();
            });
        });
    },
    BindEvent: function () {

    },
    GetSelected: function () {
        var Rows = [];
        this.$Calendar.find("input:checked[name='calendarbox']").each(function () {
            Rows.push({ ObjectId: $(this).parent().find("a.cal-event-week").attr("data-event-id") });
        });

        return Rows;
    },
    GetResetHeight: function () {
        try {
            var bodyHeight = $(window).height() - $(this.$Calendar).offset().top - 40;
            $(this.$Calendar).height(bodyHeight);
            $(this.$Calendar).css("overflow", "auto");
        } catch (e) { }
    },
    RefreshView: function (params) {
        this.Calendar.setOptions({ events_source: this._getEventsSourceUrl(params) });
        this.Calendar.view();
    }
});