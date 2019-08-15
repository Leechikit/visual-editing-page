import fetch from './fetch';
/**
 * 列表设计器请求初始化数据
 */
export const LoadListView = (paramData, type) => {
    return fetch('/ListViewDesigner/OnAction', {
        PostData: JSON.stringify(paramData)
    }, type);
};

//列表设计器切换设计器暂存数据
export const Save = (ListViewSetting) => {
    let paramData = {
        ActionName: 'Save',
        ListViewSetting: JSON.stringify(ListViewSetting)
    };
    return fetch('/ListViewDesigner/OnAction', {
        PostData: JSON.stringify(paramData)
    }, 'POST');
};