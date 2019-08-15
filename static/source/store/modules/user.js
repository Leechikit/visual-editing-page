import Cookies from 'js-cookie';

const user = {
    namespaced: true,
    state: {
        permissions: {},
        isAuthed: false,
        companyId:"",
        logoImg: null
    },
    getters:{
        permissions: ({permissions}) => permissions,
        companyId: ({companyId}) => companyId,
    },
    mutations: {
        logout (state, vm) {
            Cookies.remove('user');
            Cookies.remove('password');
            Cookies.remove('access');
            Cookies.remove('isLogin');
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        },
        setPermissions: (state, permissions) => {
            state.permissions = permissions;
        },
        setAuthStatus(state, flag) {
            state.isAuthed = flag;
        },
        setCompanyId: (state, companyId) => {
            state.companyId = companyId;
        },
        setLogoImg(state, img) {
            console.log(img)
            state.logoImg = img;
        }
    },
    actions: {
        setPermissionsObj(context,permissionList) {
            let permissionsObj = {};
            if (!permissionList) return;
            for (var i = 0; i < permissionList.length; i++) {
                permissionsObj[permissionList[i].permission] = true;
            }
            context.commit('setPermissions',permissionsObj);
        }
    }
};

export default user;
