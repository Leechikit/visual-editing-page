import {
  baseUrl
} from '../../../../config/env';
import FormulaEditorVue from '../../../../components/console/formula/index';
import HTTP from "../../../../../../api/form.js"

//公式编辑器堆栈
var FormulaEditableStack = {
  FormulaType: '',
  FormulaField: '',
  FormulaParameter: '',
  TitleCode: '',
  //显示模态框
  ShowModal: void 0,
  TargetControl: void 0, //绑定规则的控件
  FormulaControl: void 0, //存储规则的控件
  Counter: 0,
  //客户端公式集:用于保存客户端的表达式和显示Html,而不用每次显示都从服务器解析
  FormulaTextCache: {},
  SchemaCode: '', //当前表单schemaCode
  IsButton: false,
  SaveValue: function (formula, formulaText, titleCode, titleText) {
    if (formula) {
      formula = formula.trim();
      formulaText = formulaText.trim();
      if (titleText) {
        titleText = titleText.trim();
      }
    }
    if (FormulaEditableStack.FormulaControl) {
      FormulaEditableStack.FormulaControl.attr({
        'formula': formula,
        'formula-text': formulaText,
        'formula-titlecode': titleCode,
        'formula-titletext': titleText
      });
      var isButton = FormulaEditableStack.FormulaControl.attr('formula-button') || false;
      if (!isButton) {
        formulaText = formulaText.replace(/‘/g, "'").replace(/’/g, "'").replace(/“/g, '"').replace(/”/g, '"').replace(/'/g, '"');
        FormulaEditableStack.TargetControl.val(formulaText);
      }
      //触发改变事件
      //
      FormulaEditableStack.TargetControl.change();
      FormulaEditableStack.FormulaControl.change();
      //FormulaEditableStack.FormulaControl.change();
      // FormulaEditableStack.ShowModal.hide();
    }
  },
  ///显示公式HTML
  //formula:表达式
  //ctrl:要显示的控件
  //存在缺陷，button情况有问题
  ShowFormulaHtml: function (formula, ctrl) {
    var $formulaCtrl = $(ctrl).next('.FormulaControl');
    var isButton = $formulaCtrl.attr('formula-isbutton') || false;
    //显示控件
    var formulaText = formula;
    //空公式
    if (!formula) {
      if (!isButton) {
        $(ctrl).val('');
      }
      return;
    }
    $formulaCtrl.val(formula).attr('formula', formula);
    var exist = false;
    for (var key in FormulaEditableStack.FormulaTextCache) {
      if (key == formula) {
        formulaText = FormulaEditableStack.FormulaTextCache[key];
        exist = true;
        break;
      }
    }
    if (exist) { //缓存中有，直接设置

      if (!isButton) {
        $(ctrl).val(formulaText);
      } else {
        $formulaCtrl.val(formulaText);
      }
    } else { //缓存中没有,需要请求
      var schemaCode = $formulaCtrl.attr('formula-schemacode') || '';
      var schemaCodes = $formulaCtrl.attr('formula-parameter') || '';
      // var params = {
      //   ActionName: 'ParseFormulaText',
      //   Formula: formula,
      //   SchemaCode: schemaCode,
      //   SchemaCodes: schemaCodes
      // };

      // $.post(baseUrl + '/Console/Formula/OnAction', {
      //   PostData: JSON.stringify(params)
      // }, function (data) {
      //   if (data) {
      //     formulaText = data.ReturnData.FormulaText;
      //     FormulaEditableStack.FormulaTextCache[formula] = formulaText;
      //     try {
      //       //$formulaCtrl.val(formula).attr('formula', formula);
      //       if (!isButton) {
      //         $(ctrl).val(formulaText);
      //       } else {
      //         $formulaCtrl.val(formulaText);
      //       }
      //     } catch (e) {

      //     }
      //   }
      // }, 'json');


      var param ={
        appId:schemaCode,
        formula:formula,
      }
      if(sessionStorage.getItem('currentAppType')=='op'){
         param.source='op'
      }
      HTTP.parseFormulaText(param)
            .then(data => {
                  if (data && data.code == 0) {
                    formulaText = data.ReturnData.FormulaText;
                    FormulaEditableStack.FormulaTextCache[formula] = formulaText;
                    try {
                      //$formulaCtrl.val(formula).attr('formula', formula);
                      if (!isButton) {
                        $(ctrl).val(formulaText);
                      } else {
                        $formulaCtrl.val(formulaText);
                      }
                    } catch (e) {
          
                    }
                }
                else{
                    this.$Message.error("异常"+data.msg);
                }
        })
        .catch(err => {
            this.$Message.error(err);
            
        }).finally(()=>{

        })




    }
  },
  //显示模态框
  ShowBox: function (link, params) {
    var title = "函数计算";
    if (params["FormulaType"] == "ActivityName") {
      title = "节点实例名称设置";
    }
    FormulaEditableStack.ShowModal = new $.IModal({
      IsComponent: true,
      Title: title,
      Width: '700px',
      Height: '520px',
      Type: 2,
      Content: link,
      ShowFooter: false,
      Params: params
    });
  },
  //点击规则触发控件
  FormulaEditableClick: function ($ctrl) {
    var $formulaControl = $ctrl.next('.FormulaControl');
    FormulaEditableStack.FormulaControl = $formulaControl;
    FormulaEditableStack.TargetControl = $ctrl;
    var formulaType = $formulaControl.attr('formula-type') || '';
    var controlkey = $ctrl.attr('controlkey') || '';
    var url = '';
    if (formulaType.toUpperCase() == 'PARTICIPANT') {
      url = '../../../Console/Formula/Participant?1=1';
    } else if (formulaType == "ActivityName") {
      url = '../../../Console/Formula/ActivityName?1=1';
    } else {
      url = 'formulaEditor';
    }

    //取SchemaCode
    var schemaCode = '';
    try {
      var arr = window.location.href.split('/');
      var code = arr[arr.length - 1];
      if (code.indexOf('=') > -1) {
        var startIndex = code.indexOf('=');
        code = code.slice(startIndex + 1);
      }
      schemaCode = code;
    } catch (err) { }

    var formula = $formulaControl.attr('formula') || '';
    var formulaField = $formulaControl.attr('formula-field') || '';
    var formulaParameter = $formulaControl.attr('formula-parameter') || '';
    var titleCode = $formulaControl.attr('formula-titlecode') || '';
    var titleText = $formulaControl.attr('formula-titletext') || '';
    var parms = {};
    parms['Controlkey'] = controlkey;
    parms['Formula'] = formula;
    parms['FormulaType'] = formulaType;
    parms['FormulaField'] = formulaField;
    parms['FormulaParameter'] = formulaParameter;
    parms['SchemaCode'] = schemaCode;
    parms['TitleCode'] = titleCode;
    parms['TitleText'] = titleText;
    //FormulaEditableStack.ShowBox(url, parms);
    FormulaEditorVue.show(parms);
  }
};
//新的构造编辑器方式
//SchemaCode:当前表单SchemaCode
//IsButton:绑定控件类型，默认false
//FormulaType:使用场景，根据该参数初始化模态树,报表:DATASOURCE,参与者:PARTICIPANT,校验规则:SCHEMASUBMIT,显示规则:SCHEMADISPLAY,流程活动名称:ActivityName
//Parameter:构造模态树的schemaCode数组
//Formula:传入的公式
//TitleCode:顶部标题编码
//TitleText:顶部标题文本
//FormulaField:绑定的控件的DataField，主要用于检查循环引用
//Immediate:立即显示，默认false
$.fn.FormulaEditable = function (param) {
  var Default = {
    SchemaCode: '', //当前表单SchemaCode
    IsButton: false, //是文本还是按钮
    FormulaType: '', //规则类型
    Parameter: '', //参数
    Formula: '', //表达式
    TitleCode: '', //标题编码
    TitleText: '', //标题文本
    FormulaField: '', //配置规则的字段，用于循环校验
    Immediate: false //是否立即显示
  };
  $(this).addClass('FormulaEditable').attr('readonly', 'true');
  FormulaEditableStack.FormulaControl = $(this);
  var inited = $(this).next('input').hasClass('FormulaControl');
  $(this).next('input.FormulaControl').remove();
  var $ctrl = $('<input>').css('display', 'none').addClass('FormulaControl');
  if (param.SchemaCode) {
    $ctrl.attr('formula-schemacode', param.SchemaCode);
  } else {
    //分析url中code
    var schemaCode = '';
    try {
      var arr = window.location.href.split('/');
      var code = arr[arr.length - 1];
      if (code.indexOf('=') > -1) {
        var startIndex = code.indexOf('=');
        code = code.slice(startIndex + 1);
      }
      schemaCode = code;
    } catch (err) { }
    $ctrl.attr('formula-schemacode', schemaCode);
  }
  if (param.IsButton) {
    $ctrl.attr('formula-isbutton', param.IsButton);
  }
  if (param.FormulaType) {
    $ctrl.attr('formula-type', param.FormulaType);
  }
  if (param.FormulaField) {
    $ctrl.attr('formula-field', param.FormulaField);
  }
  if (param.Parameter) {
    $ctrl.attr('formula-parameter', param.Parameter);
  }
  if (param.TitleCode) {
    $ctrl.attr('formula-titlecode', param.TitleCode);
  }
  if (param.TitleText) {
    $ctrl.attr('formula-titletext', param.TitleText);
  }
  if (param.Formula) {
    $ctrl.val(formula).attr('formula', param.Formula);
  }
  $(this).after($ctrl);
  $(this).unbind('click.FormulaEditable').bind('click.FormulaEditable', function () {
    FormulaEditableStack.FormulaEditableClick($(this))
  });
  if (param.Immediate) {
    if (!inited)
      FormulaEditableStack.FormulaEditableClick($(this));
  }
  var formula = param.Formula;
  FormulaEditableStack.ShowFormulaHtml(formula, $(this));
};

export { FormulaEditableStack };



// WEBPACK FOOTER //
// ./src/lib/H3/Console/Formula/NewFormulaEditable.js