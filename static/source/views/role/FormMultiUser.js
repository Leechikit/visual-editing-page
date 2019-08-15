import { debounce } from '@/util/utils.js';
//选人控件
(function($) {
    // 控件执行
    // 参数{AutoTrim:true,DefaultValue:datavalue,OnChange:""}
    //可以通过  $("#id").SheetTextBox(参数)  来渲染控件和获取控件对象
    $.fn.RoleFormMultiUser = function(opt) {
        return $.RoleControlManager.Run.call(this, "FormMultiUser", arguments);
    };

    //选人控件数据,单个页面所有数据库共用
    //该缓存用this.MultiUserData替代，原因是选人控件可能设置了选人范围,选人数据由单个控件自己维护
    //$.FormMultiUserData = {
    //    //部门
    //    OrgUnitItems: {},
    //    //标签
    //    //OrgTagItems: [],
    //    //部门用户:{部门ID:[]}
    //    DepUserItems: {},
    //    //用户
    //    UserItems: {},
    //};

    // 构造函数
    $.RoleControls.FormMultiUser = function(element, ptions, sheetInfo) {
        //选人缓存
        this.MultiUserData = {
            //部门
            OrgUnitItems: {},
            //标签
            //OrgTagItems: [],
            //部门用户:{部门ID:[]}
            DepUserItems: {},
            //用户
            UserItems: {}
        };
        //选择数据集合
        this.Units = {};
        //所有选择的元素
        this.UnitsElement = null;
        //搜索输入框元素
        this.SearchElement = null;
        this.SearchTxtElement = null;

        //组织机构容器
        this.SelectorPanel = null;
        this.OrgTreePanel = null;
        this.OrgListPanel = null;
        this.IsOverSelectorPanel = false;
        this.FormMultiUserHandler = '/ctg-workflow/user/querylist';
        this.CpLock = false;
        this.Options = ptions;

        this.SearchOrg = debounce(this.SearchOrg, 500, this);

        $.RoleControls.FormMultiUser.Base.constructor.call(this, element, ptions, sheetInfo);
        this.FromNum = 0;
        this.ToNum = 10;
    };

    // 继承及控件实现
    $.RoleControls.FormMultiUser.Inherit($.RoleControls.RoleBaseControl, {
        //控件渲染函数
        Render: function() {
            this.CurrentDocument = $(this.Element).closest("html").length == 1 ? $(this.Element).closest("html").parent() : $(document);
            if (this.Options.appendBody === false) {
                this.CurrentBody = $(this.Element).parent()
            } else {
                this.CurrentBody = $(this.Element).closest("body").length == 1 ? $(this.Element).closest("body") : $("body");
            }
            //是否在子表里面子表
            this.IsInGridView = !$.isEmptyObject(this.ObjectId);
            //是否可见
            if (!this.Visible) { $(this.Element).hide(); return; }
            //渲染界面
            this.HtmlRender();

            //绑定事件
            this.BindEnvens();

            //初始化默认值
            this.InitValue();
        },

        //初始化值
        InitValue: function() {
            if (this.Value) {
                this.SetValue(this.Value);
            }
        },
        ReInitValue: function(Obj) {
            if (Obj.constructor === Object) {
                Obj = [Obj]
            }
            
            var organInput = $('.SheetUser_DataPanel ul li a input')
            organInput.each((index, elem) => {
                if (Obj.some(item => 'c_' + item.id === elem.id)) {
                    $(elem).parent('a').click()
                }
            })
            
        },
        CheckUnitValidate: function(Obj) {
            //2017/6/12修改，原因是关联携带了大量数据过来校验导致超时
            return Obj;
            var newObj = Obj;
            var that = this;
            if ($.isEmptyObject(that.MultiUserData.OrgUnitItems)) {
                if ($.RoleSmartForm.ResponseContext && !$.RoleSmartForm.ResponseContext.IsCreateMode) {
                    //如果不是创建模式则不执行check，因为非创建模式的数据已经check过
                    return newObj;
                }
                var UnitIds = [];
                if (Obj.constructor == Object) {
                    UnitIds.push(Obj.UnitId);
                } else if (Obj.constructor == Array) {
                    for (var i = 0; i < Obj.length; i++) {
                        if (Obj[i].constructor == Object) {
                            UnitIds.push(Obj[i].UnitId);
                        } else if (Obj[i].constructor == String) {
                            UnitIds.push(Obj[i]);
                        }
                    }
                } else if (Obj.constructor == String) {
                    UnitIds.push(Obj);
                }
                //请求后台，判断Obj是否在给定范围内，如果在给定范围内则返回Unit对象，后续调用AddChoice
                var unitTemp = '';
                for (var i = 0; i < UnitIds.length; i++) {
                    unitTemp += UnitIds[i] + ';';
                }
                var params = {
                    ActionName: "SheetUserAction",
                    Command: "CheckUnitValidate",
                    UnitSelectionRange: that.UnitSelectionRange,
                    UnitIds: unitTemp
                }
                this.Ajax(
                    that.FormMultiUserHandler,
                    "POST", {
                        PostData: JSON.stringify(params)
                    },
                    function(data) {
                        newObj = data.ReturnData.UnitItems;
                    }, false);
            }
            return newObj;
        },
        //设置值
        SetValue: function(Obj) {
            var that = this;
            //针对设置了默认只的情况
            if (Obj == void 0 || Obj == null || Obj == "" || Obj.length == 0) {
                this.ClearChoices();
                return;
            }
            if (this.UnitSelectionRange) {
                //有设置选人范围
                if ($.RoleSmartForm && $.RoleSmartForm.ResponseContext && $.RoleSmartForm.ResponseContext.IsCreateMode) {
                    //创建模式
                    Obj = that.CheckUnitValidate(Obj);
                } else {
                    //修改模式
                    if (this.Editable && (Obj == void 0 || Obj == null || Obj == "" || Obj.length == 0)) {
                        //可编辑
                        Obj = that.CheckUnitValidate(Obj);
                    }
                }
            }
            //if (this.UnitSelectionRange)
            //    Obj = that.CheckUnitValidate(Obj);

            if (!Obj) { return; } //checkUnitValidate可能返回空

            if (Obj.constructor == Object) {
                this.AddChoice(Obj);
            } else if (Obj.constructor == Array) {
                for (var i = 0; i < Obj.length; i++) {
                    if (Obj[i].constructor == Object) {
                        this.AddChoice(Obj[i]);
                    } else if (Obj[i].constructor == String) {
                        this.AddUserID(Obj);
                        break;
                    }
                }
            } else if (Obj.constructor == String) {
                this.AddUserID(Obj);
            }
            //this.FormMultiUserChange();
            this.OnChange(Obj);
        },

        //FormMultiUserChange: function (value) {
        //    var that = this;
        //    this.FormMultiUserTimeout && clearTimeout(this.FormMultiUserTimeout);
        //    this.FormMultiUserTimeout = null;

        //    this.FormMultiUserTimeout = setTimeout(function () {
        //        that.OnChange(value);
        //        that.FormMultiUserTimeout = null;
        //    }, 600);
        //},
        //返回 {id1:{id: , Code:, name:Type, Icon ,ParentId},id1:{id: , Code:, name: }}对象
        GetValue: function() {
            //debugger
            return $.IClone(this.Units);
        },

        //读取选中的id
        GetUnitIDs: function() {
            //debugger
            var ValObjs = this.GetValue();
            var UintIDs = new Array();
            for (var key in ValObjs) {
                UintIDs.push({
                    id: key,
                    userName: ValObjs[key].userName
                });
            }

            return UintIDs;
        },

        //转办读取选中的id
        GetTransUnitIDs: function() {
            //debugger
            var ValObjs = $(".el-form-item").find('.SheetUser-Item');

           if(ValObjs.length!=0){
                return ValObjs[0].attributes.currentId.value;
           }
           else{
              return undefined
           }

            
        },

        //转办读取选中的id
        checkSelectUser: function() {
            //debugger
            var ValObjs = $(".el-form-item").find('.SheetUser-Item');

            if(ValObjs.length!=0){
                return true
            }
            else{
                return false
            }

            
        },

        //获取显示
        GetText: function() {
            var userNames;
            for (var ObjectId in this.Units) {
                if (this.IsMultiple) {
                    if (userNames == void 0) userNames = new Array();
                    userNames.push(this.Units[ObjectId].name);
                } else {
                    userNames = this.Units[ObjectId].name;
                }
            }
            return userNames == void 0 ? "" : userNames.toString();
        },

        //保存数据
        SaveDataField: function() {
            var result = {};
            if (!this.Visible) return result;
            var oldresult = this.DataItem;
            if (!oldresult) {
                return {};
            }

            var ids = this.Getids();
            if (oldresult.Value != ids) {
                result[this.DataField] = ids;
                return result;
            }
            result[this.DataField] = [];
            return result;
        },

        //根据ChoiceID，获取已经选择的组织
        GetSelectUnitByChoiceID: function(choiceID) {
            if (this.Units == null || this.Units.length == 0) return null;
            for (var key in this.Units) {
                if (this.Units[key].ChoiceID === choiceID) {
                    return this.Units[key];
                }
            }
            return null;
        },

        //渲染样式
        HtmlRender: function() {
            $(this.Element).addClass("SheetUser");
            if (!this.IsInGridView) {
                //不在子表里面
                $(this.Element).css("position", "relative");
            }
            if (!this.Editable) {
                this.$Input = $("<pre style='border:none;'>");
                this.$InputBody.append(this.$Input);
                return;
            }
            //设置当前控件的ID
            this.ID = $.IGuid();

            //this.$InputBody.attr("ID", this.ID);

            //this.UnitsElement = $("<div data-targetid='" + this.ID + "' name='" + this.DataField + "' class='form-control form-user-add icon-arrow-down-full' style='height:auto;overflow:auto;width:100%;height:auto;max-height:100px;'>");
            this.UnitsElement = $("<div data-targetid='" + this.ID + "' name='" + this.DataField + "' class='form-control form-user-add icon-arrow-down-full' style='height:auto;overflow:auto;width:100%;height:auto;max-height:100px;'>");

            this.$Input = $("<input class='SheetUser-Input' style='width:1px'>");
            var that = this;
            this.$Input.on("compositionstart", function() {
                that.CpLock = true;
            });
            this.$Input.on("compositionend", function() {
                that.CpLock = false;
            });
            this.UnitsElement.append(this.$Input);
            this.$InputBody.attr("ID", this.ID).css({ "min-width": "100px" }).append(this.UnitsElement);

            //作为筛选条件时显示样式
            if (this.IsQueryControl) {
                this.UnitsElement.removeClass("icon-arrow-down-full");
                this.UnitsElement.removeClass("icon-arrow-down-full").css("border", "1px dashed #cccccc");
                this.$tipDiv = $("<div style='width:98%;height:30px;float:right;text-align:center;'><div><span class='sp_placeholder'>点击选择" + this.name.replace(/^\s+|\s+$/g, '') + "</span></div></div>")
                this.UnitsElement.append(this.$tipDiv);
            }
        },

        //绑定事件
        BindEnvens: function() {
            //不可用
            if (!this.Editable) {
                return;
            }
            var that = this;

            //点击选人控件再渲染
            $(this.$InputBody).one("click.UserOnce", function() {
                that.RenderNext.apply(that);
                that.FocusInput();
            });
            //获取焦点选人控件再渲染
            $(this.$InputBody).find("input").on("focus.UserOnce", function(e) {
                if (!that.$UserPanel) {
                    that.RenderNext.apply(that);
                }
                that.FocusInput();
                $(that.$InputBody).unbind("click.UserOnce");
            });
        },

        RenderNext: function() {
            var that = this;
            that.$SearchDiv = $("<div data-targetid='" + that.ID + "' data-formmultiuserpanel='searchdiv' class='searchdiv'><input class='searchinput' type='text' ></input></div>");

            that.$SearchInput = that.$SearchDiv.find("input").eq(0); //搜索输入框
            that.Placeholder = "输入" + that.name + "查找";
            that.$SearchInput.attr("placeholder", that.Placeholder);

            //搜索面板
            //that.$SearchPanel = $("<div>").attr("data-targetid", that.ID).addClass("SheetUser-SelectorPanel").attr("data-FormMultiUserPanel", "SearchPanel");
            that.$SearchPanel = $("<div data-targetid='" + that.ID + "' class='SheetUser-SelectorPanel' data-FormMultiUserPanel='SearchPanel'>");

            //组织机构选择面板
            //that.SelectorPanel = $("<div>").attr("data-targetid", that.ID).addClass("SheetUser-SelectorPanel").attr("data-FormMultiUserPanel", "SelectorPanel");//.width(this.Width);
            that.SelectorPanel = $("<div data-targetid='" + that.ID + "' class='SheetUser-SelectorPanel' data-FormMultiUserPanel='SelectorPanel'>");
            //that.SelectorPanel.append(that.$SearchDiv);
            //组织标签
            //that.SelectorTabs = $("<ul>").addClass("nav").addClass("nav-tabs user-tabs");
            that.SelectorTabs = $("<ul class='nav nav-tabs user-tabs'>");
            if (that.UserVisible) {
                //that.SelectorTabs.append($("<li>").append("<a>用户</a>").attr("data-tabtype", "tab_Users").css("cursor", "pointer"));
                that.SelectorTabs.append($("<li data-tabtype='tab_Users' style='cursor:pointer;'><a>用户</a></li>"));
            }
            if (that.OrgUnitVisible) {
                 //that.SelectorTabs.append($("<li>").append("<a>部门</a>").attr("data-tabtype", "tab_Deps").css("cursor", "pointer"));
                 that.SelectorTabs.append($("<li data-tabtype='tab_Deps' style='cursor:pointer;'><a>部门</a></li>"));
             }

            that.SelectorPanel.append(that.SelectorTabs);

            //用户面板
            //that.UsersDataPanel = $("<div>").addClass("SheetUser_DataPanel").addClass("row").addClass("SheetUser_tab_Users");
            that.UsersDataPanel = $("<div class='SheetUser_DataPanel row SheetUser_tab_Users'>");
            //部门面板
            //that.DepsDataPanel = $("<div>").addClass("SheetUser_DataPanel").addClass("row").addClass("SheetUser_tab_Deps");
            that.DepsDataPanel = $("<div class='SheetUser_DataPanel row SheetUser_tab_Deps'>");
            //标签面板

            that.SelectorPanel.append(that.DepsDataPanel);
            that.SelectorPanel.append(that.UsersDataPanel);

            that.$UserPanel = $("<div class='userpanel'  style='position:absolute;'>");
            that.$UserPanel.append(that.$SearchDiv).append(that.SelectorPanel).append(that.$SearchPanel);
            //that.$UserPanel.appendTo("body");
            that.$UserPanel.appendTo(that.CurrentBody);
            //--------------------------------------

            //页签切换
            that.SelectorTabs.find("li").unbind("click.SelectorTabs").bind("click.SelectorTabs", that, function(e) {
                if ($(this).hasClass("active")) return;
                var that = e.data;
                var $parent = $(this).parent();
                $parent.find("li").removeClass("active");
                $(this).addClass("active");

                var tabType = $(this).attr("data-tabtype");
                that.SelectorPanel.find(".SheetUser_DataPanel").hide();
                that.SelectorPanel.find(".SheetUser_" + tabType).show();
                that.LoadOrgByTabType(tabType);

                setTimeout(function() {
                    e.data.$SearchInput[0].focus();
                }, 50)
            });

            //点击到当前元素，设置input焦点
            $(that.$InputBody).children("div").unbind("click.FormMultiUser").bind("click.FormMultiUser", that, function(e) {
                var $target = $(e.target);
                if (!$target.closest("li").hasClass("SheetUser-LiItem")) {
                    e.data.FocusInput.apply(e.data);

                    setTimeout(function() {
                        e.data.$SearchInput[0].focus();
                    }, 50)
                    //e.data.$SearchInput[0].focus(); //弹出对话框后手动获取搜索框焦点,不执行绑定的focusin事件
                    //首页
                    if (typeof AppTree != 'undefined') {
                        AppTree.destroyTree();
                    }
                    //下拉框隐藏
                    $("ul.drop-list.drop-list_s").hide();
                    //关联表单隐藏
                    $(".form-query-dropdown").hide();
                    // 停止冒泡，防止与SheetQuery冲突而添加
                    e.stopPropagation();
                }
            });
            $(that.$UserPanel).children("div").unbind("click.FormMultiUser").bind("click.FormMultiUser", that, function(e) {
                var $target = $(e.target);
                if (!$target.closest("li").hasClass("SheetUser-LiItem")) {
                    //e.data.$Input.focus();
                    //e.data.$SearchInput[0].focus();
                    // 停止冒泡，防止与SheetQuery冲突而添加
                    e.stopPropagation();
                }
            });

            //得到焦点显示
            $(that.$SearchInput).unbind("focusin.Input").bind("focusin.Input", that, function(e) {
                e.data.$SearchInput.removeAttr("placeholder");
                //e.data.FocusInput.apply(e.data);
            });

            $(that.$SearchInput).off("input propertychange").on("input propertychange", that, function(e) {
                var isIE = navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("Edge") > -1 ||
                    (navigator.userAgent.indexOf("Trident") > -1 && navigator.userAgent.indexOf("rv") > -1);
                if (isIE) {
                    var that = e.data;
                    that.TimeOut && window.clearTimeout(that.TimeOut);
                    that.TimeOut = setTimeout(function() {
                        that.SearchOrg.apply(that, [that]);
                    }, 500);
                }
            });

            //控件输入
            $(that.$SearchInput).unbind("keyup.SearchTxtElement").bind("keyup.SearchTxtElement", that, function(e) {
                e.data.SetSearchTxtElementWidth.apply(e.data);
                //e.data.FocusInput.apply(e.data);
                //e.data.KeyTime = new Date();

                var that = e.data;
                that.TimeOut && window.clearTimeout(that.TimeOut);
                that.TimeOut = setTimeout(function() {
                    that.SearchOrg.apply(that, [that]);
                }, 500);
            });

            $(that.$SearchInput).unbind("keydown.SearchTxtElement").bind("keydown.SearchTxtElement", that, function(e) {
                if (e.keyCode == 8 && $(this).val() == "" && $(this).prev().length > 0) {
                    var unit = e.data.GetSelectUnitByChoiceID.apply(e.data, [$(this).prev().attr("id")]);
                    e.data.RemoveChoice.apply(e.data, [unit.id]);
                }
            });

            //点击屏幕的其他地方 $(document)
            $(that.CurrentDocument).unbind("mousedown." + that.ID).bind("mousedown." + that.ID, that, function(e) {
                //edit by xc 特殊情况处理
                if ($(e.target).hasClass("row") && $(e.target).children(".col-md-6").children("div[data-controlkey='FormUser']").length > 0) {
                    return false;
                } else if ($(e.target).closest("div[data-targetid='" + e.data.ID + "']").length == 0) {
                    e.data.FocusOutput.apply(e.data);
                    e.stopPropagation();
                }
            });
        },

        //设置输入框的宽度
        SetSearchTxtElementWidth: function() {
            //var w = "1px";
            //var length = this.$Input.val().length;
            //if (length > 0) {
            //    w = length * 15 + "px";
            //    this.$Input.removeAttr("PlaceHolder", this.PlaceHolder);
            //}
            ////else if ($.isEmptyObject(this.Units)) {
            ////    w = "100%";
            ////    this.$Input.attr("PlaceHolder", this.PlaceHolder);
            ////}
            ////else {
            ////    this.$Input.removeAttr("PlaceHolder", this.PlaceHolder);
            ////}
            //$(this.$Input).width(w);
        },

        //获取焦点焦点
        FocusInput: function() {
            //this.$SearchInput.removeAttr("placeholder");
            var position = this.$InputBody.offset();
            //var WindowW = $(window).outerWidth();
            var WindowW = $(this.CurrentDocument).outerWidth();
            var padding = this.$InputBody.css("padding-left");
            padding = padding ? parseInt(padding) : 0;
            if (this.IsInGridView) {
                if (WindowW - position.left < 500) {
                    this.$UserPanel.css("right", WindowW - position.left - this.$InputBody.outerWidth());
                    //this.$SearchDiv.css("right", WindowW - position.left - this.$InputBody.outerWidth());
                    //this.SelectorPanel.css("right", WindowW - position.left - this.$InputBody.outerWidth());
                    //this.$SearchPanel.css("right", WindowW - position.left - this.$InputBody.outerWidth());
                } else {
                    this.$UserPanel.css("left", position.left);
                    //this.$SearchDiv.css("left", position.left);
                    //this.SelectorPanel.css("left", position.left);
                    //this.$SearchPanel.css("left", position.left);
                }
                //this.SelectorPanel.css("top", position.top + this.$InputBody.height());
                //this.SelectorPanel.width(this.UnitsElement.width());
            } else {
                if (this.Options.appendBody === false) {
                    var pos = this.$InputBody.parent().position();
                    this.$UserPanel.css("left", pos.left);
                    this.$UserPanel.css("top", pos.top);
                } else {
                    if (WindowW - position.left < 500) {
                        this.$UserPanel.css("right", padding);
                        //this.$SearchDiv.css("right", padding);
                        //this.SelectorPanel.css("right", padding);
                        //this.$SearchPanel.css("right", padding);
                    } else {
                        this.$UserPanel.css("left", position.left + padding);
                        //this.$SearchDiv.css("left", position.left + padding);
                        //this.SelectorPanel.css("left", position.left + padding);
                        //this.$SearchPanel.css("left", position.left + padding);
                    }
                    this.$UserPanel.css("top", position.top + this.$InputBody.height());
                }
            }

            //var bottom = $(window).height() - position.top - this.$InputBody.height() + $(window).scrollTop();
            //var userPanelHeight = $(this.$UserPanel).height();
            //if (bottom > userPanelHeight) {
            //    this.$UserPanel.css("top", position.top + this.$InputBody.height());
            //} else {
            //    this.$UserPanel.css("top", position.top - userPanelHeight);
            //}




            //this.$SearchDiv.css("top", position.top + this.$InputBody.height());
            //this.SelectorPanel.css("top", position.top + this.$InputBody.height() + this.$SearchDiv.height());
            //this.$SearchPanel.css("top", position.top + this.$InputBody.height() + this.$SearchDiv.height());

            //绑定元素父元素的滚动事件，重新赋值$UserPanel的高度和left
            var that = this;
            // zyy - modify- 2018-10-8
            /*$.each($(this.Element).parents(), function(index, obj) {
                $(obj).scroll(function() {
                    that.$UserPanel.css("top", that.$InputBody.height() + that.$InputBody.offset().top);

                });
            });*/


            if (this.SelectorPanel.is(":visible")) return;

            //to do by xiechang 增加位置判断，防止浏览器遮罩

            //其他的选人控件都隐藏(包括单人和多人 edit by xc)
            $("div[data-FormMultiUserPanel='SelectorPanel'],div[data-FormUserPanel='SelectorPanel'],div[data-formmultiuserpanel='searchdiv']").hide();

            if (this.SelectorTabs.find("li.active").length == 0) {
                this.SelectorTabs.find("li:first").click();
            }

            this.$UserPanel.show();
            this.SelectorPanel.show();
            this.$SearchPanel.hide();
            this.$SearchDiv.show();

            //var bottom = $(window).height() - position.top - this.$InputBody.height() + $(window).scrollTop();
            //var userPanelHeight = $(this.$UserPanel).height();
            //if (bottom < userPanelHeight) {
            //    if (this.$InputBody.parents(".modal-dialog").length == 1) {
            //        this.SelectorPanel.css("height", bottom - 50);
            //    } else {
            //        setTimeout(function () {
            //            $(window).scrollTop(userPanelHeight - bottom + 30);
            //            $("body").css("overflow", "hidden");
            //        }, 300)
            //    }
            //} else {
            //    $("body").css("overflow", "hidden");
            //}
        },

        //失去焦点
        FocusOutput: function() {

            this.$SearchInput.attr("placeholder", this.Placeholder);

            if (this.SelectorPanel) {
                this.SelectorPanel.hide();
                this.$SearchPanel.hide();
                //this.$Input.val("");
                this.$SearchInput.val("");
                this.Required && (this.UnitsElement.text() != "" && this.UnitsElement.css({ "border": "1px solid #ddd", "box-shadow": "none" }));
            }
            this.$UserPanel.hide();
            $("body").css("overflow", "auto");
        },

        //添加:UserID/UserCode
        AddUserID: function(UserID) {
            var that = this;

            var ids = []
            if (UserID.constructor == Array) {
                for (var i = 0; i < UserID.length; i++) {
                    var id = UserID[i];
                    if (!that.MultiUserData.UserItems[id]) {
                        ids.push(id);
                    }
                }
            } else {
                if (!that.MultiUserData.UserItems[UserID]) {
                    ids.push(UserID);
                } else {
                    that.AddChoice(that.MultiUserData.UserItems[UserID]);
                }
            }
            if (ids.length > 0) {
                var param = {
                    ActionName: "SheetUserAction",
                    Command: "GetUserProperty",
                    id: JSON.stringify(ids)
                };
                this.Ajax(
                    that.FormMultiUserHandler,
                    "POST", { PostData: JSON.stringify(param) },
                    function(data) {
                        if (data && data.ReturnData.UnitItems) {
                            that.AddUserData.apply(that, [data.ReturnData.UnitItems]);
                            for (var i = 0; i < data.ReturnData.UnitItems.length; i++) {
                                that.AddChoice.apply(that, [data.ReturnData.UnitItems[i]]);
                            }
                        }
                    },
                    false);
            } else if (UserID.constructor == Array) {
                for (var i = 0; i < UserID.length; i++) {
                    var id = UserID[i];
                    if (that.MultiUserData.UserItems[id]) {
                        that.AddChoice(that.MultiUserData.UserItems[id]);
                    }
                }
            }
        },

        //添加用户数据
        AddUserData: function(UnitItems) {
            for (var i = 0; i < UnitItems.length; i++) {
                this.MultiUserData.UserItems[UnitItems[i].id] = UnitItems[i];
            }
        },

        //添加选择
        AddChoice: function(UnitObject) {
            if (!UnitObject) return;
            if (UnitObject.ObjectId && !UnitObject.id)
                UnitObject.id = UnitObject.ObjectId;
            if (UnitObject.Name && !UnitObject.name)
                UnitObject.name = UnitObject.Name;
            if (!UnitObject.id) return;
            if (this.Units[UnitObject.id]) return;
            if (!this.IsMultiple) {
                this.ClearChoices();
            }
            var NewUnitObject = $.extend(true, {}, UnitObject);

            this.Units[NewUnitObject.id] = NewUnitObject;

            //this.OnChange(NewUnitObject);
            //this.FormMultiUserChange(NewUnitObject);

            this.Validate();
            if (!this.Editable) {
                if (this.Visible) {
                    var text = this.$Input.text();
                    text = text ? text + ";" + NewUnitObject.name : NewUnitObject.name;
                    this.$Input.text(text);


                    //Error这一块是不是应该抽到BaseControl中去 
                    ////如果控件在子表中，子表列宽要重新计算
                    //if (this.IsInGridView) {
                    //    var gridViewCtrl = $(this.Element).closest('div[data-controlkey="FormGridView"]');
                    //    if (gridViewCtrl && gridViewCtrl.length > 0) {
                    //        gridViewCtrl = gridViewCtrl.FormGridView();
                    //        gridViewCtrl && gridViewCtrl.ResizeColumn(true);
                    //    }
                    //}
                }
                return;
            }
            var choiceID = $.IGuid();
            NewUnitObject.ChoiceID = choiceID;
            var choice = $("<span class='SheetUser-Item label label-info icon-close-middle'></span>");

            var icon = "";
            switch (NewUnitObject.Type) {
                case 1:
                    icon = "fa icon-gongsi";
                    break;
                case 2:
                    icon = "icon-xiashuguanli";
                    break;
                case 4:
                    icon = "glyphicon icon-people";
                    break;
                    //case 8:
                    //    icon = "glyphicon-bookmark";
                    //break;
            }
            //choice.append($("<i>").addClass(icon));
            var name = NewUnitObject.userName ? NewUnitObject.userName : NewUnitObject.name
            choice.append(name);
            choice.attr("id", choiceID).data("id", NewUnitObject.id);
            choice.attr("currentId", UnitObject.id).data("currentId", UnitObject.id);
            this.$Input.before(choice);
            var that = this;
            //可用
            if (this.Editable) {
                choice.unbind("click.choice").bind("click.choice", this, function(e) {
                    e.data.RemoveChoice.apply(e.data, [$(this).data("id")]);
                    // //
                    //var $this = $(this).closest("div.SheetUser");
                    that.Options.HideCallBack && that.Options.HideCallBack(null, that.$InputBody.parent("div").attr("data-type"));
                });

                //映射关系
                if (!$.isEmptyObject(this.MappingControls)) {
                    this.MappingControlsHandler(NewUnitObject);
                }
                ////如果控件在子表中，子表列宽要重新计算
                //if (this.IsInGridView) {
                //    var gridViewCtrl = $(this.Element).closest('div[data-controlkey="FormGridView"]');
                //    if (gridViewCtrl && gridViewCtrl.length > 0) {
                //        gridViewCtrl = gridViewCtrl.FormGridView();
                //        gridViewCtrl && gridViewCtrl.ResizeColumn(true);
                //    }
                //}
            }

            if (!this.IsMultiple) {
                this.FocusOutput();
            }

            //勾选选中项
            //$(this.DepsDataPanel).find("input:checkbox[id=c_" + id + "]").prop("checked", true).parent().data("Exist", true);
            //$(this.UserListPanel).find("input:checkbox[id=c_" + id + "]").prop("checked", true).parent().data("Exist", true);

            //作为筛选控件时，添加元素时需要移除
            if (this.$tipDiv) {
                this.$tipDiv.remove();
            }
        },

        //清楚所有的选择
        ClearChoices: function() {
            for (var id in this.Units) {
                this.RemoveChoice(id);
            }
            //清空的时候，清空缓存
            if (!this.UseDataCache) {
                //不用缓存，每次都清空
                this.MultiUserData = {
                    //部门
                    OrgUnitItems: {},
                    //标签
                    //OrgTagItems: [],
                    //部门用户:{部门ID:[]}
                    DepUserItems: {},
                    //用户
                    UserItems: {},
                };
                if (this.DepsDataPanel) {
                    this.DepsDataPanel.data("IsLoad", false);
                    //this.TagsDataPanel.data("IsLoad", false);
                    this.UsersDataPanel.data("IsLoad", false);
                    this.SelectorTabs.find("li.active").removeClass("active");
                }
            }
        },

        //移除选择
        RemoveChoice: function(Obj) {
            if (!Obj) return;
            if (Obj.constructor == String) {
                if (this.Units[Obj]) {
                    if (this.Editable) {
                        $(this.Element).find("#" + this.Units[Obj].ChoiceID).remove();
                    } else {
                        this.$Input.text("");
                    }
                    $(this.DepsDataPanel).find("input:checkbox[id='c_" + Obj + "']").prop("checked", false).parent().data("Exist", false);
                    $(this.UserListPanel).find("input:checkbox[id='c_" + Obj + "']").prop("checked", false).parent().data("Exist", false);
                    delete this.Units[Obj];
                }
            } else if (Obj.constructor == Array) {
                for (var i = 0; i < Obj.length; i++) {
                    if (Obj[i].constructor == String) {
                        var unitId = Obj[i];
                        if (this.Editable) {
                            $(this.Element).find("#" + this.Units[unitId].ChoiceID).remove();
                        } else {
                            this.$Input.text("");
                        }
                        $(this.DepsDataPanel).find("input:checkbox[id='c_" + unitId + "']").prop("checked", false).parent().data("Exist", false);
                        $(this.UserListPanel).find("input:checkbox[id='c_" + unitId + "']").prop("checked", false).parent().data("Exist", false);
                        delete this.Units[unitId];
                    }
                }
            }
            this.Validate();
            this.OnChange(Obj);
        },

        //判断是存在选项
        ExistChoice: function(id) {
            if (this.Units[id])
                return true;
            else
                return false;
        },

        //加载类型
        LoadOrgByTabType: function(tabType) {
            this.MultiUserData = {
                //部门
                OrgUnitItems: {},
                //标签
                //OrgTagItems: [],
                //部门用户:{部门ID:[]}
                DepUserItems: {},
                //用户
                UserItems: {},
            }
            switch (tabType) {
                case "tab_Deps":
                    this.LoadDepsData();
                    break;
                case "tab_Users":
                    this.LoadUsersData();
                    break;
            }
        },

        //加载组织机构树
        LoadDepsData: function($el, id) {
            if (this.DepsDataPanel.data("IsLoad")) return;
            this.DepsDataPanel.data("IsLoad", true);
            this.DepsDataPanel.html("");
            this.LoadUnitsTree(this.DepsDataPanel, "tab_Deps");
        },

        //加载部门树
        LoadUnitsTree: function($panel, tabType, parentId) {

            var that = this;
            var isDeps = false;
            //是部门页签，可以选择部门
            if (tabType && tabType == "tab_Deps") {
                isDeps = true;
            }

            if (!$.isEmptyObject(that.MultiUserData.OrgUnitItems)) {
                var $ul = $("<ul class='nav'>"); //.addClass("nav");
                var parendId = parentId ? parentId : that.MultiUserData.OrgUnitItems;
                var root = that.GetUnitsByParentId(parendId);
                //$ul.append(that.CreateUnitsItem(root[0], isDeps));
                for (var i = 0; i < root.length; i++) {
                    $ul.append(that.CreateUnitsItem(root[i], isDeps));
                }
                $panel.append($ul);
                //设置树的展开关闭
                if ($ul.metisMenu)
                    $ul.metisMenu();
                $ul.find("a:first,a:first>span.icon-xiangyoua").data("IsSystem", true).click();
            } else {
                var actionCommand = "LoadUnit";
                if (that.UnitSelectionRange) {
                    //如果设置了选人范围则调用
                    actionCommand = "LoadOwnAndChildUnit";
                }

                //更改选人控件范围
                that.UpdateUnitSelectionRange.apply(that);

                var params = { pid: '0' };
                this.Ajax(
                    '/ctg-workflow/organ/childList',
                    "POST",
                    params,
                    function(data) {
                        that.MultiUserData.OrgUnitItems = data.page.result;
                        if (data.page.result.length == 0) {
                            return;
                        }
                        that.LoadUnitsTree($panel, tabType, '0');
                    });
            }
        },

        //校验
        Validate: function() {
            //不可编辑
            if (!this.Editable) return true;

            var val = this.GetValue();

            if ($.isEmptyObject(val)) {
                //为空时添加
                if (this.IsQueryControl && this.UnitsElement.find(".sp_placeholder").length == 0) {
                    this.UnitsElement.append(this.$tipDiv);
                    this.UnitsElement.removeClass("icon-arrow-down-full").css("border", "1px dashed #D7D5D5");

                }
                if (this.Required) {
                    this.AddInvalidText(this.UnitsElement, "必填");
                    return false;
                }
            }

            this.RemoveInvalidText(this.UnitsElement);

            if (this.IsQueryControl) {
                this.UnitsElement.removeClass("icon-arrow-down-full").css("border", "1px dashed #D7D5D5");
            }
            return true;
        },

        //创建部门的<li>对象
        CreateUnitsItem: function(UnitItem, isDeps) {
            var that = this;

            var $li = $("<li>");
            var $a = $("<a>");
            if (UnitItem.HasChild) {
                $a.append("<span class='fa icon-xiangyoua sheet-angel'></span>");
            } else {
                $a.append("<span class='fa icon-xiangyoua sheet-angel no-child'></span>");
            }
            var icon = "icon-xiashuguanli";
            if (UnitItem.Type == 1) {
                //公司
                icon = "icon-gongsi";
            } else if (UnitItem.Type == 8) {
                //角色
                if (isDeps) {
                    return;
                }
                icon = "fa icon-man";
            } else {
                //其他
                icon = "icon-xiashuguanli";
            }
            $a.append("<i class='" + icon + "'></i>").append(UnitItem.name).data("UnitItem", UnitItem);
            //.data("id", UnitItem.ID).data("Code", UnitItem.Code).data("name", UnitItem.name).attr("data-Type", UnitItem.Type);
            if (isDeps) {
                let checked = this.Units[UnitItem.id]
                if (checked) {
                    var $checkbox = $("<input type='checkbox' checked id='c_" + UnitItem.id + "'/>");
                } else {
                    var $checkbox = $("<input type='checkbox' id='c_" + UnitItem.id + "'/>");
                }
                $li.addClass("SheetUser-LiItem");
                var $checkboxLabel = $("<label for='c_" + UnitItem.id + "'></label>");
                //如果是部门tab的话，炫耀可选
                //var $stateIcon = $("<i class='glyphicon'></i>").attr("data-id", UnitItem.id).attr("data-Type", UnitItem.Type);
                //$a.append($stateIcon);
                $a.append($checkbox).append($checkboxLabel);

                $a.find("label,input").click(function(e) {
                    e.preventDefault();
                });
                $a.click(function(e) {
                    if (e.target.tagName.toLowerCase() == "span") return;
                    if ($(this).data("IsSystem")) {
                        $(this).data("IsSystem", false)
                        return;
                    }
                    var UnitObject = $(this).data("UnitItem");
                    if ($(this).data("Exist")) {
                        that.RemoveChoice.apply(that, [UnitObject.id]);
                        //$(this).find("i:last").removeClass("glyphicon-ok");
                        $(this).find("input:checkbox").prop("checked", false);
                        $(this).data("Exist", false);
                    } else {
                        //$(this).find("i:last").addClass("glyphicon-ok");
                        $(this).find("input:checkbox").prop("checked", true);
                        $(this).data("Exist", true);
                        //that.AddChoice.apply(that, [UnitObject]);
                        that.SetValue.apply(that, [UnitObject]);
                    }
                    ////
                    //var $this = $(this).closest("div.SheetUser");
                    that.Options.HideCallBack && that.Options.HideCallBack(null, that.$InputBody.parent("div").attr("data-type"));
                });
            } else {
                $a.click(function(e) {
                    //if (e.target.tagName.toLowerCase() == "span") return;
                    var UnitObject = $(this).data("UnitItem");
                    that.LoadUsersByParenID.apply(that, [UnitObject.id], that.ShowUnActive);
                });
            }

            $li.append($a);
            if (UnitItem.HasChild) {
                $a.children(".sheet-angel").click(function(e) {
                    var pthat = this;
                    if ($(this).closest("li").hasClass("active")) {
                        $(this).removeClass("icon-chevron-down-fill").addClass("icon-xiangyoua");

                        $(this).closest("li").removeClass("active");
                        $(this).closest("li").find("ul").hide();
                    } else {
                        $(this).closest("li").find("ul").remove();
                        var children = that.GetUnitsByParentId(UnitItem.id);
                        if (children.length > 0) {
                            var $ul = $("<ul class='nav SheetUser_SubTreePanel'>"); //.addClass("nav SheetUser_SubTreePanel");
                            for (var i = 0; i < children.length; i++) {
                                $ul.append(that.CreateUnitsItem(children[i], isDeps));
                            }
                            $(this).closest("li").append($ul);
                            if ($ul.metisMenu)
                                $ul.metisMenu();

                            setTimeout(function() {
                                if ($(pthat).closest("li").hasClass("active")) {
                                    $(pthat).removeClass("icon-xiangyoua").addClass("icon-chevron-down-fill");
                                } else {
                                    $(pthat).removeClass("icon-xiangyoua").addClass("icon-chevron-down-fill");
                                    $(pthat).closest("li").addClass("active");
                                }
                            }, 100);

                        }
                    }
                });
            }
            return $li;
        },

        //根据父ID获取子部门
        GetUnitsByParentId: function(parentId) {
            var that = this;
            var units = [];
            for (var i = 0; i < that.MultiUserData.OrgUnitItems.length; i++) {
                if (that.MultiUserData.OrgUnitItems[i].ParentId == parentId) {
                    units.push(that.MultiUserData.OrgUnitItems[i]);
                }
            }
            // 从后台读取下级部门
            if (units.length == 0) {
                var actionCommand = "LoadUnit";
                //if (that.UnitSelectionRange) {
                //    //如果设置了选人范围则调用下面
                //    actionCommand = "LoadOwnAndChildUnit";//如果设置了选人范围则加载制定组织和其下级
                //}
                var params = {
                    // ActionName: "SheetUserAction",
                    // Command: actionCommand,
                    pid: parentId
                }
                this.Ajax(
                    '/ctg-workflow/organ/childList',
                    "POST",
                    params,
                    function(data) {
                        if (data.page.result.length > 0) {
                            for (var i = 0; i < data.page.result.length; i++) {
                                if (Array.isArray(that.MultiUserData.OrgUnitItems)) {
                                    that.MultiUserData.OrgUnitItems.push(data.page.result[i]);
                                }
                                units.push(data.page.result[i]);
                            }
                        }
                    }, false);
            }
            return units;
        },

        //加载用户数据
        LoadUsersData: function() {
            var that = this;
            if (that.UsersDataPanel.data("IsLoad")) return;
            that.UsersDataPanel.data("IsLoad", true).css("overflow", "hidden");
            var leftPanel = $("<div class='SheetUser_TreePanel col-sm-7 cols-xs-7'>") /*.addClass("SheetUser_TreePanel col-sm-7")*/ .height("100%");
            that.UserListPanel = $("<div class='col-sm-5  cols-xs-7'>") /*.addClass("col-sm-5")*/ .height("100%").css("overflow", "auto");
            //var SplitLine = $("<div style='float:left;min-height:80px;max-height:125px;width:0px;border:1px solid #D8D8D8'></div>");
            that.UsersDataPanel.html("");
            that.UsersDataPanel.append(leftPanel);
            that.UsersDataPanel.append(that.UserListPanel);
            that.LoadUnitsTree(leftPanel);
        },

        // 
        LoadUsersByParenID: function(parentID) {
            var that = this;
            if (!that.MultiUserData.DepUserItems[parentID]) {
                var showUnActive = this.ShowUnActive;
                var params = {
                    organId: parentID,
                    pageSize: 100000000
                }
                this.Ajax(
                    '/ctg-workflow/user/pageList',
                    "POST",
                    params,
                    function(data) {
                        that.MultiUserData.DepUserItems[parentID] = data.page.result;
                        that.LoadUsersByParenID.apply(that, [parentID]);
                        that.list = data

                        //异步添加用户数据
                        setTimeout(function() {
                            that.AddUserData(data.page.result);
                        }, 0);
                    });
            } else {
                var $ul = $("<ul>").addClass("nav").data("ParentID", parentID);
                var Length = that.MultiUserData.DepUserItems[parentID].length;
                var SelectCount = 0;
                // todo by xiechang 增加全选框
                if (that.IsMultiple && Length > 0) {
                    var $liAll = $('<li class="SheetUser-LiItem"></li>');
                    var $aall = $("<a class='allcheck'>全选</a>");
                    var $allCheckInput = $('<input type="checkbox" id="all' + that.ID + '"/>');
                    var $allCheck = $('<label for="all' + that.ID + '" class="label-all"></label>');
                    $liAll.append($aall.append($allCheckInput).append($allCheck));
                    $allCheck.data("ParentID", parentID);
                    $allCheck.click(function(e) {
                        var ListItem = that.MultiUserData.DepUserItems[$(this).data("ParentID")];
                        var addItems = [];
                        var removeItems = [];
                        var val = !that.$UserPanel.find("#" + $(this).attr("for"))[0].checked;
                        for (var i = 0, len = ListItem.length; i < len; i++) {
                            var item = ListItem[i];
                            if (val) {
                                if (!that.ExistChoice(item.id)) {
                                    //that.AddChoice.apply(that, [item]);
                                    //that.SetValue.apply(that, [item]);
                                    addItems.push(item.id);
                                }
                                continue;
                            } else {
                                if (that.ExistChoice(item.id)) {
                                    //that.RemoveChoice.apply(that, [item.id]);
                                    removeItems.push(item.id);
                                }
                                continue;
                            }
                        }
                        //批量操作只需要执行一次onchange事件
                        if (addItems.length > 0) {
                            that.SetValue.apply(that, [addItems]);
                        }
                        if (removeItems.length > 0) {
                            that.RemoveChoice.apply(that, [removeItems]);
                        }

                        var $ParUl = $(this).closest("ul.nav");
                        val ? $ParUl.data("SelectCount", len) : $ParUl.data("SelectCount", 0);
                        $ParUl.find("a:not(.allcheck)").each(function() {
                            $(this).data("Exist", val);
                            val ? $(this).find("input:checkbox").prop("checked", true) : $(this).find("input:checkbox").prop("checked", false);
                        });
                        //var $this = $(this).closest("div.SheetUser");
                        that.Options.HideCallBack && that.Options.HideCallBack(null, that.$InputBody.parent("div").attr("data-type"));
                    });
                    $ul.append($liAll);
                }
                for (var i = 0; i < Length; i++) {
                    var UnitItem = that.MultiUserData.DepUserItems[parentID][i];
                    var $li = $("<li>").addClass("SheetUser-LiItem");
                    var $checkbox = $('<input type="checkbox" id="c_' + UnitItem.id + '"/> <label for="c_' + UnitItem.id + '"></label>');
                    var icon = UnitItem.Type == 1 ? "fa icon-gongsi" : (UnitItem.Type == 2 ? "icon-xiashuguanli" : UnitItem.Icon);
                    var $a = $("<a>").append($checkbox).append("<i class='glyphicon " + (UnitItem.Icon == "glyphicon-user" ? "icon-people" : UnitItem.Icon) + "'></i>").data("UnitItem", UnitItem);
                    //.data("id", UnitItem.ID).data("Code", UnitItem.Code).data("name", UnitItem.name);
                    var checkboxID = $.IGuid();
                    //var $label = $("<label>").text(UnitItem.name);
                    var $stateIcon = $("<i class='glyphicon'></i>").attr("data-id", UnitItem.id).attr("data-Type", UnitItem.Type);
                    //$a.append($label);
                    $a.append(UnitItem.userName);
                    $a.append($stateIcon);
                    if (that.ExistChoice(UnitItem.id)) {
                        //$stateIcon.addClass("glyphicon-ok");
                        $($checkbox).prop("checked", true);
                        $a.data("Exist", true);
                        SelectCount++;
                    }
                    $a.find("label,input").click(function(e) {
                        e.preventDefault();
                    });

                    $a.click(function(e) {
                        var UnitObject = $(this).data("UnitItem");
                        var $ParUl = $(this).closest(".nav");
                        var Count = $ParUl.data("SelectCount");
                        if ($(this).data("Exist")) {
                            that.RemoveChoice.apply(that, [UnitObject.id]);
                            $(this).find("input:checkbox").prop("checked", false);
                            //$(this).find("i:last").removeClass("glyphicon-ok");
                            $(this).data("Exist", false);
                            Count--;
                        } else {
                            //$(this).find("i:last").addClass("glyphicon-ok");
                            $(this).find("input:checkbox").prop("checked", true);
                            //that.AddChoice.apply(that, [UnitObject]);
                            that.SetValue.apply(that, [UnitObject]);
                            $(this).data("Exist", true);
                            Count++;
                        }
                        if (that.MultiUserData.DepUserItems[$ParUl.data("ParentID")] && Count === that.MultiUserData.DepUserItems[$ParUl.data("ParentID")].length && that.IsMultiple) {
                            that.$UserPanel.find("#all" + that.ID)[0].checked = true;
                        } else if (that.IsMultiple) {
                            that.$UserPanel.find("#all" + that.ID)[0].checked = false;
                        }
                        $ParUl.data("SelectCount", Count);
                        //var $this = $(this).closest("div.SheetUser");
                        that.Options.HideCallBack && that.Options.HideCallBack(null, that.$InputBody.parent("div").attr("data-type"));

                    });

                    $li.append($a);
                    $ul.append($li);
                }
                $ul.data("SelectCount", SelectCount);
                if (SelectCount === Length && SelectCount > 0 && that.IsMultiple) {
                    $ul.find("#all" + that.ID)[0].checked = true;
                }
                if (that.UserListPanel && that.UserListPanel.html) {
                    that.UserListPanel.html("").append($ul);
                }
            }
        },

        ScrollLoad: function() {
            return;
            var that = this;
            if (that.IsPosting) {
                return;
            }
            //var searchkey = $(that.$Input).val().trim();
            var searchkey = $(that.$SearchInput).val().trim();
            that.IsPosting = true;
            var params = {
                ActionName: "SheetUserAction",
                Command: 'SearchOrg',
                SearchKey: searchkey,
                OrgUnitVisible: that.OrgUnitVisible,
                UserVisible: that.UserVisible,
                ShowUnActive: that.ShowUnActive,
                UnitSelectionRange: that.UnitSelectionRange,
                FromNum: that.FromNum,
                ToNum: that.ToNum
            }
            that.Ajax(that.FormMultiUserHandler, 'POST', {
                PostData: JSON.stringify(params)
            }, function(data) {
                if (data != null && data.ReturnData.UnitItems.length > 0) {
                    that.FromNum = that.ToNum;
                    that.ToNum += data.ReturnData.UnitItems.length;
                    var $ul = that.$SearchPanel.find('ul');
                    for (var i = 0; i < data.ReturnData.UnitItems.length; i++) {
                        var UnitItem = data.ReturnData.UnitItems[i];
                        var $li = $("<li class='SheetUser-LiItem'>");
                        var icon = UnitItem.Type == 1 ? "fa icon-gongsi" : (UnitItem.Type == 2 ? "icon-xiashuguanli" : (UnitItem.Icon == "glyphicon-user" ? "icon-people" : UnitItem.Icon));
                        var name = UnitItem.name;
                        if (UnitItem.Type == 4) {
                            name += "-" + UnitItem.DepartmentName;
                        }
                        var $checkbox = $("<input type='checkbox' id='c" + UnitItem.id + "'/>");
                        var $checkboxLabel = $("<label for='c" + UnitItem.id + "'></label>");
                        var $stateIcon = $("<i class='glyphicon'></i>").attr("data-id", UnitItem.id).attr("data-Type", UnitItem.Type);
                        var $a = $("<a>").append($checkbox).append($checkboxLabel).append("<i class='glyphicon " + icon + "'></i>").append(name.replace(searchkey, "<span class='searchekey'>" + searchkey + "</span>")).append($stateIcon).data("UnitItem", UnitItem);

                        $a.find("input,label").click(function(e) {
                            e.preventDefault();
                        });

                        $a.click(function(e) {
                            var UnitObject = $(this).data("UnitItem");
                            var $pcheckbox = $(this).find("input:checkbox");
                            var checked = $pcheckbox.prop("checked");
                            if (checked) {
                                that.RemoveChoice.apply(that, [UnitObject]);
                                $pcheckbox.prop("checked", false);
                            } else {
                                //that.AddChoice.apply(that, [UnitObject]);
                                that.SetValue.apply(that, [UnitObject]);
                                $pcheckbox.prop("checked", true);
                            }
                            that.Options.HideCallBack && that.Options.HideCallBack(null, that.$InputBody.parent("div").attr("data-type"));
                        });
                        $ul.append($li.append($a));
                    }
                }
                that.IsPosting = false;
            });
        },
        //搜索用户
        SearchOrg: function() {
            var that = this;
                that.IsPosting = false;
                that.$SearchPanel.html("");

                if (that.CpLock)
                    return;
                //var searchkey = $(that.$Input).val().trim();
                var searchkey = $(that.$SearchInput).val().trim();
                if (searchkey == "") {
                    that.SelectorPanel.show();
                    that.$SearchPanel.hide();
                    return;
                }
                that.SelectorPanel.hide();
                that.$SearchPanel.show();
                that.$SearchDiv.show();
                //this.$SearchPanel.html("");

                that.IsPosting = true;
                that.FromNum = 0;
                that.ToNum = 10;

                /* var params = {
                    ActionName: "SheetUserAction",
                    Command: "SearchOrg",
                    SearchKey: searchkey,
                    OrgUnitVisible: that.OrgUnitVisible,
                    UserVisible: that.UserVisible,
                    FromNum: that.FromNum,
                    ToNum: that.ToNum,
                    ShowUnActive: false,
                    UnitSelectionRange: that.UnitSelectionRange,
                }; */

                var params = {
                    userName: searchkey
                };
                that.Ajax(that.FormMultiUserHandler, "POST", params, function(data) {
                    //this.$SearchPanel.html("");
                    data.ReturnData = {};
                    data.ReturnData.UnitItems = that.convertUser(data);
                    if (data != null && data.ReturnData.UnitItems.length > 0) {
                        that.FromNum = that.ToNum + 1;
                        that.ToNum += data.ReturnData.UnitItems.length;
                        var $ul = $("<ul style='height:auto;overflow:auto;width:100%;height:auto;max-height:300px;'>").addClass("nav").addClass("SheetUser_SubTreePanel");
                        for (var i = 0; i < data.ReturnData.UnitItems.length; i++) {
                            var UnitItem = data.ReturnData.UnitItems[i];
                            var $li = $("<li class='SheetUser-LiItem'>");
                            var icon = UnitItem.Type == 1 ? "fa icon-gongsi" : (UnitItem.Type == 2 ? "icon-xiashuguanli" : (UnitItem.Icon == "glyphicon-user" ? "icon-people" : UnitItem.Icon));
                            var name = UnitItem.name;
                            if (UnitItem.Type == 4) {
                                name += "-" + UnitItem.DepartmentName;
                            }
                            var $checkbox = $("<input type='checkbox' id='c" + UnitItem.id + "'/>");
                            var $checkboxLabel = $("<label for='c" + UnitItem.id + "'></label>");
                            var $stateIcon = $("<i class='glyphicon'></i>").attr("data-id", UnitItem.id).attr("data-Type", UnitItem.Type);
                            var $a = $("<a>").append($checkbox).append($checkboxLabel).append("<i class='glyphicon " + icon + "'></i>").append(name.replace(searchkey, "<span class='searchekey'>" + searchkey + "</span>")).append($stateIcon).data("UnitItem", UnitItem);

                            $a.find("input,label").click(function(e) {
                                e.preventDefault();
                            });
                            $a.click(function(e) {
                                //if (e.target.tagName.toLowerCase() == "span") return;
                                var UnitObject = $(this).data("UnitItem");
                                var $pcheckbox = $(this).find("input:checkbox");
                                var checked = $pcheckbox.prop("checked");
                                if (checked) {
                                    that.RemoveChoice.apply(that, [UnitObject.id]);
                                    $pcheckbox.prop("checked", false);
                                } else {
                                    //that.AddChoice.apply(that, [UnitObject]);
                                    that.SetValue.apply(that, [UnitObject]);
                                    $pcheckbox.prop("checked", true);
                                }
                                that.Options.HideCallBack && that.Options.HideCallBack(null, that.$InputBody.parent("div").attr("data-type"));
                                //that.$Input.val("");//移除搜索关键字
                                that.$SearchInput.val(""); //移除搜索关键字
                            });
                            $ul.append($li.append($a));
                        }
                        that.IsPosting = false;
                        that.$SearchPanel.append($ul);
                        //滚动加载
                        console.log($(this).height())
                        $($ul).scroll(function() {
                            //底部基本距离+滚动高度>=文档高度-窗体高度
                            var h_ul = $(this).height(); //窗口高度
                            var h_scrollTop = $(this).scrollTop(); //滚动条顶部
                            var h_offset = $(this).offset();
                            var h_panel = $(that.$SearchPanel).height();
                            // style='height:auto;overflow:auto;width:100%;height:auto;max-height:100px;
                            if (50 + h_scrollTop >= $(this)[0].scrollHeight - h_ul) {
                                that.ScrollLoad();
                            }
                        });
                    } else {
                        that.$SearchPanel.html("没搜索到用户");
                    }
                });

                that.SearchOrgTimeout = null;
            
        },

        // 处理返回用户和控件用户接口
        convertUser (data) {
            var arrayUnit = [];
            data.userList.forEach(user => {
                arrayUnit.push({
                    'id': user.id,
                    'userName': user.userName,
                    'name': user.userName,
                    'Type': 4,
                    'DepartmentName': user.organName
                });
            });
            return arrayUnit;
        },

        //处理映射关系
        MappingControlsHandler: function(UnitObject) {
            if ($.isEmptyObject(this.MappingControls)) return;
            if (this.IsMultiple) return;

            for (var property in this.MappingControls) {
                if (this.MappingControls.hasOwnProperty(property)) {
                    var targetFiled = this.MappingControls[property];
                    var MapValue = UnitObject[property] == void 0 ? "" : UnitObject[property];
                    if (property.toLowerCase() == "gender") {
                        //性别
                        MapValue = MapValue == 0 ? "未知" : (MapValue == 1 ? "男" : "女");
                    }

                    // 由于Mvc的JsonResult的Date Format为 "\/Date()\/"
                    if (MapValue.indexOf("/Date(") > -1) {
                        MapValue = new Date(parseInt(MapValue.replace("/Date(", "").replace(")/", ""), 10));
                        MapValue = MapValue.toLocaleDateString();
                    }
                    $.RoleControlManager.SetControlValue(targetFiled, MapValue, this.ObjectId);
                }
            }
        },
        //更新选人范围
        UpdateUnitSelectionRange: function() {
            this.UnitSelectionRange = $(this.Element).attr("data-unitselectionrange");
            //计算控件中的选人范围
            var that = this;
            if (that.UnitSelectionRange && that.UnitSelectionRange.length > 0) {
                var SelectionRange = that.UnitSelectionRange;
                var selects = that.UnitSelectionRange.split(";");
                if (selects.length > 0) {
                    for (var i = 0; i < selects.length; i++) {
                        var control = $("div[data-datafield=" + selects[i] + "]");
                        if (control.length > 0) {
                            var controlManager = control.RoleJControl();
                            //列表筛选时取不到值
                            if (!controlManager) { continue; }
                            SelectionRange = SelectionRange.replace(selects[i] + ";", "");
                            //添加change事件，控件值改变时，当前控件需要
                            //绑定改变值事件
                            var changeKey = "SelectionChangeMulti." + that.DataField;
                            if (!controlManager.ChangeEvents[changeKey]) {
                                controlManager.BindChange(changeKey, function() {
                                    that.SetValue("");
                                    //清空控件缓存
                                    that.UsersDataPanel.data("IsLoad", false);
                                    that.DepsDataPanel.data("IsLoad", false);
                                    that.MultiUserData = {
                                        //部门
                                        OrgUnitItems: {},
                                        //标签
                                        //OrgTagItems: [],
                                        //部门用户:{部门ID:[]}
                                        DepUserItems: {},
                                        //用户
                                        UserItems: {},
                                    };
                                    that.Units = {};

                                    that.UnitSelectionRange = $(that.Element).attr("data-unitselectionrange");

                                    //重新渲染组织机构
                                    that.LoadOrgByTabType("tab_Users");
                                    that.LoadOrgByTabType("tab_Deps");
                                });
                            }

                            var items = controlManager.GetValue();
                            if (items) {
                                for (var id in items) {
                                    SelectionRange += items[id].id + ";";
                                }
                            }
                        }
                    }
                }

                that.UnitSelectionRange = SelectionRange;
            }
        }
    });
})(jQuery);


// WEBPACK FOOTER //
// ./src/lib/H3/Form/Controls/FormMultiUser.js