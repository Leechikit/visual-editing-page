import {UnitType,NodeType} from '../views/form/config/const';
import {GetDepartmentUsers} from '../views/form/service/getData.js';

const ROOTID = '18f923a7-5a5e-426d-94ae-a55ad1a4b240';

export default {
    namespaced: true,
    state:{
        User: null,
        CompanyName: null,
        EngineCode: null,
        OptionalEngines: [],
        RootNode:{},
        OrgRoles:[],
        Variables: [],
        SelectedParticipants: [],
        ManagerNode:null, //经理函数
        StepManagerNode:null,//逐层经理函数选中节点
        StepMasterNode: null, // 主管函数
        RoleSearchNode:null, //角色查找函数
        ActiveUnit: null,//用于切换部门
        OrgUsers: {
        },
        FullOrgUsers:{

        },
        StepManagerOrgUsers:{

        },//离开逐步经理函数时清空
        SubInstanceDataItems:{},  //子流程数据项
        StaffMsgNode: null // 功能节点更新员工档案
    },
    mutations:{
        addSelect(state,node){
            let exists=false;
            if(node.NodeType===NodeType.Unit){
                for(let u of state.SelectedParticipants){
                    if(u.NodeType===node.NodeType && u.id===node.id){
                        exists=true;
                        break;
                    }
                }
                if(!exists){
                    state.SelectedParticipants.push(node);
                }
            }else if(node.NodeType===NodeType.Variables){
                for(let u of state.SelectedParticipants){
                    if(u.NodeType===node.NodeType && u.controlId===node.controlId){
                        exists=true;
                        break;
                    }
                }
                if(!exists){
                    state.SelectedParticipants.push(node);
                }
            }else if(node.NodeType===NodeType.Function){
                for(let u of state.SelectedParticipants){
                    if(u.NodeType===node.NodeType && u.Formula===node.Formula){
                        exists=true;
                        break;
                    }
                }
                if(!exists){
                    state.SelectedParticipants.push(node);
                }
            }else if(node.NodeType===NodeType.Feild){
                for(let u of state.SelectedParticipants){
                    if(u.NodeType===node.NodeType && u.id===node.id){
                        exists=true;
                        break;
                    }
                }
                if(!exists){
                    state.SelectedParticipants.push(node);
                }
            }
            
        },
        //非结果集中移除选中
        removeSelect(state,node){
            let index=-1;
            for(let i=state.SelectedParticipants.length-1;i>=0;i--){
                let participant=state.SelectedParticipants[i];
                if(participant.NodeType===node.NodeType){
                    if(node.NodeType===NodeType.Unit){
                        if(node.id===participant.id){
                            state.SelectedParticipants.splice(i,1);
                            return;
                        }
                    }else if(node.NodeType===NodeType.Variables){
                        if(node.controlId===participant.controlId){
                            state.SelectedParticipants.splice(i,1);
                            return;
                        }
                    }else {
                        if(node.Formula===participant.Formula){
                            state.SelectedParticipants.splice(i,1);
                            return;
                        }
                    }
                }
            }
            
        },
        //从结果集中移除选中（除去掉结果集中的选中，还要去除非结果集中的选中）
        removeSelectFromResultSet(state,node){
            //先删除结果集中的数据
            // let index=state.SelectedParticipants.findIndex(x=>{
            //     return x.NodeType===node.NodeType && (x.ObjectId===node.ObjectId || x.Name===node.Name || x.Formula===node.Formula);
            // });
            // if(index>-1){
            //     state.SelectedParticipants.splice(index,1);
            // }
            for(let i=state.SelectedParticipants.length-1;i>=0;i--){
                let tmp=state.SelectedParticipants[i];
                if(tmp.NodeType===node.NodeType){
                    if(node.NodeType===NodeType.Unit){
                        if(tmp.id===node.id){
                            state.SelectedParticipants.splice(i,1);
                            return;
                        }
                    }else if(node.NodeType===NodeType.Variables){
                        if(tmp.controlId===node.controlId){
                            state.SelectedParticipants.splice(i,1);
                            return;
                        }
                    }else if(node.NodeType===NodeType.Function){
                        if(tmp.Formula===node.Formula){
                            state.SelectedParticipants.splice(i,1);
                            return;
                        }
                    }
                    else if(node.NodeType===NodeType.Feild){
                        if(tmp.id===node.id){
                            state.SelectedParticipants.splice(i,1);
                            return;
                        }
                    }
                }
            }
        },
        addSubInstanceDataItems(state,keyValues){
            state.SubInstanceDataItems[keyValues.key]=keyValues.value;
        }
    },
    actions:{
        async getDepartmentUsers(context, unit){
            let users=context.state.OrgUsers[unit.id];
            let pageSize=unit.Page_Size?unit.Page_Size:10000;
            let hasChangeMana = unit.managerChange?unit.managerChange:false;
            if (users && users.length>0 && !hasChangeMana){
                context.state.ActiveUnit=unit;
                return;
            }
            if (!unit.id) {
                unit.id = ROOTID;
            }  
            let res= await GetDepartmentUsers(unit.id, pageSize);
            if (res.code == 0){
                context.state.OrgUsers[unit.id]=res.page.result;
                context.state.FullOrgUsers[unit.id]=res.page.result;
                context.state.ActiveUnit=unit;
            }
        }
    }
}