import {GetDepartmentUsers} from '../views/form/service/getData.js';
const ROOTID = '18f923a7-5a5e-426d-94ae-a55ad1a4b240';

export default {
    async getDepartmentUsers(context, unit){
        let users=context.state.OrgUsers[unit.ObjectId];
        let pageSize=unit.Page_Size?unit.Page_Size:10000;
        let hasChangeMana = unit.managerChange?unit.managerChange:false;
        if (users && users.length>0 && !hasChangeMana){
            context.state.ActiveUnit=unit;
            return;
        }
        if (!unit.ObjectId) {
            unit.ObjectId = ROOTID;
        }  
        let res= await GetDepartmentUsers(unit.ObjectId, pageSize);
        if (res.Successful){
            context.state.OrgUsers[unit.ObjectId]=res.ReturnData.aaData;
            context.state.FullOrgUsers[unit.ObjectId]=res.ReturnData;
            context.state.ActiveUnit=unit;
        }
    }
}


// WEBPACK FOOTER //
// ./src/store/actions.js