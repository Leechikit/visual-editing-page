
import {
  baseUrl
} from '../../../../config/env';

//将像素值字符串转为数值
String.prototype.parsePxToFloat = function () {
    var f = parseFloat(this.toString().replace("px", ""));
    if (isNaN(f))
        f = 0;
    return f;
}

let FormulaTextCache={};

export const PostAction = function (ActionName, Parameter, okCallback, failCallback,isAsync) {
  var params = {
    PostData: JSON.stringify($.extend({ ActionName: ActionName }, Parameter))
  }
  $.ajax({
    type: 'POST',
    url: baseUrl+'/Console/WorkflowDesigner/OnAction',
    data: params,
    dataType: 'json',
    async: typeof (isAsync) === 'boolean' ? isAsync : true,
    success: okCallback,
    error: failCallback
  })
}

export const deepClone = (obj)=>{
  var proto=Object.getPrototypeOf(obj);
  return Object.assign({},Object.create(proto),obj);
}

export const ShowFormulaHtml=async function(formula,ctrl,schemaCode,requestApi) { 

  if (!formula) {
    return;
  }
  for (var key in FormulaTextCache) {
    if (key == formula) {
      $(ctrl).html(FormulaTextCache[key]);
      return;
    }
  }
 // console.log(requestApi);
  //console.log(typeof requestApi);
  //console.log(typeof requestApi === 'function')
  //console.log(requestApi && typeof requestApi === 'function');
  if(requestApi && (typeof requestApi === 'function')){
    let userParams = {
      formula,
      appId: schemaCode,
    }
    let res = await requestApi(userParams);
    if (res.code === '0'){
      let formulaText = res.formulaText;
      FormulaTextCache[formula] = formulaText;
      $(ctrl).html(formulaText);
    }
    return;
  }
  var params = {
    formula: formula,
    appId: schemaCode,
    SchemaCodes: null
  };
  if(this.SchemaCode.indexOf("&")<0){
    params.appId=this.SchemaCode;
  }
  else{
    params.appId =this.SchemaCode.split("&")[0]
  }
  params.source=sessionStorage.getItem("currentAppType");
  $.post(baseUrl + '/act/model/parseFormulaText',params, function (data) {
    if (data && data.code == 0) {
      let formulaText = data.ReturnData.FormulaText;
      FormulaTextCache[formula] = formulaText;
      $(ctrl).html(formulaText);
    }
  }, 'json');
};




// WEBPACK FOOTER //
// ./src/lib/H3/Console/workflow/common.js