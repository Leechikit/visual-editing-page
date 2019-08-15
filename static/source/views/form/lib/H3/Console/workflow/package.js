import {PostAction} from './common';
import {WorkflowDocument} from './workflowDocument';

export const PackageManager = {
    //缓存 : 流程模板编码\显示名称
    WorkflowNameCache: {

    },

    //缓存 : 流程编码\数据模型编码
    WorkflowCodeSchemaPairCache: {
    },
    //缓存 : 数据模型编码\数据模型
    SchemaCache: {
    },

    GetWorkflowDisplayName: function (_WorkflowCode) {
        if (!_WorkflowCode){
            return '';
        }
        return PackageManager.WorkflowNameCache[_WorkflowCode.toLowerCase()];
    },

    //根据流程模板编码获取数据项
    //_LoadFinished: 数据项加载完成事件
    GetDataItemByWorkflowCode: function (_WorkflowCode, _LoadFinished) {
        if (!_WorkflowCode){
            return [];
        }
        var _SchemaCode = PackageManager.WorkflowCodeSchemaPairCache[_WorkflowCode.toLowerCase()];
        if (_SchemaCode) {
            return PackageManager.SchemaCache[_SchemaCode.toLowerCase()];
        } else {
            //从服务器获取数据项列表
            PostAction('GetDataItemsByWorkflowCode', { 'WorkflowCode': _WorkflowCode }, function (result) {
                if (result.Successful) {
                    result = result.ReturnData.Data;
                    if (result && result.SchemaCode) {
                        //添加到缓存
                        _SchemaCode = PackageManager.WorkflowCodeSchemaPairCache[_WorkflowCode.toLowerCase()] = result.SchemaCode.toLowerCase();
                        PackageManager.SchemaCache[result.SchemaCode.toLowerCase()] = result.DataItems;
                    }
                    //数据项加载完成事件
                    if (_LoadFinished && typeof (_LoadFinished) === 'function') {
                        _LoadFinished();
                    }
                } else {
                    WorkflowDocument.ShowDealResult('数据项获取失败');
                }
            }, function () {
                WorkflowDocument.ShowDealResult('数据项获取失败');
            }, false);
        }
        if (_SchemaCode && PackageManager.SchemaCache[_SchemaCode.toLowerCase()]){
            return PackageManager.SchemaCache[_SchemaCode.toLowerCase()];
        }
        return [];
    },

    GetDataItems: function () {
        if (typeof (GlobalWorkflowProperties.DataItems) !== 'undefined'){
            return GlobalWorkflowProperties.DataItems;
        }
    },
    GetPrintConfigItems: function () {
        if (typeof (GlobalWorkflowProperties.PrintConfigItems) !== 'undefined' &&
        GlobalWorkflowProperties.PrintConfigItems != null){
            return GlobalWorkflowProperties.PrintConfigItems;
        } else {
            return [];
        }
    }

    // GetDataItemDisplayName: function (_Item) {
    //     if (typeof (DataItems) != 'undefined' && _Item) {
    //         for (var i = 0; i < DataItems.length; i++) {
    //             if (DataItems[i] && DataItems[i].Value == _Item)
    //                 return DataItems[i].Text;
    //         }
    //     }
    // }
};



// WEBPACK FOOTER //
// ./src/lib/H3/Console/workflow/package.js