import {fetch} from './index';
import axios from 'axios';
/**
 * 文件库相关接口
 * 2018.8.21
 */
export default {
    /**
	 * 查询所有的角色
	 */
    getRoleInfo () {
        return fetch('/fileManage/roleInfo');
    },
    /**
	 * 查看当前用户下所能看到的所有文件和文件夹的层级树关系以及他们的权限
	 */
    getFileTrees (params) {
        return fetch('/fileManage/fileTrees', params);
    },
    /**
	 *模糊查询
	 */
    getFuzzyFileTrees (params) {
        return fetch('/fileManage/fileNameFuzzy', params);
    },
    /**
	 * 查看当前用户所属角色对当前文件夹下的所有文件和文件夹以及它们的权限
	 */
    getSubFiles (params) {
        return fetch('/fileManage/subFiles', params);
    },
    /**
	 * 查看当前用户所属角色对当前文件夹的权限
	 */
    getFolderPerm (params) {
        return fetch('/fileManage/fileRoles', params);
    },
    /**
     * 查看所有角色对当前文件夹的权限
	 */
    getAllRolesFolderPerm (params) {
        return fetch('/fileManage/fileAllRoles', params);
    },
    uploadFile (params) {
        return fetch('/fileManage/uploadFile', params);
    },
    /**
	 * 新建文件夹
	 */
    addFolder (params) {
        return fetch('/fileManage/save/saveFileManageOrRole', params);
    },
    /**
	 * 对文件或文件夹进行重命名
	 */
    reNameFileOrFolder (params) {
        return fetch('/fileManage/modify/fileName', params);
    },
    /**
	 * 批量或者单个文件删除：只针对文件
	 */
    deleteFileOrFolder (params) {
        return fetch('/fileManage/deleteDirOrFile', params);
    },
    /**
	 * 单个文件下载
	 */
    download ({
        path,
        fileName,
        fileId
    }) {
        window.location.href = `${axios.defaults.baseURL}/fileManage/download?path=${path}&fileName=${fileName}&fileId=${fileId}`;
    },

    /**
    * 批量文件下载:只针对文件
    */
    downloadBatch ({
        paths,
        fileNames,
        fileIds
    }) {
        window.location.href = `${axios.defaults.baseURL}/fileManage/downloadBatch?paths=${paths}&fileNames=${fileNames}&fileIds=${fileIds}`;
    },
    /**
	 * 修改文件或文件夹的权限,
	 */
    setFolderPermission (params) {
        return fetch('/fileManage/modify/permission', params);
    }
}
;
