
(function ($) {
    var listView = $.ListView,
        leftTopTableId = $.IGuid(),
        leftBottomTableId = $.IGuid(),
        rightTopTableId = $.IGuid(),
        rightBottomTableId = $.IGuid(),
        checkboxColumnWidth = 0,
        sequenceNumberColumnWidth = 0,
        tdPaddingValue = 18,
        pageSize = localStorage[listView.QueryCode + "pagesize"],
        initFlag = true,
        changingVisibleColumns = false;

    var listViewContext,
        $listViewContainer,
        $tablesContainer = $('<div id="tablesContainer"></div>'),
        $leftTopTableContainer = $('<div id="leftTopTableContainer"></div>'),
        $leftBottomTableContainer = $('<div id="leftBottomTableContainer" class="coordinate-part"></div>'),
        $rightTopTableContainer = $('<div id="rightTopTableContainer"></div>'),
        $rightBottomTableContainer = $('<div id="rightBottomTableContainer" class="coordinate-part"></div>'),
        $placeholderForColumnText = $('<span id="placeholderForColumnText"></span>'),
        $leftTopTable,
        $leftBottomTable,
        $rightTopTable,
        $rightBottomTable,
        $leftBottomTableHeaderRow,
        $rightBottomTableHeaderRows = [],
        $rcHandle;

    $.extend($.ListView, {
        InitBody: function () {
            $listViewContainer = $(listView.Element);
            $listViewContainer.find("div.table-page[id^='bar-']").remove();

            var that = this;
            that.SortName = that.ViewContext.SortBy;//供导出使用，也可以其他地方
            that.SortOrder = that.ViewContext.SortDirection == listView.SortDirection.Ascending ? "asc" : "desc";
            this.QueryParams = {};

            initBodyStructure();
            coordinateTables();
            initBootstrapTables();

            $rightBottomTable.parents("div.bootstrap-table").find("div.fixed-table-toolbar").find("button").hide();

            window.onresize = function () {
                that.GetResetHeight();
                setScrollSetting();
                setRightPartMinWidth();
            }

            $listViewContainer.on("click", "#toggleSearch", function () {
                setTimeout(setScrollSetting, 500);
            });
        },

        GetSelected: function () {
            return $leftBottomTable ? $leftBottomTable.bootstrapTable("getSelections") : [];
        },

        RefreshView: function (params) {
            listView.QueryParams = params;
            $('#leftTopTableContainer .bs-checkbox input[type="checkbox"]').prop("checked", false);
            $rightBottomTable.bootstrapTable("refresh");
        },

        RefreshViewIncludeHeader: function () {
            $listViewContainer.find(".clearfix").remove();

            $leftTopTable && $leftTopTable.remove();
            $leftBottomTable && $leftBottomTable.remove();
            $rightTopTable.remove();
            $rightBottomTable.remove();

            $tablesContainer.scrollTop(0);
            $tablesContainer.scrollLeft(0);

            listView.InitBody();
        },

        GetResetHeight: function () {
            try {
                var bodyHeight = $(window).height() - $tablesContainer.offset().top - 40;
                $tablesContainer.height(bodyHeight);
            } catch (e) { }
        },

        SetMainContentWidth: function () {
            setRightPartMinWidth();
            var data = $rightBottomTable.data("bootstrap.table");
            data && data.resetView();
        },

        OperateFormatter: function (value, row, index, field) {
            var that = $.ListView;
            var orgfield = this.field;
            var parentfield = "";
            field = this.field;

            if (field == "operatebtn") {
                return getOperateButtonHtml(row.Status);
            }

            var newHeader = $.ListView.ViewContext.Columns;
            if (!$.ListView.ViewContext.Columns[field] && field.indexOf('.') > -1 && $.ListView.ViewContext.Columns[field.split('.')[0]]) {
                newHeader = $.ListView.ViewContext.Columns[field.split('.')[0]].ChildColumns;
                parentfield = field.split('.')[0];
                field = field.split('.')[1];
            }
            if (value != null && value.constructor == String && (value.indexOf("<") || value.indexOf(">"))) {
                value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }
            if (value != null && !isNaN(value) && newHeader[field].ShowMode && newHeader[field].ShowMode == 1) {
                value = $.IToKbit(value);
            }

            if (value != null && value.IsCustom && value.Color != -1) {
                value = "<span style='padding: 5px 15px 5px 15px;border-radius:4px; color:#fff;background-color:#" + value.Color.toString(16) + ";'>" + value.Value + "</span>";
            }

            if (typeof value == "string" && isJsonLike(value)) {
                try {
                    value = JSON.parse(value);

                    var newvalue = "";
                    for (var key in value) {
                        newvalue += value[key] + " ";
                    }
                    //return "<span title='" + newvalue + "'>" + newvalue + "</span>";
                    value = "<span>" + newvalue + "</span>";
                }
                catch (e) {
                    value = "--";
                }
            }

            if (field == "Name" && !$.isEmptyObject(value) && value.IsCustom) {
                var params = "";
                if (value.Parameters != null) {
                    params = JSON.stringify(value.Parameters);
                }
                return "<a class=\"myname\" data-Parameters='" + params + "'   ObjectId=\"" + value.ObjectId + "\" onclick=\"javascript:$.IShowForm('" + value.SchemaCode + "','" + value.ObjectId + "',$(this).attr('data-Parameters'));\" href=\"javascript:void(0)\" >" + value.Value + "</a>";
            }
            if (value == null || value.toString().trim() == "") value = "--";
            if (field == "ActivityName") {
                var instanceId = row["WorkflowInstanceId"];
                if (instanceId && $.ListView.WorkflowState && $.ListView.WorkflowState[instanceId]) {
                    value = "";
                    var tmp = [];
                    for (var i = 0, len = $.ListView.WorkflowState[instanceId].length; i < len; i++) {
                        // value += $.ListView.WorkflowState[instanceId][i].ActivityName + ";";
                        tmp.push($.ListView.WorkflowState[instanceId][i].ActivityName);
                    }
                    //去重
                    tmp = tmp.distinct();
                    value = tmp.join(';');
                }
            } else if (field == "Participant") {
                var instanceId = row["WorkflowInstanceId"];
                if (instanceId && $.ListView.WorkflowState && $.ListView.WorkflowState[instanceId]) {
                    value = "";
                    var tmp = [];
                    for (var i = 0, len = $.ListView.WorkflowState[instanceId].length; i < len; i++) {

                        tmp.push($.ListView.WorkflowState[instanceId][i].UserName);
                        //value += $.ListView.WorkflowState[instanceId][i].UserName + ";";
                    }
                    //去重
                    tmp = tmp.distinct();
                    value = tmp.join(';');
                }
            }
            if ((newHeader[field].Url == null || newHeader[field].Url == "") && !isArray(value)) {
                var newvalue = value;
                if (field == "Status") {
                    if (newvalue == $.ListView.BizObjectStatus.Draft || newvalue == "--") {
                        return "<span>草稿</span>";
                    }
                    else if (newvalue == $.ListView.BizObjectStatus.Running)
                        return "<span>进行中</span>";
                    else if (newvalue == $.ListView.BizObjectStatus.Canceled)
                        return "<span>已取消</span>";
                    else {
                        return "<span>已结束</span>";
                    }
                }
                //return "<span title='" + newvalue + "'>" + newvalue + "</span>";
                return "<span>" + newvalue + "</span>";
            }
            var url = newHeader[field].Url;
            // 需要替换的参数
            var params = newHeader[field].Url.match(/\{.*?\}/g);
            if (isArray(value)) {
                if (value.length > 0) {
                    html = "";
                    if (parentfield) {
                        var val = "";
                        for (var i = 0; i < value.length; i++) {
                            if (value[i] != null && !isNaN(value[i]) && newHeader[field].ShowMode && newHeader[field].ShowMode == 1) {
                                value[i] = $.IToKbit(value[i]);
                            }
                            if (i >= 6) {
                                val += " " + value[i];
                                continue;
                            }
                            val += " " + value[i];

                            var newvalue = "  ";
                            if (value[i] != void 0 && value[i] !== "" && value[i] != null) {
                                newvalue = value[i];
                            }
                            if ($.isArray(newvalue)) {
                                var urlArr = [];
                                var ObjectId = "";
                                var tempurl = url;
                                if (params) {
                                    for (var j = 0; j < params.length; j++) {
                                        var key = params[j].replace("{", "").replace("}", "");
                                        if (orgfield.indexOf(".") > -1 && !(key.indexOf(".") > -1)) {
                                            key = parentfield + "." + key;
                                        }
                                        var temp = [];
                                        if (key.toLocaleLowerCase() == "objectid") {
                                            temp = row[parentfield + ".ObjectId"] || row[parentfield + ".ObjectID"];
                                        } else {
                                            temp = row[key];
                                        }
                                        temp = temp[i];
                                        if ($.isArray(temp)) {   //子表中关联多选情况
                                            for (var m = 0; m < temp.length; m++) {
                                                ObjectId = temp[m];
                                                urlArr.push(tempurl.replace(params[j], ObjectId));
                                            }
                                        } else if (typeof temp == 'string') {  //子表中单人情况
                                            ObjectId = temp;
                                            urlArr.push(tempurl.replace(params[j], ObjectId));
                                        }
                                    }
                                }
                                if (urlArr.length == 0)
                                    html += "<tr style='background-color: transparent;height: auto;line-height: inherit;'><td class='inner-table' style='padding: 0px !important;height:17px;'>" + newvalue.join(";") + "</td></tr>";
                                else {
                                    if (ObjectId != "") {
                                        html += "<tr style='background-color: transparent;height: auto;line-height: inherit;'><td class='inner-table' style='padding: 0px !important;height:17px;'>";
                                        for (var kk = 0; kk < urlArr.length; kk++) {
                                            if (newvalue[kk] == undefined) break;
                                            if (kk != 0) html += ";";
                                            html += "<a class=\"myname\" ObjectId=\"" + ObjectId + "\"  href=\"javascript: $.ISideModal.Show('" + urlArr[kk] + "');\"' >" + newvalue[kk] + "</a>";
                                        }

                                        html += "</td></tr>";

                                    }
                                    else {
                                        html += "<tr style='background-color: transparent;height: auto;line-height: inherit;'><td class='inner-table' style='padding: 0px !important;height:17px;'>";
                                        for (var kk = 0; kk < urlArr.length; kk++) {
                                            if (newvalue[kk] == undefined) break;
                                            if (kk != 0) html += ";";
                                            html += "<a  href=\"javascript: $.ISideModal.Show('" + urlArr[kk] + "');\"' >" + newvalue[kk] + "</a>";
                                        }
                                        html += "</td></tr>";
                                    }
                                }
                            }
                            else {
                                var tempurl = url;
                                //地址逻辑
                                var ObjectId = "";
                                if (params) {
                                    for (var j = 0; j < params.length; j++) {
                                        var key = params[j].replace("{", "").replace("}", "");
                                        if (orgfield.indexOf(".") > -1 && !(key.indexOf(".") > -1)) {
                                            key = parentfield + "." + key;
                                        }
                                        if (key.toLocaleLowerCase() == "objectid") {
                                            ObjectId = row[parentfield + "." + "ObjectId"] || row[parentfield + "." + "ObjectID"];
                                            tempurl = tempurl.replace(params[j], ObjectId);
                                        } else {
                                            tempurl = tempurl.replace(params[j], orgfield.indexOf(".") > -1 ? row[key][i] : row[key]);
                                        }
                                    }
                                }
                                if (tempurl == "")
                                    html += "<tr style='background-color: transparent;height: auto;line-height: inherit;'><td class='inner-table' style='padding: 0px !important;height:17px;'>" + newvalue + "</td></tr>";
                                else {
                                    if (ObjectId != "")
                                        html += "<tr style='background-color: transparent;height: auto;line-height: inherit;'><td class='inner-table' style='padding: 0px !important;height:17px;'>" + "<a class=\"myname\" ObjectId=\"" + ObjectId + "\"  href=\"javascript: $.ISideModal.Show('" + tempurl + "');\"' >" + newvalue + "</a>" + "</td></tr>";
                                    else
                                        html += "<tr style='background-color: transparent;height: auto;line-height: inherit;'><td class='inner-table' style='padding: 0px !important;height:17px;'>" + "<a  href=\"javascript: $.ISideModal.Show('" + tempurl + "');\"' >" + newvalue + "</a>" + "</td></tr>";
                                }
                            }
                        }
                        value.length > 6 && (html += "<tr style='background-color: transparent;height: auto;line-height: inherit;'><td class='tooltd inner-table no-tip' style='padding: 0px !important;height:17px;'>......</td></tr>");
                        html += "</table>";
                        html = "<table  data-text='" + val + "'>" + html;
                    }
                    else {
                        if (url == "") {
                            var text = value.join(";");
                            html = "<div class='ellipTxt' data-text='" + text + "'>" + text + "</div>";
                        } else {
                            var urls = [];
                            //这里主要是为了关联多表单情况
                            for (var i = 0; i < value.length; i++) {
                                //每个value数组中的值对应一个url
                                var u = url;
                                if (params != null) {
                                    for (var j = 0; j < params.length; j++) {
                                        var key = params[j].replace("{", "").replace("}", "");
                                        if (key.toLocaleLowerCase() == "objectid") {
                                            u = u.replace(params[j], row["ObjectId"] || row["ObjectID"]);
                                        } else {
                                            for (var k in row) {
                                                if (k == key || k.indexOf('.' + key) > -1) {
                                                    u = u.replace(params[j], $.isArray(row[k]) ? row[k][i] : row[k]);
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                urls.push(u);
                            }
                            for (var i = 0; i < urls.length; i++) {
                                html += "<a  href=\"javascript: $.ISideModal.Show('" + urls[i] + "');\"' >" + (value[i] != void 0 ? value[i] : "--") + "</a>;";
                            }
                            if (html != "") {
                                //去掉最后一个  ；
                                html = html.substring(0, html.length - 1);
                            }
                        }
                    }
                    return html;
                }
            }
            else {
                //地址逻辑
                var ObjectId = "";
                if (params != null) {
                    for (var i = 0; i < params.length; i++) {
                        var key = params[i].replace("{", "").replace("}", "");
                        if (key.toLocaleLowerCase() == "objectid") {
                            ObjectId = row["ObjectId"] || row["ObjectID"];
                            url = url.replace(params[i], ObjectId);
                        }
                        else {
                            //子表中的关联表单字段在key中格式是“字段”，在row中格式是“子表名.字段”
                            for (var k in row) {
                                if (k == key || k.indexOf('.' + key) > -1) {
                                    ObjectId = row[k];
                                    url = url.replace(params[i], row[k]);
                                    break;
                                }
                            }
                        }
                    }
                }
                //非地址逻辑
                if (url == "")
                    return value;
                else {
                    if (ObjectId != "")
                        return "<a class=\"myname\" ObjectId=\"" + ObjectId + "\"  href=\"javascript: $.ISideModal.Show('" + url + "');\"' >" + value + "</a>";
                    else {
                        if (value == "--") {
                            return "<span>" + value + "</span>";
                        } else {
                            return "<a  href=\"javascript: $.ISideModal.Show('" + url + "');\"' >" + value + "</a>";
                        }
                    }
                }
            }
        }
    });

    function initBodyStructure() {
        //if (listView.ViewContext.Selectable || listView.ViewContext.ShowSequenceNumber) {
        $leftTopTable = $('<table id="' + leftTopTableId + '">');
        $leftBottomTable = $('<table id="' + leftBottomTableId + '" class="table-striped table-hover">');
        $leftBottomTable.append($("<tbody>"));
        $leftTopTableContainer.append($leftTopTable);
        $leftBottomTableContainer.append($leftBottomTable);
        $tablesContainer
            .append($leftTopTableContainer)
            .append($leftBottomTableContainer);
        //}

        $rightTopTable = $('<table id="' + rightTopTableId + '">');
        $rightBottomTable = $('<table id="' + rightBottomTableId + '" class="table-striped table-hover">');
        $rightBottomTable.append($("<tbody>"));
        $rightTopTableContainer.append($rightTopTable);
        $rightBottomTableContainer.append($rightBottomTable);

        $tablesContainer
            .append($rightTopTableContainer)
            .append($rightBottomTableContainer)
            .append($placeholderForColumnText);

        $listViewContainer
            .append($tablesContainer)
            .append(getPagerHtml());
    }

    function initBootstrapTables() {
        if ($leftTopTable) {
            configLeftBottomBootstrapTable();
            configLeftTopBootstrapTable();
        }
        configRightBottomBootstrapTable();
        configRightTopBootstrapTable();

        if ($leftTopTable) {
            $leftBottomTable.bootstrapTable({
                TargetId: leftBottomTableId,
                onCheck: function () {
                    var selectedCount = $leftBottomTable.bootstrapTable("getSelections").length;
                    if ($leftBottomTable.find("tbody tr").length === selectedCount) {
                        setTimeout(function () {
                            $leftTopTable.find('.bs-checkbox input[type="checkbox"]').prop("checked", true);
                        }, 10);
                    }
                },
                onUncheck: function () {
                    setTimeout(function () {
                        $leftTopTable.find('.bs-checkbox input[type="checkbox"]').prop("checked", false);
                    });
                }
            });
            $leftTopTable.bootstrapTable({
                TargetId: leftTopTableId
            });
        }

        $rightTopTable.bootstrapTable({
            TargetId: rightTopTableId
        });

        $rightBottomTable.bootstrapTable({
            TargetId: rightBottomTableId,
            queryParams: getSheetBoListParams,
            responseHandler: responseHandlerForRightBottomTable,
            rowAttributes: getRowAttributes,
            onPostHeader: onRightBottomPostHeader,
            onPostBody: onRightBottomTablePostBody
        });
    }

    function configLeftTopBootstrapTable() {
        $leftTopTable.attr({
            "data-cache": "false",
            "data-toggle": "table",
            "data-click-to-select": "false",
            "data-undefined-text": "--",
            "data-show-footer": "false",
            "data-resizemode": "overflow"
        });
        var $tr = $('<tr>');
        if ($leftBottomTableHeaderRow) {
            $leftBottomTableHeaderRow.children().each(function () {
                $tr.append($(this).clone());
            });
        }
        $leftTopTable.append($("<thead  style='border: 1px solid #ddd;'>").append($tr));
    }

    function configLeftBottomBootstrapTable() {
        $leftBottomTable.attr({
            "data-cache": "false",
            "data-toggle": "table",
            "data-click-to-select": "false",
            "data-undefined-text": "--",
            "data-show-footer": "false",
            "data-resizemode": "overflow"
        });

        var $tr = $("<tr>");
        var viewContext = listView.ViewContext;
        if (viewContext.Selectable) {
            checkboxColumnWidth = 36;
            $tr.append($('<th data-checkbox="true"></th>'));
        }
        //if (viewContext.ShowSequenceNumber) {
        sequenceNumberColumnWidth = 56;
        $tr.append($('<th data-field="SequenceNumber" data-width="' +
            sequenceNumberColumnWidth +
            '" data-align="center">序号</th>'));
        //}
        $leftBottomTable.append($("<thead  style='border: 1px solid #ddd;'>").append($tr));
        $leftBottomTableHeaderRow = $tr;
    }

    function configRightTopBootstrapTable() {
        $rightTopTable.attr({
            "data-cache": "false",
            "data-toggle": "table",
            "data-click-to-select": "false",
            "data-undefined-text": "--",
            "data-show-footer": "false",
            "data-resizemode": "overflow"
        });

        var $thead = $("<thead  style='border: 1px solid #ddd;'>");
        $.each($rightBottomTableHeaderRows, function () {
            var $tr = $('<tr>');
            $(this).children().each(function () {
                $tr.append($(this).clone());
            });
            $thead.append($tr);
        });

        $rightTopTable.append($thead);
    }

    function configRightBottomBootstrapTable() {
        $rightBottomTableHeaderRows = [];
        var sortName = listView.ViewContext.SortBy;
        var order = listView.ViewContext.SortDirection == listView.SortDirection.Ascending ? "asc" : "desc";

        $rightBottomTable.attr({
            "data-cache": "false",
            "data-toggle": "table",
            "data-click-to-select": "false",
            "data-url": listView.AjaxUrl,
            "data-side-pagination": "server",
            "data-pagination": "true",
            "data-page-list": "[10,20,50,100]",
            "data-sort-name": sortName,
            "data-sort-order": order,
            "data-method": "post",
            "data-undefined-text": "--",
            "data-show-footer": "false",
            "data-content-type": "application/x-www-form-urlencoded",
            "data-resizemode": "overflow",
            "data-min-width": 100
        });

        if (pageSize) {
            $rightBottomTable.attr("data-page-size", pagesize);
        }

        initRightBottomTableHeaders();
    }

    function setInitialStyle() {
        listView.GetResetHeight();
        setScrollSetting();

        var rightPartMarginLeft = checkboxColumnWidth + sequenceNumberColumnWidth;

        $rightTopTableContainer.css({
            "left": rightPartMarginLeft + "px"
        });
        $rightBottomTableContainer.css({
            "marginLeft": rightPartMarginLeft + "px"
        });

        setRightPartColumnWidth();
        setRightPartMinWidth();
        syncRowsHeight();
    }

    function setScrollSetting() {
        if ($rightBottomTableContainer.height() < $tablesContainer.height()) {
            $tablesContainer.scrollTop(0);
            $tablesContainer.css({
                "overflow-y": "hidden"
            });
        } else {
            $tablesContainer.css({
                "overflow-y": "scroll"
            });
        }
    }

    function setRightPartColumnWidth() {
        var rightPartColumns = getRightPartColumns();

        $.each(rightPartColumns, function (index, $th) {
            var maxColumnWidth = originThWidth = $th.outerWidth(),
                innerTdWidth,
                deltaWidth,
                longestText = "",
                cellsInSameColumn = $rightBottomTable.find(">tbody td:nth-child(" + (index + 1) + ")");

            cellsInSameColumn.each(function () {
                var text = $(this).children().text();
                if (text.length > longestText.length) longestText = text;
            });
            $placeholderForColumnText.text(longestText);
            innerTdWidth = $placeholderForColumnText.width() + tdPaddingValue;
            maxColumnWidth = maxColumnWidth < innerTdWidth ? innerTdWidth : maxColumnWidth;

            maxColumnWidth = maxColumnWidth > 400 ? 400 : maxColumnWidth;
            deltaWidth = maxColumnWidth - originThWidth;

            if (maxColumnWidth <= 0 || deltaWidth <= 0) return true;

            $th.outerWidth(maxColumnWidth);
            $rightBottomTable.outerWidth($rightBottomTable.outerWidth() + deltaWidth);
        });

        $placeholderForColumnText.text("");
        setRightTopTableColumnWidth();
    }

    // 获取列表主体部分的列，子表中的每一列也当做独立的列
    function getRightPartColumns() {
        var rightBottomTableColumns = [];
        var firstHeadRow = $rightBottomTable.find(">thead tr:first-child");
        firstHeadRow.find("th").each(function () {
            if ($(this).attr("colspan")) {
                firstHeadRow.next().find("th").each(function () {
                    rightBottomTableColumns.push($(this));
                });
            } else {
                rightBottomTableColumns.push($(this));
            }
        });

        return rightBottomTableColumns;
    }

    function setRightTopTableColumnWidth() {
        $rightTopTable.find("thead th").each(function (i) {
            var $thBeneath = $rightBottomTable.find("thead th").eq(i);
            $(this).outerWidth($thBeneath.outerWidth());
            $rightTopTable.outerWidth($rightBottomTable.outerWidth());
        });
    }

    function setRightPartMinWidth() {
        var rightPartMinWidth = $tablesContainer.width() - checkboxColumnWidth - sequenceNumberColumnWidth - 10;
        var style = { "minWidth": rightPartMinWidth + "px" };

        $rightTopTableContainer.css(style);
        $rightBottomTableContainer.css(style);
        $rightTopTable.css(style);
        $rightBottomTable.css(style);
    }

    function syncRowsHeight() {
        var fixedThHeight = $rightBottomTable.find("thead").height();

        $leftTopTableContainer.css({
            "height": fixedThHeight + "px"
        });
        $rightTopTableContainer.css({
            "height": fixedThHeight + "px"
        });
        $leftTopTable && $leftTopTable.find("thead tr").height(fixedThHeight);
        $leftBottomTable && $leftBottomTable.find("thead tr").height(fixedThHeight);

        var dataRowsInRightTable = $rightBottomTable.find(">tbody>tr");
        if ($leftBottomTable) {
            var dataRowsInLeftTable = $leftBottomTable.find(">tbody>tr");
            dataRowsInRightTable.each(function (i) {
                dataRowsInLeftTable.eq(i).height($(this).height());
            });
        }

    }

    function initRightBottomTableHeaders() {
        if (!listView.Headers) return;
        var Headers = listView.Headers;

        var $Tr = $("<tr>");
        var columns = [];
        var ItWillBeShowed = $.AppFilter.getChildSchemaCode();

        if (ItWillBeShowed != "" && typeof ItWillBeShowed != "undefined") {
            for (var key in Headers) {
                if (!Headers[key].IsChild) {
                    if (!Headers[key].Visible) continue;
                    $Tr.append($("<th style='vertical-align: middle;'>").attr({
                        "rowspan": "2",
                        "data-formatter": '$.ListView.OperateFormatter',
                        "data-switchable": true,
                        "data-field": key,
                        "data-visible": Headers[key].Visible,
                        "data-sortable": Headers[key].Sortable,
                        "data-align": Headers[key].Align
                    }).text(Headers[key].DisplayName));
                    columns.push({ DisplayName: Headers[key].DisplayName, key: key, selected: true });
                }
                else {
                    if (key != ItWillBeShowed) continue;
                    var length = 0;
                    var lastkey = "";
                    for (var tempkey in Headers[key].ChildColumns) {
                        if (tempkey == lastkey || !Headers[key].ChildColumns[tempkey].Visible) continue;
                        lastkey = tempkey + "_Name";
                        columns.push({
                            DisplayName: Headers[key].DisplayName + "_" + Headers[key].ChildColumns[tempkey].DisplayName,
                            key: key + "." + tempkey,
                            selected: true
                        });
                        length++;
                    }
                    $Tr.append($("<th  style='vertical-align: middle;'>").attr({
                        "colspan": length,
                        "data-formatter": '$.ListView.OperateFormatter',
                        "data-switchable": true,
                        "data-field": key,
                        "data-visible": Headers[key].Visible || key == ItWillBeShowed,
                        "data-sortable": Headers[key].Sortable,
                        "data-align": Headers[key].Align
                    }).text(Headers[key].DisplayName));
                }
            }
            //$scrollableTable.append($("<thead style='border: 1px solid #ddd;'>").append($Tr));
            var $Tr1 = $("<tr>");
            if (Headers[ItWillBeShowed] != null && !$.isEmptyObject(Headers[ItWillBeShowed])) {
                var childheaders = Headers[ItWillBeShowed].ChildColumns;
                for (var childkey in childheaders) {
                    if (!childheaders[childkey].Visible || childkey.toLocaleLowerCase() == "name") continue;
                    $Tr1.append($("<th  style='vertical-align: middle;'>").attr({
                        "data-formatter": '$.ListView.OperateFormatter',
                        "data-switchable": true,
                        "data-field": ItWillBeShowed + "." + childkey,
                        "data-visible": childheaders[childkey].Visible,
                        "data-sortable": childheaders[childkey].Sortable,
                        "data-align": childheaders[childkey].Align
                    }).text(childheaders[childkey].DisplayName));
                }
            }
            $Tr.append($("<th style='vertical-align: middle;'><span class='icon-more'></span>").attr({
                "rowspan": "2",
                "data-formatter": '$.ListView.OperateFormatter',
                "data-width": "36px",
                "data-switchable": true,
                "data-field": "operatebtn",
                "data-align": "center"
            }));
            $rightBottomTable.append($("<thead style='border: 1px solid #ddd;'>").append($Tr).append($Tr1));
            $rightBottomTableHeaderRows.push($Tr, $Tr1);
        }
        else {
            for (var key in Headers) {
                if (!Headers[key].Visible) continue;
                $Tr.append($("<th style='vertical-align: middle;'>").attr({
                    "data-formatter": '$.ListView.OperateFormatter',
                    "data-switchable": true,
                    "data-field": key,
                    "data-visible": Headers[key].Visible,
                    "data-sortable": Headers[key].Sortable,
                    "data-align": Headers[key].Align
                }).text(Headers[key].DisplayName));
                columns.push({ DisplayName: Headers[key].DisplayName, key: key, selected: true });
            }
            $Tr.append($("<th style='vertical-align: middle;'><span class=' icon-more'></span>").attr({
                "data-formatter": '$.ListView.OperateFormatter',
                "data-width": "36px",
                "data-switchable": true,
                "data-field": "operatebtn",
                "data-align": ""
            }));
            $rightBottomTable.append($("<thead  style='border: 1px solid #ddd;'>").append($Tr));
            $rightBottomTableHeaderRows.push($Tr);
        }
        listView.Columns = columns;
    }

    function coordinateTables() {
        if (initFlag) {
            $(".coordinate-part").on("mouseover", ".table-hover>tbody>tr", function () {
                if ($(this).hasClass("table-nodata")) return;
                getHoverRowCorrespondingTr($(this)).addClass("hover");
            });

            $(".coordinate-part").on("mouseout", ".table-hover>tbody>tr", function () {
                if ($(this).hasClass("table-nodata")) return;
                getHoverRowCorrespondingTr($(this)).removeClass("hover");
            });

            $("#rightTopTableContainer").on("click", ".fixed-table-body thead th", function () {
                var field = $(this).data("field");
                $("#" + rightBottomTableId).find("thead th").each(function () {
                    var underField = $(this).data("field");
                    if (field === underField) {
                        $(this).find(".sortable").click();
                    }
                });
            });

            $("#leftTopTableContainer").on("click", ".bs-checkbox label", function () {
                var selectedCount = $leftBottomTable.bootstrapTable("getSelections").length;
                var $checkbox = $(this).prev('input[type="checkbox"]');
                if ($leftBottomTable.find("tbody tr").length === selectedCount) {
                    $leftBottomTable.bootstrapTable("uncheckAll");
                    setTimeout(function () { $checkbox.prop("checked", false); }, 10);
                } else {
                    $leftBottomTable.bootstrapTable("checkAll");
                    setTimeout(function () { $checkbox.prop("checked", true); }, 10);
                }
            });
        }

        $tablesContainer.off("scroll").on("scroll", function (e) {
            var scrollLeft = $(this).scrollLeft();
            var scrollTop = $(this).scrollTop();

            $leftTopTableContainer.css({ "left": scrollLeft + "px" });
            $leftTopTableContainer.css({ "top": scrollTop + "px" });
            $leftBottomTableContainer.css({ "left": scrollLeft + "px" });
            $rightTopTableContainer.css({ "top": scrollTop + "px" });
        });
    }

    function getHoverRowCorrespondingTr($elem) {
        var $tablePart = $elem.closest(".coordinate-part");
        var $trs = $tablePart.find(".table-hover>tbody>tr");
        var index = $trs.index($elem);

        //找到另一个表中的对应列
        return $tablePart.siblings(".coordinate-part")
            .find(".table-hover>tbody>tr")
            .eq(index);
    }

    function responseHandlerForRightBottomTable(viewContext) {
        listViewContext = viewContext;
        var sequencenceNumber = 0;
        listView.WorkflowState = viewContext.WorkflowState;
        renderPager.call(this, viewContext);
        if (!viewContext.Successful) {
            var errorMsg = "";
            for (var i = 0; viewContext.Errors && i < viewContext.Errors.length; i++) {
                errorMsg += viewContext.Errors[i] + "/n";
            }
            $.IShowError(errorMsg);
            return { rows: null, total: 0 };
        }

        if (viewContext.ReturnData === null) viewContext.ReturnData = new Array();
        //if (viewContext.ShowSequenceNumber) {
        for (var i = 0; i < viewContext.ReturnData.length; i++) {
            viewContext.ReturnData[i].SequenceNumber = (this.pageNumber - 1) * this.pageSize + i + 1;
        }
        //}

        $leftTopTable && $leftTopTable.bootstrapTable("uncheckAll");
        $leftBottomTable && $leftBottomTable.bootstrapTable('load', viewContext.ReturnData);

        return { rows: viewContext.ReturnData, total: viewContext.DataCount };
    }

    function getPagerHtml() {
        var pagerHtml = [
            ('<div class="table-page" id="bar-' + rightBottomTableId + '">'),
            '<div class="page-index">',
            '<input type="text" value="1" class="Page_Index" />/<label class="Page_Count">1</label>',
            '</div>',
            '<div class="btn-group table-page_ButtonGroup" style="width: 160px;">',
            '<button class="btn Page_Num_Pre">上一页</button>',
            '<button class="btn Page_Num_Next">下一页</button>',
            '</div>',
            '<div class="page-size dropup">',
            '<button class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
            ('<span class="Page_Per_Size">' + (pageSize || 10) + '</span>'),
            '<i class="fa fa-angle-down"></i>',
            '</button>',
            '<ul class="dropdown-menu">',
            '<li><a>10</a></li>',
            '<li><a>20</a></li>',
            '<li><a>50</a></li>',
            '<li><a>100</a></li>',
            '</ul>',
            '</div>',
            '<div class="page-total">共0条</div>',
            '</div>'
        ];
        return pagerHtml.join("");
    }

    function getOperateButtonHtml(state) {
        var cls = "";
        var tooltipName = "";

        if (state == 1) return "";

        //running/finished/cancel  0 进行  1已完成   3取消
        switch (state) {
            case $.ListView.BizObjectStatus.Draft: cls = "draft"; tooltipName = "草稿";
                break;
            case $.ListView.BizObjectStatus.Effective: cls = "finished"; tooltipName = "已完成";
                break;
            case $.ListView.BizObjectStatus.Canceled: cls = "cancel"; tooltipName = "已取消";
                break;
            case $.ListView.BizObjectStatus.Running: cls = "running"; tooltipName = "进行中";
                break;
        }
        var td = '<div style="text-align: center;" data-toggle="tooltip" data-placement="left" data-original-title="'
            + tooltipName + '"><span class="circle ' + cls + '"></span></div>';
        return td;
    }

    function getRowAttributes(row, index) {
        if (row.Status == listView.BizObjectStatus.Draft || row.Status == void 0) {
            return { "class": "Draft-Row" };
        }
        else if (row.Status == listView.BizObjectStatus.Running) {
            return { "class": "Running-Row" };
        }
        else if (row.Status == listView.BizObjectStatus.Canceled) {
            return { "class": "Canceled-Row" };
        }
        else {
            return {};
        }
    }

    function getSheetBoListParams(params) {
        $.extend(params, {
            ActionName: "DoAction",
            Command: "Load",
            QueryCode: listView.QueryCode,
            ListViewDisplayMode: ListViewDisplayMode.List,
        });
        listView.SortName = params.sort;
        listView.SortOrder = params.order;
        var filterJson = $.AppFilter.getFiterJson();
        listView.InitQueryItems(listView.QueryParams);
        filterJson = $.extend(filterJson, listView.QueryParams);
        listView.QueryParams = {};
        localStorage[listView.QueryCode.trim() + "pagesize"] = params["limit"];
        params[listView.SearchParamsJson] = JSON.stringify(filterJson);
        params[listView.ScopeType] = $.AppFilter.getScopeType();
        params[listView.ChildSchemaCode] = $.AppFilter.getChildSchemaCode();
        params[listView.PagedByApplist] = true;
        params["PostData"] = JSON.stringify(params);
        return params;
    }

    function renderPager(data) {
        var that = this;
        var $target = $("#" + that["TargetId"]);
        if (!$target) return;
        if (data.DataCount > 0 && data.ReturnData && data.ReturnData.length === 0) {
            $target.bootstrapTable("selectPage", 1);
            return;
        }
        if (that.pageNumber > 1 && data.ReturnData && data.ReturnData.length == 0) {
            $target.bootstrapTable("refreshOptions", {
                pageNumber: that.pageNumber - 1
            });
        }
        if (!that.$PageNext) {
            var $pageBar = $("#bar-" + that["TargetId"]);
            that.$PageNext = $pageBar.find(".Page_Num_Next");
            that.$PagePre = $pageBar.find(".Page_Num_Pre");
            that.$PageIndex = $pageBar.find(".Page_Index");
            that.$PageCount = $pageBar.find(".Page_Count");
            that.$PageTotal = $pageBar.find(".page-total");
            that.$PageSize = $pageBar.find(".Page_Per_Size");
            that.$PageNext.bind('click', function () {
                $target.bootstrapTable("nextPage");
            });
            that.$PagePre.bind('click', function () {
                $target.bootstrapTable("prevPage");
            });

            var PageTimeout;
            that.$PageIndex.bind("keyup", function (e) {
                PageTimeout && clearTimeout(PageTimeout);
                PageTimeout = null;
                var v = $(this).val().replace(/[^\d]/g, '');
                v = v == "" ? 0 : parseInt(v);
                v = v >= that.Count ? that.Count : v;
                if (v == 0) return;
                $(this).val(v);
                PageTimeout = setTimeout(function () {
                    v != that.pageNumber && $target.bootstrapTable("selectPage", v);
                    PageTimeout = null;
                }, 600);
            });
            that.$PageIndex.bind("blur", function (e) {
                PageTimeout && clearTimeout(PageTimeout);
                PageTimeout = null;
                var v = $(this).val();
                v = v == "" || v == "0" ? 1 : parseInt(v);
                $(this).val(v);
                v != that.pageNumber && $target.bootstrapTable("selectPage", v);
            });
            $pageBar.on("click", "li>a", function () {
                var size = parseInt($(this).text());
                that.$PageSize.html(size);
                $target.bootstrapTable("refreshOptions", {
                    pageSize: size
                });
                //reset($target);
            })
        }
        if (!data.Successful) {
            that.$PageNext.addClass("disable").attr("disabled", true);
            that.$PagePre.addClass("disable").attr("disabled", true);
            that.$PageIndex.val(1).attr("disabled", true);
            that.$PageCount.html(1);
            that.$PageTotal.html("共0条");
        }
        else {
            that.$PageIndex.val(that.pageNumber);
            that.Count = Math.ceil(data.DataCount / that.pageSize);
            that.$PageCount.html(that.Count);
            that.$PageTotal.html("共" + data.DataCount + "条");
            if (that.Count == 0) {
                that.$PagePre.addClass("disable").attr("disabled", true);
                that.$PageNext.addClass("disable").attr("disabled", true);
            } else {
                if (that.pageNumber <= 1) {
                    that.$PagePre.addClass("disable").attr("disabled", true);
                }
                else {
                    that.$PagePre.removeClass("disable").attr("disabled", false);
                }

                if (that.pageNumber == that.Count) {
                    that.$PageNext.addClass("disable").attr("disabled", true);
                }
                else {
                    that.$PageNext.removeClass("disable").attr("disabled", false);
                }
            }
        }
    }

    function onRightBottomPostHeader() {
        //var theads = $scrollableTable.find("thead");
        //if (theads.length > 1) {
        //    for (var i = 0; i < theads.length; i++) {
        //        if (i == 0) continue;
        //        $(theads[i]).remove();
        //    }
        //}
        var columns = listView.Columns;

        if (initFlag) {
            listView.GetResetHeight();
            initFlag = false;
        }

        //添加显示、隐藏列功能按钮
        $rightTopTable.off("click", "thead th[data-field='operatebtn']").on("click", "thead th[data-field='operatebtn']", function (e) {
            var sources = listView.Columns;
            if (sources) {
                var items = [];
                for (var i = 0, len = sources.length; i < len; i++) {
                    var source = sources[i];
                    var item = { title: source.DisplayName, icon: "", type: "checkbox", selected: source.selected, fn: selectShowColumns };
                    items.push(item);
                }
                var okitem = { title: "确定", icon: "button btn-ok ", type: "button", fn: ok, class: "listbutonOk" };
                items.push(okitem);
                basicContext.show(items, e);
            }
        });

        var selectShowColumns = function (e) {
            var checkbox = $(e.target).find("input");
            if (checkbox.length > 0) {
                var selected = $(checkbox[0]).prop("checked");
                $(checkbox[0]).prop('checked', !selected);
            }
            e.stopPropagation();
        }
        var ok = function (e) {
            changingVisibleColumns = true;
            var SchemaCode = $.AppFilter.getChildSchemaCode();//子表编码
            var checkbox = $(e.target).parents("tbody").find("input");
            var columns = listView.Columns;
            for (var i = 0; i < checkbox.length; i++) {
                var selected = $(checkbox[i]).prop("checked");
                if (selected != columns[i].selected) {
                    columns[i].selected = selected;
                    if (selected) {
                        $rightBottomTable.bootstrapTable("showColumn", columns[i].key);
                        $rightTopTable.bootstrapTable("showColumn", columns[i].key);
                    } else {
                        $rightBottomTable.bootstrapTable("hideColumn", columns[i].key);
                        $rightTopTable.bootstrapTable("hideColumn", columns[i].key);
                    }
                }
            }

            changingVisibleColumns = false;
            if (SchemaCode != "") {
                var SchemaLength = $($rightBottomTable.find("thead tr")[1]).find("th").length;
                var th = $rightBottomTable.find("thead th[data-field='" + SchemaCode + "']");
                if (SchemaLength == 0) {
                    $(th[0]).attr("colspan", SchemaLength);
                    $(th[0]).hide();
                } else {
                    $(th[0]).attr("colspan", SchemaLength);
                    $(th[0]).show();
                }
            }
            setInitialStyle();
        }

        if ($listViewContainer.find(".rc-handle-container").length == 0) {
            $rcHandle = null;
        }
    }

    function onRightBottomTablePostBody() {
        if (!changingVisibleColumns) {
            setInitialStyle();
        }

        var nodata = $($rightBottomTable.find(".table-nodata td"));
        nodata.append("<img src='/Content/images/meiyoushuju.png' style='position:absolute;'><span class='nodata-title'>还没有任何数据</span>");

        setTimeout(function () {
            coordinateTables();
            initrcHandle();
        }, 0);
    }

    function initrcHandle() {
        var that = listView,
            trindex = 1,
            totalWidth = 0,
            maxH = $(window).height() - $tablesContainer.offset().top - 50;

        if (!$rcHandle) {
            $rcHandle = $('<div class="rc-handle-container">');
            $rcHandle.appendTo($rightBottomTable.parents(".fixed-table-body")); //Element
            $rcHandle.off("mousedown.resize").on("mousedown.resize", ".rc-handle", function (e) {
                e.preventDefault();
                var startX = e.pageX, x = 0,
                    $tarHandle = $(this),
                    pos = $tarHandle.offset().left - $rcHandle.offset().left,
                    tarIndex = parseInt($tarHandle.attr("data-index")),
                    $tarTh = $rightBottomTable.find("#th_" + tarIndex),
                    $tarFixedTh = $rightTopTable.find("#fixedTh_" + tarIndex),
                    startW = $tarTh.outerWidth(),
                    minW = 100 - startW,
                    totalWidth = $rightBottomTable.width(),
                    $nextTh = $rightBottomTable.find("#th_" + (tarIndex + 1)),
                    $nextFixedTh = $rightTopTable.find("#fixedTh_" + (tarIndex + 1)),
                    hasNext = false, nextW = 0;
                $nextTh.length > 0 && (hasNext = true, nextW = $nextTh.outerWidth());

                $(document).off("mousemove.resize").on("mousemove.resize", function (e) {
                    x = e.pageX - startX;
                    if (x < minW) return;
                    $tarHandle.css("left", pos + x);
                    //to do resize table
                    $tarTh.width(startW + x);
                    $tarFixedTh.outerWidth(startW + x);
                    if (x > 0) {
                        $rightBottomTable.outerWidth(totalWidth + x);
                        $rightTopTable.outerWidth(totalWidth + x);
                        //$scrollableTableFixedHeaderContainer.outerWidth(totalWidth + x);
                    } else if (hasNext) {
                        $nextTh.width(nextW - x);
                        $nextFixedTh.width(nextW - x);
                    }
                });

                $(document).off("mouseup.resize").on("mouseup.resize", function (e) {
                    $(this).off("mousemove.resize").off("mouseup.resize");
                    setRightTopTableColumnWidth();
                    initrcHandle()
                });

                $(document).off("mouseleave.resize").on("mouseleave.resize", function (e) {
                    $(document).off("mousemove.resize").off("mouseup.resize");
                    $(document).off("mouseleave.resize");
                    initrcHandle();
                    return false;
                });

            });
        }

        $rcHandle.html("");

        var $rightTableHeadColumns = $rightBottomTable.find("thead tr:first th");
        var headColumnCount = $rightTableHeadColumns.length;
        $rightTableHeadColumns.each(function (index) {
            var $that = $(this);
            var $fixedTh = $rightTopTable.find("thead tr:first th").eq(index);

            var w = $that.outerWidth();
            totalWidth += w;

            if (trindex < headColumnCount) {
                $that.attr("data-tar", "#rc_" + trindex).attr("id", "th_" + trindex);
                $fixedTh.attr("data-tar", "#fixedRc_" + trindex).attr("id", "fixedTh_" + trindex);
                $rcHandle.append('<div id="rc_' + trindex +
                    '" class="rc-handle" data-index="' + trindex +
                    '" style="left:' + (totalWidth - 3) + 'px;height:' + maxH + 'px;">');
                trindex++;
            }
        });

        $rightBottomTable.parents(".fixed-table-body").unbind("scroll.tablescroll").bind("scroll.tablescroll", function (e) {
            var left = $(this).scrollLeft(), rate = 1;
            left = rate * left;
            $rcHandle.scrollLeft(left);
            $rcHandle.css("left", -left);
        });
    }

    function isArray(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    }

    function isJsonLike(str) {
        var JSON_START = /^\[|^\{(?!\{)/;
        var JSON_ENDS = {
            '[': /]$/,
            '{': /}$/
        };
        var jsonStart = str.match(JSON_START);
        return jsonStart && JSON_ENDS[jsonStart[0]].test(str);
    }

})(jQuery);