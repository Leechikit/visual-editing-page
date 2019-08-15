import {
    fetch
} from './index';

export default {
    // 新建分组
    addGroup ({
        groupName,
        moduleId
    }) {
        return fetch('act/module/addModule', {
            moduleName: groupName,
            pid: moduleId,
            type: '1'
        });
    },
    // 修改分组
    modifyGroup ({
        groupId,
        groupName
    }) {
        return fetch('act/module/modModule', {
            id: groupId,
            moduleName: groupName
        });
    },
    // 删除分组
    delGroup ({
        groupId
    }) {
        return fetch('act/module/delModule', {
            id: groupId,
            type: '1'
        });
    },
    // 调整顺序
    changeSort ({
        groupAppList
    }) {
        return fetch('act/app/changeSort', {
            groupAppList
        });
    }
};
